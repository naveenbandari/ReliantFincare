'use client';

import { useState, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Info } from 'lucide-react';

export interface EmiCalculatorProps {
  initialAmount?: number;
  initialRate?: number;
  initialTenure?: number;
  controlledAmount?: number;
  onAmountChange?: (amount: number) => void;
  controlledRate?: number;
  onRateChange?: (rate: number) => void;
  controlledTenure?: number;
  onTenureChange?: (tenure: number) => void;
  hideHeader?: boolean;
  hideApplyButton?: boolean;
  className?: string;
  /** Render without section/container/card shell — for embedding inside another card */
  inline?: boolean;
}

const AMOUNT_PRESETS = [
  { label: '₹1L', value: 100000 },
  { label: '₹5L', value: 500000 },
  { label: '₹10L', value: 1000000 },
  { label: '₹25L', value: 2500000 },
  { label: '₹50L', value: 5000000 },
];

const TENURE_PRESETS = [
  { label: '1Y', value: 1 },
  { label: '3Y', value: 3 },
  { label: '5Y', value: 5 },
  { label: '10Y', value: 10 },
  { label: '20Y', value: 20 },
];

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
}


// Dual-control slider: slider + editable text input in sync
function DualSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  presets,
  accentClass,
  inputSuffix,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  presets?: { label: string; value: number }[];
  accentClass: string;
  inputSuffix?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = () => {
    setDraft(String(value));
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 10);
  };

  const commitEdit = () => {
    const num = Number(draft.replace(/[^0-9.]/g, ''));
    if (!isNaN(num)) {
      onChange(Math.min(max, Math.max(min, num)));
    }
    setEditing(false);
  };

  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>

        {/* Editable value badge */}
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => e.key === 'Enter' && commitEdit()}
            className="w-full min-[420px]:w-36 text-left min-[420px]:text-right bg-brand-primary/5 border border-brand-primary rounded-lg px-3 py-1.5 font-mono font-bold text-brand-primary dark:text-blue-400 text-sm outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        ) : (
          <button
            type="button"
            onClick={startEdit}
            title="Click to enter exact value"
            className="group flex w-full min-[420px]:w-auto items-center justify-between min-[420px]:justify-start gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span className="font-mono font-bold text-brand-primary dark:text-blue-400 text-sm">
              {format(value)}{inputSuffix ? ` ${inputSuffix}` : ''}
            </span>
            <span className="text-[10px] text-slate-400 group-hover:text-brand-primary transition-colors">✎</span>
          </button>
        )}
      </div>

      {/* Preset chips */}
      {presets && (
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              type="button"
              key={p.label}
              onClick={() => onChange(p.value)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 ${
                value === p.value
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-brand-primary hover:text-brand-primary'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Slider track */}
      <div className="relative">
        <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
          <div
            className={`absolute left-0 top-0 h-2 rounded-full ${accentClass}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
          style={{ WebkitAppearance: 'none' }}
        />
        {/* Custom thumb */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-[3px] shadow-md pointer-events-none transition-all ${accentClass.replace('bg-gradient-to-r', 'border-').replace('from-brand-primary to-brand-secondary', 'border-brand-primary').replace('from-brand-accent to-cyan-500', 'border-brand-accent').replace('from-brand-secondary to-purple-500', 'border-brand-secondary')}`}
          style={{ left: `calc(${progress}% - 10px)`, borderColor: accentClass.includes('accent') ? '#10B981' : accentClass.includes('secondary') ? '#4338CA' : '#1E3A8A' }}
        />
      </div>

      <div className="flex justify-between text-[11px] text-slate-400 font-medium">
        <span>{format(min)}{inputSuffix ? ` ${inputSuffix}` : ''}</span>
        <span>{format(max)}{inputSuffix ? ` ${inputSuffix}` : ''}</span>
      </div>
    </div>
  );
}

export default function EmiCalculator({
  initialAmount = 500000,
  initialRate = 10.5,
  initialTenure = 5,
  controlledAmount,
  onAmountChange,
  controlledRate,
  onRateChange,
  controlledTenure,
  onTenureChange,
  hideHeader = false,
  hideApplyButton = false,
  className = 'py-24 bg-slate-50 dark:bg-slate-950',
  inline = false,
}: EmiCalculatorProps) {
  const [internalAmount, setInternalAmount] = useState(initialAmount);
  const [internalRate, setInternalRate] = useState(initialRate);
  const [internalTenure, setInternalTenure] = useState(initialTenure);

  const amount = controlledAmount !== undefined ? controlledAmount : internalAmount;
  const rate = controlledRate !== undefined ? controlledRate : internalRate;
  const tenure = controlledTenure !== undefined ? controlledTenure : internalTenure;

  const handleAmountChange = (val: number) => {
    if (controlledAmount === undefined) setInternalAmount(val);
    onAmountChange?.(val);
  };
  const handleRateChange = (val: number) => {
    if (controlledRate === undefined) setInternalRate(val);
    onRateChange?.(val);
  };
  const handleTenureChange = (val: number) => {
    if (controlledTenure === undefined) setInternalTenure(val);
    onTenureChange?.(val);
  };

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const p = amount;
    const r = rate / 12 / 100;
    const n = tenure * 12;
    if (r === 0) {
      return {
        emi: Math.round(p / n),
        totalInterest: 0,
        totalPayment: p,
      };
    }
    const emiVal = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emiVal * n;
    return {
      emi: Math.round(emiVal),
      totalInterest: Math.round(total - p),
      totalPayment: Math.round(total),
    };
  }, [amount, rate, tenure]);

  const principalPct = totalPayment > 0 ? Math.round((amount / totalPayment) * 100) : 0;
  const interestPct = 100 - principalPct;

  // Shared inner content — used in both inline and standalone modes
  const inputsPanel = (
    <div className="lg:col-span-3 min-w-0 p-4 sm:p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 space-y-8 sm:space-y-9">
      <DualSlider
        label="Loan Amount"
        value={amount}
        min={50000}
        max={10000000}
        step={50000}
        onChange={handleAmountChange}
        format={formatCurrency}
        presets={AMOUNT_PRESETS}
        accentClass="bg-gradient-to-r from-brand-primary to-brand-secondary"
      />
      <DualSlider
        label="Interest Rate (p.a.)"
        value={rate}
        min={5}
        max={20}
        step={0.1}
        onChange={handleRateChange}
        format={(v) => `${v.toFixed(1)}%`}
        accentClass="bg-gradient-to-r from-brand-accent to-cyan-500"
      />
      <DualSlider
        label="Loan Tenure"
        value={tenure}
        min={1}
        max={30}
        step={1}
        onChange={handleTenureChange}
        format={(v) => `${v}`}
        inputSuffix="Years"
        presets={TENURE_PRESETS}
        accentClass="bg-gradient-to-r from-brand-secondary to-purple-500"
      />
    </div>
  );

  const resultPanel = (
    <div className="lg:col-span-2 min-w-0 p-4 sm:p-8 md:p-10 bg-slate-50 dark:bg-slate-800/50 flex flex-col justify-center gap-7">
      {/* Hero EMI Card */}
      <motion.div
        key={emi}
        initial={{ scale: 0.95, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="text-center"
      >
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
          Monthly EMI
        </p>
        <h3 className="font-mono font-bold text-2xl min-[420px]:text-3xl sm:text-5xl text-brand-primary dark:text-blue-400 leading-none break-words">
          {formatCurrency(emi)}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">per month</p>
      </motion.div>

      {/* Horizontal stacked bar */}
      <div>
        <div className="flex h-3 rounded-full overflow-hidden mb-3">
          <div className="bg-brand-primary transition-all duration-500" style={{ width: `${principalPct}%` }} />
          <div className="bg-brand-accent transition-all duration-500" style={{ width: `${interestPct}%` }} />
        </div>
        <div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-primary inline-block" />
            Principal {principalPct}%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-accent inline-block" />
            Interest {interestPct}%
          </span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between min-[420px]:items-center gap-1 py-3 border-t border-slate-200 dark:border-slate-700">
          <span className="text-slate-500 dark:text-slate-400">Principal Amount</span>
          <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(amount)}</span>
        </div>
        <div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between min-[420px]:items-center gap-1 pb-3 border-b border-slate-200 dark:border-slate-700">
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            Total Interest
            <Info size={12} className="opacity-50" />
          </span>
          <span className="font-semibold text-rose-500 dark:text-rose-400">{formatCurrency(totalInterest)}</span>
        </div>
        <div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between min-[420px]:items-center gap-1 pt-1">
          <span className="font-bold text-slate-900 dark:text-white">Total Payable</span>
          <span className="font-bold text-brand-primary dark:text-blue-400 text-base break-words">{formatCurrency(totalPayment)}</span>
        </div>
      </div>

      {!hideApplyButton && (
        <Link href="/apply" className="btn-primary flex items-center justify-center mt-2">
          Apply for this Loan
        </Link>
      )}
    </div>
  );

  // ── Inline mode: render grid directly, no section/container/card shell ──
  if (inline) {
    return (
      <div className="grid lg:grid-cols-5 w-full rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-[0_4px_24px_rgba(30,58,138,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        {inputsPanel}
        {resultPanel}
      </div>
    );
  }

  // ── Standalone mode: full section with header and card shell ────────────
  return (
    <section id="calculator" className={className}>
      <div className="container mx-auto px-4 md:px-6">
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="section-label">EMI Calculator</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Plan Your Finances
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Adjust the sliders or type exact values — see your monthly EMI update live.
            </p>
          </div>
        )}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5">
            {inputsPanel}
            {resultPanel}
          </div>
        </div>
      </div>
    </section>
  );
}
