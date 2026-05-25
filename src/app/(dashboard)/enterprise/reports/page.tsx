"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, ChevronRight, CheckCircle, Loader2, Download,
  Zap, Bot, Radio, Upload, Database, Wifi, Activity,
  Brain, Shield, AlertTriangle, Eye, Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const frameworks = [
  { id: "brsr", name: "BRSR", full: "Business Responsibility & Sustainability Reporting", standard: "SEBI India", sections: 9 },
  { id: "gri", name: "GRI", full: "Global Reporting Initiative", standard: "International", sections: 12 },
  { id: "sdg", name: "SDG", full: "UN Sustainable Development Goals", standard: "United Nations", sections: 17 },
  { id: "cdp", name: "CDP", full: "Carbon Disclosure Project", standard: "Global", sections: 8 },
];

const dataSources = [
  { id: "manual", label: "Manual Input", desc: "Enter organizational data manually via form fields", icon: Database, active: true },
  { id: "upload", label: "Upload Documents", desc: "Upload CSV, PDF, Excel reports for AI extraction", icon: Upload, active: true },
  { id: "sensor", label: "IoT Sensor Feed", desc: "Connect live sensor streams — energy meters, AQI, water flow", icon: Radio, active: true },
  { id: "api", label: "Third-Party API", desc: "Pull data from ERP, HRMS, or carbon accounting tools", icon: Wifi, active: false },
];

const sensorFeeds = [
  { name: "Energy Meter — Main Grid", type: "electricity", value: "342.8 kWh", status: "live", updated: "2s ago" },
  { name: "Solar Panel Array — Roof", type: "solar", value: "58.2 kWh", status: "live", updated: "5s ago" },
  { name: "Water Flow Sensor — Block A", type: "water", value: "1,240 L", status: "live", updated: "8s ago" },
  { name: "AQI Monitor — Campus", type: "air", value: "AQI 82", status: "live", updated: "12s ago" },
  { name: "Waste Scale — Compost Unit", type: "waste", value: "18.5 kg", status: "live", updated: "30s ago" },
  { name: "DG Set — Backup", type: "diesel", value: "0.0 L/hr", status: "idle", updated: "1m ago" },
];

// Agentic processing — the agent thinks, decides, and acts
const agentActions: { type: "think" | "act" | "observe" | "decide" | "complete"; text: string; duration: number }[] = [
  { type: "observe", text: "Scanning 3 connected data sources...", duration: 800 },
  { type: "think", text: "Identified BRSR framework — loading 84 compliance indicators", duration: 1000 },
  { type: "act", text: "Pulling live sensor data from 6 IoT endpoints", duration: 1200 },
  { type: "observe", text: "Extracted 142 data points from uploaded documents", duration: 900 },
  { type: "think", text: "Cross-referencing against GHG Protocol v2024 emission factors", duration: 1400 },
  { type: "decide", text: "Decision: Principle 6 (Environment) has sufficient sensor data for auto-fill", duration: 1000 },
  { type: "act", text: "Generating narrative for 9 environmental disclosure items", duration: 1800 },
  { type: "think", text: "Running anomaly detection on Scope 2 electricity data", duration: 1000 },
  { type: "decide", text: "Decision: Solar generation offsets 17% — adjusting net emissions", duration: 800 },
  { type: "act", text: "Calculating ESG performance indicators across 3 pillars", duration: 1200 },
  { type: "observe", text: "Compliance check: 78/84 indicators populated (92.8%)", duration: 900 },
  { type: "act", text: "Populating report template with verified data", duration: 1000 },
  { type: "think", text: "Quality assurance — validating data consistency across sections", duration: 1200 },
  { type: "complete", text: "Report generation complete — 42 pages, 92.8% compliance coverage", duration: 600 },
];

