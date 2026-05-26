"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  { label: "Carbon Intensity", value: "12.4", unit: "tCO₂e/₹Cr", change: -8.2, period: "vs last quarter" },
  { label: "ESG Improvement Rate", value: "3.2", unit: "pts/quarter", change: 15, period: "vs last quarter" },
  { label: "Supplier Compliance", value: "78%", unit: "", change: 5.6, period: "vs last quarter" },
  { label: "Report Automation", value: "92%", unit: "auto-fill", change: 12, period: "vs last quarter" },
];

const monthlyTrend = [
  { month: "Oct", emissions: 2850, score: 68 },
  { month: "Nov", emissions: 2720, score: 70 },
  { month: "Dec", emissions: 2650, score: 72 },
  { month: "Jan", emissions: 2580, score: 74 },
  { month: "Feb", emissions: 2490, score: 76 },
  { month: "Mar", emissions: 2410, score: 78 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 font-sans text-text-primary antialiased">
      {/* Header */}
      <div className="pb-2 border-b border-white/[0.02]">
        <h1 className="text-xl font-light text-text-primary flex items-center gap-2 tracking-tight">
          Sustainability Performance Analytics
          <BarChart3 className="h-4.5 w-4.5 text-info/90" />
        </h1>
        <p className="text-[12px] text-text-muted font-light mt-1.5 leading-relaxed">
          Historical trends, automated audit rates, and regulatory compliance analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className="rounded border border-white/[0.03] bg-[#0c0c0e]/80 p-5"
          >
            <p className="text-[10px] font-light text-text-muted uppercase tracking-widest">{m.label}</p>
            <p className="text-2xl font-light font-mono text-text-primary tracking-tight mt-2">
              {m.value}
              <span className="text-[11.5px] text-text-muted ml-1 font-sans font-light tracking-wide">{m.unit}</span>
            </p>
            <div className="flex items-center gap-1 mt-2 text-[11px] font-light">
              {m.change > 0 ? (
                <TrendingUp className="h-3 w-3 text-accent/90" />
              ) : (
                <TrendingDown className="h-3 w-3 text-accent/90" />
              )}
              <span className="text-accent/90">{Math.abs(m.change)}% {m.period}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-6"
      >
        <h3 className="text-[12.5px] font-medium text-text-primary tracking-tight mb-6 flex items-center gap-2">
          <Activity className="h-4 w-4 text-accent/80" />
          6-Month Emissions & Score Trend
        </h3>
        <div className="flex items-end gap-6 h-[200px] px-4">
          {monthlyTrend.map((m, i) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center gap-1.5">
                <span className="text-[10.5px] text-accent/90 font-mono">{m.score}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(m.emissions / 3000) * 160}px` }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="w-full max-w-[42px] rounded-t bg-accent/15 border border-accent/25"
                />
              </div>
              <span className="text-[10px] text-text-muted font-light uppercase tracking-wider">{m.month}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/[0.02] text-[10.5px] text-text-muted font-light">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-accent/15 border border-accent/25" />
            Emissions (tCO₂e)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-accent/40" />
            ESG Score (indexed)
          </span>
        </div>
      </motion.div>
    </div>
  );
}
