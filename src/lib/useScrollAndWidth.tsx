import { useState, useEffect } from 'react';

export function useScrollAndWidth(
  mobileBreakpoint = 768,
  scrollThreshold = 300
) {
  // 1. Initialize state dynamically by checking the window right away.
  // We use a callback function () => {} so this logic only runs once on mount.
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < mobileBreakpoint;
    }
    return false; // Fallback for Server-Side Rendering
  });

  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > scrollThreshold;
    }
    return false; // Fallback for Server-Side Rendering
  });

  useEffect(() => {
    // 2. The linter is happy! No synchronous state setters here anymore.

    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    // 3. Attach listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 4. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileBreakpoint, scrollThreshold]);

  return { isMobile, isScrolled } as const;
}
