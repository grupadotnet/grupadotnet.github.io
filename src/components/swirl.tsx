import { useEffect, useState } from 'react';

export default function BackgroundSwirl() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-clip bg-(--primary-to) *:blur-[120px]">
      {/* 1st Layer: Broad, dense sweep (Capped at 40%-60% for thicker structure) */}
      <div
        className="absolute left-1/2 top-1/2 h-[150vmax] w-[150vmax] -translate-x-1/2 -translate-y-1/2 animate-[spin_24s_linear_infinite] rounded-full opacity-70 "
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, transparent 0%, var(--primary-from) 40%, var(--primary-from) 60%, transparent 100%)',
        }}
      />

      {/* 2nd Layer: Off-center wobble */}
      <div
        className="absolute left-1/2 top-1/2 h-[130vmax] w-[130vmax] -translate-x-1/2 -translate-y-1/2 animate-[spin_18s_linear_infinite_reverse] rounded-full opacity-60 "
        style={{
          background:
            'conic-gradient(from 90deg at 40% 60%, transparent 0%, var(--primary-from) 30%, transparent 60%)',
        }}
      />

      {/* 3rd Layer: Complex interference (Multiple capped blobs) */}
      <div
        className="absolute left-1/2 top-1/2 h-[110vmax] w-[110vmax] -translate-x-1/2 -translate-y-1/2 animate-[spin_30s_linear_infinite] rounded-full opacity-60 "
        style={{
          background:
            'conic-gradient(from 180deg at 60% 40%, transparent 0%, var(--primary-from) 20%, transparent 40%, var(--primary-from) 60%, transparent 80%)',
        }}
      />

      {/* Cursor Follower Orb */}
      <div
        className="absolute left-0 top-0 h-[40vmax] w-[40vmax] rounded-full opacity-80 pointer-events-none transition-transform duration-50 ease-out"
        style={{
          background:
            'radial-gradient(circle, var(--primary-from) 0%, transparent 70%)',
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </div>
  );
}
