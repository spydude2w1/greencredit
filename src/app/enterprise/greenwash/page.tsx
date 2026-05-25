"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Search, CheckCircle, XCircle, AlertTriangle, Loader2, Scan } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScoreGauge } from "@/components/dashboard/Cards";
import { greenwashResults } from "@/lib/data/enterprise-data";

const scanSteps = [
  "Extracting sustainability claims...",
  "Cross-referencing against GRI standards...",
  "Running anomaly detection model...",
  "Calculating trust scores...",
  "Generating verification report...",
];

export default function GreenwashPage() {
  const [stage, setStage] = useState<"input" | "scanning" | "results">("input");
  const [scanStep, setScanStep] = useState(0);
  const [query, setQuery] = useState("Metro Transport Co. — Sustainability Report 2024");

  const startScan = async () => {
    setStage("scanning");
    for (let i = 0; i < scanSteps.length; i++) {
      setScanStep(i);
      await new Promise((r) => setTimeout(r, 1200 + Math.random() * 600));
    }
    setStage("results");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          Greenwashing Detection
          <ShieldAlert className="h-5 w-5 text-danger" />
        </h1>
        <p className="text-sm text-text-muted mt-1">
          AI-powered verification of supplier sustainability claims
        </p>
      </div>

      <AnimatePresence mode="wait">
        {stage === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-border-subtle bg-surface p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-4">Scan Supplier Claims</h3>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter supplier name, URL, or paste report text..."
                    className="w-full h-11 rounded-lg bg-background border border-border-subtle pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all"
                  />
                </div>
                <button
                  onClick={startScan}
                  className="px-6 h-11 rounded-lg gradient-green text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Scan className="h-4 w-4" />
                  Scan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Claim Extraction", desc: "NLP parses sustainability claims from reports, websites, and marketing materials", icon: "🔍" },
                { title: "Cross-Reference", desc: "Claims checked against GRI, BRSR, SDG standards and certification databases", icon: "📋" },
                { title: "Trust Scoring", desc: "AI assigns 0-100 trust score with confidence metrics and risk assessment", icon: "🛡️" },
              ].map((info) => (
                <div key={info.title} className="p-4 rounded-xl border border-border-subtle bg-surface">
                  <span className="text-2xl">{info.icon}</span>
                  <p className="text-sm font-semibold text-text-primary mt-2">{info.title}</p>
                  <p className="text-xs text-text-muted mt-1">{info.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {stage === "scanning" && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-xl border border-border-subtle bg-surface p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-danger/10 border border-danger/20 flex items-center justify-center">
                <ShieldAlert className="h-5 w-5 text-danger animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Scanning: {query}</p>
                <p className="text-xs text-text-muted">Verification Agent analyzing claims...</p>
              </div>
            </div>

            <div className="space-y-4">
              {scanSteps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  {i < scanStep ? (
                    <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                  ) : i === scanStep ? (
                    <Loader2 className="h-5 w-5 text-accent animate-spin shrink-0" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border border-border shrink-0" />
                  )}
                  <span className={cn(
                    "text-sm",
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Score Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-danger/20 bg-surface p-6 flex flex-col items-center"
              >
                <h3 className="text-sm font-semibold text-text-primary mb-3">Trust Score</h3>
                <ScoreGauge score={greenwashResults.overallScore} maxScore={100} label="High Risk" />
                <span className="mt-3 text-xs font-bold px-3 py-1 rounded-full bg-danger/10 text-danger border border-danger/20">
                  {greenwashResults.riskLevel} Risk
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                className="lg:col-span-2 rounded-xl border border-border-subtle bg-surface p-6"
              >
                <h3 className="text-sm font-semibold text-text-primary mb-4">Scan Summary</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-text-primary stat-number">{greenwashResults.scannedClaims}</p>
                    <p className="text-[10px] text-text-muted">Claims Scanned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-danger stat-number">{greenwashResults.flaggedClaims}</p>
                    <p className="text-[10px] text-text-muted">Claims Flagged</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent stat-number">{greenwashResults.scannedClaims - greenwashResults.flaggedClaims}</p>
                    <p className="text-[10px] text-text-muted">Claims Verified</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-info stat-number">{greenwashResults.confidence}%</p>
                    <p className="text-[10px] text-text-muted">AI Confidence</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Claim Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-border-subtle bg-surface p-6"
            >
              <h3 className="text-sm font-semibold text-text-primary mb-4">Claim-by-Claim Analysis</h3>
              <div className="space-y-3">
                {greenwashResults.claims.map((claim, i) => (
                  <motion.div
                    key={claim.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className={cn(
                      "p-4 rounded-lg border transition-colors",
                      claim.status === "Flagged"
                        ? "border-danger/20 bg-danger/5"
                        : "border-accent/20 bg-accent/5"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {claim.status === "Flagged" ? (
                        <XCircle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-text-primary">
                            &quot;{claim.text}&quot;
                          </p>
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ml-2",
                            claim.status === "Flagged" ? "bg-danger/10 text-danger" : "bg-accent/10 text-accent"
                          )}>
                            {claim.status}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted mt-1.5 flex items-start gap-1">
                          <AlertTriangle className="h-3 w-3 shrink-0 mt-0.5" />
                          {claim.reason}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] text-text-muted">Confidence:</span>
                          <div className="h-1.5 flex-1 rounded-full bg-surface-raised overflow-hidden max-w-[100px]">
                            <div className="h-full rounded-full bg-info" style={{ width: `${claim.confidence}%` }} />
                          </div>
                          <span className="text-[10px] text-info stat-number">{claim.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <button onClick={() => setStage("input")} className="text-sm text-text-muted hover:text-text-primary transition-colors">
              ← Scan another supplier
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
