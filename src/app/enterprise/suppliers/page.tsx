"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck, Search, Filter, ShieldCheck, AlertTriangle, Clock,
  ChevronDown, ExternalLink, X, CheckCircle, Loader2,
  FileText, Shield, RefreshCw, Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { suppliers } from "@/lib/data/enterprise-data";

type FilterStatus = "all" | "Verified" | "Pending" | "Flagged" | "Under Review";

type Supplier = typeof suppliers[number];

/* ─── Audit Records Modal ─── */
function AuditModal({ supplier, onClose }: { supplier: Supplier; onClose: () => void }) {
  const records = [
    { date: "12 May 2025", type: "Full ESG Audit", result: supplier.status === "Flagged" ? "Issues Found" : "Passed", auditor: "Green Credit AI Engine", notes: supplier.flagged > 0 ? `${supplier.flagged} greenwashing flag(s) detected in sustainability disclosures.` : "All disclosures verified. No anomalies detected." },
    { date: "04 Mar 2025", type: "Emissions Verification", result: "Passed", auditor: "Scope 3 Telemetry Module", notes: `Indexed ${supplier.emissions}t CO₂e for reporting period. Confidence: 91%.` },
    { date: "18 Jan 2025", type: "Credential Check", result: supplier.certifications.length > 0 ? "Passed" : "Partial", auditor: "Certification Registry API", notes: supplier.certifications.length > 0 ? `Verified: ${supplier.certifications.join(", ")}.` : "No active certifications found in registry." },
    { date: "29 Nov 2024", type: "Initial Onboarding Scan", result: "Completed", auditor: "Supplier Intelligence Module", notes: `Baseline trust score established: ${supplier.trustScore}/100.` },
  ];

  const downloadAuditLog = () => {
    const blob = new Blob([JSON.stringify({ supplier: supplier.name, auditRecords: records }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `audit_log_${supplier.name.replace(/\s+/g, "_")}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-xl border border-white/[0.06] bg-[#0c0c0e] shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <FileText className="h-4 w-4 text-accent/80" />
            <div>
              <p className="text-[13px] font-normal text-text-primary tracking-tight">Audit Records</p>
              <p className="text-[10.5px] text-text-muted font-light">{supplier.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="h-7 w-7 rounded flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/[0.04] transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 space-y-3 max-h-[420px] overflow-y-auto">
          {records.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-3.5 p-3.5 rounded border border-white/[0.03] bg-[#09090b]"
            >
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className={cn("h-7 w-7 rounded-full flex items-center justify-center border text-[10px]",
                  r.result === "Issues Found" || r.result === "Partial" ? "bg-warning/5 border-warning/20 text-warning" : "bg-accent/5 border-accent/20 text-accent"
                )}>
                  {r.result === "Issues Found" || r.result === "Partial" ? <AlertTriangle className="h-3.5 w-3.5" /> : <CheckCircle className="h-3.5 w-3.5" />}
                </div>
                {i < records.length - 1 && <div className="w-px flex-1 bg-white/[0.04] my-1 min-h-[16px]" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[12.5px] font-normal text-text-primary tracking-tight">{r.type}</p>
                  <span className={cn("text-[8.5px] px-2 py-0.5 rounded border uppercase tracking-wider shrink-0",
                    r.result === "Issues Found" ? "bg-warning/5 text-warning border-warning/15" :
                    r.result === "Partial" ? "bg-info/5 text-info border-info/15" :
                    "bg-accent/5 text-accent border-accent/15"
                  )}>{r.result}</span>
                </div>
                <p className="text-[10.5px] text-text-muted font-light mt-0.5">{r.date} · {r.auditor}</p>
                <p className="text-[11px] text-text-secondary font-light mt-1.5 leading-relaxed">{r.notes}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-3 px-5 py-3.5 border-t border-white/[0.04]">
          <button onClick={downloadAuditLog} className="flex items-center gap-1.5 text-[11.5px] font-normal text-accent/80 hover:text-accent transition-colors">
            <Download className="h-3.5 w-3.5" /> Download Log
          </button>
          <button onClick={onClose} className="ml-auto text-[12px] font-light text-text-muted hover:text-text-primary transition-colors">Close</button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Verification Scan Modal ─── */
const scanSteps = [
  "Connecting to supplier data registry...",
  "Cross-referencing ESG claims against GRI/BRSR indices...",
  "Running greenwashing detection heuristics...",
  "Recalculating trust score with updated telemetry...",
  "Generating cryptographic audit signature...",
];

function ScanModal({ supplier, onClose }: { supplier: Supplier; onClose: () => void }) {
  const [scanning, setScanning] = useState(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const startScan = async () => {
    setScanning(true);
    for (let i = 0; i < scanSteps.length; i++) {
      setStep(i);
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));
    }
    setDone(true);
    setScanning(false);
  };

  const newScore = Math.min(100, supplier.trustScore + (supplier.status === "Flagged" ? -3 : 2));

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={!scanning ? onClose : undefined}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-xl border border-white/[0.06] bg-[#0c0c0e] shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <Shield className="h-4 w-4 text-info/80" />
            <div>
              <p className="text-[13px] font-normal text-text-primary tracking-tight">Verification Scan</p>
              <p className="text-[10.5px] text-text-muted font-light">{supplier.name}</p>
            </div>
          </div>
          {!scanning && (
            <button onClick={onClose} className="h-7 w-7 rounded flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/[0.04] transition-colors">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="p-5">
          {!scanning && !done && (
            <div className="text-center py-4">
              <div className="h-12 w-12 rounded-full bg-info/5 border border-info/15 flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-5 w-5 text-info/80" />
              </div>
              <p className="text-[13px] font-normal text-text-primary tracking-tight mb-1">Run Full Verification Scan</p>
              <p className="text-[11.5px] text-text-muted font-light leading-relaxed mb-5">Re-verify supplier ESG claims, emissions data, and certifications using the latest intelligence indices.</p>
              <button onClick={startScan} className="px-5 py-2 rounded bg-info/10 border border-info/20 text-info text-[11.5px] font-normal tracking-wide hover:bg-info/15 transition-colors flex items-center gap-2 mx-auto">
                <Shield className="h-3.5 w-3.5 shrink-0" /> Initialize Scan
              </button>
            </div>
          )}

          {scanning && (
            <div className="space-y-3">
              {scanSteps.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3">
                  {i < step ? <CheckCircle className="h-4 w-4 text-accent shrink-0" /> :
                   i === step ? <Loader2 className="h-4 w-4 text-info animate-spin shrink-0" /> :
                   <div className="h-4 w-4 rounded-full border border-white/[0.08] shrink-0" />}
                  <span className={cn("text-[12px] font-light tracking-tight", i <= step ? "text-text-primary" : "text-text-muted")}>{s}</span>
                </motion.div>
              ))}
            </div>
          )}

          {done && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex items-center gap-2.5 p-3.5 rounded border border-accent/15 bg-accent/[0.02]">
                <CheckCircle className="h-4.5 w-4.5 text-accent shrink-0" />
                <div>
                  <p className="text-[12.5px] font-normal text-text-primary tracking-tight">Scan complete</p>
                  <p className="text-[11px] text-text-muted font-light mt-0.5">All verification modules passed successfully.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded border border-white/[0.03] bg-[#09090b] text-center">
                  <p className="text-[22px] font-light font-mono text-accent tracking-tight">{newScore}</p>
                  <p className="text-[9.5px] text-text-muted uppercase tracking-wider mt-1">Updated Trust Score</p>
                </div>
                <div className="p-3.5 rounded border border-white/[0.03] bg-[#09090b] text-center">
                  <p className="text-[22px] font-light font-mono text-text-primary tracking-tight">{supplier.claims}</p>
                  <p className="text-[9.5px] text-text-muted uppercase tracking-wider mt-1">Claims Re-verified</p>
                </div>
              </div>
              {supplier.flagged > 0 && (
                <div className="flex items-start gap-2.5 p-3 rounded border border-warning/15 bg-warning/[0.02]">
                  <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                  <p className="text-[11.5px] text-text-secondary font-light leading-relaxed">{supplier.flagged} existing flag(s) remain unresolved. Recommend escalation to compliance team.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {done && (
          <div className="flex items-center gap-3 px-5 py-3.5 border-t border-white/[0.04]">
            <button onClick={onClose} className="ml-auto text-[12px] font-light text-text-muted hover:text-text-primary transition-colors">Close</button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ─── Main Page ─── */

export default function SuppliersPage() {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [auditSupplier, setAuditSupplier] = useState<Supplier | null>(null);
  const [scanSupplier, setScanSupplier] = useState<Supplier | null>(null);

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
      {/* Modals */}
      <AnimatePresence>
        {auditSupplier && <AuditModal supplier={auditSupplier} onClose={() => setAuditSupplier(null)} />}
        {scanSupplier && <ScanModal supplier={scanSupplier} onClose={() => setScanSupplier(null)} />}
      </AnimatePresence>

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
                  <button
                    onClick={() => setAuditSupplier(supplier)}
                    className="text-[11px] font-normal text-accent/80 hover:text-accent hover:underline flex items-center gap-1.5 transition-colors"
                  >
                    Access Audit Records <ExternalLink className="h-3 w-3 shrink-0" />
                  </button>
                  <button
                    onClick={() => setScanSupplier(supplier)}
                    className="text-[11px] font-normal text-info/80 hover:text-info hover:underline flex items-center gap-1.5 transition-colors"
                  >
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
