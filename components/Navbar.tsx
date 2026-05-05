'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, Moon, Sun, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Loans', href: '#loans' },
    { name: 'Process', href: '#process' },
    { name: 'Calculator', href: '#calculator' },
    { name: 'About Us', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-white font-bold text-base font-heading tracking-tight">RF</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-heading font-bold text-[1.1rem] text-brand-text dark:text-white">
              Reliant Fincare
            </span>
            <span className="text-[0.58rem] font-semibold tracking-widest text-brand-primary uppercase">
              Pvt Ltd · Financial Services
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-brand-primary dark:text-slate-300 dark:hover:text-brand-primary-light transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300 rounded-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+917702523998"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-primary transition-colors px-3 py-2"
          >
            <Phone size={15} className="text-brand-accent" />
            7702523998
          </a>
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}
          <Link href="/apply" className="btn-primary inline-flex items-center gap-2">
            Apply Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl"
          >
            <div className="px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-800 dark:text-slate-200 py-3 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                <a
                  href="tel:+917702523998"
                  className="flex items-center gap-2 text-sm font-semibold text-brand-primary py-2 px-3"
                >
                  <Phone size={15} /> 7702523998
                </a>
                <Link
                  href="/apply"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary text-center"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
