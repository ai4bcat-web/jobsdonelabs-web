import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, FlaskConical, ArrowLeft, TrendingUp, DollarSign, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

const CALENDLY = "https://calendly.com/ryne-bandolik";

function JobsDoneLogo() {
  return (
    <div className="flex items-center gap-2">
      <FlaskConical className="w-7 h-7 text-[#1F62FF] flex-shrink-0" />
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline">
          <span className="font-black text-lg text-slate-900 tracking-tight">JOBS</span>
          <span className="font-black text-lg text-[#1F62FF] tracking-tight">DONE</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="flex-1 h-px bg-[#1F62FF]/40" />
          <span className="text-[10px] font-semibold text-slate-400 tracking-[0.18em] uppercase">Labs</span>
          <span className="flex-1 h-px bg-[#1F62FF]/40" />
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  format,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  format: (v: number) => string;
  hint?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        <span className="text-base font-black text-[#1F62FF]">{format(value)}</span>
      </div>
      <div className="relative h-2 bg-slate-100 rounded-full">
        <div
          className="absolute left-0 top-0 h-2 bg-[#1F62FF] rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#1F62FF] rounded-full shadow transition-all pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

function ResultCard({ icon, label, value, sub, highlight = false }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-6 border flex flex-col gap-2 ${highlight ? "bg-[#1F62FF] border-[#1F62FF] text-white" : "bg-white border-slate-100 shadow-sm"}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${highlight ? "bg-white/20" : "bg-blue-50"}`}>
        <span className={highlight ? "text-white" : "text-[#1F62FF]"}>{icon}</span>
      </div>
      <p className={`text-xs font-semibold uppercase tracking-wider mt-1 ${highlight ? "text-white/70" : "text-slate-400"}`}>{label}</p>
      <p className={`text-2xl font-black leading-none ${highlight ? "text-white" : "text-slate-900"}`}>{value}</p>
      {sub && <p className={`text-xs ${highlight ? "text-white/60" : "text-slate-400"}`}>{sub}</p>}
    </div>
  );
}

export default function ROICalculator() {
  const [monthlyLeads, setMonthlyLeads] = useState(80);
  const [dealSize, setDealSize] = useState(3000);
  const [closeRate, setCloseRate] = useState(20);
  const [responseHours, setResponseHours] = useState(4);

  const results = useMemo(() => {
    const currentMonthlyRevenue = (monthlyLeads * (closeRate / 100)) * dealSize;

    // Lead leakage: industry avg 35% of leads fall through without proper follow-up
    const leakagePct = Math.min(0.35, responseHours * 0.05 + 0.15);
    const recoveredLeakage = monthlyLeads * leakagePct * (closeRate / 100) * dealSize;

    // Close rate lift from faster response + nurture (conservative 18% relative lift)
    const closeRateLift = Math.min(closeRate * 0.25, 12); // max 12 percentage point lift
    const improvedCloseRevenue = monthlyLeads * ((closeRate + closeRateLift) / 100) * dealSize - currentMonthlyRevenue;

    const totalMonthlyRecovery = recoveredLeakage + improvedCloseRevenue;
    const ninetyDayRecovery = totalMonthlyRecovery * 3;
    const annualRecovery = totalMonthlyRecovery * 12;

    // Hours saved: avg 15–25h/week based on deal volume
    const hoursSaved = Math.round(10 + (monthlyLeads / 20));

    const roiMultiple = ninetyDayRecovery > 0 ? (ninetyDayRecovery / 2000).toFixed(1) : "—";

    return {
      currentMonthlyRevenue: Math.round(currentMonthlyRevenue),
      totalMonthlyRecovery: Math.round(totalMonthlyRecovery),
      ninetyDayRecovery: Math.round(ninetyDayRecovery),
      annualRecovery: Math.round(annualRecovery),
      hoursSaved,
      roiMultiple,
      meetsGuarantee: ninetyDayRecovery >= 30000,
    };
  }, [monthlyLeads, dealSize, closeRate, responseHours]);

  const fmt$ = (n: number) =>
    n >= 1000000
      ? `$${(n / 1000000).toFixed(1)}M`
      : n >= 1000
      ? `$${(n / 1000).toFixed(0)}K`
      : `$${n}`;

  return (
    <div className="min-h-screen font-sans" style={{ background: "linear-gradient(160deg,#eef6ff 0%,#ffffff 40%,#f0f8ff 100%)" }}>

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/"><JobsDoneLogo /></Link>
          <Link href="/">
            <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </button>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[#1F62FF] text-xs font-semibold uppercase tracking-widest mb-3">ROI Calculator</p>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            How much revenue are you<br className="hidden md:block" /> currently leaving on the table?
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Adjust the sliders to match your business — we'll show you exactly what slow follow-up and manual bottlenecks are costing you every month.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm flex flex-col gap-8"
          >
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Your current numbers</h2>
              <p className="text-slate-400 text-sm">Drag the sliders to reflect your business today.</p>
            </div>

            <Slider
              label="Monthly leads"
              value={monthlyLeads}
              onChange={setMonthlyLeads}
              min={10}
              max={500}
              step={5}
              format={v => `${v} leads`}
              hint="All inbound inquiries across every channel"
            />

            <Slider
              label="Average deal / client value"
              value={dealSize}
              onChange={setDealSize}
              min={500}
              max={25000}
              step={500}
              format={v => fmt$(v)}
              hint="What the average new client is worth to your business"
            />

            <Slider
              label="Current close rate"
              value={closeRate}
              onChange={setCloseRate}
              min={1}
              max={60}
              step={1}
              format={v => `${v}%`}
              hint="Of leads that enter your pipeline, how many become clients"
            />

            <Slider
              label="Average lead response time"
              value={responseHours}
              onChange={setResponseHours}
              min={0}
              max={48}
              step={1}
              format={v => v === 0 ? "Instant" : v === 1 ? "1 hour" : `${v} hours`}
              hint="How long before a new lead hears back from your team"
            />

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                <span className="font-semibold text-slate-700">How we calculate this:</span> We model lead leakage (leads lost to slow response and no follow-up) plus the close rate lift from sub-5-minute response times and automated nurture sequences — based on industry benchmarks.
              </p>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <ResultCard
                icon={<DollarSign className="w-5 h-5" />}
                label="Monthly revenue recovered"
                value={fmt$(results.totalMonthlyRecovery)}
                sub="By eliminating lead leakage + boosting close rate"
              />
              <ResultCard
                icon={<TrendingUp className="w-5 h-5" />}
                label="90-day recovery"
                value={fmt$(results.ninetyDayRecovery)}
                sub="Within your first quarter"
                highlight
              />
              <ResultCard
                icon={<Zap className="w-5 h-5" />}
                label="Annual revenue upside"
                value={fmt$(results.annualRecovery)}
                sub="If current trajectory continues"
              />
              <ResultCard
                icon={<Clock className="w-5 h-5" />}
                label="Hours saved per week"
                value={`${results.hoursSaved}h`}
                sub="Freed from manual ops work"
              />
            </div>

            {/* Guarantee callout */}
            <div className={`rounded-2xl p-6 border-2 text-center ${results.meetsGuarantee ? "border-emerald-400 bg-emerald-50" : "border-[#1F62FF] bg-blue-50"}`}>
              {results.meetsGuarantee ? (
                <>
                  <p className="text-emerald-700 font-black text-lg mb-1">✓ You qualify for our $30K guarantee</p>
                  <p className="text-emerald-600 text-sm">Based on your numbers, we're confident we can deliver $30,000+ in recovered revenue within 90 days — or we keep working until we do.</p>
                </>
              ) : (
                <>
                  <p className="text-[#1F62FF] font-black text-lg mb-1">Increase your leads or deal size to unlock the guarantee</p>
                  <p className="text-slate-600 text-sm">Our $30K guarantee applies when there's enough volume to work with. Book a call — we'll tell you honestly if we're a fit.</p>
                </>
              )}
            </div>

            {/* CTA */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm text-center flex flex-col gap-4">
              <div>
                <p className="font-bold text-slate-900 text-base mb-1">Ready to stop leaving {fmt$(results.annualRecovery)}/year on the table?</p>
                <p className="text-slate-400 text-sm">Book a free 45-minute audit call. We'll map your exact leaks and hand you a custom roadmap.</p>
              </div>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                <button className="w-full bg-[#1F62FF] hover:bg-[#1a54e0] text-white font-bold text-base h-12 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(31,98,255,0.3)]">
                  Book a Free Audit Call <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <p className="text-slate-400 text-xs">No commitment. No sales pressure. You keep the roadmap either way.</p>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
