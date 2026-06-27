import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Paper | Green Credit AI",
  description: "Read the comprehensive research paper behind the ACTRM Framework and Edge AI implementation of the Green Credit AI platform.",
};

export default function ResearchPaperViewer() {
  return (
    <div className="flex flex-col h-screen w-full bg-neutral-900 overflow-hidden">
      {/* Premium Header bar */}
      <header className="flex-none flex items-center justify-between px-6 py-4 bg-black border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <svg
              className="w-4 h-4 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-medium text-sm">
              Green Credit AI: Sustainability Operating System
            </h1>
            <p className="text-neutral-400 text-xs">
              CBSE Skill Expo 2026-27 Research Paper
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/assets/research/GreenCreditAI_Research_Paper.pdf"
            download
            className="flex items-center gap-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download PDF
          </a>
          <a
            href="/"
            className="text-neutral-400 hover:text-white transition-colors text-sm"
          >
            Close
          </a>
        </div>
      </header>

      {/* PDF Viewer Embed */}
      <main className="flex-1 w-full h-full relative">
        <iframe
          src="/assets/research/GreenCreditAI_Research_Paper.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
          className="absolute inset-0 w-full h-full border-none"
          title="Green Credit AI Research Paper"
        />
      </main>
    </div>
  );
}
