'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { LucideIcon, Leaf } from 'lucide-react';
import {
  BarChart3,
  ShieldAlert,
  Truck,
  FileText,
  Bot,
  Zap,
  Globe,
  Users,
  Star,
  HelpCircle,
  Shield,
  Cpu,
  TrendingDown,
  Building2,
  Calculator,
} from 'lucide-react';

type LinkItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

/* ─── Nav Data ─── */

const platformLinks: LinkItem[] = [
  {
    title: 'ESG Report Agent',
    href: '/enterprise',
    icon: FileText,
    description: 'Autonomous BRSR & GRI compliance reporting',
  },
  {
    title: 'Carbon Analysis',
    href: '/enterprise/carbon',
    icon: BarChart3,
    description: 'Scope 1/2/3 lifecycle carbon intelligence',
  },
  {
    title: 'Greenwash Detection',
    href: '/enterprise/greenwash',
    icon: ShieldAlert,
    description: 'AI-powered sustainability claim verification',
  },
  {
    title: 'Supplier Intelligence',
    href: '/enterprise/suppliers',
    icon: Truck,
    description: 'Vendor verification & risk scoring',
  },
  {
    title: 'Carbon Calculator',
    href: '/tools/carbon-calculator',
    icon: Calculator,
    description: 'Estimate your personal footprint instantly',
  },
  {
    title: 'EcoBot Assistant',
    href: '/community',
    icon: Bot,
    description: 'AI-powered sustainability guidance',
  },
];

const solutionLinks: LinkItem[] = [
  {
    title: 'Enterprise',
    href: '/enterprise',
    icon: Building2,
    description: 'B2B sustainability intelligence platform',
  },
  {
    title: 'Community',
    href: '/community',
    icon: Users,
    description: 'Eco challenges, credits & leaderboard',
  },
  {
    title: 'Analytics',
    href: '/enterprise/analytics',
    icon: TrendingDown,
    description: 'Real-time ESG & emissions dashboards',
  },
];

const resourceLinks: LinkItem[] = [
  { title: 'ACTRM Framework', href: '#actrm', icon: Zap },
  { title: 'Compliance Tools', href: '/enterprise/compliance', icon: Shield },
  { title: 'Greenwash Detector', href: '/tools/greenwash-detector', icon: Cpu },
  { title: 'Sustainability Hub', href: '/community', icon: Globe },
  { title: 'Help Center', href: '#', icon: HelpCircle },
  { title: 'Platform Status', href: '#', icon: Star },
];

/* ─── Scroll Hook ─── */

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);

  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  React.useEffect(() => { onScroll(); }, [onScroll]);

  return scrolled;
}

