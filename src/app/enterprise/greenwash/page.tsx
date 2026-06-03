"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert, CheckCircle, XCircle, AlertTriangle, Loader2,
  Scan, X, Plus, TrendingUp, Building2, Globe, FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScoreGauge } from "@/components/dashboard/Cards";
import { greenwashResults } from "@/lib/data/enterprise-data";

/* ─── Static Suggestion Dataset ─── */
const SUGGESTIONS = [
  { id: "s1", name: "Reliance Industries Ltd", type: "company", industry: "Petrochemical", risk: "high", icon: Building2 },
  { id: "s2", name: "Metro Transport Co. — Sustainability Report 2025", type: "report", industry: "Logistics", risk: "medium", icon: FileText },
  { id: "s3", name: "EcoFresh Packaging Solutions", type: "company", industry: "Manufacturing", risk: "medium", icon: Building2 },
  { id: "s4", name: "Nestlé India — ESG Disclosure 2025", type: "report", industry: "FMCG", risk: "medium", icon: FileText },
  { id: "s5", name: "BlueSky Airlines Carbon Neutral Claims", type: "claim", industry: "Aviation", risk: "high", icon: Globe },
  { id: "s6", name: "Tata Steel — Green Steel Initiative", type: "claim", industry: "Steel", risk: "low", icon: Globe },
  { id: "s7", name: "Amazon India — Climate Pledge Fulfillment", type: "report", industry: "E-Commerce", risk: "medium", icon: FileText },
  { id: "s8", name: "PetroGreen Energy — Zero Emission Promise", type: "claim", industry: "Energy", risk: "high", icon: Globe },
  { id: "s9", name: "Unilever Sustainability Living Plan 2025", type: "report", industry: "FMCG", risk: "low", icon: FileText },
  { id: "s10", name: "SpiceJet — Carbon Offset Programme", type: "claim", industry: "Aviation", risk: "high", icon: Globe },
  { id: "s11", name: "Hindustan Zinc ESG Report FY 2025", type: "report", industry: "Mining", risk: "medium", icon: FileText },
  { id: "s12", name: "Ola Electric — Clean Mobility Claims", type: "claim", industry: "EV & Mobility", risk: "low", icon: Globe },
  { id: "s13", name: "ITC Limited — BRSR Core Disclosure", type: "report", industry: "Conglomerate", risk: "low", icon: FileText },
  { id: "s14", name: "Greenwave Textiles — Organic Cotton", type: "company", industry: "Textile", risk: "high", icon: Building2 },
  { id: "s15", name: "Mahindra Group — Sustainability Report", type: "report", industry: "Auto & Infra", risk: "low", icon: FileText },
];

const TRENDING = [
  { name: "BlueSky Airlines Carbon Neutral Claims", risk: "high", reason: "No third-party verification found" },
  { name: "PetroGreen Energy — Zero Emission Promise", risk: "high", reason: "Scope 3 emissions unaccounted" },
  { name: "EcoFresh Packaging Solutions", risk: "medium", reason: "Recycled content % disputed" },
  { name: "SpiceJet — Carbon Offset Programme", risk: "high", reason: "Offset credits non-standard" },
  { name: "Greenwave Textiles — Organic Cotton", risk: "high", reason: "GOTS certification lapsed" },
];

const scanSteps = [
  "Extracting sustainability claims using LLM parser...",
  "Cross-referencing claims against active GRI/BRSR indices...",
  "Running corporate greenwashing detection neural engine...",
  "Synthesizing supplier trust score outputs...",
  "Generating cryptographically verified audit records...",
];

const riskDot = (risk: string) =>
  risk === "high" ? "bg-danger" : risk === "medium" ? "bg-warning" : "bg-accent";

const riskLabel = (risk: string) =>
  risk === "high" ? "High Risk" : risk === "medium" ? "Medium" : "Low Risk";

/* ─── Source Chip ─── */
function SourceChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded border border-accent/20 bg-accent/5 text-[11px] text-accent font-normal"
    >
      {label.length > 40 ? label.slice(0, 40) + "…" : label}
      <button onClick={onRemove} className="h-4 w-4 rounded flex items-center justify-center hover:bg-accent/10 transition-colors">
        <X className="h-3 w-3" />
      </button>
    </motion.span>
  );
}

