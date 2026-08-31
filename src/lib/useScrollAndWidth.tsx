import { useState, useEffect, RefObject } from 'react';

export function useScrollAndWidth(
  headerRef: RefObject<HTMLElement | null>,
  targetId: string,
  mobileBreakpoint = 768,
  fallbackThreshold = 50
) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < mobileBreakpoint;
    }
    return false;
  });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkOverlap = () => {
      const header = headerRef.current;
      if (!header) return;

      const target = document.getElementById(targetId);

      // If we are on a different page and the element doesn't exist, fallback to a standard scroll check
      if (!target) {
        setIsScrolled(window.scrollY > fallbackThreshold);
        return;
      }

      const headerRect = header.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      setIsScrolled(targetRect.top <= headerRect.bottom);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
      checkOverlap();
    };

    checkOverlap();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', checkOverlap, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', checkOverlap);
    };
  }, [headerRef, targetId, mobileBreakpoint, fallbackThreshold]);

  return { isMobile, isScrolled } as const;
}
