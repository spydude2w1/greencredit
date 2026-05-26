"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowRight,
  TrendingDown,
  Zap,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { STAGGER } from "@/lib/animations";
import { MetricCard, ScoreGauge } from "@/components/dashboard/Cards";
import {
  userProfile,
  carbonTrend,
  carbonBreakdown,
  activeChallenges,
  aiRecommendations,
  recentActivity,
  leaderboardPreview,
  quickStats,
} from "@/lib/data/dashboard-data";

export default function HomePage() {
  return (
    <div className="space-y-8 font-sans text-text-primary antialiased">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.02]">
        <div>
          <h1 className="text-2xl font-light text-text-primary tracking-tight">
            Welcome back, <span className="font-normal text-gradient-green">{userProfile.name.split(" ")[0]}</span>
          </h1>
          <p className="text-[13px] text-text-muted font-light mt-1.5 leading-relaxed">
            Your community ESG metrics are ahead of target. Keep leading the way!
          </p>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-light">
          <span className="text-text-muted">🔥 {userProfile.streak}-day streak</span>
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div
        variants={STAGGER.container}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {quickStats.map((stat, i) => (
          <MetricCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            delay={i * 0.04}
          />
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Green Score */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-8 flex flex-col items-center justify-between"
        >
          <h3 className="text-[13.5px] font-medium text-text-primary mb-5 self-start tracking-tight">
            Green Credit Score
          </h3>
          <ScoreGauge score={userProfile.greenScore} label="out of 850" />
          <div className="flex items-center gap-6 mt-8 w-full pt-5 border-t border-white/[0.02] text-center">
            <div className="flex-1">
              <p className="text-[18px] font-medium text-accent font-mono tracking-tight">
                #{userProfile.rank}
              </p>
              <p className="text-[10px] text-text-muted font-light mt-1 uppercase tracking-wider">Your Rank</p>
            </div>
            <div className="h-6 w-px bg-white/[0.04]" />
            <div className="flex-1">
              <p className="text-[18px] font-medium text-text-primary font-mono tracking-tight">
                {userProfile.greenCredits.toLocaleString()}
              </p>
              <p className="text-[10px] text-text-muted font-light mt-1 uppercase tracking-wider">Credits</p>
            </div>
          </div>
        </motion.div>

        {/* Carbon Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2 rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-8"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[13.5px] font-medium text-text-primary tracking-tight">
              Carbon Footprint Trend
            </h3>
            <div className="flex items-center gap-1.5 text-[12px] font-light text-accent">
              <TrendingDown className="h-4 w-4 opacity-80" />
              <span>18.5% reduction</span>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={carbonTrend}>
                <defs>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#32ff58" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#32ff58" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1d1d21" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#71717a", fontSize: 10 }}
                  axisLine={{ stroke: "#27272a" }}
                />
                <YAxis
                  tick={{ fill: "#71717a", fontSize: 10, fontFamily: "var(--font-geist-mono)" }}
                  axisLine={{ stroke: "#27272a" }}
                  tickFormatter={(v) => `${v}kg`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0c0c0e",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "6px",
                    fontSize: "11px",
                    color: "#fafafa",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#3f3f46"
                  strokeDasharray="4 4"
                  fill="none"
                  strokeWidth={1}
                />
                <Area
                  type="monotone"
                  dataKey="kg"
                  stroke="#32ff58"
                  fill="url(#greenGradient)"
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Carbon Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-8"
        >
          <h3 className="text-[13.5px] font-medium text-text-primary tracking-tight mb-5">
            Emission Sources Breakdown
          </h3>
          <div className="space-y-3.5">
            {carbonBreakdown.map((item) => (
              <div key={item.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-[11.5px] font-light">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-sm"
                      style={{ background: item.color }}
                    />
                    <span className="text-text-secondary">{item.category}</span>
                  </div>
                  <span className="text-text-primary font-mono opacity-90">
                    {item.value}%
                  </span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.02] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ background: item.color, width: `${item.value}%`, opacity: 0.7 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Active Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-8"
        >
          <div className="flex items-center justify-between mb-5 pb-1 border-b border-white/[0.02]">
            <h3 className="text-[13.5px] font-medium text-text-primary tracking-tight">
              Active Challenges
            </h3>
            <button className="text-[12px] text-accent/80 hover:text-accent hover:underline flex items-center gap-1 transition-colors">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-3.5">
            {activeChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="p-3.5 rounded border border-white/[0.03] bg-background hover:border-accent/15 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0 mt-0.5">{challenge.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] font-normal text-text-primary tracking-tight">
                      {challenge.title}
                    </p>
                    <p className="text-[10px] text-text-muted font-light mt-0.5">
                      {challenge.daysLeft} days remaining • {challenge.reward} Green Credits
                    </p>
                    <div className="mt-2.5 h-1 rounded-full bg-white/[0.02] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${challenge.progress}%` }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="h-full rounded-full bg-accent opacity-80"
                      />
                    </div>
                    <p className="text-[9.5px] text-text-muted font-mono mt-1 text-right">
                      {challenge.progress}% completed
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-8"
        >
          <div className="flex items-center justify-between mb-5 pb-1 border-b border-white/[0.02]">
            <h3 className="text-[13.5px] font-medium text-text-primary tracking-tight flex items-center gap-2">
              <Zap className="h-4.5 w-4.5 text-accent/80" />
              AI Recommendations
            </h3>
          </div>
          <div className="space-y-3.5">
            {aiRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded border border-white/[0.03] bg-background hover:border-accent/15 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[12.5px] font-normal text-text-primary tracking-tight">
                    {rec.title}
                  </p>
                  <span
                    className={cn(
                      "text-[9px] font-light px-2 py-0.5 rounded border tracking-wide",
                      rec.impact === "High"
                        ? "bg-accent/5 text-accent border-accent/10"
                        : rec.impact === "Medium"
                        ? "bg-warning/5 text-warning border-warning/10"
                        : "bg-info/5 text-info border-info/10"
                    )}
                  >
                    {rec.impact}
                  </span>
                </div>
                <p className="text-[10.5px] text-text-muted font-light mt-1 leading-relaxed">
                  {rec.description}
                </p>
                <p className="text-[10px] font-normal text-accent/90 mt-2 tracking-wide">
                  Estimated impact: Saves {rec.savings}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-8"
        >
          <h3 className="text-[13.5px] font-medium text-text-primary tracking-tight mb-5 pb-1 border-b border-white/[0.02]">
            Recent Actions
          </h3>
          <div className="space-y-1">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 py-3 border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01] px-1 rounded transition-colors"
              >
                <span className="text-lg shrink-0">{activity.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-text-primary truncate tracking-tight">
                    {activity.action}
                  </p>
                  <p className="text-[9.5px] text-text-muted font-light mt-0.5">{activity.time}</p>
                </div>
                <span className="text-[11.5px] font-mono text-accent">
                  +{activity.credits} credits
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-white/[0.03] bg-[#0c0c0e] p-8"
        >
          <div className="flex items-center justify-between mb-5 pb-1 border-b border-white/[0.02]">
            <h3 className="text-[13.5px] font-medium text-text-primary tracking-tight flex items-center gap-2">
              <Crown className="h-4.5 w-4.5 text-warning/80" />
              Community Leaderboard
            </h3>
            <button className="text-[12px] text-accent/80 hover:text-accent hover:underline flex items-center gap-1 transition-colors">
              Full Board <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-2">
            {leaderboardPreview.map((user) => (
              <div
                key={user.rank}
                className={cn(
                  "flex items-center gap-3 p-2.5 rounded border transition-colors",
                  user.name === "Shivam B."
                    ? "bg-accent/5 border-accent/20"
                    : "border-transparent hover:bg-white/[0.01]"
                )}
              >
                <span
                  className={cn(
                    "h-6 w-6 rounded flex items-center justify-center text-[10px] font-mono",
                    user.rank === 1
                      ? "bg-warning/15 text-warning/90 border border-warning/10"
                      : user.rank === 2
                      ? "bg-zinc-500/15 text-zinc-400 border border-white/[0.05]"
                      : user.rank === 3
                      ? "bg-amber-700/15 text-amber-500 border border-amber-700/10"
                      : "bg-[#141417] text-text-muted"
                  )}
                >
                  {user.rank}
                </span>
                <div className="h-7 w-7 rounded bg-accent/5 border border-accent/15 flex items-center justify-center text-accent text-[10px] font-normal tracking-wide">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-normal text-text-primary tracking-tight">
                    {user.name}
                  </p>
                  <p className="text-[9.5px] text-text-muted font-light mt-0.5">{user.school}</p>
                </div>
                <span className="text-[12px] font-mono text-text-primary opacity-90">
                  {user.score} pts
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
