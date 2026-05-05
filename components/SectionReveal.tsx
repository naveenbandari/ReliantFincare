'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts */
  delay?: number;
  /** 'up' | 'down' | 'left' | 'right' | 'scale' */
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

const variants = {
  up:    { hidden: { opacity: 0, y: 48  }, visible: { opacity: 1, y: 0    } },
  down:  { hidden: { opacity: 0, y: -48 }, visible: { opacity: 1, y: 0    } },
  left:  { hidden: { opacity: 0, x: 48  }, visible: { opacity: 1, x: 0    } },
  right: { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0    } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
};

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants[direction]}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
