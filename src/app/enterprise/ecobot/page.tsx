"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Zap, CheckCircle, Loader2, AlertTriangle, ArrowRight, RotateCcw, Activity, Database, Shield, Cpu, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MISSIONS, AGENTS, KNOWLEDGE_SOURCES, EXECUTION_STAGES, RECOMMENDED_ACTIONS, type MissionTemplate } from "@/lib/data/ecobot-data";

type Phase = "idle" | "planning" | "executing" | "complete";

export default function EcoBotAgentOS() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [mission, setMission] = useState<MissionTemplate | null>(null);
  const [stageIdx, setStageIdx] = useState(-1);
  const [healActive, setHealActive] = useState(false);
  const [healDone, setHealDone] = useState(false);
  const [sourcesFound, setSourcesFound] = useState(0);
  const [agentTasks, setAgentTasks] = useState<Record<string, number>>({});
  const [inputValue, setInputValue] = useState("");

  const resetAll = useCallback(() => {
    setPhase("idle"); setMission(null); setStageIdx(-1);
    setHealActive(false); setHealDone(false); setSourcesFound(0);
    setAgentTasks({}); setInputValue("");
  }, []);

  const executeMission = useCallback(async (m: MissionTemplate) => {
    setMission(m); setPhase("planning");
    await new Promise(r => setTimeout(r, 2000));
    setPhase("executing");
    for (let i = 0; i < EXECUTION_STAGES.length; i++) {
      setStageIdx(i);
      if (i === 2) { // retrieval stage
        for (let s = 0; s <= 12; s++) { await new Promise(r => setTimeout(r, 120)); setSourcesFound(s); }
      }
      if (i === 3) { // deploying agents — animate task counters
        const interval = setInterval(() => {
          setAgentTasks(prev => {
            const next = { ...prev };
            AGENTS.forEach(a => { next[a.id] = (next[a.id] || 0) + Math.floor(Math.random() * 3); });
            return next;
          });
        }, 200);
        await new Promise(r => setTimeout(r, EXECUTION_STAGES[i].duration));
        clearInterval(interval);
        continue;
      }
      if (i === 5) { // recovery stage
        setHealActive(true);
        await new Promise(r => setTimeout(r, 2200));
        setHealDone(true);
        await new Promise(r => setTimeout(r, 800));
      }
      await new Promise(r => setTimeout(r, EXECUTION_STAGES[i].duration));
    }
    setPhase("complete");
  }, []);

  const handleExecute = () => {
    const match = MISSIONS.find(m => m.title.toLowerCase().includes(inputValue.toLowerCase()));
    const selected = match || mission || MISSIONS[0];
    executeMission(selected);
  };

  return (
    <div className="space-y-6 font-sans text-text-primary antialiased">
      {/* Header */}
      <div className="pb-3 border-b border-white/[0.02]">
        <h1 className="text-xl font-light text-text-primary flex items-center gap-2.5 tracking-tight">
          <Bot className="h-5 w-5 text-accent" />
          EcoBot Agent OS
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
        </h1>
        <p className="text-[12px] text-text-muted font-light mt-1.5">
          Autonomous Sustainability Intelligence & Workflow Automation Platform
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* ═══════ IDLE STATE ═══════ */}
        {phase === "idle" && (
          <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            {/* Zone 1 — Mission Input */}
            <div className="rounded-xl border border-white/[0.04] bg-[#0c0c0e] p-6">
              <p className="text-[13px] font-normal text-text-primary tracking-tight mb-4">What sustainability objective would you like to achieve?</p>
              <div className="flex gap-2.5">
                <input value={inputValue} onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleExecute()}
                  placeholder="e.g. Generate BRSR Report, Analyze Supplier Risks..."
                  className="flex-1 h-11 rounded bg-[#09090b] border border-white/[0.06] px-4 text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/30 transition-colors font-light" />
                <button onClick={handleExecute}
                  className="h-11 px-6 rounded gradient-green text-white text-[12.5px] font-normal tracking-wide hover:opacity-95 transition-opacity flex items-center gap-2 shrink-0">
                  <Zap className="h-4 w-4" /> Execute Mission
                </button>
              </div>
              {/* Mission template grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mt-5">
                {MISSIONS.map((m) => (
                  <button key={m.id} onClick={() => { setMission(m); setInputValue(m.title); }}
                    className={cn("flex items-start gap-3 p-3.5 rounded border text-left transition-all",
                      mission?.id === m.id ? "border-accent/25 bg-accent/[0.03]" : "border-white/[0.03] bg-[#09090b] hover:border-white/[0.08] hover:bg-white/[0.01]")}>
                    <span className="text-lg shrink-0 mt-0.5">{m.icon}</span>
                    <div className="min-w-0">
                      <p className="text-[11.5px] font-normal text-text-primary tracking-tight leading-snug">{m.title}</p>
                      <p className="text-[10px] text-text-muted font-light mt-1 line-clamp-2 leading-relaxed">{m.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Zone 3 — Agent Network */}
            <div className="rounded-xl border border-white/[0.04] bg-[#0c0c0e] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="h-4 w-4 text-accent/70" />
                <h2 className="text-[13px] font-normal text-text-primary tracking-tight">Active Agent Network</h2>
                <span className="ml-auto text-[9.5px] uppercase tracking-wider text-accent/80 px-2 py-0.5 rounded border border-accent/15 bg-accent/5">5 Agents Online</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {AGENTS.map((a, i) => (
                  <motion.div key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    className="p-3.5 rounded border border-white/[0.03] bg-[#09090b]">
                    <div className="flex items-center gap-2 mb-2">
                      <a.icon className={cn("h-4 w-4", a.color)} />
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    </div>
                    <p className="text-[11.5px] font-normal text-text-primary tracking-tight leading-snug">{a.name}</p>
                    <p className="text-[10px] text-text-muted font-light mt-1 leading-relaxed line-clamp-2">{a.purpose}</p>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.02]">
                      <span className="text-[9.5px] text-text-muted font-light">{a.baseTasks} tasks</span>
                      <span className="text-[9.5px] font-mono text-accent/80">{a.baseConfidence}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Zone 4 — Knowledge Retrieval */}
            <div className="rounded-xl border border-white/[0.04] bg-[#0c0c0e] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Database className="h-4 w-4 text-info/70" />
                <h2 className="text-[13px] font-normal text-text-primary tracking-tight">Semantic Sustainability Retrieval</h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {KNOWLEDGE_SOURCES.map((src, i) => (
                  <motion.span key={src} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 px-3 py-2 rounded border border-white/[0.03] bg-[#09090b] text-[11px] text-text-secondary font-light">
                    <CheckCircle className="h-3.5 w-3.5 text-accent/60 shrink-0" /> {src}
                  </motion.span>
                ))}
              </div>
              <p className="text-[10.5px] text-text-muted font-light mt-3">7 indexed knowledge sources · Semantic embedding model active · Ready for context injection</p>
            </div>
          </motion.div>
        )}

        {/* ═══════ PLANNING STATE ═══════ */}
        {phase === "planning" && mission && (
          <motion.div key="planning" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border border-accent/15 bg-[#0c0c0e] p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded bg-accent/5 border border-accent/15 flex items-center justify-center">
                <Zap className="h-5 w-5 text-accent animate-pulse" />
              </div>
              <div>
                <p className="text-[14px] font-normal text-text-primary tracking-tight">Mission Accepted</p>
                <p className="text-[12px] text-text-muted font-light mt-0.5">{mission.title}</p>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-normal text-text-muted uppercase tracking-widest mb-3">AI Execution Plan</p>
              <div className="space-y-2">
                {mission.executionPlan.map((step, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
                    className="flex items-center gap-3 p-3 rounded border border-white/[0.03] bg-[#09090b]">
                    <span className="text-[11px] font-mono text-accent/60 shrink-0 w-5 text-right">{i + 1}.</span>
                    <span className="text-[12px] text-text-primary font-light">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-text-muted font-light">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" /> Initializing agent orchestration...
            </div>
          </motion.div>
        )}

        {/* ═══════ EXECUTING STATE ═══════ */}
        {phase === "executing" && mission && (
          <motion.div key="executing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
            {/* Execution Panel */}
            <div className="rounded-xl border border-accent/10 bg-[#0c0c0e] p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.03]">
                <div className="h-9 w-9 rounded bg-accent/5 border border-accent/15 flex items-center justify-center">
                  <Activity className="h-4.5 w-4.5 text-accent animate-pulse" />
                </div>
                <div>
                  <p className="text-[13px] font-normal text-text-primary tracking-tight">Executing: {mission.title}</p>
                  <p className="text-[11px] text-text-muted font-light mt-0.5">Multi-agent orchestration in progress</p>
                </div>
                <span className="ml-auto text-[9.5px] uppercase tracking-wider text-accent px-2 py-0.5 rounded border border-accent/15 bg-accent/5 animate-pulse">Live</span>
              </div>
              <div className="space-y-3">
                {EXECUTION_STAGES.map((stage, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: i <= stageIdx ? 1 : 0.3, x: 0 }} transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3.5">
                    {i < stageIdx ? <CheckCircle className="h-4.5 w-4.5 text-accent shrink-0" /> :
                     i === stageIdx ? <Loader2 className="h-4.5 w-4.5 text-accent animate-spin shrink-0" /> :
                     <div className="h-4.5 w-4.5 rounded-full border border-white/[0.08] shrink-0" />}
                    <span className={cn("text-[12.5px] font-light tracking-tight flex-1", i <= stageIdx ? "text-text-primary" : "text-text-muted")}>
                      {stage.label}
                    </span>
                    {i === 2 && i <= stageIdx && <span className="text-[10px] font-mono text-info/80">{sourcesFound} sources</span>}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Self-Healing Panel */}
            <AnimatePresence>
              {healActive && (
                <motion.div initial={{ opacity: 0, y: 8, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0 }}
                  className="rounded-xl border border-warning/15 bg-warning/[0.02] p-5 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <Shield className="h-4 w-4 text-warning" />
                    <p className="text-[12px] font-normal text-text-primary tracking-tight">Autonomous Recovery Engine</p>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded border border-warning/10 bg-[#09090b]">
                    <AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" />
                    <p className="text-[11.5px] text-text-secondary font-light leading-relaxed">{mission.healingTrigger.issue}</p>
                  </div>
                  {healDone ? (
                    <div className="flex items-start gap-2.5 p-3 rounded border border-accent/15 bg-accent/[0.02]">
                      <CheckCircle className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                      <p className="text-[11.5px] text-text-secondary font-light leading-relaxed">{mission.healingTrigger.resolution}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[11px] text-warning/80 font-light">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Searching alternative sustainability sources...
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Agent Network (live) */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {AGENTS.map(a => (
                <div key={a.id} className="p-3 rounded border border-white/[0.04] bg-[#0c0c0e]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <a.icon className={cn("h-3.5 w-3.5", a.color)} />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  </div>
                  <p className="text-[10.5px] font-normal text-text-primary tracking-tight leading-snug line-clamp-1">{a.name}</p>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/[0.02]">
                    <span className="text-[9px] text-text-muted font-mono">{a.baseTasks + (agentTasks[a.id] || 0)} tasks</span>
                    <span className="text-[9px] font-mono text-accent/70">{a.baseConfidence}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Knowledge Pipeline */}
            <div className="rounded border border-white/[0.04] bg-[#0c0c0e] p-4">
              <div className="flex items-center gap-2">
                <Database className="h-3.5 w-3.5 text-info/70" />
                <span className="text-[11px] text-text-primary font-light tracking-tight">Semantic Retrieval Pipeline</span>
                <ChevronRight className="h-3 w-3 text-text-muted mx-1" />
                {stageIdx >= 2 ? (
                  <span className="text-[10.5px] text-accent font-mono">{sourcesFound} relevant sources → Context injected into agent workflow</span>
                ) : (
                  <span className="text-[10.5px] text-text-muted font-light flex items-center gap-1.5">
                    <Loader2 className="h-3 w-3 animate-spin" /> Retrieving context...
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══════ COMPLETE STATE ═══════ */}
        {phase === "complete" && mission && (
          <motion.div key="complete" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            {/* Mission Summary */}
            <div className="rounded-xl border border-accent/15 bg-[#0c0c0e] p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-[14px] font-normal text-text-primary tracking-tight">Mission Complete</p>
                  <p className="text-[12px] text-text-muted font-light mt-0.5">{mission.title}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                {[
                  { label: "Agents Deployed", value: "5", color: "text-accent" },
                  { label: "Sources Retrieved", value: String(sourcesFound), color: "text-info" },
                  { label: "Plan Steps", value: String(mission.executionPlan.length), color: "text-warning" },
                  { label: "Issues Recovered", value: "1", color: "text-purple-400" },
                ].map(s => (
                  <div key={s.label} className="p-3.5 rounded border border-white/[0.03] bg-[#09090b] text-center">
                    <p className={cn("text-xl font-light font-mono tracking-tight", s.color)}>{s.value}</p>
                    <p className="text-[9.5px] text-text-muted uppercase tracking-wider mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Execution stages — all complete */}
              <div className="space-y-2 mb-5 pb-5 border-b border-white/[0.02]">
                {EXECUTION_STAGES.map((stage, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-[12px] text-text-primary font-light">{stage.label}</span>
                  </div>
                ))}
              </div>
              {/* Deliverables */}
              <p className="text-[11px] font-normal text-text-muted uppercase tracking-widest mb-3">Generated Deliverables</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {["Sustainability Analysis Report", "Executive Summary Document", "Action Plan & Recommendations"].map((d, i) => (
                  <motion.div key={d} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2.5 p-3 rounded border border-accent/10 bg-accent/[0.02]">
                    <CheckCircle className="h-3.5 w-3.5 text-accent shrink-0" />
                    <span className="text-[11.5px] text-text-primary font-light">{d}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="rounded-xl border border-white/[0.04] bg-[#0c0c0e] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-4 w-4 text-accent/70" />
                <h2 className="text-[13px] font-normal text-text-primary tracking-tight">Recommended Actions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {RECOMMENDED_ACTIONS.map((action, i) => (
                  <motion.button key={action.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="flex flex-col items-start gap-2 p-3.5 rounded border border-white/[0.03] bg-[#09090b] hover:border-accent/15 hover:bg-accent/[0.01] transition-all text-left group">
                    <span className="text-lg">{action.icon}</span>
                    <p className="text-[11.5px] font-normal text-text-primary tracking-tight leading-snug">{action.title}</p>
                    <p className="text-[10px] text-text-muted font-light leading-relaxed line-clamp-2">{action.description}</p>
                    <span className="text-[10px] text-accent/70 group-hover:text-accent flex items-center gap-1 mt-auto transition-colors">
                      Execute <ArrowRight className="h-3 w-3" />
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Agent Network (final state) */}
            <div className="rounded-xl border border-white/[0.04] bg-[#0c0c0e] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="h-4 w-4 text-accent/70" />
                <h2 className="text-[13px] font-normal text-text-primary tracking-tight">Agent Network — Post-Mission</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {AGENTS.map(a => (
                  <div key={a.id} className="p-3 rounded border border-white/[0.03] bg-[#09090b]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <a.icon className={cn("h-3.5 w-3.5", a.color)} />
                      <span className="text-[9px] uppercase tracking-wider text-accent/70">Idle</span>
                    </div>
                    <p className="text-[10.5px] font-normal text-text-primary tracking-tight leading-snug line-clamp-1">{a.name}</p>
                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/[0.02]">
                      <span className="text-[9px] text-text-muted font-mono">{a.baseTasks + (agentTasks[a.id] || 0)} tasks</span>
                      <span className="text-[9px] font-mono text-accent/70">{a.baseConfidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={resetAll} className="text-[12px] font-light text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" /> Initialize New Mission
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
