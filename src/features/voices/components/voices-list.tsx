import { AudioLines, Mic, Volume2 } from "lucide-react";

import type { VoiceItem } from "./voice-card";
import VoiceCard from "./voice-card";

interface VoicesListProps {
  title: string;
  voices: VoiceItem[];
}

export function VoicesList({ title, voices }: VoicesListProps) {
  if (!voices.length) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>

        <div className="flex flex-col items-center justify-center gap-3 py-12">
          <div className="relative flex h-14 w-32 items-center justify-center">
            <div className="bg-muted absolute left-0 -rotate-30 rounded-full p-4">
              <Volume2 className="text-muted-foreground size-5" />
            </div>

            <div className="bg-foreground relative z-10 rounded-full p-4">
              <Mic className="text-background size-5" />
            </div>

            <div className="bg-muted absolute right-0 rotate-30 rounded-full p-4">
              <AudioLines className="text-muted-foreground size-5" />
            </div>
          </div>

          <p className="text-foreground text-lg font-semibold tracking-tight">
            No voices found
          </p>

          <p className="text-muted-foreground max-w-md text-center text-sm">
            {title} will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {voices.map((voice) => (
          <VoiceCard key={voice.id} voice={voice} />
        ))}
      </div>
    </div>
  );
}
