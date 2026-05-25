import {
  LayoutDashboard,
  Building2,
  BarChart3,
  ShieldAlert,
  FileText,
  Truck,
  ShoppingBag,
  Calculator,
  Trophy,
  Newspaper,
  Medal,
  Target,
  Star,
  Bot,
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

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/home", icon: LayoutDashboard },
      { label: "Green Score", href: "/score", icon: Star },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { label: "Enterprise", href: "/enterprise", icon: Building2, badge: "B2B" },
      { label: "Carbon Analysis", href: "/enterprise/carbon", icon: BarChart3 },
      { label: "Greenwash Detect", href: "/enterprise/greenwash", icon: ShieldAlert },
      { label: "ESG Reports", href: "/enterprise/reports", icon: FileText },
      { label: "Suppliers", href: "/enterprise/suppliers", icon: Truck },
    ],
  },
  {
    title: "Engagement",
    items: [
      { label: "Marketplace", href: "/marketplace", icon: ShoppingBag },
      { label: "Calculator", href: "/calculator", icon: Calculator },
      { label: "Challenges", href: "/challenges", icon: Trophy },
      { label: "Leaderboard", href: "/leaderboard", icon: Medal },
      { label: "Goals", href: "/goals", icon: Target },
      { label: "Eco News", href: "/news", icon: Newspaper },
    ],
  },
];

export const ECOBOT_NAV: NavItem = {
  label: "EcoBot AI",
  href: "#ecobot",
  icon: Bot,
  badge: "AI",
};
