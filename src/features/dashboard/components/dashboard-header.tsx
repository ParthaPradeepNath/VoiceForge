"use client";

import Link from "next/link";

import { useUser } from "@clerk/nextjs";
import { Headphones } from "lucide-react";

import { Button } from "@/components/ui/button";
import LikeIcon from "@/components/ui/like-icon";

export function DashboardHeader() {
  const { isLoaded, user } = useUser();

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-muted-foreground text-sm">Nice to see you</p>
        <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
          {isLoaded ? (user?.fullName ?? user?.firstName ?? "there") : "..."}
        </h1>
      </div>
      <div className="hidden items-center gap-3 lg:flex">
        <Button
          variant="outline"
          size="sm"
          render={(props) => (
            <Link
              href="mailto:partha@nath.com"
              {...props}
              className="flex items-center gap-2"
            />
          )}
        >
          <LikeIcon />
          <span className="hidden lg:block">Feedback</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          render={(props) => (
            <Link
              href="mailto:partha@nath.com"
              {...props}
              className="flex items-center gap-2"
            />
          )}
        >
          <Headphones />
          <span className="hidden lg:block">Need help?</span>
        </Button>
      </div>
    </div>
  );
}
