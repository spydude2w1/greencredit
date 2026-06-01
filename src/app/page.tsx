"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  ArrowRight, Building2, Users, BarChart3, ShieldAlert,
  FileText, Truck, Trophy, ShoppingBag, Bot,
  Calculator, Search, Database, Cpu, TrendingDown, Coins, Zap
} from "lucide-react";
import { Header } from "@/components/ui/header-3";
import ACTRMEngine from "@/components/landing/ACTRMEngine";
import Footer from "@/components/landing/Footer";
import { Marquee } from "@/components/magicui/marquee";
import Beams from "@/components/reactbits/Beams";
import BorderGlow from "@/components/ui/BorderGlow";
import SmoothScroll from "@/components/layout/SmoothScroll";

/* ─── Data ─── */

const actrmSteps = [
  { letter: "A", name: "Aggregate", icon: Database, desc: "Ingest supplier invoices, ESG documents, transport logs, and sustainability records from across your value chain." },
  { letter: "C", name: "Calculate", icon: Cpu, desc: "AI carbon engine analyzes Scope 1/2/3 emissions with lifecycle mapping and confidence scoring." },
  { letter: "T", name: "Track", icon: BarChart3, desc: "Real-time dashboards with ESG scores, compliance status, and emissions trend analytics." },
  { letter: "R", name: "Reduce", icon: TrendingDown, desc: "AI recommendations for low-emission alternatives, supplier switches, and reduction pathways." },
  { letter: "M", name: "Monetize", icon: Coins, desc: "Earn Green Credits, blockchain-backed verification, and sustainability trust scoring." },
];

const enterpriseFeatures = [
  { icon: FileText, label: "ESG Report Agent", desc: "Autonomous BRSR/GRI compliance" },
  { icon: BarChart3, label: "Carbon Analysis", desc: "Scope 1/2/3 lifecycle assessment" },
  { icon: Truck, label: "Supplier Intelligence", desc: "Vendor verification & risk scoring" },
  { icon: ShieldAlert, label: "Greenwash Detection", desc: "AI-powered claim verification" },
];

const communityFeatures = [
  { icon: Trophy, label: "Eco Challenges", desc: "Gamified sustainability missions" },
  { icon: ShoppingBag, label: "Green Marketplace", desc: "Verified eco-friendly products" },
  { icon: Users, label: "Community Hub", desc: "Local events & NGO partnerships" },
  { icon: Bot, label: "EcoBot AI", desc: "Personal sustainability assistant" },
];

const capabilities = [
  "Scope 3 Intelligence",
  "ESG Automation",
  "Greenwashing Detection",
  "AI Sustainability Agents",
  "Edge AI",
  "BRSR Compliance",
  "Carbon Analytics",
  "Value Chain Mapping",
];

/* ─── Animations ─── */
//
// ROOT CAUSE FIX — Content disappearing after tab switch:
// `whileInView` + `viewport: { once: true }` registers an IntersectionObserver that fires
// exactly once, animates elements to opacity:1, then *permanently removes itself*.
// When the user switches tabs, the browser compositor may reset painted styles.
// On tab return, there is no live observer to re-fire the animation, so elements remain
// permanently stuck at their initial state (opacity:0, y:16) — appearing blank.
//
// Fix: Use unconditional `animate` props instead. Since this is a "use client" component
// that has fully hydrated, `animate` fires immediately on mount and stays permanently
// applied — survives any tab-switch, window blur, or visibility-state change.

const fadeUp: any = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const stagger: any = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

/* ─── Visibility Recovery Hook ─── */
// Secondary safety net for edge cases in Safari / older Chromium where the compositor
// resets element styles on tab restore even with unconditional `animate` props.
function useVisibilityRecovery(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const recover = () => {
      if (document.visibilityState === "visible" && containerRef.current) {
        // Toggle willChange to force a compositor layer repaint without layout shift.
        const el = containerRef.current;
        el.style.willChange = "opacity";
        requestAnimationFrame(() => {
          if (el) el.style.willChange = "auto";
        });
      }
    };
    document.addEventListener("visibilitychange", recover);
    window.addEventListener("focus", recover);
    return () => {
      document.removeEventListener("visibilitychange", recover);
      window.removeEventListener("focus", recover);
    };
  }, [containerRef]);
}

