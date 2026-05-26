"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  change?: number;
  icon?: string;
  className?: string;
  delay?: number;
}

export function MetricCard({ label, value, change, icon, className, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className={cn(
        "relative overflow-hidden rounded border border-white/[0.03] bg-[#0c0c0e]/80 p-6 transition-colors",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-light text-text-muted uppercase tracking-widest">
            {label}
          </p>
          <p className="mt-2.5 text-3xl font-light font-mono text-text-primary tracking-tight">
            {value}
          </p>
          {change !== undefined && change !== 0 && (
            <p
              className={cn(
                "mt-1.5 text-[12px] font-light tracking-wide",
                change > 0 ? "text-accent/90" : "text-danger/90"
              )}
            >
              {change > 0 ? "↑" : "↓"} {Math.abs(change)}% vs last period
            </p>
          )}
        </div>
        {icon && (
          <span className="text-2xl opacity-80 shrink-0 select-none">{icon}</span>
        )}
      </div>
      {/* Subtle background glow overlay */}
      <div className="absolute inset-0 bg-radial-[at_0%_0%] from-accent/[0.015] to-transparent pointer-events-none" />
    </motion.div>
  );
}

interface ScoreGaugeProps {
  score: number;
  maxScore?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ScoreGauge({ score, maxScore = 850, label, size = "md", className }: ScoreGaugeProps) {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75;
  const sizes = { sm: 135, md: 190, lg: 270 };
  const dim = sizes[size];

  const getColor = () => {
    if (percentage >= 80) return "#32ff58";
    if (percentage >= 60) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className={cn("flex flex-col items-center select-none", className)}>
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg
          viewBox="0 0 100 100"
          className="transform -rotate-[135deg]"
          style={{ width: dim, height: dim }}
        >
          {/* Background arc */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#161619"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          />
          {/* Value arc */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getColor()}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            initial={{ strokeDashoffset: circumference * 0.75 }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            style={{
              filter: `drop-shadow(0 0 6px ${getColor()}25)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-light font-mono text-text-primary tracking-tight"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            {score}
          </motion.span>
          {label && (
            <span className="text-[11px] text-text-muted font-light mt-0.5 tracking-wider uppercase">{label}</span>
          )}
        </div>
      </div>
    </div>
  );
}

interface InsightCardProps {
  title: string;
  description: string;
  severity: string;
  category: string;
  action?: string;
  delay?: number;
}

export function InsightCard({ title, description, severity, category, action, delay = 0 }: InsightCardProps) {
  const severityColors: Record<string, string> = {
    high: "bg-danger/5 text-danger/90 border-danger/15",
    medium: "bg-warning/5 text-warning/90 border-warning/15",
    low: "bg-accent/5 text-accent/95 border-accent/15",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay }}
      className="flex items-start gap-4 p-4 rounded border border-white/[0.03] bg-[#09090b] hover:border-accent/15 transition-colors"
    >
      <span
        className={cn(
          "shrink-0 text-[9.5px] font-normal uppercase px-2 py-0.5 rounded border tracking-wider",
          severityColors[severity] || severityColors.low
        )}
      >
        {severity}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-normal text-text-primary tracking-tight leading-tight">{title}</p>
        <p className="text-[12px] text-text-muted font-light mt-1.5 line-clamp-2 leading-relaxed">{description}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.03] text-text-muted font-light uppercase tracking-wider">
            {category}
          </span>
          {action && (
            <button className="text-[11px] font-normal text-accent/80 hover:text-accent hover:underline transition-colors ml-auto">
              {action} →
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
