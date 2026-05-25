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
    <div className="min-h-screen bg-background flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <div className="absolute inset-0 gradient-green opacity-90" />
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Leaf className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">Green Credit AI</span>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              AI-Powered<br />Sustainability<br />Intelligence
            </h2>
            <p className="text-white/80 text-sm max-w-sm leading-relaxed">
              Combining enterprise sustainability intelligence with community-driven environmental engagement.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/70">
              <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> ESG Compliance</span>
              <span className="flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Carbon Analytics</span>
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> AI Agents</span>
            </div>
          </div>
          <p className="text-xs text-white/50">© 2025 Green Credit AI • CBSE Skill Expo 2026-27</p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-lg gradient-green flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-text-primary">Green Credit AI</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-text-primary">Welcome back</h1>
            <p className="text-sm text-text-muted mt-1">Sign in to your sustainability platform</p>
          </div>

          {/* Role Selection */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">I am signing in as</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRole("community")}
                className={cn(
                  "p-5 rounded-xl border-2 text-left transition-all",
                  role === "community"
                    ? "border-accent bg-accent/5 glow-green"
                    : "border-border-subtle bg-surface hover:border-accent/30"
                )}
              >
                <Users className={cn("h-8 w-8 mb-3", role === "community" ? "text-accent" : "text-text-muted")} />
                <p className="text-sm font-semibold text-text-primary">Individual</p>
                <p className="text-[11px] text-text-muted mt-0.5">Student, Citizen, Enthusiast</p>
              </button>
              <button
                onClick={() => setRole("enterprise")}
                className={cn(
                  "p-5 rounded-xl border-2 text-left transition-all",
                  role === "enterprise"
                    ? "border-accent bg-accent/5 glow-green"
                    : "border-border-subtle bg-surface hover:border-accent/30"
                )}
              >
                <Building2 className={cn("h-8 w-8 mb-3", role === "enterprise" ? "text-accent" : "text-text-muted")} />
                <p className="text-sm font-semibold text-text-primary">Organization</p>
                <p className="text-[11px] text-text-muted mt-0.5">Company, School, NGO</p>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-text-muted">Email</label>
              <input
                type="email"
                defaultValue="shivam@greencredit.ai"
                className="w-full mt-1.5 h-11 rounded-lg bg-surface border border-border-subtle px-4 text-sm text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-text-muted">Password</label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full mt-1.5 h-11 rounded-lg bg-surface border border-border-subtle px-4 text-sm text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!role || isLoading}
            className={cn(
              "w-full h-11 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all",
              role
                ? "gradient-green text-white hover:opacity-90 glow-green"
                : "bg-surface-raised text-text-muted cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <>
                Sign In
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-text-muted">
            Don&apos;t have an account?{" "}
            <button className="text-accent font-medium hover:underline">Sign up</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
