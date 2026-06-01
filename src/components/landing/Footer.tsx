"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";

/* ─── Data ─── */

const platformLinks = [
  { label: "Enterprise Dashboard", href: "/enterprise" },
  { label: "Community Dashboard", href: "/community" },
  { label: "EcoBot AI", href: "/community/ecobot" },
  { label: "Carbon Analysis", href: "/tools/carbon-calculator" },
  { label: "ESG Automation", href: "/enterprise/compliance" },
  { label: "Green Marketplace", href: "/community/marketplace" },
];

const learnLinks = [
  { label: "Blog", href: "/learn/blog" },
  { label: "Guides", href: "/learn/guides" },
  { label: "Insights", href: "/learn/insights" },
  { label: "Case Studies", href: "/learn/case-studies" },
  { label: "Sustainability 101", href: "/learn/sustainability-101" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms & Conditions", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
  { label: "Data Protection", href: "/legal/data-protection" },
];

const connectLinks = [
  { label: "hello@greencredit.live", href: "mailto:hello@greencredit.live", external: false },
  // Social profiles — update URLs when official accounts are created
  { label: "LinkedIn", href: "https://linkedin.com", external: true },
  { label: "GitHub", href: "https://github.com", external: true },
  { label: "Instagram", href: "https://instagram.com", external: true },
];

/* ─── Footer ─── */

export default function Footer() {
  return (
    <footer className="relative bg-[#060608] border-t border-white/[0.04]">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      {/* ─── Main Grid ─── */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-14 gap-x-8">
          
          {/* Column 1 — Brand */}
          <div className="lg:col-span-1 md:col-span-2 lg:pr-4">
            <div className="flex items-center gap-2.5 mb-5">
              <BrandLogo size={26} className="opacity-90" />
              <h3 className="text-[10px] font-light text-text-primary uppercase tracking-[0.25em]">
                Green Credit AI
              </h3>
            </div>
            <p className="text-[12.5px] text-text-secondary font-extralight leading-[1.7] mb-5">
              AI Sustainability Operating System
            </p>
            <p className="text-[11px] text-text-muted font-extralight leading-[1.8] mb-6">
              Measure, verify, automate, and optimize environmental impact across the value chain.
            </p>

            {/* ACTRM Framework */}
            <div className="border-t border-white/[0.04] pt-5">
              <p className="text-[8px] text-accent/70 font-light uppercase tracking-[0.3em] mb-2.5">
                ACTRM Framework
              </p>
              <p className="text-[10px] text-text-muted font-extralight tracking-wider leading-relaxed">
                Aggregate&ensp;·&ensp;Calculate&ensp;·&ensp;Track&ensp;·&ensp;Reduce&ensp;·&ensp;Monetize
              </p>
            </div>

            {/* Location */}
            <p className="text-[9.5px] text-text-muted/60 font-extralight tracking-wider mt-6">
              Bengaluru, India
            </p>
          </div>

          {/* Column 2 — Platform */}
          <div>
            <h3 className="text-[10px] font-light text-text-primary uppercase tracking-[0.25em] mb-5">
              Platform
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Platform links">
              {platformLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11.5px] text-text-muted font-extralight tracking-wide hover:text-text-secondary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Learn */}
          <div>
            <h3 className="text-[10px] font-light text-text-primary uppercase tracking-[0.25em] mb-5">
              Learn
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Learn links">
              {learnLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11.5px] text-text-muted font-extralight tracking-wide hover:text-text-secondary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4 — Legal */}
          <div>
            <h3 className="text-[10px] font-light text-text-primary uppercase tracking-[0.25em] mb-5">
              Legal
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Legal links">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11.5px] text-text-muted font-extralight tracking-wide hover:text-text-secondary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 5 — Connect */}
          <div>
            <h3 className="text-[10px] font-light text-text-primary uppercase tracking-[0.25em] mb-5">
              Connect
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Connect links">
              {connectLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-[11.5px] text-text-muted font-extralight tracking-wide hover:text-text-secondary transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
          {/* Left */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
            <span className="text-[10px] text-text-muted/50 font-extralight tracking-wider">
              © 2026 Green Credit AI
            </span>
            <span className="hidden sm:inline text-[10px] text-white/[0.08]">·</span>
            <span className="text-[10px] text-text-muted/40 font-extralight tracking-wider">
              All Rights Reserved
            </span>
          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
            <span className="text-[10px] text-text-muted/40 font-extralight tracking-wider">
              Built with <span className="text-accent/40">❤</span> in Bengaluru
            </span>
            <span className="hidden sm:inline text-[10px] text-white/[0.08]">·</span>
            <span className="text-[10px] text-text-muted/40 font-extralight tracking-wider">
              AI Sustainability Intelligence Platform
            </span>
          </div>
        </div>
      </div>

      {/* ─── Brand Typography ─── */}
      <div className="relative overflow-hidden pb-8 pt-4">
        {/* Subtle fade from top */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-transparent to-[#060608] pointer-events-none z-10 opacity-30" />
        
        <div className="max-w-[96vw] mx-auto text-center select-none pointer-events-none" aria-hidden="true">
          <p
            className="text-[clamp(4rem,13vw,14rem)] leading-[0.85] tracking-[-0.04em] opacity-[0.04]"
            style={{ fontWeight: 450 }}
          >
            <span className="text-white">Green </span>
            <span className="text-accent">Credit</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
