import {
  FileAudio,
  Mic,
  Pause,
  Play,
  RotateCcw,
  Square,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAudioRecorder } from "@/features/voices/hooks/use-audio-recorder";
import { useAudioPlayback } from "@/hooks/use-audio-playback";
import { cn, formatFileSize } from "@/lib/utils";

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function VoiceRecorder({
  file,
  onFileChange,
  isInvalid,
}: {
  file: File | null;
  onFileChange: (file: File | null) => void;
  isInvalid?: boolean;
}) {
  const { isPlaying, togglePlay } = useAudioPlayback(file);

  const {
    isRecording,
    elapsedTime,
    audioBlob,
    containerRef,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();

  const handleStop = () => {
    stopRecording((blob) => {
      const recordedFile = new File([blob], "recording.wav", {
        type: "audio/wav",
      });
      onFileChange(recordedFile);
    });
  };

  const handleReRecord = () => {
    onFileChange(null);
    resetRecording();
  };

  if (error) {
    return (
      <div className="border-destructive/50 bg-destructive/5 flex flex-col items-center gap-4 rounded-2xl border px-6 py-10">
        <p className="text-destructive text-center text-sm">{error}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={resetRecording}
        >
          Try again
        </Button>
      </div>
    );
  }

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border p-4">
        <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
          <FileAudio className="text-muted-foreground size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{file.name}</p>
          <p className="text-muted-foreground text-xs">
            {formatFileSize(file.size)}
            {audioBlob && elapsedTime > 0 && (
              <>&nbsp;&middot;&nbsp;{formatTime(elapsedTime)}</>
            )}
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={togglePlay}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleReRecord}
          title="Re-record"
        >
          <RotateCcw className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleReRecord}
          title="Remove"
        >
          <X className="size-4" />
        </Button>
      </div>
    );
  }

  if (isRecording) {
    return (
      <div className="flex flex-col overflow-hidden rounded-2xl border">
        <div ref={containerRef} className="w-full" />
        <div className="flex items-center justify-between border-t p-4">
          <p className="text-[28px] leading-[1.2] font-semibold tracking-tight">
            {formatTime(elapsedTime)}
          </p>
          <Button type="button" variant="destructive" onClick={handleStop}>
            <Square className="size-3" />
            Stop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border px-6 py-10",
        isInvalid && "border-destructive"
      )}
    >
      <div className="bg-muted flex size-12 items-center justify-center rounded-xl">
        <Mic className="text-muted-foreground size-5" />
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-base font-semibold tracking-tight">
          Record your voice
        </p>
        <p className="text-muted-foreground text-center text-sm">
          Click record to start capturing audio
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={startRecording}
      >
        <Mic className="size-3.5" />
        Record
      </Button>
    </div>
  );
}
