import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { env } from "./env";

// Filebase S3 Client
const filebase = new S3Client({
  region: "us-east-1",
  endpoint: "https://s3.filebase.com",
  credentials: {
    accessKeyId: env.FILEBASE_ACCESS_KEY,
    secretAccessKey: env.FILEBASE_SECRET_KEY,
  },
});

type UploadAudioOptions = {
  buffer: Buffer;
  key: string;
  contentType?: string;
};

// Upload Audio
export async function uploadAudio({
  buffer,
  key,
  contentType = "audio/wav",
}: UploadAudioOptions): Promise<void> {
  await filebase.send(
    new PutObjectCommand({
      Bucket: env.FILEBASE_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );
}

// Delete Audio
export async function deleteAudio(key: string): Promise<void> {
  await filebase.send(
    new DeleteObjectCommand({
      Bucket: env.FILEBASE_BUCKET_NAME,
      Key: key,
    })
  );
}

// Get Signed URL (valid for 1 hour)
export async function getSignedAudioUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: env.FILEBASE_BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(filebase, command, { expiresIn: 3600 });
}
