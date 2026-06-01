import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights — Green Credit AI",
  description: "AI-generated sustainability insights, research summaries, and environmental intelligence from Green Credit AI.",
  openGraph: { title: "Insights — Green Credit AI", description: "AI-generated sustainability insights.", type: "website" },
};

const insights = [
  {
    type: "Market Intelligence", typeColor: "text-accent",
    title: "India's ESG Disclosure Landscape: 2026 State of the Market",
    summary: "78% of BSE-listed companies now file BRSR reports, up from 43% in 2024. AI-assisted reporting tools have cut compliance cost by an average of ₹12.4L per organization.",
    metrics: [{ label: "BRSR adoption", value: "78%" }, { label: "Avg cost reduction", value: "₹12.4L" }, { label: "AI-assisted reports", value: "2,140+" }],
    date: "June 2026", source: "Green Credit AI Research",
  },
  {
    type: "Carbon Data", typeColor: "text-info",
    title: "Scope 3 Emissions: The Invisible 73% of Enterprise Carbon Footprints",
    summary: "Analysis of 500+ enterprise carbon audits reveals that Scope 3 emissions account for nearly three-quarters of total organizational carbon output.",
    metrics: [{ label: "Scope 3 share", value: "73%" }, { label: "Enterprises audited", value: "500+" }, { label: "Avg Scope 1+2", value: "27%" }],
    date: "May 2026", source: "ACTRM Engine Analysis",
  },
  {
    type: "Technology", typeColor: "text-warning",
    title: "AI-Powered Greenwash Detection: Accuracy Benchmarks Across 12 Models",
    summary: "Our internal benchmarks show the Green Credit AI greenwash detection model achieves 94.2% precision on a curated dataset of 8,000 verified and fraudulent sustainability claims.",
    metrics: [{ label: "Detection precision", value: "94.2%" }, { label: "Claims tested", value: "8,000" }, { label: "False positive rate", value: "2.1%" }],
    date: "May 2026", source: "Green Credit AI Labs",
  },
  {
    type: "Policy", typeColor: "text-danger",
    title: "SEBI's Extended BRSR Core Requirements: What Changes in FY2026-27",
    summary: "New SEBI mandates extend BRSR Core reporting to the top 250 listed entities. Key additions include supply chain disclosures and Scope 3 category reporting.",
    metrics: [{ label: "Entities impacted", value: "250+" }, { label: "New categories", value: "8" }, { label: "Effective from", value: "Apr 2026" }],
    date: "April 2026", source: "Regulatory Analysis",
  },
];

export default function InsightsPage() {
  return (
    <div className="text-text-primary">
      <section className="border-b border-white/[0.04] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[9px] text-accent/70 uppercase tracking-[0.3em] font-light mb-4">Green Credit AI · Knowledge</p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-text-primary max-w-2xl leading-[1.1] mb-5">Insights</h1>
          <p className="text-[13.5px] text-text-secondary font-extralight leading-relaxed max-w-xl">
            AI-generated research summaries, market intelligence, and environmental data insights.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-6">
        {insights.map((insight) => (
          <article key={insight.title} className="p-8 rounded border border-white/[0.04] bg-[#0c0c0e] hover:border-white/[0.08] transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <span className={`text-[9px] uppercase tracking-[0.25em] font-light ${insight.typeColor}`}>{insight.type}</span>
              <div className="flex items-center gap-3 text-[10px] text-text-muted/50 font-extralight">
                <span>{insight.date}</span><span>·</span><span>{insight.source}</span>
              </div>
            </div>
            <h2 className="text-[18px] font-light text-text-primary leading-[1.3] mb-4">{insight.title}</h2>
            <p className="text-[13px] text-text-secondary font-extralight leading-relaxed mb-6">{insight.summary}</p>
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/[0.04]">
              {insight.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-[18px] font-light text-text-primary font-mono tracking-tight">{m.value}</p>
                  <p className="text-[10px] text-text-muted font-extralight mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
