"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

const navItems = [
  { label: "Platforms", href: "#platforms" },
  { label: "ACTRM", href: "#actrm" },
  { label: "Tools", href: "#tools" },
];

export default function GlassNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-2rem)] max-w-5xl font-sans"
    >
      <div className="glass-tactical rounded-[10px] px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <BrandLogo size={24} className="opacity-90" />
          <span className="text-[12px] font-medium text-text-primary hidden sm:block tracking-tight">
            Green Credit AI
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-3.5 py-1.5 text-[11px] font-normal text-text-secondary hover:text-text-primary transition-colors rounded hover:bg-white/[0.03] tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-3.5 py-1.5 rounded text-[11px] font-normal text-background bg-accent hover:bg-accent/90 transition-colors tracking-wide"
          >
            Launch Platform
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden h-7 w-7 rounded flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-white/[0.03] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.15 }}
            className="glass-tactical rounded-[10px] mt-1.5 p-1.5"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3.5 py-2.5 text-[12px] font-normal text-text-secondary hover:text-text-primary hover:bg-white/[0.03] rounded transition-colors tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
