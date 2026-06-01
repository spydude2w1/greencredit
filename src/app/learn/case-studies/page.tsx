import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Green Credit AI",
  description: "Real sustainability transformation stories using the Green Credit AI platform.",
  openGraph: { title: "Case Studies — Green Credit AI", description: "Sustainability transformation case studies.", type: "website" },
};

const cases = [
  {
    org: "AECS Magnolia School, Bengaluru",
    type: "Education Institution",
    typeColor: "text-accent",
    challenge: "No structured process for tracking campus energy, waste, or transport emissions.",
    outcome: "Achieved 34% reduction in Scope 1+2 emissions over 8 months using the ACTRM framework. Filed first BRSR-aligned sustainability report.",
    metrics: [{ label: "Emission reduction", value: "34%" }, { label: "Timeline", value: "8 mo" }, { label: "Reports filed", value: "1" }],
  },
  {
    org: "Regional MSME Cluster, Pune",
    type: "Manufacturing",
    typeColor: "text-info",
    challenge: "Supplier sustainability data was entirely self-reported with no independent verification.",
    outcome: "AI-powered supplier audits across 48 vendors identified 12 high-risk greenwashing instances. Supply chain Scope 3 emissions quantified for first time.",
    metrics: [{ label: "Vendors audited", value: "48" }, { label: "Greenwash flags", value: "12" }, { label: "Scope 3 mapped", value: "100%" }],
  },
  {
    org: "Community Initiative, Hyderabad",
    type: "B2C Engagement",
    typeColor: "text-warning",
    challenge: "Low community awareness of individual carbon footprint and sustainable lifestyle choices.",
    outcome: "580 residents onboarded in 90 days. Average personal carbon footprint reduced 22%. 4,200 Green Credits earned and traded on marketplace.",
    metrics: [{ label: "Users onboarded", value: "580" }, { label: "Footprint reduction", value: "22%" }, { label: "Credits traded", value: "4,200" }],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="text-text-primary">
      <section className="border-b border-white/[0.04] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[9px] text-accent/70 uppercase tracking-[0.3em] font-light mb-4">Green Credit AI · Knowledge</p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-text-primary max-w-2xl leading-[1.1] mb-5">Case Studies</h1>
          <p className="text-[13.5px] text-text-secondary font-extralight leading-relaxed max-w-xl">
            Real sustainability transformations powered by the Green Credit AI platform.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-8">
        {cases.map((c) => (
          <div key={c.org} className="p-8 rounded border border-white/[0.04] bg-[#0c0c0e] hover:border-white/[0.08] transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-white/[0.04]">
              <div>
                <p className="text-[16px] font-light text-text-primary">{c.org}</p>
                <span className={`text-[9px] uppercase tracking-[0.25em] font-light mt-1 inline-block ${c.typeColor}`}>{c.type}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <p className="text-[9px] text-text-muted/60 uppercase tracking-[0.25em] font-light mb-2">Challenge</p>
                <p className="text-[13px] text-text-secondary font-extralight leading-relaxed">{c.challenge}</p>
              </div>
              <div>
                <p className="text-[9px] text-accent/60 uppercase tracking-[0.25em] font-light mb-2">Outcome</p>
                <p className="text-[13px] text-text-secondary font-extralight leading-relaxed">{c.outcome}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/[0.04]">
              {c.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-[20px] font-light text-text-primary font-mono tracking-tight">{m.value}</p>
                  <p className="text-[10px] text-text-muted font-extralight mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
