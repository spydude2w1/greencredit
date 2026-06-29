"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, Code, Download, ArrowLeft } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

export default function ResearchViewer() {
  const [viewMode, setViewMode] = useState<"pdf" | "html">("pdf");

  return (
    <div className="flex flex-col h-screen w-full bg-[#09090b] text-text-primary overflow-hidden font-sans">
      {/* Header Bar */}
      <header className="flex-none flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-[#09090b] border-b border-white/[0.06] gap-4 z-10">
        {/* Logo & Title */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <BrandLogo size={28} />
          <div>
            <h1 className="text-text-primary font-medium text-sm tracking-tight leading-none">
              Green Credit AI
            </h1>
            <p className="text-text-muted text-[10px] tracking-wider mt-1.5 uppercase font-light">
              CBSE Skill Expo 2026-27 Research Paper
            </p>
          </div>
        </div>

        {/* Toggle Switches */}
        <div className="flex items-center bg-white/[0.03] border border-white/[0.06] rounded-full p-1 w-full sm:w-auto max-w-xs sm:max-w-none">
          <button
            onClick={() => setViewMode("pdf")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
              viewMode === "pdf"
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            PDF Version
          </button>
          <button
            onClick={() => setViewMode("html")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
              viewMode === "html"
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            HTML Version
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <a
            href="/assets/research/GreenCreditAI_Research_Paper.pdf"
            download="GreenCreditAI_Research_Paper.pdf"
            className="flex items-center justify-center gap-2 text-[11px] font-medium text-white bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.12] transition-all px-4 py-2 rounded-full cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-accent" />
            Download PDF
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 text-[11px] font-medium text-text-muted hover:text-text-primary transition-colors px-3 py-2 rounded-full"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Home
          </Link>
        </div>
      </header>

      {/* Content Viewer */}
      <main className="flex-1 w-full bg-[#0d0d11] relative overflow-hidden">
        {viewMode === "pdf" ? (
          <iframe
            src="/assets/research/GreenCreditAI_Research_Paper.pdf#toolbar=1&navpanes=0&scrollbar=1"
            className="absolute inset-0 w-full h-full border-none bg-[#0d0d11]"
            title="Green Credit AI Research Paper PDF"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-[#0d0d11] p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-4xl h-full bg-white rounded-lg shadow-2xl overflow-hidden border border-white/10 relative">
              <iframe
                src="/assets/research/GreenCreditAI_Research_Paper.html"
                className="w-full h-full border-none bg-white"
                title="Green Credit AI Research Paper HTML"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
