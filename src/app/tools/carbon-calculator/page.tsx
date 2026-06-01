"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, Lock, Car, Utensils, Zap, ShoppingBag, Plane, ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

const categories = [
  { id: "transport", label: "Transport", icon: Car },
  { id: "food", label: "Food & Diet", icon: Utensils },
  { id: "energy", label: "Home Energy", icon: Zap },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "travel", label: "Travel", icon: Plane },
];

export default function PublicCarbonCalculator() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo size={20} className="opacity-90" />
            <span className="text-sm font-bold text-text-primary">Green Credit AI</span>
          </Link>
          <Link href="/login" className="px-4 py-1.5 rounded-lg gradient-green text-white text-xs font-semibold hover:opacity-90">
            Sign In
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-4">
            <Calculator className="h-3.5 w-3.5" /> Public Tool
          </div>
          <h1 className="text-3xl font-bold text-text-primary">Carbon Footprint Analyzer</h1>
          <p className="text-sm text-text-muted mt-2 max-w-md mx-auto">Calculate your carbon footprint across travel, energy, waste, and lifestyle</p>
        </div>

        {/* Login Gate Overlay */}
        <div className="relative">
          {/* Blurred Preview */}
          <div className="filter blur-[2px] pointer-events-none select-none opacity-60">
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 text-center mb-6">
              <p className="text-xs text-text-muted uppercase">Estimated Weekly Footprint</p>
              <p className="text-5xl font-bold text-accent stat-number mt-2">0.0</p>
              <p className="text-sm text-text-muted mt-1">kg CO₂e / week</p>
            </div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border-subtle text-sm text-text-muted">
                  <cat.icon className="h-4 w-4" /> {cat.label}
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-border-subtle bg-surface p-5">
              <p className="text-sm font-semibold text-text-primary mb-3">Daily commute method?</p>
              <div className="grid grid-cols-3 gap-2">
                {["Car (petrol)", "Bus / Metro", "Bicycle / Walk"].map((opt) => (
                  <div key={opt} className="p-3 rounded-lg border border-border-subtle text-xs text-text-muted">{opt}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Lock Overlay */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl border border-border-subtle bg-surface/95 backdrop-blur-xl p-10 text-center max-w-sm shadow-2xl">
              <div className="h-14 w-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">Sign in to use this tool</h3>
              <p className="text-xs text-text-muted mt-2">Create a free account to calculate your carbon footprint with AI-powered analysis and personalized reduction strategies.</p>
              <Link href="/login" className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-green text-white text-sm font-semibold hover:opacity-90 glow-green">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
