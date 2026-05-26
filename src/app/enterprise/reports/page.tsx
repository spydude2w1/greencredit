"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, CheckCircle, Loader2, Download,
  Zap, Bot, Radio, Upload, Database, Wifi, Activity,
  Brain, Shield, AlertTriangle, Eye, Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const frameworks = [
  { id: "brsr", name: "BRSR Core", full: "Business Responsibility & Sustainability Reporting", standard: "SEBI India", sections: 9 },
  { id: "gri", name: "GRI Standards", full: "Global Reporting Initiative Guidelines", standard: "International", sections: 12 },
  { id: "sdg", name: "UN SDGs", full: "United Nations Sustainable Development Goals", standard: "United Nations", sections: 17 },
  { id: "cdp", name: "CDP Climate", full: "Carbon Disclosure Project Framework", standard: "Global", sections: 8 },
];

const dataSources = [
  { id: "manual", label: "Manual Input Data", desc: "Manually fill organizational profile metadata fields", icon: Database, active: true },
  { id: "upload", label: "Upload Disclosures", desc: "Analyze PDF, CSV, Excel sheets via Document AI Engine", icon: Upload, active: true },
  { id: "sensor", label: "IoT Sensor Streams", desc: "Live integration of campus energy, water and carbon monitors", icon: Radio, active: true },
  { id: "api", label: "Enterprise API Integrations", desc: "Autonomous pipeline from ERP, HRMS or corporate accounting", icon: Wifi, active: false },
];

const sensorFeeds = [
  { name: "Grid Electricity Monitor — Main", type: "electricity", value: "342.8 kWh", status: "live", updated: "2s ago" },
  { name: "Solar Array Generation — Roof", type: "solar", value: "58.2 kWh", status: "live", updated: "5s ago" },
  { name: "Flow Meter — Block A Water System", type: "water", value: "1,240 L", status: "live", updated: "8s ago" },
  { name: "Campus AQI Telemetry Core", type: "air", value: "AQI 82", status: "live", updated: "12s ago" },
  { name: "Composting Unit Biomass Scale", type: "waste", value: "18.5 kg", status: "live", updated: "30s ago" },
  { name: "DG Generator Set — Backup Fuel", type: "diesel", value: "0.0 L/hr", status: "idle", updated: "1m ago" },
];

const agentActions: { type: "think" | "act" | "observe" | "decide" | "complete"; text: string; duration: number }[] = [
  { type: "observe", text: "Scanning 3 connected active corporate data streams...", duration: 800 },
  { type: "think", text: "Identified target: SEBI BRSR Core framework. Loading 84 standard disclosures.", duration: 1000 },
  { type: "act", text: "Streaming live telemetry data from 6 localized IoT sensor endpoints.", duration: 1200 },
  { type: "observe", text: "Extracted 142 data indicators from uploaded logistics & procurement files.", duration: 900 },
  { type: "think", text: "Cross-referencing telemetry points with GHG Protocol v2025 Scope 3 factors.", duration: 1400 },
  { type: "decide", text: "Decision: Principle 6 (Environment) telemetry verified. Auto-generating disclosures.", duration: 1000 },
  { type: "act", text: "Synthesizing qualitative narrative for 9 mandatory environmental items.", duration: 1800 },
  { type: "think", text: "Validating anomalies in Scope 2 grid electricity invoices against solar offset logs.", duration: 1000 },
  { type: "decide", text: "Decision: Solar generation offsets 17.2% campus load. Adjusting net carbon footprint.", duration: 800 },
  { type: "act", text: "Computing localized ESG indexes across Environmental, Social & Governance pillars.", duration: 1200 },
  { type: "observe", text: "Audit coverage: 78/84 disclosure indicators fully populated (92.8%).", duration: 900 },
  { type: "act", text: "Injecting structured metadata into standard report schema layout.", duration: 1000 },
  { type: "think", text: "Running quality validation loop across interconnected sections.", duration: 1200 },
  { type: "complete", text: "Report generation complete. 42 pages structured. 92.8% audit coverage verified.", duration: 600 },
];

