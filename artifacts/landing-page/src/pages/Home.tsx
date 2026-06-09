import { useState, useEffect, useRef } from "react";
import BookingModal from "@/components/BookingModal";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Star, Check, X, Plus,
  Clock, PhoneOff, Route, Eye,
  Home as HomeIcon, Truck, Building2,
  Filter, Database, Settings, BarChart3,
  Linkedin, Youtube, Twitter,
} from "lucide-react";

/* ───────────────────────────────────────────── */
/*  Design tokens                                */
/* ───────────────────────────────────────────── */
const CREAM       = "#F4EFE3";
const CREAM2      = "#EFE8D8";
const INK         = "#0B0D12";
const INK2        = "#11131B";
const INK_SOFT    = "#54596A";
const LINE        = "rgba(11,13,18,.12)";
const ACCENT      = "#1466FF";
const ACCENT_DEEP = "#0B49C9";
const GREEN       = "#34d399";

/* ───────────────────────────────────────────── */
/*  Brand                                        */
/* ───────────────────────────────────────────── */
function FlaskMark({ stroke = ACCENT, size = 32 }: { stroke?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M18 7 H30 M20 7 V19 L11.5 38 Q10 41.5 13.8 41.5 H34.2 Q38 41.5 36.5 38 L28 19 V7"
        stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20.5" y1="25.5" x2="26" y2="30.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="30.5" x2="20.5" y2="35.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <circle cx="20.5" cy="25.5" r="2.6" fill={stroke} />
      <circle cx="26.5" cy="30.5" r="2.6" fill={stroke} />
      <circle cx="20.5" cy="35.5" r="2.6" fill={stroke} />
    </svg>
  );
}

function Wordmark({ size = 20, onDark = false }: { size?: number; onDark?: boolean }) {
  const inkColor   = onDark ? CREAM : INK;
  const mutedColor = onDark ? "rgba(244,239,227,.65)" : INK_SOFT;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, fontSize:size, lineHeight:1, userSelect:"none" }}>
      <FlaskMark stroke={ACCENT} size={Math.round(size * 1.55)} />
      <div style={{ display:"flex", flexDirection:"column" }}>
        <span style={{ fontStyle:"italic", fontWeight:800, letterSpacing:"-0.01em", fontSize:"1em", fontFamily:"'Hanken Grotesk',sans-serif" }}>
          <span style={{ color:inkColor }}>JOBS</span><span style={{ color:ACCENT }}>DONE</span>
        </span>
        <span style={{ display:"flex", alignItems:"center", gap:"0.4em", marginTop:"0.35em",
          fontWeight:700, fontSize:"0.28em", letterSpacing:"0.42em",
          color:mutedColor, fontFamily:"'Hanken Grotesk',sans-serif" }}>
          <span style={{ flex:1, height:1.5, background:"currentColor", opacity:0.5 }} />
          <span style={{ paddingLeft:"0.42em" }}>LABS</span>
          <span style={{ flex:1, height:1.5, background:"currentColor", opacity:0.5 }} />
        </span>
      </div>
    </div>
  );
}

function StampBadge({ size = 104 }: { size?: number }) {
  const r = 40, cx = 50, cy = 50;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="spin-slow" aria-hidden="true">
      <defs>
        <path id="stamp-ring" d={`M ${cx},${cy-r} A ${r},${r} 0 1,1 ${cx-0.001},${cy-r}`} />
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={ACCENT} />
      <circle cx={cx} cy={cy} r={r-7} fill="none" stroke="rgba(255,255,255,.32)" strokeWidth="1" strokeDasharray="3 3" />
      <text fill="white" style={{ fontFamily:"'Anton','Impact',sans-serif", fontSize:8.5, letterSpacing:"0.13em" }}>
        <textPath href="#stamp-ring" startOffset="50%" textAnchor="middle">$30K GUARANTEED · 90 DAYS · $30K GUARANTEED · 90 DAYS ·</textPath>
      </text>
      <text x={cx} y={cy-3} textAnchor="middle" fill="white" style={{ fontFamily:"'Anton','Impact',sans-serif", fontSize:17, letterSpacing:"-0.01em" }}>$30K</text>
      <text x={cx} y={cy+11} textAnchor="middle" fill="rgba(255,255,255,.82)" style={{ fontFamily:"'Anton','Impact',sans-serif", fontSize:8, letterSpacing:"0.08em" }}>GUAR.</text>
    </svg>
  );
}

