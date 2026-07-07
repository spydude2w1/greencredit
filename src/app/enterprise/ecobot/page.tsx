"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Zap, CheckCircle, Loader2, ArrowRight,
  RotateCcw, Activity, Database, Cpu, ChevronRight,
  Plus, Clock, FileText, BarChart3, Truck, ShieldAlert,
  Settings, ShoppingBag, Building2, ChevronDown, Send, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MISSIONS, AGENTS, KNOWLEDGE_SOURCES, PIPELINE_STAGES,
  QUICK_ACTIONS, CONNECTORS, MISSION_HISTORY,
  resolveIntent,
  type MissionTemplate, type MissionResult,
} from "@/lib/data/ecobot-data";

/* ─── Types ─── */
interface ChatMessage {
  id: string;
  role: "user" | "agent";
  text?: string;
  missionTitle?: string;
  phase: "sent" | "pipeline" | "complete";
  pipelineIdx?: number;
  result?: MissionResult;
  confidence?: number;
}

/* ─── Sidebar Nav ─── */
const SIDEBAR_NAV = [
  { label: "Carbon Analysis", icon: BarChart3, href: "/enterprise/carbon" },
  { label: "Scope 3", icon: Activity, href: "/enterprise/carbon" },
  { label: "Greenwash Detection", icon: ShieldAlert, href: "/enterprise/greenwash" },
  { label: "Suppliers", icon: Truck, href: "/enterprise/suppliers" },
  { label: "Marketplace", icon: ShoppingBag, href: "/enterprise/analytics" },
  { label: "Settings", icon: Settings, href: "/enterprise/settings" },
];

