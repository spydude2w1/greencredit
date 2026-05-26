"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, ChevronRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ENTERPRISE_NAV, COMMUNITY_NAV } from "@/lib/navigation";

interface TopbarProps {
  sidebarCollapsed: boolean;
  onMobileToggle?: () => void;
}

export default function Topbar({ sidebarCollapsed, onMobileToggle }: TopbarProps) {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const crumbs: { label: string; href: string }[] = [];

    const allSections = [...ENTERPRISE_NAV, ...COMMUNITY_NAV];
    let currentPath = "";
    for (const segment of segments) {
      currentPath += `/${segment}`;
      const allItems = allSections.flatMap((s) => s.items);
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
      className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/[0.03] bg-[#09090b]/80 backdrop-blur-xl px-6 transition-all duration-300 font-sans text-text-primary antialiased"
    >
      {/* Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {onMobileToggle && (
          <button
            onClick={onMobileToggle}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded border border-white/[0.04] bg-[#0c0c0e] hover:bg-white/[0.02] transition-colors text-text-muted"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}
        <nav className="hidden md:flex items-center gap-1.5 text-[12.5px] font-light uppercase tracking-wider text-text-muted">
          <span>Platform</span>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-text-muted opacity-60" />
              <span
                className={cn(
                  i === breadcrumbs.length - 1
                    ? "text-text-primary font-normal"
                    : "text-text-muted"
                )}
              >
                {crumb.label}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-text-muted opacity-70" />
          <input
            type="text"
            placeholder="Search commands (⌘K)..."
            className="h-9.5 w-60 rounded border border-white/[0.04] bg-[#0c0c0e] pl-10 pr-3 text-[13px] font-light text-text-primary placeholder:text-text-muted/70 focus:outline-none focus:border-accent/30 focus:ring-0 transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted font-mono bg-white/[0.03] border border-white/[0.04] px-1.5 py-0.5 rounded leading-none">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="relative flex h-9.5 w-9.5 items-center justify-center rounded border border-white/[0.04] bg-[#0c0c0e] hover:bg-white/[0.02] transition-colors">
          <Bell className="h-4 w-4 text-text-secondary" />
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-accent text-[9.5px] font-light text-white flex items-center justify-center border border-[#09090b]">
            3
          </span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 ml-2 pl-3 border-l border-white/[0.04]">
          <div className="h-8 w-8 rounded bg-accent/5 border border-accent/15 flex items-center justify-center text-accent text-[12px] font-normal tracking-wide">
            SB
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-[13px] font-normal text-text-primary leading-none">
              Shivam B.
            </p>
            <p className="text-[11px] text-text-muted font-light mt-0.5 uppercase tracking-wider">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
