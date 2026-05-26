"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Search, CheckCircle, XCircle, AlertTriangle, Loader2, Scan } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScoreGauge } from "@/components/dashboard/Cards";
import { greenwashResults } from "@/lib/data/enterprise-data";

const scanSteps = [
  "Extracting sustainability claims using LLM parser...",
  "Cross-referencing claims against active GRI/BRSR indices...",
  "Running corporate greenwashing detection neural engine...",
  "Synthesizing supplier trust score outputs...",
  "Generating cryptographically verified audit records...",
];

export default function GreenwashPage() {
  const [stage, setStage] = useState<"input" | "scanning" | "results">("input");
  const [scanStep, setScanStep] = useState(0);
  const [query, setQuery] = useState("Metro Transport Co. — Sustainability Report 2025");

  const startScan = async () => {
    setStage("scanning");
    for (let i = 0; i < scanSteps.length; i++) {
      setScanStep(i);
      await new Promise((r) => setTimeout(r, 1000 + Math.random() * 500));
    }
    setStage("results");
  };

  return (
    <div className="space-y-8 font-sans text-text-primary antialiased">
      {/* Header */}
      <div className="pb-2 border-b border-white/[0.02]">
        <h1 className="text-xl font-light text-text-primary flex items-center gap-2 tracking-tight">
          Greenwashing Detection Engine
          <ShieldAlert className="h-4.5 w-4.5 text-danger/80" />
        </h1>
        <p className="text-[12px] text-text-muted font-light mt-1.5 leading-relaxed">
          AI-driven semantic verification of supplier claims, reports, and ESG marketing claims.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {stage === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            <div className="rounded border border-white/[0.03] bg-[#0c0c0e]/80 p-6">
              <h3 className="text-[12.5px] font-normal text-text-primary tracking-tight mb-4">Validate Supplier Environmental Claims</h3>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted opacity-80" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter supplier name, document URL, or paste disclosures here..."
                    className="w-full h-9 rounded bg-[#09090b] border border-white/[0.06] pl-9 pr-4 text-[12px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/30 transition-colors font-light"
                  />
                </div>
                <button
                  onClick={startScan}
                  className="px-5 h-9 rounded gradient-green text-white text-[11.5px] font-normal tracking-wide hover:opacity-95 transition-opacity flex items-center gap-2"
                >
                  <Scan className="h-3.5 w-3.5 shrink-0" />
                  Run Scan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "NLP Claim Extraction", desc: "Verbal parsing breaks down complex qualitative claims into verifiable semantic tuples.", icon: "🔍" },
                { title: "Standard Verification", desc: "Multi-modal cross-checks against global GRI and local BRSR indicator guidelines.", icon: "📋" },
                { title: "Neural Risk Scoring", desc: "Generates trust and risk metrics with deep-learning based confidence scales.", icon: "🛡️" },
              ].map((info) => (
                <div key={info.title} className="p-4 rounded border border-white/[0.03] bg-[#0c0c0e]">
                  <span className="text-xl opacity-95 shrink-0 select-none block mb-2">{info.icon}</span>
                  <p className="text-[12.5px] font-normal text-text-primary tracking-tight">{info.title}</p>
                  <p className="text-[11px] text-text-muted font-light mt-1.5 leading-relaxed">{info.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {stage === "scanning" && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded border border-white/[0.03] bg-[#0c0c0e] p-8"
          >
            <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-white/[0.02]">
              <div className="h-8.5 w-8.5 rounded bg-danger/5 border border-danger/15 flex items-center justify-center">
                <ShieldAlert className="h-4 w-4 text-danger animate-pulse" />
              </div>
              <div>
                <p className="text-[13px] font-normal text-text-primary tracking-tight">Active Audit: {query}</p>
                <p className="text-[11.5px] text-text-muted font-light mt-0.5">Corporate verification agent running heuristics...</p>
              </div>
            </div>

            <div className="space-y-4">
              {scanSteps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4"
                >
                  {i < scanStep ? (
                    <CheckCircle className="h-4.5 w-4.5 text-accent shrink-0" />
                  ) : i === scanStep ? (
                    <Loader2 className="h-4.5 w-4.5 text-accent animate-spin shrink-0" />
                  ) : (
                    <div className="h-4.5 w-4.5 rounded-full border border-white/[0.06] shrink-0" />
                  )}
                  <span className={cn(
                    "text-[12.5px] font-light tracking-tight",
                    i <= scanStep ? "text-text-primary" : "text-text-muted"
                  )}>
                    {s}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {stage === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            {/* Score Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-6 flex flex-col items-center select-none"
              >
                <h3 className="text-[12px] font-light text-text-muted uppercase tracking-widest mb-4">Trust Index</h3>
                <ScoreGauge score={greenwashResults.overallScore} maxScore={100} label="Risk Rating" />
                <span className="mt-4 text-[9.5px] font-normal px-2.5 py-0.5 rounded border uppercase tracking-wider bg-danger/5 text-danger/90 border-danger/10">
                  {greenwashResults.riskLevel} Risk Profile
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="lg:col-span-2 rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-6 flex flex-col justify-between"
              >
                <h3 className="text-[12.5px] font-medium text-text-primary tracking-tight mb-4">Scan Telemetry</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-y border-white/[0.02]">
                  <div className="text-center">
                    <p className="text-2xl font-light font-mono text-text-primary tracking-tight">{greenwashResults.scannedClaims}</p>
                    <p className="text-[10px] text-text-muted font-light mt-1.5 uppercase tracking-wider">Claims Scanned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-light font-mono text-danger/95 tracking-tight">{greenwashResults.flaggedClaims}</p>
                    <p className="text-[10px] text-text-muted font-light mt-1.5 uppercase tracking-wider">Claims Flagged</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-light font-mono text-accent/95 tracking-tight">{greenwashResults.scannedClaims - greenwashResults.flaggedClaims}</p>
                    <p className="text-[10px] text-text-muted font-light mt-1.5 uppercase tracking-wider">Claims Verified</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-light font-mono text-info/95 tracking-tight">{greenwashResults.confidence}%</p>
                    <p className="text-[10px] text-text-muted font-light mt-1.5 uppercase tracking-wider">Confidence</p>
                  </div>
                </div>
                <div className="mt-4 text-[11px] text-text-muted font-light leading-relaxed">
                  Verified using <strong>Bidirectional Claim Cross-Referencing Model v2.4</strong> against global indices.
                </div>
              </motion.div>
            </div>

            {/* Claim Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-6"
            >
              <h3 className="text-[12.5px] font-medium text-text-primary tracking-tight mb-4">Detailed Claim Audits</h3>
              <div className="space-y-3">
                {greenwashResults.claims.map((claim, i) => (
                  <motion.div
                    key={claim.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className={cn(
                      "p-4 rounded border transition-colors",
                      claim.status === "Flagged"
                        ? "border-danger/15 bg-danger/[0.02]"
                        : "border-accent/15 bg-accent/[0.02]"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {claim.status === "Flagged" ? (
                        <XCircle className="h-4.5 w-4.5 text-danger shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-[12.5px] font-normal text-text-primary tracking-tight leading-relaxed">
                            &quot;{claim.text}&quot;
                          </p>
                          <span className={cn(
                            "text-[8.5px] font-normal px-2 py-0.5 rounded border shrink-0 tracking-wider uppercase",
                            claim.status === "Flagged" ? "bg-danger/5 text-danger/90 border-danger/10" : "bg-accent/5 text-accent/90 border-accent/10"
                          )}>
                            {claim.status}
                          </span>
                        </div>
                        <p className="text-[11.5px] text-text-muted font-light mt-1.5 flex items-start gap-1 leading-relaxed">
                          <AlertTriangle className="h-3 w-3 shrink-0 mt-0.5 text-warning/70" />
                          {claim.reason}
                        </p>
                        <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-white/[0.01]">
                          <span className="text-[10px] text-text-muted font-light">Validation Confidence:</span>
                          <div className="h-1 flex-1 rounded bg-white/[0.03] overflow-hidden max-w-[80px]">
                            <div className="h-full rounded bg-info" style={{ width: `${claim.confidence}%` }} />
                          </div>
                          <span className="text-[10.5px] text-info font-mono">{claim.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <button onClick={() => setStage("input")} className="text-[12px] font-light text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5">
              ← Scan another disclosure report
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
