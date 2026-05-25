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
  PieChart,
  Pie,
  Cell,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Welcome back, {userProfile.name.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Your sustainability journey is looking great. Keep it up!
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-text-muted">🔥 {userProfile.streak}-day streak</span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div
        variants={STAGGER.container}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {quickStats.map((stat, i) => (
          <MetricCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            delay={i * 0.08}
          />
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Green Score */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border-subtle bg-surface p-6 flex flex-col items-center"
        >
          <h3 className="text-sm font-semibold text-text-primary mb-4 self-start">
            Green Credit Score
          </h3>
          <ScoreGauge score={userProfile.greenScore} label="out of 850" />
          <div className="flex items-center gap-4 mt-4 text-center">
            <div>
              <p className="text-lg font-bold text-accent stat-number">
                #{userProfile.rank}
              </p>
              <p className="text-[10px] text-text-muted">Your Rank</p>
            </div>
            <div className="h-8 w-px bg-border-subtle" />
            <div>
              <p className="text-lg font-bold text-text-primary stat-number">
                {userProfile.greenCredits.toLocaleString()}
              </p>
              <p className="text-[10px] text-text-muted">Green Credits</p>
            </div>
          </div>
        </motion.div>

        {/* Carbon Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-xl border border-border-subtle bg-surface p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">
              Carbon Footprint Trend
            </h3>
            <div className="flex items-center gap-1 text-xs text-accent">
              <TrendingDown className="h-3.5 w-3.5" />
              <span className="font-medium">18.5% reduction</span>
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={carbonTrend}>
                <defs>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#71717a", fontSize: 11 }}
                  axisLine={{ stroke: "#27272a" }}
                />
                <YAxis
                  tick={{ fill: "#71717a", fontSize: 11 }}
                  axisLine={{ stroke: "#27272a" }}
                  tickFormatter={(v) => `${v}kg`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#18181b",
                    border: "1px solid #3f3f46",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#fafafa",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#3f3f46"
                  strokeDasharray="4 4"
                  fill="none"
                  strokeWidth={1.5}
                />
                <Area
                  type="monotone"
                  dataKey="kg"
                  stroke="#22c55e"
                  fill="url(#greenGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carbon Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-xl border border-border-subtle bg-surface p-6"
        >
          <h3 className="text-sm font-semibold text-text-primary mb-4">
            Emission Sources
          </h3>
          <div className="flex items-center justify-center">
            <div className="h-[160px] w-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={carbonBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {carbonBreakdown.map((entry) => (
                      <Cell key={entry.category} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {carbonBreakdown.map((item) => (
              <div key={item.category} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ background: item.color }}
                  />
                  <span className="text-text-secondary">{item.category}</span>
                </div>
                <span className="text-text-primary font-medium stat-number">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Active Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border-subtle bg-surface p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">
              Active Challenges
            </h3>
            <button className="text-xs text-accent font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {activeChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="p-3 rounded-lg border border-border-subtle bg-background hover:border-accent/20 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{challenge.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-text-primary">
                      {challenge.title}
                    </p>
                    <p className="text-[10px] text-text-muted mt-0.5">
                      {challenge.daysLeft} days left • {challenge.reward} credits
                    </p>
                    <div className="mt-2 h-1.5 rounded-full bg-surface-raised overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${challenge.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full gradient-green"
                      />
                    </div>
                    <p className="text-[10px] text-text-muted mt-1 text-right">
                      {challenge.progress}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-xl border border-border-subtle bg-surface p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              AI Recommendations
            </h3>
          </div>
          <div className="space-y-3">
            {aiRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-3 rounded-lg border border-border-subtle bg-background hover:border-accent/20 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-text-primary">
                    {rec.title}
                  </p>
                  <span
                    className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded",
                      rec.impact === "High"
                        ? "bg-accent/10 text-accent"
                        : rec.impact === "Medium"
                        ? "bg-warning/10 text-warning"
                        : "bg-info/10 text-info"
                    )}
                  >
                    {rec.impact}
                  </span>
                </div>
                <p className="text-[10px] text-text-muted mt-1">
                  {rec.description}
                </p>
                <p className="text-[10px] font-semibold text-accent mt-1.5">
                  Saves {rec.savings}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-border-subtle bg-surface p-6"
        >
          <h3 className="text-sm font-semibold text-text-primary mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 py-2 border-b border-border-subtle last:border-0"
              >
                <span className="text-lg">{activity.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-text-primary truncate">
                    {activity.action}
                  </p>
                  <p className="text-[10px] text-text-muted">{activity.time}</p>
                </div>
                <span className="text-xs font-semibold text-accent">
                  +{activity.credits}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-xl border border-border-subtle bg-surface p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <Crown className="h-4 w-4 text-warning" />
              Leaderboard
            </h3>
            <button className="text-xs text-accent font-medium hover:underline flex items-center gap-1">
              Full Board <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-2">
            {leaderboardPreview.map((user) => (
              <div
                key={user.rank}
                className={cn(
                  "flex items-center gap-3 p-2.5 rounded-lg transition-colors",
                  user.name === "Shivam B."
                    ? "bg-accent/5 border border-accent/20"
                    : "hover:bg-surface-raised"
                )}
              >
                <span
                  className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                    user.rank === 1
                      ? "bg-warning/20 text-warning"
                      : user.rank === 2
                      ? "bg-zinc-400/20 text-zinc-400"
                      : user.rank === 3
                      ? "bg-amber-700/20 text-amber-600"
                      : "bg-surface-raised text-text-muted"
                  )}
                >
                  {user.rank}
                </span>
                <div className="h-7 w-7 rounded-lg gradient-green flex items-center justify-center text-white text-[10px] font-bold">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-text-muted">{user.school}</p>
                </div>
                <span className="text-xs font-bold text-text-primary stat-number">
                  {user.score}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
