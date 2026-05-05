'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  CheckCircle2, ChevronRight, ChevronLeft, UploadCloud,
  FileText, Briefcase, User, CreditCard, Save, ShieldCheck,
  Home, GraduationCap, Car, Building, Wallet, X, Lock,
  BadgeCheck, Clock, Smartphone, AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import EmiCalculator from './EmiCalculator';

// ─── Constants ───────────────────────────────────────────────────────────────

const loanTypes = [
  { id: 'home',     label: 'Home Loan',     rate: 8.5,  icon: Home,         desc: 'Purchase, build, or renovate' },
  { id: 'personal', label: 'Personal Loan', rate: 12.5, icon: User,         desc: 'Any personal expense' },
  { id: 'business', label: 'Business Loan', rate: 15.0, icon: Briefcase,    desc: 'Grow your business' },
  { id: 'education',label: 'Education Loan',rate: 9.5,  icon: GraduationCap,desc: 'India & abroad studies' },
  { id: 'mortgage', label: 'Mortgage Loan', rate: 10.5, icon: Building,     desc: 'Loan against property' },
  { id: 'car',      label: 'Used Car Loan', rate: 11.5, icon: Car,          desc: '100% on-road funding' },
];

const loanRates: Record<string, number> = Object.fromEntries(
  loanTypes.map((l) => [l.id, l.rate])
);

const employmentTypes = [
  { value: 'Salaried',       icon: Briefcase,  hint: 'Working at a company' },
  { value: 'Self-Employed',  icon: Wallet,     hint: 'Freelancer / consultant' },
  { value: 'Business Owner', icon: Building,   hint: 'Running a business' },
  { value: 'Professional',   icon: Smartphone, hint: 'Doctor, CA, lawyer, etc.' },
];

const docTypes = [
  {
    id: 'pan',
    label: 'PAN Card',
    hint: 'JPEG, PNG or PDF · Max 5MB',
    why: 'Used for KYC and credit score check',
    required: true,
  },
  {
    id: 'aadhaar',
    label: 'Aadhaar Card',
    hint: 'Front & Back · JPEG, PNG or PDF',
    why: 'Identity and address verification',
    required: true,
  },
  {
    id: 'bank',
    label: 'Bank Statement',
    hint: 'Last 6 months · PDF only',
    why: 'Verifies income and repayment capacity',
    required: false,
  },
];

// ─── Schema ───────────────────────────────────────────────────────────────────

const formSchema = z.object({
  loanType:       z.string().min(1, 'Pick the loan type that fits your goal'),
  loanAmount:     z.number().min(50000, 'Minimum loan amount is ₹50,000').max(10000000, 'Maximum is ₹1 Crore'),
  tenure:         z.number().min(1, 'Minimum tenure is 1 year').max(30, 'Maximum tenure is 30 years'),
  fullName:       z.string().min(3, 'Enter your full name as it appears on PAN'),
  email:          z.string().email('Enter a valid email address'),
  phone:          z.string().regex(/^[0-9]{10}$/, 'Enter a valid 10-digit number (without +91)'),
  panNumber:      z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Check the format — it should look like ABCDE1234F'),
  city:           z.string().min(2, 'Enter your city'),
  state:          z.string().min(2, 'Enter your state'),
  pincode:        z.string().regex(/^[0-9]{6}$/, 'Enter a valid 6-digit pincode'),
  employmentType: z.string().min(1, 'Select your employment type'),
  employerName:   z.string().min(2, 'Enter your employer or business name'),
  monthlyIncome:  z.number().min(10000, 'Enter your monthly take-home (minimum ₹10,000)'),
});

type FormData = z.infer<typeof formSchema>;

// ─── Step config ─────────────────────────────────────────────────────────────

const steps = [
  { id: 'loan',       title: 'Loan Details',   icon: CreditCard, heading: 'What kind of funding do you need?',  sub: 'Pick your loan type — takes ~2 minutes' },
  { id: 'personal',   title: 'Personal Info',  icon: User,       heading: 'Let us know who you are',           sub: 'Your data is 256-bit encrypted' },
  { id: 'employment', title: 'Employment',     icon: Briefcase,  heading: 'Tell us about your income',         sub: 'This helps us unlock the best rate for you' },
  { id: 'documents',  title: 'Documents',      icon: FileText,   heading: 'Almost there — just a few files',   sub: 'Most approvals happen within 24 hours' },
];

