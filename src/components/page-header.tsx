"use client";

import Link from "next/link";

import { Headphones } from "lucide-react";

import { Button } from "@/components/ui/button";
import LikeIcon from "@/components/ui/like-icon";
import { cn } from "@/lib/utils";

import { SidebarTrigger } from "./ui/sidebar";

export function PageHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b p-4",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" asChild>
          <Link href="mailto:partha@nath.com">
            <LikeIcon />
            <span className="hidden lg:block">Feedback</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="mailto:partha@nath.com">
            <Headphones />
            <span className="hidden lg:block">Need help?</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
