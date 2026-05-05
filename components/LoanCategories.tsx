'use client';

import { motion } from 'motion/react';
import { Home, GraduationCap, User, Briefcase, Building, Car, ArrowRight, Wallet, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import type { TargetAndTransition, Transition } from 'motion/react';

interface Category {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accentColor: string;
  // light-mode 3D colors
  lightFrom: string;
  lightTo: string;
  lightGlow: string;
  // dark-mode 3D metallic colors
  dark3dFrom: string;
  dark3dTo: string;
  dark3dGlow: string;
  iconAnim: {
    animate: TargetAndTransition;
    transition: Transition;
  };
}

const categories: Category[] = [
  {
    id: 'home', title: 'Home Loan',
    description: 'Build your dream home with flexible, low-interest home financing options.',
    icon: Home, accentColor: 'hover:border-blue-400',
    lightFrom: '#3B82F6', lightTo: '#1D4ED8', lightGlow: 'rgba(59,130,246,0.45)',
    dark3dFrom: '#FBBF24', dark3dTo: '#D97706', dark3dGlow: 'rgba(251,191,36,0.55)',
    iconAnim: { animate: { y: [0, -8, 0] }, transition: { duration: 2, ease: 'easeInOut' as const, repeat: Infinity, repeatDelay: 1.5 } },
  },
  {
    id: 'mortgage', title: 'Mortgage Loan',
    description: 'Unlock the value of your property with high-value loans against real estate.',
    icon: Building, accentColor: 'hover:border-indigo-400',
    lightFrom: '#6366F1', lightTo: '#4338CA', lightGlow: 'rgba(99,102,241,0.45)',
    dark3dFrom: '#C084FC', dark3dTo: '#7C3AED', dark3dGlow: 'rgba(192,132,252,0.5)',
    iconAnim: { animate: { scale: [1, 1.18, 1, 1.08, 1] }, transition: { duration: 1.4, repeat: Infinity, repeatDelay: 2 } },
  },
  {
    id: 'working-capital', title: 'Working Capital',
    description: 'Keep your business operations running smoothly with quick working capital loans.',
    icon: Wallet, accentColor: 'hover:border-emerald-400',
    lightFrom: '#10B981', lightTo: '#059669', lightGlow: 'rgba(16,185,129,0.45)',
    dark3dFrom: '#34D399', dark3dTo: '#059669', dark3dGlow: 'rgba(52,211,153,0.5)',
    iconAnim: { animate: { rotateY: [0, 25, -12, 0] }, transition: { duration: 1.2, repeat: Infinity, repeatDelay: 2 } },
  },
  {
    id: 'personal', title: 'Personal Loan',
    description: 'Quick funds for medical emergencies, weddings, or any personal financial need.',
    icon: User, accentColor: 'hover:border-orange-400',
    lightFrom: '#F97316', lightTo: '#EA580C', lightGlow: 'rgba(249,115,22,0.45)',
    dark3dFrom: '#FB923C', dark3dTo: '#EA580C', dark3dGlow: 'rgba(251,146,60,0.55)',
    iconAnim: { animate: { rotate: [0, -15, 12, -8, 0] }, transition: { duration: 1.2, repeat: Infinity, repeatDelay: 2 } },
  },
  {
    id: 'business', title: 'Business Loan',
    description: 'Fuel your business growth with collateral-free working capital and expansion loans.',
    icon: Briefcase, accentColor: 'hover:border-purple-400',
    lightFrom: '#A855F7', lightTo: '#7C3AED', lightGlow: 'rgba(168,85,247,0.45)',
    dark3dFrom: '#F472B6', dark3dTo: '#BE185D', dark3dGlow: 'rgba(244,114,182,0.5)',
    iconAnim: { animate: { rotate: [0, -12, 10, -5, 0], y: [0, -5, 0] }, transition: { duration: 1.3, repeat: Infinity, repeatDelay: 2 } },
  },
  {
    id: 'used-car', title: 'Used Car Loan',
    description: 'Drive home your dream car with up to 100% on-road funding and easy EMIs.',
    icon: Car, accentColor: 'hover:border-cyan-400',
    lightFrom: '#06B6D4', lightTo: '#0E7490', lightGlow: 'rgba(6,182,212,0.45)',
    dark3dFrom: '#22D3EE', dark3dTo: '#0E7490', dark3dGlow: 'rgba(34,211,238,0.5)',
    iconAnim: { animate: { x: [0, 10, -5, 0] }, transition: { duration: 1.2, ease: 'easeInOut' as const, repeat: Infinity, repeatDelay: 2 } },
  },
  {
    id: 'education', title: 'Education Loan',
    description: 'Invest in your future with loans designed for higher education in India and abroad.',
    icon: GraduationCap, accentColor: 'hover:border-pink-400',
    lightFrom: '#EC4899', lightTo: '#BE185D', lightGlow: 'rgba(236,72,153,0.45)',
    dark3dFrom: '#FBBF24', dark3dTo: '#B45309', dark3dGlow: 'rgba(251,191,36,0.55)',
    iconAnim: { animate: { y: [0, -12, 0], rotate: [0, 22, 0] }, transition: { duration: 1.3, repeat: Infinity, repeatDelay: 2 } },
  },
  {
    id: 'purchase', title: 'Purchase Loan',
    description: 'Easy financing for consumer durables, electronics, and large purchases.',
    icon: ShoppingCart, accentColor: 'hover:border-rose-400',
    lightFrom: '#F43F5E', lightTo: '#BE123C', lightGlow: 'rgba(244,63,94,0.45)',
    dark3dFrom: '#A78BFA', dark3dTo: '#6D28D9', dark3dGlow: 'rgba(167,139,250,0.5)',
    iconAnim: { animate: { x: [0, -6, 6, -3, 0] }, transition: { duration: 1.1, repeat: Infinity, repeatDelay: 2 } },
  },
];

// ── 3D metallic icon — renders in both light and dark mode ──────────────────
function Icon3D({
  icon: Icon,
  lightFrom, lightTo, lightGlow,
  dark3dFrom, dark3dTo, dark3dGlow,
  anim,
}: {
  icon: LucideIcon;
  lightFrom: string; lightTo: string; lightGlow: string;
  dark3dFrom: string; dark3dTo: string; dark3dGlow: string;
  anim: Category['iconAnim'];
}) {
  return (
    <motion.div
      animate={anim.animate as TargetAndTransition}
      transition={anim.transition as Transition}
      className="relative mb-5 w-fit"
    >
      {/* ── Light mode: clean soft flat icon ── */}
      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center dark:hidden"
        style={{ background: `${lightFrom}18` }}
      >
        <Icon size={26} style={{ color: lightFrom }} strokeWidth={1.75} />
      </div>

      {/* ── Dark mode: full 3D metallic block ── */}
      {/* Ground glow */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full blur-md hidden dark:block"
        style={{ background: dark3dGlow }}
      />
      {/* Face */}
      <div
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden hidden dark:flex"
        style={{
          background: `linear-gradient(145deg, ${dark3dFrom} 0%, ${dark3dTo} 100%)`,
          boxShadow: `4px 6px 0px rgba(0,0,0,0.40), 0 14px 32px ${dark3dGlow}, inset 0 1px 0 rgba(255,255,255,0.40), inset 0 -2px 4px rgba(0,0,0,0.25)`,
          transform: 'perspective(180px) rotateX(10deg) rotateY(-4deg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/5 to-transparent rounded-2xl pointer-events-none" />
        <Icon size={28} color="white" strokeWidth={1.75} />
      </div>
      {/* Right side */}
      <div className="absolute top-[6px] -right-[4px] w-[5px] h-[calc(100%-8px)] rounded-r-lg hidden dark:block"
        style={{ background: dark3dTo, filter: 'brightness(0.55)' }} />
      {/* Bottom */}
      <div className="absolute -bottom-[4px] left-[6px] h-[5px] w-[calc(100%-8px)] rounded-b-lg hidden dark:block"
        style={{ background: dark3dTo, filter: 'brightness(0.45)' }} />
    </motion.div>
  );
}

export default function LoanCategories() {
  return (
    <section id="loans" className="py-24 bg-white dark:bg-slate-900 relative">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Our Products</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Financial Solutions for Every Need
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Explore our comprehensive range of loan products tailored to help you achieve your personal and business goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className={`group bg-white dark:bg-slate-800/60 rounded-2xl p-6 border-2 border-brand-border dark:border-slate-700/60 ${category.accentColor} dark:hover:border-brand-primary-light hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col`}
            >
              <Icon3D
                icon={category.icon}
                lightFrom={category.lightFrom}
                lightTo={category.lightTo}
                lightGlow={category.lightGlow}
                dark3dFrom={category.dark3dFrom}
                dark3dTo={category.dark3dTo}
                dark3dGlow={category.dark3dGlow}
                anim={category.iconAnim}
              />

              <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white mb-2">
                {category.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                {category.description}
              </p>

              <Link
                href="/apply"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary dark:text-brand-primary-light group-hover:gap-2.5 transition-all duration-200"
              >
                Apply Now <ArrowRight size={15} />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
