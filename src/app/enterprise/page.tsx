"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BarChart3,
  ShieldAlert,
  FileText,
  Truck,
  ArrowRight,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MetricCard, ScoreGauge, InsightCard } from "@/components/dashboard/Cards";
import {
  esgScores,
  emissionsByCategory,
  supplierRisk,
  recentReports,
  aiInsights,
  valueChainData,
} from "@/lib/data/enterprise-data";

const quickLinks = [
  { label: "Carbon Analysis", href: "/enterprise/carbon", icon: BarChart3, color: "text-info" },
  { label: "Greenwash Detect", href: "/enterprise/greenwash", icon: ShieldAlert, color: "text-danger" },
  { label: "ESG Reports", href: "/enterprise/reports", icon: FileText, color: "text-accent" },
  { label: "Suppliers", href: "/enterprise/suppliers", icon: Truck, color: "text-warning" },
];

export default function EnterprisePage() {
  const totalEmissions = 24531; // aligned with ACTRMEngine data

  return (
    <div className="space-y-8 font-sans text-text-primary antialiased">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.02]">
        <div>
          <h1 className="text-2xl font-light text-text-primary flex items-center gap-2.5 tracking-tight">
            Enterprise Intelligence Hub
            <Activity className="h-5 w-5 text-accent/80 animate-pulse" />
          </h1>
          <p className="text-[13px] text-text-muted font-light mt-1.5 leading-relaxed">
            Sustainability operations for AECS MMPS, Bengaluru · Node ID: BLR-AECS-01
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-text-secondary font-light uppercase tracking-wider px-3.5 py-1 rounded bg-[#0c0c0e] border border-white/[0.04]">
            Last audit: 2026-05-15
          </span>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <Link
              href={link.href}
              className="flex items-center gap-3.5 p-4 rounded border border-white/[0.03] bg-[#0c0c0e]/80 hover:bg-[#111113]/80 hover:border-accent/15 transition-colors"
            >
              <link.icon className={cn("h-4.5 w-4.5 opacity-80", link.color)} />
              <span className="text-[13.5px] font-normal text-text-secondary hover:text-text-primary tracking-wide">
                {link.label}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-text-muted opacity-60 ml-auto" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <MetricCard label="Total Emissions" value={`${totalEmissions.toLocaleString()} t`} change={-8.6} icon="🏭" delay={0.08} />
        <MetricCard label="ESG Score" value={`${esgScores.overall}/100`} change={3.2} icon="📊" delay={0.12} />
        <MetricCard label="Verified Suppliers" value="1,248" change={12.5} icon="✅" delay={0.16} />
        <MetricCard label="Reports Generated" value="4" change={0} icon="📄" delay={0.2} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ESG Score Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-8 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[13.5px] font-medium text-text-primary tracking-tight mb-5">
              ESG Compliance Score
            </h3>
            <ScoreGauge score={esgScores.overall} maxScore={100} label="out of 100" />
          </div>
          <div className="grid grid-cols-3 gap-3.5 mt-8 pt-5 border-t border-white/[0.02]">
            {[
              { label: "Environment", value: esgScores.environmental, color: "text-accent/90" },
              { label: "Social", value: esgScores.social, color: "text-info/90" },
              { label: "Governance", value: esgScores.governance, color: "text-warning/90" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className={cn("text-[17px] font-medium font-mono tracking-tight", item.color)}>
                  {item.value}
                </p>
                <p className="text-[10px] text-text-muted font-light mt-1 leading-normal">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scope Emissions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-8"
        >
          <h3 className="text-[13.5px] font-medium text-text-primary tracking-tight mb-5">
            Emissions by Scope (tonnes CO₂e)
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emissionsByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1d1d21" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#71717a", fontSize: 11, fontFamily: "var(--font-geist-mono)" }} axisLine={{ stroke: "#27272a" }} />
                <YAxis dataKey="category" type="category" width={120} tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={{ stroke: "#27272a" }} />
                <Tooltip
                  contentStyle={{
                    background: "#0c0c0e",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "6px",
                    fontSize: "11px",
                    color: "#fafafa",
                  }}
                />
                <Bar dataKey="value" radius={[0, 3, 3, 0]} barSize={14}>
                  {emissionsByCategory.map((entry) => (
                    <Cell key={entry.category} fill={entry.color} opacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Second Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Supplier Risk */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-8"
        >
          <h3 className="text-[13.5px] font-medium text-text-primary tracking-tight mb-5">
            Supplier Verification Status
          </h3>
          <div className="flex items-center justify-center mb-6">
            <div className="h-[150px] w-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={supplierRisk}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={64}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {supplierRisk.map((entry) => (
                      <Cell key={entry.status} fill={entry.color} opacity={0.8} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-3">
            {supplierRisk.map((item) => (
              <div key={item.status} className="flex items-center justify-between text-[12px] font-light">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-sm opacity-80" style={{ background: item.color }} />
                  <span className="text-text-secondary">{item.status}</span>
                </div>
                <span className="text-text-primary font-mono opacity-90">{item.count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Value Chain */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-8"
        >
          <h3 className="text-[13.5px] font-medium text-text-primary tracking-tight mb-5">
            Value Chain Emissions
          </h3>
          <div className="space-y-4">
            {valueChainData.map((stage) => (
              <div key={stage.stage} className="space-y-1.5">
                <div className="flex items-center justify-between text-[12.5px] font-light">
                  <span className="text-text-secondary">{stage.stage}</span>
                  <span className="text-text-primary font-mono opacity-90">
                    {stage.emissions}t ({stage.percentage}%)
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.02] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.percentage}%` }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="h-full rounded-full bg-accent"
                    style={{ opacity: 0.4 + stage.percentage / 70 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-8"
        >
          <h3 className="text-[13.5px] font-medium text-text-primary tracking-tight mb-5 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            AI Analytical Insights
          </h3>
          <div className="space-y-4">
            {aiInsights.slice(0, 3).map((insight, i) => (
              <InsightCard key={insight.id} {...insight} delay={i * 0.05} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Reports */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-8"
      >
        <div className="flex items-center justify-between mb-5 pb-2.5 border-b border-white/[0.02]">
          <h3 className="text-[13.5px] font-medium text-text-primary tracking-tight">
            Recent Reports
          </h3>
          <Link
            href="/enterprise/reports"
            className="text-[12.5px] text-accent/80 hover:text-accent hover:underline font-normal flex items-center gap-1 transition-colors"
          >
            Generate New <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.02] text-[11px] text-text-muted font-light uppercase tracking-wider">
                <th className="pb-3.5 font-light">Report Document</th>
                <th className="pb-3.5 font-light">Framework</th>
                <th className="pb-3.5 font-light">Audit Status</th>
                <th className="pb-3.5 font-light">Timestamp</th>
                <th className="pb-3.5 font-light text-right">Pages</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-white/[0.01] last:border-0 hover:bg-white/[0.01] transition-colors"
                >
                  <td className="py-4 text-[13px] text-text-primary font-normal tracking-tight">{report.title}</td>
                  <td className="py-4">
                    <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-info/5 text-info/95 border border-info/10 tracking-wide">
                      {report.framework}
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className={cn(
                        "text-[10px] font-normal px-2 py-0.5 rounded border tracking-wide",
                        report.status === "Completed"
                          ? "bg-accent/5 text-accent/90 border-accent/10"
                          : report.status === "In Progress"
                          ? "bg-warning/5 text-warning/90 border-warning/10"
                          : "bg-surface text-text-muted border-white/[0.02]"
                      )}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 text-[12.5px] text-text-muted font-light">{report.date}</td>
                  <td className="py-4 text-[12.5px] text-text-primary text-right font-mono opacity-90">
                    {report.pages || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
