"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Medal, Crown, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = ["Individual", "School", "Corporate"];

const leaderboardData = [
  { rank: 1, name: "Arjun Mehta", score: 895, school: "DPS Bangalore North", avatar: "AM", change: 0 },
  { rank: 2, name: "Priya Sharma", score: 872, school: "KV DRDO", avatar: "PS", change: 1 },
  { rank: 3, name: "Ravi Kumar", score: 855, school: "AECS MMPS", avatar: "RK", change: -1 },
  { rank: 4, name: "Ananya Patel", score: 830, school: "NPS Koramangala", avatar: "AP", change: 2 },
  { rank: 5, name: "Vikram Singh", score: 815, school: "DAV Public School", avatar: "VS", change: 0 },
  { rank: 6, name: "Meera Joshi", score: 798, school: "Presidency School", avatar: "MJ", change: -2 },
  { rank: 7, name: "Aditya Rao", score: 785, school: "Christ Junior College", avatar: "AR", change: 3 },
  { rank: 8, name: "Neha Gupta", score: 770, school: "Delhi Public School", avatar: "NG", change: 0 },
  { rank: 9, name: "Siddharth Nair", score: 758, school: "Vidyashilp Academy", avatar: "SN", change: 1 },
  { rank: 10, name: "Kavya Reddy", score: 750, school: "Greenwood High", avatar: "KR", change: -1 },
  { rank: 11, name: "Rohan Das", score: 745, school: "National Public School", avatar: "RD", change: 0 },
  { rank: 12, name: "Shivam Biswal", score: 742, school: "AECS MMPS", avatar: "SB", change: 2 },
];

export default function LeaderboardPage() {
  const [tab, setTab] = useState("Individual");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">Leaderboard <Medal className="h-5 w-5 text-warning" /></h1>
        <p className="text-sm text-text-muted mt-1">Sustainability champions ranked by Green Credit Score</p>
      </div>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("text-xs px-4 py-2 rounded-lg font-medium transition-all",
            tab === t ? "bg-accent/10 text-accent border border-accent/20" : "bg-surface border border-border-subtle text-text-muted hover:text-text-primary")}>
            {t}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 0, 2].map((idx) => {
          const user = leaderboardData[idx];
          return (
            <motion.div key={user.rank} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              className={cn("rounded-xl border bg-surface p-5 text-center", idx === 0 ? "border-warning/30 glow-green" : "border-border-subtle")}>
              <div className="relative mx-auto w-fit">
                <div className={cn("h-14 w-14 rounded-xl flex items-center justify-center text-lg font-bold text-white mx-auto", idx === 0 ? "gradient-green" : "bg-surface-raised text-text-primary")}>
                  {user.avatar}
                </div>
                {idx === 0 && <Crown className="h-5 w-5 text-warning absolute -top-2 -right-2" />}
              </div>
              <p className="text-sm font-semibold text-text-primary mt-2">{user.name}</p>
              <p className="text-[10px] text-text-muted">{user.school}</p>
              <p className={cn("text-2xl font-bold stat-number mt-2", idx === 0 ? "text-accent" : "text-text-primary")}>{user.score}</p>
              <p className="text-[10px] text-text-muted">#{user.rank}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Full Table */}
      <div className="rounded-xl border border-border-subtle bg-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left py-3 px-4 text-xs font-medium text-text-muted">Rank</th>
              <th className="text-left py-3 text-xs font-medium text-text-muted">User</th>
              <th className="text-left py-3 text-xs font-medium text-text-muted hidden md:table-cell">School</th>
              <th className="text-right py-3 px-4 text-xs font-medium text-text-muted">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, i) => (
              <motion.tr key={user.rank} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className={cn("border-b border-border-subtle last:border-0 hover:bg-surface-raised/50 transition-colors",
                  user.name === "Shivam Biswal" && "bg-accent/5")}>
                <td className="py-3 px-4">
                  <span className={cn("h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                    user.rank <= 3 ? "bg-warning/20 text-warning" : "text-text-muted")}>{user.rank}</span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg gradient-green flex items-center justify-center text-white text-[10px] font-bold">{user.avatar}</div>
                    <span className="text-xs font-medium text-text-primary">{user.name}</span>
                    {user.name === "Shivam Biswal" && <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-bold">You</span>}
                  </div>
                </td>
                <td className="py-3 text-xs text-text-muted hidden md:table-cell">{user.school}</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-sm font-bold text-text-primary stat-number">{user.score}</span>
                  {user.change !== 0 && (
                    <span className={cn("text-[10px] ml-1", user.change > 0 ? "text-accent" : "text-danger")}>
                      {user.change > 0 ? `↑${user.change}` : `↓${Math.abs(user.change)}`}
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
