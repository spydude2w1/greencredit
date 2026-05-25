import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo?: React.ReactNode;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#120F17',
  hoveredPillTextColor = '#120F17',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLDivElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
    }

    if (initialLoadAnimation) {
      const currentLogo = logoRef.current;
      const navItems = navItemsRef.current;

      if (currentLogo) {
        gsap.set(currentLogo, { scale: 0 });
        gsap.to(currentLogo, {
          scale: 1,
          duration: 0.6,
          ease
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease
        });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }

    onMobileMenuClick?.();
  };

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--nav-h']: '46px',
    ['--logo']: '46px',
    ['--pill-pad-x']: '20px',
    ['--pill-gap']: '6px'
  } as React.CSSProperties;

  return (
    <div className="fixed top-4 z-[1000] w-full flex justify-center pointer-events-none">
      <nav
        className={`w-full max-w-7xl md:w-max flex items-center justify-between box-border px-4 md:px-0 pointer-events-auto ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        <Link
          href="/"
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          role="menuitem"
          ref={logoRef}
          className="rounded-full p-2 inline-flex items-center gap-3 justify-center overflow-hidden"
          style={{
            height: 'var(--nav-h)',
            background: 'var(--base, #000)'
          }}
        >
          <div ref={logoImgRef} className="h-full w-auto aspect-square flex items-center justify-center rounded-full bg-[#120F17]">
            {logo}
          </div>
          <span className="font-bold text-[#120F17] pr-3 hidden md:block">Green Credit AI</span>
        </Link>

        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex ml-4"
          style={{
            height: 'var(--nav-h)',
            background: 'var(--base, #000)'
          }}
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 p-[4px] h-full"
            style={{ gap: 'var(--pill-gap)' }}
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;

              const pillStyle: React.CSSProperties = {
                background: 'var(--pill-bg, #fff)',
                color: 'var(--pill-text, var(--base, #000))',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)'
              };

              const PillContent = (
                <>
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                    style={{
                      background: 'var(--base, #000)',
                      willChange: 'transform'
                    }}
                    aria-hidden="true"
                    ref={el => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack relative inline-block leading-[1] z-[2]">
                    <span
                      className="pill-label relative z-[2] inline-block leading-[1]"
                      style={{ willChange: 'transform' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                      style={{
                        color: 'var(--hover-text, #fff)',
                        willChange: 'transform, opacity'
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {isActive && (
                    <span
                      className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"
                      style={{ background: 'var(--base, #000)' }}
                      aria-hidden="true"
                    />
                  )}
                </>
              );

              const basePillClasses =
                'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-medium text-[14px] leading-[0] tracking-[0.2px] whitespace-nowrap cursor-pointer px-0 transition-colors';

              return (
                <li key={item.href} role="none" className="flex h-full">
                  <Link
                    role="menuitem"
                    href={item.href}
                    className={basePillClasses}
                    style={pillStyle}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    {PillContent}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="hidden md:flex ml-4">
          <Link href="/login" className="px-6 rounded-full font-semibold text-[14px] flex items-center justify-center hover:opacity-90 transition-opacity text-[#120F17]" style={{ height: 'var(--nav-h)', background: 'var(--base)'}}>
            Get Started
          </Link>
        </div>

        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative ml-4 pointer-events-auto"
          style={{
            width: 'var(--nav-h)',
            height: 'var(--nav-h)',
            background: 'var(--base, #000)'
          }}
        >
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ background: 'var(--pill-bg, #fff)' }}
          />
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ background: 'var(--pill-bg, #fff)' }}
          />
        </button>
      </nav>

      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[4em] left-4 right-4 rounded-3xl shadow-2xl z-[998] origin-top p-2 pointer-events-auto border border-white/10"
        style={{
          ...cssVars,
          background: '#120F17'
        }}
      >
        <ul className="list-none m-0 p-[3px] flex flex-col gap-[8px]">
          {items.map(item => {
            const defaultStyle: React.CSSProperties = {
              background: '#1a1a1f',
              color: '#ffffff'
            };
            const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = 'var(--base)';
              e.currentTarget.style.color = 'var(--hover-text, #120F17)';
            };
            const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = '#1a1a1f';
              e.currentTarget.style.color = '#ffffff';
            };

            const linkClasses =
              'block py-4 px-6 text-[15px] font-medium rounded-2xl transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]';

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={linkClasses}
                  style={defaultStyle}
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
             <Link
                href="/login"
                className="block py-4 px-6 text-[15px] font-bold rounded-2xl text-center text-[#120F17]"
                style={{ background: 'var(--base)' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
