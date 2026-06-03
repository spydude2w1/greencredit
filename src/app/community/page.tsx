"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Target,
  Leaf,
  Award,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  BrainCircuit,
  MessageSquare,
  Search,
  ShoppingCart,
  Plane,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScoreGauge } from "@/components/dashboard/Cards";
import { userProfile, quickStats, recentActivity } from "@/lib/data/dashboard-data";
import { PATHFINDER_MISSIONS, COPILOT_SCENARIOS, type PathfinderMission, type CopilotAnalysis } from "@/lib/data/pathfinder-data";

export default function CommunityDashboard() {
  // Pathfinder State
  const [activeMission, setActiveMission] = useState<PathfinderMission>(PATHFINDER_MISSIONS[0]);
  const [isGeneratingMission, setIsGeneratingMission] = useState(false);
  const [missionProgress, setMissionProgress] = useState(3); // Mock progress

  // Copilot State
  const [activeAnalysis, setActiveAnalysis] = useState<CopilotAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copilotInput, setCopilotInput] = useState("");

  const handleGenerateMission = useCallback(async () => {
    setIsGeneratingMission(true);
    // Simulate AI generation delay
    await new Promise((r) => setTimeout(r, 1800));
    const currentIndex = PATHFINDER_MISSIONS.findIndex((m) => m.id === activeMission.id);
    const nextIndex = (currentIndex + 1) % PATHFINDER_MISSIONS.length;
    setActiveMission(PATHFINDER_MISSIONS[nextIndex]);
    setMissionProgress(0);
    setIsGeneratingMission(false);
  }, [activeMission]);

  const handleCopilotAnalysis = useCallback(async (scenarioId: string) => {
    setIsAnalyzing(true);
    setActiveAnalysis(null);
    setCopilotInput("");
    // Simulate AI analysis delay
    await new Promise((r) => setTimeout(r, 1500));
    const scenario = COPILOT_SCENARIOS.find((s) => s.id === scenarioId) || COPILOT_SCENARIOS[0];
    setActiveAnalysis(scenario);
    setIsAnalyzing(false);
  }, []);

  const handleCopilotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotInput.trim()) return;
    
    // Pick a random scenario based on input keywords, or default to the first one
    const inputLower = copilotInput.toLowerCase();
    let targetScenario = COPILOT_SCENARIOS[0].id;
    if (inputLower.includes("travel") || inputLower.includes("trip") || inputLower.includes("flight")) {
      targetScenario = "c_travel";
    } else if (inputLower.includes("buy") || inputLower.includes("purchase") || inputLower.includes("laptop")) {
      targetScenario = "c_laptop";
    } else if (inputLower.includes("home") || inputLower.includes("household") || inputLower.includes("energy")) {
      targetScenario = "c_household";
    }
    
    handleCopilotAnalysis(targetScenario);
  };

  return (
    <div className="space-y-8 font-sans text-text-primary antialiased">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.04]">
        <div>
          <h1 className="text-2xl font-light text-text-primary tracking-tight">
            Personal Sustainability OS
          </h1>
          <p className="text-[13px] text-text-muted font-light mt-1.5 leading-relaxed">
            AI-powered guidance for your everyday environmental decisions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[12px] font-light px-3 py-1.5 rounded-full bg-accent/5 border border-accent/10">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-accent/90">Pathfinder Active</span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* ═══════ LEFT COLUMN: PROFILE & STATS ═══════ */}
        <div className="xl:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-white/[0.04] bg-[#0c0c0e] p-6 flex flex-col items-center relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0" />
            
            <div className="h-16 w-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xl text-accent mb-4">
              {userProfile.name.split(" ").map(n => n[0]).join("")}
            </div>
            <h2 className="text-[15px] font-medium text-text-primary tracking-tight">{userProfile.name}</h2>
            <p className="text-[11px] text-text-muted font-light mt-1">{userProfile.school}</p>
            
            <div className="w-full mt-6 pt-6 border-t border-white/[0.04]">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[11px] text-text-muted font-light uppercase tracking-wider">Green Score</span>
                <span className="text-[16px] font-mono text-accent">{userProfile.greenScore}</span>
              </div>
              <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                <div className="h-full bg-accent" style={{ width: `${(userProfile.greenScore / 850) * 100}%` }} />
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 rounded border border-white/[0.03] bg-[#09090b] text-center">
                <p className="text-[15px] font-mono text-text-primary tracking-tight">{userProfile.greenCredits}</p>
                <p className="text-[9px] text-text-muted uppercase tracking-widest mt-1">Credits</p>
              </div>
              <div className="p-3 rounded border border-white/[0.03] bg-[#09090b] text-center">
                <p className="text-[15px] font-mono text-text-primary tracking-tight">#{userProfile.rank}</p>
                <p className="text-[9px] text-text-muted uppercase tracking-widest mt-1">Rank</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-white/[0.04] bg-[#0c0c0e] p-6"
          >
            <h3 className="text-[12px] font-medium text-text-primary uppercase tracking-wider mb-4">Impact Summary</h3>
            <div className="space-y-4">
              {quickStats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="opacity-70 text-[14px]">{stat.icon}</span>
                    <span className="text-[12px] text-text-secondary font-light">{stat.label}</span>
                  </div>
                  <span className="text-[13px] font-mono text-text-primary">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ═══════ CENTER COLUMN: GREEN CREDIT PATHFINDER ═══════ */}
        <div className="xl:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-accent/15 bg-gradient-to-b from-accent/[0.03] to-transparent p-1"
          >
            <div className="rounded-lg bg-[#0c0c0e] p-7 h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Target className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-normal text-text-primary tracking-tight">Green Credit Pathfinder</h2>
                    <p className="text-[11.5px] text-text-muted font-light mt-0.5">Your personalized AI sustainability journey</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] text-accent/80 uppercase tracking-widest">Active</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isGeneratingMission ? (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[220px] flex flex-col items-center justify-center text-center border border-white/[0.04] bg-[#09090b] rounded-lg"
                  >
                    <Loader2 className="h-6 w-6 text-accent animate-spin mb-4" />
                    <p className="text-[13px] text-text-primary font-light">Analyzing Lifestyle Impact...</p>
                    <p className="text-[11px] text-text-muted font-light mt-2">Generating personalized mission for maximum reduction</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="mission"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="p-6 rounded-lg border border-accent/10 bg-[#09090b] relative overflow-hidden">
                      <div className="absolute -right-12 -top-12 opacity-[0.02] pointer-events-none text-[120px]">
                        <Target />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-normal text-accent/80 uppercase tracking-widest px-2 py-1 rounded bg-accent/5 border border-accent/10">
                          Current Mission
                        </span>
                        <span className="text-[11px] text-text-muted font-light">
                          Difficulty: <span className={cn("font-medium", activeMission.difficulty === "Easy" ? "text-info/90" : activeMission.difficulty === "Medium" ? "text-warning/90" : "text-danger/90")}>{activeMission.difficulty}</span>
                        </span>
                      </div>
                      
                      <h3 className="text-[20px] font-normal text-text-primary tracking-tight mt-4">{activeMission.title}</h3>
                      <p className="text-[13px] text-text-muted font-light mt-1.5 mb-6">{activeMission.category}</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3.5 rounded border border-white/[0.04] bg-surface flex items-center gap-3">
                          <Leaf className="h-4.5 w-4.5 text-info/80" />
                          <div>
                            <p className="text-[10px] text-text-muted uppercase tracking-widest mb-0.5">Expected Impact</p>
                            <p className="text-[14px] font-mono text-text-primary">{activeMission.impactEstimate}</p>
                          </div>
                        </div>
                        <div className="p-3.5 rounded border border-white/[0.04] bg-surface flex items-center gap-3">
                          <Award className="h-4.5 w-4.5 text-warning/80" />
                          <div>
                            <p className="text-[10px] text-text-muted uppercase tracking-widest mb-0.5">Reward</p>
                            <p className="text-[14px] font-mono text-text-primary">+{activeMission.reward} GC</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-5 border-t border-white/[0.04]">
                        <div className="flex items-center justify-between text-[11px] font-light mb-2">
                          <span className="text-text-muted">Progress Timeline</span>
                          <span className="text-accent/90">{missionProgress} / {activeMission.durationDays} Days</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden flex">
                          {Array.from({ length: activeMission.durationDays }).map((_, i) => (
                            <div key={i} className="flex-1 h-full border-r border-[#09090b] last:border-0 relative">
                              {i < missionProgress && <div className="absolute inset-0 bg-accent" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={handleGenerateMission}
                  disabled={isGeneratingMission}
                  className="px-4 py-2.5 rounded bg-[#09090b] border border-white/[0.08] text-[12px] text-text-secondary hover:text-text-primary hover:border-accent/30 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Generate Next Mission
                </button>
                <button className="px-5 py-2.5 rounded gradient-green text-white text-[12.5px] font-medium hover:opacity-95 transition-opacity flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Log Progress
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════ RIGHT COLUMN: SUSTAINABILITY COPILOT ═══════ */}
        <div className="xl:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-white/[0.04] bg-[#0c0c0e] h-full flex flex-col overflow-hidden"
          >
            <div className="p-5 border-b border-white/[0.04] bg-[#09090b] flex items-center gap-3">
              <BrainCircuit className="h-4.5 w-4.5 text-accent/80" />
              <div>
                <h2 className="text-[14px] font-medium text-text-primary tracking-tight">Sustainability Copilot</h2>
                <p className="text-[10.5px] text-text-muted font-light mt-0.5">AI Decision Assistant</p>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-5">
                {[
                  { id: "c_laptop", label: "Purchase", icon: ShoppingCart },
                  { id: "c_travel", label: "Travel", icon: Plane },
                  { id: "c_household", label: "Household", icon: Home },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCopilotAnalysis(cat.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.06] bg-[#09090b] text-[10.5px] text-text-secondary hover:text-text-primary hover:border-accent/30 transition-colors"
                  >
                    <cat.icon className="h-3 w-3 opacity-70" /> {cat.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center py-10"
                  >
                    <Loader2 className="h-5 w-5 text-accent animate-spin mb-3" />
                    <p className="text-[12px] text-text-primary font-light tracking-tight">Copilot Analyzing...</p>
                  </motion.div>
                ) : activeAnalysis ? (
                  <motion.div
                    key="analysis"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex-1"
                  >
                    <div className="p-4 rounded-lg border border-white/[0.05] bg-[#09090b]">
                      <div className="flex items-center justify-between mb-3 border-b border-white/[0.04] pb-2">
                        <span className="text-[10px] text-text-muted uppercase tracking-widest">{activeAnalysis.type}</span>
                        <span className={cn(
                          "text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border",
                          activeAnalysis.impactLevel === "High" ? "bg-danger/5 text-danger border-danger/10" :
                          activeAnalysis.impactLevel === "Medium" ? "bg-warning/5 text-warning border-warning/10" :
                          "bg-info/5 text-info border-info/10"
                        )}>
                          {activeAnalysis.impactLevel} Impact
                        </span>
                      </div>
                      
                      <h3 className="text-[14px] font-normal text-text-primary tracking-tight mb-4">{activeAnalysis.title}</h3>
                      
                      <div className="space-y-2 mb-4">
                        {activeAnalysis.details.map((detail, i) => (
                          <div key={i} className="flex justify-between items-center text-[11.5px] font-light">
                            <span className="text-text-muted">{detail.label}</span>
                            <span className="text-text-primary font-mono opacity-90">{detail.value}</span>
                          </div>
                        ))}
                      </div>

                      {activeAnalysis.score && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-[11px] font-light mb-1.5">
                            <span className="text-text-muted">Sustainability Score</span>
                            <span className="text-accent/90">{activeAnalysis.score}/100</span>
                          </div>
                          <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
                            <div className="h-full bg-accent" style={{ width: `${activeAnalysis.score}%` }} />
                          </div>
                        </div>
                      )}

                      <div className="mt-4 pt-3 border-t border-accent/10">
                        <p className="text-[10px] text-accent/80 uppercase tracking-widest mb-1.5">Recommended Action</p>
                        <p className="text-[12px] text-text-primary font-light leading-relaxed">
                          {activeAnalysis.recommendation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center py-10 opacity-60"
                  >
                    <MessageSquare className="h-6 w-6 text-text-muted mb-3" />
                    <p className="text-[12px] text-text-secondary font-light">Ask Copilot for sustainability advice on purchases, travel, or habits.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <form onSubmit={handleCopilotSubmit} className="p-4 border-t border-white/[0.04] bg-[#09090b]">
              <div className="relative">
                <input
                  type="text"
                  value={copilotInput}
                  onChange={(e) => setCopilotInput(e.target.value)}
                  placeholder="I want to buy a laptop..."
                  className="w-full h-9 rounded bg-[#0c0c0e] border border-white/[0.06] pl-9 pr-3 text-[12px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/30 transition-colors font-light"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
                <button type="submit" className="hidden">Submit</button>
              </div>
            </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
