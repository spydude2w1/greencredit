"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ECOBOT_NAV, type NavSection } from "@/lib/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onEcoBotToggle: () => void;
  sections: NavSection[];
  mode: "enterprise" | "community";
  mobileOpen?: boolean;
}

export default function Sidebar({ collapsed, onToggle, onEcoBotToggle, sections, mode, mobileOpen = false }: SidebarProps) {
  const pathname = usePathname();

  const modeConfig = {
    enterprise: {
      label: "Green Credit AI",
      badge: "ENTERPRISE OS",
      badgeColor: "text-accent/90",
      icon: Building2,
    },
    community: {
      label: "Green Credit AI",
      badge: "COMMUNITY PLATFORM",
      badgeColor: "text-cyan-400/90",
      icon: Users,
    },
  };

  const config = modeConfig[mode];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 288 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed left-0 top-0 z-50 h-[100dvh] flex flex-col border-r border-white/[0.03] bg-[#0c0c0e] overflow-hidden transition-transform md:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo */}
      <div className="flex h-[72px] items-center gap-3 px-4 border-b border-white/[0.03]">
        <BrandLogo size={24} className="opacity-90" />
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <h1 className="text-[13.5px] font-medium text-text-primary tracking-tight">
                {config.label}
              </h1>
              <p className={cn("text-[9px] font-light tracking-widest uppercase mt-0.5 opacity-80", config.badgeColor)}>
                {config.badge}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 no-scrollbar space-y-4">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-2 px-3.5 text-[10px] font-light uppercase tracking-widest text-text-muted"
                >
                  {section.title}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const basePath = `/${mode}`;
                const isExactDashboard = item.href === basePath && pathname === basePath;
                const isSubPage = item.href !== basePath && pathname.startsWith(item.href);
                const isActive = isExactDashboard || isSubPage;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 rounded px-3.5 py-2.5 text-[13.5px] font-light transition-colors duration-150",
                      isActive
                        ? "bg-accent/5 text-accent border-l-2 border-accent"
                        : "text-text-secondary hover:bg-white/[0.02] hover:text-text-primary"
                    )}
                  >
                    <item.icon className={cn("h-[16.5px] w-[16.5px] shrink-0 opacity-70 group-hover:opacity-100", isActive && "text-accent opacity-90")} />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden whitespace-nowrap tracking-wide"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {!collapsed && item.badge && (
                      <span className="ml-auto text-[9.5px] font-light px-1.5 py-0.5 rounded border border-accent/15 bg-accent/5 text-accent uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* EcoBot Button */}
      <div className="px-3 pb-3">
        <button
          onClick={onEcoBotToggle}
          className={cn(
            "flex w-full items-center gap-3 rounded px-3.5 py-2.5 text-[13.5px] font-light",
            "bg-accent/5 text-accent border border-accent/15",
            "hover:bg-accent/10 hover:border-accent/30 transition-colors duration-150"
          )}
        >
          <ECOBOT_NAV.icon className="h-[16.5px] w-[16.5px] shrink-0 opacity-80" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden whitespace-nowrap tracking-wide"
              >
                {ECOBOT_NAV.label}
              </motion.span>
            )}
          </AnimatePresence>
          {!collapsed && (
            <span className="ml-auto text-[10px] font-light px-1.5 py-0.5 rounded border border-accent/20 bg-accent/10 text-accent uppercase tracking-wider">
              Agent
            </span>
          )}
        </button>
      </div>

      {/* Collapse Toggle */}
      <div className="border-t border-white/[0.03] p-3 bg-[#09090b]">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded py-1.5 text-text-muted hover:text-text-primary hover:bg-white/[0.02] transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </motion.aside>
  );
}
