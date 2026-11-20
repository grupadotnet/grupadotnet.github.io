import { useState, useEffect, type RefObject } from 'react';

export function useScrollAndWidth(
  headerRef: RefObject<HTMLElement | null>,
  targetId: string,
  mobileBreakpoint = 768,
  fallbackThreshold = 50
) {
  const [state, setState] = useState(() => ({
    isMobile:
      typeof window !== 'undefined'
        ? window.innerWidth < mobileBreakpoint
        : false,
    isScrolled: false,
  }));

  useEffect(() => {
    const updateScrollAndWidth = () => {
      const nextIsMobile = window.innerWidth < mobileBreakpoint;
      const header = headerRef.current;

      let nextIsScrolled = false;
      if (header) {
        const target = document.getElementById(targetId);
        if (!target) {
          nextIsScrolled = window.scrollY > fallbackThreshold;
        } else {
          const headerRect = header.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          nextIsScrolled = targetRect.top <= headerRect.bottom;
        }
      }

      setState((prev) =>
        prev.isMobile === nextIsMobile && prev.isScrolled === nextIsScrolled
          ? prev
          : { isMobile: nextIsMobile, isScrolled: nextIsScrolled }
      );
    };

    updateScrollAndWidth();

    window.addEventListener('resize', updateScrollAndWidth);
    window.addEventListener('scroll', updateScrollAndWidth, { passive: true });

    return () => {
      window.removeEventListener('resize', updateScrollAndWidth);
      window.removeEventListener('scroll', updateScrollAndWidth);
    };
  }, [headerRef, targetId, mobileBreakpoint, fallbackThreshold]);

  return state;
}
