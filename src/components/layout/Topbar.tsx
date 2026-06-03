"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Search, ChevronRight, Menu, X, Command, Activity, FileText, Target, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ENTERPRISE_NAV, COMMUNITY_NAV } from "@/lib/navigation";

interface TopbarProps {
  sidebarCollapsed: boolean;
  onMobileToggle?: () => void;
}

export default function Topbar({ sidebarCollapsed, onMobileToggle }: TopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotifsOpen, setIsNotifsOpen] = useState(false);
  const notifsRef = useRef<HTMLDivElement>(null);

  // Close notifications on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifsRef.current && !notifsRef.current.contains(event.target as Node)) {
        setIsNotifsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsNotifsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const allNavItems = [...ENTERPRISE_NAV, ...COMMUNITY_NAV].flatMap(s => s.items);
  const filteredNavItems = allNavItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MOCK_NOTIFICATIONS = [
    { id: 1, title: "Anomaly Detected", message: "Spike in energy usage at BLR-AECS-01.", time: "10m ago", icon: AlertTriangle, color: "text-warning" },
    { id: 2, title: "Report Generated", message: "Q1 ESG Report is ready for download.", time: "1h ago", icon: FileText, color: "text-accent" },
    { id: 3, title: "Mission Completed", message: "You completed 'Zero Waste Week'.", time: "2h ago", icon: Target, color: "text-info" },
  ];

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
        <div className="relative hidden md:block" onClick={() => setIsSearchOpen(true)}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-text-muted opacity-70 cursor-pointer" />
          <input
            type="text"
            readOnly
            placeholder="Search commands (⌘K)..."
            className="h-9.5 w-60 rounded border border-white/[0.04] bg-[#0c0c0e] pl-10 pr-3 text-[13px] font-light text-text-primary placeholder:text-text-muted/70 focus:outline-none focus:border-accent/30 cursor-text transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted font-mono bg-white/[0.03] border border-white/[0.04] px-1.5 py-0.5 rounded leading-none pointer-events-none">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifsRef}>
          <button 
            onClick={() => setIsNotifsOpen(!isNotifsOpen)}
            className="relative flex h-9.5 w-9.5 items-center justify-center rounded border border-white/[0.04] bg-[#0c0c0e] hover:bg-white/[0.02] transition-colors"
          >
            <Bell className="h-4 w-4 text-text-secondary" />
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-accent text-[9.5px] font-light text-white flex items-center justify-center border border-[#09090b]">
              3
            </span>
          </button>

          <AnimatePresence>
            {isNotifsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-white/[0.06] bg-[#09090b] shadow-2xl overflow-hidden z-50 glass-tactical"
              >
                <div className="p-4 border-b border-white/[0.04] flex items-center justify-between bg-[#0c0c0e]">
                  <h3 className="text-[13px] font-medium text-text-primary tracking-tight">Notifications</h3>
                  <span className="text-[10px] text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">3 New</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                  {MOCK_NOTIFICATIONS.map((notif) => (
                    <div key={notif.id} className="p-4 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors cursor-pointer group flex gap-3">
                      <div className={cn("h-8 w-8 rounded-full flex items-center justify-center bg-white/[0.02] border border-white/[0.04] shrink-0", notif.color)}>
                        <notif.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[12.5px] text-text-primary font-normal tracking-tight group-hover:text-accent transition-colors">{notif.title}</p>
                        <p className="text-[11.5px] text-text-muted font-light mt-0.5 leading-relaxed">{notif.message}</p>
                        <p className="text-[10px] text-text-secondary font-mono mt-1.5 opacity-60">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-white/[0.04] bg-[#0c0c0e]">
                  <button className="text-[11.5px] text-text-muted hover:text-text-primary transition-colors">Mark all as read</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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

      {/* Global Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="fixed left-1/2 top-[15vh] z-[101] w-full max-w-xl -translate-x-1/2 rounded-xl border border-white/[0.08] bg-[#09090b] shadow-2xl overflow-hidden glass-tactical font-sans antialiased"
            >
              <div className="relative flex items-center px-4 py-3 border-b border-white/[0.06]">
                <Search className="h-5 w-5 text-text-muted shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search pages, commands, or documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent px-4 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none font-light"
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 rounded hover:bg-white/[0.05] text-text-muted transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2 no-scrollbar">
                {filteredNavItems.length > 0 ? (
                  <div className="py-2">
                    <p className="px-3 mb-2 text-[10px] uppercase tracking-widest text-text-muted font-medium">Quick Navigation</p>
                    {filteredNavItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => {
                          router.push(item.href);
                          setIsSearchOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors group text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded bg-white/[0.02] border border-white/[0.04] flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors">
                            <item.icon className="h-4 w-4 text-text-secondary group-hover:text-accent transition-colors" />
                          </div>
                          <span className="text-[13px] text-text-primary font-normal">{item.label}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <div className="h-12 w-12 rounded-full bg-white/[0.02] border border-white/[0.04] flex items-center justify-center mb-4">
                      <Search className="h-5 w-5 text-text-muted" />
                    </div>
                    <p className="text-[14px] text-text-primary font-normal tracking-tight">No results found</p>
                    <p className="text-[12px] text-text-muted font-light mt-1">Try a different search term or command</p>
                  </div>
                )}
              </div>

              <div className="px-4 py-3 border-t border-white/[0.04] bg-[#0c0c0e] flex items-center justify-between">
                <div className="flex items-center gap-4 text-[11px] text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded border border-white/[0.06] bg-white/[0.02] font-mono">↑↓</kbd>
                    <span>to navigate</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded border border-white/[0.06] bg-white/[0.02] font-mono">↵</kbd>
                    <span>to select</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded border border-white/[0.06] bg-white/[0.02] font-mono">esc</kbd>
                    <span>to close</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Command className="h-3.5 w-3.5 text-text-secondary" />
                  <span className="text-[11px] text-text-secondary font-medium tracking-tight">Green Credit OS</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
