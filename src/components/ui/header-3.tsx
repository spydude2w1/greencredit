'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import {
  motion,
  useScroll as useFramerScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { LucideIcon } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';
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
    href: '/enterprise/reports',
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

/* ─── Spring Configs ─── */

const SPRING_SMOOTH = { stiffness: 280, damping: 32, mass: 0.8 };
const SPRING_SNAPPY = { stiffness: 400, damping: 38, mass: 0.6 };

/* ─── Floating Nav Scroll System ─── */

function useFloatingNav() {
  const { scrollY } = useFramerScroll();

  // Smooth the raw scroll value for fluid interpolation
  const smoothScroll = useSpring(scrollY, SPRING_SMOOTH);

  // Progress: 0 (hero) → 1 (compact), mapped across 0–200px scroll
  const progress = useTransform(smoothScroll, [0, 200], [0, 1]);

  // ── Dimensional transforms ──
  // Width: 82vw → 520px (compact pill)
  // These are expressed as percentages for responsive behavior
  const widthPercent = useTransform(progress, [0, 1], [82, 36]);
  const width = useTransform(widthPercent, (v) => `${Math.max(v, 36)}%`);
  const minWidth = useTransform(progress, [0, 1], ['520px', '520px']);

  const height = useTransform(progress, [0, 1], [76, 48]);
  const heightPx = useTransform(height, (v) => `${v}px`);

  const topOffset = useTransform(progress, [0, 1], [16, 12]);
  const top = useTransform(topOffset, (v) => `${v}px`);

  // ── Border radius — moderate, not excessively rounded ──
  const borderRadius = useTransform(progress, [0, 1], [14, 24]);
  const borderRadiusPx = useTransform(borderRadius, (v) => `${v}px`);

  // ── Glassmorphism ──
  const bgOpacity = useTransform(progress, [0, 1], [0.55, 0.82]);
  const backgroundColor = useTransform(
    bgOpacity,
    (v) => `rgba(9, 9, 11, ${v})`
  );

  const blurAmount = useTransform(progress, [0, 1], [10, 20]);
  const backdropFilter = useTransform(blurAmount, (v) => `blur(${v}px)`);

  const borderOpacity = useTransform(progress, [0, 1], [0.06, 0.10]);
  const borderColor = useTransform(
    borderOpacity,
    (v) => `rgba(255, 255, 255, ${v})`
  );

  // Shadow deepens in compact mode
  const shadowSpread = useTransform(progress, [0, 1], [24, 32]);
  const shadowOpacity = useTransform(progress, [0, 1], [0.25, 0.45]);
  const boxShadow = useTransform(
    [shadowSpread, shadowOpacity] as MotionValue[],
    ([spread, opacity]: number[]) =>
      `0 8px ${spread}px rgba(0, 0, 0, ${opacity}), inset 0 1px 0 rgba(255, 255, 255, 0.03)`
  );

  // ── Inner layout ──
  const paddingX = useTransform(progress, [0, 1], [28, 18]);
  const paddingXPx = useTransform(paddingX, (v) => `${v}px`);

  // ── Logo ──
  const logoScale = useTransform(progress, [0, 1], [1, 0.92]);

  // ── Apply springs to everything for weighted motion ──
  return {
    width: useSpring(width, SPRING_SMOOTH) as unknown as MotionValue<string>,
    minWidth,
    heightPx: useSpring(heightPx, SPRING_SMOOTH) as unknown as MotionValue<string>,
    top: useSpring(top, SPRING_SMOOTH) as unknown as MotionValue<string>,
    borderRadiusPx: useSpring(borderRadiusPx, SPRING_SMOOTH) as unknown as MotionValue<string>,
    backgroundColor: useSpring(backgroundColor, SPRING_SMOOTH) as unknown as MotionValue<string>,
    backdropFilter: useSpring(backdropFilter, SPRING_SMOOTH) as unknown as MotionValue<string>,
    borderColor: useSpring(borderColor, SPRING_SMOOTH) as unknown as MotionValue<string>,
    boxShadow: useSpring(boxShadow, SPRING_SMOOTH) as unknown as MotionValue<string>,
    paddingXPx: useSpring(paddingXPx, SPRING_SMOOTH) as unknown as MotionValue<string>,
    logoScale: useSpring(logoScale, SPRING_SMOOTH),
    progress,
    scrollY,
  };
}

