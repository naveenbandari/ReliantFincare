import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SectionReveal from '@/components/SectionReveal';

const PartnerLogos   = dynamic(() => import('@/components/PartnerLogos'));
const LoanCategories = dynamic(() => import('@/components/LoanCategories'));
const WhyChooseUs    = dynamic(() => import('@/components/WhyChooseUs'));
const LoanProcess    = dynamic(() => import('@/components/LoanProcess'));
const EmiCalculator  = dynamic(() => import('@/components/EmiCalculator'));
const Testimonials   = dynamic(() => import('@/components/Testimonials'));
const Faq            = dynamic(() => import('@/components/Faq'));
const CtaBanner      = dynamic(() => import('@/components/CtaBanner'));
const Footer         = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      <SectionReveal direction="up">
        <PartnerLogos />
      </SectionReveal>

      <SectionReveal direction="up" delay={0.05}>
        <LoanCategories />
      </SectionReveal>

      <SectionReveal direction="left" delay={0.05}>
        <WhyChooseUs />
      </SectionReveal>

      <SectionReveal direction="up" delay={0.05}>
        <LoanProcess />
      </SectionReveal>

      <SectionReveal direction="scale" delay={0.05}>
        <EmiCalculator />
      </SectionReveal>

      <SectionReveal direction="up" delay={0.05}>
        <Testimonials />
      </SectionReveal>

      <SectionReveal direction="up" delay={0.05}>
        <Faq />
      </SectionReveal>

      <SectionReveal direction="scale" delay={0.05}>
        <CtaBanner />
      </SectionReveal>

      <Footer />
    </main>
  );
}
