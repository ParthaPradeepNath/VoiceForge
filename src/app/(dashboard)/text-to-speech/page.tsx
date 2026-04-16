// import { Metadata } from "next";
// import TextToSpeechView from "@/features/text-to-speech/views/text-to-speech-view";
// import { HydrateClient, prefetch, trpc } from "@/trpc/server";
// export const metadata: Metadata = { title: "Text to speech" };
// export default async function TextToSpeechPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ text?: string ; voiceId?: string  }>;
// }) {
//   const { text, voiceId } = await searchParams;
//   prefetch(trpc.voices.getAll.queryOptions());
//   return (
//     <HydrateClient>
//       <TextToSpeechView initialValues={{ text, voiceId }} />
//     </HydrateClient>
//   );
// }
import { Metadata } from "next";

import TextToSpeechView from "@/features/text-to-speech/views/text-to-speech-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export const metadata: Metadata = { title: "Text to speech" };

// ✅ helper function for normalization
function normalizeParam(param?: string | string[]): string | undefined {
  if (Array.isArray(param)) {
    return param[0]; // take first value
  }
  return param;
}

export default async function TextToSpeechPage({
  searchParams,
}: {
  // ✅ FIXED TYPE
  searchParams: Promise<{
    text?: string | string[];
    voiceId?: string | string[];
  }>;
}) {
  const params = await searchParams;

  // ✅ NORMALIZATION
  const text = normalizeParam(params.text);
  const voiceId = normalizeParam(params.voiceId);

  prefetch(trpc.voices.getAll.queryOptions());

  return (
    <HydrateClient>
      <TextToSpeechView initialValues={{ text, voiceId }} />
    </HydrateClient>
  );
}
