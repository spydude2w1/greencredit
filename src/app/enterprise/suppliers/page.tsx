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
      case "Verified": return <ShieldCheck className="h-4 w-4 text-accent/80 shrink-0" />;
      case "Flagged": return <AlertTriangle className="h-4 w-4 text-danger/80 shrink-0" />;
      case "Pending": return <Clock className="h-4 w-4 text-warning/80 shrink-0" />;
      default: return <Clock className="h-4 w-4 text-info/80 shrink-0" />;
    }
  };

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-accent/90";
    if (score >= 60) return "text-warning/90";
    return "text-danger/90";
  };

  return (
    <div className="space-y-8 font-sans text-text-primary antialiased">
      {/* Header */}
      <div className="pb-2 border-b border-white/[0.02]">
        <h1 className="text-xl font-light text-text-primary flex items-center gap-2 tracking-tight">
          Supplier Intelligence Portal
          <Truck className="h-4.5 w-4.5 text-warning/80" />
        </h1>
        <p className="text-[12px] text-text-muted font-light mt-1.5 leading-relaxed">
          Scope 3 value chain sustainability risk management and confidence scoring.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Vendors", value: suppliers.length, color: "text-text-primary" },
          { label: "Verified Partners", value: suppliers.filter((s) => s.status === "Verified").length, color: "text-accent" },
          { label: "High Risk Flags", value: suppliers.filter((s) => s.status === "Flagged").length, color: "text-danger" },
          { label: "Avg Trust Score", value: Math.round(suppliers.reduce((a, b) => a + b.trustScore, 0) / suppliers.length), color: "text-warning" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className="rounded border border-white/[0.03] bg-[#0c0c0e] p-4 flex flex-col justify-between"
          >
            <p className="text-[10px] font-light text-text-muted uppercase tracking-widest">{stat.label}</p>
            <p className={cn("text-2xl font-light font-mono tracking-tight mt-2", stat.color)}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters & Action Bar */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted opacity-80" />
          <input
            type="text"
            placeholder="Search suppliers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-8.5 rounded bg-[#09090b] border border-white/[0.06] pl-9 pr-4 text-[12px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/30 transition-colors font-light"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-3.5 w-3.5 text-text-muted mr-1 opacity-70" />
          {(["all", "Verified", "Pending", "Flagged", "Under Review"] as FilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={cn(
                "text-[10px] px-3 py-1 rounded transition-colors uppercase tracking-wider",
                filter === status
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-white/[0.02] border border-white/[0.04] text-text-muted hover:text-text-primary"
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className="rounded border border-white/[0.03] bg-[#0c0c0e]/80 overflow-hidden hover:border-white/[0.08] transition-colors"
          >
            <button
              onClick={() => setExpandedId(expandedId === supplier.id ? null : supplier.id)}
              className="w-full flex items-center gap-4 p-4 hover:bg-white/[0.01] transition-colors text-left"
            >
              {statusIcon(supplier.status)}
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] font-normal text-text-primary tracking-tight">{supplier.name}</p>
                <p className="text-[11px] text-text-muted font-light mt-0.5">{supplier.industry}</p>
              </div>
              <div className="flex items-center gap-5 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className={cn("text-[16px] font-light font-mono tracking-tight", scoreColor(supplier.trustScore))}>
                    {supplier.trustScore}
                  </p>
                  <p className="text-[9px] text-text-muted font-light uppercase tracking-wider mt-0.5">Trust Score</p>
                </div>
                <span className={cn(
                  "text-[8.5px] font-normal px-2 py-0.5 rounded border hidden sm:block uppercase tracking-wider",
                  supplier.status === "Verified" ? "bg-accent/5 text-accent/90 border-accent/10" :
                  supplier.status === "Flagged" ? "bg-danger/5 text-danger/90 border-danger/10" :
                  supplier.status === "Pending" ? "bg-warning/5 text-warning/90 border-warning/10" :
                  "bg-info/5 text-info/90 border-info/10"
                )}>
                  {supplier.status}
                </span>
                <ChevronDown className={cn(
                  "h-4 w-4 text-text-muted transition-transform duration-200 opacity-60",
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
                className="border-t border-white/[0.02] p-5 bg-[#09090b]/80"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 border-b border-white/[0.01]">
                  <div>
                    <p className="text-[9.5px] text-text-muted font-light uppercase tracking-wider">Indexed Emissions</p>
                    <p className="text-[13px] font-light font-mono text-text-primary tracking-tight mt-1">{supplier.emissions}t CO₂e</p>
                  </div>
                  <div>
                    <p className="text-[9.5px] text-text-muted font-light uppercase tracking-wider">Claims Checked</p>
                    <p className="text-[13px] font-light font-mono text-text-primary tracking-tight mt-1">{supplier.claims}</p>
                  </div>
                  <div>
                    <p className="text-[9.5px] text-text-muted font-light uppercase tracking-wider">Flags Found</p>
                    <p className={cn("text-[13px] font-light font-mono tracking-tight mt-1", supplier.flagged > 0 ? "text-danger/90" : "text-accent/90")}>
                      {supplier.flagged}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9.5px] text-text-muted font-light uppercase tracking-wider">Last Standard Audit</p>
                    <p className="text-[12.5px] font-light text-text-primary mt-1">{supplier.lastAudit}</p>
                  </div>
                </div>
                {supplier.certifications.length > 0 && (
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-text-muted font-light uppercase tracking-wider">Active Credentials:</span>
                    {supplier.certifications.map((cert) => (
                      <span key={cert} className="text-[9px] font-normal px-2 py-0.5 rounded border border-accent/15 bg-accent/5 text-accent/95 uppercase tracking-wider">
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex gap-4 pt-2">
                  <button className="text-[11px] font-normal text-accent/80 hover:text-accent hover:underline flex items-center gap-1.5 transition-colors">
                    Access Audit Records <ExternalLink className="h-3 w-3 shrink-0" />
                  </button>
                  <button className="text-[11px] font-normal text-info/80 hover:text-info hover:underline flex items-center gap-1.5 transition-colors">
                    Trigger Verification Scan <ExternalLink className="h-3 w-3 shrink-0" />
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