const reportSections = [
  { title: "Section A: General Disclosures", status: "complete", items: 12, source: "manual" },
  { title: "Section B: Management & Process", status: "complete", items: 8, source: "manual" },
  { title: "Section C: Principle-wise Performance", status: "complete", items: 15, source: "hybrid" },
  { title: "Principle 1: Ethics & Transparency", status: "complete", items: 6, source: "manual" },
  { title: "Principle 2: Product Sustainability", status: "complete", items: 5, source: "manual" },
  { title: "Principle 3: Employee Wellbeing", status: "complete", items: 7, source: "upload" },
  { title: "Principle 4: Stakeholder Engagement", status: "complete", items: 4, source: "manual" },
  { title: "Principle 5: Human Rights", status: "complete", items: 5, source: "manual" },
  { title: "Principle 6: Environmental Protection", status: "ai-generated", items: 9, source: "sensor" },
  { title: "Principle 7: Public Policy", status: "complete", items: 3, source: "manual" },
  { title: "Principle 8: Inclusive Growth", status: "complete", items: 6, source: "upload" },
  { title: "Principle 9: Consumer Value", status: "complete", items: 4, source: "manual" },
];

const sourceLabels: Record<string, { label: string; color: string }> = {
  manual: { label: "Manual", color: "bg-zinc-500/10 text-zinc-400" },
  upload: { label: "Document AI", color: "bg-info/10 text-info" },
  sensor: { label: "Sensor Feed", color: "bg-cyan-500/10 text-cyan-400" },
  hybrid: { label: "Hybrid", color: "bg-purple-500/10 text-purple-400" },
};

