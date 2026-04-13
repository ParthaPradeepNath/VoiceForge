"use client";

import { useState } from "react";

import { Coins } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { COST_PER_UNIT, TEXT_MAX_LENGTH } from "../data/constants";

export function TextInputPanel() {
  const [text, setText] = useState("");

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      {/* Text input area */}
      <div className="relative min-h-0 flex-1">
        <Textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="absolute inset-0 resize-none border-0 bg-transparent p-4 pb-6 text-base leading-relaxed tracking-tight wrap-break-word shadow-none focus-visible:ring-0 lg:p-6 lg:pb-8"
          maxLength={TEXT_MAX_LENGTH}
        />
        {/* Bottom fade overlay */}
        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t to-transparent" />
      </div>
      {/* Action bar */}
      <div className="shrink-0 p-4 lg:p-6">
        {/* Mobile layout */}
        <div className="flex flex-col gap-3 lg:hidden">
          <Button className="w-full">Generate speech</Button>
        </div>
        {/* Desktop layout */}
        {text.length > 0 ? (
          <div className="hidden items-center justify-between lg:flex">
            <Badge variant="outline" className="gap-1.5 border-dashed">
              <Coins className="text-charts-5 size-3" />
              <span className="text-xs">
                <span className="tabular-nums">
                  ${(text.length * COST_PER_UNIT).toFixed(4)}
                </span>{" "}
                estimated
              </span>
            </Badge>
            <div className="flex items-center gap-3">
              <p className="text-xs tracking-tight">
                {text.length.toLocaleString()}
                <span className="text-muted-foreground">
                  {/* &nbsp; -> unicode for whitespace */} /{" "}
                  {TEXT_MAX_LENGTH.toLocaleString()} characters
                </span>
              </p>
              <Button size="sm">Generate speech</Button>
            </div>
          </div>
        ) : (
          <div className="hidden lg:block">
            <p className="text-muted-foreground text-sm">
              Get started by typing or pasting your text above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
