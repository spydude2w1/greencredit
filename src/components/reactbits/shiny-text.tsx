"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  className?: string;
  shimmerWidth?: number;
}

export function ShinyText({ text, className, shimmerWidth = 100 }: ShinyTextProps) {
  return (
    <motion.p
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
        } as React.CSSProperties
      }
      className={cn(
        "mx-auto max-w-md text-neutral-400/80",
        "animate-shimmer-shiny bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
        "bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.7),transparent)]",
        className,
      )}
    >
      {text}
    </motion.p>
  );
}
