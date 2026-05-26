"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle, Loader2, BarChart3, Zap } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, Treemap,
} from "recharts";
import { cn } from "@/lib/utils";
import { carbonAnalysisSteps, emissionsByCategory } from "@/lib/data/enterprise-data";

const reductionStrategies = [
  { title: "Switch to local suppliers", impact: "-45t CO₂e/year", priority: "High", description: "Replacing 3 imported material suppliers with local alternatives" },
  { title: "Install solar panels", impact: "-38t CO₂e/year", priority: "High", description: "Rooftop solar for 40% campus energy needs" },
  { title: "EV fleet transition", impact: "-22t CO₂e/year", priority: "Medium", description: "Replace 5 diesel vehicles with electric" },
  { title: "Waste composting program", impact: "-12t CO₂e/year", priority: "Medium", description: "On-site organic waste composting facility" },
  { title: "Remote work policy", impact: "-18t CO₂e/year", priority: "Low", description: "Hybrid work reducing employee commuting by 30%" },
];

const treemapData = emissionsByCategory.map((item) => ({
  name: item.category,
  size: item.value,
  color: item.color,
}));

export default function CarbonAnalysisPage() {
  const [step, setStep] = useState<"upload" | "processing" | "results">("upload");
  const [currentStep, setCurrentStep] = useState(0);

  const startAnalysis = async () => {
    setStep("processing");
    for (let i = 0; i < carbonAnalysisSteps.length; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, carbonAnalysisSteps[i].duration));
    }
    setStep("results");
  };

  return (
    <div className="space-y-8 font-sans text-text-primary antialiased">
      {/* Header */}
      <div className="pb-2 border-b border-white/[0.02]">
        <h1 className="text-xl font-light text-text-primary flex items-center gap-2 tracking-tight">
          Scope 3 Carbon Analysis
          <BarChart3 className="h-4.5 w-4.5 text-accent/80" />
        </h1>
        <p className="text-[12px] text-text-muted font-light mt-1.5 leading-relaxed">
          Upload value chain invoices, procurement files, and transport logs for AI-powered assessment.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            {/* Upload Zone */}
            <div
              onClick={startAnalysis}
              className="border border-dashed border-white/[0.08] bg-[#0c0c0e]/80 rounded p-12 text-center cursor-pointer hover:border-accent/30 hover:bg-accent/[0.01] transition-all"
            >
              <Upload className="h-10 w-10 text-text-muted opacity-80 mx-auto mb-4" />
              <p className="text-[13px] font-normal text-text-primary tracking-tight">
                Drag & drop procurement data, invoices, or activity logs
              </p>
              <p className="text-[11px] text-text-muted font-light mt-1.5 leading-relaxed">
                Supports CSV, PDF, Excel — or click here to initialize with demo data
              </p>
              <button className="mt-5 px-5 py-2 rounded text-[11px] font-normal tracking-wide gradient-green text-white hover:opacity-95 transition-opacity">
                Run Demo Analysis
              </button>
            </div>

            {/* Method Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Cradle-to-Grave LCA", desc: "Full lifecycle carbon footprint mapping using accredited factors." },
                { title: "Direct Scope Mapping", desc: "Automatic classification across operational emissions scopes." },
                { title: "AI Anomaly Detection", desc: "Instantly trace emissions spikes down to specific suppliers." },
              ].map((info) => (
                <div key={info.title} className="p-4 rounded border border-white/[0.03] bg-[#0c0c0e]">
                  <p className="text-[12.5px] font-normal text-text-primary tracking-tight">{info.title}</p>
                  <p className="text-[11px] text-text-muted font-light mt-1 leading-relaxed">{info.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded border border-white/[0.03] bg-[#0c0c0e] p-8"
          >
            <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-white/[0.02]">
              <div className="h-8.5 w-8.5 rounded bg-accent/5 border border-accent/15 flex items-center justify-center">
                <Zap className="h-4 w-4 text-accent animate-pulse" />
              </div>
              <div>
                <p className="text-[13px] font-normal text-text-primary tracking-tight">AI Carbon Engine Active</p>
                <p className="text-[11.5px] text-text-muted font-light mt-0.5">Calculating Scope 3 emissions factors...</p>
              </div>
            </div>

            <div className="space-y-4">
              {carbonAnalysisSteps.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <div className={cn(
                    "h-7 w-7 rounded-full flex items-center justify-center shrink-0 border text-[11px] font-light",
                    i < currentStep ? "bg-accent/10 border-accent/20 text-accent" :
                    i === currentStep ? "border-accent/30 text-accent animate-pulse" :
                    "border-white/[0.06] text-text-muted"
                  )}>
                    {i < currentStep ? (
                      <CheckCircle className="h-3.5 w-3.5" />
                    ) : i === currentStep ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-[12.5px] font-normal tracking-tight",
                      i <= currentStep ? "text-text-primary" : "text-text-muted"
                    )}>
                      {s.title}
                    </p>
                    <p className="text-[11px] text-text-muted font-light mt-0.5 leading-normal">{s.description}</p>
                  </div>
                  {i === currentStep && (
                    <div className="shimmer-bg h-1 w-16 rounded-full" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Emissions", value: "845t CO₂e", icon: "🏭" },
                { label: "Scope 3 Share", value: "80.5%", icon: "📊" },
                { label: "Hotspots Found", value: "3", icon: "🔥" },
                { label: "Confidence Score", value: "92%", icon: "✅" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="rounded border border-white/[0.03] bg-[#0c0c0e] p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-[10px] font-light text-text-muted uppercase tracking-widest">{stat.label}</p>
                    <p className="text-[18px] font-light font-mono text-text-primary tracking-tight mt-1.5">{stat.value}</p>
                  </div>
                  <span className="text-xl shrink-0 opacity-80 select-none">{stat.icon}</span>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-6"
              >
                <h3 className="text-[12.5px] font-medium text-text-primary tracking-tight mb-4">Emission Breakdown</h3>
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emissionsByCategory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1d1d21" />
                      <XAxis dataKey="category" tick={{ fill: "#71717a", fontSize: 9 }} angle={-45} textAnchor="end" height={80} axisLine={{ stroke: "#27272a" }} />
                      <YAxis tick={{ fill: "#71717a", fontSize: 9, fontFamily: "var(--font-geist-mono)" }} axisLine={{ stroke: "#27272a" }} />
                      <Tooltip contentStyle={{ background: "#0c0c0e", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "6px", fontSize: "11px", color: "#fafafa" }} />
                      <Bar dataKey="value" radius={[3, 3, 0, 0]} barSize={24}>
                        {emissionsByCategory.map((entry) => (
                          <Cell key={entry.category} fill={entry.color} opacity={0.8} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-6"
              >
                <h3 className="text-[12.5px] font-medium text-text-primary tracking-tight mb-4">Emission Treemap</h3>
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={treemapData}
                      dataKey="size"
                      aspectRatio={4 / 3}
                      stroke="#0c0c0e"
                      content={({ x, y, width, height, name, color }: { x: number; y: number; width: number; height: number; name?: string; color?: string }) => (
                        <g>
                          <rect x={x} y={y} width={width} height={height} fill={color || "#32ff58"} rx={2} opacity={0.7} />
                          {width > 60 && height > 35 && (
                            <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize={9} fontWeight={400} opacity={0.9} style={{ fontFamily: "inherit" }}>
                              {name}
                            </text>
                          )}
                        </g>
                      )}
                    />
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Reduction Strategies */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-6"
            >
              <h3 className="text-[12.5px] font-medium text-text-primary tracking-tight mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent/80" />
                AI Reduction Strategies
              </h3>
              <div className="space-y-3">
                {reductionStrategies.map((strategy, i) => (
                  <motion.div
                    key={strategy.title}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    className="flex items-center gap-4 p-3.5 rounded border border-white/[0.03] bg-background hover:border-accent/15 transition-colors"
                  >
                    <span className={cn(
                      "text-[9px] font-normal uppercase px-2 py-0.5 rounded border shrink-0 tracking-wider",
                      strategy.priority === "High" ? "bg-danger/5 text-danger/90 border-danger/10" :
                      strategy.priority === "Medium" ? "bg-warning/5 text-warning/90 border-warning/10" :
                      "bg-info/5 text-info/90 border-info/10"
                    )}>
                      {strategy.priority}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-normal text-text-primary tracking-tight leading-none">{strategy.title}</p>
                      <p className="text-[11px] text-text-muted font-light mt-1 leading-normal">{strategy.description}</p>
                    </div>
                    <span className="text-[11.5px] font-normal text-accent font-mono whitespace-nowrap">
                      {strategy.impact}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <button onClick={() => setStep("upload")} className="text-[12px] font-light text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5">
              ← Run another simulation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