/* ───────────────────────────────────────────── */
/*  VSL Player                                   */
/* ───────────────────────────────────────────── */
function VSL({ videoId = "FP_yxHX9Zvc" }: { videoId?: string }) {
  const [sound, setSound] = useState(false);
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${sound?0:1}&rel=0&playsinline=1&modestbranding=1`;
  return (
    <div style={{ width:"100%", borderRadius:18, overflow:"hidden", background:"#0A0E16", position:"relative", boxShadow:"0 24px 64px -16px rgba(0,0,0,.28)" }}>
      <div style={{ position:"absolute", inset:0, zIndex:0,
        background:"radial-gradient(70% 90% at 50% 25%,rgba(20,102,255,.28),transparent 60%)" }} />
      <div style={{ position:"relative", zIndex:1, aspectRatio:"16/9", width:"100%",
        background:"linear-gradient(135deg,#0E1422 0%,#0A101C 55%,#0B1730 100%)",
        display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ position:"absolute", inset:0,
          backgroundImage:"linear-gradient(rgba(255,255,255,.042) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.042) 1px,transparent 1px)",
          backgroundSize:"46px 46px",
          maskImage:"radial-gradient(68% 68% at 50% 44%,#000,transparent)" }} />
        <iframe key={sound?"snd":"mut"}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:0, zIndex:3 }}
          src={src} title="Jobs Done Labs — Profit Recovery"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen />
        {!sound && (
          <button onClick={() => setSound(true)}
            style={{ position:"absolute", inset:0, zIndex:4, border:"none", cursor:"pointer", padding:"18px 20px",
              background:"linear-gradient(0deg,rgba(0,0,0,.36),transparent 44%)",
              display:"flex", alignItems:"flex-end", justifyContent:"flex-start" }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:9,
              background:"rgba(10,14,22,.78)", backdropFilter:"blur(6px)",
              color:"#fff", fontSize:14, fontWeight:700, letterSpacing:"-0.01em",
              padding:"10px 16px", borderRadius:100,
              boxShadow:"0 8px 22px -6px rgba(0,0,0,.5)", fontFamily:"'Hanken Grotesk',sans-serif" }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color:ACCENT, flex:"0 0 auto" }}>
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8v8a4.5 4.5 0 002.5-4zM14 3v2.06a7 7 0 010 13.88V21a9 9 0 000-18z" />
              </svg>
              Watch the 4-min breakdown
              <span style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,.55)" }}>· Tap for sound</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/*  Profit Recovery Tracker                      */
/* ───────────────────────────────────────────── */
const LEAKS = [
  { icon:<Filter size={15}/>,   name:"Lead response system",  pct:"92%", amt:"+$11.2K" },
  { icon:<Settings size={15}/>, name:"Quote automation",       pct:"84%", amt:"+$9.4K"  },
  { icon:<Database size={15}/>, name:"Scheduling & ops",       pct:"76%", amt:"+$7.1K"  },
  { icon:<BarChart3 size={15}/>,name:"Billing & reporting",    pct:"68%", amt:"+$5.8K"  },
];

function Tracker() {
  return (
    <div style={{ background:INK2, borderRadius:20, padding:28, border:"1px solid rgba(255,255,255,.08)", boxShadow:"0 24px 56px -12px rgba(0,0,0,.22)" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
        <span style={{ color:CREAM, fontWeight:700, fontSize:15, fontFamily:"'Hanken Grotesk',sans-serif" }}>Profit Recovery Tracker</span>
        <span style={{ background:"rgba(52,211,153,.15)", color:GREEN, fontSize:12, fontWeight:700, padding:"4px 10px", borderRadius:100, fontFamily:"'Hanken Grotesk',sans-serif" }}>LIVE</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {LEAKS.map(l => (
          <div key={l.name}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:7 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ color:ACCENT }}>{l.icon}</span>
                <span style={{ color:"rgba(244,239,227,.82)", fontSize:13.5, fontWeight:500, fontFamily:"'Hanken Grotesk',sans-serif" }}>{l.name}</span>
              </div>
              <span style={{ color:GREEN, fontSize:13, fontWeight:700, fontFamily:"'Hanken Grotesk',sans-serif" }}>{l.amt}</span>
            </div>
            <div style={{ height:7, background:"rgba(255,255,255,.07)", borderRadius:100, overflow:"hidden" }}>
              <div style={{ height:"100%", width:l.pct, background:`linear-gradient(90deg,${ACCENT},${ACCENT_DEEP})`, borderRadius:100 }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:22, paddingTop:18, borderTop:"1px solid rgba(255,255,255,.08)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ color:"rgba(244,239,227,.55)", fontSize:13, fontFamily:"'Hanken Grotesk',sans-serif" }}>Recovered this quarter</span>
        <span style={{ color:GREEN, fontSize:20, fontWeight:800, fontFamily:"'Hanken Grotesk',sans-serif" }}>$33.5K</span>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/*  ProfitDiagram                                */
/* ───────────────────────────────────────────── */
function ProfitDiagram() {
  const col = (label: string, items: string[], bg: string, textCol: string, border: string) => (
    <div style={{ flex:1, minWidth:0 }}>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:INK_SOFT, marginBottom:10, fontFamily:"'Hanken Grotesk',sans-serif" }}>{label}</div>
      <div style={{ background:bg, borderRadius:14, padding:"14px 16px", display:"flex", flexDirection:"column", gap:9, border:`1px solid ${border}` }}>
        {items.map(item => (
          <div key={item} style={{ fontSize:13, fontWeight:500, color:textCol, fontFamily:"'Hanken Grotesk',sans-serif" }}>{item}</div>
        ))}
      </div>
    </div>
  );
  const arrow = (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", paddingTop:30, flex:"0 0 auto" }}>
      <ArrowRight size={19} style={{ color:ACCENT }} />
    </div>
  );
  return (
    <div style={{ display:"flex", gap:10, alignItems:"stretch", marginBottom:36, flexWrap:"wrap" }}>
      {col("Where it leaks",["Missed follow-ups","Slow quoting","Manual dispatch","Invisible billing gaps"],CREAM,INK,LINE)}
      {arrow}
      {col("Recovery engine",["Auto lead capture","Quote automation","Ops command center","Revenue tracking"],INK,CREAM,"rgba(255,255,255,.09)")}
      {arrow}
      {col("What you keep",["$8K–$14K/yr back","$6K–$12K/yr back","$9K–$18K/yr back","$7K–$11K/yr back"],`${ACCENT}14`,ACCENT_DEEP,`${ACCENT}30`)}
    </div>
  );
}

/* ───────────────────────────────────────────── */
/*  Data                                         */
/* ───────────────────────────────────────────── */
const PAINS = [
  { icon:<PhoneOff size={20}/>, title:"Leads slip through the cracks",
    body:"Every missed response or slow follow-up costs you $2K–$5K in lost jobs. It's your biggest invisible drain.", cost:"$8,400–$14,000 / yr avg" },
  { icon:<Clock size={20}/>, title:"Quotes take too long, lose deals",
    body:"Manual quoting delays mean competitors win jobs you should have. Speed decides who gets the sale.", cost:"$6,200–$12,000 / yr avg" },
  { icon:<Route size={20}/>, title:"Ops run on memory and spreadsheets",
    body:"When systems live in people's heads, mistakes happen, capacity caps early, and you hire before you're ready.", cost:"$9,000–$18,000 / yr avg" },
  { icon:<Eye size={20}/>, title:"Billing and reporting lag behind",
    body:"Late invoices, missed upsells, and no real profitability visibility keep you reactive instead of in control.", cost:"$7,100–$11,000 / yr avg" },
];

const INDUSTRIES = [
  { icon:<HomeIcon size={22}/>, title:"Service Businesses",
    body:"HVAC, plumbing, electrical, field service — we stop the lead and scheduling leaks that cap your capacity.",
    tags:["Lead Response","Dispatch","Job Tracking"] },
  { icon:<Truck size={22}/>, title:"Logistics & Transportation",
    body:"Freight brokers, auto transport, last-mile delivery — we automate the ops that slow down your margin.",
    tags:["Load Management","Driver Ops","Customer Updates"] },
  { icon:<Building2 size={22}/>, title:"Manufacturing & Industrial",
    body:"Job shops, contract manufacturers, industrial services — we connect your floor to your books.",
    tags:["Quoting","Work Orders","Production Tracking"] },
];

const SERVICES = [
  { num:"01", title:"Lead & Quote Automation",
    body:"Every lead captured, responded to, and followed up automatically. Quotes generated and sent without your team touching a keyboard." },
  { num:"02", title:"Operations Command Center",
    body:"One view of every job, truck, technician, or order in motion. No more status calls, spreadsheet updates, or missed handoffs." },
  { num:"03", title:"Revenue Intelligence",
    body:"Real-time visibility into what's profitable, what's leaking, and what to fix next. Know your numbers without building reports manually." },
  { num:"04", title:"Client Communication Stack",
    body:"Automated updates, review requests, and upsell sequences that run without anyone on your team sending a single message." },
];

const STEPS = [
  { num:"01", title:"Profit Audit",
    body:"A deep-dive into your current ops — we map every system, workflow, and cost center. You'll see exactly where money is leaving the building." },
  { num:"02", title:"Custom Blueprint",
    body:"We design the exact stack for your business — no templates, no bloat. Just the systems that will recover your $30K." },
  { num:"03", title:"Build & Install",
    body:"We build it inside your business using tools you already pay for — or purpose-built where needed. You own everything." },
  { num:"04", title:"Recovered & Reinvested",
    body:"Inside 90 days, you're on new systems. The profit we recover goes back into scaling, not into fixing the same problems." },
];

const RESULTS_STATS = [
  { stat:"$200K+",  label:"Net new profit created in 12 months"  },
  { stat:"+120 bps",label:"Gross margin lift — same team"         },
  { stat:"$3.78M",  label:"Combined active sales pipeline"        },
  { stat:"96.2%",   label:"On-time delivery, up from 91.4%"       },
];

const COMPARISON_ROWS = [
  { feature:"Guaranteed results",      inhouse:false, freelance:false, jdl:true  },
  { feature:"Built for your industry", inhouse:false, freelance:null,  jdl:true  },
  { feature:"You own the systems",     inhouse:null,  freelance:false, jdl:true  },
  { feature:"Profit recovery focus",   inhouse:false, freelance:false, jdl:true  },
  { feature:"90-day delivery",         inhouse:false, freelance:false, jdl:true  },
  { feature:"No long-term retainer",   inhouse:null,  freelance:false, jdl:true  },
];

const GUARANTEE_ITEMS = [
  "$30K in recovered profit, guaranteed in 90 days",
  "If we miss, you pay nothing — zero. Not reduced. Zero.",
  "No retainer. No licensing. You own what we build.",
  "Every system tested and validated before handoff.",
];

const FAQ_ITEMS = [
  { q:"How can you guarantee $30K in 90 days?",
    a:"Because we don't take clients we can't deliver for. Before you pay anything, we run a Profit Audit. If we don't see a clear path to $30K, we tell you — and we part as friends. Once we start, we build the systems and stay accountable to the number." },
  { q:"What does it cost?",
    a:"Pricing depends on the scope we uncover in your audit. We've worked with businesses from $50K to $120K engagements. But here's what matters: every engagement is priced against a hard ROI target. If the math doesn't work for you, we won't sell you." },
  { q:"Do I need to already have software or tools?",
    a:"No. We'll work with what you have or build what makes sense. We use tools you already pay for where possible, and set up new ones when the ROI justifies it. You own everything we build or configure." },
  { q:"How long does implementation take?",
    a:"The audit takes 1–2 weeks. Build phase is typically 6–10 weeks. You'll see early wins in the first 30 days — systems coming online, numbers improving. The guarantee window is 90 days from kickoff." },
  { q:"Who handles the systems after you build them?",
    a:"You do. We document everything, train your team, and hand off full ownership. We also offer an optional maintenance retainer if you want us on-call — but it's not required, and most clients don't need it." },
  { q:"What if my business is seasonal?",
    a:"We take seasonality into account in the audit. The $30K benchmark is adjusted for your actual revenue cycle. We've worked with businesses that have 3-month peak seasons — the systems we build are designed to maximize those windows." },
];

const MARQUEE_ITEMS = [
  "HVAC & Plumbing","Freight Brokerage","Manufacturing","Field Services",
  "Auto Transport","Food Service Distribution","Construction Services","Industrial Staffing",
];

const PILOT_SEATS = [
  { label:"HVAC & Plumbing",     filled:true  },
  { label:"Freight & Logistics", filled:false },
  { label:"Manufacturing",       filled:false },
  { label:"Field Service",       filled:false },
  { label:"Auto Transport",      filled:false },
];

/* ───────────────────────────────────────────── */
/*  Shared UI                                    */
/* ───────────────────────────────────────────── */
function Fade({ children, delay=0, className="" }: { children:React.ReactNode; delay?:number; className?:string }) {
  return (
    <motion.div className={className}
      initial={{ opacity:0, y:22 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-60px" }}
      transition={{ duration:0.52, ease:[0.22,1,0.36,1], delay }}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, onDark=false }: { children:React.ReactNode; onDark?:boolean }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:16 }}>
      <span style={{ width:26, height:2, background:ACCENT, borderRadius:2, flex:"0 0 auto" }} />
      <span style={{ fontSize:11.5, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase",
        color:onDark?"rgba(244,239,227,.6)":ACCENT, fontFamily:"'Hanken Grotesk',sans-serif" }}>
        {children}
      </span>
    </div>
  );
}

function H2({ children, onDark=false, style: extraStyle={}, className="" }: { children:React.ReactNode; onDark?:boolean; style?:React.CSSProperties; className?:string }) {
  return (
    <h2 className={`anton ${className}`}
      style={{ fontSize:"clamp(2rem,4.2vw,3rem)", lineHeight:1.08, letterSpacing:"-0.01em",
        color:onDark?CREAM:INK, marginBottom:18, ...extraStyle }}>
      {children}
    </h2>
  );
}

function PrimaryBtn({ children, onClick, small=false, light=false }: { children:React.ReactNode; onClick?:()=>void; small?:boolean; light?:boolean }) {
  return (
    <button onClick={onClick}
      style={{ display:"inline-flex", alignItems:"center", gap:8,
        background:light?"#fff":ACCENT, color:light?ACCENT_DEEP:"#fff",
        fontSize:small?14:15.5, fontWeight:700, padding:small?"11px 20px":"14px 26px",
        borderRadius:100, border:"none", cursor:"pointer", letterSpacing:"-0.01em",
        boxShadow:light?"0 8px 28px -8px rgba(0,0,0,.28)":`0 6px 22px -6px ${ACCENT}88`,
        fontFamily:"'Hanken Grotesk',sans-serif",
        transition:"transform .15s,box-shadow .15s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform="translateY(-2px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform="translateY(0)"; }}>
      {children}
    </button>
  );
}

function OutlineBtn({ children, onClick, onDark=false }: { children:React.ReactNode; onClick?:()=>void; onDark?:boolean }) {
  return (
    <button onClick={onClick}
      style={{ display:"inline-flex", alignItems:"center", gap:8,
        background:"transparent", color:onDark?CREAM:INK,
        fontSize:15.5, fontWeight:600, padding:"14px 24px",
        borderRadius:100, border:`1.5px solid ${onDark?"rgba(244,239,227,.28)":LINE}`,
        cursor:"pointer", letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif",
        transition:"background .15s,border-color .15s" }}>
      {children}
    </button>
  );
}

function FAQItem({ q, a, open, onToggle }: { q:string; a:string; open:boolean; onToggle:()=>void }) {
  return (
    <div style={{ borderBottom:`1px solid ${LINE}` }}>
      <button onClick={onToggle}
        style={{ width:"100%", textAlign:"left", padding:"20px 0", border:"none", background:"none", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
        <span style={{ fontSize:16.5, fontWeight:700, color:INK, letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif" }}>{q}</span>
        <motion.span animate={{ rotate:open?45:0 }} transition={{ duration:0.2 }} style={{ flex:"0 0 auto", color:ACCENT }}>
          <Plus size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body" initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }} transition={{ duration:0.28, ease:"easeInOut" }}
            style={{ overflow:"hidden" }}>
            <p style={{ paddingBottom:20, color:INK_SOFT, fontSize:15.5, lineHeight:1.65, fontFamily:"'Hanken Grotesk',sans-serif" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/*  Exit intent popup                            */
/* ───────────────────────────────────────────── */
function ExitIntentPopup({ onOpen }: { onOpen:()=>void }) {
  const [show, setShow] = useState(false);
  const fired = useRef(false);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (fired.current || e.clientY > 40) return;
      fired.current = true;
      setShow(true);
    };
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, []);
  if (!show) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        style={{ position:"fixed", inset:0, zIndex:9998, background:"rgba(11,13,18,.6)", backdropFilter:"blur(6px)",
          display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
        onClick={() => setShow(false)}>
        <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.9, opacity:0 }}
          transition={{ type:"spring", damping:22 }}
          style={{ background:CREAM, borderRadius:24, padding:"36px 32px", maxWidth:420, width:"100%",
            border:`1px solid ${LINE}`, boxShadow:"0 32px 80px -16px rgba(0,0,0,.22)", position:"relative" }}
          onClick={e => e.stopPropagation()}>
          <button onClick={() => setShow(false)}
            style={{ position:"absolute", top:14, right:14, background:CREAM2, border:"none", borderRadius:100,
              width:30, height:30, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <X size={14} style={{ color:INK_SOFT }} />
          </button>
          <div style={{ fontSize:11.5, fontWeight:700, letterSpacing:"0.1em", color:ACCENT, textTransform:"uppercase", marginBottom:10, fontFamily:"'Hanken Grotesk',sans-serif" }}>WAIT — BEFORE YOU GO</div>
          <h3 className="anton" style={{ fontSize:26, color:INK, lineHeight:1.1, marginBottom:10 }}>Know your profit leak number?</h3>
          <p style={{ color:INK_SOFT, fontSize:14.5, lineHeight:1.6, marginBottom:22, fontFamily:"'Hanken Grotesk',sans-serif" }}>Most operators don't. A free 20-minute audit tells you exactly where money is leaving your business — no pitch, no obligation.</p>
          <PrimaryBtn onClick={() => { setShow(false); onOpen(); }}>
            Book the Free Audit <ArrowRight size={16} />
          </PrimaryBtn>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ───────────────────────────────────────────── */
/*  Nav                                          */
/* ───────────────────────────────────────────── */
function LPNav({ onBook }: { onBook:()=>void }) {
  const [menu, setMenu] = useState(false);
  return (
    <nav style={{ position:"sticky", top:0, zIndex:50,
      background:"rgba(244,239,227,.86)", backdropFilter:"blur(14px) saturate(1.25)",
      borderBottom:`1px solid ${LINE}` }}>
      <div style={{ maxWidth:1120, margin:"0 auto", padding:"0 24px", height:64,
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link href="/" style={{ textDecoration:"none" }}>
          <Wordmark size={18} onDark={false} />
        </Link>
        <div className="hidden md:flex" style={{ alignItems:"center", gap:28 }}>
          {[["/#services","Services"],["/#process","Process"],["/#results","Results"],["/#faq","FAQ"]].map(([href,label]) => (
            <a key={href} href={href}
              style={{ fontSize:14.5, fontWeight:600, color:INK_SOFT, textDecoration:"none", letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif" }}
              onMouseEnter={e => { (e.currentTarget).style.color=INK; }}
              onMouseLeave={e => { (e.currentTarget).style.color=INK_SOFT; }}>
              {label}
            </a>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <PrimaryBtn onClick={onBook} small>Book Free Audit</PrimaryBtn>
          <button className="flex md:hidden" onClick={() => setMenu(m => !m)}
            style={{ border:"none", background:"none", cursor:"pointer", padding:6, color:INK, display:"flex", flexDirection:"column" }}>
            <div style={{ width:20, height:2, background:INK, borderRadius:2, marginBottom:5, transition:"transform .2s", transform:menu?"rotate(45deg) translateY(7px)":"none" }} />
            <div style={{ width:20, height:2, background:INK, borderRadius:2, transition:"opacity .2s", opacity:menu?0:1 }} />
            <div style={{ width:20, height:2, background:INK, borderRadius:2, marginTop:5, transition:"transform .2s", transform:menu?"rotate(-45deg) translateY(-7px)":"none" }} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
            style={{ overflow:"hidden", borderTop:`1px solid ${LINE}`, background:CREAM }}>
            {[["/#services","Services"],["/#process","Process"],["/#results","Results"],["/#faq","FAQ"]].map(([href,label]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}
                style={{ display:"block", padding:"14px 24px", fontSize:16, fontWeight:600, color:INK,
                  textDecoration:"none", borderBottom:`1px solid ${LINE}`, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                {label}
              </a>
            ))}
            <div style={{ padding:"14px 24px" }}>
              <PrimaryBtn onClick={() => { setMenu(false); onBook(); }}>Book Free Audit</PrimaryBtn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ───────────────────────────────────────────── */
/*  Hero                                         */
/* ───────────────────────────────────────────── */
function Hero({ onBook }: { onBook:()=>void }) {
  return (
    <section style={{ background:CREAM, padding:"80px 24px 100px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Fade>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8,
              background:`${ACCENT}14`, border:`1px solid ${ACCENT}30`,
              borderRadius:100, padding:"7px 14px", marginBottom:24 }}>
              <span style={{ fontSize:10.5, fontWeight:700, letterSpacing:"0.11em", textTransform:"uppercase", color:ACCENT, fontFamily:"'Hanken Grotesk',sans-serif" }}>Free Profit Recovery Audit</span>
            </div>
            <h1 className="anton" style={{ fontSize:"clamp(2.7rem,5.5vw,4rem)", lineHeight:1.05, letterSpacing:"-0.01em", color:INK, marginBottom:10 }}>
              We find the{" "}
              <span style={{ background:ACCENT, color:"#fff", padding:"0.02em 0.16em 0.08em", borderRadius:7, display:"inline" }}>$30K</span>
              {" "}hiding in your operations.
            </h1>
            <p className="anton" style={{ fontSize:"clamp(1.4rem,2.6vw,1.9rem)", color:INK_SOFT, marginBottom:22, fontStyle:"italic" }}>
              In 90 days or you don't pay.
            </p>
            <p style={{ fontSize:17, lineHeight:1.65, color:INK_SOFT, maxWidth:520, marginBottom:32, fontFamily:"'Hanken Grotesk',sans-serif" }}>
              If you're doing $1M+ in service, logistics, or manufacturing, you're leaking profit every week. We find it. We fix it. We guarantee it.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:36 }}>
              <PrimaryBtn onClick={onBook}>
                Book Your Free Profit Recovery Audit <ArrowRight size={17} />
              </PrimaryBtn>
              <OutlineBtn onClick={() => document.getElementById("process")?.scrollIntoView({ behavior:"smooth" })}>
                See How It Works
              </OutlineBtn>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ display:"flex" }}>
                {(["#1466FF","#34d399","#f97316","#a855f7","#ec4899"] as string[]).map((c, i) => (
                  <div key={c} style={{ width:34, height:34, borderRadius:"50%", background:c,
                    border:`2.5px solid ${CREAM}`, marginLeft:i===0?0:-10,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:11.5, fontWeight:700, color:"#fff", fontFamily:"'Hanken Grotesk',sans-serif" }}>
                    {(["RB","JM","TK","AL","SR"] as string[])[i]}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display:"flex", gap:2, marginBottom:3 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#f59e0b" stroke="none" />)}
                </div>
                <p style={{ fontSize:13, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif", margin:0 }}>
                  <strong style={{ color:INK }}>40+ operators</strong> automated
                </p>
              </div>
            </div>
          </Fade>
          <Fade delay={0.12}>
            <div style={{ position:"relative" }}>
              <div style={{ position:"absolute", top:-16, right:-8, zIndex:10 }}>
                <StampBadge size={94} />
              </div>
              <VSL />
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  Trust strip                                  */
/* ───────────────────────────────────────────── */
function TrustStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={{ background:INK2, borderTop:"1px solid rgba(255,255,255,.06)", borderBottom:"1px solid rgba(255,255,255,.06)", overflow:"hidden", padding:"18px 0" }}>
      <div style={{ display:"flex", width:"max-content", animation:"marquee 22s linear infinite" }}>
        {items.map((item, i) => (
          <div key={`${item}-${i}`} style={{ display:"flex", alignItems:"center", gap:18, padding:"0 28px", whiteSpace:"nowrap" }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:ACCENT, flex:"0 0 auto" }} />
            <span style={{ fontSize:13, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", color:"rgba(244,239,227,.62)", fontFamily:"'Hanken Grotesk',sans-serif" }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/*  Problem                                      */
/* ───────────────────────────────────────────── */
function Problem() {
  return (
    <section style={{ background:INK, padding:"96px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <SectionLabel onDark>The Problem</SectionLabel>
            <H2 onDark style={{ maxWidth:680, margin:"0 auto 16px" }}>
              Your business is bleeding $30K+ a year.<br/>You just can't see where.
            </H2>
            <p style={{ color:"rgba(244,239,227,.55)", fontSize:17, lineHeight:1.65, maxWidth:500, margin:"0 auto", fontFamily:"'Hanken Grotesk',sans-serif" }}>
              It's not one big hole. It's a hundred small leaks.
            </p>
          </div>
        </Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PAINS.map((p, i) => (
            <Fade key={p.title} delay={i*0.07}>
              <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:18, padding:"28px 26px" }}>
                <div style={{ width:44, height:44, borderRadius:12, background:`${ACCENT}22`,
                  display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16, color:ACCENT }}>
                  {p.icon}
                </div>
                <h3 style={{ fontSize:17, fontWeight:700, color:CREAM, marginBottom:8, fontFamily:"'Hanken Grotesk',sans-serif", letterSpacing:"-0.01em" }}>{p.title}</h3>
                <p style={{ fontSize:14.5, lineHeight:1.6, color:"rgba(244,239,227,.52)", marginBottom:14, fontFamily:"'Hanken Grotesk',sans-serif" }}>{p.body}</p>
                <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(249,115,22,.12)",
                  border:"1px solid rgba(249,115,22,.2)", borderRadius:100, padding:"5px 12px" }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:"#f97316", flex:"0 0 auto" }} />
                  <span style={{ fontSize:12.5, fontWeight:700, color:"#f97316", fontFamily:"'Hanken Grotesk',sans-serif" }}>{p.cost}</span>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  Industries                                   */
/* ───────────────────────────────────────────── */
function Industries() {
  return (
    <section style={{ background:CREAM2, padding:"96px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <SectionLabel>Who We Build For</SectionLabel>
            <H2 style={{ maxWidth:560, margin:"0 auto 0" }}>
              Built for the operators who keep things running.
            </H2>
          </div>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind, i) => (
            <Fade key={ind.title} delay={i*0.08}>
              <div style={{ background:CREAM, border:`1px solid ${LINE}`, borderRadius:20, padding:"28px 26px", height:"100%" }}>
                <div style={{ width:48, height:48, borderRadius:14, background:`${ACCENT}12`,
                  display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18, color:ACCENT }}>
                  {ind.icon}
                </div>
                <h3 style={{ fontSize:18, fontWeight:700, color:INK, marginBottom:10, letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif" }}>{ind.title}</h3>
                <p style={{ fontSize:14.5, lineHeight:1.65, color:INK_SOFT, marginBottom:18, fontFamily:"'Hanken Grotesk',sans-serif" }}>{ind.body}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                  {ind.tags.map(tag => (
                    <span key={tag} style={{ fontSize:12, fontWeight:600, color:INK_SOFT, background:CREAM2,
                      border:`1px solid ${LINE}`, borderRadius:100, padding:"4px 12px", fontFamily:"'Hanken Grotesk',sans-serif" }}>{tag}</span>
                  ))}
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  FSO                                          */
/* ───────────────────────────────────────────── */
function FSO({ onBook }: { onBook:()=>void }) {
  const stats = [
    { num:"40+", label:"operators served"    },
    { num:"92%", label:"avg automation rate" },
    { num:"90",  label:"day guarantee window"},
    { num:"$0",  label:"if targets missed"   },
  ];
  return (
    <section style={{ background:CREAM, padding:"96px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Fade>
            <SectionLabel>How It Works</SectionLabel>
            <H2 style={{ maxWidth:480 }}>Your fractional systems operator.</H2>
            <p style={{ color:INK_SOFT, fontSize:16.5, lineHeight:1.7, maxWidth:480, marginBottom:30, fontFamily:"'Hanken Grotesk',sans-serif" }}>
              We're not consultants. We're not developers. We're operators who build automated systems inside your business — and stand behind the results.
            </p>
            <div className="grid grid-cols-2 gap-4" style={{ marginBottom:32 }}>
              {stats.map(s => (
                <div key={s.label} style={{ background:CREAM2, border:`1px solid ${LINE}`, borderRadius:14, padding:"20px 18px" }}>
                  <div className="anton" style={{ fontSize:30, color:ACCENT, lineHeight:1 }}>{s.num}</div>
                  <div style={{ fontSize:13, color:INK_SOFT, marginTop:4, fontFamily:"'Hanken Grotesk',sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <PrimaryBtn onClick={onBook}>Book Your Free Audit <ArrowRight size={16} /></PrimaryBtn>
          </Fade>
          <Fade delay={0.1}>
            <Tracker />
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  Inline CTA                                   */
/* ───────────────────────────────────────────── */
function InlineCTA({ onBook }: { onBook:()=>void }) {
  return (
    <section style={{ background:ACCENT, padding:"60px 24px" }}>
      <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
        <h2 className="anton" style={{ fontSize:"clamp(1.9rem,3.8vw,2.6rem)", color:"#fff", marginBottom:16 }}>
          Ready to recover your $30,000?
        </h2>
        <p style={{ fontSize:16.5, color:"rgba(255,255,255,.78)", marginBottom:28, fontFamily:"'Hanken Grotesk',sans-serif" }}>
          Book a free Profit Recovery Audit. No pitch. Just a map of where your money is going.
        </p>
        <PrimaryBtn onClick={onBook} light>
          Book Your Free Profit Recovery Audit <ArrowRight size={16} />
        </PrimaryBtn>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  Services                                     */
/* ───────────────────────────────────────────── */
function Services() {
  return (
    <section id="services" style={{ background:CREAM2, padding:"96px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <SectionLabel>What We Build</SectionLabel>
            <H2 style={{ maxWidth:560, margin:"0 auto 0" }}>
              Four systems that recover lost profit.
            </H2>
          </div>
          <ProfitDiagram />
        </Fade>
        <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
          {SERVICES.map((s, i) => (
            <Fade key={s.num} delay={i*0.06}>
              <div style={{ display:"flex", gap:22, alignItems:"flex-start",
                background:CREAM, border:`1px solid ${LINE}`, borderRadius:18, padding:"24px 26px" }}>
                <div className="anton" style={{ fontSize:40, color:`${ACCENT}28`, lineHeight:1, flex:"0 0 auto", minWidth:54, marginTop:2 }}>{s.num}</div>
                <div>
                  <h3 style={{ fontSize:17.5, fontWeight:700, color:INK, marginBottom:7, letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif" }}>{s.title}</h3>
                  <p style={{ fontSize:15, lineHeight:1.65, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>{s.body}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  Process                                      */
/* ───────────────────────────────────────────── */
function Process() {
  return (
    <section id="process" style={{ background:CREAM, padding:"96px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <SectionLabel>The Process</SectionLabel>
            <H2 style={{ maxWidth:540, margin:"0 auto 0" }}>
              Three steps. Ninety days. Jobs done.
            </H2>
          </div>
        </Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <Fade key={s.num} delay={i*0.08}>
              <div style={{ background:CREAM2, border:`1px solid ${LINE}`, borderRadius:20, padding:"26px 22px", position:"relative", height:"100%", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:14, right:16 }}>
                  <div className="anton" style={{ fontSize:54, color:`${ACCENT}14`, lineHeight:1 }}>{s.num}</div>
                </div>
                <div style={{ width:42, height:42, borderRadius:12, background:ACCENT, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18, position:"relative", zIndex:1 }}>
                  <span className="anton" style={{ color:"#fff", fontSize:14 }}>{s.num}</span>
                </div>
                <h3 style={{ fontSize:17, fontWeight:700, color:INK, marginBottom:8, letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif" }}>{s.title}</h3>
                <p style={{ fontSize:14, lineHeight:1.65, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>{s.body}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  Results / Case Study                         */
/* ───────────────────────────────────────────── */
function Results() {
  return (
    <section id="results" style={{ background:INK2, padding:"96px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <Fade>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:`${ACCENT}22`,
            border:`1px solid ${ACCENT}40`, borderRadius:100, padding:"7px 14px", marginBottom:20 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:ACCENT }} />
            <span style={{ fontSize:11.5, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:ACCENT, fontFamily:"'Hanken Grotesk',sans-serif" }}>Proof · BCAT Logistics Group</span>
          </div>
          <H2 onDark style={{ maxWidth:600 }}>
            We built this inside our own logistics group first.
          </H2>
          <p style={{ color:"rgba(244,239,227,.58)", fontSize:16.5, lineHeight:1.7, maxWidth:540, marginBottom:48, fontFamily:"'Hanken Grotesk',sans-serif" }}>
            Before we asked anyone to trust us with their business, we proved the model on ours. Here's what happened in 12 months.
          </p>
        </Fade>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {RESULTS_STATS.map((r, i) => (
            <Fade key={r.label} delay={i*0.07}>
              <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:18, padding:"24px 20px" }}>
                <div className="anton" style={{ fontSize:"clamp(1.8rem,3vw,2.4rem)", color:ACCENT, lineHeight:1, marginBottom:8 }}>{r.stat}</div>
                <p style={{ fontSize:13.5, color:"rgba(244,239,227,.58)", lineHeight:1.5, fontFamily:"'Hanken Grotesk',sans-serif" }}>{r.label}</p>
              </div>
            </Fade>
          ))}
        </div>
        <Fade delay={0.2}>
          <div style={{ background:"rgba(20,102,255,.1)", border:"1px solid rgba(20,102,255,.22)", borderRadius:20, padding:"28px 28px 24px", maxWidth:720 }}>
            <p style={{ fontSize:17, lineHeight:1.7, color:"rgba(244,239,227,.88)", fontStyle:"italic", marginBottom:16, fontFamily:"'Hanken Grotesk',sans-serif" }}>
              "The $200K wasn't hiding. It was just invisible. The command center made it visible — and the profit followed."
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <img src="/ryne.jpg" alt="Ryne Bandolik" style={{ width:38, height:38, borderRadius:"50%", objectFit:"cover", border:`2px solid ${ACCENT}` }} />
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:CREAM, fontFamily:"'Hanken Grotesk',sans-serif" }}>Ryne Bandolik</div>
                <div style={{ fontSize:12.5, color:"rgba(244,239,227,.48)", fontFamily:"'Hanken Grotesk',sans-serif" }}>Founder, BCAT Logistics Group &amp; Jobs Done Labs</div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  Comparison                                   */
/* ───────────────────────────────────────────── */
function TickOrX({ val }: { val:boolean|null }) {
  if (val === true)  return <div style={{ width:26, height:26, borderRadius:"50%", background:`${GREEN}1A`, display:"flex", alignItems:"center", justifyContent:"center" }}><Check size={14} color={GREEN} strokeWidth={2.5} /></div>;
  if (val === false) return <div style={{ width:26, height:26, borderRadius:"50%", background:"rgba(239,68,68,.12)", display:"flex", alignItems:"center", justifyContent:"center" }}><X size={14} color="#ef4444" strokeWidth={2.5} /></div>;
  return <span style={{ fontSize:12.5, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>sometimes</span>;
}

function Comparison() {
  return (
    <section style={{ background:CREAM2, padding:"96px 24px" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <SectionLabel>Why Choose Us</SectionLabel>
            <H2 style={{ maxWidth:560, margin:"0 auto 0" }}>
              Why operators choose us over the alternatives.
            </H2>
          </div>
        </Fade>
        <Fade delay={0.08}>
          <div style={{ background:CREAM, border:`1px solid ${LINE}`, borderRadius:20, overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", borderBottom:`1px solid ${LINE}` }}>
              <div style={{ padding:"16px 20px" }} />
              {(["In-house","Freelancer","Jobs Done Labs"] as string[]).map((h, i) => (
                <div key={h} style={{ padding:"16px 20px", textAlign:"center",
                  background:i===2?`${ACCENT}0D`:"transparent",
                  borderLeft:`1px solid ${LINE}` }}>
                  <span style={{ fontSize:13.5, fontWeight:700, color:i===2?ACCENT:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>{h}</span>
                  {i===2 && <div style={{ width:6, height:6, borderRadius:"50%", background:ACCENT, margin:"5px auto 0" }} />}
                </div>
              ))}
            </div>
            {COMPARISON_ROWS.map((row, i) => (
              <div key={row.feature} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr",
                borderBottom:i<COMPARISON_ROWS.length-1?`1px solid ${LINE}`:"none",
                background:i%2===0?"transparent":`${CREAM2}66` }}>
                <div style={{ padding:"15px 20px" }}>
                  <span style={{ fontSize:14.5, fontWeight:500, color:INK, fontFamily:"'Hanken Grotesk',sans-serif" }}>{row.feature}</span>
                </div>
                {([row.inhouse, row.freelance, row.jdl] as (boolean|null)[]).map((v, ci) => (
                  <div key={ci} style={{ padding:"15px 20px", display:"flex", alignItems:"center", justifyContent:"center",
                    background:ci===2?`${ACCENT}07`:"transparent", borderLeft:`1px solid ${LINE}` }}>
                    <TickOrX val={v} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  Guarantee                                    */
/* ───────────────────────────────────────────── */
function Guarantee({ onBook }: { onBook:()=>void }) {
  return (
    <section style={{ background:ACCENT, padding:"96px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Fade>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:22 }}>
              <div style={{ position:"relative", display:"inline-block" }}>
                <div style={{ width:160, height:160, borderRadius:"50%",
                  background:"linear-gradient(135deg,rgba(255,255,255,.25),rgba(255,255,255,.08))",
                  padding:4, border:"2px solid rgba(255,255,255,.3)" }}>
                  <img src="/ryne.jpg" alt="Ryne Bandolik — Founder" style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover", objectPosition:"top" }} />
                </div>
                <div style={{ position:"absolute", bottom:-10, right:-10 }}>
                  <StampBadge size={72} />
                </div>
              </div>
              <div style={{ background:"rgba(255,255,255,.12)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,.2)", borderRadius:18, padding:"20px 22px", maxWidth:320 }}>
                <p style={{ color:"rgba(255,255,255,.82)", fontSize:14.5, lineHeight:1.65, marginBottom:14, fontFamily:"'Hanken Grotesk',sans-serif", fontStyle:"italic" }}>
                  "If we can't find your $30K, you pay nothing. I put my name on every engagement."
                </p>
                <div className="caveat" style={{ fontSize:24, color:"#fff", lineHeight:1, marginBottom:2 }}>Ryne Bandolik</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,.62)", fontFamily:"'Hanken Grotesk',sans-serif" }}>Founder, Jobs Done Labs</div>
              </div>
            </div>
          </Fade>
          <Fade delay={0.1}>
            <SectionLabel onDark>The Guarantee</SectionLabel>
            <H2 onDark style={{ maxWidth:500 }}>
              Guaranteed results. Or you pay nothing.
            </H2>
            <p style={{ color:"rgba(255,255,255,.8)", fontSize:16.5, lineHeight:1.7, marginBottom:28, fontFamily:"'Hanken Grotesk',sans-serif" }}>
              We've built this. We've proven it. We put our reputation behind every engagement. Here's exactly what we promise.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:36 }}>
              {GUARANTEE_ITEMS.map(item => (
                <div key={item} style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <div style={{ width:24, height:24, borderRadius:"50%", background:"rgba(255,255,255,.18)", flex:"0 0 auto", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Check size={13} color="#fff" strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize:15.5, color:"rgba(255,255,255,.92)", fontFamily:"'Hanken Grotesk',sans-serif", lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <PrimaryBtn onClick={onBook} light>
              Claim Your Guarantee <ArrowRight size={16} />
            </PrimaryBtn>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  Fit                                          */
/* ───────────────────────────────────────────── */
const FIT_FOR = [
  "Service, logistics, or manufacturing doing $1M+ in revenue",
  "Real operational volume — leads, jobs, trucks, or orders flowing daily",
  "Losing time and money to manual work, but can't pinpoint exactly where",
  "Want systems you own and control — not another tool you rent forever",
];
const FIT_NOT = [
  "Pre-revenue businesses or under $1M in annual revenue",
  "Looking for a cheap chatbot or a one-off automation task",
  "Not willing to give us access to understand how your business runs",
  "Looking for hype, theory, or strategy — not measurable results",
];

function Fit() {
  return (
    <section style={{ background:CREAM, padding:"96px 24px" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <SectionLabel>Is This a Fit?</SectionLabel>
            <H2 style={{ maxWidth:560, margin:"0 auto 0" }}>
              We're not for everyone. Here's the truth.
            </H2>
          </div>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Fade delay={0.05}>
            <div style={{ background:INK, borderRadius:22, padding:"28px 26px", height:"100%" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22 }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:`${GREEN}22`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Check size={16} color={GREEN} strokeWidth={2.5} />
                </div>
                <h3 style={{ fontWeight:700, fontSize:16, color:CREAM, fontFamily:"'Hanken Grotesk',sans-serif" }}>This is for you if</h3>
              </div>
              {FIT_FOR.map(item => (
                <div key={item} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:14 }}>
                  <div style={{ width:20, height:20, borderRadius:"50%", background:`${GREEN}20`, flex:"0 0 auto", display:"flex", alignItems:"center", justifyContent:"center", marginTop:1 }}>
                    <Check size={11} color={GREEN} strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize:14.5, color:"rgba(244,239,227,.82)", lineHeight:1.55, fontFamily:"'Hanken Grotesk',sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </Fade>
          <Fade delay={0.1}>
            <div style={{ background:CREAM2, border:`2px solid ${LINE}`, borderRadius:22, padding:"28px 26px", height:"100%" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22 }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:"rgba(239,68,68,.1)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <X size={16} color="#ef4444" strokeWidth={2.5} />
                </div>
                <h3 style={{ fontWeight:700, fontSize:16, color:INK, fontFamily:"'Hanken Grotesk',sans-serif" }}>This isn't for you if</h3>
              </div>
              {FIT_NOT.map(item => (
                <div key={item} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:14 }}>
                  <div style={{ width:20, height:20, borderRadius:"50%", background:"rgba(239,68,68,.1)", flex:"0 0 auto", display:"flex", alignItems:"center", justifyContent:"center", marginTop:1 }}>
                    <X size={11} color="#ef4444" strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize:14.5, color:INK_SOFT, lineHeight:1.55, fontFamily:"'Hanken Grotesk',sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  Pilot (replaces testimonials)                */
/* ───────────────────────────────────────────── */
function Pilot({ onBook }: { onBook:()=>void }) {
  return (
    <section style={{ background:CREAM2, padding:"96px 24px" }}>
      <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
        <Fade>
          <div style={{ background:INK2, border:"1px solid rgba(255,255,255,.08)", borderRadius:28, padding:"48px 36px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:20, right:24 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(52,211,153,.14)", border:"1px solid rgba(52,211,153,.26)", borderRadius:100, padding:"6px 12px" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:GREEN, boxShadow:`0 0 0 3px ${GREEN}22` }} />
                <span style={{ fontSize:11.5, fontWeight:700, color:GREEN, letterSpacing:"0.08em", fontFamily:"'Hanken Grotesk',sans-serif" }}>ACCEPTING APPLICATIONS</span>
              </div>
            </div>
            <SectionLabel onDark>Limited Availability</SectionLabel>
            <H2 onDark style={{ maxWidth:560, margin:"0 auto 14px" }}>
              We're building for 5 businesses right now.
            </H2>
            <p style={{ color:"rgba(244,239,227,.58)", fontSize:16, lineHeight:1.7, maxWidth:460, margin:"0 auto 36px", fontFamily:"'Hanken Grotesk',sans-serif" }}>
              Each cohort is limited so we can deliver the results we guarantee. One seat per industry.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center", marginBottom:32 }}>
              {PILOT_SEATS.map(s => (
                <div key={s.label} style={{ display:"flex", alignItems:"center", gap:8,
                  background:s.filled?`${ACCENT}22`:"rgba(255,255,255,.05)",
                  border:`1px solid ${s.filled?ACCENT+"44":"rgba(255,255,255,.1)"}`,
                  borderRadius:100, padding:"9px 16px" }}>
                  <span style={{ width:8, height:8, borderRadius:"50%",
                    background:s.filled?ACCENT:"rgba(255,255,255,.25)",
                    boxShadow:s.filled?`0 0 0 3px ${ACCENT}30`:"none",
                    flex:"0 0 auto" }} />
                  <span style={{ fontSize:13.5, fontWeight:600, color:s.filled?CREAM:"rgba(244,239,227,.48)", fontFamily:"'Hanken Grotesk',sans-serif" }}>{s.label}</span>
                  {s.filled && <span style={{ fontSize:10.5, fontWeight:700, color:ACCENT, letterSpacing:"0.05em", fontFamily:"'Hanken Grotesk',sans-serif" }}>FILLED</span>}
                </div>
              ))}
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", borderRadius:100, padding:"8px 14px", marginBottom:28 }}>
              <span style={{ fontSize:12, fontWeight:600, color:"rgba(244,239,227,.42)", letterSpacing:"0.06em", fontFamily:"'Hanken Grotesk',sans-serif" }}>Case studies coming Q4 2026</span>
            </div>
            <div>
              <PrimaryBtn onClick={onBook}>
                Apply for the Next Cohort <ArrowRight size={16} />
              </PrimaryBtn>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  FAQ                                          */
/* ───────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <section id="faq" style={{ background:CREAM, padding:"96px 24px" }}>
      <div style={{ maxWidth:760, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <SectionLabel>FAQ</SectionLabel>
            <H2 style={{ margin:"0 auto 0" }}>No fluff. Straight answers.</H2>
          </div>
        </Fade>
        <Fade delay={0.08}>
          <div style={{ borderTop:`1px solid ${LINE}` }}>
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a}
                open={open===i} onToggle={() => setOpen(open===i?null:i)} />
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  Final CTA                                    */
/* ───────────────────────────────────────────── */
function FinalCTA({ onBook }: { onBook:()=>void }) {
  return (
    <section style={{ background:CREAM2, padding:"96px 24px" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <Fade>
          <div style={{ background:INK, borderRadius:28, overflow:"hidden", display:"flex", flexWrap:"wrap" }}>
            <div className="hidden md:block" style={{ flex:"0 0 280px", position:"relative", minHeight:360 }}>
              <img src="/ryne.jpg" alt="Ryne Bandolik" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,transparent 50%,rgba(11,13,18,.92))" }} />
              <div style={{ position:"absolute", bottom:22, left:20 }}>
                <div className="caveat" style={{ fontSize:24, color:"#fff", lineHeight:1 }}>Ryne Bandolik</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,.55)", fontFamily:"'Hanken Grotesk',sans-serif" }}>Founder, Jobs Done Labs</div>
              </div>
            </div>
            <div style={{ flex:1, minWidth:0, padding:"44px 40px" }}>
              <SectionLabel onDark>Get Started</SectionLabel>
              <H2 onDark style={{ maxWidth:420 }}>
                Find your $30K in 90 days. Or pay nothing.
              </H2>
              <p style={{ color:"rgba(244,239,227,.62)", fontSize:15.5, lineHeight:1.7, marginBottom:28, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                Book a free Profit Recovery Audit. We'll map where your money is going and show you exactly how to get it back. No pitch, no obligation.
              </p>
              <PrimaryBtn onClick={onBook}>
                Book Your Free Profit Recovery Audit <ArrowRight size={16} />
              </PrimaryBtn>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:16 }}>
                <div style={{ display:"flex", gap:2 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#f59e0b" stroke="none" />)}
                </div>
                <span style={{ fontSize:13, color:"rgba(244,239,227,.4)", fontFamily:"'Hanken Grotesk',sans-serif" }}>Rated 5/5 by operators we've worked with</span>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  Footer                                       */
/* ───────────────────────────────────────────── */
function Footer() {
  const linkStyle: React.CSSProperties = { display:"block", fontSize:14, color:"rgba(244,239,227,.55)", textDecoration:"none", marginBottom:8, fontFamily:"'Hanken Grotesk',sans-serif" };
  const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = CREAM; };
  const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "rgba(244,239,227,.55)"; };
  return (
    <footer style={{ background:INK2, padding:"64px 24px 36px", borderTop:"1px solid rgba(255,255,255,.06)" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12" style={{ borderBottom:"1px solid rgba(255,255,255,.07)" }}>
          <div className="col-span-2 md:col-span-1">
            <Wordmark size={18} onDark />
            <p style={{ fontSize:14, lineHeight:1.65, color:"rgba(244,239,227,.42)", marginTop:14, maxWidth:220, fontFamily:"'Hanken Grotesk',sans-serif" }}>
              Recover $30K in 90 days with custom automation systems — or you pay nothing.
            </p>
            <div style={{ display:"flex", gap:10, marginTop:18 }}>
              {([[Linkedin,"#"],[Youtube,"#"],[Twitter,"#"]] as [typeof Linkedin,string][]).map(([Icon,href],i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width:34, height:34, borderRadius:10, background:"rgba(255,255,255,.07)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(244,239,227,.5)", textDecoration:"none" }}
                  onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.07)"; }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(244,239,227,.38)", marginBottom:14, fontFamily:"'Hanken Grotesk',sans-serif" }}>Services</div>
            {["Lead & Quote Automation","Operations Command Center","Revenue Intelligence","Client Communication Stack"].map(s => (
              <a key={s} href="/#services" style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{s}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(244,239,227,.38)", marginBottom:14, fontFamily:"'Hanken Grotesk',sans-serif" }}>Industries</div>
            {["Service Businesses","Logistics & Transportation","Manufacturing & Industrial"].map(s => (
              <a key={s} href="/" style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{s}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(244,239,227,.38)", marginBottom:14, fontFamily:"'Hanken Grotesk',sans-serif" }}>Company</div>
            {([["ROI Calculator","/roi-calculator"],["Contact","/contact"],["Privacy Policy","/privacy"],["Terms of Service","/terms"],["Opt-In Proof","/opt-in-proof"]] as [string,string][]).map(([label,href]) => (
              <Link key={href} href={href} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{label}</Link>
            ))}
          </div>
        </div>
        <div style={{ paddingTop:28, display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:12 }}>
          <p style={{ fontSize:13, color:"rgba(244,239,227,.32)", fontFamily:"'Hanken Grotesk',sans-serif", margin:0 }}>
            © 2026 Jobs Done Labs LLC. All rights reserved.
          </p>
          <div style={{ display:"flex", gap:20 }}>
            {([["Privacy Policy","/privacy"],["Terms of Service","/terms"],["ryne@jobsdone.io","mailto:ryne@jobsdone.io"]] as [string,string][]).map(([label,href]) => (
              <a key={href} href={href}
                style={{ fontSize:13, color:"rgba(244,239,227,.32)", textDecoration:"none", fontFamily:"'Hanken Grotesk',sans-serif" }}
                onMouseEnter={e => { e.currentTarget.style.color="rgba(244,239,227,.65)"; }}
                onMouseLeave={e => { e.currentTarget.style.color="rgba(244,239,227,.32)"; }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────────────────────────── */
/*  Page                                         */
/* ───────────────────────────────────────────── */
export default function Home() {
  const [showBooking, setShowBooking] = useState(false);
  const open = () => setShowBooking(true);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as Element).closest('a[href="#book"]');
      if (el) { e.preventDefault(); setShowBooking(true); }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div style={{ background:CREAM, color:INK, fontFamily:"'Hanken Grotesk',system-ui,sans-serif", WebkitFontSmoothing:"antialiased" }}>
      <ExitIntentPopup onOpen={open} />
      <LPNav onBook={open} />
      <Hero onBook={open} />
      <TrustStrip />
      <Problem />
      <Industries />
      <FSO onBook={open} />
      <InlineCTA onBook={open} />
      <Services />
      <Process />
      <Results />
      <Comparison />
      <Guarantee onBook={open} />
      <Fit />
      <Pilot onBook={open} />
      <FAQ />
      <FinalCTA onBook={open} />
      <Footer />
      <BookingModal open={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
}
