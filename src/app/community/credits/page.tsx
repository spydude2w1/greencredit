"use client";

import { motion } from "framer-motion";
import { Coins, TrendingUp, ArrowUpRight, ArrowDownRight, Gift, ShoppingBag, Trophy, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const transactions = [
  { id: 1, desc: "Completed: 30-Day Carbon Diet", credits: 500, type: "earned", date: "2025-03-15", icon: Trophy },
  { id: 2, desc: "Purchased: Bamboo Notebook Set", credits: -150, type: "spent", date: "2025-03-14", icon: ShoppingBag },
  { id: 3, desc: "Daily Check-in Streak (7 days)", credits: 70, type: "earned", date: "2025-03-13", icon: Gift },
  { id: 4, desc: "Green Commute — 5 days", credits: 100, type: "earned", date: "2025-03-12", icon: Leaf },
  { id: 5, desc: "Completed: Zero Plastic Week", credits: 200, type: "earned", date: "2025-03-10", icon: Trophy },
  { id: 6, desc: "Donated to Clean Lakes Fund", credits: -300, type: "spent", date: "2025-03-08", icon: Gift },
  { id: 7, desc: "Referral Bonus: Priya Sharma", credits: 250, type: "earned", date: "2025-03-05", icon: Gift },
];

const earnMethods = [
  { label: "Complete Challenges", credits: "100-600", icon: "🏆" },
  { label: "Daily Check-ins", credits: "10/day", icon: "📅" },
  { label: "Green Commutes", credits: "20/trip", icon: "🚲" },
  { label: "Referrals", credits: "250/user", icon: "👥" },
  { label: "Community Events", credits: "50-200", icon: "🤝" },
  { label: "Learning Modules", credits: "25/module", icon: "📚" },
];

export default function CreditsPage() {
  const balance = 1250;
  const earned = 2420;
  const spent = 1170;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">Green Credits <Coins className="h-5 w-5 text-warning" /></h1>
        <p className="text-sm text-text-muted mt-1">Your sustainability currency — earn, spend, and grow</p>
      </div>

      {/* Balance Card */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 to-surface p-8 glow-green">
        <p className="text-xs text-text-muted uppercase tracking-wider">Current Balance</p>
        <p className="text-5xl font-bold text-accent stat-number mt-2">{balance.toLocaleString()}</p>
        <p className="text-sm text-text-muted mt-1">Green Credits</p>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4 text-accent" />
            <span className="text-sm text-text-primary"><strong className="text-accent stat-number">{earned.toLocaleString()}</strong> earned</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowDownRight className="h-4 w-4 text-danger" />
            <span className="text-sm text-text-primary"><strong className="text-danger stat-number">{spent.toLocaleString()}</strong> spent</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction History */}
        <div className="lg:col-span-2 rounded-xl border border-border-subtle bg-surface p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-text-muted" /> Transaction History
          </h3>
          <div className="space-y-2">
            {transactions.map((tx, i) => (
              <motion.div key={tx.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg border border-border-subtle hover:bg-surface-raised transition-colors">
                <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                  tx.type === "earned" ? "bg-accent/10" : "bg-danger/10")}>
                  <tx.icon className={cn("h-4 w-4", tx.type === "earned" ? "text-accent" : "text-danger")} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate">{tx.desc}</p>
                  <p className="text-[10px] text-text-muted">{tx.date}</p>
                </div>
                <span className={cn("text-sm font-bold stat-number", tx.credits > 0 ? "text-accent" : "text-danger")}>
                  {tx.credits > 0 ? "+" : ""}{tx.credits}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How to Earn */}
        <div className="rounded-xl border border-border-subtle bg-surface p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4">How to Earn</h3>
          <div className="space-y-3">
            {earnMethods.map((method) => (
              <div key={method.label} className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border-subtle">
                <span className="text-xl">{method.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-text-primary">{method.label}</p>
                  <p className="text-[10px] text-accent font-bold stat-number">{method.credits} credits</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
