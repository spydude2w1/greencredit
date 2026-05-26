"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Search, Filter, Leaf, Star, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Office", "Energy", "Food", "Personal Care", "Cleaning", "Packaging"];

const products = [
  { id: 1, name: "Bamboo Notebook Set", brand: "EcoWrite", price: 349, score: 94, co2: 0.8, category: "Office", badge: "Carbon Neutral", rating: 4.8 },
  { id: 2, name: "Solar USB Charger", brand: "SunPower India", price: 1299, score: 91, co2: 2.1, category: "Energy", badge: "Plastic Free", rating: 4.6 },
  { id: 3, name: "Organic Cotton Tote Bag", brand: "GreenThread", price: 199, score: 96, co2: 0.3, category: "Personal Care", badge: "Biodegradable", rating: 4.9 },
  { id: 4, name: "Recycled Paper Ream (500)", brand: "EcoSupply India", price: 449, score: 88, co2: 1.5, category: "Office", badge: "FSC Certified", rating: 4.5 },
  { id: 5, name: "Natural Cleaning Kit", brand: "PureClean", price: 599, score: 92, co2: 0.6, category: "Cleaning", badge: "Non-Toxic", rating: 4.7 },
  { id: 6, name: "Beeswax Food Wraps", brand: "WrapNatural", price: 249, score: 95, co2: 0.2, category: "Food", badge: "Zero Waste", rating: 4.8 },
  { id: 7, name: "Compostable Trash Bags (50)", brand: "BioWaste Solutions", price: 199, score: 89, co2: 0.4, category: "Packaging", badge: "Compostable", rating: 4.4 },
  { id: 8, name: "Stainless Steel Water Bottle", brand: "HydroGreen", price: 799, score: 93, co2: 3.2, category: "Personal Care", badge: "Lifetime Warranty", rating: 4.9 },
];

export default function MarketplacePage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8 font-sans text-text-primary antialiased">
      {/* Header */}
      <div className="pb-2 border-b border-white/[0.02]">
        <h1 className="text-xl font-light text-text-primary flex items-center gap-2 tracking-tight">
          Eco Marketplace
          <ShoppingBag className="h-4.5 w-4.5 text-accent" />
        </h1>
        <p className="text-[12px] text-text-muted font-light mt-1.5 leading-relaxed">
          Verified carbon-neutral products with direct environmental verification.
        </p>
      </div>

      {/* Filters & Action Bar */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted opacity-80" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-8.5 rounded bg-[#09090b] border border-white/[0.06] pl-9 pr-4 text-[12px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/30 transition-colors font-light"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-3.5 w-3.5 text-text-muted mr-1 opacity-70" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "text-[10px] px-3 py-1 rounded transition-colors uppercase tracking-wider",
                category === cat
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-white/[0.02] border border-white/[0.04] text-text-muted hover:text-text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
            className="rounded border border-white/[0.03] bg-[#0c0c0e]/80 overflow-hidden hover:border-white/[0.08] transition-colors"
          >
            <div className="h-36 bg-[#09090b] flex items-center justify-center relative border-b border-white/[0.02]">
              <Leaf className="h-12 w-12 text-accent/10" />
              <span className="absolute top-3 left-3 text-[8.5px] font-normal px-2 py-0.5 rounded border border-accent/15 bg-accent/5 text-accent uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 shrink-0" /> Verified
              </span>
            </div>
            <div className="p-4">
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-light">{product.brand}</p>
              <p className="text-[13px] font-normal text-text-primary tracking-tight mt-1 leading-snug">{product.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[9px] font-normal px-2 py-0.5 rounded border border-accent/10 bg-accent/5 text-accent uppercase tracking-wider">{product.badge}</span>
                <span className="text-[9px] text-text-muted flex items-center gap-0.5 ml-auto uppercase font-light tracking-wide">
                  <Star className="h-3 w-3 text-warning fill-warning opacity-80" /> {product.rating}
                </span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-white/[0.02]">
                <span className="text-[15px] font-light text-text-primary font-mono tracking-tight">₹{product.price}</span>
                <div className="text-right">
                  <p className="text-[12px] font-light font-mono text-accent">{product.score}/100</p>
                  <p className="text-[9px] text-text-muted font-light mt-0.5">{product.co2} kg CO₂e</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
