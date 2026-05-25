"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, Lock, Search, Bot, Brain, Leaf, ArrowRight } from "lucide-react";

export default function PublicGreenwashDetector() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg gradient-green flex items-center justify-center">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-text-primary">Green Credit AI</span>
          </Link>
          <Link href="/login" className="px-4 py-1.5 rounded-lg gradient-green text-white text-xs font-semibold hover:opacity-90">
            Sign In
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-danger/10 border border-danger/20 text-danger text-xs font-semibold mb-4">
            <ShieldAlert className="h-3.5 w-3.5" /> Public Tool
          </div>
          <h1 className="text-3xl font-bold text-text-primary">Greenwash Detector</h1>
          <p className="text-sm text-text-muted mt-2 max-w-md mx-auto">AI-powered verification of sustainability claims against global standards</p>
        </div>

        <div className="relative">
          {/* Blurred Preview */}
          <div className="filter blur-[2px] pointer-events-none select-none opacity-60">
            <div className="rounded-xl border border-border-subtle bg-surface p-5 mb-4">
              <div className="flex gap-3">
                <div className="flex-1 h-10 rounded-lg bg-background border border-border-subtle" />
                <div className="px-6 h-10 rounded-lg bg-danger flex items-center gap-2 text-white text-sm font-medium">
                  <Search className="h-4 w-4" /> Scan
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border-subtle bg-surface p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-danger/20 flex items-center justify-center"><Bot className="h-5 w-5 text-danger" /></div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Greenwash Agent</p>
                  <p className="text-xs text-text-muted">Scanning sustainability claims...</p>
                </div>
              </div>
              <div className="space-y-2">
                {["Checking claim validity...", "Cross-referencing certifications...", "Analyzing carbon offset data..."].map((s) => (
                  <div key={s} className="flex items-center gap-2 text-xs text-text-muted">
                    <div className="h-3 w-3 rounded-full border border-border" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lock Overlay */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl border border-border-subtle bg-surface/95 backdrop-blur-xl p-10 text-center max-w-sm shadow-2xl">
              <div className="h-14 w-14 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-7 w-7 text-danger" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">Sign in to detect greenwashing</h3>
              <p className="text-xs text-text-muted mt-2">Create a free account to verify sustainability claims using AI agents that cross-reference global certification databases.</p>
              <Link href="/login" className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-green text-white text-sm font-semibold hover:opacity-90 glow-green">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
