"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, CheckCircle, AlertTriangle, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const frameworks = [
  { name: "BRSR", status: "compliant", score: 92, items: 84, completed: 78 },
  { name: "GRI", status: "partial", score: 68, items: 120, completed: 82 },
  { name: "CDP", status: "pending", score: 0, items: 45, completed: 0 },
  { name: "SDG", status: "partial", score: 74, items: 169, completed: 125 },
];

const recentActions = [
  { text: "Principle 6 disclosures auto-populated from sensor data", time: "2h ago", type: "success" },
  { text: "Scope 3 Category 4 emissions require manual verification", time: "1d ago", type: "warning" },
  { text: "BRSR FY 2024-25 report approved by compliance team", time: "3d ago", type: "success" },
  { text: "GRI 305-3 indicator missing supplier emission data", time: "5d ago", type: "warning" },
];

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">Compliance Center <ClipboardCheck className="h-5 w-5 text-accent" /></h1>
        <p className="text-sm text-text-muted mt-1">Track compliance across multiple reporting frameworks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {frameworks.map((fw, i) => (
          <motion.div key={fw.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border-subtle bg-surface p-5 card-hover">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold text-accent">{fw.name}</span>
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded capitalize",
                fw.status === "compliant" ? "bg-accent/10 text-accent" :
                fw.status === "partial" ? "bg-warning/10 text-warning" :
                "bg-surface-raised text-text-muted")}>{fw.status}</span>
            </div>
            {fw.score > 0 ? (
              <>
                <p className="text-3xl font-bold text-text-primary stat-number">{fw.score}%</p>
                <div className="mt-2 h-1.5 rounded-full bg-surface-raised overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(fw.completed / fw.items) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={cn("h-full rounded-full", fw.score >= 80 ? "gradient-green" : "bg-warning")} />
                </div>
                <p className="text-[10px] text-text-muted mt-1">{fw.completed}/{fw.items} indicators</p>
              </>
            ) : (
              <p className="text-sm text-text-muted mt-2">Not started</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-border-subtle bg-surface p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Recent Compliance Activity</h3>
        <div className="space-y-3">
          {recentActions.map((action, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border-subtle">
              {action.type === "success" ? <CheckCircle className="h-4 w-4 text-accent shrink-0" /> : <AlertTriangle className="h-4 w-4 text-warning shrink-0" />}
              <span className="text-xs text-text-primary flex-1">{action.text}</span>
              <span className="text-[10px] text-text-muted flex items-center gap-1"><Clock className="h-3 w-3" />{action.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
