import { useState, useEffect, useRef } from "react";
import BookingModal from "@/components/BookingModal";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Star, Check, X, Plus,
  Filter, Database, Settings, BarChart3,
  Linkedin, Youtube, Twitter,
} from "lucide-react";

/* ───────────────────────────────────── */
/*  Design tokens                        */
/* ───────────────────────────────────── */
const CREAM       = "#F4EFE3";
const CREAM2      = "#EFE8D8";
const INK         = "#0B0D12";
const INK2        = "#11131B";
const INK_SOFT    = "#54596A";
const LINE        = "rgba(11,13,18,.12)";
const ACCENT      = "#1466FF";
const ACCENT_DEEP = "#0B49C9";
const GREEN       = "#34d399";

/* ───────────────────────────────────── */
/*  Brand                               */
/* ───────────────────────────────────── */
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

/* Static stamp badge — no spin */
function StampBadge({ size = 104, dark = false }: { size?: number; dark?: boolean }) {
  const r = 40, cx = 50, cy = 50;
  const fill = dark ? INK : ACCENT;
  const uid = dark ? "stamp-d" : "stamp-l";
  const centerTextColor = dark ? ACCENT : "white";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <path id={uid} d={`M ${cx},${cy-r} A ${r},${r} 0 1,1 ${cx-0.001},${cy-r}`} />
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <text x={cx} y={cy-2} textAnchor="middle" fill={centerTextColor} style={{ fontFamily:"'Anton','Impact',sans-serif", fontSize:20, letterSpacing:"-0.01em" }}>$30K</text>
      <text x={cx} y={cy+14} textAnchor="middle" fill="rgba(255,255,255,.88)" style={{ fontFamily:"'Anton','Impact',sans-serif", fontSize:9, letterSpacing:"0.1em" }}>GUARANTEED</text>
    </svg>
  );
}

/* ───────────────────────────────────── */
/*  VSL — Wistia embed                  */
/* ───────────────────────────────────── */
function VSL() {
  return (
    <div style={{ width:"100%", borderRadius:12, overflow:"hidden",
      boxShadow:"0 24px 64px -16px rgba(0,0,0,.28)" }}
      dangerouslySetInnerHTML={{ __html:
        `<wistia-player media-id="aqq109griy" aspect="1.7777777777777777"></wistia-player>`
      }}
    />
  );
}

/* ───────────────────────────────────── */
/*  Profit Recovery Tracker             */
/* ───────────────────────────────────── */
const LEAKS = [
  { icon:<Filter size={15}/>,    name:"Lead response system",  pct:"92%", amt:"+$11.2K" },
  { icon:<Settings size={15}/>,  name:"Quote automation",       pct:"84%", amt:"+$9.4K"  },
  { icon:<Database size={15}/>,  name:"Scheduling & ops",       pct:"76%", amt:"+$7.1K"  },
  { icon:<BarChart3 size={15}/>, name:"Billing & reporting",    pct:"68%", amt:"+$5.8K"  },
];

