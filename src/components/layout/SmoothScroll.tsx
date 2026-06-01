'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.08,
      wheelMultiplier: 1.0,
      syncTouch: false,
    });

    let rafId: number;
    let running = true;

    function raf(time: number) {
      if (!running) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Pause Lenis RAF when tab is hidden, resume when visible.
    // Without this, the RAF loop accumulates stale time deltas while the tab
    // is backgrounded, causing scroll-position de-sync on return which can
    // break scroll-driven transforms (e.g. the header's useScroll spring).
    const handleVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else {
        if (!running) {
          running = true;
          rafId = requestAnimationFrame(raf);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <>{children}</>;
}
