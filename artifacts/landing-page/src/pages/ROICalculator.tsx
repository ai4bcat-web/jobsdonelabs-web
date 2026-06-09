import { useState, useMemo } from "react";
import BookingModal from "@/components/BookingModal";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, TrendingUp, DollarSign, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

const ACCENT      = "#1466FF";
const ACCENT_DEEP = "#0B49C9";
const CREAM       = "#F4EFE3";
const CREAM2      = "#EFE8D8";
const INK         = "#0B0D12";
const INK_SOFT    = "#54596A";
const LINE        = "rgba(11,13,18,.12)";
const GREEN       = "#34d399";

function SubLogo() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, userSelect:"none" }}>
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none">
        <path d="M18 7 H30 M20 7 V19 L11.5 38 Q10 41.5 13.8 41.5 H34.2 Q38 41.5 36.5 38 L28 19 V7"
          stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="20.5" y1="25.5" x2="26" y2="30.5" stroke={ACCENT} strokeWidth="2" strokeLinecap="round"/>
        <line x1="26" y1="30.5" x2="20.5" y2="35.5" stroke={ACCENT} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20.5" cy="25.5" r="2.6" fill={ACCENT}/>
        <circle cx="26.5" cy="30.5" r="2.6" fill={ACCENT}/>
        <circle cx="20.5" cy="35.5" r="2.6" fill={ACCENT}/>
      </svg>
      <div style={{ display:"flex", flexDirection:"column", lineHeight:1 }}>
        <span style={{ fontStyle:"italic", fontWeight:800, fontSize:17, letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif" }}>
          <span style={{ color:INK }}>JOBS</span><span style={{ color:ACCENT }}>DONE</span>
        </span>
        <span style={{ display:"flex", alignItems:"center", gap:"0.4em", marginTop:4, fontWeight:700, fontSize:5, letterSpacing:"0.42em", color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>
          <span style={{ flex:1, height:1.5, background:"currentColor", opacity:0.5 }} />
          <span style={{ paddingLeft:"0.42em" }}>LABS</span>
          <span style={{ flex:1, height:1.5, background:"currentColor", opacity:0.5 }} />
        </span>
      </div>
    </div>
  );
}

function Slider({ label, value, onChange, min, max, step=1, format, hint }: {
  label:string; value:number; onChange:(v:number)=>void;
  min:number; max:number; step?:number; format:(v:number)=>string; hint?:string;
}) {
  const pct = ((value-min)/(max-min))*100;
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <label style={{ fontSize:13, fontWeight:600, color:INK, fontFamily:"'Hanken Grotesk',sans-serif" }}>{label}</label>
        <span style={{ fontSize:15, fontWeight:700, color:ACCENT, fontFamily:"'Hanken Grotesk',sans-serif" }}>{format(value)}</span>
      </div>
      <div className="relative h-1.5 rounded-full" style={{ background:LINE }}>
        <div className="absolute left-0 top-0 h-1.5 rounded-full transition-all duration-100" style={{ width:`${pct}%`, background:ACCENT }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5" />
        <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full pointer-events-none transition-all duration-100"
          style={{ left:`calc(${pct}% - 7px)`, background:ACCENT, border:`2px solid ${CREAM}`, boxShadow:`0 0 0 1px ${ACCENT}` }} />
      </div>
      {hint && <p style={{ fontSize:12, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>{hint}</p>}
    </div>
  );
}

function ResultCard({ icon, label, value, sub, highlight=false }: {
  icon:React.ReactNode; label:string; value:string; sub?:string; highlight?:boolean;
}) {
  return (
    <div className="rounded-xl p-5 flex flex-col gap-2"
      style={{ background:highlight?ACCENT:CREAM, border:`1px solid ${highlight?ACCENT:LINE}` }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ background:highlight?"rgba(255,255,255,.18)":`${ACCENT}14` }}>
        <span style={{ color:highlight?"#fff":ACCENT }}>{icon}</span>
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-wider mt-0.5" style={{ color:highlight?"rgba(255,255,255,.65)":INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>{label}</p>
      <p className="text-[1.5rem] font-black leading-none" style={{ color:highlight?"#fff":INK, fontFamily:"'Hanken Grotesk',sans-serif" }}>{value}</p>
      {sub && <p className="text-[12px]" style={{ color:highlight?"rgba(255,255,255,.55)":INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>{sub}</p>}
    </div>
  );
}

export default function ROICalculator() {
  const [showBooking, setShowBooking] = useState(false);
  const [monthlyLeads, setMonthlyLeads]     = useState(80);
  const [dealSize, setDealSize]             = useState(3000);
  const [closeRate, setCloseRate]           = useState(20);
  const [responseHours, setResponseHours]   = useState(4);

  const results = useMemo(() => {
    const currentMonthlyRevenue    = (monthlyLeads*(closeRate/100))*dealSize;
    const leakagePct               = Math.min(0.35, responseHours*0.05+0.15);
    const recoveredLeakage         = monthlyLeads*leakagePct*(closeRate/100)*dealSize;
    const closeRateLift            = Math.min(closeRate*0.25, 12);
    const improvedCloseRevenue     = monthlyLeads*((closeRate+closeRateLift)/100)*dealSize - currentMonthlyRevenue;
    const totalMonthlyRecovery     = recoveredLeakage+improvedCloseRevenue;
    const ninetyDayRecovery        = totalMonthlyRecovery*3;
    const annualRecovery           = totalMonthlyRecovery*12;
    const hoursSaved               = Math.round(10+(monthlyLeads/20));
    const roiMultiple              = ninetyDayRecovery>0?(ninetyDayRecovery/2000).toFixed(1):"—";
    return {
      currentMonthlyRevenue: Math.round(currentMonthlyRevenue),
      totalMonthlyRecovery:  Math.round(totalMonthlyRecovery),
      ninetyDayRecovery:     Math.round(ninetyDayRecovery),
      annualRecovery:        Math.round(annualRecovery),
      hoursSaved, roiMultiple,
      meetsGuarantee: ninetyDayRecovery>=30000,
    };
  }, [monthlyLeads,dealSize,closeRate,responseHours]);

  const fmt$ = (n:number) =>
    n>=1000000?`$${(n/1000000).toFixed(1)}M`
    :n>=1000?`$${(n/1000).toFixed(0)}K`
    :`$${n}`;

  return (
    <div className="min-h-screen" style={{ background:CREAM2, color:INK, fontFamily:"'Hanken Grotesk',sans-serif" }}>
      <header className="sticky top-0 z-50" style={{ background:"rgba(244,239,227,.88)", backdropFilter:"blur(14px)", borderBottom:`1px solid ${LINE}` }}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/"><SubLogo /></Link>
          <Link href="/">
            <button className="flex items-center gap-1.5 transition-colors duration-150"
              style={{ fontSize:13, fontWeight:600, color:INK_SOFT, border:"none", background:"none", cursor:"pointer", fontFamily:"'Hanken Grotesk',sans-serif" }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color=INK}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color=INK_SOFT}>
              <ArrowLeft className="w-3.5 h-3.5" /> Back to home
            </button>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-14">
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
          className="text-center mb-12">
          <p style={{ fontSize:11.5, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:ACCENT, marginBottom:12, fontFamily:"'Hanken Grotesk',sans-serif" }}>ROI Calculator</p>
          <h1 className="anton" style={{ fontSize:"clamp(2rem,4.5vw,3rem)", color:INK, letterSpacing:"-0.01em", lineHeight:1.08, marginBottom:14 }}>
            How much revenue are you<br className="hidden md:block" /> currently leaving on the table?
          </h1>
          <p style={{ fontSize:16, lineHeight:1.65, maxWidth:520, margin:"0 auto", color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>
            Adjust the sliders to match your business — we'll show you exactly what slow follow-up and manual bottlenecks are costing you every month.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <motion.div initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.4, delay:0.1 }}
            className="rounded-xl p-7 flex flex-col gap-7"
            style={{ background:CREAM, border:`1px solid ${LINE}` }}>
            <div>
              <h2 style={{ fontSize:17, fontWeight:700, marginBottom:4, color:INK, fontFamily:"'Hanken Grotesk',sans-serif" }}>Your current numbers</h2>
              <p style={{ fontSize:13, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>Drag the sliders to reflect your business today.</p>
            </div>
            <Slider label="Monthly leads" value={monthlyLeads} onChange={setMonthlyLeads} min={10} max={500} step={5}
              format={v=>`${v} leads`} hint="All inbound inquiries across every channel" />
            <Slider label="Average deal / client value" value={dealSize} onChange={setDealSize} min={500} max={25000} step={500}
              format={v=>fmt$(v)} hint="What the average new client is worth to your business" />
            <Slider label="Current close rate" value={closeRate} onChange={setCloseRate} min={1} max={60}
              format={v=>`${v}%`} hint="Of leads that enter your pipeline, how many become clients" />
            <Slider label="Average lead response time" value={responseHours} onChange={setResponseHours} min={0} max={48}
              format={v=>v===0?"Instant":v===1?"1 hour":`${v} hours`}
              hint="How long before a new lead hears back from your team" />
            <div className="rounded-lg p-4" style={{ background:CREAM2, border:`1px solid ${LINE}` }}>
              <p style={{ fontSize:12, lineHeight:1.65, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                <span style={{ fontWeight:600, color:INK }}>How we calculate this: </span>
                We model lead leakage (leads lost to slow response and no follow-up) plus the close rate lift from sub-5-minute response times and automated nurture sequences — based on industry benchmarks.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.4, delay:0.15 }}
            className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <ResultCard icon={<DollarSign className="w-4 h-4"/>} label="Monthly revenue recovered"
                value={fmt$(results.totalMonthlyRecovery)} sub="By eliminating lead leakage + boosting close rate" />
              <ResultCard icon={<TrendingUp className="w-4 h-4"/>} label="90-day recovery"
                value={fmt$(results.ninetyDayRecovery)} sub="Within your first quarter" highlight />
              <ResultCard icon={<Zap className="w-4 h-4"/>} label="Annual revenue upside"
                value={fmt$(results.annualRecovery)} sub="If current trajectory continues" />
              <ResultCard icon={<Clock className="w-4 h-4"/>} label="Hours saved per week"
                value={`${results.hoursSaved}h`} sub="Freed from manual ops work" />
            </div>

            <div className="rounded-xl p-5 text-center"
              style={{ background:results.meetsGuarantee?`${GREEN}12`:`${ACCENT}0A`,
                border:`1px solid ${results.meetsGuarantee?`${GREEN}40`:`${ACCENT}25`}` }}>
              {results.meetsGuarantee ? (
                <>
                  <p style={{ fontWeight:700, fontSize:15, marginBottom:6, color:"#0a9968", fontFamily:"'Hanken Grotesk',sans-serif" }}>✓ You qualify for our $30K guarantee</p>
                  <p style={{ fontSize:13, lineHeight:1.65, color:"#0a996880", fontFamily:"'Hanken Grotesk',sans-serif" }}>Based on your numbers, we're confident we can generate $30,000+ in net profit within 90 days — or we keep working until we do.</p>
                </>
              ) : (
                <>
                  <p style={{ fontWeight:700, fontSize:15, marginBottom:6, color:ACCENT, fontFamily:"'Hanken Grotesk',sans-serif" }}>Increase your leads or deal size to unlock the guarantee</p>
                  <p style={{ fontSize:13, lineHeight:1.65, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>Our $30K guarantee applies when there's enough volume to work with. Book a call — we'll tell you honestly if we're a fit.</p>
                </>
              )}
            </div>

            <div className="rounded-xl p-6 text-center flex flex-col gap-4" style={{ background:CREAM, border:`1px solid ${LINE}` }}>
              <div>
                <p style={{ fontWeight:700, fontSize:15, marginBottom:4, color:INK, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                  Ready to stop leaving {fmt$(results.annualRecovery)}/year on the table?
                </p>
                <p style={{ fontSize:13, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                  Book a free 45-minute audit call. We'll map your exact leaks and hand you a custom roadmap.
                </p>
              </div>
              <button onClick={() => setShowBooking(true)}
                className="w-full h-11 rounded-lg flex items-center justify-center gap-2 transition-colors duration-150"
                style={{ background:ACCENT, color:"#fff", fontWeight:700, fontSize:14, border:"none", cursor:"pointer",
                  boxShadow:`0 4px 16px -4px ${ACCENT}55`, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                Book a Free Audit Call <ArrowRight className="w-4 h-4" />
              </button>
              <p style={{ fontSize:12, color:INK_SOFT, opacity:.6, fontFamily:"'Hanken Grotesk',sans-serif" }}>No commitment. No sales pressure. You keep the roadmap either way.</p>
            </div>
          </motion.div>
        </div>
      </main>
      <BookingModal open={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
}
