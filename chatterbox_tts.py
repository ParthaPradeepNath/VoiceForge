"""Chatterbox TTS API - Filebase compatible (using existing cloudflare-r2 secret)."""

import modal

# ---------------------- CONFIG ----------------------

FILEBASE_BUCKET_NAME = "voiceforge"  # change if needed

# ---------------------- MODAL SETUP ----------------------

image = modal.Image.debian_slim(python_version="3.10").uv_pip_install(
    "chatterbox-tts==0.1.6",
    "fastapi[standard]==0.124.4",
    "peft==0.18.0",
    "boto3",
)

app = modal.App("chatterbox-tts", image=image)

with image.imports():
    import io
    import os
    import tempfile
    from pathlib import Path

    import boto3
    import torchaudio as ta
    from chatterbox.tts_turbo import ChatterboxTurboTTS
    from fastapi import Depends, FastAPI, HTTPException, Security
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.responses import StreamingResponse
    from fastapi.security import APIKeyHeader
    from pydantic import BaseModel, Field

    # ---------------------- AUTH ----------------------

    api_key_scheme = APIKeyHeader(
        name="x-api-key",
        scheme_name="ApiKeyAuth",
        auto_error=False,
    )

    def verify_api_key(x_api_key: str | None = Security(api_key_scheme)):
        expected = os.environ.get("CHATTERBOX_API_KEY", "")
        if not expected or x_api_key != expected:
            raise HTTPException(status_code=403, detail="Invalid API key")
        return x_api_key

    # ---------------------- REQUEST MODEL ----------------------

    class TTSRequest(BaseModel):
        prompt: str = Field(..., min_length=1, max_length=5000)
        voice_key: str = Field(..., min_length=1, max_length=300)
        temperature: float = Field(default=0.8, ge=0.0, le=2.0)
        top_p: float = Field(default=0.95, ge=0.0, le=1.0)
        top_k: int = Field(default=1000, ge=1, le=10000)
        repetition_penalty: float = Field(default=1.2, ge=1.0, le=2.0)
        norm_loudness: bool = Field(default=True)

# ---------------------- MODEL CLASS ----------------------

@app.cls(
    gpu="a10g",
    scaledown_window=60 * 5,
    secrets=[
        modal.Secret.from_name("hf-token"),
        modal.Secret.from_name("chatterbox-api-key"),
        modal.Secret.from_name("cloudflare-r2"),  # ✅ reuse existing secret
    ],
)
@modal.concurrent(max_inputs=10)
class Chatterbox:
    @modal.enter()
    def load_model(self):
        self.model = ChatterboxTurboTTS.from_pretrained(device="cuda")

        # ✅ Filebase S3 client (using existing secret keys)
        self.s3 = boto3.client(
            "s3",
            endpoint_url="https://s3.filebase.com",
            aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
            aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
        )

    # ---------------------- DOWNLOAD HELPER ----------------------

    def download_voice(self, key: str) -> str:
        """Download voice file from Filebase to temp path"""
        tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
        tmp_path = tmp_file.name

        try:
            self.s3.download_file(FILEBASE_BUCKET_NAME, key, tmp_path)
        except Exception:
            raise HTTPException(
                status_code=400,
                detail=f"Voice not found: {key}",
            )

        return tmp_path

    # ---------------------- API ----------------------

    @modal.asgi_app()
    def serve(self):
        web_app = FastAPI(
            title="Chatterbox TTS API",
            description="Filebase-backed TTS API",
            docs_url="/docs",
            dependencies=[Depends(verify_api_key)],
        )

        web_app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        @web_app.post("/generate", responses={200: {"content": {"audio/wav": {}}}})
        def generate_speech(request: TTSRequest):
            try:
                # ✅ download voice from Filebase
                voice_path = self.download_voice(request.voice_key)

                audio_bytes = self.generate.local(
                    request.prompt,
                    voice_path,
                    request.temperature,
                    request.top_p,
                    request.top_k,
                    request.repetition_penalty,
                    request.norm_loudness,
                )

                return StreamingResponse(
                    io.BytesIO(audio_bytes),
                    media_type="audio/wav",
                )

            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail=f"Failed to generate audio: {e}",
                )

        return web_app

    # ---------------------- GENERATION ----------------------

    @modal.method()
    def generate(
        self,
        prompt: str,
        audio_prompt_path: str,
        temperature: float = 0.8,
        top_p: float = 0.95,
        top_k: int = 1000,
        repetition_penalty: float = 1.2,
        norm_loudness: bool = True,
    ):
        wav = self.model.generate(
            prompt,
            audio_prompt_path=audio_prompt_path,
            temperature=temperature,
            top_p=top_p,
            top_k=top_k,
            repetition_penalty=repetition_penalty,
            norm_loudness=norm_loudness,
        )

        buffer = io.BytesIO()
        ta.save(buffer, wav, self.model.sr, format="wav")
        buffer.seek(0)
        return buffer.read()


# ---------------------- LOCAL TEST ----------------------

@app.local_entrypoint()
def test(
    prompt: str = "Hello from Filebase TTS",
    voice_key: str = "voices/system/<voice-id>",
):
    chatterbox = Chatterbox()

    audio_bytes = chatterbox.generate.remote(
        prompt=prompt,
        audio_prompt_path=voice_key,
    )

    with open("/tmp/output.wav", "wb") as f:
        f.write(audio_bytes)

    print("✅ Saved to /tmp/output.wav")

# Use this to test CURL:
#     curl -X POST "https://parthapradeep-nath-cloud--chatterbox-tts-chatterbox-serve.modal.run/generate" \
#   -H "Content-Type: application/json" \
#   -H "x-api-key: super_secret_key" \
#   -d '{
#     "prompt": "Hello from Chatterbox [chuckle].",
#     "voice_key": "voices/system/cmo033jxv00022oujixasi1w6"
#   }' \
#   --output output.wav
