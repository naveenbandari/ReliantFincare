'use client';

import { motion } from 'motion/react';
import { Star, Quote, BadgeCheck } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Small Business Owner',
    content: 'Reliant Fincare helped me expand my business when other banks said no. The process was incredibly fast, and the team was supportive throughout.',
    rating: 5,
    imageSeed: 'indian-man',
    accentColor: 'from-blue-500 to-brand-primary',
  },
  {
    name: 'Priya Sharma',
    role: 'Homeowner',
    content: 'Getting a home loan has never been this easy. The transparent policies and competitive interest rates made them the obvious choice for my family.',
    rating: 5,
    imageSeed: 'indian-woman',
    accentColor: 'from-brand-accent to-cyan-500',
  },
  {
    name: 'Amit Patel',
    role: 'Software Engineer',
    content: 'I needed a personal loan urgently for a medical emergency. The funds were disbursed within 12 hours. Truly a lifesaver!',
    rating: 5,
    imageSeed: 'professional-man',
    accentColor: 'from-brand-secondary to-purple-500',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #4338CA 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Testimonials</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Don&apos;t Just Take Our Word For It
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Hear from thousands of satisfied customers who have achieved their financial goals with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 bg-gradient-to-r ${testimonial.accentColor}`} />

              <div className="p-8 flex flex-col flex-1">
                {/* Stars + Quote */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <Quote className="text-slate-100 dark:text-slate-800 w-10 h-10 rotate-180" />
                </div>

                {/* Content */}
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed flex-1 mb-8">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                      <Image
                        src={`https://picsum.photos/seed/${testimonial.imageSeed}/100/100`}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold px-2.5 py-1.5 rounded-full">
                    <BadgeCheck size={13} />
                    Verified
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
