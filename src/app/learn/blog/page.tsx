import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Green Credit AI",
  description:
    "Sustainability articles, environmental insights, and industry updates from the Green Credit AI team.",
  keywords: ["sustainability blog", "ESG news", "carbon intelligence", "climate tech articles"],
  openGraph: {
    title: "Blog — Green Credit AI",
    description: "Sustainability articles, environmental insights, and industry updates.",
    type: "website",
  },
};

const posts = [
  {
    slug: "scope-3-emissions-guide",
    category: "Carbon Intelligence",
    title: "Understanding Scope 3 Emissions: A Complete Enterprise Guide",
    excerpt:
      "Scope 3 emissions account for more than 70% of a company's total carbon footprint. Here's how AI-powered value chain mapping is changing how enterprises measure and manage them.",
    date: "May 28, 2026",
    readTime: "8 min read",
    accent: "text-accent",
  },
  {
    slug: "brsr-automation-2026",
    category: "ESG Automation",
    title: "BRSR Compliance in 2026: How AI Agents Are Replacing Manual Reporting",
    excerpt:
      "India's Business Responsibility and Sustainability Reporting framework is evolving. We explore how autonomous AI agents are reducing compliance workload by 80%.",
    date: "May 22, 2026",
    readTime: "6 min read",
    accent: "text-info",
  },
  {
    slug: "greenwashing-detection-methods",
    category: "Greenwash Detection",
    title: "5 Greenwashing Patterns AI Can Detect That Humans Miss",
    excerpt:
      "From vague language to misleading lifecycle data, greenwashing is increasingly sophisticated. Learn how our AI verification engine flags deceptive environmental claims.",
    date: "May 15, 2026",
    readTime: "5 min read",
    accent: "text-danger",
  },
  {
    slug: "green-credits-monetization",
    category: "Monetization",
    title: "Green Credits Explained: How Verified Sustainability Actions Become Tradeable Assets",
    excerpt:
      "Blockchain-backed sustainability verification is enabling a new class of environmental assets. Here's how organizations and individuals can earn and trade Green Credits.",
    date: "May 8, 2026",
    readTime: "7 min read",
    accent: "text-warning",
  },
  {
    slug: "supplier-intelligence-ai",
    category: "Value Chain",
    title: "Supplier Sustainability Intelligence: Moving Beyond Self-Reported Data",
    excerpt:
      "Self-reported ESG data from suppliers is unreliable. AI-powered supplier intelligence cross-references dozens of signals to give enterprises the truth about their value chain.",
    date: "May 1, 2026",
    readTime: "6 min read",
    accent: "text-accent",
  },
  {
    slug: "edge-ai-sustainability",
    category: "Technology",
    title: "Edge AI for Sustainability: Real-Time Environmental Intelligence Without the Cloud",
    excerpt:
      "Running sustainability AI on-device opens new possibilities for remote monitoring, offline operations, and privacy-preserving environmental data processing.",
    date: "Apr 24, 2026",
    readTime: "5 min read",
    accent: "text-info",
  },
];

const categories = ["All", "Carbon Intelligence", "ESG Automation", "Greenwash Detection", "Value Chain", "Technology", "Monetization"];

export default function BlogPage() {
  return (
    <div className="text-text-primary">
      {/* Hero */}
      <section className="border-b border-white/[0.04] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[9px] text-accent/70 uppercase tracking-[0.3em] font-light mb-4">
            Green Credit AI · Knowledge
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-text-primary max-w-2xl leading-[1.1] mb-5">
            Blog
          </h1>
          <p className="text-[13.5px] text-text-secondary font-extralight leading-relaxed max-w-xl">
            Sustainability intelligence, environmental insights, and the future of AI-powered climate action.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-white/[0.04] py-4 px-6 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`text-[11px] font-light tracking-wider uppercase whitespace-nowrap transition-colors ${
                i === 0 ? "text-text-primary" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Featured */}
        <div className="mb-12 pb-12 border-b border-white/[0.04]">
          <p className="text-[8px] text-text-muted/60 uppercase tracking-[0.3em] font-light mb-6">Featured</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <span className="text-[9px] text-accent/80 uppercase tracking-[0.25em] font-light">{posts[0].category}</span>
              <h2 className="text-2xl font-light text-text-primary tracking-tight leading-[1.2] mt-2 mb-4">
                {posts[0].title}
              </h2>
              <p className="text-[13px] text-text-secondary font-extralight leading-relaxed mb-5">
                {posts[0].excerpt}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-text-muted font-extralight">{posts[0].date}</span>
                <span className="text-[10px] text-text-muted/50">·</span>
                <span className="text-[10px] text-text-muted font-extralight">{posts[0].readTime}</span>
              </div>
              <Link
                href={`/learn/blog/${posts[0].slug}`}
                className="inline-flex items-center gap-1.5 text-[11.5px] text-accent/80 hover:text-accent font-light mt-5 transition-colors"
              >
                Read article <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="h-64 lg:h-full rounded border border-white/[0.04] bg-gradient-to-br from-accent/[0.04] to-transparent flex items-center justify-center">
              <span className="text-[9px] text-text-muted/40 uppercase tracking-widest font-light">Carbon Intelligence</span>
            </div>
          </div>
        </div>

        {/* All posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <article key={post.slug} className="group">
              <div className="h-40 rounded border border-white/[0.04] bg-[#0c0c0e] mb-5 group-hover:border-white/[0.08] transition-colors" />
              <span className={`text-[9px] uppercase tracking-[0.25em] font-light ${post.accent}`}>
                {post.category}
              </span>
              <h3 className="text-[15px] font-light text-text-primary leading-[1.3] mt-2 mb-3 group-hover:text-white transition-colors">
                {post.title}
              </h3>
              <p className="text-[12px] text-text-muted font-extralight leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px] text-text-muted/60 font-extralight">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <Link
                  href={`/learn/blog/${post.slug}`}
                  className="text-[11px] text-text-muted/60 hover:text-accent font-light transition-colors"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