const stepTransitionCopy = [
  '', // no message before step 1
  'Great start! Your EMI is calculated — now let\'s verify your identity.',
  'Halfway there! Just your income details left.',
  'Last step! Upload your documents and you\'re done.',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
}

function formatShort(val: number) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000)   return `₹${(val / 100000).toFixed(1)}L`;
  return `₹${(val / 1000).toFixed(0)}K`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function InputField({
  label, hint, error, children,
}: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
      {children}
      {hint && !error && <p className="text-xs text-slate-400 dark:text-slate-500">{hint}</p>}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all outline-none text-sm placeholder:text-slate-400';

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LoanApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rate, setRate] = useState(10.5);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');
  const [stepMessage, setStepMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});

  const {
    register, handleSubmit, trigger, watch, setValue, reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { loanAmount: 500000, tenure: 5 },
    mode: 'onChange',
  });

  const loanType   = watch('loanType');
  const loanAmount = watch('loanAmount');
  const tenure     = watch('tenure');

  // Compute EMI for sidebar
  const emi = (() => {
    const p = loanAmount || 500000;
    const r = rate / 12 / 100;
    const n = (tenure || 5) * 12;
    if (r === 0) return Math.round(p / n);
    return Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  })();

  useEffect(() => {
    if (loanType && loanRates[loanType]) setRate(loanRates[loanType]);
  }, [loanType]);

  // Restore draft
  useEffect(() => {
    const raw = localStorage.getItem('reliantLoanDraft');
    if (!raw) return;
    try {
      const { formData, currentStep: s } = JSON.parse(raw);
      if (formData) reset(formData);
      if (s !== undefined) setCurrentStep(s);
    } catch { /* ignore */ }
  }, [reset]);

  const saveDraft = () => {
    localStorage.setItem('reliantLoanDraft', JSON.stringify({ formData: watch(), currentStep }));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const processNext = async () => {
    const fieldsMap: Record<number, (keyof FormData)[]> = {
      0: ['loanType', 'loanAmount', 'tenure'],
      1: ['fullName', 'email', 'phone', 'panNumber', 'city', 'state', 'pincode'],
      2: ['employmentType', 'employerName', 'monthlyIncome'],
    };
    const valid = await trigger(fieldsMap[currentStep] ?? []);
    if (valid) {
      setStepMessage(stepTransitionCopy[currentStep + 1] || '');
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    console.log('Submitted:', data);
    localStorage.removeItem('reliantLoanDraft');
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // Confetti on success
  useEffect(() => {
    if (!isSuccess) return;
    const end = Date.now() + 3000;
    const rng = (a: number, b: number) => Math.random() * (b - a) + a;
    const iv = setInterval(() => {
      if (Date.now() > end) return clearInterval(iv);
      const n = 50 * ((end - Date.now()) / 3000);
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
      confetti({ ...defaults, particleCount: n, origin: { x: rng(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount: n, origin: { x: rng(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
    return () => clearInterval(iv);
  }, [isSuccess]);

  // ── Success screen ──────────────────────────────────────────────────────────
  if (isSuccess) {
    const ref = `#REF-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.6, bounce: 0.45 }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-16 shadow-2xl border border-slate-100 dark:border-slate-800 text-center max-w-2xl mx-auto relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 relative"
        >
          <div className="absolute inset-0 bg-brand-accent/20 rounded-full animate-ping" />
          <CheckCircle2 size={48} className="text-brand-accent relative z-10" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white mb-3"
        >
          You&apos;re on your way! 🎉
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="space-y-5 mb-10"
        >
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Your application is under review. We&apos;ll send updates to your email and phone.
          </p>
          <div className="inline-flex flex-col items-center bg-slate-50 dark:bg-slate-800 rounded-2xl px-8 py-5 border border-slate-100 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold mb-1">Reference Number</span>
            <span className="font-mono font-bold text-2xl text-brand-primary dark:text-blue-400">{ref}</span>
          </div>
          <p className="text-sm text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
            <Clock size={14} /> Expected review time: 24–48 hours
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          onClick={() => (window.location.href = '/')}
          className="btn-primary px-12 py-4 text-base"
        >
          Return to Home
        </motion.button>
      </motion.div>
    );
  }

  // ── Application shell ───────────────────────────────────────────────────────
  const selectedLoan = loanTypes.find((l) => l.id === loanType);
  const progress = ((currentStep) / (steps.length - 1)) * 100;

  return (
    <div className="flex gap-8 items-start max-w-6xl mx-auto">

      {/* ── LEFT SIDEBAR (desktop) ────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col gap-5 w-72 flex-shrink-0 sticky top-28">

        {/* Loan Summary Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary px-5 py-4">
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-0.5">Your Loan Plan</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white/60 text-xs">Monthly EMI</p>
                <p className="text-white font-mono font-bold text-2xl leading-tight">{formatCurrency(emi)}</p>
              </div>
              {selectedLoan && (
                <span className="text-xs font-bold bg-white/15 text-white px-2.5 py-1 rounded-full">
                  {selectedLoan.label}
                </span>
              )}
            </div>
          </div>

          <div className="p-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Amount</span>
              <span className="font-semibold text-slate-900 dark:text-white">{formatShort(loanAmount || 500000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Rate</span>
              <span className="font-semibold text-brand-accent">{rate}% p.a.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Tenure</span>
              <span className="font-semibold text-slate-900 dark:text-white">{tenure || 5} Years</span>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Total Payable</span>
              <span className="font-bold text-slate-900 dark:text-white">{formatShort(emi * (tenure || 5) * 12)}</span>
            </div>
          </div>

          {currentStep > 0 && (
            <div className="px-5 pb-5">
              <button
                type="button"
                onClick={() => setCurrentStep(0)}
                className="w-full text-xs font-semibold text-brand-primary dark:text-blue-400 hover:underline"
              >
                ✎ Edit Loan Details
              </button>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Progress</span>
            <span className="text-xs font-bold text-brand-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
            <div
              className="h-2 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="space-y-2">
            {steps.map((s, i) => {
              const done = i < currentStep;
              const active = i === currentStep;
              const Icon = s.icon;
              return (
                <div key={s.id} className={`flex items-center gap-2.5 text-xs font-medium transition-colors ${active ? 'text-brand-primary dark:text-blue-400' : done ? 'text-brand-accent' : 'text-slate-400'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${active ? 'bg-brand-primary/10' : done ? 'bg-brand-accent/10' : 'bg-slate-100 dark:bg-slate-800'}`}>
                    {done ? <CheckCircle2 size={13} className="text-brand-accent" /> : <Icon size={12} />}
                  </div>
                  {s.title}
                  {active && <span className="ml-auto text-[10px] text-slate-400">← Now</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust badges */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 space-y-2.5">
          {[
            { icon: Lock, text: '256-bit SSL Encrypted' },
            { icon: BadgeCheck, text: 'RBI Registered NBFC' },
            { icon: ShieldCheck, text: 'No hard credit pull yet' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              <Icon size={14} className="text-brand-accent flex-shrink-0" />
              {text}
            </div>
          ))}
        </div>
      </aside>

      {/* ── MAIN FORM AREA ───────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">

        {/* Stepper Header */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 md:p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-bold text-brand-primary">{Math.round(progress)}% Complete</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-5">
            <div
              className="h-1.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-500"
              style={{ width: `${progress + 25}%` }} // +25 = current step counts
            />
          </div>
          {/* Step pills */}
          <div className="hidden md:flex items-center gap-2">
            {steps.map((s, i) => {
              const done = i < currentStep;
              const active = i === currentStep;
              const Icon = s.icon;
              return (
                <div key={s.id} className="flex items-center gap-1.5">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active ? 'bg-brand-primary text-white shadow-sm' :
                    done   ? 'bg-brand-accent/10 text-brand-accent' :
                             'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {done ? <CheckCircle2 size={12} /> : <Icon size={12} />}
                    {s.title}
                  </div>
                  {i < steps.length - 1 && (
                    <ChevronRight size={14} className={done ? 'text-brand-accent' : 'text-slate-300 dark:text-slate-700'} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step transition message */}
        <AnimatePresence>
          {stepMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-medium px-4 py-3 rounded-xl mb-5"
            >
              <CheckCircle2 size={16} className="flex-shrink-0" />
              {stepMessage}
              <button onClick={() => setStepMessage('')} className="ml-auto">
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mb-20 md:mb-0">
          {/* Step heading bar */}
          <div className="px-6 md:px-8 pt-7 pb-5 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              {steps[currentStep].heading}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {steps[currentStep].sub}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">

                {/* ── STEP 1: LOAN DETAILS ─────────────────────────────── */}
                {currentStep === 0 && (
                  <motion.div key="s0" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-8">

                    {/* Loan type card grid */}
                    <div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Loan Type</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {loanTypes.map((lt) => {
                          const Icon = lt.icon;
                          const selected = loanType === lt.id;
                          return (
                            <button
                              key={lt.id}
                              type="button"
                              onClick={() => setValue('loanType', lt.id, { shouldValidate: true })}
                              className={`relative rounded-2xl border-2 p-4 text-left transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-brand-primary/30 ${
                                selected
                                  ? 'border-brand-primary bg-blue-50 dark:bg-brand-primary/20 shadow-md'
                                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm'
                              }`}
                            >
                              {selected && (
                                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center">
                                  <CheckCircle2 size={12} className="text-white" />
                                </div>
                              )}
                              <Icon size={22} className={`mb-2.5 ${selected ? 'text-brand-primary' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'} transition-colors`} strokeWidth={1.75} />
                              <p className={`text-sm font-bold leading-tight mb-1 ${selected ? 'text-brand-primary dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                                {lt.label}
                              </p>
                              <p className={`text-[11px] leading-tight mb-2 ${selected ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'}`}>{lt.desc}</p>
                              <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                selected ? 'bg-brand-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                              }`}>
                                {lt.rate}% p.a.
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.loanType && (
                        <p className="flex items-center gap-1 text-xs text-red-500 mt-2">
                          <AlertCircle size={12} /> {errors.loanType.message}
                        </p>
                      )}
                    </div>

                    {/* EMI Calculator (sliders + result) */}
                    <EmiCalculator
                      controlledAmount={loanAmount}
                      onAmountChange={(v) => setValue('loanAmount', v, { shouldValidate: true })}
                      controlledRate={rate}
                      onRateChange={setRate}
                      controlledTenure={tenure}
                      onTenureChange={(v) => setValue('tenure', v, { shouldValidate: true })}
                      hideHeader
                      hideApplyButton
                      inline
                    />
                    {(errors.loanAmount || errors.tenure) && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={12} />
                        {errors.loanAmount?.message || errors.tenure?.message}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* ── STEP 2: PERSONAL INFO ────────────────────────────── */}
                {currentStep === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-6">

                    {/* Identity group */}
                    <div>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Identity</p>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                          <InputField label="Full Name (as per PAN)" error={errors.fullName?.message}>
                            <input type="text" placeholder="Rajesh Kumar" autoComplete="name" {...register('fullName')} className={inputClass} />
                          </InputField>
                        </div>
                        <InputField label="PAN Card Number" hint="Format: ABCDE1234F" error={errors.panNumber?.message}>
                          <div className="relative">
                            <input
                              type="text" placeholder="ABCDE1234F" maxLength={10}
                              {...register('panNumber')}
                              className={`${inputClass} uppercase pr-10`}
                            />
                            <Lock size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" />
                          </div>
                        </InputField>
                        <InputField label="Mobile Number" hint="We'll send your approval status via SMS" error={errors.phone?.message}>
                          <div className="flex">
                            <span className="flex items-center px-3 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-xl text-sm font-medium text-slate-500">
                              +91
                            </span>
                            <input
                              type="tel" placeholder="9876543210" maxLength={10}
                              inputMode="numeric" autoComplete="tel"
                              {...register('phone')}
                              className={`${inputClass} rounded-l-none`}
                            />
                          </div>
                        </InputField>
                      </div>
                    </div>

                    {/* Contact group */}
                    <div>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Contact</p>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                          <InputField label="Email Address" error={errors.email?.message}>
                            <input type="email" placeholder="you@example.com" autoComplete="email" {...register('email')} className={inputClass} />
                          </InputField>
                        </div>
                        <InputField label="City" hint="Must match your Aadhaar" error={errors.city?.message}>
                          <input type="text" placeholder="Mumbai" autoComplete="address-level2" {...register('city')} className={inputClass} />
                        </InputField>
                        <InputField label="State" error={errors.state?.message}>
                          <input type="text" placeholder="Maharashtra" autoComplete="address-level1" {...register('state')} className={inputClass} />
                        </InputField>
                        <InputField label="Pincode" error={errors.pincode?.message}>
                          <input type="text" placeholder="400001" inputMode="numeric" maxLength={6} autoComplete="postal-code" {...register('pincode')} className={inputClass} />
                        </InputField>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: EMPLOYMENT ──────────────────────────────── */}
                {currentStep === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-7">

                    <div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Employment Type</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {employmentTypes.map((et) => {
                          const Icon = et.icon;
                          return (
                            <label key={et.value} className="cursor-pointer">
                              <input type="radio" value={et.value} {...register('employmentType')} className="peer sr-only" />
                              <div className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-center transition-all peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 peer-checked:text-brand-primary dark:peer-checked:bg-brand-primary/10 dark:peer-checked:text-blue-400 hover:border-slate-300 dark:hover:border-slate-600">
                                <Icon size={20} className="text-slate-400 peer-checked:text-brand-primary transition-colors" strokeWidth={1.75} />
                                <p className="text-xs font-bold leading-tight">{et.value}</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500">{et.hint}</p>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                      {errors.employmentType && (
                        <p className="flex items-center gap-1 text-xs text-red-500 mt-2">
                          <AlertCircle size={12} /> {errors.employmentType.message}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <InputField
                        label="Employer / Business Name"
                        hint="As it appears on your payslip or contract"
                        error={errors.employerName?.message}
                      >
                        <input type="text" placeholder="Acme Corp Pvt Ltd" {...register('employerName')} className={inputClass} />
                      </InputField>

                      <InputField
                        label="Net Monthly Income (₹)"
                        hint="Take-home after taxes and deductions"
                        error={errors.monthlyIncome?.message}
                      >
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">₹</span>
                          <input
                            type="number" placeholder="50000"
                            inputMode="numeric"
                            {...register('monthlyIncome', { valueAsNumber: true })}
                            className={`${inputClass} pl-7`}
                          />
                        </div>
                      </InputField>
                    </div>

                    {/* Eligibility hint */}
                    {watch('monthlyIncome') >= 10000 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 bg-brand-accent/5 border border-brand-accent/20 rounded-xl p-4"
                      >
                        <BadgeCheck size={18} className="text-brand-accent flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          Based on your income, you likely qualify for{' '}
                          <strong className="text-brand-accent">
                            {formatCurrency(watch('monthlyIncome') * 30)} – {formatCurrency(watch('monthlyIncome') * 60)}
                          </strong>
                          {' '}in financing.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* ── STEP 4: DOCUMENTS ───────────────────────────────── */}
                {currentStep === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-5">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Upload clear, legible copies. Max 5MB per file. Accepted: JPEG, PNG, PDF.
                    </p>

                    {docTypes.map((doc) => {
                      const file = uploadedFiles[doc.id];
                      return (
                        <div key={doc.id} className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 transition-colors hover:border-brand-primary/50 dark:hover:border-brand-primary/40 group">
                          {file ? (
                            /* Uploaded state */
                            <div className="flex items-center justify-between px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                                  <CheckCircle2 size={20} className="text-brand-accent" />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{doc.label}</p>
                                  <p className="text-xs text-slate-400">{file.name} · {(file.size / 1024).toFixed(0)} KB</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setUploadedFiles((prev) => ({ ...prev, [doc.id]: null }))}
                                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            /* Upload prompt */
                            <label className="flex items-center gap-4 px-5 py-5 cursor-pointer">
                              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                                <UploadCloud size={22} className="text-slate-400 group-hover:text-brand-primary transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="text-sm font-bold text-slate-900 dark:text-white">{doc.label}</p>
                                  {!doc.required && (
                                    <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">Optional</span>
                                  )}
                                  {doc.required && (
                                    <span className="text-[10px] font-semibold bg-brand-primary/10 text-brand-primary dark:text-blue-400 px-2 py-0.5 rounded-full">Required</span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-400 mt-0.5">{doc.hint}</p>
                                <p className="text-xs text-slate-400 mt-0.5 italic">{doc.why}</p>
                              </div>
                              <span className="text-xs font-semibold text-brand-primary dark:text-blue-400 whitespace-nowrap ml-2">Upload</span>
                              <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                className="sr-only"
                                onChange={(e) => {
                                  const f = e.target.files?.[0] ?? null;
                                  setUploadedFiles((prev) => ({ ...prev, [doc.id]: f }));
                                }}
                              />
                            </label>
                          )}
                        </div>
                      );
                    })}

                    {/* Pre-submit trust note */}
                    <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mt-2">
                      <ShieldCheck size={16} className="text-brand-accent flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        By submitting, you agree to our{' '}
                        <a href="#" className="text-brand-primary hover:underline">Terms of Service</a>. No hard credit inquiry is made until final approval.
                      </p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* ── Desktop CTA Bar ──────────────────────────────────────── */}
            <div className="hidden md:flex items-center justify-between px-6 md:px-8 py-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
              {currentStep > 0 ? (
                <button type="button" onClick={() => setCurrentStep((s) => s - 1)} className="btn-outline flex items-center gap-2">
                  <ChevronLeft size={16} /> Back
                </button>
              ) : <div />}

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={saveDraft}
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {saveStatus === 'saved'
                    ? <><CheckCircle2 size={14} className="text-brand-accent" /> <span className="text-brand-accent">Saved!</span></>
                    : <><Save size={14} /> Save & Continue Later</>
                  }
                </button>

                {currentStep < steps.length - 1 ? (
                  <button type="button" onClick={processNext} className="btn-primary flex items-center gap-2">
                    Continue to {steps[currentStep + 1].title} <ChevronRight size={16} />
                  </button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center gap-2 disabled:opacity-70 min-w-44 justify-center">
                    {isSubmitting
                      ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Reviewing…</>
                      : <><Lock size={15} /> Submit Securely</>
                    }
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ── MOBILE STICKY BOTTOM BAR ─────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-5 shadow-2xl">
        {/* EMI chip */}
        {currentStep > 0 && (
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2.5 mb-3 border border-slate-100 dark:border-slate-700">
            <span className="text-xs text-slate-500">Your EMI estimate</span>
            <span className="font-mono font-bold text-brand-primary dark:text-blue-400 text-sm">
              {formatCurrency(emi)}/mo
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-3">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s - 1)}
                className="flex-shrink-0 p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-primary hover:text-brand-primary transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button type="button" onClick={processNext} className="btn-primary flex-1 flex items-center justify-center gap-2 py-4">
                Continue to {steps[currentStep + 1].title} <ChevronRight size={16} />
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 flex items-center justify-center gap-2 py-4 disabled:opacity-70">
                {isSubmitting
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Reviewing…</>
                  : <><Lock size={15} /> Submit Securely</>
                }
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={saveDraft}
            className="w-full text-center text-xs font-semibold text-slate-400 dark:text-slate-500 mt-3 hover:text-brand-primary transition-colors"
          >
            {saveStatus === 'saved' ? '✓ Draft Saved!' : '💾 Save & Continue Later'}
          </button>
        </form>
      </div>

    </div>
  );
}
