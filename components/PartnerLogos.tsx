'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const partners = [
  // ── Government Banks ──────────────────────────────────────────────────────
  { name: 'State Bank of India',  logo: 'https://logo.clearbit.com/sbi.co.in' },
  { name: 'Bank of Baroda',       logo: 'https://logo.clearbit.com/bankofbaroda.in' },
  { name: 'Punjab National Bank', logo: 'https://logo.clearbit.com/pnbindia.in' },
  { name: 'Canara Bank',          logo: 'https://logo.clearbit.com/canarabank.in' },
  { name: 'Union Bank of India',  logo: 'https://logo.clearbit.com/unionbankofindia.co.in' },
  { name: 'Bank of India',        logo: 'https://logo.clearbit.com/bankofindia.co.in' },
  { name: 'Indian Bank',          logo: 'https://logo.clearbit.com/indianbank.in' },
  // ── Private Banks ─────────────────────────────────────────────────────────
  { name: 'HDFC Bank',            logo: 'https://logo.clearbit.com/hdfcbank.com' },
  { name: 'ICICI Bank',           logo: 'https://logo.clearbit.com/icicibank.com' },
  { name: 'Axis Bank',            logo: 'https://logo.clearbit.com/axisbank.com' },
  { name: 'Kotak Mahindra Bank',  logo: 'https://logo.clearbit.com/kotak.com' },
  { name: 'Yes Bank',             logo: 'https://logo.clearbit.com/yesbank.in' },
  { name: 'IndusInd Bank',        logo: 'https://logo.clearbit.com/indusind.com' },
  { name: 'IDFC First Bank',      logo: 'https://logo.clearbit.com/idfcfirstbank.com' },
  { name: 'Federal Bank',         logo: 'https://logo.clearbit.com/federalbank.co.in' },
  { name: 'Bandhan Bank',         logo: 'https://logo.clearbit.com/bandhanbank.com' },
  { name: 'RBL Bank',             logo: 'https://logo.clearbit.com/rblbank.com' },
  // ── NBFCs ─────────────────────────────────────────────────────────────────
  { name: 'Bajaj Finance',        logo: 'https://logo.clearbit.com/bajajfinserv.in' },
  { name: 'Tata Capital',         logo: 'https://logo.clearbit.com/tatacapital.com' },
  { name: 'Muthoot Finance',      logo: 'https://logo.clearbit.com/muthootfinance.com' },
  { name: 'L&T Finance',          logo: 'https://logo.clearbit.com/ltfs.com' },
  { name: 'Aditya Birla Capital', logo: 'https://logo.clearbit.com/adityabirlacapital.com' },
  { name: 'Cholamandalam',        logo: 'https://logo.clearbit.com/cholamandalam.com' },
  { name: 'Mahindra Finance',     logo: 'https://logo.clearbit.com/mahindrafinance.com' },
  { name: 'HDB Financial',        logo: 'https://logo.clearbit.com/hdbfs.com' },
  { name: 'Fullerton India',      logo: 'https://logo.clearbit.com/fullertonindia.com' },
];

const row1 = [...partners.slice(0, 13), ...partners.slice(0, 13)];
const row2 = [...partners.slice(13),    ...partners.slice(13)];

function LogoItem({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex items-center gap-2.5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 shrink-0">
      <div className="relative w-9 h-9 md:w-10 md:h-10 overflow-hidden rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center flex-shrink-0">
        <Image
          src={logo}
          alt={name}
          fill
          sizes="40px"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="object-contain p-1.5"
        />
      </div>
      <span className="font-semibold font-heading text-sm md:text-base text-slate-700 dark:text-slate-300 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function PartnerLogos() {
  return (
    <section className="py-14 border-y border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">

      <div className="container mx-auto px-4 md:px-6 mb-8 text-center">
        <span className="section-label">Our Banking Partners</span>
        <p className="font-heading font-bold text-xl md:text-2xl text-slate-800 dark:text-white">
          Associated With All Government &amp; Private Banks and NBFCs
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative w-full overflow-hidden mb-5">
        <div className="absolute inset-y-0 left-0  w-20 md:w-36 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-36 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex items-center gap-8 md:gap-14 min-w-max px-8"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 38 }}
        >
          {row1.map((p, i) => <LogoItem key={`r1-${i}`} {...p} />)}
        </motion.div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0  w-20 md:w-36 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-36 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex items-center gap-8 md:gap-14 min-w-max px-8"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 38 }}
        >
          {row2.map((p, i) => <LogoItem key={`r2-${i}`} {...p} />)}
        </motion.div>
      </div>

    </section>
  );
}