export default function GreenwashPage() {
  const [stage, setStage] = useState<"input" | "scanning" | "results">("input");
  const [scanStep, setScanStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [sources, setSources] = useState<string[]>(["Metro Transport Co. — Sustainability Report 2025"]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = inputValue.length > 0
    ? SUGGESTIONS.filter(s =>
        s.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !sources.includes(s.name)
      ).slice(0, 6)
    : [];

  const addSource = (name: string) => {
    if (!sources.includes(name) && name.trim()) {
      setSources(prev => [...prev, name]);
    }
    setInputValue("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const removeSource = (name: string) => setSources(prev => prev.filter(s => s !== name));

  const startScan = async () => {
    if (sources.length === 0) return;
    setStage("scanning");
    for (let i = 0; i < scanSteps.length; i++) {
      setScanStep(i);
      await new Promise((r) => setTimeout(r, 900 + Math.random() * 500));
    }
    setStage("results");
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#greenwash-input-area")) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
          <motion.div key="input" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6">

            {/* Multi-Source Input Panel */}
            <div className="rounded border border-white/[0.03] bg-[#0c0c0e]/80 p-6">
              <h3 className="text-[12.5px] font-normal text-text-primary tracking-tight mb-4">Validate Environmental Claims</h3>

              {/* Added Sources */}
              {sources.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  <AnimatePresence>
                    {sources.map(s => (
                      <SourceChip key={s} label={s} onRemove={() => removeSource(s)} />
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Input + Autocomplete */}
              <div id="greenwash-input-area" className="relative">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => { setInputValue(e.target.value); setShowSuggestions(true); }}
                      onFocus={() => inputValue.length > 0 && setShowSuggestions(true)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && inputValue.trim()) addSource(inputValue.trim());
                      }}
                      placeholder="Type company name, report title, or paste a claim…"
                      className="w-full h-9 rounded bg-[#09090b] border border-white/[0.06] px-3 text-[12px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/30 transition-colors font-light"
                    />
                    {/* Autocomplete dropdown */}
                    <AnimatePresence>
                      {showSuggestions && filtered.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.12 }}
                          className="absolute top-full left-0 right-0 mt-1 z-50 rounded border border-white/[0.06] bg-[#0c0c0e] shadow-xl overflow-hidden"
                        >
                          {filtered.map((s) => (
                            <button
                              key={s.id}
                              onMouseDown={(e) => { e.preventDefault(); addSource(s.name); }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/[0.03] transition-colors text-left"
                            >
                              <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", riskDot(s.risk))} />
                              <s.icon className="h-3.5 w-3.5 text-text-muted shrink-0" />
                              <span className="text-[12px] text-text-primary font-light flex-1 truncate">{s.name}</span>
                              <span className="text-[9.5px] text-text-muted uppercase tracking-wider shrink-0">{s.industry}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <button
                    onMouseDown={(e) => { e.preventDefault(); if (inputValue.trim()) addSource(inputValue.trim()); }}
                    className="h-9 px-3 rounded border border-white/[0.06] bg-[#09090b] text-text-muted hover:text-text-primary hover:border-white/[0.12] transition-colors flex items-center gap-1.5 text-[11.5px] shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add
                  </button>
                  <button
                    onClick={startScan}
                    disabled={sources.length === 0}
                    className="px-5 h-9 rounded gradient-green text-white text-[11.5px] font-normal tracking-wide hover:opacity-95 transition-opacity flex items-center gap-2 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Scan className="h-3.5 w-3.5 shrink-0" />
                    {sources.length > 1 ? `Scan ${sources.length} Sources` : "Run Scan"}
                  </button>
                </div>
                {sources.length === 0 && (
                  <p className="text-[11px] text-text-muted font-light mt-2">Add at least one source to begin scanning.</p>
                )}
              </div>
            </div>

            {/* Two-column layout: capabilities + trending feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Capabilities */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
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

              {/* Trending Investigations Feed */}
              <div className="rounded border border-white/[0.03] bg-[#0c0c0e] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-3.5 w-3.5 text-danger/70" />
                  <p className="text-[11px] font-normal text-text-primary tracking-tight">Trending Investigations</p>
                </div>
                <div className="space-y-2">
                  {TRENDING.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => { if (!sources.includes(t.name)) setSources(prev => [...prev, t.name]); }}
                      className="w-full flex items-start gap-2.5 p-2.5 rounded hover:bg-white/[0.03] transition-colors text-left group"
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0 mt-1.5", riskDot(t.risk))} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11.5px] text-text-secondary group-hover:text-text-primary transition-colors font-light leading-snug line-clamp-1">{t.name}</p>
                        <p className="text-[10px] text-text-muted font-light mt-0.5 leading-none">{t.reason}</p>
                      </div>
                      <Plus className="h-3 w-3 text-text-muted shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {stage === "scanning" && (
          <motion.div key="scanning" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="rounded border border-white/[0.03] bg-[#0c0c0e] p-8">
            <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-white/[0.02]">
              <div className="h-8.5 w-8.5 rounded bg-danger/5 border border-danger/15 flex items-center justify-center">
                <ShieldAlert className="h-4 w-4 text-danger animate-pulse" />
              </div>
              <div>
                <p className="text-[13px] font-normal text-text-primary tracking-tight">
                  Scanning {sources.length} Source{sources.length > 1 ? "s" : ""}
                </p>
                <p className="text-[11.5px] text-text-muted font-light mt-0.5">Corporate verification agent running heuristics...</p>
              </div>
            </div>
            <div className="space-y-4">
              {scanSteps.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex items-center gap-4">
                  {i < scanStep ? <CheckCircle className="h-4.5 w-4.5 text-accent shrink-0" /> :
                   i === scanStep ? <Loader2 className="h-4.5 w-4.5 text-accent animate-spin shrink-0" /> :
                   <div className="h-4.5 w-4.5 rounded-full border border-white/[0.06] shrink-0" />}
                  <span className={cn("text-[12.5px] font-light tracking-tight", i <= scanStep ? "text-text-primary" : "text-text-muted")}>{s}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {stage === "results" && (
          <motion.div key="results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6">
            {/* Score Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-6 flex flex-col items-center select-none">
                <h3 className="text-[12px] font-light text-text-muted uppercase tracking-widest mb-4">Aggregate Trust Index</h3>
                <ScoreGauge score={greenwashResults.overallScore} maxScore={100} label="Risk Rating" />
                <span className="mt-4 text-[9.5px] font-normal px-2.5 py-0.5 rounded border uppercase tracking-wider bg-danger/5 text-danger/90 border-danger/10">
                  {greenwashResults.riskLevel} Risk Profile
                </span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="lg:col-span-2 rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-6 flex flex-col justify-between">
                <h3 className="text-[12.5px] font-medium text-text-primary tracking-tight mb-3">Scan Telemetry — {sources.length} Source{sources.length > 1 ? "s" : ""}</h3>
                {/* Per-source summary */}
                {sources.length > 1 && (
                  <div className="mb-4 space-y-1.5">
                    {sources.map((src, i) => {
                      const riskVariant = i % 3 === 0 ? "high" : i % 3 === 1 ? "medium" : "low";
                      return (
                        <div key={src} className="flex items-center gap-2.5 py-1.5 border-b border-white/[0.02] last:border-0">
                          <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", riskDot(riskVariant))} />
                          <span className="text-[11.5px] text-text-secondary font-light flex-1 truncate">{src}</span>
                          <span className={cn("text-[9px] px-2 py-0.5 rounded border uppercase tracking-wider shrink-0",
                            riskVariant === "high" ? "bg-danger/5 text-danger border-danger/15" :
                            riskVariant === "medium" ? "bg-warning/5 text-warning border-warning/15" :
                            "bg-accent/5 text-accent border-accent/15"
                          )}>{riskLabel(riskVariant)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-y border-white/[0.02]">
                  <div className="text-center"><p className="text-2xl font-light font-mono text-text-primary">{greenwashResults.scannedClaims * sources.length}</p><p className="text-[10px] text-text-muted font-light mt-1.5 uppercase tracking-wider">Claims Scanned</p></div>
                  <div className="text-center"><p className="text-2xl font-light font-mono text-danger/95">{greenwashResults.flaggedClaims * sources.length}</p><p className="text-[10px] text-text-muted font-light mt-1.5 uppercase tracking-wider">Claims Flagged</p></div>
                  <div className="text-center"><p className="text-2xl font-light font-mono text-accent/95">{(greenwashResults.scannedClaims - greenwashResults.flaggedClaims) * sources.length}</p><p className="text-[10px] text-text-muted font-light mt-1.5 uppercase tracking-wider">Verified</p></div>
                  <div className="text-center"><p className="text-2xl font-light font-mono text-info/95">{greenwashResults.confidence}%</p><p className="text-[10px] text-text-muted font-light mt-1.5 uppercase tracking-wider">Confidence</p></div>
                </div>
                <div className="mt-4 text-[11px] text-text-muted font-light leading-relaxed">
                  Verified using <strong>Bidirectional Claim Cross-Referencing Model v2.4</strong> against global indices.
                </div>
              </motion.div>
            </div>

            {/* Claim Analysis */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-6">
              <h3 className="text-[12.5px] font-medium text-text-primary tracking-tight mb-4">Detailed Claim Audits</h3>
              <div className="space-y-3">
                {greenwashResults.claims.map((claim, i) => (
                  <motion.div key={claim.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                    className={cn("p-4 rounded border transition-colors", claim.status === "Flagged" ? "border-danger/15 bg-danger/[0.02]" : "border-accent/15 bg-accent/[0.02]")}>
                    <div className="flex items-start gap-3">
                      {claim.status === "Flagged" ? <XCircle className="h-4.5 w-4.5 text-danger shrink-0 mt-0.5" /> : <CheckCircle className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-[12.5px] font-normal text-text-primary tracking-tight leading-relaxed">&quot;{claim.text}&quot;</p>
                          <span className={cn("text-[8.5px] font-normal px-2 py-0.5 rounded border shrink-0 tracking-wider uppercase",
                            claim.status === "Flagged" ? "bg-danger/5 text-danger/90 border-danger/10" : "bg-accent/5 text-accent/90 border-accent/10"
                          )}>{claim.status}</span>
                        </div>
                        <p className="text-[11.5px] text-text-muted font-light mt-1.5 flex items-start gap-1 leading-relaxed">
                          <AlertTriangle className="h-3 w-3 shrink-0 mt-0.5 text-warning/70" />{claim.reason}
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

            <button onClick={() => { setStage("input"); setSources([]); }} className="text-[12px] font-light text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5">
              ← Scan another disclosure report
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
