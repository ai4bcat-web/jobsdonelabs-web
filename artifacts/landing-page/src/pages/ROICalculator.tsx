import { useState, useMemo } from "react";
import BookingModal from "@/components/BookingModal";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ACCENT      = "#1466FF";
const CREAM       = "#F4EFE3";
const CREAM2      = "#EFE8D8";
const INK         = "#0B0D12";
const INK2        = "#11131B";
const INK_SOFT    = "#54596A";
const LINE        = "rgba(11,13,18,.12)";

function Logo() {
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

function Slider({ label, value, onChange, min, max, step=1, format }: {
  label:string; value:number; onChange:(v:number)=>void;
  min:number; max:number; step?:number; format:(v:number)=>string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <label style={{ fontSize:13.5, fontWeight:600, color:INK, fontFamily:"'Hanken Grotesk',sans-serif" }}>{label}</label>
        <span style={{ fontSize:16, fontWeight:700, color:ACCENT, fontFamily:"'Hanken Grotesk',sans-serif" }}>{format(value)}</span>
      </div>
      <div style={{ position:"relative", height:6, borderRadius:99, background:LINE }}>
        <div style={{ position:"absolute", left:0, top:0, height:"100%", borderRadius:99, background:ACCENT, width:`${pct}%`, transition:"width .08s" }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ position:"absolute", inset:0, width:"100%", opacity:0, cursor:"pointer", height:"100%", margin:0 }} />
        <div style={{ position:"absolute", top:"50%", transform:"translateY(-50%)", width:16, height:16, borderRadius:"50%",
          background:ACCENT, border:`2.5px solid ${CREAM}`, boxShadow:`0 0 0 1.5px ${ACCENT}`,
          left:`calc(${pct}% - 8px)`, pointerEvents:"none", transition:"left .08s" }} />
      </div>
    </div>
  );
}

