import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Guides — Green Credit AI",
  description:
    "Step-by-step sustainability tutorials, ESG explainers, and carbon footprint education from Green Credit AI.",
  keywords: ["sustainability guides", "ESG tutorial", "carbon footprint education", "BRSR guide"],
  openGraph: {
    title: "Guides — Green Credit AI",
    description: "Step-by-step sustainability tutorials and ESG explainers.",
    type: "website",
  },
};

const guides = [
  {
    level: "Beginner",
    levelColor: "text-accent",
    levelBg: "bg-accent/5 border-accent/15",
    title: "Your First Carbon Footprint Calculation",
    desc: "A step-by-step walkthrough for individuals and small businesses starting their sustainability measurement journey.",
    steps: 5,
    duration: "20 min",
    href: "/learn/guides/first-carbon-calculation",
  },
  {
    level: "Intermediate",
    levelColor: "text-info",
    levelBg: "bg-info/5 border-info/15",
    title: "Setting Up Your ESG Reporting Framework",
    desc: "Choose between GRI, BRSR, TCFD, and SASB frameworks. Learn how to structure your first ESG report with AI assistance.",
    steps: 8,
    duration: "45 min",
    href: "/learn/guides/esg-reporting-framework",
  },
  {
    level: "Intermediate",
    levelColor: "text-info",
    levelBg: "bg-info/5 border-info/15",
    title: "Mapping Your Scope 3 Value Chain",
    desc: "Identify, categorize, and quantify upstream and downstream emissions across your entire supply chain ecosystem.",
    steps: 7,
    duration: "35 min",
    href: "/learn/guides/scope-3-value-chain",
  },
  {
    level: "Advanced",
    levelColor: "text-warning",
    levelBg: "bg-warning/5 border-warning/15",
    title: "AI-Powered Supplier Sustainability Auditing",
    desc: "Deploy automated supplier risk scoring, document verification, and sustainability scoring pipelines across your vendor network.",
    steps: 10,
    duration: "60 min",
    href: "/learn/guides/supplier-sustainability-audit",
  },
  {
    level: "Beginner",
    levelColor: "text-accent",
    levelBg: "bg-accent/5 border-accent/15",
    title: "Understanding Green Credits and Blockchain Verification",
    desc: "Learn how sustainability actions are tokenized, verified on-chain, and traded through the Green Credit marketplace.",
    steps: 4,
    duration: "15 min",
    href: "/learn/guides/green-credits-guide",
  },
  {
    level: "Advanced",
    levelColor: "text-warning",
    levelBg: "bg-warning/5 border-warning/15",
    title: "Building a Net-Zero Pathway with ACTRM",
    desc: "Use the Aggregate-Calculate-Track-Reduce-Monetize framework to build a credible, measurable net-zero roadmap.",
    steps: 12,
    duration: "90 min",
    href: "/learn/guides/net-zero-pathway",
  },
];

export default function GuidesPage() {
  return (
    <div className="text-text-primary">
      {/* Hero */}
      <section className="border-b border-white/[0.04] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[9px] text-accent/70 uppercase tracking-[0.3em] font-light mb-4">
            Green Credit AI · Knowledge
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-text-primary max-w-2xl leading-[1.1] mb-5">
            Guides
          </h1>
          <p className="text-[13.5px] text-text-secondary font-extralight leading-relaxed max-w-xl">
            Practical, step-by-step tutorials on sustainability measurement, ESG compliance, and environmental intelligence.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="group block p-7 rounded border border-white/[0.04] bg-[#0c0c0e] hover:border-white/[0.08] hover:bg-[#0e0e11] transition-all"
            >
              <div className="flex items-center justify-between mb-5">
                <span className={`text-[9px] uppercase tracking-[0.25em] font-light px-2 py-0.5 rounded border ${guide.levelBg} ${guide.levelColor}`}>
                  {guide.level}
                </span>
                <div className="flex items-center gap-3 text-[10px] text-text-muted/50 font-extralight">
                  <span>{guide.steps} steps</span>
                  <span>·</span>
                  <span>{guide.duration}</span>
                </div>
              </div>
              <h3 className="text-[15px] font-light text-text-primary leading-[1.3] mb-3 group-hover:text-white transition-colors">
                {guide.title}
              </h3>
              <p className="text-[12px] text-text-muted font-extralight leading-relaxed mb-5">
                {guide.desc}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-text-muted/50 group-hover:text-accent/70 transition-colors font-light">
                Start guide <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
