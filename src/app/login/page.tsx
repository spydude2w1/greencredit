"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Leaf, Building2, Users, ArrowRight, Sparkles, Shield, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "community" | "enterprise" | null;

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!role) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-background flex font-sans text-text-primary antialiased">
      {/* Left Panel — Branding (Cinematic Dark UI) */}
      <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden border-r border-white/[0.03] bg-[#0c0c0e]">
        <div className="absolute inset-0 grid-topology opacity-20" />
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-radial-[at_100%_0%] from-accent/[0.03] to-transparent pointer-events-none" />
        <div className="absolute inset-0 scan-overlay pointer-events-none opacity-40" />

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded bg-accent/5 border border-accent/15 flex items-center justify-center">
              <Leaf className="h-4 w-4 text-accent opacity-90" />
            </div>
            <span className="text-[13.5px] font-medium text-text-primary tracking-tight">Green Credit AI</span>
          </div>

          {/* Core branding copy */}
          <div className="space-y-7">
            <h2 className="text-4xl font-light leading-[1.1] tracking-tight text-text-primary">
              AI-Powered
              <br />
              <span className="text-gradient-green font-normal text-[32px] sm:text-[34px]">Sustainability Intelligence</span>
            </h2>
            <p className="text-text-secondary text-[13.5px] font-light leading-relaxed max-w-sm opacity-90">
              Combining autonomous value chain emissions monitoring with community-driven environmental networks.
            </p>
            <div className="flex flex-col gap-3 text-[12px] text-text-muted tracking-wider uppercase font-light pt-2">
              <span className="flex items-center gap-2.5"><Shield className="h-4 w-4 text-accent/50" /> ESG compliance automation</span>
              <span className="flex items-center gap-2.5"><BarChart3 className="h-4 w-4 text-accent/50" /> Scope 3 lifecycle analytics</span>
              <span className="flex items-center gap-2.5"><Sparkles className="h-4 w-4 text-accent/50" /> Multi-agent audit assistance</span>
            </div>
          </div>

          <p className="text-[10px] text-text-muted uppercase tracking-widest font-light">
            CBSE Skill Expo 2026-27 · ACTRM Operating System
          </p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-10 bg-[#09090b]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[420px] space-y-9"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-5">
            <div className="h-8 w-8 rounded bg-accent/5 border border-accent/15 flex items-center justify-center">
              <Leaf className="h-4 w-4 text-accent" />
            </div>
            <span className="text-[13.5px] font-medium text-text-primary tracking-tight">Green Credit AI</span>
          </div>

          <div>
            <h1 className="text-3xl font-light tracking-tight text-text-primary">Welcome back</h1>
            <p className="text-[13px] text-text-muted font-light mt-1.5 leading-relaxed">
              Access the sustainability command center.
            </p>
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            <p className="text-[10px] font-normal text-text-muted uppercase tracking-widest">I am signing in as</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setRole("community")}
                className={cn(
                  "p-5 rounded border text-left transition-all",
                  role === "community"
                    ? "border-accent/40 bg-accent/[0.02]"
                    : "border-white/[0.04] bg-[#0c0c0e] hover:border-accent/10"
                )}
              >
                <Users className={cn("h-7 w-7 mb-3.5", role === "community" ? "text-accent" : "text-text-muted opacity-70")} />
                <p className="text-[13.5px] font-medium text-text-primary tracking-tight">Individual</p>
                <p className="text-[10px] text-text-muted font-light mt-1 leading-normal">Student, Citizen, Enthusiast</p>
              </button>
              <button
                onClick={() => setRole("enterprise")}
                className={cn(
                  "p-5 rounded border text-left transition-all",
                  role === "enterprise"
                    ? "border-accent/40 bg-accent/[0.02]"
                    : "border-white/[0.04] bg-[#0c0c0e] hover:border-accent/10"
                )}
              >
                <Building2 className={cn("h-7 w-7 mb-3.5", role === "enterprise" ? "text-accent" : "text-text-muted opacity-70")} />
                <p className="text-[13.5px] font-medium text-text-primary tracking-tight">Organization</p>
                <p className="text-[10px] text-text-muted font-light mt-1 leading-normal">Company, School, NGO</p>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            <div>
              <label className="text-[12px] text-text-muted font-light uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                defaultValue="shivam@greencredit.ai"
                className="w-full mt-2 h-11 rounded border border-white/[0.04] bg-[#0c0c0e] px-4 text-[13.5px] font-light text-text-primary focus:outline-none focus:border-accent/30 focus:ring-0 transition-colors"
              />
            </div>
            <div>
              <label className="text-[12px] text-text-muted font-light uppercase tracking-wider">Password</label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full mt-2 h-11 rounded border border-white/[0.04] bg-[#0c0c0e] px-4 text-[13.5px] font-light text-text-primary focus:outline-none focus:border-accent/30 focus:ring-0 transition-colors"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!role || isLoading}
            className={cn(
              "w-full h-11 rounded text-[13px] font-normal tracking-wide flex items-center justify-center gap-2 transition-colors",
              role
                ? "gradient-green text-white hover:opacity-95"
                : "bg-surface border border-white/[0.03] text-text-muted cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Initializing agent layers...
              </span>
            ) : (
              <>
                Initialize Command Session
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <p className="text-center text-[12px] text-text-muted font-light">
            Don&apos;t have an operational account?{" "}
            <button className="text-accent/90 hover:underline font-normal">Request credentials</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