export default function ESGReportsPage() {
  const [step, setStep] = useState(1);
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>(["manual"]);
  const [agentStep, setAgentStep] = useState(0);
  const [agentLog, setAgentLog] = useState<typeof agentActions>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const toggleSource = (id: string) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const startAgent = async () => {
    setStep(3);
    setAgentLog([]);
    for (let i = 0; i < agentActions.length; i++) {
      setAgentStep(i);
      setAgentLog((prev) => [...prev, agentActions[i]]);
      await new Promise((r) => setTimeout(r, agentActions[i].duration));
    }
    await new Promise((r) => setTimeout(r, 500));
    setStep(4);
  };

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [agentLog]);

  const actionIcon = (type: string) => {
    switch (type) {
      case "think": return <Brain className="h-3.5 w-3.5 text-purple-400" />;
      case "act": return <Zap className="h-3.5 w-3.5 text-accent" />;
      case "observe": return <Eye className="h-3.5 w-3.5 text-info" />;
      case "decide": return <Shield className="h-3.5 w-3.5 text-warning" />;
      case "complete": return <CheckCircle className="h-3.5 w-3.5 text-accent" />;
      default: return <Activity className="h-3.5 w-3.5 text-text-muted" />;
    }
  };

  const actionColor = (type: string) => {
    switch (type) {
      case "think": return "text-purple-400";
      case "act": return "text-accent";
      case "observe": return "text-info";
      case "decide": return "text-warning";
      case "complete": return "text-accent";
      default: return "text-text-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            ESG Report Agent
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Autonomous AI agent for sustainability report generation
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border-subtle">
          <Bot className="h-4 w-4 text-accent" />
          <span className="text-xs text-text-muted">Agent Status:</span>
          <span className="text-xs font-semibold text-accent">Ready</span>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center gap-2">
        {[
          { n: 1, label: "Framework" },
          { n: 2, label: "Data Sources" },
          { n: 3, label: "Agent Execution" },
          { n: 4, label: "Report" },
        ].map(({ n, label }) => (
          <div key={n} className="flex items-center gap-2">
            <div className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
              n < step ? "bg-accent text-white" :
              n === step ? "border-2 border-accent text-accent" :
              "border border-border text-text-muted"
            )}>
              {n < step ? <CheckCircle className="h-4 w-4" /> : n}
            </div>
            <span className={cn("text-xs font-medium hidden sm:block",
              n === step ? "text-text-primary" : "text-text-muted")}>
              {label}
            </span>
            {n < 4 && <ChevronRight className="h-4 w-4 text-text-muted" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Framework Selection */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h3 className="text-sm font-semibold text-text-primary">Select Reporting Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {frameworks.map((fw) => (
                <button key={fw.id} onClick={() => { setSelectedFramework(fw.id); setStep(2); }}
                  className={cn("p-5 rounded-xl border text-left transition-all card-hover",
                    selectedFramework === fw.id ? "border-accent bg-accent/5" : "border-border-subtle bg-surface hover:border-accent/30")}>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-accent">{fw.name}</span>
                    <span className="text-[10px] text-text-muted px-2 py-0.5 rounded bg-surface-raised">{fw.sections} sections</span>
                  </div>
                  <p className="text-sm text-text-primary mt-1">{fw.full}</p>
                  <p className="text-xs text-text-muted mt-0.5">Standard: {fw.standard}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Data Sources (with sensor option) */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
            <h3 className="text-sm font-semibold text-text-primary">
              Configure Data Sources — {selectedFramework?.toUpperCase()}
            </h3>

            {/* Source Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dataSources.map((src) => (
                <button key={src.id} onClick={() => src.active && toggleSource(src.id)} disabled={!src.active}
                  className={cn("p-4 rounded-xl border text-left transition-all",
                    !src.active ? "border-border-subtle bg-surface opacity-40 cursor-not-allowed" :
                    selectedSources.includes(src.id) ? "border-accent bg-accent/5 glow-green" : "border-border-subtle bg-surface hover:border-accent/30 card-hover")}>
                  <div className="flex items-center gap-3">
                    <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                      selectedSources.includes(src.id) ? "gradient-green" : "bg-surface-raised")}>
                      <src.icon className={cn("h-5 w-5", selectedSources.includes(src.id) ? "text-white" : "text-text-muted")} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-text-primary">{src.label}</p>
                        {!src.active && <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-raised text-text-muted">Coming Soon</span>}
                        {selectedSources.includes(src.id) && <CheckCircle className="h-4 w-4 text-accent" />}
                      </div>
                      <p className="text-xs text-text-muted mt-0.5">{src.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Sensor Feed Preview */}
            {selectedSources.includes("sensor") && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Radio className="h-4 w-4 text-cyan-400" />
                  <h4 className="text-sm font-semibold text-text-primary">Live Sensor Feeds</h4>
                  <span className="flex items-center gap-1 ml-auto text-[10px] text-cyan-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" /> {sensorFeeds.filter(s => s.status === "live").length} Active
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {sensorFeeds.map((feed) => (
                    <div key={feed.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-background/50 border border-border-subtle">
                      <span className={cn("h-2 w-2 rounded-full shrink-0", feed.status === "live" ? "bg-cyan-400 animate-pulse" : "bg-zinc-500")} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-text-primary truncate">{feed.name}</p>
                        <p className="text-[10px] text-text-muted">{feed.updated}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-400">{feed.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Manual Input Fields */}
            <div className="rounded-xl border border-border-subtle bg-surface p-5 space-y-4">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Organization Profile</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Organization Name", value: "AECS MMPS, Bengaluru" },
                  { label: "Reporting Period", value: "FY 2024-25" },
                  { label: "Industry Sector", value: "Education" },
                  { label: "Employee Count", value: "120" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs font-medium text-text-muted">{field.label}</label>
                    <input type="text" defaultValue={field.value}
                      className="w-full mt-1 h-10 rounded-lg bg-background border border-border-subtle px-3 text-sm text-text-primary focus:outline-none focus:border-accent/50 transition-all" />
                  </div>
                ))}
              </div>
              {selectedSources.includes("upload") && (
                <div>
                  <label className="text-xs font-medium text-text-muted">Upload Documents</label>
                  <div className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent/30 transition-colors cursor-pointer">
                    <Upload className="h-6 w-6 text-text-muted mx-auto mb-1" />
                    <p className="text-xs text-text-muted">Drag & drop CSV, PDF, or Excel files</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setStep(1)} className="px-4 py-2 text-sm text-text-muted hover:text-text-primary transition-colors">← Back</button>
              <button onClick={startAgent}
                className="px-6 py-2.5 rounded-lg gradient-green text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 glow-green">
                <Bot className="h-4 w-4" />
                Deploy ESG Agent
              </button>
              <span className="text-[10px] text-text-muted">{selectedSources.length} source(s) configured</span>
            </div>
          </motion.div>
        )}

        {/* Step 3: Agent Execution (Agentic) */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            {/* Agent Header */}
            <div className="rounded-xl border border-accent/20 bg-surface p-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-11 w-11 rounded-xl gradient-green flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-accent border-2 border-surface animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-text-primary">ESG Compliance Agent</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 animate-pulse">EXECUTING</span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Autonomously generating {selectedFramework?.toUpperCase()} report from {selectedSources.length} data source(s)
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-text-muted">Step</p>
                  <p className="text-lg font-bold text-accent stat-number">{Math.min(agentStep + 1, agentActions.length)}/{agentActions.length}</p>
                </div>
              </div>
            </div>

            {/* Agent Log — Terminal Style */}
            <div className="rounded-xl border border-border-subtle bg-background overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-subtle bg-surface">
                <Terminal className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-mono font-semibold text-text-primary">agent.log</span>
                <span className="text-[10px] text-text-muted ml-auto font-mono">pid:ESG-{selectedFramework?.toUpperCase()}-001</span>
              </div>
              <div ref={logRef} className="p-4 space-y-2 max-h-[340px] overflow-y-auto no-scrollbar font-mono">
                {agentLog.map((action, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}
                    className="flex items-start gap-2.5">
                    <span className="text-[10px] text-text-muted mt-0.5 shrink-0 w-[52px] tabular-nums">
                      {String(i).padStart(2, "0")}:{String(Math.floor(Math.random() * 60)).padStart(2, "0")}
                    </span>
                    {actionIcon(action.type)}
                    <span className={cn("text-[10px] font-bold uppercase w-[60px] shrink-0", actionColor(action.type))}>
                      [{action.type}]
                    </span>
                    <span className="text-xs text-text-primary">{action.text}</span>
                  </motion.div>
                ))}
                {agentStep < agentActions.length - 1 && (
                  <div className="flex items-center gap-2 text-text-muted">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />
                    <span className="text-xs">Agent processing...</span>
                    <span className="shimmer-bg h-1 w-16 rounded-full" />
                  </div>
                )}
              </div>
            </div>

            {/* Progress */}
            <div className="h-1.5 rounded-full bg-surface-raised overflow-hidden">
              <motion.div initial={{ width: 0 }}
                animate={{ width: `${((agentStep + 1) / agentActions.length) * 100}%` }}
                className="h-full rounded-full gradient-green" transition={{ duration: 0.3 }} />
            </div>
          </motion.div>
        )}

        {/* Step 4: Report Output */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            {/* Agent Completion */}
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-accent shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">ESG Agent completed successfully</p>
                <p className="text-xs text-text-muted">Autonomous execution finished in 14.2s — no human intervention required</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-accent/10 text-accent">DONE</span>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { label: "Framework", value: selectedFramework?.toUpperCase() || "BRSR" },
                { label: "Sections", value: "12/12" },
                { label: "AI-Generated", value: "9 items" },
                { label: "Data Sources", value: String(selectedSources.length) },
                { label: "Pages", value: "42" },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} className="rounded-xl border border-border-subtle bg-surface p-4 text-center">
                  <p className="text-[10px] text-text-muted">{stat.label}</p>
                  <p className="text-lg font-bold text-accent stat-number mt-0.5">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Report Sections */}
            <div className="rounded-xl border border-border-subtle bg-surface p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-text-primary">Generated Report Sections</h3>
                <button className="px-4 py-2 rounded-lg gradient-green text-white text-sm font-medium hover:opacity-90 flex items-center gap-2">
                  <Download className="h-4 w-4" /> Export PDF
                </button>
              </div>
              <div className="space-y-2">
                {reportSections.map((section, i) => (
                  <motion.div key={section.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border-subtle hover:bg-surface-raised transition-colors">
                    <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-sm text-text-primary flex-1">{section.title}</span>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded", sourceLabels[section.source].color)}>
                      {sourceLabels[section.source].label}
                    </span>
                    {section.status === "ai-generated" && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accent/10 text-accent flex items-center gap-1">
                        <Brain className="h-3 w-3" /> AI Agent
                      </span>
                    )}
                    <span className="text-xs text-text-muted stat-number">{section.items} items</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <button onClick={() => { setStep(1); setSelectedFramework(null); setSelectedSources(["manual"]); }}
              className="text-sm text-text-muted hover:text-text-primary transition-colors">
              ← Deploy agent for another report
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