const reportSections = [
  { title: "Section A: General Disclosures", status: "complete", items: 12, source: "manual" },
  { title: "Section B: Management & Process", status: "complete", items: 8, source: "manual" },
  { title: "Section C: Principle-wise Performance", status: "complete", items: 15, source: "hybrid" },
  { title: "Principle 1: Ethics & Transparency", status: "complete", items: 6, source: "manual" },
  { title: "Principle 2: Product Sustainability", status: "complete", items: 5, source: "manual" },
  { title: "Principle 3: Employee Wellbeing", status: "complete", items: 7, source: "upload" },
  { title: "Principle 4: Stakeholder Engagement", status: "complete", items: 4, source: "manual" },
  { title: "Principle 5: Human Rights Compliance", status: "complete", items: 5, source: "manual" },
  { title: "Principle 6: Environmental Protection", status: "ai-generated", items: 9, source: "sensor" },
  { title: "Principle 7: Public Policy & Advocacy", status: "complete", items: 3, source: "manual" },
  { title: "Principle 8: Inclusive Growth Initiatives", status: "complete", items: 6, source: "upload" },
  { title: "Principle 9: Consumer Value Creation", status: "complete", items: 4, source: "manual" },
];

const sourceLabels: Record<string, { label: string; color: string }> = {
  manual: { label: "Manual Input", color: "bg-white/[0.02] border border-white/[0.04] text-text-muted" },
  upload: { label: "Document AI", color: "bg-info/5 border border-info/15 text-info" },
  sensor: { label: "IoT Streams", color: "bg-cyan-500/5 border border-cyan-500/15 text-cyan-400" },
  hybrid: { label: "Hybrid Core", color: "bg-accent/5 border border-accent/15 text-accent" },
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
    await new Promise((r) => setTimeout(r, 400));
    setStep(4);
  };

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [agentLog]);

  const actionIcon = (type: string) => {
    switch (type) {
      case "think": return <Brain className="h-3.5 w-3.5 text-purple-400 opacity-90" />;
      case "act": return <Zap className="h-3.5 w-3.5 text-accent opacity-90" />;
      case "observe": return <Eye className="h-3.5 w-3.5 text-info opacity-90" />;
      case "decide": return <Shield className="h-3.5 w-3.5 text-warning opacity-90" />;
      case "complete": return <CheckCircle className="h-3.5 w-3.5 text-accent opacity-90" />;
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
    <div className="space-y-8 font-sans text-text-primary antialiased">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.02]">
        <div>
          <h1 className="text-xl font-light text-text-primary flex items-center gap-2 tracking-tight">
            ESG Autonomous Agent
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
          </h1>
          <p className="text-[12px] text-text-muted font-light mt-1.5 leading-relaxed">
            Deploy self-executing agentic workflows to compile compliance reports from disparate enterprise pipelines.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded border border-white/[0.03] bg-[#0c0c0e]">
          <Bot className="h-3.5 w-3.5 text-accent/80" />
          <span className="text-[10.5px] text-text-muted font-light">Status:</span>
          <span className="text-[10.5px] font-normal text-accent uppercase tracking-wider">Ready</span>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center gap-2 border-b border-white/[0.01] pb-4">
        {[
          { n: 1, label: "Framework Select" },
          { n: 2, label: "Integrate Streams" },
          { n: 3, label: "Agent Run" },
          { n: 4, label: "Verify Output" },
        ].map(({ n, label }) => (
          <div key={n} className="flex items-center gap-2">
            <div className={cn(
              "h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-light transition-colors",
              n < step ? "bg-accent/15 text-accent border border-accent/20" :
              n === step ? "border-accent/40 text-accent font-normal bg-accent/5" :
              "border border-white/[0.06] text-text-muted"
            )}>
              {n < step ? <CheckCircle className="h-3.5 w-3.5" /> : n}
            </div>
            <span className={cn(
              "text-[11.5px] font-light hidden sm:block",
              n === step ? "text-text-primary" : "text-text-muted"
            )}>
              {label}
            </span>
            {n < 4 && <ChevronRight className="h-3.5 w-3.5 text-text-muted opacity-40 mx-1" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Framework Selection */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <h3 className="text-[12.5px] font-medium text-text-primary tracking-tight">Select Framework Spec</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {frameworks.map((fw) => (
                <button key={fw.id} onClick={() => { setSelectedFramework(fw.id); setStep(2); }}
                  className={cn("p-5 rounded border text-left transition-colors flex flex-col justify-between h-[130px]",
                    selectedFramework === fw.id ? "border-accent/30 bg-accent/[0.01]" : "border-white/[0.03] bg-[#0c0c0e]/80 hover:border-white/[0.08]")}>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[15px] font-normal text-text-primary tracking-tight">{fw.name}</span>
                    <span className="text-[9px] text-text-muted px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.03] uppercase tracking-wider">{fw.sections} Sections</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-[12px] text-text-secondary font-light leading-snug">{fw.full}</p>
                    <p className="text-[10px] text-text-muted font-light mt-1 uppercase tracking-wider">Standard: {fw.standard}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Data Sources */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <h3 className="text-[12.5px] font-medium text-text-primary tracking-tight">
              Configure Source Integration Pipeline — {selectedFramework?.toUpperCase()}
            </h3>

            {/* Source Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dataSources.map((src) => (
                <button key={src.id} onClick={() => src.active && toggleSource(src.id)} disabled={!src.active}
                  className={cn("p-4 rounded border text-left transition-colors",
                    !src.active ? "border-white/[0.02] bg-[#0c0c0e]/30 opacity-30 cursor-not-allowed" :
                    selectedSources.includes(src.id) ? "border-accent/30 bg-accent/[0.01]" : "border-white/[0.03] bg-[#0c0c0e]/80 hover:border-white/[0.08]")}>
                  <div className="flex items-start gap-3.5">
                    <div className={cn("h-8 w-8 rounded flex items-center justify-center shrink-0 border",
                      selectedSources.includes(src.id) ? "bg-accent/5 border-accent/15 text-accent" : "bg-white/[0.02] border-white/[0.04] text-text-muted")}>
                      <src.icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[12.5px] font-normal text-text-primary tracking-tight leading-none">{src.label}</p>
                        {!src.active && <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/[0.02] border border-white/[0.03] text-text-muted font-light uppercase tracking-wider">Queue</span>}
                        {selectedSources.includes(src.id) && <CheckCircle className="h-3.5 w-3.5 text-accent/80 shrink-0 ml-auto" />}
                      </div>
                      <p className="text-[11px] text-text-muted font-light mt-1.5 leading-relaxed">{src.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Sensor Feed Preview */}
            {selectedSources.includes("sensor") && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="rounded border border-cyan-500/15 bg-cyan-500/[0.01] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Radio className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                  <h4 className="text-[12px] font-normal text-text-primary tracking-tight">Active Edge Sensors Connected</h4>
                  <span className="flex items-center gap-1.5 ml-auto text-[9.5px] text-cyan-400/90 font-light uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" /> {sensorFeeds.filter(s => s.status === "live").length} Stream Live
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sensorFeeds.map((feed) => (
                    <div key={feed.name} className="flex items-center gap-3 p-3 rounded bg-[#09090b] border border-white/[0.03]">
                      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", feed.status === "live" ? "bg-cyan-400 animate-pulse" : "bg-zinc-600")} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-text-primary truncate font-light leading-none">{feed.name}</p>
                        <p className="text-[9px] text-text-muted font-light mt-1">{feed.updated}</p>
                      </div>
                      <span className="text-[11px] font-mono text-cyan-400 shrink-0">{feed.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Manual Input Fields */}
            <div className="rounded border border-white/[0.03] bg-[#0c0c0e] p-5 space-y-4">
              <h4 className="text-[10px] font-light text-text-muted uppercase tracking-widest pb-2 border-b border-white/[0.02]">Organization profile meta</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Entity Legal Name", value: "AECS MMPS, Bengaluru" },
                  { label: "Compliance Period", value: "FY 2025-26" },
                  { label: "Industry Classification", value: "Education & Public Services" },
                  { label: "Verified Core Headcount", value: "120" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-[11px] font-light text-text-muted">{field.label}</label>
                    <input type="text" defaultValue={field.value}
                      className="w-full mt-1.5 h-8.5 rounded bg-[#09090b] border border-white/[0.06] px-3 text-[12px] text-text-primary focus:outline-none focus:border-accent/30 transition-colors font-light" />
                  </div>
                ))}
              </div>
              {selectedSources.includes("upload") && (
                <div className="pt-2">
                  <label className="text-[11px] font-light text-text-muted">Procurement Document Storage</label>
                  <div className="mt-1.5 border border-dashed border-white/[0.08] bg-[#09090b] rounded p-6 text-center hover:border-accent/20 transition-colors cursor-pointer">
                    <Upload className="h-5 w-5 text-text-muted opacity-80 mx-auto mb-1.5" />
                    <p className="text-[11px] text-text-muted font-light">Drag & drop verified billing PDFs, invoices or carbon ledgers</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button onClick={() => setStep(1)} className="px-4 py-2 text-[12px] font-light text-text-muted hover:text-text-primary transition-colors">← Back</button>
              <button onClick={startAgent}
                className="px-5 py-2 rounded gradient-green text-white text-[11.5px] font-normal tracking-wide hover:opacity-95 transition-opacity flex items-center gap-2 ml-auto">
                <Bot className="h-3.5 w-3.5 shrink-0 animate-pulse" />
                Initialize ESG Agent
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Agent Execution */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <div className="rounded border border-accent/15 bg-accent/[0.01] p-5">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="h-9 w-9 rounded bg-accent/5 border border-accent/15 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-accent" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent border border-background animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-normal text-text-primary tracking-tight">ESG Compliance Agent Execution</p>
                    <span className="text-[8.5px] font-normal px-2 py-0.5 rounded border border-accent/20 bg-accent/5 text-accent animate-pulse uppercase tracking-wider">Running</span>
                  </div>
                  <p className="text-[11px] text-text-muted font-light mt-0.5">
                    Autonomously compiling {selectedFramework?.toUpperCase()} indicators from {selectedSources.length} connected streams.
                  </p>
                </div>
                <div className="text-right hidden sm:block shrink-0 font-mono">
                  <p className="text-[10px] text-text-muted font-sans font-light">Stage Progress</p>
                  <p className="text-[14px] font-light text-accent">{Math.min(agentStep + 1, agentActions.length)} / {agentActions.length}</p>
                </div>
              </div>
            </div>

            {/* Agent Log — Terminal Style */}
            <div className="rounded border border-white/[0.04] bg-[#09090b] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.04] bg-[#0c0c0e]">
                <Terminal className="h-3.5 w-3.5 text-accent/80" />
                <span className="text-[11px] font-mono text-text-primary select-none">agent.log</span>
                <span className="text-[9.5px] text-text-muted ml-auto font-mono select-none">pid:ESG-{selectedFramework?.toUpperCase()}-001</span>
              </div>
              <div ref={logRef} className="p-4 space-y-2 max-h-[300px] overflow-y-auto no-scrollbar font-mono leading-relaxed select-text">
                {agentLog.map((action, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }}
                    className="flex items-start gap-3">
                    <span className="text-[10px] text-text-muted shrink-0 w-[50px] tabular-nums">
                      {String(i).padStart(2, "0")}:{String(Math.floor(Math.random() * 60)).padStart(2, "0")}
                    </span>
                    {actionIcon(action.type)}
                    <span className={cn("text-[9.5px] font-normal uppercase w-[62px] shrink-0 tracking-wide", actionColor(action.type))}>
                      [{action.type}]
                    </span>
                    <span className="text-[11.5px] text-text-primary font-light">{action.text}</span>
                  </motion.div>
                ))}
                {agentStep < agentActions.length - 1 && (
                  <div className="flex items-center gap-2 text-text-muted pt-1">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />
                    <span className="text-[11px] font-light">Agent active — evaluating environmental nodes...</span>
                  </div>
                )}
              </div>
            </div>

            <div className="h-1 rounded-full bg-white/[0.03] overflow-hidden">
              <motion.div initial={{ width: 0 }}
                animate={{ width: `${((agentStep + 1) / agentActions.length) * 100}%` }}
                className="h-full rounded-full gradient-green" transition={{ duration: 0.25 }} />
            </div>
          </motion.div>
        )}

        {/* Step 4: Report Output */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="rounded border border-accent/15 bg-accent/[0.01] p-4 flex items-center gap-3">
              <CheckCircle className="h-4.5 w-4.5 text-accent shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-normal text-text-primary tracking-tight">Compilation complete</p>
                <p className="text-[11px] text-text-muted font-light mt-0.5">Disclosures generated in 14.2s. Telemetry nodes validated with cryptographic signatures.</p>
              </div>
              <span className="text-[8.5px] font-normal px-2 py-0.5 rounded border border-accent/20 bg-accent/5 text-accent uppercase tracking-wider">Success</span>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: "Target Spec", value: selectedFramework?.toUpperCase() || "BRSR" },
                { label: "Disclosures", value: "12 / 12" },
                { label: "AI Computed", value: "9 items" },
                { label: "Data Pipelines", value: String(selectedSources.length) },
                { label: "Compiled Pages", value: "42" },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }} className="rounded border border-white/[0.03] bg-[#0c0c0e] p-4 text-center">
                  <p className="text-[10px] font-light text-text-muted uppercase tracking-widest">{stat.label}</p>
                  <p className="text-[16px] font-light font-mono text-accent/90 tracking-tight mt-1">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Report Sections */}
            <div className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-6">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/[0.02]">
                <h3 className="text-[13px] font-normal text-text-primary tracking-tight">Structured Document Disclosures</h3>
                <button className="px-4 py-1.5 rounded gradient-green text-white text-[11px] font-normal tracking-wide hover:opacity-95 flex items-center gap-2 transition-opacity">
                  <Download className="h-3.5 w-3.5 shrink-0" /> Export PDF
                </button>
              </div>
              <div className="space-y-2.5">
                {reportSections.map((section, i) => (
                  <motion.div key={section.title} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-3.5 p-3 rounded border border-white/[0.03] bg-background hover:bg-white/[0.01] hover:border-white/[0.06] transition-colors">
                    <CheckCircle className="h-4 w-4 text-accent/80 shrink-0" />
                    <span className="text-[12.5px] font-normal text-text-primary tracking-tight flex-1 leading-none">{section.title}</span>
                    <span className={cn("text-[9px] font-normal px-2 py-0.5 rounded uppercase tracking-wider shrink-0", sourceLabels[section.source].color)}>
                      {sourceLabels[section.source].label}
                    </span>
                    {section.status === "ai-generated" && (
                      <span className="text-[9px] font-normal px-2 py-0.5 rounded border border-accent/20 bg-accent/5 text-accent flex items-center gap-1 shrink-0 uppercase tracking-wider">
                        <Brain className="h-3 w-3 shrink-0" /> AI Agent
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-text-muted shrink-0">{section.items} items</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <button onClick={() => { setStep(1); setSelectedFramework(null); setSelectedSources(["manual"]); }}
              className="text-[12px] font-light text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5">
              ← Deploy agent for another disclosure model
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
