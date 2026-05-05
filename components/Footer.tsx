'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: 'Twitter / X',
    href: '#',
    svg: <path d="M4 4l16 16M4 20L20 4" />,
  },
  {
    label: 'Instagram',
    href: '#',
    svg: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    svg: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-md flex-shrink-0">
                <span className="text-white font-bold text-base font-heading">RF</span>
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-white leading-tight block">Reliant Fincare</span>
                <span className="text-[0.6rem] font-semibold tracking-widest text-brand-primary-light uppercase">Pvt Ltd · Financial Services</span>
              </div>
            </Link>

            <p className="text-slate-400 mb-6 leading-relaxed text-sm">
              Empowering your financial journey with smart, transparent, and fast loan solutions. Your trusted partner in growth.
            </p>

            {/* Trust Badge */}
            <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-4 py-3 mb-6 border border-slate-700 w-fit">
              <ShieldCheck size={18} className="text-brand-accent flex-shrink-0" />
              <span className="text-xs font-semibold text-slate-300">RBI Registered NBFC</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {s.svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white mb-6">Products</h4>
            <ul className="space-y-3">
              {['Home Loans', 'Personal Loans', 'Business Loans', 'Education Loans', 'Car Loans', 'Mortgage Loans'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-brand-primary-light transition-colors text-sm flex items-center gap-1.5 group">
                    <ArrowRight size={13} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Press & Media', 'Investor Relations', 'Contact Us', 'Blog'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-brand-primary-light transition-colors text-sm flex items-center gap-1.5 group">
                    <ArrowRight size={13} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <MapPin size={17} className="text-brand-primary-light shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">123 Financial District, Cyber City, Mumbai, India 400001</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={17} className="text-brand-primary-light shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold text-sm block">Feroz — 7702523998</span>
                  <span className="text-slate-400 text-xs">Home & Education Loan Counselor</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={17} className="text-brand-primary-light shrink-0" />
                <span className="text-slate-400 text-sm">support@reliantfincare.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-white mb-3">Get loan updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-brand-primary-light transition-colors min-w-0"
                />
                <button className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Reliant Fincare Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Disclaimer', 'Grievance Redressal'].map((item) => (
              <Link key={item} href="#" className="text-slate-500 hover:text-brand-primary-light transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
