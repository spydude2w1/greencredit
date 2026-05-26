"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const frameworks = [
  { name: "BRSR Core", status: "compliant", score: 92, items: 84, completed: 78 },
  { name: "GRI Standard", status: "partial", score: 68, items: 120, completed: 82 },
  { name: "CDP Climate", status: "pending", score: 0, items: 45, completed: 0 },
  { name: "UN SDGs", status: "partial", score: 74, items: 169, completed: 125 },
];

const recentActions = [
  { text: "Principle 6 disclosures auto-populated from sensor telemetry stream", time: "2h ago", type: "success" },
  { text: "Scope 3 Category 4 transport emissions require manual confirmation", time: "1d ago", type: "warning" },
  { text: "BRSR FY 2025-26 report audited & signed by compliance team", time: "3d ago", type: "success" },
  { text: "GRI 305-3 indicator missing supplier direct upstream emission telemetry", time: "5d ago", type: "warning" },
];

export default function CompliancePage() {
  return (
    <div className="space-y-8 font-sans text-text-primary antialiased">
      {/* Header */}
      <div className="pb-2 border-b border-white/[0.02]">
        <h1 className="text-xl font-light text-text-primary flex items-center gap-2 tracking-tight">
          Compliance Center
          <ClipboardCheck className="h-4.5 w-4.5 text-accent/80" />
        </h1>
        <p className="text-[12px] text-text-muted font-light mt-1.5 leading-relaxed">
          Verify and audit disclosures against national BRSR and global ESG reporting standards.
        </p>
      </div>

      {/* Grid of Frameworks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {frameworks.map((fw, i) => (
          <motion.div
            key={fw.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className="rounded border border-white/[0.03] bg-[#0c0c0e]/80 p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[14px] font-normal text-text-primary tracking-tight">{fw.name}</span>
              <span className={cn(
                "text-[8.5px] font-normal px-2 py-0.5 rounded border uppercase tracking-wider",
                fw.status === "compliant" ? "bg-accent/5 text-accent border-accent/15" :
                fw.status === "partial" ? "bg-warning/5 text-warning border-warning/15" :
                "bg-white/[0.02] border-white/[0.05] text-text-muted"
              )}>
                {fw.status}
              </span>
            </div>
            {fw.score > 0 ? (
              <div>
                <p className="text-2xl font-light font-mono text-text-primary tracking-tight">{fw.score}%</p>
                <div className="mt-3 h-1 rounded-full bg-white/[0.03] border border-white/[0.02] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(fw.completed / fw.items) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={cn(
                      "h-full rounded-full",
                      fw.score >= 80 ? "gradient-green" : "bg-warning/80"
                    )}
                  />
                </div>
                <p className="text-[10px] text-text-muted font-light mt-1.5 tracking-wide">
                  {fw.completed} / {fw.items} indicators verified
                </p>
              </div>
            ) : (
              <p className="text-[11.5px] text-text-muted font-light mt-2 italic">Simulation not started</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Recent Compliance Activity */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-6"
      >
        <h3 className="text-[12.5px] font-medium text-text-primary tracking-tight mb-4">Recent Audit & Compliance Activity</h3>
        <div className="space-y-3">
          {recentActions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              className="flex items-center gap-3.5 p-3.5 rounded border border-white/[0.03] bg-background hover:border-white/[0.08] transition-colors"
            >
              {action.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-accent/80 shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-warning/80 shrink-0" />
              )}
              <span className="text-[12px] text-text-primary font-light flex-1 leading-relaxed">{action.text}</span>
              <span className="text-[10px] text-text-muted font-mono flex items-center gap-1 shrink-0 select-none">
                <Clock className="h-3 w-3 opacity-60" />
                {action.time}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