/* ─── Main Header ─── */

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(12);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[1000] w-full transition-all duration-300',
        scrolled
          ? 'glass-tactical border-b border-white/[0.04]'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="h-8 w-8 rounded bg-accent/5 border border-accent/15 flex items-center justify-center transition-colors group-hover:border-accent/30 group-hover:bg-accent/10">
            <Leaf className="h-4 w-4 text-accent opacity-90" />
          </div>
          <span className="text-[13.5px] font-normal text-text-primary tracking-tight hidden sm:block">
            Green Credit <span className="text-accent">AI</span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>

            {/* Platform Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Platform</NavigationMenuTrigger>
              <NavigationMenuContent className="p-1">
                <ul className="grid w-[560px] grid-cols-2 gap-1.5 p-2">
                  {platformLinks.map((item, i) => (
                    <li key={i}>
                      <ListItem {...item} />
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/[0.03] px-3.5 py-2">
                  <p className="text-[11px] text-text-muted font-light">
                    Built for enterprise ESG teams.{' '}
                    <Link href="/login" className="text-accent hover:underline font-normal">
                      Launch platform →
                    </Link>
                  </p>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Solutions Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Solutions</NavigationMenuTrigger>
              <NavigationMenuContent className="p-1">
                <div className="grid w-[440px] grid-cols-2 gap-1.5 p-2">
                  <ul className="space-y-1">
                    {solutionLinks.map((item, i) => (
                      <li key={i}>
                        <ListItem {...item} />
                      </li>
                    ))}
                  </ul>
                  <ul className="border-l border-white/[0.03] pl-2 space-y-1">
                    {resourceLinks.map((item, i) => (
                      <li key={i}>
                        <NavigationMenuLink
                          href={item.href}
                          className="flex items-center gap-2 px-3.5 py-2.5 rounded text-[12px] text-text-muted hover:text-text-primary hover:bg-white/[0.02] transition-colors font-light"
                          asChild
                        >
                          <Link href={item.href}>
                            <item.icon className="h-4 w-4 text-text-muted shrink-0" />
                            <span>{item.title}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Direct links */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#actrm" className="inline-flex h-9 items-center px-4 text-[12.5px] font-normal text-text-muted hover:text-text-primary hover:bg-white/[0.03] rounded tracking-wide transition-colors">
                  ACTRM
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#tools" className="inline-flex h-9 items-center px-4 text-[12.5px] font-normal text-text-muted hover:text-text-primary hover:bg-white/[0.03] rounded tracking-wide transition-colors">
                  Tools
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* ── Desktop CTAs ── */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/login">Launch Platform</Link>
          </Button>
        </div>

        {/* ── Mobile Toggle ── */}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setOpen(!open)}
          className="md:hidden h-9 w-9"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-4.5" duration={280} />
        </Button>
      </nav>

      {/* ── Mobile Menu ── */}
      <MobileMenu open={open} className="flex flex-col justify-between gap-4 overflow-y-auto">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-2.5 font-light px-1">Platform</p>
            <div className="space-y-0.5">
              {platformLinks.map((link) => (
                <MobileListItem key={link.title} {...link} onSelect={() => setOpen(false)} />
              ))}
            </div>
          </div>
          <div className="border-t border-white/[0.03] pt-3.5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-2.5 font-light px-1">Solutions</p>
            <div className="space-y-0.5">
              {solutionLinks.map((link) => (
                <MobileListItem key={link.title} {...link} onSelect={() => setOpen(false)} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-4 border-t border-white/[0.03]">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/login" onClick={() => setOpen(false)}>Sign In</Link>
          </Button>
          <Button className="w-full" asChild>
            <Link href="/login" onClick={() => setOpen(false)}>Launch Platform</Link>
          </Button>
        </div>
      </MobileMenu>
    </header>
  );
}

/* ─── Mobile Menu Portal ─── */

type MobileMenuProps = React.ComponentProps<'div'> & { open: boolean };

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === 'undefined') return null;

  return createPortal(
    <div
      id="mobile-menu"
      className="glass-tactical fixed top-14 right-0 bottom-0 left-0 z-[999] flex flex-col overflow-hidden border-t border-white/[0.04] md:hidden"
    >
      <div
        data-slot={open ? 'open' : 'closed'}
        className={cn(
          'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
          'size-full p-5',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

/* ─── Desktop List Item ─── */

function ListItem({
  title,
  description,
  icon: Icon,
  className,
  href,
  ...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
  return (
    <NavigationMenuLink
      className={cn(
        'w-full flex flex-row gap-x-3.5 rounded p-2.5 hover:bg-white/[0.03] hover:text-text-primary transition-colors cursor-pointer',
        className,
      )}
      {...props}
      asChild
    >
      <Link href={href as string}>
        <div className="bg-[#0c0c0e] flex aspect-square h-11 w-11 shrink-0 items-center justify-center rounded border border-white/[0.04]">
          <Icon className="text-text-muted h-4.5 w-4.5" />
        </div>
        <div className="flex flex-col items-start justify-center min-w-0">
          <span className="text-[12.5px] font-normal text-text-primary tracking-tight">{title}</span>
          {description && (
            <span className="text-[11px] text-text-muted font-light leading-snug mt-0.5 line-clamp-1">{description}</span>
          )}
        </div>
      </Link>
    </NavigationMenuLink>
  );
}

/* ─── Mobile List Item ─── */

function MobileListItem({
  title,
  icon: Icon,
  href,
  onSelect,
}: LinkItem & { onSelect: () => void }) {
  return (
    <Link
      href={href}
      onClick={onSelect}
      className="flex items-center gap-3.5 px-2.5 py-2.5 rounded text-[13px] text-text-secondary hover:text-text-primary hover:bg-white/[0.02] transition-colors font-light"
    >
      <Icon className="h-[18px] w-[18px] text-text-muted shrink-0" />
      <span>{title}</span>
    </Link>
  );
}
