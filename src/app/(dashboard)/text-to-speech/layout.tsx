import { TextToSpeechLayout } from "@/features/text-to-speech/views/text-to-speech-layout";

// Reserved filename needs default export
export default function Layout({ children }: { children: React.ReactNode }) {
  return <TextToSpeechLayout>{children}</TextToSpeechLayout>;
}
