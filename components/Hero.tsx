'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Clock, Star } from 'lucide-react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

const ParticleGlobe = dynamic(() => import('./ParticleGlobe'), { ssr: false });

const stats = [
  { value: '₹500Cr+', label: 'Disbursed' },
  { value: '50K+', label: 'Customers' },
  { value: '98%', label: 'Approval' },
];

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-brand-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-brand-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-40 w-80 h-80 bg-brand-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000" />
      </div>

      {/* Globe — centered, 80% of viewport */}
      <ParticleGlobe
        isDark={isDark}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] z-0 pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 text-brand-primary dark:text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
              </span>
              Trusted by 50,000+ Happy Borrowers
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.08]">
              Smart Loans.<br />
              <span className="text-gradient">Zero Hassle.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
              Get personal, business, and home loans with minimal documentation. Quick approvals and direct bank transfers — fulfill your dreams today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/apply" className="btn-primary inline-flex justify-center items-center gap-2 text-base px-8 py-4">
                Apply Now <ArrowRight size={18} />
              </Link>
              <Link href="#calculator" className="btn-outline inline-flex justify-center items-center gap-2 text-base px-8 py-4">
                Calculate EMI
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 mb-10">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-brand-accent" /> Quick Disbursal
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-brand-accent" /> Minimal Docs
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-brand-accent" /> No Hidden Fees
              </div>
            </div>

            {/* Stats Strip */}
            <div className="flex items-center gap-0 rounded-2xl overflow-hidden border border-brand-border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm w-fit">
              {stats.map((s, i) => (
                <div key={i} className={`px-6 py-4 text-center ${i < stats.length - 1 ? 'border-r border-brand-border dark:border-slate-800' : ''}`}>
                  <p className="font-heading font-bold text-xl text-brand-primary dark:text-blue-400">{s.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{s.label}</p>
                </div>
              ))}
              <div className="px-6 py-4 border-l border-brand-border dark:border-slate-800 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-brand-gold fill-brand-gold" />
                ))}
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 ml-1">4.9</span>
              </div>
            </div>
          </motion.div>

          {/* Visual Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Main Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="glass-card rounded-3xl overflow-hidden w-full max-w-md relative z-20"
            >
              {/* Gradient Card Header */}
              <div className="bg-gradient-to-r from-brand-primary to-brand-secondary px-6 py-4 flex justify-between items-center">
                <div>
                  <p className="text-xs text-blue-200 font-medium">Pre-Approved Amount</p>
                  <h3 className="font-mono text-2xl font-bold text-white mt-0.5">₹ 25,00,000</h3>
                </div>
                <div className="bg-white/20 backdrop-blur-sm text-white p-2.5 rounded-full">
                  <TrendingUp size={22} />
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-5">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Interest Rate</span>
                      <span className="font-bold text-brand-primary dark:text-blue-400">Starting @ 8.5%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary h-2 rounded-full w-[85%]" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm py-3 border-y border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Tenure</span>
                    <span className="font-bold text-slate-900 dark:text-white">Up to 20 Years</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Processing Fee</span>
                    <span className="font-bold text-brand-accent">Minimal / Nil</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-200">
                  View Details & Apply
                </button>
              </div>
            </motion.div>

            {/* Floating Badge — Security */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -left-6 top-16 glass-card rounded-2xl p-4 flex items-center gap-3 z-30 shadow-xl"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 text-brand-primary p-2.5 rounded-full">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Bank-Grade</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Security</p>
              </div>
            </motion.div>

            {/* Floating Badge — Approval Time */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 1 }}
              className="absolute -right-4 bottom-24 glass-card rounded-2xl p-4 flex items-center gap-3 z-30 shadow-xl"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/30 text-brand-secondary p-2.5 rounded-full">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Approval Time</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">&lt; 24 Hours</p>
              </div>
            </motion.div>

            {/* Floating Badge — Rating */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 0.3 }}
              className="absolute right-8 top-8 glass-card rounded-2xl p-3.5 flex items-center gap-2.5 z-30 shadow-xl"
            >
              <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-500 p-2 rounded-full">
                <Star size={16} fill="currentColor" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Rating</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">4.9 / 5.0</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
