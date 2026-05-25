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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">Analytics <BarChart3 className="h-5 w-5 text-info" /></h1>
        <p className="text-sm text-text-muted mt-1">Sustainability performance analytics and trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border-subtle bg-surface p-5">
            <p className="text-xs text-text-muted">{m.label}</p>
            <p className="text-2xl font-bold text-text-primary stat-number mt-1">{m.value}<span className="text-sm text-text-muted ml-1">{m.unit}</span></p>
            <div className="flex items-center gap-1 mt-2">
              {m.change > 0 ? <TrendingUp className="h-3 w-3 text-accent" /> : <TrendingDown className="h-3 w-3 text-accent" />}
              <span className="text-[10px] text-accent font-medium">{Math.abs(m.change)}% {m.period}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-xl border border-border-subtle bg-surface p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-6 flex items-center gap-2">
          <Activity className="h-4 w-4 text-accent" /> 6-Month Trend
        </h3>
        <div className="flex items-end gap-4 h-[200px]">
          {monthlyTrend.map((m, i) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center gap-1">
                <span className="text-[10px] text-accent font-bold stat-number">{m.score}</span>
                <motion.div initial={{ height: 0 }} animate={{ height: `${(m.emissions / 3000) * 160}px` }}
                  transition={{ duration: 0.6, delay: i * 0.1 }} className="w-full max-w-[48px] rounded-t-lg gradient-green" />
              </div>
              <span className="text-[10px] text-text-muted">{m.month}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-[10px] text-text-muted">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm gradient-green" /> Emissions (tCO₂e)</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-accent" /> ESG Score</span>
        </div>
      </motion.div>
    </div>
  );
}
