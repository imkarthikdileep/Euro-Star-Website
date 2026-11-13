"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
}

export function AnimateOnScroll({ children, className }: AnimateOnScrollProps) {
  return <div className={cn("w-full", className)}>{children}</div>;
}