function Tracker() {
  return (
    <div style={{ background:INK2, borderRadius:12, padding:28, border:"1px solid rgba(255,255,255,.08)", boxShadow:"0 24px 56px -12px rgba(0,0,0,.22)" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
        <span style={{ color:CREAM, fontWeight:700, fontSize:15, fontFamily:"'Hanken Grotesk',sans-serif" }}>Profit Recovery Tracker</span>
        <span style={{ background:"rgba(52,211,153,.15)", color:GREEN, fontSize:12, fontWeight:700, padding:"4px 10px", borderRadius:4, fontFamily:"'Hanken Grotesk',sans-serif" }}>LIVE</span>
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
            <div style={{ height:7, background:"rgba(255,255,255,.07)", borderRadius:4, overflow:"hidden" }}>
              <div style={{ height:"100%", width:l.pct, background:`linear-gradient(90deg,${ACCENT},${ACCENT_DEEP})`, borderRadius:4 }} />
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

/* ───────────────────────────────────── */
/*  Profit Diagram                      */
/* ───────────────────────────────────── */
function ProfitDiagram() {
  const col = (label: string, items: string[], bg: string, textCol: string, border: string) => (
    <div style={{ flex:1, minWidth:0 }}>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:INK_SOFT, marginBottom:10, fontFamily:"'Hanken Grotesk',sans-serif" }}>{label}</div>
      <div style={{ background:bg, borderRadius:8, padding:"14px 16px", display:"flex", flexDirection:"column", gap:9, border:`1px solid ${border}` }}>
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
      {col("Where it leaks", ["Slow lead response","Manual quoting","Dropped follow-ups","No visibility"], CREAM, INK, LINE)}
      {arrow}
      {col("The recovery engine", ["Capture","Automate","Optimize","Report"], INK, CREAM, "rgba(255,255,255,.09)")}
      {arrow}
      {col("What you keep", ["More booked jobs","Faster cash","Hours back","$30K+ recovered"], `${ACCENT}14`, ACCENT_DEEP, `${ACCENT}30`)}
    </div>
  );
}

/* ───────────────────────────────────── */
/*  Data                                */
/* ───────────────────────────────────── */
const PAINS = [
  { title:"Your team quotes by hand",
    body:"Estimates sit in someone's inbox for days. Customers don't wait — they call the next guy or gone to a competitor who answered first.",
    cost:"Lost: 20–40% of winnable jobs" },
  { title:"Leads slip through the cracks",
    body:"Calls missed, forms unanswered, follow-ups that never happen. Every hour without a fast, consistent response is money walking out the door.",
    cost:"Lost: thousands per week" },
  { title:"Your operations run on guesswork",
    body:"Jobs double-booked, your calendar is a mess, and no one knows real capacity until you're missing appointments. The inefficiency you can't see is the inefficiency you keep paying for.",
    cost:"Lost: unknown — that's the problem" },
  { title:"You're flying blind on the numbers",
    body:"No real-time view of margin, utilization, or where the leaks are. You find out something's broken a quarter too late.",
    cost:"Lost: $30K+ you never recover" },
];

const INDUSTRIES = [
  { title:"Service Businesses",
    body:"HVAC, plumbing, electrical, roofing, and field service — operations that win or lose on response speed.",
    tags:["Instant quoting","Scheduling automation","Lead capture"] },
  { title:"Logistics & Transportation",
    body:"Freight brokerages, Amazon DSPs, fleets, and last-mile operations where per-asset visibility decides whether you profit.",
    tags:["Spot quoting","POD automation","Driver ops"] },
  { title:"Manufacturing & Industrial",
    body:"Shops, fabricators, and production teams running on whiteboards, spreadsheets, and zero real-time visibility on the floor.",
    tags:["RFQ automation","Job costing","Production tracking"] },
];

const SERVICES = [
  { num:"01", title:"Lead capture & instant response",
    body:"Every call, form, and message captured and responded to in under 60 seconds — across phone, web, and chat — so no opportunity ever goes cold.",
    pills:["Speed-to-lead","Missed call text-back","24/7 capture"] },
  { num:"02", title:"Quoting & sales automation",
    body:"Turn requests into branded quotes automatically, followed up consistently, and moved through your pipeline to close so your team doesn't have to.",
    pills:["Auto-quotes","Follow-up","Pipeline"] },
  { num:"03", title:"Operations & scheduling systems",
    body:"Scheduling, job tracking, and capacity management that eliminates double-booking, reduces no-shows, and creates fewer gaps, smoother workflow, more billable hours.",
    pills:["Scheduling","Job tracking","Capacity"] },
  { num:"04", title:"Reporting & profit visibility",
    body:"Real-time dashboards on margin, utilization, and pipeline so you always know where the money is and where it's still leaking.",
    pills:["Dashboards","Margin","Alerts"] },
];

const STEPS = [
  { num:"01", title:"Audit",     badge:"Week 1 · Free",
    body:"We map every workflow in your operation and calculate the exact dollar value of every leak — quoting, follow-up, scheduling, billing, reporting. You get a clear number: what recovery looks like for your business specifically." },
  { num:"02", title:"Blueprint", badge:"Week 2",
    body:"We design the exact systems to plug those leaks — specific tools, custom logic, and the projected return before a single thing gets built." },
  { num:"03", title:"Build",     badge:"Weeks 3–4",
    body:"We architect, integrate, and deploy custom AI-powered automation systems inside your business — built against your actual data and tested with your team." },
  { num:"04", title:"Recover",   badge:"Days 30–90",
    body:"Systems run live and claw back profit — faster responses, automated quoting, tighter operations, real-time visibility. We measure recovery against the guarantee." },
];

const RESULTS_STATS = [
  { stat:"$200K+",  label:"Net new profit created in 12 months"  },
  { stat:"+120 bps",label:"Gross margin lift — same team"         },
  { stat:"$3.78M",  label:"Combined active sales pipeline"        },
  { stat:"96.2%",   label:"On-time delivery, up from 91.4%"       },
];

const COMPARISON_ROWS = [
  { feature:"Recovers profit in 90 days",       inhouse:false, freelance:false, jdl:true },
  { feature:"Guaranteed result or you pay $0",  inhouse:false, freelance:false, jdl:true },
  { feature:"Built by real operators",          inhouse:false, freelance:false, jdl:true },
  { feature:"Systems you own outright",         inhouse:true,  freelance:false, jdl:true },
  { feature:"No long-term retainer",            inhouse:false, freelance:true,  jdl:true },
  { feature:"Live in weeks, not quarters",      inhouse:false, freelance:false, jdl:true },
];

const GUARANTEE_ITEMS = [
  "We recover at least $30,000 in net profit within 90 days — guaranteed to the last cent",
  "No long-term retainers, no lock-in contracts",
  "You keep every system we build, regardless of outcome",
  "If we miss the target, you pay nothing. Zero.",
];

const FAQ_ITEMS = [
  { q:"How can you guarantee $30K in 90 days?",
    a:"Because we don't take clients we can't deliver for. Before you pay anything, we run a Profit Audit. If we don't see a clear path to $30K, we tell you — and we part as friends. Once we start, we build the systems and stay accountable to the number." },
  { q:"What exactly do you build?",
    a:"We build the four systems that recover profit for operators: lead capture and instant response, quoting and sales automation, operations and scheduling systems, and reporting dashboards. Every build is custom to your business — not templates, not off-the-shelf tools with your logo on them." },
  { q:"Do I need a technical team?",
    a:"No. We handle the architecture, integration, and deployment. We document everything and train your team to use it. You don't need developers, IT staff, or anyone technical on your side. If you have them, great — we'll work with them. If you don't, we've got it covered." },
  { q:"How is this different from hiring an agency or buying software?",
    a:"Agencies deliver deliverables. Software gives you a tool. We deliver a measured result — $30K in recovered profit — or you pay nothing. We're operators, not marketers. We build inside your business, own the outcome, and hand you systems you control forever. No monthly SaaS fees, no retainer, no disappearing after launch." },
  { q:"What does it cost?",
    a:"Pricing depends on the scope we uncover in your audit. We've worked with businesses from $50K to $120K engagements. But here's what matters: every engagement is priced against a hard ROI target. If the math doesn't work for you, we won't sell you." },
  { q:"What happens on the free audit call?",
    a:"It's 45 minutes. We map your current ops — lead flow, quoting process, scheduling, reporting — and identify where the biggest leaks are. At the end, you get a rough number: what we think we can recover and how. No pitch, no pressure. You keep the map either way." },
];

const MARQUEE_ITEMS = [
  "HVAC & Plumbing","Freight & Logistics","Manufacturing","Auto Transport",
  "Food Service Distribution","Home Service","Wholesale & Supply","Field Services",
];

const PILOT_SEATS = [
  { label:"HVAC & Plumbing"     },
  { label:"Freight & Logistics" },
  { label:"Manufacturing"       },
  { label:"Field Service"       },
  { label:"Auto Transport"      },
];

const FIT_FOR = [
  "You're a service, logistics, or manufacturing business doing $1M+ in revenue",
  "Real operational volume — leads, jobs, trucks, orders flowing daily",
  "You know you're losing money somewhere but can't see exactly where",
  "You want systems you own, not another tool you rent forever",
];
const FIT_NOT = [
  "You're pre-revenue or under $1M — the math doesn't work yet",
  "You want a chatbot or quick automation, not real operational change",
  "You're not willing to give us access to understand how your business runs",
  "You're looking for hype, not measurable profit recovery",
];

/* ───────────────────────────────────── */
/*  Shared UI                           */
/* ───────────────────────────────────── */
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

/* Buttons — slightly rounded (8px), not pill */
function PrimaryBtn({ children, onClick, small=false, light=false }: { children:React.ReactNode; onClick?:()=>void; small?:boolean; light?:boolean }) {
  return (
    <button onClick={onClick}
      style={{ display:"inline-flex", alignItems:"center", gap:8,
        background:light?"#fff":ACCENT, color:light?ACCENT_DEEP:"#fff",
        fontSize:small?14:15.5, fontWeight:700, padding:small?"10px 18px":"14px 26px",
        borderRadius:50, border:"none", cursor:"pointer", letterSpacing:"-0.01em",
        boxShadow:light?"0 8px 28px -8px rgba(0,0,0,.28)":`0 4px 16px -4px ${ACCENT}66`,
        fontFamily:"'Hanken Grotesk',sans-serif",
        transition:"transform .15s,box-shadow .15s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform="translateY(-1px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform="translateY(0)"; }}>
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

/* ───────────────────────────────────── */
/*  Exit intent popup                   */
/* ───────────────────────────────────── */
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
          style={{ background:CREAM, borderRadius:12, padding:"36px 32px", maxWidth:420, width:"100%",
            border:`1px solid ${LINE}`, boxShadow:"0 32px 80px -16px rgba(0,0,0,.22)", position:"relative" }}
          onClick={e => e.stopPropagation()}>
          <button onClick={() => setShow(false)}
            style={{ position:"absolute", top:14, right:14, background:CREAM2, border:"none", borderRadius:6,
              width:30, height:30, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <X size={14} style={{ color:INK_SOFT }} />
          </button>
          <div style={{ fontSize:11.5, fontWeight:700, letterSpacing:"0.1em", color:ACCENT, marginBottom:10, fontFamily:"'Hanken Grotesk',sans-serif" }}>Wait — before you go</div>
          <h3 className="anton" style={{ fontSize:26, color:INK, lineHeight:1.1, marginBottom:10 }}>Know your profit leak number?</h3>
          <p style={{ color:INK_SOFT, fontSize:14.5, lineHeight:1.6, marginBottom:22, fontFamily:"'Hanken Grotesk',sans-serif" }}>Most operators don't. A free 15-minute audit tells you exactly where money is leaving your business — no pitch, no obligation.</p>
          <PrimaryBtn onClick={() => { setShow(false); onOpen(); }}>
            Book your free audit <ArrowRight size={16} />
          </PrimaryBtn>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ───────────────────────────────────── */
/*  Nav                                 */
/* ───────────────────────────────────── */
const NAV_LINKS: [string,string][] = [
  ["/#services","Services"],
  ["/#industries","Industries"],
  ["/#results","Results"],
  ["/#faq","FAQ"],
  ["/roi-calculator","ROI Calculator"],
  ["/contact","Contact"],
];

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
        {/* Desktop links */}
        <div className="hidden md:flex" style={{ alignItems:"center", gap:22 }}>
          {NAV_LINKS.map(([href,label]) => (
            href.startsWith("/") && !href.startsWith("/#") ? (
              <Link key={href} href={href}
                style={{ fontSize:14, fontWeight:600, color:INK_SOFT, textDecoration:"none", letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif" }}
                onMouseEnter={(e:React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color=INK; }}
                onMouseLeave={(e:React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color=INK_SOFT; }}>
                {label}
              </Link>
            ) : (
              <a key={href} href={href}
                style={{ fontSize:14, fontWeight:600, color:INK_SOFT, textDecoration:"none", letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif" }}
                onMouseEnter={e => { e.currentTarget.style.color=INK; }}
                onMouseLeave={e => { e.currentTarget.style.color=INK_SOFT; }}>
                {label}
              </a>
            )
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          {/* Ghost "Free AI Course" link */}
          <a href="/ai-course" className="hidden md:inline"
            style={{ fontSize:14, fontWeight:600, color:ACCENT, textDecoration:"none", letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif", opacity:.85 }}
            onMouseEnter={e => { e.currentTarget.style.opacity="1"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity=".85"; }}>
            Free AI Course
          </a>
          <PrimaryBtn onClick={onBook} small>Book a Call <ArrowRight size={14} /></PrimaryBtn>
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
            {NAV_LINKS.map(([href,label]) => (
              href.startsWith("/") && !href.startsWith("/#") ? (
                <Link key={href} href={href} onClick={() => setMenu(false)}
                  style={{ display:"block", padding:"14px 24px", fontSize:16, fontWeight:600, color:INK,
                    textDecoration:"none", borderBottom:`1px solid ${LINE}`, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                  {label}
                </Link>
              ) : (
                <a key={href} href={href} onClick={() => setMenu(false)}
                  style={{ display:"block", padding:"14px 24px", fontSize:16, fontWeight:600, color:INK,
                    textDecoration:"none", borderBottom:`1px solid ${LINE}`, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                  {label}
                </a>
              )
            ))}
            <a href="/ai-course" onClick={() => setMenu(false)}
              style={{ display:"block", padding:"14px 24px", fontSize:16, fontWeight:600, color:ACCENT,
                textDecoration:"none", borderBottom:`1px solid ${LINE}`, fontFamily:"'Hanken Grotesk',sans-serif" }}>
              Free AI Course
            </a>
            <div style={{ padding:"14px 24px" }}>
              <PrimaryBtn onClick={() => { setMenu(false); onBook(); }}>Book a Call <ArrowRight size={14} /></PrimaryBtn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ───────────────────────────────────── */
/*  Hero                                */
/* ───────────────────────────────────── */
function Hero({ onBook }: { onBook:()=>void }) {
  return (
    <section style={{ background:CREAM, padding:"72px 24px 88px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.18fr", gap:"56px", alignItems:"center" }}
          className="grid-hero">
          {/* Left column */}
          <Fade>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:7,
                background:INK, borderRadius:3, padding:"6px 13px", marginBottom:20 }}>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em",
                  textTransform:"uppercase", color:CREAM,
                  fontFamily:"'Hanken Grotesk',sans-serif" }}>⚡ Profit recovery, guaranteed</span>
              </div>
              <h1 className="anton" style={{ fontSize:"clamp(1.8rem,3.4vw,2.7rem)", lineHeight:1.08,
                color:INK, marginBottom:8 }}>
                We find the{" "}
                <span style={{ background:ACCENT, color:"#fff",
                  padding:"0.02em 0.14em 0.07em", borderRadius:4, display:"inline" }}>$30K</span>
                {" "}hiding in<br />your operations.
              </h1>
              <p className="anton" style={{ fontSize:"clamp(1.25rem,2.2vw,1.6rem)", color:INK,
                marginBottom:20, fontStyle:"italic" }}>
                In 90 days or you don't pay.
              </p>
              {/* Video shown only on mobile, between headline and body */}
              <div className="hero-mobile-video" style={{ marginBottom:20 }}>
                <VSL />
              </div>
              <p style={{ fontSize:16, lineHeight:1.68, color:INK_SOFT, maxWidth:460,
                marginBottom:28, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                You're a $1M+ operator in service, logistics, or manufacturing, and profit slips away every week — cold leads, dropped jobs, work that should run itself. Custom AI agents, automation, and a live dashboard find it and recover it. 90 days, or you don't pay.
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:28 }}>
                <PrimaryBtn onClick={onBook}>
                  Book your free audit <ArrowRight size={16} />
                </PrimaryBtn>
              </div>
              {/* Microtrust */}
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ display:"flex" }}>
                  {[0,1,2,3,4].map(i => (
                    <div key={i} style={{ width:32, height:32, borderRadius:"50%",
                      background:`rgba(11,13,18,${0.13 + i*0.04})`,
                      border:`2.5px solid ${CREAM}`, marginLeft:i===0?0:-9 }} />
                  ))}
                </div>
                <div>
                  <div style={{ display:"flex", gap:2, marginBottom:2 }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#f59e0b" stroke="none" />)}
                  </div>
                  <p style={{ fontSize:12.5, color:INK_SOFT,
                    fontFamily:"'Hanken Grotesk',sans-serif", margin:0 }}>
                    <strong style={{ color:INK }}>40+ operators</strong> automated
                  </p>
                </div>
              </div>
            </div>
          </Fade>
          {/* Right column: video shown only on desktop */}
          <Fade delay={0.12} className="hero-desktop-video">
            <VSL />
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Trust strip                         */
/* ───────────────────────────────────── */
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

/* ───────────────────────────────────── */
/*  Problem                             */
/* ───────────────────────────────────── */
function Problem() {
  return (
    <section style={{ background:INK, padding:"96px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <SectionLabel onDark>The leak</SectionLabel>
            <H2 onDark style={{ maxWidth:680, margin:"0 auto 16px" }}>
              Your business is bleeding $30K+ a year.<br/>You just can't see where.
            </H2>
            <p style={{ color:"rgba(244,239,227,.55)", fontSize:17, lineHeight:1.65, maxWidth:620, margin:"0 auto", fontFamily:"'Hanken Grotesk',sans-serif" }}>
              It's not a sales problem. It's a thousand small decisions happening without systems — missed calls, slow quotes, dropped balls, and zero visibility — quietly draining profit you already earned.
            </p>
          </div>
        </Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PAINS.map((p, i) => (
            <Fade key={p.title} delay={i*0.07}>
              <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:12, padding:"28px 26px" }}>
                <h3 style={{ fontSize:17, fontWeight:700, color:CREAM, marginBottom:10, fontFamily:"'Hanken Grotesk',sans-serif", letterSpacing:"-0.01em" }}>{p.title}</h3>
                <p style={{ fontSize:14.5, lineHeight:1.6, color:"rgba(244,239,227,.52)", marginBottom:18, fontFamily:"'Hanken Grotesk',sans-serif" }}>{p.body}</p>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <span style={{ color:ACCENT, fontSize:13, fontWeight:700, fontFamily:"'Hanken Grotesk',sans-serif" }}>▸ {p.cost}</span>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Industries                          */
/* ───────────────────────────────────── */
function Industries() {
  return (
    <section id="industries" style={{ background:CREAM2, padding:"96px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <SectionLabel>Industries</SectionLabel>
            <H2 style={{ maxWidth:560, margin:"0 auto 12px" }}>
              Built for the operators who keep things running.
            </H2>
            <p style={{ fontSize:16.5, color:INK_SOFT, maxWidth:520, margin:"0 auto", fontFamily:"'Hanken Grotesk',sans-serif", lineHeight:1.65 }}>
              If your business has real operational volume and thin time margins, these are the ones we recover it for most.
            </p>
          </div>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind, i) => (
            <Fade key={ind.title} delay={i*0.08}>
              <div style={{ background:CREAM, border:`1px solid ${LINE}`, borderRadius:12, padding:"28px 26px", height:"100%" }}>
                <h3 style={{ fontSize:18, fontWeight:700, color:INK, marginBottom:10, letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif" }}>{ind.title}</h3>
                <p style={{ fontSize:14.5, lineHeight:1.65, color:INK_SOFT, marginBottom:18, fontFamily:"'Hanken Grotesk',sans-serif" }}>{ind.body}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                  {ind.tags.map(tag => (
                    <span key={tag} style={{ fontSize:12, fontWeight:600, color:INK_SOFT, background:CREAM2,
                      border:`1px solid ${LINE}`, borderRadius:4, padding:"4px 10px", fontFamily:"'Hanken Grotesk',sans-serif" }}>{tag}</span>
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

/* ───────────────────────────────────── */
/*  FSO                                 */
/* ───────────────────────────────────── */
function FSO() {
  const stats = [
    { num:"50+",  label:"businesses automated"   },
    { num:"100%", label:"systems always running"  },
    { num:"90",   label:"day guarantee window"    },
    { num:"48hr", label:"from signed to building" },
  ];
  return (
    <section style={{ background:CREAM, padding:"96px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Fade>
            <SectionLabel>Your unfair advantage</SectionLabel>
            <H2 style={{ maxWidth:480 }}>Your fractional systems operator.</H2>
            <p style={{ color:INK_SOFT, fontSize:16.5, lineHeight:1.7, maxWidth:480, marginBottom:30, fontFamily:"'Hanken Grotesk',sans-serif" }}>
              Not an agency you manage. Not software you babysit. A dedicated operator who maps your leaks, builds the systems, runs the numbers, and keeps the profit flowing back to you.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {stats.map(s => (
                <div key={s.label} style={{ background:CREAM2, border:`1px solid ${LINE}`, borderRadius:10, padding:"20px 18px" }}>
                  <div className="anton" style={{ fontSize:30, color:ACCENT, lineHeight:1 }}>{s.num}</div>
                  <div style={{ fontSize:13, color:INK_SOFT, marginTop:4, fontFamily:"'Hanken Grotesk',sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Fade>
          <Fade delay={0.1}>
            <Tracker />
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Inline CTA                          */
/* ───────────────────────────────────── */
function InlineCTA({ onBook }: { onBook:()=>void }) {
  return (
    <section style={{ background:ACCENT, padding:"60px 24px" }}>
      <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
        <h2 className="anton" style={{ fontSize:"clamp(1.9rem,3.8vw,2.6rem)", color:"#fff", marginBottom:28 }}>
          Ready to recover your $30,000?
        </h2>
        <PrimaryBtn onClick={onBook} light>
          Book your free audit <ArrowRight size={16} />
        </PrimaryBtn>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Services                            */
/* ───────────────────────────────────── */
function Services() {
  return (
    <section id="services" style={{ background:CREAM2, padding:"96px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <SectionLabel>Services</SectionLabel>
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
                background:CREAM, border:`1px solid ${LINE}`, borderRadius:12, padding:"24px 26px" }}>
                <div className="anton" style={{ fontSize:40, color:`${ACCENT}28`, lineHeight:1, flex:"0 0 auto", minWidth:54, marginTop:2 }}>{s.num}</div>
                <div style={{ flex:1 }}>
                  <h3 style={{ fontSize:17.5, fontWeight:700, color:INK, marginBottom:7, letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif" }}>{s.title}</h3>
                  <p style={{ fontSize:15, lineHeight:1.65, color:INK_SOFT, marginBottom:12, fontFamily:"'Hanken Grotesk',sans-serif" }}>{s.body}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                    {s.pills.map(pill => (
                      <span key={pill} style={{ fontSize:12, fontWeight:600, color:ACCENT, background:`${ACCENT}0F`,
                        border:`1px solid ${ACCENT}28`, borderRadius:4, padding:"4px 10px", fontFamily:"'Hanken Grotesk',sans-serif" }}>{pill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Process                             */
/* ───────────────────────────────────── */
function Process() {
  return (
    <section id="process" style={{ background:CREAM, padding:"96px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <SectionLabel>How it works</SectionLabel>
            <H2 style={{ maxWidth:540, margin:"0 auto 0" }}>
              Four steps. Ninety days. Jobs done.
            </H2>
          </div>
        </Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <Fade key={s.num} delay={i*0.08}>
              <div style={{ background:CREAM2, border:`1px solid ${LINE}`, borderRadius:12, padding:"26px 22px", height:"100%" }}>
                <div style={{ width:38, height:38, borderRadius:8, background:ACCENT,
                  display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
                  <span className="anton" style={{ color:"#fff", fontSize:14 }}>{s.num}</span>
                </div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:6,
                  background:`${ACCENT}0F`, border:`1px solid ${ACCENT}28`, borderRadius:4,
                  padding:"3px 9px", marginBottom:14 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:ACCENT, letterSpacing:"0.05em", fontFamily:"'Hanken Grotesk',sans-serif" }}>{s.badge}</span>
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

/* ───────────────────────────────────── */
/*  Results / Case Study                */
/* ───────────────────────────────────── */
function Results() {
  return (
    <section id="results" style={{ background:INK2, padding:"96px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <Fade>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:`${ACCENT}22`,
            border:`1px solid ${ACCENT}40`, borderRadius:6, padding:"7px 14px", marginBottom:20 }}>
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
              <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:12, padding:"24px 20px" }}>
                <div className="anton" style={{ fontSize:"clamp(1.8rem,3vw,2.4rem)", color:ACCENT, lineHeight:1, marginBottom:8 }}>{r.stat}</div>
                <p style={{ fontSize:13.5, color:"rgba(244,239,227,.58)", lineHeight:1.5, fontFamily:"'Hanken Grotesk',sans-serif" }}>{r.label}</p>
              </div>
            </Fade>
          ))}
        </div>
        <Fade delay={0.2}>
          <div style={{ background:"rgba(20,102,255,.1)", border:"1px solid rgba(20,102,255,.22)", borderRadius:12, padding:"28px 28px 24px", maxWidth:720 }}>
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

/* ───────────────────────────────────── */
/*  Comparison                          */
/* ───────────────────────────────────── */
function TickOrX({ val }: { val:boolean }) {
  if (val) return (
    <div style={{ width:26, height:26, borderRadius:"50%", background:`${GREEN}1A`,
      display:"flex", alignItems:"center", justifyContent:"center" }}>
      <Check size={14} color={GREEN} strokeWidth={2.5} />
    </div>
  );
  return (
    <div style={{ width:26, height:26, borderRadius:"50%", background:"rgba(239,68,68,.12)",
      display:"flex", alignItems:"center", justifyContent:"center" }}>
      <X size={14} color="#ef4444" strokeWidth={2.5} />
    </div>
  );
}

function Comparison() {
  return (
    <section style={{ background:CREAM2, padding:"96px 24px" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <SectionLabel>The honest comparison</SectionLabel>
            <H2 style={{ maxWidth:560, margin:"0 auto 0" }}>
              Why operators choose us over the alternatives.
            </H2>
          </div>
        </Fade>
        <Fade delay={0.08}>
          <div style={{ background:CREAM, border:`1px solid ${LINE}`, borderRadius:12, overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", borderBottom:`1px solid ${LINE}` }}>
              <div style={{ padding:"16px 20px" }} />
              {(["In-house hire","Freelancer","Jobs Done Labs"] as string[]).map((h, i) => (
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
                {([row.inhouse, row.freelance, row.jdl] as boolean[]).map((v, ci) => (
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

/* ───────────────────────────────────── */
/*  Guarantee                           */
/* ───────────────────────────────────── */
function Guarantee() {
  return (
    <section style={{ background:ACCENT, padding:"96px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Fade>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
              {/* Photo — centered, overlaps card below */}
              <div style={{ position:"relative", display:"inline-block", zIndex:2, marginBottom:-56 }}>
                <div style={{ width:140, height:140, borderRadius:"50%",
                  background:"linear-gradient(135deg,rgba(255,255,255,.25),rgba(255,255,255,.08))",
                  padding:4, border:"2px solid rgba(255,255,255,.3)" }}>
                  <img src="/ryne.jpg" alt="Ryne Bandolik — Founder" style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover", objectPosition:"top" }} />
                </div>
                <div style={{ position:"absolute", bottom:-8, right:-8 }}>
                  <StampBadge size={64} dark />
                </div>
              </div>
              <div style={{ background:"rgba(255,255,255,.12)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,.2)", borderRadius:10, padding:"72px 22px 20px", maxWidth:360, width:"100%", textAlign:"center" }}>
                <p style={{ color:"rgba(255,255,255,.82)", fontSize:14.5, lineHeight:1.65, marginBottom:14, fontFamily:"'Hanken Grotesk',sans-serif", fontStyle:"italic" }}>
                  "I put my own fee on the line because I ran this on my own operation and recovered $200K doing it. If it works there, I'll prove it works for you."
                </p>
                <div style={{ marginBottom:14 }}>
                  <div className="caveat" style={{ fontSize:24, color:"#fff", lineHeight:1.1 }}>Ryne Bandolik</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,.62)", fontFamily:"'Hanken Grotesk',sans-serif" }}>Jobs Done Labs</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10, paddingTop:12, borderTop:"1px solid rgba(255,255,255,.18)" }}>
                  <span style={{ fontSize:12.5, fontWeight:700, color:"rgba(255,255,255,.9)", fontFamily:"'Hanken Grotesk',sans-serif" }}>40+ Companies</span>
                  <span style={{ fontSize:12.5, color:"rgba(255,255,255,.4)", fontFamily:"'Hanken Grotesk',sans-serif" }}>·</span>
                  <span style={{ fontSize:12.5, fontWeight:700, color:"rgba(255,255,255,.9)", fontFamily:"'Hanken Grotesk',sans-serif" }}>$0 Your risk</span>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:4, background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.18)", borderRadius:4, padding:"2px 8px", marginLeft:"auto" }}>
                    <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.06em", color:"rgba(255,255,255,.7)", fontFamily:"'Hanken Grotesk',sans-serif" }}>PERSONALLY BACKED</span>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
          <Fade delay={0.1}>
            <SectionLabel onDark>The Guarantee</SectionLabel>
            <H2 onDark style={{ maxWidth:500 }}>
              Recover $30K in 90 days, or you pay nothing.
            </H2>
            <p style={{ color:"rgba(255,255,255,.8)", fontSize:16.5, lineHeight:1.7, marginBottom:28, fontFamily:"'Hanken Grotesk',sans-serif" }}>
              We put our entire fee on the line. Either we find and recover at least $30,000 in net profit for your business within 90 days — or you owe us nothing. That's how confident we are in the work.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {GUARANTEE_ITEMS.map(item => (
                <div key={item} style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <div style={{ width:24, height:24, borderRadius:"50%", background:"rgba(255,255,255,.18)", flex:"0 0 auto", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Check size={13} color="#fff" strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize:15.5, color:"rgba(255,255,255,.92)", fontFamily:"'Hanken Grotesk',sans-serif", lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Fit                                 */
/* ───────────────────────────────────── */
function Fit() {
  return (
    <section style={{ background:CREAM, padding:"96px 24px" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <SectionLabel>Honest fit</SectionLabel>
            <H2 style={{ maxWidth:560, margin:"0 auto 0" }}>
              We're not for everyone. Here's the truth.
            </H2>
          </div>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Fade delay={0.05}>
            <div style={{ background:INK, borderRadius:12, padding:"28px 26px", height:"100%" }}>
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
            <div style={{ background:CREAM2, border:`2px solid ${LINE}`, borderRadius:12, padding:"28px 26px", height:"100%" }}>
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

/* ───────────────────────────────────── */
/*  Pilot                               */
/* ───────────────────────────────────── */
function Pilot({ onBook }: { onBook:()=>void }) {
  return (
    <section style={{ background:CREAM2, padding:"96px 24px" }}>
      <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
        <Fade>
          <div style={{ background:INK2, border:"1px solid rgba(255,255,255,.08)", borderRadius:16, padding:"48px 36px", position:"relative", overflow:"hidden" }}>
            <SectionLabel onDark>Pilot program · 2026</SectionLabel>
            <H2 onDark style={{ maxWidth:560, margin:"0 auto 14px" }}>
              We're building for 5 service businesses right now.
            </H2>
            <p style={{ color:"rgba(244,239,227,.58)", fontSize:16, lineHeight:1.7, maxWidth:480, margin:"0 auto 36px", fontFamily:"'Hanken Grotesk',sans-serif" }}>
              Instead of recycled testimonials, here's the truth: we're hands-on with our founding cohort as we speak. Full, numbers-backed case studies drop Q4 2026 — get in before they do.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center", marginBottom:32 }}>
              {PILOT_SEATS.map(s => (
                <div key={s.label} style={{ display:"flex", alignItems:"center", gap:8,
                  background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)",
                  borderRadius:6, padding:"9px 16px" }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:"rgba(255,255,255,.25)", flex:"0 0 auto" }} />
                  <span style={{ fontSize:13.5, fontWeight:600, color:"rgba(244,239,227,.7)", fontFamily:"'Hanken Grotesk',sans-serif" }}>{s.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", borderRadius:6, padding:"8px 14px", marginBottom:28 }}>
              <span style={{ fontSize:12, fontWeight:600, color:"rgba(244,239,227,.42)", letterSpacing:"0.06em", fontFamily:"'Hanken Grotesk',sans-serif" }}>Case studies coming Q4 2026</span>
            </div>
            <div>
              <PrimaryBtn onClick={onBook}>
                Apply for the next cohort <ArrowRight size={16} />
              </PrimaryBtn>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  FAQ                                 */
/* ───────────────────────────────────── */
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

/* ───────────────────────────────────── */
/*  Final CTA                           */
/* ───────────────────────────────────── */
function FinalCTA({ onBook }: { onBook:()=>void }) {
  const badges = ["$30K guarantee","90 days","Own your systems"];
  return (
    <section style={{ background:CREAM2, padding:"96px 24px" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <Fade>
          <div style={{ background:INK, borderRadius:16, overflow:"hidden", display:"flex", flexWrap:"wrap" }}>
            <div className="hidden md:block" style={{ flex:"0 0 280px", position:"relative", minHeight:360 }}>
              <img src="/ryne.jpg" alt="Ryne Bandolik" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,transparent 50%,rgba(11,13,18,.92))" }} />
              <div style={{ position:"absolute", bottom:22, left:20 }}>
                <div className="caveat" style={{ fontSize:24, color:"#fff", lineHeight:1,
                  textShadow:"0 1px 8px rgba(0,0,0,.9), 0 0 2px rgba(0,0,0,1)" }}>Ryne Bandolik</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,.85)", fontFamily:"'Hanken Grotesk',sans-serif",
                  textShadow:"0 1px 6px rgba(0,0,0,.95), 0 0 2px rgba(0,0,0,1)" }}>Founder, Jobs Done Labs</div>
              </div>
            </div>
            <div style={{ flex:1, minWidth:0, padding:"44px 40px" }}>
              <SectionLabel onDark>Get Started</SectionLabel>
              <H2 onDark style={{ maxWidth:420 }}>
                Find your $30K in 90 days. Or pay nothing.
              </H2>
              <p style={{ color:"rgba(244,239,227,.62)", fontSize:15.5, lineHeight:1.7, marginBottom:28, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                Book a free Profit Recovery Audit. We'll show you exactly where your profit is going — and how to recover it — no pitch, no pressure, no cost.
              </p>
              <PrimaryBtn onClick={onBook}>
                Book your free audit <ArrowRight size={16} />
              </PrimaryBtn>
              <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:16, marginTop:18 }}>
                {badges.map(b => (
                  <div key={b} style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ width:18, height:18, borderRadius:"50%", background:`${GREEN}22`, display:"flex", alignItems:"center", justifyContent:"center", flex:"0 0 auto" }}>
                      <Check size={10} color={GREEN} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize:13, color:"rgba(244,239,227,.55)", fontFamily:"'Hanken Grotesk',sans-serif" }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Footer                              */
/* ───────────────────────────────────── */
function Footer() {
  const linkStyle: React.CSSProperties = { display:"block", fontSize:14, color:"rgba(244,239,227,.55)", textDecoration:"none", marginBottom:8, fontFamily:"'Hanken Grotesk',sans-serif" };
  const hoverIn  = (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = CREAM; };
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
                  style={{ width:34, height:34, borderRadius:6, background:"rgba(255,255,255,.07)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(244,239,227,.5)", textDecoration:"none" }}
                  onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.07)"; }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(244,239,227,.38)", marginBottom:14, fontFamily:"'Hanken Grotesk',sans-serif" }}>Services</div>
            {["Lead capture","Quoting & sales","Operations","Reporting"].map(s => (
              <a key={s} href="/#services" style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{s}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(244,239,227,.38)", marginBottom:14, fontFamily:"'Hanken Grotesk',sans-serif" }}>Industries</div>
            {["Service businesses","Logistics & transportation","Manufacturing"].map(s => (
              <a key={s} href="/#industries" style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{s}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(244,239,227,.38)", marginBottom:14, fontFamily:"'Hanken Grotesk',sans-serif" }}>Company</div>
            <a href="#" onClick={e => { e.preventDefault(); document.dispatchEvent(new CustomEvent("open-booking")); }} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>Book a call</a>
            <Link href="/contact" style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>Contact</Link>
            <a href="/#faq" style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>FAQ</a>
            <a href="mailto:ryne@jobsdone.io" style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>ryne@jobsdone.io</a>
          </div>
        </div>
        <div style={{ paddingTop:28, display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:12 }}>
          <p style={{ fontSize:13, color:"rgba(244,239,227,.32)", fontFamily:"'Hanken Grotesk',sans-serif", margin:0 }}>
            © 2026 Jobs Done Labs · All rights reserved.
          </p>
          <div style={{ display:"flex", gap:20 }}>
            {([["Privacy Policy","/privacy"],["Terms of Service","/terms"],["Opt-in proof","/opt-in-proof"]] as [string,string][]).map(([label,href]) => (
              <Link key={href} href={href}
                style={{ fontSize:13, color:"rgba(244,239,227,.32)", textDecoration:"none", fontFamily:"'Hanken Grotesk',sans-serif" }}
                onMouseEnter={(e:React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color="rgba(244,239,227,.65)"; }}
                onMouseLeave={(e:React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color="rgba(244,239,227,.32)"; }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────────────────── */
/*  Page                                */
/* ───────────────────────────────────── */
export default function Home() {
  const [showBooking, setShowBooking] = useState(false);
  const open = () => setShowBooking(true);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const el = (e.target as Element).closest('a[href="#book"]');
      if (el) { e.preventDefault(); setShowBooking(true); }
    };
    const customHandler = () => setShowBooking(true);
    document.addEventListener("click", clickHandler);
    document.addEventListener("open-booking", customHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("open-booking", customHandler);
    };
  }, []);

  return (
    <div style={{ background:CREAM, color:INK, fontFamily:"'Hanken Grotesk',system-ui,sans-serif", WebkitFontSmoothing:"antialiased" }}>
      <ExitIntentPopup onOpen={open} />
      <LPNav onBook={open} />
      <Hero onBook={open} />
      <TrustStrip />
      <Problem />
      <Industries />
      <FSO />
      <InlineCTA onBook={open} />
      <Services />
      <Process />
      <Results />
      <Comparison />
      <Guarantee />
      <Fit />
      <Pilot onBook={open} />
      <FAQ />
      <FinalCTA onBook={open} />
      <Footer />
      <BookingModal open={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
}
