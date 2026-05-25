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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          Green Marketplace
          <ShoppingBag className="h-5 w-5 text-accent" />
        </h1>
        <p className="text-sm text-text-muted mt-1">Verified eco-friendly products with full carbon transparency</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 rounded-lg bg-surface border border-border-subtle pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all" />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="h-4 w-4 text-text-muted" />
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={cn("text-xs px-3 py-1.5 rounded-lg font-medium transition-all",
                category === cat ? "bg-accent/10 text-accent border border-accent/20" : "bg-surface border border-border-subtle text-text-muted hover:text-text-primary")}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((product, i) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border-subtle bg-surface overflow-hidden card-hover">
            <div className="h-40 bg-gradient-to-br from-surface-raised to-background flex items-center justify-center relative">
              <Leaf className="h-16 w-16 text-accent/20" />
              <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Verified
              </span>
            </div>
            <div className="p-4">
              <p className="text-xs text-text-muted">{product.brand}</p>
              <p className="text-sm font-semibold text-text-primary mt-0.5">{product.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent">{product.badge}</span>
                <span className="text-[10px] text-text-muted flex items-center gap-0.5">
                  <Star className="h-3 w-3 text-warning fill-warning" /> {product.rating}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-subtle">
                <span className="text-lg font-bold text-text-primary">₹{product.price}</span>
                <div className="text-right">
                  <p className="text-xs font-bold text-accent stat-number">{product.score}/100</p>
                  <p className="text-[10px] text-text-muted">{product.co2} kg CO₂</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