/* ─── Auto-Hide / Reveal Hook ─── */

function useAutoHide(scrollY: MotionValue<number>) {
  const [hidden, setHidden] = React.useState(false);
  const lastScrollY = React.useRef(0);
  const lastDirection = React.useRef<'up' | 'down'>('up');

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const delta = latest - lastScrollY.current;

    // Always show at top of page
    if (latest < 60) {
      setHidden(false);
      lastScrollY.current = latest;
      lastDirection.current = 'up';
      return;
    }

    // Threshold to prevent jitter from micro-scrolls
    if (Math.abs(delta) < 8) return;

    const direction = delta > 0 ? 'down' : 'up';

    if (direction !== lastDirection.current) {
      lastDirection.current = direction;
    }

    setHidden(direction === 'down');
    lastScrollY.current = latest;
  });

  // Spring-animated Y position for hide/reveal
  const translateY = useSpring(hidden ? -120 : 0, SPRING_SNAPPY);

  React.useEffect(() => {
    translateY.set(hidden ? -120 : 0);
  }, [hidden, translateY]);

  return translateY;
}

/* ─── Main Header ─── */

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [isCompact, setIsCompact] = React.useState(false);

  const nav = useFloatingNav();
  const translateY = useAutoHide(nav.scrollY);

  // Track compact state for conditional rendering
  useMotionValueEvent(nav.progress, 'change', (latest) => {
    setIsCompact(latest > 0.6);
  });

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <motion.header
      style={{
        position: 'fixed',
        top: nav.top,
        left: '50%',
        x: '-50%',
        y: translateY,
        width: nav.width,
        minWidth: nav.minWidth,
        height: nav.heightPx,
        borderRadius: nav.borderRadiusPx,
        backgroundColor: nav.backgroundColor,
        backdropFilter: nav.backdropFilter,
        WebkitBackdropFilter: nav.backdropFilter,
        borderColor: nav.borderColor,
        boxShadow: nav.boxShadow,
      }}
      className="z-[1000] border overflow-visible"
    >
      {/* Subtle top highlight line */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.06) 50%, transparent 90%)',
          borderRadius: 'inherit',
        }}
      />

      <motion.nav
        style={{
          paddingLeft: nav.paddingXPx,
          paddingRight: nav.paddingXPx,
        }}
        className="flex h-full w-full items-center justify-between"
      >
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <motion.div style={{ scale: nav.logoScale }}>
            <BrandLogo size={28} className="opacity-90 group-hover:opacity-100 transition-opacity" />
          </motion.div>
          <span
            className={cn(
              'text-[13.5px] font-normal text-text-primary tracking-tight transition-opacity duration-300',
              isCompact ? 'hidden lg:block' : 'hidden sm:block'
            )}
          >
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
          {!isCompact ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/login">Launch Platform</Link>
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[11.5px] font-normal text-text-muted hover:text-text-primary transition-colors px-2"
              >
                Sign In
              </Link>
              <Button size="sm" className="h-7 px-3 text-[11px]" asChild>
                <Link href="/login">Launch</Link>
              </Button>
            </>
          )}
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
      </motion.nav>

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
    </motion.header>
  );
}

/* ─── Mobile Menu Portal ─── */

type MobileMenuProps = React.ComponentProps<'div'> & { open: boolean };

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === 'undefined') return null;

  return createPortal(
    <div
      id="mobile-menu"
      className="glass-tactical fixed top-0 right-0 bottom-0 left-0 z-[999] flex flex-col overflow-hidden md:hidden pt-24"
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
