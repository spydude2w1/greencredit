"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bot, ArrowRight, Zap, Database, Wifi, MessageSquare } from "lucide-react";

const capabilities = [
  {
    icon: MessageSquare,
    title: "Sustainability Q&A",
    desc: "Ask EcoBot anything about carbon footprints, ESG frameworks, greenwashing, BRSR compliance, or sustainable lifestyle choices.",
  },
  {
    icon: Database,
    title: "RAG Intelligence",
    desc: "Retrieval-Augmented Generation pulls from the latest sustainability databases, GHG protocols, and Green Credit AI's proprietary knowledge base.",
  },
  {
    icon: Zap,
    title: "Personalized Guidance",
    desc: "EcoBot analyzes your Green Score, carbon data, and challenge history to generate context-aware, actionable recommendations.",
  },
  {
    icon: Wifi,
    title: "Edge AI (Offline Mode)",
    desc: "A lightweight model runs on-device for basic sustainability guidance without an internet connection, ensuring always-available assistance.",
  },
];

const samplePrompts = [
  "What's my biggest source of carbon emissions this month?",
  "How do I qualify for the Zero Waste Challenge?",
  "Explain Scope 3 emissions in simple terms",
  "What eco products are available in the marketplace?",
  "How many Green Credits do I need to reach the next tier?",
  "Show me how to reduce my transport footprint",
];

export default function EcoBotPage() {
  return (
    <div className="space-y-8 font-sans text-text-primary antialiased">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.02]">
        <div>
          <h1 className="text-2xl font-light text-text-primary flex items-center gap-2.5 tracking-tight">
            EcoBot AI
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          </h1>
          <p className="text-[13px] text-text-muted font-light mt-1.5 leading-relaxed">
            Your AI sustainability intelligence assistant · Powered by ACTRM Engine
          </p>
        </div>
        <Link
          href="/community"
          className="text-[11px] text-accent/80 hover:text-accent font-light flex items-center gap-1.5 transition-colors"
        >
          Open EcoBot <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon;
          return (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="p-6 rounded-xl border border-white/[0.03] bg-[#0c0c0e]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded bg-accent/5 border border-accent/15 flex items-center justify-center">
                  <Icon className="h-3.5 w-3.5 text-accent/80" />
                </div>
                <h3 className="text-[13.5px] font-medium text-text-primary tracking-tight">{cap.title}</h3>
              </div>
              <p className="text-[12px] text-text-secondary font-light leading-relaxed">{cap.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Sample Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-8"
      >
        <h3 className="text-[13.5px] font-medium text-text-primary tracking-tight mb-5 flex items-center gap-2">
          <Bot className="h-4 w-4 text-accent/80" />
          Try asking EcoBot
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {samplePrompts.map((prompt) => (
            <div
              key={prompt}
              className="p-3.5 rounded border border-white/[0.03] bg-background hover:border-accent/15 cursor-pointer transition-colors group"
            >
              <p className="text-[12px] text-text-secondary font-light leading-relaxed group-hover:text-text-primary transition-colors">
                &quot;{prompt}&quot;
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-5 border-t border-white/[0.02]">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 px-4 py-2 rounded gradient-green text-white text-[11.5px] font-normal tracking-wide hover:opacity-90 transition-opacity"
          >
            Launch EcoBot <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
