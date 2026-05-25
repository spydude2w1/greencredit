"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Search, Filter, ShieldCheck, AlertTriangle, Clock, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { suppliers } from "@/lib/data/enterprise-data";

type FilterStatus = "all" | "Verified" | "Pending" | "Flagged" | "Under Review";

export default function SuppliersPage() {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = suppliers.filter((s) => {
    if (filter !== "all" && s.status !== filter) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statusIcon = (status: string) => {
    switch (status) {
      case "Verified": return <ShieldCheck className="h-4 w-4 text-accent" />;
      case "Flagged": return <AlertTriangle className="h-4 w-4 text-danger" />;
      case "Pending": return <Clock className="h-4 w-4 text-warning" />;
      default: return <Clock className="h-4 w-4 text-info" />;
    }
  };

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-accent";
    if (score >= 60) return "text-warning";
    return "text-danger";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          Supplier Intelligence
          <Truck className="h-5 w-5 text-warning" />
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Scope 3 vendor verification and sustainability scoring
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Suppliers", value: suppliers.length, color: "text-text-primary" },
          { label: "Verified", value: suppliers.filter((s) => s.status === "Verified").length, color: "text-accent" },
          { label: "Flagged", value: suppliers.filter((s) => s.status === "Flagged").length, color: "text-danger" },
          { label: "Avg Trust Score", value: Math.round(suppliers.reduce((a, b) => a + b.trustScore, 0) / suppliers.length), color: "text-warning" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border-subtle bg-surface p-4"
          >
            <p className="text-xs text-text-muted">{stat.label}</p>
            <p className={cn("text-2xl font-bold stat-number mt-1", stat.color)}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search suppliers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 rounded-lg bg-surface border border-border-subtle pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="h-4 w-4 text-text-muted" />
          {(["all", "Verified", "Pending", "Flagged", "Under Review"] as FilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-lg font-medium transition-all",
                filter === status
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-surface border border-border-subtle text-text-muted hover:text-text-primary"
              )}
            >
              {status === "all" ? "All" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Supplier List */}
      <div className="space-y-3">
        {filtered.map((supplier, i) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border-subtle bg-surface overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(expandedId === supplier.id ? null : supplier.id)}
              className="w-full flex items-center gap-4 p-4 hover:bg-surface-raised/50 transition-colors text-left"
            >
              {statusIcon(supplier.status)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{supplier.name}</p>
                <p className="text-xs text-text-muted">{supplier.industry}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className={cn("text-lg font-bold stat-number", scoreColor(supplier.trustScore))}>
                    {supplier.trustScore}
                  </p>
                  <p className="text-[10px] text-text-muted">Trust Score</p>
                </div>
                <span className={cn(
                  "text-[10px] font-bold px-2 py-1 rounded hidden sm:block",
                  supplier.status === "Verified" ? "bg-accent/10 text-accent" :
                  supplier.status === "Flagged" ? "bg-danger/10 text-danger" :
                  supplier.status === "Pending" ? "bg-warning/10 text-warning" :
                  "bg-info/10 text-info"
                )}>
                  {supplier.status}
                </span>
                <ChevronDown className={cn(
                  "h-4 w-4 text-text-muted transition-transform",
                  expandedId === supplier.id && "rotate-180"
                )} />
              </div>
            </button>

            {expandedId === supplier.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t border-border-subtle p-4 bg-background"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] text-text-muted">Emissions</p>
                    <p className="text-sm font-bold text-text-primary stat-number">{supplier.emissions}t CO₂e</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted">Claims Scanned</p>
                    <p className="text-sm font-bold text-text-primary stat-number">{supplier.claims}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted">Flagged Claims</p>
                    <p className={cn("text-sm font-bold stat-number", supplier.flagged > 0 ? "text-danger" : "text-accent")}>
                      {supplier.flagged}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted">Last Audit</p>
                    <p className="text-sm font-bold text-text-primary">{supplier.lastAudit}</p>
                  </div>
                </div>
                {supplier.certifications.length > 0 && (
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-text-muted">Certifications:</span>
                    {supplier.certifications.map((cert) => (
                      <span key={cert} className="text-[10px] font-medium px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex gap-2">
                  <button className="text-xs font-medium text-accent hover:underline flex items-center gap-1">
                    Full Report <ExternalLink className="h-3 w-3" />
                  </button>
                  <button className="text-xs font-medium text-info hover:underline flex items-center gap-1">
                    Run Greenwash Scan <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
