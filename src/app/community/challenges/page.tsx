"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Clock, Gift, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const challenges = [
  { id: "c1", title: "30-Day Carbon Diet", desc: "Reduce your carbon footprint by 20% this month", category: "Carbon", difficulty: "Medium", duration: "30 days", participants: 342, reward: 500, icon: "🌱", progress: 72, joined: true },
  { id: "c2", title: "Zero Plastic Week", desc: "Eliminate single-use plastics for 7 days", category: "Waste", difficulty: "Hard", duration: "7 days", participants: 189, reward: 200, icon: "♻️", progress: 45, joined: true },
  { id: "c3", title: "Green Commute Challenge", desc: "Use sustainable transport for 14 days", category: "Transport", difficulty: "Easy", duration: "14 days", participants: 567, reward: 350, icon: "🚲", progress: 85, joined: true },
  { id: "c4", title: "Community Earth Action", desc: "Participate in 3 local cleanup or tree-planting events", category: "Community", difficulty: "Medium", duration: "30 days", participants: 124, reward: 400, icon: "🌍", progress: 0, joined: false },
  { id: "c5", title: "Energy Saver Sprint", desc: "Reduce home energy consumption by 15% for 2 weeks", category: "Energy", difficulty: "Medium", duration: "14 days", participants: 231, reward: 300, icon: "⚡", progress: 0, joined: false },
  { id: "c6", title: "Meatless March", desc: "Go vegetarian for the entire month of March", category: "Food", difficulty: "Hard", duration: "31 days", participants: 456, reward: 600, icon: "🥦", progress: 0, joined: false },
];

export default function ChallengesPage() {
  const [filter, setFilter] = useState<"all" | "joined" | "available">("all");
  const filtered = challenges.filter((c) => filter === "all" || (filter === "joined" ? c.joined : !c.joined));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">Eco Challenges <Trophy className="h-5 w-5 text-warning" /></h1>
        <p className="text-sm text-text-muted mt-1">Gamified sustainability challenges to drive real impact</p>
      </div>
      <div className="flex gap-2">
        {(["all", "joined", "available"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cn("text-xs px-3 py-1.5 rounded-lg font-medium transition-all capitalize",
            filter === f ? "bg-accent/10 text-accent border border-accent/20" : "bg-surface border border-border-subtle text-text-muted hover:text-text-primary")}>
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border-subtle bg-surface p-5 card-hover">
            <div className="flex items-start justify-between">
              <span className="text-3xl">{c.icon}</span>
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded",
                c.difficulty === "Easy" ? "bg-accent/10 text-accent" : c.difficulty === "Medium" ? "bg-warning/10 text-warning" : "bg-danger/10 text-danger")}>
                {c.difficulty}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-text-primary mt-3">{c.title}</h3>
            <p className="text-xs text-text-muted mt-1">{c.desc}</p>
            <div className="flex items-center gap-3 mt-3 text-[10px] text-text-muted">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{c.duration}</span>
              <span className="flex items-center gap-1"><Users className="h-3 w-3" />{c.participants}</span>
              <span className="flex items-center gap-1"><Gift className="h-3 w-3" />{c.reward} credits</span>
            </div>
            {c.joined && (
              <div className="mt-3">
                <div className="flex justify-between text-[10px] mb-1"><span className="text-text-muted">Progress</span><span className="text-accent font-bold">{c.progress}%</span></div>
                <div className="h-1.5 rounded-full bg-surface-raised overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${c.progress}%` }} transition={{ duration: 0.8, delay: 0.3 }} className="h-full rounded-full gradient-green" />
                </div>
              </div>
            )}
            {!c.joined && (
              <button className="mt-3 w-full py-2 rounded-lg border border-accent/30 text-accent text-xs font-medium hover:bg-accent/10 transition-colors">
                Join Challenge
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
