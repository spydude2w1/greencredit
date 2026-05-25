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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border-subtle bg-surface p-5 card-hover",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-text-primary stat-number">
            {value}
          </p>
          {change !== undefined && change !== 0 && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                change > 0 ? "text-accent" : "text-danger"
              )}
            >
              {change > 0 ? "↑" : "↓"} {Math.abs(change)}% vs last month
            </p>
          )}
        </div>
        {icon && (
          <span className="text-2xl">{icon}</span>
        )}
      </div>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 gradient-radial-green opacity-30 pointer-events-none" />
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
  const sizes = { sm: 120, md: 180, lg: 240 };
  const dim = sizes[size];

  const getColor = () => {
    if (percentage >= 80) return "#22c55e";
    if (percentage >= 60) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
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
            stroke="#27272a"
            strokeWidth="6"
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
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            initial={{ strokeDashoffset: circumference * 0.75 }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            style={{
              filter: `drop-shadow(0 0 8px ${getColor()}40)`,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold stat-number text-text-primary"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {score}
          </motion.span>
          {label && (
            <span className="text-xs text-text-muted mt-1">{label}</span>
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
    high: "bg-danger/10 text-danger border-danger/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-accent/10 text-accent border-accent/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className="flex items-start gap-3 p-4 rounded-xl border border-border-subtle bg-surface hover:bg-surface-raised transition-colors"
    >
      <span
        className={cn(
          "shrink-0 text-[10px] font-bold uppercase px-2 py-1 rounded-md border",
          severityColors[severity] || severityColors.low
        )}
      >
        {severity}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{title}</p>
        <p className="text-xs text-text-muted mt-1 line-clamp-2">{description}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] px-2 py-0.5 rounded bg-surface-raised text-text-muted">
            {category}
          </span>
          {action && (
            <button className="text-[11px] font-medium text-accent hover:underline">
              {action} →
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
