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
  scopeEmissions,
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
  const totalEmissions = scopeEmissions.reduce((a, b) => a + b.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            Enterprise Intelligence
            <Activity className="h-5 w-5 text-accent animate-pulse" />
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Sustainability intelligence for AECS MMPS, Bengaluru
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted px-3 py-1.5 rounded-lg bg-surface border border-border-subtle">
            Last audit: 2025-03-15
          </span>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickLinks.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={link.href}
              className="flex items-center gap-3 p-4 rounded-xl border border-border-subtle bg-surface hover:bg-surface-raised hover:border-accent/20 transition-all card-hover"
            >
              <link.icon className={cn("h-5 w-5", link.color)} />
              <span className="text-sm font-medium text-text-primary">
                {link.label}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-text-muted ml-auto" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Emissions" value={`${totalEmissions}t`} change={-2.3} icon="🏭" delay={0.1} />
        <MetricCard label="ESG Score" value={`${esgScores.overall}/100`} change={3.2} icon="📊" delay={0.15} />
        <MetricCard label="Verified Suppliers" value="18/32" change={12.5} icon="✅" delay={0.2} />
        <MetricCard label="Reports Generated" value="4" change={0} icon="📄" delay={0.25} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ESG Score Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border-subtle bg-surface p-6"
        >
          <h3 className="text-sm font-semibold text-text-primary mb-4">
            ESG Compliance Score
          </h3>
          <ScoreGauge score={esgScores.overall} maxScore={100} label="out of 100" />
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Environment", value: esgScores.environmental, color: "text-accent" },
              { label: "Social", value: esgScores.social, color: "text-info" },
              { label: "Governance", value: esgScores.governance, color: "text-warning" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className={cn("text-lg font-bold stat-number", item.color)}>
                  {item.value}
                </p>
                <p className="text-[10px] text-text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scope Emissions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 rounded-xl border border-border-subtle bg-surface p-6"
        >
          <h3 className="text-sm font-semibold text-text-primary mb-4">
            Emissions by Scope (tonnes CO₂e)
          </h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emissionsByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={{ stroke: "#27272a" }} />
                <YAxis dataKey="category" type="category" width={120} tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={{ stroke: "#27272a" }} />
                <Tooltip
                  contentStyle={{
                    background: "#18181b",
                    border: "1px solid #3f3f46",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#fafafa",
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={18}>
                  {emissionsByCategory.map((entry) => (
                    <Cell key={entry.category} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Supplier Risk */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border-subtle bg-surface p-6"
        >
          <h3 className="text-sm font-semibold text-text-primary mb-4">
            Supplier Verification Status
          </h3>
          <div className="flex items-center justify-center mb-4">
            <div className="h-[140px] w-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={supplierRisk}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {supplierRisk.map((entry) => (
                      <Cell key={entry.status} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-2">
            {supplierRisk.map((item) => (
              <div key={item.status} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: item.color }} />
                  <span className="text-text-secondary">{item.status}</span>
                </div>
                <span className="text-text-primary font-medium stat-number">{item.count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Value Chain */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-xl border border-border-subtle bg-surface p-6"
        >
          <h3 className="text-sm font-semibold text-text-primary mb-4">
            Value Chain Emissions
          </h3>
          <div className="space-y-2">
            {valueChainData.map((stage) => (
              <div key={stage.stage} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{stage.stage}</span>
                  <span className="text-text-primary font-medium stat-number">
                    {stage.emissions}t ({stage.percentage}%)
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-raised overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-full rounded-full bg-accent"
                    style={{ opacity: 0.5 + stage.percentage / 50 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-border-subtle bg-surface p-6"
        >
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            AI Insights
          </h3>
          <div className="space-y-3">
            {aiInsights.slice(0, 3).map((insight, i) => (
              <InsightCard key={insight.id} {...insight} delay={i * 0.1} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Reports */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="rounded-xl border border-border-subtle bg-surface p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">
            Recent Reports
          </h3>
          <Link
            href="/enterprise/reports"
            className="text-xs text-accent font-medium hover:underline flex items-center gap-1"
          >
            Generate New <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left py-2 text-xs font-medium text-text-muted">Report</th>
                <th className="text-left py-2 text-xs font-medium text-text-muted">Framework</th>
                <th className="text-left py-2 text-xs font-medium text-text-muted">Status</th>
                <th className="text-left py-2 text-xs font-medium text-text-muted">Date</th>
                <th className="text-right py-2 text-xs font-medium text-text-muted">Pages</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-border-subtle last:border-0 hover:bg-surface-raised/50 transition-colors"
                >
                  <td className="py-3 text-xs text-text-primary font-medium">{report.title}</td>
                  <td className="py-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-info/10 text-info">
                      {report.framework}
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded",
                        report.status === "Completed"
                          ? "bg-accent/10 text-accent"
                          : report.status === "In Progress"
                          ? "bg-warning/10 text-warning"
                          : "bg-surface-raised text-text-muted"
                      )}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-text-muted">{report.date}</td>
                  <td className="py-3 text-xs text-text-primary text-right stat-number">
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
