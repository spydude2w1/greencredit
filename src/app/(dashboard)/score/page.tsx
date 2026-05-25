"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp, Award, Info } from "lucide-react";
import { ScoreGauge } from "@/components/dashboard/Cards";
import { cn } from "@/lib/utils";

const scoreBreakdown = [
  { category: "Carbon Reduction", score: 85, weight: 30, icon: "🌍" },
  { category: "Green Purchases", score: 72, weight: 15, icon: "🛍️" },
  { category: "Challenge Participation", score: 90, weight: 20, icon: "🏆" },
  { category: "Community Impact", score: 68, weight: 15, icon: "🤝" },
  { category: "Consistency (Streak)", score: 88, weight: 20, icon: "🔥" },
];

const history = [
  { month: "Dec 2024", score: 680 },
  { month: "Jan 2025", score: 695 },
  { month: "Feb 2025", score: 720 },
  { month: "Mar 2025", score: 742 },
];

export default function ScorePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          Green Credit Score <Star className="h-5 w-5 text-accent" />
        </h1>
        <p className="text-sm text-text-muted mt-1">Your sustainability performance rating</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-accent/20 bg-surface p-6 flex flex-col items-center glow-green">
          <ScoreGauge score={742} maxScore={850} label="out of 850" size="lg" />
          <p className="text-sm font-semibold text-accent mt-2">Very Good</p>
          <p className="text-xs text-text-muted">Top 3% of users</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 rounded-xl border border-border-subtle bg-surface p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Info className="h-4 w-4 text-text-muted" /> Score Breakdown
          </h3>
          <div className="space-y-3">
            {scoreBreakdown.map((item, i) => (
              <motion.div key={item.category} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="flex items-center gap-2 text-text-secondary">
                    <span>{item.icon}</span> {item.category}
                    <span className="text-[10px] text-text-muted">({item.weight}% weight)</span>
                  </span>
                  <span className={cn("font-bold stat-number", item.score >= 80 ? "text-accent" : item.score >= 60 ? "text-warning" : "text-danger")}>
                    {item.score}/100
                  </span>
                </div>
                <div className="h-2 rounded-full bg-surface-raised overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${item.score}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                    className={cn("h-full rounded-full", item.score >= 80 ? "gradient-green" : item.score >= 60 ? "bg-warning" : "bg-danger")} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-xl border border-border-subtle bg-surface p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent" /> Score History
        </h3>
        <div className="flex items-end gap-6">
          {history.map((h, i) => (
            <div key={h.month} className="flex-1 text-center">
              <motion.div initial={{ height: 0 }} animate={{ height: `${(h.score / 850) * 150}px` }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="mx-auto w-12 rounded-t-lg gradient-green" />
              <p className="text-lg font-bold text-text-primary stat-number mt-2">{h.score}</p>
              <p className="text-[10px] text-text-muted">{h.month}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
