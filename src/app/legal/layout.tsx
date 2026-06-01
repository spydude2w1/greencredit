import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: {
    template: "%s — Green Credit AI",
    default: "Legal — Green Credit AI",
  },
};

const legalNav = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms & Conditions", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
  { label: "Data Protection", href: "/legal/data-protection" },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {/* Top bar */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#060608]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-[11px] text-text-muted font-light tracking-wider hover:text-text-secondary transition-colors shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Green Credit AI
          </Link>

          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11.5px] text-text-muted font-light tracking-wide hover:text-text-secondary whitespace-nowrap transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">{children}</main>

      {/* Minimal footer */}
      <footer className="border-t border-white/[0.04] py-8 mt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-text-muted/50 font-extralight tracking-wider">
            © 2026 Green Credit AI · All Rights Reserved
          </p>
          <Link href="/" className="text-[10px] text-text-muted/40 font-extralight tracking-wider hover:text-text-muted transition-colors">
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
