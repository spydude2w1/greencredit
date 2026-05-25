"use client";

import { motion } from "framer-motion";
import { Target, Plus, Calendar, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const goals = [
  { id: 1, title: "Reduce monthly carbon by 15%", category: "Carbon", target: 15, current: 11.2, unit: "%", deadline: "2025-06-30", status: "active" },
  { id: 2, title: "Complete 5 eco-challenges", category: "Engagement", target: 5, current: 3, unit: "challenges", deadline: "2025-04-30", status: "active" },
  { id: 3, title: "Switch to green commute 20 days", category: "Transport", target: 20, current: 14, unit: "days", deadline: "2025-05-15", status: "active" },
  { id: 4, title: "Earn 3000 Green Credits", category: "Credits", target: 3000, current: 2840, unit: "credits", deadline: "2025-03-31", status: "active" },
  { id: 5, title: "Zero plastic for 30 days", category: "Waste", target: 30, current: 30, unit: "days", deadline: "2025-02-28", status: "completed" },
];

const badges = [
  { name: "Carbon Warrior", icon: "⚔️", earned: true },
  { name: "Green Commuter", icon: "🚲", earned: true },
  { name: "Tree Planter", icon: "🌳", earned: true },
  { name: "Eco Champion", icon: "🏆", earned: false },
  { name: "Zero Waste Hero", icon: "♻️", earned: true },
  { name: "Sustainability Star", icon: "⭐", earned: false },
];

export default function GoalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">Goals <Target className="h-5 w-5 text-accent" /></h1>
          <p className="text-sm text-text-muted mt-1">Track your sustainability goals and achievements</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-green text-white text-sm font-medium hover:opacity-90">
          <Plus className="h-4 w-4" /> New Goal
        </button>
      </div>

      <div className="space-y-3">
        {goals.filter((g) => g.status === "active").map((goal, i) => {
          const progress = Math.round((goal.current / goal.target) * 100);
          return (
            <motion.div key={goal.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border-subtle bg-surface p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-text-primary">{goal.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-surface-raised text-text-muted">{goal.category}</span>
                    <span className="text-[10px] text-text-muted flex items-center gap-1"><Calendar className="h-3 w-3" />Due: {goal.deadline}</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-accent stat-number">{progress}%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-surface-raised overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                  className={cn("h-full rounded-full", progress >= 90 ? "gradient-green" : "bg-accent/70")} />
              </div>
              <div className="flex justify-between text-[10px] text-text-muted mt-1.5">
                <span>{goal.current} {goal.unit}</span><span>{goal.target} {goal.unit}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-primary">Completed ✅</h3>
        {goals.filter((g) => g.status === "completed").map((goal) => (
          <div key={goal.id} className="rounded-xl border border-accent/20 bg-accent/5 p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0" />
            <div><p className="text-sm font-medium text-text-primary">{goal.title}</p>
            <p className="text-[10px] text-text-muted">{goal.category} · Completed {goal.deadline}</p></div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-primary">Achievement Badges</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {badges.map((badge) => (
            <div key={badge.name} className={cn("rounded-xl border p-4 text-center",
              badge.earned ? "border-accent/20 bg-surface" : "border-border-subtle bg-surface opacity-40")}>
              <span className="text-3xl block">{badge.icon}</span>
              <p className="text-[10px] font-medium text-text-primary mt-2">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
