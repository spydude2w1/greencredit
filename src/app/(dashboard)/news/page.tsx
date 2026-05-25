"use client";

import { motion } from "framer-motion";
import { Newspaper, ExternalLink, Clock } from "lucide-react";

const articles = [
  { id: 1, title: "India Mandates BRSR Reporting for Top 1000 Companies", summary: "SEBI's new guidelines require comprehensive sustainability disclosures including Scope 3 emissions for India's largest listed companies starting FY 2025-26.", source: "Economic Times", category: "Policy", date: "2025-03-15", readTime: "4 min" },
  { id: 2, title: "EU CSRD: Scope 3 Mandatory by 2030", summary: "The European Corporate Sustainability Reporting Directive will require all large companies to report Scope 3 emissions, affecting Indian exporters.", source: "Reuters", category: "Policy", date: "2025-03-12", readTime: "5 min" },
  { id: 3, title: "AI-Powered Carbon Tracking Sees 300% Growth in Adoption", summary: "Climate-tech startups using AI for carbon measurement report massive growth as companies scramble to meet reporting deadlines.", source: "TechCrunch", category: "Technology", date: "2025-03-10", readTime: "3 min" },
  { id: 4, title: "Global Greenwashing Fines Reach $2.3 Billion in 2024", summary: "Regulators worldwide crack down on misleading sustainability claims, with record fines imposed on major consumer brands.", source: "Financial Times", category: "Research", date: "2025-03-08", readTime: "6 min" },
  { id: 5, title: "India's Carbon Credit Market Expected to Reach ₹75,000 Crore by 2030", summary: "The voluntary carbon market in India is projected to grow 10x, driven by corporate net-zero commitments.", source: "LiveMint", category: "Research", date: "2025-03-05", readTime: "4 min" },
  { id: 6, title: "Schools Lead Sustainability Innovation at National Level", summary: "Student-built AI platforms for carbon tracking gain recognition at national innovation competitions, demonstrating practical ESG solutions.", source: "The Hindu", category: "Community", date: "2025-03-01", readTime: "3 min" },
];

const categoryColors: Record<string, string> = {
  Policy: "bg-info/10 text-info",
  Technology: "bg-accent/10 text-accent",
  Research: "bg-purple-500/10 text-purple-400",
  Community: "bg-warning/10 text-warning",
};

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">Eco News <Newspaper className="h-5 w-5 text-info" /></h1>
        <p className="text-sm text-text-muted mt-1">Latest sustainability and climate-tech news</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {articles.map((article, i) => (
          <motion.div key={article.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border-subtle bg-surface p-5 card-hover cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${categoryColors[article.category]}`}>{article.category}</span>
              <span className="text-[10px] text-text-muted flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
            </div>
            <h3 className="text-sm font-semibold text-text-primary">{article.title}</h3>
            <p className="text-xs text-text-muted mt-1.5 line-clamp-2">{article.summary}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-subtle">
              <span className="text-[10px] text-text-muted">{article.source} · {article.date}</span>
              <ExternalLink className="h-3.5 w-3.5 text-text-muted" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