/* ─── Page ─── */

export default function LandingPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  useVisibilityRecovery(pageRef);

  return (
    <SmoothScroll>
      <div ref={pageRef} className="min-h-screen bg-background relative font-sans text-text-primary antialiased">
        <Header />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <Beams
            beamWidth={2.5}
            beamHeight={16}
            beamNumber={14}
            lightColor="#4ade80"
            speed={1.0}
            noiseIntensity={1.4}
            scale={0.2}
            rotation={12}
          />
        </div>
        <div className="absolute inset-0 grid-topology opacity-40 z-1" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-radial-[at_70%_30%] from-accent/[0.05] to-transparent z-1" />
        <div className="absolute inset-0 scan-overlay pointer-events-none z-1" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-36 pb-24">
          <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-24">
            
            {/* Left — Messaging */}
            <div className="flex-1 max-w-2xl">
              {/* Pre-headline */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 mb-4"
              >
                <span className="pulse-dot" />
                <span className="text-[9.5px] font-normal text-accent uppercase tracking-[0.25em] opacity-90">
                  ACTRM Sustainability OS
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight mb-6"
              >
                <span className="text-gradient-operational">From Scope 3 Blindness</span>
                <br />
                <span className="text-gradient-green font-semibold">to AI Sustainability Intelligence</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-[13.5px] sm:text-[14.5px] text-text-secondary font-light leading-relaxed max-w-xl mb-8 opacity-80"
              >
                Aggregate, Calculate, Track, Reduce, and Monetize environmental impact 
                using autonomous, enterprise-grade sustainability intelligence systems.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-4.5 py-2 rounded gradient-green text-white text-[11.5px] font-normal tracking-wide hover:opacity-95 transition-opacity"
                >
                  Launch Platform <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href="#actrm"
                  className="inline-flex items-center gap-2 px-4.5 py-2 rounded border border-white/[0.04] bg-white/[0.02] text-text-secondary text-[11.5px] font-normal tracking-wide hover:text-text-primary hover:bg-white/[0.04] transition-colors"
                >
                  Explore ACTRM Engine
                </a>
              </motion.div>

              {/* Capability Strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[11px] text-text-muted tracking-widest uppercase font-light"
              >
                {["Scope 3 Intelligence", "ESG Automation", "Greenwash Detection", "AI Agents", "Edge AI"].map(
                  (cap, i, arr) => (
                    <span key={cap} className="flex items-center gap-2.5">
                      {cap}
                      {i < arr.length - 1 && <span className="pulse-dot !w-[3px] !h-[3px] !animation-none opacity-20" />}
                    </span>
                  )
                )}
              </motion.div>
            </div>

            {/* Right — ACTRM Engine */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="w-full lg:w-auto shrink-0 z-10"
            >
              <ACTRMEngine />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Glow divider */}
      <div className="glow-line-h w-full opacity-60" />

      {/* ═══ ACTRM BREAKDOWN ═══ */}
      <section id="actrm" className="py-24 relative bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[10px] font-normal text-accent uppercase tracking-[0.25em] mb-4">
              The Framework
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-text-primary tracking-tight">
              ACTRM Sustainability Intelligence
            </h2>
            <p className="text-text-secondary mt-4 max-w-lg mx-auto text-[13px] font-light leading-relaxed opacity-95">
              Five operational stages that transform raw environmental data into verified, monetizable sustainability outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {actrmSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.letter}
                  {...stagger}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="card-operational p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="h-7 w-7 rounded bg-accent/5 border border-accent/15 flex items-center justify-center text-[10px] font-medium text-accent">
                        {step.letter}
                      </span>
                      <span className="text-[13px] font-medium text-text-primary tracking-tight">{step.name}</span>
                    </div>
                    <p className="text-[11.5px] text-text-secondary leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/[0.02] flex items-center gap-1.5">
                    <Icon className="h-3 w-3 text-accent/50" />
                    <span className="text-[9px] text-text-muted font-mono tracking-wider">stage {i + 1}/5</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="glow-line-h w-full opacity-60" />

      {/* ═══ TWO PLATFORMS ═══ */}
      <section id="platforms" className="py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-text-primary tracking-tight">
              Two Platforms, One Mission
            </h2>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto text-[13px] font-light leading-relaxed opacity-95">
              Enterprise-grade sustainability intelligence and community-driven environmental engagement — designed for different users, united by impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enterprise */}
            <motion.div {...stagger} transition={{ duration: 0.5 }}>
              <BorderGlow
                className="h-full w-full"
                edgeSensitivity={30}
                glowColor="142 76 36"
                backgroundColor="rgba(24, 24, 27, 0.5)"
                borderRadius={12}
                glowRadius={30}
                glowIntensity={0.8}
                coneSpread={20}
                colors={['#10b981', '#34d399', '#059669']}
              >
                <div className="p-8 relative overflow-hidden flex flex-col justify-between h-full">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-radial-[at_100%_0%] from-accent/[0.04] to-transparent pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-9 w-9 rounded bg-accent/5 border border-accent/15 flex items-center justify-center">
                        <Building2 className="h-4.5 w-4.5 text-accent opacity-90" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-text-primary tracking-tight">Enterprise Platform</h3>
                        <p className="text-[8px] text-accent/80 font-normal uppercase tracking-wider mt-0.5">B2B Intelligence</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-text-secondary font-light leading-relaxed mb-6">
                      For companies, schools, suppliers, and organizations. Automate ESG reporting, analyze Scope 3 emissions, detect greenwashing, and manage supply chain sustainability.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {enterpriseFeatures.map((f) => (
                        <div key={f.label} className="flex items-start gap-2.5 p-3.5 rounded bg-[#0c0c0e] border border-white/[0.03]">
                          <f.icon className="h-3.5 w-3.5 text-accent/70 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[11px] font-medium text-text-primary tracking-tight">{f.label}</p>
                            <p className="text-[9px] text-text-muted font-light mt-0.5 leading-normal">{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link href="/login" className="inline-flex items-center gap-1 text-[12px] font-normal text-accent hover:underline tracking-wide">
                      Enter Enterprise <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>

            {/* Community */}
            <motion.div {...stagger} transition={{ duration: 0.5, delay: 0.1 }}>
              <BorderGlow
                className="h-full w-full"
                edgeSensitivity={30}
                glowColor="187 80 40"
                backgroundColor="rgba(24, 24, 27, 0.5)"
                borderRadius={12}
                glowRadius={30}
                glowIntensity={0.8}
                coneSpread={20}
                colors={['#06b6d4', '#22d3ee', '#0891b2']}
              >
                <div className="p-8 relative overflow-hidden flex flex-col justify-between h-full">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-radial-[at_100%_0%] from-cyan-500/[0.04] to-transparent pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-9 w-9 rounded bg-cyan-500/5 border border-cyan-500/15 flex items-center justify-center">
                        <Users className="h-4.5 w-4.5 text-cyan-400 opacity-90" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-text-primary tracking-tight">Community Platform</h3>
                        <p className="text-[8px] text-cyan-400 font-normal uppercase tracking-wider mt-0.5">B2C Engagement</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-text-secondary font-light leading-relaxed mb-6">
                      For individuals, students, and eco-enthusiasts. Track your carbon footprint, earn green credits, join challenges, shop verified eco products, and learn about sustainability.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {communityFeatures.map((f) => (
                        <div key={f.label} className="flex items-start gap-2.5 p-3.5 rounded bg-[#0c0c0e] border border-white/[0.03]">
                          <f.icon className="h-3.5 w-3.5 text-cyan-400/80 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[11px] font-medium text-text-primary tracking-tight">{f.label}</p>
                            <p className="text-[9px] text-text-muted font-light mt-0.5 leading-normal">{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link href="/login" className="inline-flex items-center gap-1 text-[12px] font-normal text-cyan-400 hover:underline tracking-wide">
                      Enter Community <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="glow-line-h w-full opacity-60" />

      {/* ═══ PUBLIC TOOLS ═══ */}
      <section id="tools" className="py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-text-primary tracking-tight">
              Public Intelligence Tools
            </h2>
            <p className="text-text-secondary mt-4 max-w-lg mx-auto text-[13px] font-light leading-relaxed opacity-95">
              Open access tools to promote transparency and awareness. Sign up to unlock full AI-powered features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Carbon Analyzer */}
            <motion.div {...stagger} transition={{ duration: 0.4 }} className="card-operational p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="h-9 w-9 rounded bg-accent/5 border border-accent/15 flex items-center justify-center">
                    <Calculator className="h-4.5 w-4.5 text-accent opacity-90" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-medium text-text-primary tracking-tight">Carbon Footprint Analyzer</h3>
                    <span className="text-[7px] font-normal px-2 py-0.5 rounded bg-accent/5 text-accent/80 border border-accent/10 uppercase tracking-widest inline-block mt-0.5">Public</span>
                  </div>
                </div>
                <p className="text-[13px] text-text-secondary font-light leading-relaxed mb-6">
                  Calculate your carbon footprint across travel, energy, waste, lifestyle and more. Get AI-powered reduction recommendations.
                </p>
              </div>
              <Link href="/tools/carbon-calculator" className="inline-flex items-center gap-2 px-4 py-2 rounded border border-white/[0.04] bg-white/[0.02] text-text-secondary text-[11.5px] font-normal tracking-wide hover:text-text-primary hover:bg-white/[0.04] transition-colors w-fit">
                Analyze Now <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>

            {/* Greenwash Detector */}
            <motion.div {...stagger} transition={{ duration: 0.4, delay: 0.08 }} className="card-operational p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="h-9 w-9 rounded bg-danger/5 border border-danger/15 flex items-center justify-center">
                    <Search className="h-4.5 w-4.5 text-danger opacity-90" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-medium text-text-primary tracking-tight">Greenwash Detector</h3>
                    <span className="text-[7px] font-normal px-2 py-0.5 rounded bg-danger/5 text-danger/80 border border-danger/10 uppercase tracking-widest inline-block mt-0.5">Public</span>
                  </div>
                </div>
                <p className="text-[13px] text-text-secondary font-light leading-relaxed mb-6">
                  Check if a product, brand, or claim is truly green or just greenwashing. AI-powered verification against global standards.
                </p>
              </div>
              <Link href="/tools/greenwash-detector" className="inline-flex items-center gap-2 px-4 py-2 rounded border border-white/[0.04] bg-white/[0.02] text-text-secondary text-[11.5px] font-normal tracking-wide hover:text-text-primary hover:bg-white/[0.04] transition-colors w-fit">
                Check Now <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="glow-line-h w-full opacity-60" />

      {/* ═══ CAPABILITY MARQUEE ═══ */}
      <section className="py-16 overflow-hidden bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
          <p className="text-[9px] font-normal text-text-muted uppercase tracking-[0.25em] font-light">Infrastructure Capabilities</p>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:25s]">
            {capabilities.map((cap) => (
              <div key={cap} className="mx-4 flex items-center gap-2 px-3.5 py-1.5 card-operational !rounded">
                <Zap className="h-3 w-3 text-accent/50" />
                <span className="text-[11.5px] font-normal text-text-secondary tracking-wide">{cap}</span>
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
    </SmoothScroll>
  );
}
