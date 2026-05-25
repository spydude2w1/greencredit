// B2C Dashboard Mock Data
export const userProfile = {
  name: "Shivam Biswal",
  role: "Student",
  school: "AECS MMPS, Bengaluru",
  greenScore: 742,
  greenCredits: 2840,
  rank: 12,
  totalUsers: 1247,
  joinedDate: "2024-08-15",
  streak: 23,
};

export const carbonTrend = [
  { month: "Jan", kg: 145, target: 130 },
  { month: "Feb", kg: 138, target: 128 },
  { month: "Mar", kg: 125, target: 125 },
  { month: "Apr", kg: 118, target: 122 },
  { month: "May", kg: 108, target: 120 },
  { month: "Jun", kg: 95, target: 118 },
  { month: "Jul", kg: 102, target: 115 },
  { month: "Aug", kg: 88, target: 112 },
  { month: "Sep", kg: 82, target: 110 },
  { month: "Oct", kg: 76, target: 108 },
  { month: "Nov", kg: 71, target: 105 },
  { month: "Dec", kg: 68, target: 102 },
];

export const carbonBreakdown = [
  { category: "Transport", value: 35, co2: 24.5, color: "#3b82f6" },
  { category: "Food", value: 25, co2: 17.5, color: "#22c55e" },
  { category: "Energy", value: 22, co2: 15.4, color: "#f59e0b" },
  { category: "Shopping", value: 18, co2: 12.6, color: "#8b5cf6" },
];

export const activeChallenges = [
  {
    id: "c1",
    title: "30-Day Carbon Diet",
    description: "Reduce your carbon footprint by 20% this month",
    category: "Carbon",
    progress: 72,
    daysLeft: 8,
    participants: 342,
    reward: 500,
    icon: "🌱",
  },
  {
    id: "c2",
    title: "Zero Plastic Week",
    description: "Eliminate single-use plastics for 7 days",
    category: "Waste",
    progress: 45,
    daysLeft: 3,
    participants: 189,
    reward: 200,
    icon: "♻️",
  },
  {
    id: "c3",
    title: "Green Commute",
    description: "Use sustainable transport for 14 days",
    category: "Transport",
    progress: 85,
    daysLeft: 2,
    participants: 567,
    reward: 350,
    icon: "🚲",
  },
];

export const aiRecommendations = [
  {
    id: "r1",
    title: "Switch to Public Transport",
    description: "Based on your commute data, switching to metro could save 2.5t CO₂/year",
    impact: "High",
    savings: "2.5t CO₂/year",
    category: "Transport",
  },
  {
    id: "r2",
    title: "Reduce Meat Consumption",
    description: "Cutting beef consumption by 50% could save 0.8t CO₂ annually",
    impact: "Medium",
    savings: "0.8t CO₂/year",
    category: "Food",
  },
  {
    id: "r3",
    title: "LED Lighting Upgrade",
    description: "Replacing remaining CFL bulbs with LEDs saves 150 kWh/year",
    impact: "Low",
    savings: "0.12t CO₂/year",
    category: "Energy",
  },
];

export const recentActivity = [
  { id: "a1", action: "Logged green commute (cycling)", credits: 15, time: "2 hours ago", icon: "🚲" },
  { id: "a2", action: "Completed Zero Plastic milestone", credits: 50, time: "5 hours ago", icon: "♻️" },
  { id: "a3", action: "Purchased verified eco product", credits: 25, time: "1 day ago", icon: "🛍️" },
  { id: "a4", action: "Carbon calculator: 68kg this month", credits: 10, time: "2 days ago", icon: "📊" },
  { id: "a5", action: "Joined Community Earth Action", credits: 20, time: "3 days ago", icon: "🌍" },
];

export const leaderboardPreview = [
  { rank: 1, name: "Arjun M.", score: 895, school: "DPS Bangalore", avatar: "AM" },
  { rank: 2, name: "Priya S.", score: 872, school: "KV DRDO", avatar: "PS" },
  { rank: 3, name: "Ravi K.", score: 855, school: "AECS MMPS", avatar: "RK" },
  { rank: 4, name: "Ananya P.", score: 830, school: "NPS Koramangala", avatar: "AP" },
  { rank: 5, name: "Shivam B.", score: 742, school: "AECS MMPS", avatar: "SB" },
];

export const quickStats = [
  { label: "Total CO₂ Saved", value: "1.2t", change: -18.5, icon: "🌍" },
  { label: "Green Credits", value: "2,840", change: 12.3, icon: "💚" },
  { label: "Challenges Done", value: "14", change: 28.6, icon: "🏆" },
  { label: "Day Streak", value: "23", change: 0, icon: "🔥" },
];
