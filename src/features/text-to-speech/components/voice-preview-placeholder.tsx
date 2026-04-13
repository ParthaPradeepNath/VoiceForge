import Link from "next/link";

import { AudioLines, BookOpen, Sparkles, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function VoicePreviewPlaceholder() {
  return (
    <div className="hidden h-full flex-1 flex-col items-center justify-center gap-6 border-t lg:flex">
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex w-32 items-center justify-center">
          <div className="bg-muted absolute left-0 -rotate-30 rounded-full p-4">
            <Volume2 className="siz-5 text-muted-foreground" />
          </div>

          <div className="bg-foreground relative z-10 rounded-full p-4">
            <Sparkles className="siz-5 text-background" />
          </div>

          <div className="bg-muted absolute right-0 -rotate-30 rounded-full p-4">
            <AudioLines className="siz-5 text-muted-foreground" />
          </div>
        </div>

        <p className="text-foreground text-lg font-semibold tracking-tight">
          Preview will appear here
        </p>
        <p className="text-muted-foreground max-w-64 text-center text-sm">
          Once you generate, your audio result will appear here. Sit back and
          relax.
        </p>
      </div>
      {/* <Button variant="outline" size="sm" asChild> */}
      <Button variant="outline" size="sm">
        <Link href="/docs">
          <div className="flex flex-row items-center gap-1">
            <BookOpen />
            Don&apos;t know how?
          </div>
        </Link>
      </Button>
    </div>
  );
}
