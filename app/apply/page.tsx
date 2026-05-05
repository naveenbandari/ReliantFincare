import LoanApplicationForm from '@/components/LoanApplicationForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ApplyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <div className="flex-grow pt-28 pb-16 px-4 md:px-6 relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full filter blur-3xl translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full filter blur-3xl -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="max-w-xl mb-10 lg:mb-12">
            <div className="section-label mb-3">Apply in Minutes</div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
              Start Your Loan Application
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              100% online. No branch visits. Get instant pre-approval and funds in your account within 24 hours.
            </p>
          </div>

          <LoanApplicationForm />
        </div>
      </div>

      <Footer />
    </main>
  );
}
