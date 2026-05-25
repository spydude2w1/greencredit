"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative flex items-center justify-center">
        {/* Glowing rings */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-24 w-24 rounded-full border border-accent/30"
        />
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="absolute h-24 w-24 rounded-full border border-accent/20"
        />
        
        {/* Core Icon */}
        <div className="h-16 w-16 rounded-2xl gradient-green flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Leaf className="h-8 w-8 text-white" />
          </motion.div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-2 mt-4">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-sm font-semibold text-text-primary tracking-widest uppercase"
        >
          Loading Intelligence
        </motion.div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
