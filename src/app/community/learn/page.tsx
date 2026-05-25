"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Play, Clock, Filter, Search, ExternalLink, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Carbon", "ESG", "Policy", "Lifestyle", "Technology"];

const content = [
  { id: 1, title: "What Are Scope 1, 2, and 3 Emissions?", type: "Article", category: "Carbon", readTime: "5 min", difficulty: "Beginner", icon: "📊", featured: true },
  { id: 2, title: "Understanding BRSR Reporting for Indian Companies", type: "Guide", category: "ESG", readTime: "12 min", difficulty: "Intermediate", icon: "📋", featured: true },
  { id: 3, title: "How AI Detects Greenwashing", type: "Video", category: "Technology", readTime: "8 min", difficulty: "Beginner", icon: "🤖", featured: false },
  { id: 4, title: "10 Ways to Reduce Your Carbon Footprint Today", type: "Article", category: "Lifestyle", readTime: "4 min", difficulty: "Beginner", icon: "🌱", featured: false },
  { id: 5, title: "EU CSRD vs India BRSR: A Comparison", type: "Guide", category: "Policy", readTime: "10 min", difficulty: "Advanced", icon: "⚖️", featured: false },
  { id: 6, title: "Carbon Credit Markets Explained", type: "Video", category: "Carbon", readTime: "15 min", difficulty: "Intermediate", icon: "💰", featured: false },
  { id: 7, title: "GHG Protocol: The Global Standard", type: "Article", category: "Carbon", readTime: "7 min", difficulty: "Intermediate", icon: "🌍", featured: false },
  { id: 8, title: "Sustainable Supply Chain Management", type: "Guide", category: "ESG", readTime: "9 min", difficulty: "Advanced", icon: "🔗", featured: false },
];

const typeColors: Record<string, string> = {
  Article: "bg-info/10 text-info",
  Guide: "bg-accent/10 text-accent",
  Video: "bg-purple-500/10 text-purple-400",
};

const diffColors: Record<string, string> = {
  Beginner: "text-accent",
  Intermediate: "text-warning",
  Advanced: "text-danger",
};

export default function LearnPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = content.filter((c) => {
    if (category !== "All" && c.category !== category) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">Learn <BookOpen className="h-5 w-5 text-accent" /></h1>
        <p className="text-sm text-text-muted mt-1">Curated sustainability knowledge — articles, guides, and videos</p>
      </div>

      {/* Featured */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.filter((c) => c.featured).map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-accent/20 bg-accent/5 p-6 card-hover cursor-pointer relative overflow-hidden">
            <div className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded bg-accent/20 text-accent flex items-center gap-1">
              <Star className="h-3 w-3" /> Featured
            </div>
            <span className="text-4xl block mb-3">{item.icon}</span>
            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded", typeColors[item.type])}>{item.type}</span>
            <h3 className="text-base font-semibold text-text-primary mt-2">{item.title}</h3>
            <div className="flex items-center gap-3 mt-2 text-[11px] text-text-muted">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{item.readTime}</span>
              <span className={cn("font-semibold", diffColors[item.difficulty])}>{item.difficulty}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input type="text" placeholder="Search topics..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 rounded-lg bg-surface border border-border-subtle pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all" />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={cn("text-xs px-3 py-1.5 rounded-lg font-medium transition-all",
                category === cat ? "bg-accent/10 text-accent border border-accent/20" : "bg-surface border border-border-subtle text-text-muted hover:text-text-primary")}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.filter(c => !c.featured).map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border-subtle bg-surface p-5 card-hover cursor-pointer">
            <div className="flex items-start justify-between">
              <span className="text-2xl">{item.icon}</span>
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded", typeColors[item.type])}>{item.type}</span>
            </div>
            <h4 className="text-sm font-semibold text-text-primary mt-3">{item.title}</h4>
            <div className="flex items-center gap-3 mt-2 text-[10px] text-text-muted">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{item.readTime}</span>
              <span className={cn("font-semibold", diffColors[item.difficulty])}>{item.difficulty}</span>
              <span>{item.category}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
