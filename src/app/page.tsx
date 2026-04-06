"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <Button
      size="xs"
      onClick={() => toast}
    >
      Page
    </Button>
  );
}
