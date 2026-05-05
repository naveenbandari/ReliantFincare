'use client';

import { motion } from 'motion/react';
import { Smartphone, Zap, Banknote, CalendarCheck } from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: '100% Online Process',
    description: 'No physical paperwork. Apply from anywhere, anytime using your mobile or computer.',
    color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  },
  {
    icon: Zap,
    title: 'Instant Approval',
    description: 'Get your loan approved in minutes with our fast and secure digital verification.',
    color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  },
  {
    icon: Banknote,
    title: 'Quick Disbursal',
    description: 'Once approved, the amount is transferred directly to your bank account within hours.',
    color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: CalendarCheck,
    title: 'Flexible Repayment',
    description: 'Choose EMI options that fit your budget and repay over flexible tenures.',
    color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  },
];

const stats = [
  { value: '₹500Cr+', label: 'Loans Disbursed', gradient: 'from-brand-primary to-brand-secondary' },
  { value: '50K+', label: 'Happy Customers', gradient: 'from-brand-accent to-cyan-500' },
  { value: '98%', label: 'Approval Rate', gradient: 'from-brand-secondary to-purple-500' },
  { value: '< 24h', label: 'Avg. Disbursal', gradient: 'from-brand-gold to-orange-500' },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #1E3A8A 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Why Us</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-5">
              Why Choose Reliant Fincare?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
              Experience the fastest, most convenient way to get a loan. We make borrowing simple, quick, and completely hassle-free.
            </p>

            <div className="space-y-7">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-5"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${feature.color}`}>
                    <feature.icon size={22} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                className="relative rounded-3xl overflow-hidden p-8 flex flex-col justify-center items-center aspect-square text-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/30 dark:shadow-none group hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Gradient top accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />
                <h3 className={`font-mono text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </h3>
                <p className="font-semibold text-slate-500 dark:text-slate-400 text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
