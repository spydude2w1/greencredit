import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: {
    template: "%s — Green Credit AI Learn",
    default: "Learn — Green Credit AI",
  },
  description:
    "Sustainability knowledge hub. Explore articles, guides, case studies, and insights on ESG, carbon intelligence, and environmental impact.",
};

const learnNav = [
  { label: "Blog", href: "/learn/blog" },
  { label: "Guides", href: "/learn/guides" },
  { label: "Insights", href: "/learn/insights" },
  { label: "Case Studies", href: "/learn/case-studies" },
  { label: "Sustainability 101", href: "/learn/sustainability-101" },
];

export default function LearnLayout({ children }: { children: React.ReactNode }) {
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
            {learnNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11.5px] text-text-muted font-light tracking-wide hover:text-text-secondary whitespace-nowrap transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/login"
            className="shrink-0 text-[11px] font-light text-accent/80 hover:text-accent tracking-wide transition-colors"
          >
            Platform →
          </Link>
        </div>
      </nav>

      <main>{children}</main>

      {/* Minimal footer */}
      <footer className="border-t border-white/[0.04] py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-text-muted/50 font-extralight tracking-wider">
            © 2026 Green Credit AI · AI Sustainability Intelligence Platform
          </p>
          <Link href="/" className="text-[10px] text-text-muted/40 font-extralight tracking-wider hover:text-text-muted transition-colors">
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
