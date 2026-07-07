"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import EcoBotPanel from "@/components/ecobot/EcoBotPanel";
import { ENTERPRISE_NAV } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ecobotOpen, setEcobotOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileOpen}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onEcoBotToggle={() => setEcobotOpen(!ecobotOpen)}
        sections={ENTERPRISE_NAV}
        mode="enterprise"
      />
      {/* Mobile Sidebar Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div className={cn("flex flex-col min-h-[100dvh] transition-all duration-300", sidebarCollapsed ? "md:ml-[80px]" : "md:ml-[288px]")}>
        <Topbar 
          sidebarCollapsed={sidebarCollapsed} 
          onMobileToggle={() => setMobileOpen(!mobileOpen)} 
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full overflow-x-hidden">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {children}
          </motion.div>
        </main>
      </div>
      {ecobotOpen && <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setEcobotOpen(false)} />}
      <EcoBotPanel isOpen={ecobotOpen} onClose={() => setEcobotOpen(false)} />
    </div>
  );
}
