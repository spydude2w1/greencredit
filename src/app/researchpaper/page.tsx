import React from "react";
import type { Metadata } from "next";
import ResearchViewer from "@/components/research/ResearchViewer";

export const metadata: Metadata = {
  title: "Research Paper | Green Credit AI",
  description: "Read the comprehensive research paper behind the ACTRM Framework and Edge AI implementation of the Green Credit AI platform.",
  openGraph: {
    title: "Research Paper | Green Credit AI",
    description: "Read the comprehensive research paper behind the ACTRM Framework and Edge AI implementation of the Green Credit AI platform.",
    type: "article",
    url: "https://greencredit.live/researchpaper",
  },
};

export default function ResearchPaperPage() {
  return <ResearchViewer />;
}