export default function ROICalculator() {
  const [showBooking, setShowBooking]       = useState(false);
  const [annualRevenue, setAnnualRevenue]   = useState(1500000);
  const [leadsPerMonth, setLeadsPerMonth]   = useState(120);
  const [dealValue, setDealValue]           = useState(2500);
  const [leadsLostPct, setLeadsLostPct]     = useState(25);
  const [adminHours, setAdminHours]         = useState(40);

  const results = useMemo(() => {
    const leadRecovery      = Math.round(leadsPerMonth * (leadsLostPct / 100) * dealValue * 0.12 * 12);
    const adminRecovery     = Math.round(adminHours * 52 * 23.8 / 500) * 500;
    const efficiencyGain    = Math.round(annualRevenue * 0.011 / 500) * 500;
    const total             = leadRecovery + adminRecovery + efficiencyGain;
    return { leadRecovery, adminRecovery, efficiencyGain, total };
  }, [annualRevenue, leadsPerMonth, dealValue, leadsLostPct, adminHours]);

  const fmtRevenue = (v: number) =>
    v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : `$${(v / 1_000).toFixed(0)}K`;

  const fmtDollar = (v: number) =>
    `$${v.toLocaleString("en-US")}`;

  return (
    <div style={{ minHeight:"100vh", background:CREAM, color:INK, fontFamily:"'Hanken Grotesk',sans-serif", display:"flex", flexDirection:"column" }}>

      {/* Nav */}
      <header style={{ position:"sticky", top:0, zIndex:50, background:"rgba(244,239,227,.92)", backdropFilter:"blur(14px)", borderBottom:`1px solid ${LINE}` }}>
        <div style={{ maxWidth:1120, margin:"0 auto", padding:"0 24px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <Link href="/"><Logo /></Link>
          <nav style={{ display:"flex", alignItems:"center", gap:28 }}>
            {["Services","Industries","FAQ"].map(l => (
              <Link key={l} href={`/#${l.toLowerCase()}`}>
                <span style={{ fontSize:14, fontWeight:600, color:INK_SOFT, cursor:"pointer", fontFamily:"'Hanken Grotesk',sans-serif",
                  textDecoration:"none", transition:"color .15s" }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color=INK}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color=INK_SOFT}>
                  {l}
                </span>
              </Link>
            ))}
            <button onClick={() => setShowBooking(true)}
              style={{ background:ACCENT, color:"#fff", border:"none", borderRadius:50,
                padding:"10px 22px", fontSize:14, fontWeight:700, cursor:"pointer",
                fontFamily:"'Hanken Grotesk',sans-serif", boxShadow:`0 4px 16px -4px ${ACCENT}66` }}>
              Book a Call
            </button>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth:1120, margin:"0 auto", padding:"48px 24px 80px", flex:1 }}>

        {/* Breadcrumb */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:40 }}>
          <Link href="/">
            <span style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13.5, fontWeight:600,
              color:INK_SOFT, cursor:"pointer", textDecoration:"none" }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color=INK}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color=INK_SOFT}>
              <ArrowLeft size={14} /> Back to home
            </span>
          </Link>
          <div style={{ display:"inline-flex", alignItems:"center", gap:7, border:`1.5px solid ${ACCENT}`,
            borderRadius:50, padding:"4px 12px" }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:ACCENT, flexShrink:0 }} />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
              color:ACCENT, fontFamily:"'Hanken Grotesk',sans-serif" }}>ROI Calculator</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ maxWidth:560, marginBottom:48 }}>
          <h1 className="anton" style={{ fontSize:"clamp(2.2rem,4.5vw,3.4rem)", lineHeight:1.06,
            color:INK, marginBottom:16 }}>
            See what we can<br />recover for you.
          </h1>
          <p style={{ fontSize:16, lineHeight:1.68, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>
            Move the sliders to match your business. This is a rough estimate of the net profit hiding in your operation — the free audit gives you the exact number.
          </p>
        </div>

        {/* Two panels */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" }}
          className="grid-roi-panels">

          {/* Left: sliders */}
          <div style={{ background:CREAM2, border:`1px solid ${LINE}`, borderRadius:16,
            padding:"32px 28px", display:"flex", flexDirection:"column", gap:28 }}>
            <Slider label="Annual revenue" value={annualRevenue} onChange={setAnnualRevenue}
              min={200000} max={10000000} step={100000} format={fmtRevenue} />
            <Slider label="Leads per month" value={leadsPerMonth} onChange={setLeadsPerMonth}
              min={10} max={500} step={5} format={v => `${v}`} />
            <Slider label="Avg. job / deal value" value={dealValue} onChange={setDealValue}
              min={500} max={50000} step={500} format={v => `$${v.toLocaleString("en-US")}`} />
            <Slider label="Leads lost to slow follow-up" value={leadsLostPct} onChange={setLeadsLostPct}
              min={5} max={60} step={1} format={v => `${v}%`} />
            <Slider label="Admin hours / week (team)" value={adminHours} onChange={setAdminHours}
              min={5} max={200} step={5} format={v => `${v}`} />
          </div>

          {/* Right: results */}
          <div style={{ background:INK2, borderRadius:16, padding:"36px 32px",
            display:"flex", flexDirection:"column", gap:0 }}>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase",
              color:"rgba(255,255,255,.45)", fontFamily:"'Hanken Grotesk',sans-serif", marginBottom:10 }}>
              Estimated annual recovery
            </p>
            <p style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontSize:"clamp(2.6rem,4vw,3.6rem)",
              fontWeight:900, color:"#fff", lineHeight:1, marginBottom:14 }}>
              {fmtDollar(results.total)}
            </p>
            <p style={{ fontSize:14.5, lineHeight:1.6, color:"rgba(255,255,255,.55)",
              fontFamily:"'Hanken Grotesk',sans-serif", marginBottom:28 }}>
              What our systems could put back on your bottom line in the first 12 months.
            </p>

            {/* Line items */}
            <div style={{ display:"flex", flexDirection:"column", gap:0,
              borderTop:"1px solid rgba(255,255,255,.1)", marginBottom:28 }}>
              {[
                { label:"Recovered lost leads",        value:results.leadRecovery },
                { label:"Reclaimed admin time",        value:results.adminRecovery },
                { label:"Faster cash & efficiency",    value:results.efficiencyGain },
              ].map(item => (
                <div key={item.label} style={{ display:"flex", justifyContent:"space-between",
                  alignItems:"center", padding:"13px 0",
                  borderBottom:"1px solid rgba(255,255,255,.08)" }}>
                  <span style={{ fontSize:14, color:"rgba(255,255,255,.62)",
                    fontFamily:"'Hanken Grotesk',sans-serif" }}>{item.label}</span>
                  <span style={{ fontSize:14, fontWeight:700, color:"rgba(255,255,255,.9)",
                    fontFamily:"'Hanken Grotesk',sans-serif" }}>{fmtDollar(item.value)}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button onClick={() => setShowBooking(true)}
              style={{ width:"100%", padding:"16px", borderRadius:50, border:"none",
                background:ACCENT, color:"#fff", fontSize:15, fontWeight:700,
                cursor:"pointer", fontFamily:"'Hanken Grotesk',sans-serif",
                display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                marginBottom:14, boxShadow:`0 6px 24px -6px ${ACCENT}88` }}>
              Book your free audit <ArrowRight size={16} />
            </button>
            <p style={{ fontSize:12, color:"rgba(255,255,255,.32)", textAlign:"center",
              fontFamily:"'Hanken Grotesk',sans-serif", lineHeight:1.5 }}>
              Estimate only. The free audit gives you a precise, line-item recovery number.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background:INK2, padding:"28px 24px" }}>
        <div style={{ maxWidth:1120, margin:"0 auto", display:"flex",
          alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", fontFamily:"'Hanken Grotesk',sans-serif" }}>
            © 2026 Jobs Done Labs. All rights reserved.
          </p>
          <div style={{ display:"flex", gap:20 }}>
            {[["Privacy Policy","/privacy"],["Terms of Service","/terms"],["Contact","/contact"]].map(([label,href]) => (
              <Link key={label} href={href}>
                <span style={{ fontSize:13, color:"rgba(255,255,255,.45)", cursor:"pointer",
                  fontFamily:"'Hanken Grotesk',sans-serif" }}>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <BookingModal open={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
}
