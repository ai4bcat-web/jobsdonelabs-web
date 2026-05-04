import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, FlaskConical, ArrowLeft, TrendingUp, DollarSign, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

const ACCENT = "#1F62FF";
const SURFACE = "#161618";
const BORDER = "#222226";
const TEXT = "#F0F0F0";
const MUTED = "#888892";
const BG = "#0E0E10";
const BG2 = "#121214";
const CALENDLY = "https://calendly.com/ryne-bandolik";

function JobsDoneLogo() {
  return (
    <div className="flex items-center gap-2">
      <FlaskConical className="w-5 h-5 flex-shrink-0" style={{ color: ACCENT }} />
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline">
          <span className="font-bold text-[17px] tracking-tight" style={{ color: TEXT }}>JOBS</span>
          <span className="font-bold text-[17px] tracking-tight" style={{ color: ACCENT }}>DONE</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="flex-1 h-px" style={{ background: `${ACCENT}30` }} />
          <span className="text-[9px] font-medium tracking-[0.16em] uppercase" style={{ color: `${TEXT}35` }}>Labs</span>
          <span className="flex-1 h-px" style={{ background: `${ACCENT}30` }} />
        </div>
      </div>
    </div>
  );
}

function Slider({
  label, value, onChange, min, max, step = 1, format, hint,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step?: number; format: (v: number) => string; hint?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-semibold" style={{ color: TEXT }}>{label}</label>
        <span className="text-[15px] font-bold" style={{ color: ACCENT }}>{format(value)}</span>
      </div>
      <div className="relative h-1.5 rounded-full" style={{ background: BORDER }}>
        <div
          className="absolute left-0 top-0 h-1.5 rounded-full transition-all duration-100"
          style={{ width: `${pct}%`, background: ACCENT }}
        />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full pointer-events-none transition-all duration-100"
          style={{ left: `calc(${pct}% - 7px)`, background: ACCENT, border: `2px solid ${BG}`, boxShadow: `0 0 0 1px ${ACCENT}` }}
        />
      </div>
      {hint && <p className="text-[12px]" style={{ color: MUTED }}>{hint}</p>}
    </div>
  );
}

