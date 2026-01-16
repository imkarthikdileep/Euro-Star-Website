"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className,
  colors = ["#7CFF67", "#B19EEF", "#5227FF", "#7CFF67"],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer",
        className
      )}
    >
      {showBorder && (
        <div
          className="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]"
          style={gradientStyle}
        />
      )}
      <div
        className="inline-block relative z-10 bg-cover animate-gradient bg-[length:300%_100%] bg-clip-text text-transparent"
        style={gradientStyle}
      >
        {children}
      </div>
    </div>
  );
}
