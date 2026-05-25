"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_SECTIONS } from "@/lib/navigation";

interface TopbarProps {
  sidebarCollapsed: boolean;
}

export default function Topbar({ sidebarCollapsed }: TopbarProps) {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const crumbs: { label: string; href: string }[] = [];

    let currentPath = "";
    for (const segment of segments) {
      currentPath += `/${segment}`;
      const allItems = NAV_SECTIONS.flatMap((s) => s.items);
      const navItem = allItems.find((item) => item.href === currentPath);
      crumbs.push({
        label: navItem?.label || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: currentPath,
      });
    }
    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border-subtle bg-background/80 backdrop-blur-xl px-6 transition-all duration-300",
        sidebarCollapsed ? "ml-[72px]" : "ml-[260px]"
      )}
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm">
        <span className="text-text-muted">Platform</span>
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-text-muted" />
            <span
              className={cn(
                i === breadcrumbs.length - 1
                  ? "text-text-primary font-medium"
                  : "text-text-muted"
              )}
            >
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-52 rounded-lg bg-surface border border-border-subtle pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted font-mono bg-surface-raised px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-surface hover:bg-surface-raised transition-colors">
          <Bell className="h-4 w-4 text-text-secondary" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 ml-2 pl-3 border-l border-border-subtle">
          <div className="h-8 w-8 rounded-lg gradient-green flex items-center justify-center text-white text-xs font-bold">
            SB
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-text-primary leading-none">
              Shivam B.
            </p>
            <p className="text-[11px] text-text-muted mt-0.5">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
