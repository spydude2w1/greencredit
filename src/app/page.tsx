"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Leaf, ArrowRight, Building2, Users, BarChart3, ShieldAlert,
  FileText, Truck, Trophy, ShoppingBag, Bot, Sparkles,
  Calculator, Search, Shield, Eye, Zap, Lock,
  Globe, Brain, Fingerprint, Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import LiquidEther from "@/components/reactbits/LiquidEther";
import BorderGlow from "@/components/reactbits/BorderGlow";
import PillNav from "@/components/reactbits/PillNav";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Marquee } from "@/components/magicui/marquee";
import { ShinyText } from "@/components/reactbits/shiny-text";
import { WordFadeIn } from "@/components/reactbits/word-fade-in";

const enterpriseFeatures = [
  { icon: FileText, label: "ESG Report Agent", desc: "Autonomous AI agent for BRSR/GRI compliance" },
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

const trustBadges = [
  { icon: Globe, label: "100% Free", desc: "For everyone" },
  { icon: Brain, label: "AI-Powered", desc: "Smart & reliable" },
  { icon: Eye, label: "Transparent", desc: "Data you can trust" },
  { icon: Fingerprint, label: "Privacy First", desc: "Your data stays yours" },
  { icon: Heart, label: "Impact Driven", desc: "For a sustainable future" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── Navbar ─── */}
      <PillNav
        logo={<Leaf className="h-5 w-5 text-accent" />}
        logoAlt="Green Credit AI Logo"
        items={[
          { label: 'Platforms', href: '#platforms' },
          { label: 'Public Tools', href: '#tools' },
          { label: 'About', href: '#about' }
        ]}
        activeHref="#platforms"
        baseColor="#22c55e"
        pillColor="#18181b"
        hoveredPillTextColor="#18181b"
        pillTextColor="#fafafa"
      />

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[80vh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0">
          <LiquidEther 
            colors={['#22c55e', '#16a34a', '#4ade80']} 
            mouseForce={30} 
            cursorSize={150} 
            autoSpeed={0.3} 
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left"
          >
            <div className="flex-1">
              <div className="text-left">
                <div className="inline-block">
                  <WordFadeIn words="Sustainability Intelligence" className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.1] tracking-tight m-0 inline" />
                </div>
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight m-0 ml-3 inline-block">
                  <ShinyText text="Powered by AI" shimmerWidth={200} className="text-accent inline-block" />
                </span>
              </div>
              <p className="mt-8 text-lg text-text-secondary max-w-2xl leading-relaxed mx-auto md:mx-0">
                Enterprise ESG compliance, carbon analytics, and greenwashing detection — combined with
                community-driven sustainability engagement. One platform, two experiences.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 shrink-0 mt-10 md:mt-0 min-w-[240px]">
              <Link href="/login" className="w-full">
                <ShimmerButton className="shadow-2xl h-[56px] px-8 w-full" shimmerColor="#4ade80" background="linear-gradient(135deg, #22c55e 0%, #15803d 100%)">
                  <span className="flex items-center justify-center gap-2 text-base font-semibold text-white w-full">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </span>
                </ShimmerButton>
              </Link>
              <a href="#platforms" className="w-full text-center px-8 py-4 rounded-xl border border-border-subtle bg-surface text-text-primary font-semibold hover:bg-surface-raised transition-colors text-base">
                Explore Platforms
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Two Platforms Section ─── */}
      <section id="platforms" className="py-20 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Two Platforms, One Mission
            </h2>
            <p className="text-text-secondary mt-3 max-w-xl mx-auto">
              Enterprise-grade sustainability intelligence and community-driven environmental engagement — designed for different users, united by impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enterprise Card */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="h-full">
              <BorderGlow
                className="rounded-2xl bg-surface p-8 card-hover h-full w-full"
                backgroundColor="#09090b"
                glowColor="142 76 36" // green color roughly matching #22c55e
                colors={['#22c55e', '#3b82f6', '#4ade80']}
                animated={true}
              >
                <div className="absolute top-0 right-0 w-40 h-40 gradient-radial-green opacity-40 pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl gradient-green flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">Enterprise Platform</h3>
                      <p className="text-xs text-accent font-semibold">B2B Intelligence</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary mb-6">
                    For companies, schools, suppliers, and organizations. Automate ESG reporting, analyze Scope 3 emissions, detect greenwashing, and manage supply chain sustainability.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {enterpriseFeatures.map((f) => (
                      <div key={f.label} className="flex items-start gap-2.5 p-3 rounded-lg bg-background border border-border-subtle">
                        <f.icon className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-text-primary">{f.label}</p>
                          <p className="text-[10px] text-text-muted mt-0.5">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/login" className="flex items-center gap-2 text-sm font-semibold text-accent hover:underline mt-auto pt-2">
                    Enter Enterprise <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </BorderGlow>
            </motion.div>

            {/* Community Card */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="h-full">
              <BorderGlow
                className="rounded-2xl bg-surface p-8 card-hover h-full w-full"
                backgroundColor="#09090b"
                glowColor="188 95 35" // cyan color roughly matching #06b6d4
                colors={['#06b6d4', '#22c55e', '#67e8f9']}
                animated={true}
              >
                <div className="absolute top-0 right-0 w-40 h-40 gradient-radial-green opacity-40 pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-cyan-500 flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">Community Platform</h3>
                      <p className="text-xs text-cyan-400 font-semibold">B2C Engagement</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary mb-6">
                    For individuals, students, and eco-enthusiasts. Track your carbon footprint, earn green credits, join challenges, shop verified eco products, and learn about sustainability.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {communityFeatures.map((f) => (
                      <div key={f.label} className="flex items-start gap-2.5 p-3 rounded-lg bg-background border border-border-subtle">
                        <f.icon className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-text-primary">{f.label}</p>
                          <p className="text-[10px] text-text-muted mt-0.5">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/login" className="flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:underline mt-auto pt-2">
                    Enter Community <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </BorderGlow>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Public Tools ─── */}
      <section id="tools" className="py-20 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Public Tools — Available for Everyone
            </h2>
            <p className="text-text-secondary mt-3 max-w-lg mx-auto">
              Open access tools to promote transparency and awareness. Sign up to unlock full AI-powered features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Carbon Footprint Analyzer */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-border-subtle bg-surface p-8 relative overflow-hidden group card-hover">
              <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-11 w-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Carbon Footprint Analyzer</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">Public Tool</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-5">
                  Calculate your carbon footprint across travel, energy, waste, lifestyle and more. Get AI-powered reduction recommendations.
                </p>
                <Link href="/tools/carbon-calculator" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-green text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                  Analyze Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Greenwash Detector */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border-subtle bg-surface p-8 relative overflow-hidden group card-hover">
              <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-danger/5 group-hover:bg-danger/10 transition-colors" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-11 w-11 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center">
                    <Search className="h-5 w-5 text-danger" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Greenwash Detector</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-danger/10 text-danger border border-danger/20">Public Tool</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-5">
                  Check if a product, brand, or claim is truly green or just greenwashing. AI-powered verification against global standards.
                </p>
                <Link href="/tools/greenwash-detector" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-danger text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                  Check Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Trust Badges ─── */}
      <section id="about" className="py-16 border-t border-border-subtle overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Trusted Architecture</p>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="mx-6 flex flex-col items-center justify-center gap-2 text-center w-32 group">
                <div className="h-14 w-14 rounded-full bg-surface border border-border-subtle flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/5 transition-all">
                  <badge.icon className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-sm font-semibold text-text-primary whitespace-nowrap">{badge.label}</p>
                <p className="text-[11px] text-text-muted whitespace-nowrap">{badge.desc}</p>
              </div>
            ))}
            {/* Repeat for seamless loop */}
            {trustBadges.map((badge) => (
              <div key={`${badge.label}-dup`} className="mx-6 flex flex-col items-center justify-center gap-2 text-center w-32 group">
                <div className="h-14 w-14 rounded-full bg-surface border border-border-subtle flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/5 transition-all">
                  <badge.icon className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-sm font-semibold text-text-primary whitespace-nowrap">{badge.label}</p>
                <p className="text-[11px] text-text-muted whitespace-nowrap">{badge.desc}</p>
              </div>
            ))}
          </Marquee>
          
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background dark:from-background"></div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-accent" />
            <span className="text-sm text-text-muted">Green Credit AI</span>
          </div>
          <p className="text-xs text-text-muted">CBSE Skill Expo 2026-27 • AI-Powered Sustainability</p>
        </div>
      </footer>
    </div>
  );
}
