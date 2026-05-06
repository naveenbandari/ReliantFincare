'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="py-10 sm:py-14 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #4338CA 50%, #1E3A8A 100%)' }}
        >
          {/* Background Orbs */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-accent/15 rounded-full filter blur-3xl -translate-x-1/4 translate-y-1/4" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
          </div>

          <div className="relative z-10 px-5 sm:px-8 py-10 sm:py-16 md:py-20 md:px-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

              {/* Text */}
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex max-w-full items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-[11px] sm:text-xs font-semibold uppercase tracking-wide sm:tracking-widest mb-5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent-light opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent-light" />
                  </span>
                  Apply in under 2 minutes
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  Ready to take the next step?
                </h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  Join thousands of satisfied customers who trust Reliant Fincare for their financial needs. Apply today and get approved in minutes.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 flex-shrink-0 w-full sm:w-auto lg:w-auto">
                <Link
                  href="/apply"
                  className="inline-flex justify-center items-center gap-2 bg-white text-brand-primary px-5 sm:px-8 py-4 rounded-xl font-bold text-base hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  Apply Now <ArrowRight size={19} />
                </Link>
                <a
                  href="tel:+917702523998"
                  className="inline-flex justify-center items-center gap-2 bg-white/10 border-2 border-white/30 text-white px-5 sm:px-8 py-4 rounded-xl font-bold text-base hover:bg-white/20 transition-all backdrop-blur-sm"
                >
                  <Phone size={18} />
                  Talk to Expert
                </a>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
