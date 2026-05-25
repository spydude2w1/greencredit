"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordFadeInProps {
  words: string;
  className?: string;
  delay?: number;
  variants?: Variants;
}

export function WordFadeIn({
  words,
  delay = 0.15,
  variants = {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: (i: any) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * delay, duration: 0.8 },
    }),
  },
  className,
}: WordFadeInProps) {
  const _words = words.split(" ");

  return (
    <motion.h1
      variants={{
        hidden: {},
        visible: {},
      }}
      initial="hidden"
      animate="visible"
      className={cn(
        "font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm",
        className,
      )}
    >
      {_words.map((word, i) => (
        <motion.span key={i} custom={i} variants={variants} className="inline-block mr-3 mb-1">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
