"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, Loader2, BarChart3, Zap } from "lucide-react";
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Scope 3 Carbon Analysis</h1>
        <p className="text-sm text-text-muted mt-1">
          Upload your data for AI-powered lifecycle carbon assessment
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Upload Zone */}
            <div
              onClick={startAnalysis}
              className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-all"
            >
              <Upload className="h-12 w-12 text-text-muted mx-auto mb-4" />
              <p className="text-sm font-medium text-text-primary">
                Drag & drop procurement data, invoices, or activity logs
              </p>
              <p className="text-xs text-text-muted mt-2">
                Supports CSV, PDF, Excel — or click to use demo data
              </p>
              <button className="mt-4 px-6 py-2 rounded-lg gradient-green text-white text-sm font-medium hover:opacity-90 transition-opacity">
                Run Demo Analysis
              </button>
            </div>

            {/* Method Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "LCA Analysis", desc: "Full cradle-to-grave lifecycle assessment using IPCC emission factors" },
                { title: "Scope Classification", desc: "Automatic categorization into Scope 1, 2, and 3 emissions" },
                { title: "AI Hotspot Detection", desc: "ML-powered identification of highest emission sources" },
              ].map((info) => (
                <div key={info.title} className="p-4 rounded-xl border border-border-subtle bg-surface">
                  <p className="text-sm font-semibold text-text-primary">{info.title}</p>
                  <p className="text-xs text-text-muted mt-1">{info.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-xl border border-border-subtle bg-surface p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-lg gradient-green flex items-center justify-center">
                <Zap className="h-5 w-5 text-white animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">AI Carbon Engine Processing</p>
                <p className="text-xs text-text-muted">Analyzing your sustainability data...</p>
              </div>
            </div>

            <div className="space-y-4">
              {carbonAnalysisSteps.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                    i < currentStep ? "bg-accent text-white" :
                    i === currentStep ? "border-2 border-accent text-accent" :
                    "border border-border text-text-muted"
                  )}>
                    {i < currentStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : i === currentStep ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="text-xs">{i + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      "text-sm font-medium",
                      i <= currentStep ? "text-text-primary" : "text-text-muted"
                    )}>
                      {s.title}
                    </p>
                    <p className="text-xs text-text-muted">{s.description}</p>
                  </div>
                  {i === currentStep && (
                    <div className="shimmer-bg h-1.5 w-20 rounded-full" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Emissions", value: "845t CO₂e", icon: "🏭" },
                { label: "Scope 3 Share", value: "80.5%", icon: "📊" },
                { label: "Hotspots Found", value: "3", icon: "🔥" },
                { label: "Confidence", value: "92%", icon: "✅" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-border-subtle bg-surface p-4"
                >
                  <p className="text-xs text-text-muted">{stat.label}</p>
                  <p className="text-xl font-bold text-text-primary stat-number mt-1">{stat.value}</p>
                  <span className="text-lg">{stat.icon}</span>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-border-subtle bg-surface p-6"
              >
                <h3 className="text-sm font-semibold text-text-primary mb-4">Emission Breakdown</h3>
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emissionsByCategory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis dataKey="category" tick={{ fill: "#71717a", fontSize: 10 }} angle={-45} textAnchor="end" height={80} axisLine={{ stroke: "#27272a" }} />
                      <YAxis tick={{ fill: "#71717a", fontSize: 11 }} axisLine={{ stroke: "#27272a" }} />
                      <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px", fontSize: "12px", color: "#fafafa" }} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={28}>
                        {emissionsByCategory.map((entry) => (
                          <Cell key={entry.category} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="rounded-xl border border-border-subtle bg-surface p-6"
              >
                <h3 className="text-sm font-semibold text-text-primary mb-4">Emission Treemap</h3>
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={treemapData}
                      dataKey="size"
                      aspectRatio={4 / 3}
                      stroke="#09090b"
                      content={({ x, y, width, height, name, color }: { x: number; y: number; width: number; height: number; name?: string; color?: string }) => (
                        <g>
                          <rect x={x} y={y} width={width} height={height} fill={color || "#22c55e"} rx={4} opacity={0.8} />
                          {width > 50 && height > 30 && (
                            <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize={10} fontWeight={600}>
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-border-subtle bg-surface p-6"
            >
              <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                AI Reduction Strategies
              </h3>
              <div className="space-y-3">
                {reductionStrategies.map((strategy, i) => (
                  <motion.div
                    key={strategy.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border-subtle bg-background hover:border-accent/20 transition-colors"
                  >
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded shrink-0",
                      strategy.priority === "High" ? "bg-danger/10 text-danger" :
                      strategy.priority === "Medium" ? "bg-warning/10 text-warning" :
                      "bg-info/10 text-info"
                    )}>
                      {strategy.priority}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{strategy.title}</p>
                      <p className="text-xs text-text-muted">{strategy.description}</p>
                    </div>
                    <span className="text-sm font-bold text-accent stat-number whitespace-nowrap">
                      {strategy.impact}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <button onClick={() => setStep("upload")} className="text-sm text-text-muted hover:text-text-primary transition-colors">
              ← Run another analysis
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
