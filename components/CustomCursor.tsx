'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const visible = useRef(false);

  // Inner dot — snaps instantly
  const dotX = useSpring(mouseX, { damping: 50, stiffness: 600 });
  const dotY = useSpring(mouseY, { damping: 50, stiffness: 600 });

  // Outer orb — lags behind for 3D parallax feel
  const orbX = useSpring(mouseX, { damping: 28, stiffness: 180 });
  const orbY = useSpring(mouseY, { damping: 28, stiffness: 180 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible.current) visible.current = true;
    };

    const onDown  = () => setClicked(true);
    const onUp    = () => setClicked(false);

    // Detect hover on interactive elements
    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(true);
      }
    };
    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(false);
      }
    };

    // Sync dark mode
    const syncDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    const obs = new MutationObserver(syncDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    syncDark();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    document.addEventListener('mouseover',  onEnter);
    document.addEventListener('mouseout',   onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      document.removeEventListener('mouseover',  onEnter);
      document.removeEventListener('mouseout',   onLeave);
      obs.disconnect();
    };
  }, [mouseX, mouseY]);

  // Colors per theme
  const primary     = isDark ? '#F45C0A' : '#1E3A8A';
  const primaryMid  = isDark ? '#C2410C' : '#1D4ED8';
  const glow        = isDark ? 'rgba(244,92,10,0.45)'  : 'rgba(30,58,138,0.35)';
  const glowHover   = isDark ? 'rgba(244,92,10,0.70)'  : 'rgba(30,58,138,0.55)';

  return (
    <>
      {/* ── Outer 3D orb ────────────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{ x: orbX, y: orbY }}
        animate={{
          width:  hovered ? 52 : clicked ? 28 : 40,
          height: hovered ? 52 : clicked ? 28 : 40,
          translateX: hovered ? '-50%' : clicked ? '-50%' : '-50%',
          translateY: hovered ? '-50%' : clicked ? '-50%' : '-50%',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at 32% 32%, ${hovered ? '#fff' : 'rgba(255,255,255,0.85)'} 0%, ${primary} 45%, ${primaryMid} 100%)`,
            boxShadow: `
              0 0 ${hovered ? 24 : 14}px ${hovered ? glowHover : glow},
              inset 0 -3px 8px rgba(0,0,0,0.30),
              inset 0 2px 5px rgba(255,255,255,0.45)
            `,
            transform: clicked ? 'scale(0.88)' : 'scale(1)',
            transition: 'transform 0.1s ease, box-shadow 0.2s ease',
          }}
        />
      </motion.div>

      {/* ── Inner dot ────────────────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: dotX, y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width:  4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: hovered ? '#fff' : primary,
          boxShadow: `0 0 6px ${glow}`,
        }}
        animate={{ scale: hovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
