import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Truck,
  ShieldAlert,
  ClipboardCheck,
  TrendingUp,
  Settings,
  Bot,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// ─── B2B Enterprise Navigation ──────────────────────────────────────
export const ENTERPRISE_NAV: NavSection[] = [
  {
    title: "Dashboard",
    items: [
      { label: "Overview", href: "/enterprise", icon: LayoutDashboard },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { label: "EcoBot Dashboard", href: "/enterprise/ecobot", icon: Bot, badge: "Agent" },
      { label: "ESG Reports", href: "/enterprise/reports", icon: FileText, badge: "Agent" },
      { label: "Carbon Analysis", href: "/enterprise/carbon", icon: BarChart3 },
      { label: "Suppliers", href: "/enterprise/suppliers", icon: Truck },
      { label: "Greenwash Detect", href: "/enterprise/greenwash", icon: ShieldAlert },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Compliance", href: "/enterprise/compliance", icon: ClipboardCheck },
      { label: "Analytics", href: "/enterprise/analytics", icon: TrendingUp },
      { label: "Settings", href: "/enterprise/settings", icon: Settings },
    ],
  },
];

// ─── B2C Community Navigation ───────────────────────────────────────
import {
  Star,
  Trophy,
  Coins,
  ShoppingBag,
  Medal,
  Users,
  Leaf,
  BookOpen,
} from "lucide-react";

export const COMMUNITY_NAV: NavSection[] = [
  {
    title: "Dashboard",
    items: [
      { label: "My Dashboard", href: "/community", icon: LayoutDashboard },
      { label: "My Score", href: "/community/score", icon: Star },
    ],
  },
  {
    title: "Engagement",
    items: [
      { label: "Challenges", href: "/community/challenges", icon: Trophy },
      { label: "Green Credits", href: "/community/credits", icon: Coins },
      { label: "Marketplace", href: "/community/marketplace", icon: ShoppingBag },
      { label: "Greenwash Detect", href: "/community/greenwash", icon: ShieldAlert },
    ],
  },
  {
    title: "Social",
    items: [
      { label: "Leaderboard", href: "/community/leaderboard", icon: Medal },
      { label: "Community", href: "/community/hub", icon: Users },
      { label: "My Impact", href: "/community/impact", icon: Leaf },
      { label: "Learn", href: "/community/learn", icon: BookOpen },
      { label: "Settings", href: "/community/settings", icon: Settings },
    ],
  },
];

// ─── EcoBot (shared) ────────────────────────────────────────────────
export const ECOBOT_NAV: NavItem = {
  label: "Chat with Agent",
  href: "/enterprise/ecobot",
  icon: Bot,
  badge: "Agent",
};
