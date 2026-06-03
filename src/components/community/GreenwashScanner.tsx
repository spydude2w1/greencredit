"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X, Plus, Building2, FileText, Globe, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  { id: "s1", name: "Reliance Industries Ltd", type: "company", industry: "Petrochemical", risk: "high", icon: Building2 },
  { id: "s2", name: "Metro Transport Co. — Sustainability Report 2025", type: "report", industry: "Logistics", risk: "medium", icon: FileText },
  { id: "s3", name: "EcoFresh Packaging Solutions", type: "company", industry: "Manufacturing", risk: "medium", icon: Building2 },
  { id: "s4", name: "Nestlé India — ESG Disclosure", type: "report", industry: "FMCG", risk: "medium", icon: FileText },
  { id: "s5", name: "BlueSky Airlines Claims", type: "claim", industry: "Aviation", risk: "high", icon: Globe },
];

const riskDot = (risk: string) =>
  risk === "high" ? "bg-danger" : risk === "medium" ? "bg-warning" : "bg-accent";

function SourceChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded border border-accent/20 bg-accent/5 text-[11px] text-accent font-normal"
    >
      {label.length > 30 ? label.slice(0, 30) + "…" : label}
      <button onClick={onRemove} className="h-4 w-4 rounded flex items-center justify-center hover:bg-accent/10 transition-colors">
        <X className="h-3 w-3" />
      </button>
    </motion.span>
  );
}

export default function GreenwashScanner() {
  const [stage, setStage] = useState<"input" | "scanning" | "results">("input");
  const [inputValue, setInputValue] = useState("");
  const [sources, setSources] = useState<string[]>(["Metro Transport Co."]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = inputValue.length > 0
    ? SUGGESTIONS.filter(s =>
        s.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !sources.includes(s.name)
      ).slice(0, 4)
    : [];

  const addSource = (name: string) => {
    if (!sources.includes(name) && name.trim()) {
      setSources(prev => [...prev, name]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeSource = (name: string) => setSources(prev => prev.filter(s => s !== name));

  const startScan = async () => {
    if (sources.length === 0) return;
    setStage("scanning");
    await new Promise((r) => setTimeout(r, 2500));
    setStage("results");
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#community-greenwash-area")) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="rounded-xl border border-white/[0.04] bg-[#0c0c0e] flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-white/[0.04] bg-[#09090b] flex items-center gap-3">
        <ShieldAlert className="h-4.5 w-4.5 text-danger/80" />
        <div>
          <h2 className="text-[14px] font-medium text-text-primary tracking-tight">Greenwashing Detect</h2>
          <p className="text-[10.5px] text-text-muted font-light mt-0.5">Validate environmental claims</p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {stage === "input" && (
            <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {sources.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {sources.map(s => (
                      <SourceChip key={s} label={s} onRemove={() => removeSource(s)} />
                    ))}
                  </AnimatePresence>
                </div>
              )}

              <div id="community-greenwash-area" className="relative">
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
                      placeholder="Type brand name or claim..."
                      className="w-full h-9 rounded bg-[#09090b] border border-white/[0.06] px-3 text-[12px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/30 transition-colors font-light"
                    />
                    <AnimatePresence>
                      {showSuggestions && filtered.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="absolute bottom-full left-0 right-0 mb-1 z-50 rounded border border-white/[0.06] bg-[#0c0c0e] shadow-xl overflow-hidden"
                        >
                          {filtered.map((s) => (
                            <button
                              key={s.id}
                              onMouseDown={(e) => { e.preventDefault(); addSource(s.name); }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/[0.03] transition-colors text-left"
                            >
                              <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", riskDot(s.risk))} />
                              <s.icon className="h-3.5 w-3.5 text-text-muted shrink-0" />
                              <span className="text-[11px] text-text-primary font-light flex-1 truncate">{s.name}</span>
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
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={startScan}
                    disabled={sources.length === 0}
                    className="px-4 h-9 rounded gradient-green text-white text-[11.5px] font-normal hover:opacity-95 transition-opacity disabled:opacity-40 shrink-0"
                  >
                    Scan
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "scanning" && (
            <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center py-4">
              <Loader2 className="h-6 w-6 text-accent animate-spin mb-3" />
              <p className="text-[12px] text-text-primary font-light">Cross-referencing claims...</p>
            </motion.div>
          )}

          {stage === "results" && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center py-2">
              <div className="h-10 w-10 rounded-full bg-warning/10 border border-warning/20 flex items-center justify-center mb-3">
                <ShieldAlert className="h-5 w-5 text-warning" />
              </div>
              <p className="text-[13px] text-text-primary font-medium mb-1">Medium Risk Detected</p>
              <p className="text-[11px] text-text-muted font-light mb-4">Inconsistencies found in latest sustainability report.</p>
              <button
                onClick={() => { setStage("input"); setSources([]); }}
                className="px-4 py-2 rounded border border-white/[0.06] text-[11px] text-text-secondary hover:text-text-primary hover:bg-white/[0.02] transition-colors"
              >
                Scan Another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
