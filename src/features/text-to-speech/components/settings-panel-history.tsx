"use client";

import { AudioLines, AudioWaveform, Clock } from "lucide-react";

export function SettingsPanelHistory() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-8">
      <div className="relative flex w-25 items-center justify-center">
        <div className="bg-muted absolute left-0 -rotate-30 rounded-full p-3">
          <AudioLines className="text-muted-foreground size-4" />
        </div>

        <div className="bg-primary relative z-10 rounded-full p-3">
          <AudioWaveform className="size-4 text-white" />
        </div>

        <div className="bg-muted absolute right-0 rotate-30 rounded-full p-3">
          <Clock className="text-muted-foreground size-4" />
        </div>
      </div>

      <p className="text-foreground font-semibold tracking-tight">
        No generations yet
      </p>
      <p className="text-muted-foreground max-w-48 text-center text-xs">
        Generate some audio and it will appear here
      </p>
    </div>
  );
}
