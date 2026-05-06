'use client';

import { motion } from 'motion/react';
import { FileText, UserCheck, ThumbsUp, IndianRupee } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Apply Online',
    description: 'Fill out our simple 2-minute online application form with your basic details.',
    gradient: 'from-blue-500 to-brand-primary',
    lightBg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: UserCheck,
    title: 'Quick Verification',
    description: 'Our system instantly verifies your documents and assesses your credit profile.',
    gradient: 'from-brand-secondary to-purple-600',
    lightBg: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
  {
    icon: ThumbsUp,
    title: 'Instant Approval',
    description: 'Get your loan approved with transparent terms and interest rates.',
    gradient: 'from-emerald-500 to-brand-accent',
    lightBg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    icon: IndianRupee,
    title: 'Fast Disbursal',
    description: 'Loan amount is credited directly to your bank account within 24 hours.',
    gradient: 'from-brand-gold to-orange-500',
    lightBg: 'bg-amber-50 dark:bg-amber-900/20',
  },
];

export default function LoanProcess() {
  return (
    <section id="process" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="section-label">How It Works</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Simple 4-Step Process
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            We&apos;ve streamlined the borrowing process to make it as frictionless as possible. No endless paperwork, no long queues.
          </p>
        </div>

        <div className="relative">
          {/* Dashed Connector Line */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-slate-200 dark:border-slate-700 z-0" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon Circle */}
                <div className="relative mb-6">
                  <div className={`w-24 h-24 rounded-full ${step.lightBg} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <step.icon size={34} className="text-slate-700 dark:text-slate-200" strokeWidth={1.5} />
                  </div>
                  {/* Step Number */}
                  <div className={`absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                    {index + 1}
                  </div>
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs md:max-w-48">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