function ResultCard({ icon, label, value, sub, highlight = false }: {
  icon: React.ReactNode; label: string; value: string; sub?: string; highlight?: boolean;
}) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-2"
      style={{
        background: highlight ? ACCENT : SURFACE,
        border: `1px solid ${highlight ? ACCENT : BORDER}`,
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ background: highlight ? "rgba(255,255,255,0.15)" : `${ACCENT}12` }}
      >
        <span style={{ color: highlight ? "#fff" : ACCENT }}>{icon}</span>
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: highlight ? "rgba(255,255,255,0.65)" : MUTED }}>{label}</p>
      <p className="text-[1.5rem] font-black leading-none" style={{ color: highlight ? "#fff" : TEXT }}>{value}</p>
      {sub && <p className="text-[12px]" style={{ color: highlight ? "rgba(255,255,255,0.5)" : MUTED }}>{sub}</p>}
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
    const leakagePct = Math.min(0.35, responseHours * 0.05 + 0.15);
    const recoveredLeakage = monthlyLeads * leakagePct * (closeRate / 100) * dealSize;
    const closeRateLift = Math.min(closeRate * 0.25, 12);
    const improvedCloseRevenue = monthlyLeads * ((closeRate + closeRateLift) / 100) * dealSize - currentMonthlyRevenue;
    const totalMonthlyRecovery = recoveredLeakage + improvedCloseRevenue;
    const ninetyDayRecovery = totalMonthlyRecovery * 3;
    const annualRecovery = totalMonthlyRecovery * 12;
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
    n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M`
    : n >= 1000 ? `$${(n / 1000).toFixed(0)}K`
    : `$${n}`;

  return (
    <div className="min-h-screen font-sans" style={{ background: BG, color: TEXT }}>

      {/* NAV */}
      <header className="sticky top-0 z-50 transition-all duration-200" style={{ background: `${BG}e0`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/"><JobsDoneLogo /></Link>
          <Link href="/">
            <button
              className="flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-150"
              style={{ color: MUTED }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = TEXT}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUTED}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to home
            </button>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: ACCENT }}>ROI Calculator</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: TEXT, letterSpacing: "-0.025em" }}>
            How much revenue are you<br className="hidden md:block" /> currently leaving on the table?
          </h1>
          <p className="text-[16px] leading-relaxed max-w-xl mx-auto" style={{ color: MUTED }}>
            Adjust the sliders to match your business — we'll show you exactly what slow follow-up and manual bottlenecks are costing you every month.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">

          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-xl p-7 flex flex-col gap-7"
            style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
          >
            <div>
              <h2 className="text-[17px] font-bold mb-1" style={{ color: TEXT }}>Your current numbers</h2>
              <p className="text-[13px]" style={{ color: MUTED }}>Drag the sliders to reflect your business today.</p>
            </div>

            <Slider label="Monthly leads" value={monthlyLeads} onChange={setMonthlyLeads} min={10} max={500} step={5}
              format={v => `${v} leads`} hint="All inbound inquiries across every channel" />
            <Slider label="Average deal / client value" value={dealSize} onChange={setDealSize} min={500} max={25000} step={500}
              format={v => fmt$(v)} hint="What the average new client is worth to your business" />
            <Slider label="Current close rate" value={closeRate} onChange={setCloseRate} min={1} max={60} step={1}
              format={v => `${v}%`} hint="Of leads that enter your pipeline, how many become clients" />
            <Slider label="Average lead response time" value={responseHours} onChange={setResponseHours} min={0} max={48} step={1}
              format={v => v === 0 ? "Instant" : v === 1 ? "1 hour" : `${v} hours`}
              hint="How long before a new lead hears back from your team" />

            <div className="rounded-lg p-4" style={{ background: BG2, border: `1px solid ${BORDER}` }}>
              <p className="text-[12px] leading-relaxed" style={{ color: MUTED }}>
                <span className="font-semibold" style={{ color: TEXT }}>How we calculate this: </span>
                We model lead leakage (leads lost to slow response and no follow-up) plus the close rate lift from sub-5-minute response times and automated nurture sequences — based on industry benchmarks.
              </p>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <ResultCard icon={<DollarSign className="w-4 h-4" />} label="Monthly revenue recovered"
                value={fmt$(results.totalMonthlyRecovery)} sub="By eliminating lead leakage + boosting close rate" />
              <ResultCard icon={<TrendingUp className="w-4 h-4" />} label="90-day recovery"
                value={fmt$(results.ninetyDayRecovery)} sub="Within your first quarter" highlight />
              <ResultCard icon={<Zap className="w-4 h-4" />} label="Annual revenue upside"
                value={fmt$(results.annualRecovery)} sub="If current trajectory continues" />
              <ResultCard icon={<Clock className="w-4 h-4" />} label="Hours saved per week"
                value={`${results.hoursSaved}h`} sub="Freed from manual ops work" />
            </div>

            {/* Guarantee callout */}
            <div
              className="rounded-xl p-5 text-center"
              style={{
                background: results.meetsGuarantee ? "#0d2e1a" : `${ACCENT}08`,
                border: `1px solid ${results.meetsGuarantee ? "#1a5c34" : `${ACCENT}25`}`,
              }}
            >
              {results.meetsGuarantee ? (
                <>
                  <p className="font-bold text-[15px] mb-1.5" style={{ color: "#34d399" }}>✓ You qualify for our $30K guarantee</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: "#34d39980" }}>
                    Based on your numbers, we're confident we can deliver $30,000+ in recovered revenue within 90 days — or we keep working until we do.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold text-[15px] mb-1.5" style={{ color: ACCENT }}>Increase your leads or deal size to unlock the guarantee</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
                    Our $30K guarantee applies when there's enough volume to work with. Book a call — we'll tell you honestly if we're a fit.
                  </p>
                </>
              )}
            </div>

            {/* CTA */}
            <div className="rounded-xl p-6 text-center flex flex-col gap-4" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <div>
                <p className="font-bold text-[15px] mb-1" style={{ color: TEXT }}>
                  Ready to stop leaving {fmt$(results.annualRecovery)}/year on the table?
                </p>
                <p className="text-[13px]" style={{ color: MUTED }}>
                  Book a free 45-minute audit call. We'll map your exact leaks and hand you a custom roadmap.
                </p>
              </div>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                <button
                  className="w-full font-semibold text-[14px] h-11 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2"
                  style={{ background: ACCENT, color: "#fff" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#1a54e0"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ACCENT}
                >
                  Book a Free Audit Call <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <p className="text-[12px]" style={{ color: `${MUTED}70` }}>No commitment. No sales pressure. You keep the roadmap either way.</p>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
