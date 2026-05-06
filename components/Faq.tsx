'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

const faqs = [
  {
    question: 'What is the minimum credit score required for a loan?',
    answer: 'While a credit score of 700+ is ideal for the best interest rates, we consider applications with scores of 650 and above. We also look at your overall financial health, income stability, and repayment capacity.',
  },
  {
    question: 'How long does the loan approval process take?',
    answer: 'For personal and business loans, our AI-driven system can provide in-principle approval within 15 minutes. Final disbursal usually happens within 24-48 hours after document verification.',
  },
  {
    question: 'Are there any pre-payment or foreclosure charges?',
    answer: 'We believe in transparent pricing. For most of our loan products, there are zero pre-payment penalties if you decide to close your loan early after the initial lock-in period of 6 months.',
  },
  {
    question: 'What documents are required for a loan application?',
    answer: 'Basic documents include PAN Card, Aadhaar Card, last 6 months bank statements, and proof of income (salary slips or ITR). The exact requirements may vary based on the loan type.',
  },
  {
    question: 'Can I apply for a joint loan with my spouse?',
    answer: 'Yes, applying for a joint loan with a co-applicant (spouse or immediate family member) can increase your loan eligibility and sometimes help you secure a lower interest rate.',
  },
];

export default function Faq() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Find answers to common questions about our loan products and processes.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <Accordion.Item 
                key={index} 
                value={`item-${index}`}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex items-start justify-between w-full p-5 sm:p-6 text-left font-semibold text-slate-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors group gap-4">
                    {faq.question}
                    <ChevronDown 
                      className="text-slate-400 group-data-[state=open]:rotate-180 transition-transform duration-300 flex-shrink-0 mt-0.5" 
                      size={20} 
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-slate-600 dark:text-slate-400 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="p-5 sm:p-6 pt-0 leading-relaxed">
                    {faq.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