export default function EcoBotAgentOS() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [connectorsOpen, setConnectorsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, []);

  // auto-scroll when messages change
  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const executeMission = useCallback(async (m: MissionTemplate, userText: string) => {
    if (isRunning) return;
    setIsRunning(true);

    // 1. Add user message
    const userId = `user-${Date.now()}`;
    const agentId = `agent-${Date.now()}`;
    setMessages(prev => [...prev,
      { id: userId, role: "user", text: userText || m.title, phase: "sent" },
      { id: agentId, role: "agent", missionTitle: m.title, phase: "pipeline", pipelineIdx: -1 },
    ]);

    // 2. Animate pipeline
    for (let i = 0; i < PIPELINE_STAGES.length; i++) {
      await new Promise(r => setTimeout(r, 350));
      setMessages(prev => prev.map(msg =>
        msg.id === agentId ? { ...msg, pipelineIdx: i } : msg
      ));
    }

    // 3. Complete
    await new Promise(r => setTimeout(r, 500));
    setMessages(prev => prev.map(msg =>
      msg.id === agentId
        ? { ...msg, phase: "complete", result: m.result, confidence: m.result.confidence }
        : msg
    ));
    setIsRunning(false);
  }, [isRunning]);

  const handleSubmit = () => {
    if (!inputValue.trim() || isRunning) return;
    const resolved = resolveIntent(inputValue);
    const text = inputValue;
    setInputValue("");
    executeMission(resolved, text);
  };

  const handleQuickAction = (missionId: string) => {
    if (isRunning) return;
    const m = MISSIONS.find(x => x.id === missionId) || MISSIONS[0];
    executeMission(m, m.title);
  };

  const handleNewMission = () => {
    setMessages([]);
    setInputValue("");
    setIsRunning(false);
  };

  const showWelcome = messages.length === 0;

  return (
    <div className="flex gap-0 -m-8 h-[calc(100vh-72px)] font-sans text-text-primary antialiased overflow-hidden">
      {/* ══════ LEFT SIDEBAR ══════ */}
      <aside className="w-[260px] shrink-0 border-r border-white/[0.03] bg-[#0a0a0c] flex-col overflow-hidden hidden lg:flex">
        {/* Brand */}
        <div className="p-5 border-b border-white/[0.03]">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Bot className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-text-primary tracking-tight leading-none">EcoBot</p>
              <p className="text-[10px] text-accent/80 mt-1 font-light">Agent OS v2.0</p>
            </div>
            <span className="ml-auto h-2 w-2 rounded-full bg-accent animate-pulse" />
          </div>
        </div>

        {/* New Mission */}
        <div className="p-3">
          <button onClick={handleNewMission}
            className="flex w-full items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-[12.5px] font-normal bg-accent/10 text-accent border border-accent/20 hover:bg-accent/15 transition-colors">
            <Plus className="h-4 w-4" /> New Mission
          </button>
        </div>

        {/* Mission History */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-3 pb-3">
          <p className="text-[10px] uppercase tracking-widest text-text-muted font-light px-2 mb-2 mt-1">Mission History</p>
          <div className="space-y-0.5">
            {MISSION_HISTORY.map(h => (
              <button key={h.id} onClick={() => {
                const m = MISSIONS.find(x => x.id === h.missionId);
                if (m) executeMission(m, h.title);
              }}
                className="flex items-start gap-2.5 w-full text-left px-2.5 py-2 rounded hover:bg-white/[0.02] transition-colors group">
                <CheckCircle className="h-3.5 w-3.5 text-accent/60 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] text-text-secondary font-light leading-snug line-clamp-1 group-hover:text-text-primary transition-colors">{h.title}</p>
                  <p className="text-[9.5px] text-text-muted font-light mt-0.5">{h.timestamp} · {h.confidence}%</p>
                </div>
              </button>
            ))}
          </div>

          {/* Connectors */}
          <button onClick={() => setConnectorsOpen(!connectorsOpen)}
            className="flex items-center gap-2 w-full text-left px-2 mt-4 mb-2">
            <p className="text-[10px] uppercase tracking-widest text-text-muted font-light">Connectors</p>
            <ChevronDown className={cn("h-3 w-3 text-text-muted transition-transform", connectorsOpen && "rotate-180")} />
            <span className="ml-auto text-[9px] text-accent/70 font-mono">{CONNECTORS.filter(c => c.status === "connected").length}/{CONNECTORS.length}</span>
          </button>
          <AnimatePresence>
            {connectorsOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="space-y-0.5 overflow-hidden">
                {CONNECTORS.map(c => (
                  <div key={c.id} className="flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px]">
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0",
                      c.status === "connected" ? "bg-accent" : c.status === "pending" ? "bg-warning animate-pulse" : "bg-text-muted"
                    )} />
                    <c.icon className="h-3 w-3 text-text-muted shrink-0" />
                    <span className="text-text-secondary font-light truncate flex-1">{c.name}</span>
                    <span className="text-[9px] text-text-muted font-light shrink-0">{c.lastSync}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <p className="text-[10px] uppercase tracking-widest text-text-muted font-light px-2 mb-2 mt-4">Navigate</p>
          {SIDEBAR_NAV.map(n => (
            <a key={n.label} href={n.href}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded text-[11.5px] text-text-secondary font-light hover:bg-white/[0.02] hover:text-text-primary transition-colors">
              <n.icon className="h-3.5 w-3.5 opacity-60" />
              {n.label}
            </a>
          ))}
        </div>
      </aside>

      {/* ══════ CENTER PANEL — CHAT THREAD ══════ */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Scrollable thread */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar">
          <div className="max-w-3xl mx-auto w-full px-6 lg:px-8 py-6">
            {/* Welcome state */}
            {showWelcome && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                {/* Header */}
                <div className="text-center pt-8 pb-2">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-accent/10 border border-accent/20 mb-4">
                    <Bot className="h-7 w-7 text-accent" />
                  </div>
                  <h1 className="text-2xl font-light text-text-primary tracking-tight">EcoBot Agent OS</h1>
                  <p className="text-[13px] text-text-muted font-light mt-1.5">Enterprise Sustainability Intelligence</p>
                  <div className="flex items-center justify-center gap-2 flex-wrap mt-4">
                    {[
                      { label: "Organization", value: "Acme Manufacturing", icon: Building2 },
                      { label: "Quarter", value: "Q2 2026", icon: Clock },
                      { label: "Scope", value: "Scope 3", icon: Activity },
                    ].map(chip => (
                      <div key={chip.label}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-[10.5px]">
                        <chip.icon className="h-3 w-3 text-text-muted" />
                        <span className="text-text-muted font-light">{chip.label}:</span>
                        <span className="text-text-primary font-normal">{chip.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-text-muted font-light mb-3 text-center">Quick Actions</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                    {QUICK_ACTIONS.map((qa, i) => (
                      <motion.button key={qa.id}
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                        onClick={() => handleQuickAction(qa.missionId)}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl border border-white/[0.04] bg-[#0c0c0e] hover:border-accent/15 hover:bg-accent/[0.02] transition-all text-left group">
                        <span className="text-base shrink-0 mt-0.5">{qa.icon}</span>
                        <div className="min-w-0">
                          <p className="text-[11.5px] font-normal text-text-primary tracking-tight leading-snug">{qa.title}</p>
                          <p className="text-[10px] text-text-muted font-light mt-0.5 leading-relaxed line-clamp-1">{qa.description}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Chat messages */}
            {messages.map(msg => (
              <motion.div key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("mb-5", msg.role === "user" ? "flex justify-end" : "")}>

                {/* ─── User bubble ─── */}
                {msg.role === "user" && (
                  <div className="max-w-[80%] px-4.5 py-3 rounded-2xl rounded-br-sm bg-accent/10 border border-accent/15">
                    <p className="text-[13.5px] text-text-primary font-light leading-relaxed">{msg.text}</p>
                  </div>
                )}

                {/* ─── Agent response ─── */}
                {msg.role === "agent" && (
                  <div className="space-y-0">
                    {/* Agent avatar + title */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="h-7 w-7 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center">
                        <Bot className="h-3.5 w-3.5 text-accent" />
                      </div>
                      <span className="text-[12px] font-normal text-text-primary tracking-tight">EcoBot Agent</span>
                      {msg.phase === "pipeline" && (
                        <span className="text-[9px] uppercase tracking-wider text-accent px-2 py-0.5 rounded border border-accent/15 bg-accent/5 animate-pulse">Processing</span>
                      )}
                      {msg.phase === "complete" && msg.confidence && (
                        <span className="text-[9px] uppercase tracking-wider text-accent px-2 py-0.5 rounded border border-accent/15 bg-accent/5">{msg.confidence}% confidence</span>
                      )}
                    </div>

                    {/* Pipeline animation */}
                    {msg.phase === "pipeline" && (
                      <div className="rounded-xl border border-white/[0.04] bg-[#0c0c0e] p-4 space-y-2">
                        <p className="text-[11px] text-text-muted font-light mb-3">Executing: {msg.missionTitle}</p>
                        {PIPELINE_STAGES.map((stage, i) => (
                          <motion.div key={i}
                            initial={{ opacity: 0.25 }}
                            animate={{ opacity: (msg.pipelineIdx ?? -1) >= i ? 1 : 0.25 }}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg">
                            {(msg.pipelineIdx ?? -1) > i ? (
                              <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                            ) : (msg.pipelineIdx ?? -1) === i ? (
                              <Loader2 className="h-4 w-4 text-accent animate-spin shrink-0" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border border-white/[0.08] shrink-0" />
                            )}
                            <span className={cn("text-[12px] font-light", (msg.pipelineIdx ?? -1) >= i ? "text-text-primary" : "text-text-muted")}>{stage.label}</span>
                            <span className="text-[9.5px] text-text-muted font-light ml-auto">{stage.sublabel}</span>
                          </motion.div>
                        ))}
                        <div className="flex items-center gap-2 text-[10.5px] text-text-muted font-light pt-2 pl-3">
                          <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
                          Generating structured intelligence...
                        </div>
                      </div>
                    )}

                    {/* Completed result card */}
                    {msg.phase === "complete" && msg.result && (
                      <div className="rounded-xl border border-accent/10 bg-[#0c0c0e] overflow-hidden">
                        {/* Mission header bar */}
                        <div className="flex items-center gap-2.5 px-5 py-3 border-b border-white/[0.03] bg-accent/[0.02]">
                          <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                          <span className="text-[12.5px] font-normal text-text-primary tracking-tight">{msg.missionTitle}</span>
                          <span className="text-[9px] text-accent ml-auto uppercase tracking-wider font-light">Mission Complete</span>
                        </div>

                        <div className="p-5 space-y-5">
                          {/* Impact metrics */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                            {msg.result.impact.map(m => (
                              <div key={m.label} className="p-3 rounded-lg border border-white/[0.04] bg-[#09090b] text-center">
                                <p className={cn("text-base font-light font-mono tracking-tight",
                                  m.trend === "up" ? "text-accent" : m.trend === "down" ? "text-info" : "text-text-primary"
                                )}>{m.value}</p>
                                <p className="text-[9px] text-text-muted uppercase tracking-wider mt-0.5">{m.label}</p>
                              </div>
                            ))}
                          </div>

                          {/* Summary */}
                          <p className="text-[13px] text-text-primary font-light leading-relaxed">{msg.result.summary}</p>

                          {/* Findings */}
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-text-muted font-light mb-2">Key Findings</p>
                            <div className="space-y-1.5">
                              {msg.result.findings.map((f, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                                  className="flex items-start gap-2 px-3 py-2 rounded-lg border border-white/[0.03] bg-[#09090b]">
                                  <ChevronRight className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                                  <p className="text-[12px] text-text-primary font-light leading-relaxed">{f}</p>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Recommendations */}
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-text-muted font-light mb-2">Recommendations</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {msg.result.recommendations.map((r, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                  className="flex items-start gap-2 px-3 py-2.5 rounded-lg border border-accent/8 bg-accent/[0.015]">
                                  <span className="text-[10px] font-mono text-accent/50 shrink-0 mt-0.5">{i + 1}.</span>
                                  <p className="text-[11.5px] text-text-primary font-light leading-relaxed">{r}</p>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Actions row */}
                          <div className="flex items-center flex-wrap gap-2 pt-2 border-t border-white/[0.03]">
                            {msg.result.nextActions.map((a, i) => (
                              <button key={a}
                                className={cn("h-8 px-3.5 rounded-lg text-[11.5px] font-normal transition-all flex items-center gap-1.5",
                                  i === 0
                                    ? "gradient-green text-white hover:opacity-95"
                                    : "border border-white/[0.06] bg-white/[0.02] text-text-secondary hover:text-text-primary hover:border-accent/15"
                                )}>
                                {a} {i === 0 && <ArrowRight className="h-3 w-3" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Input bar (pinned bottom) ─── */}
        <div className="border-t border-white/[0.03] bg-[#09090b]/80 backdrop-blur-xl px-6 lg:px-8 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2.5">
              <input value={inputValue} onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                disabled={isRunning}
                placeholder="Assign a sustainability mission..."
                className="flex-1 h-12 rounded-xl bg-[#0c0c0e] border border-white/[0.06] px-5 text-[14px] text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent/25 transition-colors font-light disabled:opacity-50" />
              <button onClick={handleSubmit} disabled={!inputValue.trim() || isRunning}
                className="h-12 px-5 rounded-xl gradient-green text-white text-[13px] font-normal hover:opacity-95 transition-opacity flex items-center gap-2 shrink-0 disabled:opacity-50">
                <Zap className="h-4 w-4" /> Assign Mission
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════ RIGHT PANEL ══════ */}
      <aside className="w-[280px] shrink-0 border-l border-white/[0.03] bg-[#0a0a0c] overflow-y-auto no-scrollbar hidden xl:flex flex-col p-5 space-y-5">
        {/* Agent Network */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="h-3.5 w-3.5 text-accent/70" />
            <p className="text-[11px] font-normal text-text-primary tracking-tight">Agent Network</p>
            <span className="ml-auto text-[9px] uppercase tracking-wider text-accent/80 px-1.5 py-0.5 rounded border border-accent/15 bg-accent/5">
              {AGENTS.length} Online
            </span>
          </div>
          <div className="space-y-2">
            {AGENTS.map(a => (
              <div key={a.id} className="p-3 rounded-lg border border-white/[0.03] bg-[#09090b]">
                <div className="flex items-center gap-2 mb-1.5">
                  <a.icon className={cn("h-3.5 w-3.5", a.color)} />
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[9px] font-mono text-text-muted ml-auto">{a.baseConfidence}%</span>
                </div>
                <p className="text-[11px] font-normal text-text-primary tracking-tight leading-snug">{a.name}</p>
                <p className="text-[9.5px] text-text-muted font-light mt-0.5 line-clamp-1">{a.purpose}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Knowledge Sources */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Database className="h-3.5 w-3.5 text-info/70" />
            <p className="text-[11px] font-normal text-text-primary tracking-tight">Knowledge Sources</p>
          </div>
          <div className="space-y-1">
            {KNOWLEDGE_SOURCES.map(src => (
              <div key={src} className="flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] text-text-secondary font-light">
                <CheckCircle className="h-3 w-3 text-accent/50 shrink-0" /> {src}
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-3.5 w-3.5 text-accent/70" />
            <p className="text-[11px] font-normal text-text-primary tracking-tight">System Status</p>
          </div>
          <div className="space-y-2">
            {[
              { label: "Uptime", value: "99.97%" },
              { label: "Tasks Processed", value: "429" },
              { label: "Model Version", value: "ACTRM v3.2" },
              { label: "Latency", value: "142ms" },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between px-2.5 py-1.5 rounded border border-white/[0.02] bg-[#09090b] text-[10.5px]">
                <span className="text-text-muted font-light">{s.label}</span>
                <span className="text-text-primary font-mono">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
