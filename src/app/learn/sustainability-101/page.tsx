import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sustainability 101 — Green Credit AI",
  description: "Beginner-friendly sustainability education. Learn carbon basics, ESG fundamentals, and environmental intelligence.",
  keywords: ["sustainability basics", "carbon footprint beginner", "ESG explained", "what is greenwashing"],
  openGraph: { title: "Sustainability 101 — Green Credit AI", description: "Beginner-friendly sustainability education.", type: "website" },
};

const modules = [
  {
    num: "01",
    title: "What is a Carbon Footprint?",
    desc: "Learn how human activities — from driving to eating — translate into greenhouse gas emissions and why measuring them matters.",
    topics: ["Greenhouse gases explained", "Direct vs indirect emissions", "Personal vs organizational footprints"],
  },
  {
    num: "02",
    title: "Scope 1, 2, and 3 Emissions",
    desc: "The three scopes of carbon accounting define where emissions occur. Understanding this framework is the foundation of corporate climate action.",
    topics: ["Scope 1: Direct emissions", "Scope 2: Purchased energy", "Scope 3: Value chain emissions"],
  },
  {
    num: "03",
    title: "What is ESG?",
    desc: "Environmental, Social, and Governance (ESG) is the framework businesses use to measure their sustainability performance and report to stakeholders.",
    topics: ["E: Environmental indicators", "S: Social responsibility", "G: Governance standards"],
  },
  {
    num: "04",
    title: "Greenwashing: How to Spot It",
    desc: "Not every 'green' claim is genuine. Learn the most common greenwashing tactics and how AI-powered verification systems detect deceptive practices.",
    topics: ["Common greenwashing patterns", "Vague vs verified claims", "How AI detects deception"],
  },
  {
    num: "05",
    title: "The Path to Net Zero",
    desc: "Net zero means balancing the amount of greenhouse gases emitted with the amount removed. Explore what realistic net-zero pathways look like for different actors.",
    topics: ["What net zero actually means", "Carbon offsets explained", "Science-based targets"],
  },
  {
    num: "06",
    title: "How Green Credits Work",
    desc: "Green Credits are blockchain-verified tokens that represent verified sustainability actions. Earn, trade, and redeem them through the Green Credit ecosystem.",
    topics: ["Verification process", "Earning Green Credits", "Marketplace trading"],
  },
];

export default function Sustainability101Page() {
  return (
    <div className="text-text-primary">
      <section className="border-b border-white/[0.04] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[9px] text-accent/70 uppercase tracking-[0.3em] font-light mb-4">Green Credit AI · Knowledge</p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-text-primary max-w-2xl leading-[1.1] mb-5">Sustainability 101</h1>
          <p className="text-[13.5px] text-text-secondary font-extralight leading-relaxed max-w-xl">
            New to sustainability? Start here. Six foundational modules covering carbon, ESG, greenwashing, and environmental intelligence — no jargon required.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod) => (
            <div key={mod.num} className="p-7 rounded border border-white/[0.04] bg-[#0c0c0e] hover:border-white/[0.08] transition-colors group">
              <div className="flex items-start gap-5 mb-5">
                <span className="text-[28px] font-light text-text-muted/20 font-mono leading-none shrink-0 mt-0.5">{mod.num}</span>
                <div>
                  <h2 className="text-[16px] font-light text-text-primary leading-[1.3] mb-2 group-hover:text-white transition-colors">{mod.title}</h2>
                  <p className="text-[12px] text-text-muted font-extralight leading-relaxed">{mod.desc}</p>
                </div>
              </div>
              <ul className="space-y-1.5 pl-14">
                {mod.topics.map((topic) => (
                  <li key={topic} className="flex items-center gap-2 text-[11px] text-text-muted/70 font-extralight">
                    <span className="h-px w-3 bg-accent/30 shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-10 border-t border-white/[0.04] text-center">
          <p className="text-[13px] text-text-secondary font-extralight mb-5">Ready to go deeper?</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/learn/guides" className="inline-flex items-center gap-1.5 text-[12px] text-accent/80 hover:text-accent font-light transition-colors">
              Explore Guides <ArrowRight className="h-3 w-3" />
            </Link>
            <Link href="/login" className="inline-flex items-center gap-1.5 text-[12px] text-text-muted hover:text-text-secondary font-light transition-colors">
              Launch Platform <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
