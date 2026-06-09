import { useState, useEffect } from "react";
import BookingModal from "@/components/BookingModal";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  FlaskConical,
  Play,
  Linkedin,
  Youtube,
  Twitter,
  X,
  Calculator,
  Check,
  Megaphone,
  Wrench,
  BarChart3,
  ClipboardList,
  Bot,
  Mail,
  Bell,
  Rocket,
  Database,
  Funnel,
  Users,
  FileText,
  Zap,
  PhoneCall,
  Sparkles,
  DollarSign,
  CalendarDays,
} from "lucide-react";

/* ─────────────────────────────────────────────── */
/*  Constants                                      */
/* ─────────────────────────────────────────────── */
const ACCENT = "#1F62FF";
const SURFACE = "#161618";
const BORDER = "#222226";
const TEXT = "#F0F0F0";
const MUTED = "#888892";
const BG = "#0E0E10";
const BG2 = "#121214";
const CALENDLY = "https://api.leadconnectorhq.com/widget/bookings/jdl-audit-call-ryne";

/* ─────────────────────────────────────────────── */
/*  Logo                                           */
/* ─────────────────────────────────────────────── */
function JobsDoneLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = {
    sm: { icon: "w-4 h-4", text: "text-[15px]", labs: "text-[8px]", gap: "gap-1.5" },
    md: { icon: "w-5 h-5", text: "text-[17px]", labs: "text-[9px]", gap: "gap-2" },
    lg: { icon: "w-7 h-7", text: "text-2xl", labs: "text-[11px]", gap: "gap-2.5" },
  }[size];
  return (
    <div className={`flex items-center ${s.gap}`}>
      <FlaskConical className={`${s.icon} flex-shrink-0`} style={{ color: ACCENT }} />
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline">
          <span className={`font-bold ${s.text} tracking-tight`} style={{ color: TEXT }}>JOBS</span>
          <span className={`font-bold ${s.text} tracking-tight`} style={{ color: ACCENT }}>DONE</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="flex-1 h-px" style={{ background: `${ACCENT}30` }} />
          <span className={`${s.labs} font-medium tracking-[0.16em] uppercase`} style={{ color: `${TEXT}35` }}>Labs</span>
          <span className="flex-1 h-px" style={{ background: `${ACCENT}30` }} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  Profit Recovery Tracker Card                   */
/* ─────────────────────────────────────────────── */
function WorkflowCard() {
  const GREEN = "#34d399";
  const GOAL = 30000;

  const leaks = [
    { Icon: Users,       label: "Missed Lead Follow-up",  sub: "Automated re-engagement",      amount: 8400,  done: true  },
    { Icon: Wrench,      label: "Manual Ops Overhead",    sub: "15 hrs/wk → automated",        amount: 9200,  done: true  },
    { Icon: Rocket,      label: "Slow Client Onboarding", sub: "3 days → 1 click",             amount: 7800,  done: true  },
    { Icon: Zap,         label: "Disconnected Tools",     sub: "Full stack integration live",  amount: 6600,  done: false },
  ];

  const recovered = leaks.filter(l => l.done).reduce((s, l) => s + l.amount, 0);
  const pending   = leaks.find(l => !l.done)?.amount ?? 0;
  const total     = recovered + pending;
  const pct       = Math.min(100, Math.round((total / GOAL) * 100));

  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>

      {/* ── header ── */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: ACCENT }} />
          <span className="text-[11px] font-semibold uppercase tracking-wider sg" style={{ color: MUTED }}>Profit Recovery Tracker</span>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ color: GREEN, background: `${GREEN}10`, border: `1px solid ${GREEN}20` }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: GREEN }} />
          Day 73 of 90
        </span>
      </div>

      {/* ── leak rows ── */}
      <div className="flex flex-col gap-2 p-4">
        {leaks.map(({ Icon, label, sub, amount, done }) => (
          <div key={label} className="flex items-center justify-between px-3.5 py-2.5 rounded-lg" style={{ background: BG, border: `1px solid ${done ? `${GREEN}18` : BORDER}` }}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: done ? `${GREEN}10` : `${ACCENT}10`, border: `1px solid ${done ? GREEN + "20" : ACCENT + "20"}` }}>
                <Icon className="w-3.5 h-3.5" style={{ color: done ? GREEN : ACCENT }} />
              </div>
              <div>
                <p className="font-semibold text-[12px] leading-none mb-0.5 sg" style={{ color: TEXT }}>{label}</p>
                <p className="text-[10px]" style={{ color: MUTED }}>{sub}</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded flex-shrink-0" style={done
              ? { color: GREEN,  background: `${GREEN}10`,  border: `1px solid ${GREEN}25`  }
              : { color: ACCENT, background: `${ACCENT}10`, border: `1px solid ${ACCENT}25` }}>
              {done ? `+$${amount.toLocaleString()}` : "→ Tracking"}
            </span>
          </div>
        ))}
      </div>

      {/* ── progress toward $30K guarantee ── */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-medium sg uppercase tracking-wider" style={{ color: MUTED }}>Progress to $30K Guarantee</span>
          <span className="text-[11px] font-bold sg" style={{ color: pct >= 100 ? GREEN : TEXT }}>{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${BORDER}` }}>
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: pct >= 100 ? GREEN : ACCENT }} />
        </div>
      </div>

      {/* ── bottom stats ── */}
      <div className="grid grid-cols-3 divide-x" style={{ borderTop: `1px solid ${BORDER}`, borderColor: BORDER }}>
        {[
          [`$${total.toLocaleString()}`, "Recovered"],
          [`$${GOAL.toLocaleString()}`, "Guaranteed"],
          ["100%", "Money back"],
        ].map(([v, l]) => (
          <div key={l} className="py-3 text-center">
            <p className="text-[13px] font-bold sg" style={{ color: v === `$${total.toLocaleString()}` ? GREEN : ACCENT }}>{v}</p>
            <p className="text-[10px]" style={{ color: MUTED }}>{l}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  Video Player                                   */
/* ─────────────────────────────────────────────── */
function VideoPlayer({ label }: { label?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="w-full">
      <div
        className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer"
        style={{ background: "#0a0a0c" }}
        onClick={() => !playing && setPlaying(true)}
      >
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <>
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: `linear-gradient(${ACCENT}40 1px,transparent 1px),linear-gradient(90deg,${ACCENT}40 1px,transparent 1px)`,
              backgroundSize: "44px 44px"
            }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex items-center justify-center w-14 h-14 rounded-full transition-opacity duration-150 hover:opacity-90"
                style={{ background: ACCENT }}
              >
                <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-[11px]" style={{ color: `${TEXT}50` }}>▶ Placeholder — swap in your real video</p>
            </div>
          </>
        )}
      </div>
      {label && <p className="text-center text-[13px] mt-3 tracking-wide" style={{ color: MUTED }}>{label}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  Data                                           */
/* ─────────────────────────────────────────────── */
const trustLogos = ["Apollo.io","HubSpot","Make.com","Airtable","Slack","ClickUp","Zapier","ActiveCampaign"];

const industries = [
  {
    Icon: Wrench,
    title: "Home Service Businesses",
    desc: "From lead capture to follow-up to scheduling — stop losing jobs to missed calls and slow responses. Your automated ops system works while your crews are in the field.",
    tags: ["Instant lead response","Automated follow-ups","Job tracking & reports"],
  },
  {
    Icon: Sparkles,
    title: "Aesthetic & High-Ticket Service Businesses",
    desc: "Medspas, cosmetic practices, and premium service providers — automate consultation booking, lead nurture, and client follow-up so no inquiry slips through the cracks.",
    tags: ["Consultation booking automated","Lead nurture sequences","No-show reduction"],
  },
  {
    Icon: Megaphone,
    title: "Marketing Agencies",
    desc: "Automate client onboarding, CRM management, lead nurture, and sales call transcriptions — so your team delivers faster without growing headcount.",
    tags: ["Onboarding in minutes","Zero manual CRM entry","Faster client delivery"],
  },
];

const services = [
  { num: "01", Icon: ClipboardList, title: "Profit Recovery Audit", desc: "A free analysis of your entire operation to identify exactly where you're losing money. We map every profit leak and hand you a complete blueprint of what we'd build — yours to keep whether you hire us or not.", tags: ["Profit leak analysis","Custom blueprint","Free to keep"] },
  { num: "02", Icon: Bot, title: "Custom Automation Build", desc: "End-to-end system design and implementation. We build every workflow, integration, and automation your business needs to stop leaking revenue and recover your $30K in 90 days.", tags: ["Full system build","Team training","Weeks 3–4"] },
  { num: "03", Icon: Zap, title: "Tool Integration", desc: "Connect your entire tech stack so data flows automatically between every platform. No more manual data entry, no more tools that don't talk to each other, no more revenue falling through the cracks.", tags: ["Full stack connection","Automated data flow","Zero manual entry"] },
  { num: "04", Icon: DollarSign, title: "90-Day Profit Recovery Program", desc: "Our flagship offer. We step in as your fractional systems operator, build your complete automation infrastructure, and guarantee $30,000 in measurable net profit recovery within 90 days—or you pay nothing.", tags: ["$30K guarantee","90-day timeline","100% money back"] },
];

const steps = [
  { num: "01", title: "Audit", sub: "Week 1", desc: "We analyze your current systems and identify exactly where you're losing money—every profit leak, every manual bottleneck, every missed follow-up." },
  { num: "02", title: "Blueprint", sub: "Week 2", desc: "We design your custom automation systems and walk you through the complete profit recovery plan. You see exactly what we'll build and how it recovers $30K." },
  { num: "03", title: "Build", sub: "Weeks 3–4", desc: "We implement everything and train your team on every system. Your automations go live and start recovering revenue immediately." },
  { num: "04", title: "Recover", sub: "Days 30–90", desc: "We measure, optimize, and push until you hit $30K+ in recovered profit. Weekly check-ins keep everything on track." },
];

const comparison = [
  { aspect: "Cost", inHouse: "$80K+/year salary", freelancer: "Inconsistent", us: "Predictable monthly" },
  { aspect: "Time to start", inHouse: "3–6 months", freelancer: "Weeks", us: "48 hours" },
  { aspect: "Strategy", inHouse: "Limited", freelancer: "None", us: "Weekly strategy calls" },
  { aspect: "Maintenance", inHouse: "On you", freelancer: "On you", us: "24/7 on us" },
  { aspect: "Quality", inHouse: "Manager-led", freelancer: "Hit or miss", us: "Senior engineer" },
  { aspect: "You own it", inHouse: "✗", freelancer: "Varies", us: "✓ Always" },
];

const testimonials = [
  { name: "Evan Seech", company: "Sell More Online", role: "7-Fig Ads & Funnels", quote: "An onshore automations team is light years above anything offshore." },
  { name: "Dylan Hendrickson", company: "STAXX", role: "7-Fig Fractional CFO", quote: "Solved in a couple weeks what I couldn't solve for over a year." },
  { name: "Philip Moldovanu", company: "Social Scout", role: "7-Fig Email Marketing", quote: "You click one button and everything's just ready to go." },
  { name: "Connor Rodgers", company: "Social Scout", role: "Operations Lead", quote: "We needed a partner to build the systems and keep up — that's what we got." },
  { name: "Meelad Zarrabi", company: "Fluid Creatives", role: "Creative Director", quote: "You took all the revisions and executed them perfectly." },
  { name: "Samu Kovács", company: "KS Media", role: "Founder", quote: "Your audit call was just different." },
  { name: "Jeppe Schrøder", company: "Markeity", role: "CEO", quote: "The clarity and structure they brought was something we'd been trying for months." },
  { name: "Matthew Lucero", company: "Anevo Marketing", role: "Owner", quote: "They identified things I didn't even understand and built them out proactively." },
  { name: "Dan James", company: "THAKOS", role: "Founder", quote: "My PM's life is 400 trillion times easier. We've saved so many hours." },
  { name: "Ro Bhardwaj", company: "Life's A Pitch", role: "CEO", quote: "Not just a builder — an automation strategist." },
];

const reviews = [
  { stars: 5, quote: "An ops hire costs $60–80K+ and takes months to ramp. JobsDone Labs gave us a full team from day one, working 24/7. Best investment we've ever made.", name: "Evan S.", company: "Sell More Online" },
  { stars: 5, quote: "I spent over a year trying to solve our CRM chaos. They fixed it in two weeks flat. I genuinely don't know how I ran the business before.", name: "Dylan H.", company: "STAXX" },
  { stars: 5, quote: "Our client onboarding used to take 3 days of back-and-forth. Now it's one click and everything's ready. The client experience has completely changed.", name: "Philip M.", company: "Social Scout" },
  { stars: 5, quote: "My PM says her life is 400 trillion times easier — and that's only a slight exaggeration. Hours saved every single week.", name: "Dan J.", company: "THAKOS" },
  { stars: 5, quote: "They're not just automation builders — they're strategists. They spotted opportunities I hadn't even thought of and built them out proactively.", name: "Matthew L.", company: "Anevo Marketing" },
];

const faqs = [
  { q: "What exactly is a $30,000 profit recovery guarantee?", a: "We guarantee that the automation systems we build will generate at least $30,000 in measurable net profit impact within 90 days—through recovered leads, reduced manual labor costs, faster close rates, or documented revenue you would have otherwise lost. If we don't hit $30K in measurable impact, you get 100% of your money back." },
  { q: "What qualifies as a measurable profit recovery?", a: "We track it together from day one: leads captured that your old system missed, hours of manual work eliminated (converted to dollar value), revenue from deals closed faster, and margin recovered from operational waste. We build the dashboards that show you in real time." },
  { q: "Who is this program for?", a: "Service businesses doing $500K–$5M per year with an average customer value above $2,000. This includes home service companies, marketing agencies, medspas, logistics operators, and any service business with a real sales process that has gaps in follow-up or operations." },
  { q: "What does 'fractional systems operator' mean?", a: "It means we fill the 'systems seat' of your business — the role that most owners end up doing themselves at 2am. We audit, design, build, and maintain your automation infrastructure. You get a full systems team without hiring one." },
  { q: "Is there a long-term contract?", a: "No. If we don't hit $30K in measurable profit recovery within 90 days, you pay nothing. You own everything we build — the automations, the blueprints, all of it." },
  { q: "What tools do you work with?", a: "We build on Make.com, Airtable, Slack, and GoHighLevel — but we integrate with virtually any CRM, calendar, payment processor, or project management tool your business already uses. We adapt to your stack." },
];

/* ─────────────────────────────────────────────── */
/*  Shared components                              */
/* ─────────────────────────────────────────────── */
function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-3 sg" style={{ color: ACCENT }}>
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-bold leading-[1.07] sg" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", color: TEXT, letterSpacing: "-0.025em" }}>
      {children}
    </h2>
  );
}

function PrimaryBtn({ href, children, size = "md", onClick, className = "" }: { href?: string; children: React.ReactNode; size?: "sm" | "md" | "lg" | "xl"; onClick?: () => void; className?: string }) {
  const pad = size === "xl" ? "px-10 text-[18px] font-bold rounded-2xl" : size === "lg" ? "px-8 h-12 text-[15px]" : size === "sm" ? "px-4 h-8 text-[13px]" : "px-6 h-10 text-[14px]";
  const height = size === "xl" ? { height: "62px" } : {};
  const btn = (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 font-semibold rounded-lg transition-opacity duration-150 hover:opacity-90 ${pad} ${className}`}
      style={{ background: ACCENT, color: "#fff", ...height }}
    >
      {children}
    </button>
  );
  if (!href) return btn;
  return <a href={href} target="_blank" rel="noopener noreferrer">{btn}</a>;
}

function OutlineBtn({ onClick, children, className = "" }: { onClick?: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 font-medium rounded-lg transition-colors duration-150 px-6 h-10 text-[14px] ${className}`}
      style={{ border: `1px solid ${BORDER}`, color: MUTED }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#444448"; (e.currentTarget as HTMLElement).style.color = TEXT; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = MUTED; }}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────── */
/*  FAQ Item                                       */
/* ─────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${BORDER}` }} className="last:border-0">
      <button className="w-full flex items-center justify-between py-4 text-left gap-4" onClick={() => setOpen(o => !o)}>
        <span className="font-medium text-[15px] leading-snug sg transition-colors duration-150" style={{ color: open ? ACCENT : TEXT }}>{q}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} style={{ color: open ? ACCENT : MUTED }} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-[14px] leading-relaxed" style={{ color: MUTED }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  Reviews Carousel                               */
/* ─────────────────────────────────────────────── */
function ReviewsCarousel() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIdx(i => (i + 1) % reviews.length);
  const r = reviews[idx];
  return (
    <div className="relative max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl p-8"
          style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
        >
          <div className="flex gap-0.5 mb-5">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
          </div>
          <p className="text-[15px] leading-relaxed mb-6 italic" style={{ color: TEXT }}>"{r.quote}"</p>
          <p className="font-semibold text-[14px] sg" style={{ color: TEXT }}>{r.name}</p>
          <p className="text-[13px]" style={{ color: MUTED }}>{r.company}</p>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-2.5 mt-5">
        <button onClick={prev} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150" style={{ border: `1px solid ${BORDER}`, color: MUTED }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#444448"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BORDER}>
          <ChevronLeft className="w-4 h-4" />
        </button>
        {reviews.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all duration-200 ${i === idx ? "w-5" : "w-1.5"}`}
            style={{ background: i === idx ? ACCENT : BORDER }} />
        ))}
        <button onClick={next} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150" style={{ border: `1px solid ${BORDER}`, color: MUTED }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#444448"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BORDER}>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  Exit-Intent Popup                              */
/* ─────────────────────────────────────────────── */
function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("exit_popup_shown");
    if (alreadyShown) return;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        setVisible(true);
        sessionStorage.setItem("exit_popup_shown", "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
    const timer = setTimeout(() => document.addEventListener("mouseleave", handleMouseLeave), 3000);
    return () => { clearTimeout(timer); document.removeEventListener("mouseleave", handleMouseLeave); };
  }, []);

  return (
    <>
    <AnimatePresence>
      {visible && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]" style={{ background: "rgba(0,0,0,0.65)" }}
            onClick={() => setVisible(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }} transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-[101] px-4">
            <div className="rounded-xl max-w-sm w-full p-7 relative" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <button onClick={() => setVisible(false)}
                className="absolute top-3.5 right-3.5 w-7 h-7 flex items-center justify-center rounded-md transition-colors duration-150"
                style={{ color: MUTED }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = BORDER}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-3.5 mb-5">
                <img src={`${import.meta.env.BASE_URL}ryne.png`} alt="Ryne Bandolik"
                  className="w-12 h-12 rounded-full object-cover object-top flex-shrink-0" style={{ border: `2px solid ${BORDER}` }} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider sg mb-0.5" style={{ color: ACCENT }}>Wait — before you go</p>
                  <p className="font-semibold text-[14px] sg" style={{ color: TEXT }}>A note from Ryne</p>
                  <p className="text-[12px]" style={{ color: MUTED }}>Founder, JobsDone Labs</p>
                </div>
              </div>
              <h2 className="text-[1.35rem] font-bold sg leading-snug mb-2.5" style={{ color: TEXT, letterSpacing: "-0.015em" }}>
                We guarantee $30,000 in net profit within 90 days.
              </h2>
              <p className="text-[13px] leading-relaxed mb-6" style={{ color: MUTED }}>
                Most businesses are leaking revenue every day through slow follow-up and broken ops. Book a free 45-min audit and I'll show you exactly where yours are.
              </p>
              <div className="flex flex-col gap-2.5">
                <PrimaryBtn size="lg" className="w-full justify-center" onClick={() => setShowBooking(true)}>
                  Book My Free Profit Recovery Audit <ArrowRight className="w-4 h-4" />
                </PrimaryBtn>
                <button onClick={() => setVisible(false)} className="text-[13px] py-1.5 transition-colors duration-150" style={{ color: MUTED }}>
                  No thanks, I'll pass on the free roadmap
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-4 text-[12px]" style={{ color: MUTED }}>
                <span>✓ No commitment</span><span>✓ Month-to-month</span><span>✓ You own everything</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    <BookingModal open={showBooking} onClose={() => setShowBooking(false)} />
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page                                           */
/* ─────────────────────────────────────────────── */
export default function Home() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const [scrolled, setScrolled] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: BG, color: TEXT, fontFamily: "'Inter', sans-serif" }}>
      <ExitIntentPopup />

      {/* ── NAV ── */}
      <header
        className="sticky top-0 z-50 transition-all duration-200"
        style={{
          background: scrolled ? `${BG}e0` : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" data-testid="link-logo"><JobsDoneLogo /></Link>
          <nav className="hidden md:flex items-center gap-7">
            {[["Services","services"],["Industries","industries"],["Results","results"],["FAQ","faq"]].map(([label,id]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-[13px] font-medium transition-colors duration-150"
                style={{ color: MUTED }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = TEXT}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUTED}>
                {label}
              </button>
            ))}
            <Link href="/roi-calculator">
              <button className="flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-150" style={{ color: MUTED }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = TEXT}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUTED}>
                <Calculator className="w-3.5 h-3.5" /> ROI Calculator
              </button>
            </Link>
            <Link href="/contact">
              <button className="flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-150" style={{ color: MUTED }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = TEXT}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUTED}>
                Contact
              </button>
            </Link>
            <a href="https://replit.com/@rynestone/Jobsdone-Labs-Course-AI-Platform" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[13px] font-semibold px-2.5 py-1 rounded-md transition-colors duration-150"
              style={{ color: ACCENT, border: `1px solid ${ACCENT}30`, background: `${ACCENT}10` }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${ACCENT}20`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${ACCENT}10`; }}>
              Free AI Course
            </a>
          </nav>
          <PrimaryBtn size="sm" onClick={() => setShowBooking(true)}>Book a Call</PrimaryBtn>
        </div>
      </header>

      <main>

        {/* ── HERO ── */}
        <section className="w-full px-6 pt-14 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.1em] mb-6 rounded px-3 py-1.5 sg"
              style={{ color: ACCENT, background: `${ACCENT}10`, border: `1px solid ${ACCENT}20` }}>
              <span>For Agencies &amp; Service Businesses</span>
              <span className="w-1 h-1 rounded-full inline-block flex-shrink-0" style={{ background: ACCENT }} />
              <span>90-Day Guarantee</span>
            </div>

            {/* Headline */}
            <h1 className="font-bold leading-[1.05] mb-6 sg"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: TEXT, letterSpacing: "-0.03em" }}>
              We Guarantee Service Businesses Recover At Least{" "}
              <span style={{ color: ACCENT }}>$30,000 in Net Profit</span>{" "}
              Within 90 Days—<span style={{ color: ACCENT }}>Or You Pay Nothing</span>
            </h1>

            {/* Sub-copy */}
            <p className="text-[18px] leading-[1.6] mb-10 max-w-[600px] mx-auto" style={{ color: MUTED }}>
              Custom AI automation systems that recover lost revenue from manual processes, missed follow-ups, and data chaos. If we don't hit $30K in measurable profit impact, you don't pay a dime.
            </p>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="max-w-2xl mx-auto mb-7"
          >
            <VideoPlayer label="WATCH: How we generate $30K+ in net profit in 90 days (3 min)" />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22 }}
            className="flex flex-col items-center gap-4 mb-12"
          >
            <PrimaryBtn size="xl" className="w-full max-w-[440px] justify-center" onClick={() => setShowBooking(true)}>
              Book Your Free Profit Recovery Audit <ArrowRight className="w-5 h-5" />
            </PrimaryBtn>
            <a
              href="https://replit.com/@rynestone/Jobsdone-Labs-Course-AI-Platform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[15px] font-semibold transition-colors duration-150"
              style={{ color: MUTED }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = TEXT; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED; }}
            >
              Free AI Course <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Logo strip — right under CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-center text-[11px] uppercase tracking-[0.14em] font-semibold mb-5 sg" style={{ color: `${MUTED}80` }}>
              Trusted by 7-figure founders &amp; business owners
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
              {trustLogos.map((l) => (
                <span key={l} className="font-bold text-[13px] tracking-wide sg" style={{ color: `${TEXT}28` }}>{l}</span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── STAT CARDS + WORKFLOW ── */}
        <section className="py-16" style={{ background: BG2 }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 text-left">
            {/* Left: headline + stat cards */}
            <div className="flex-1 flex flex-col gap-6">
              <div>
                <p className="font-black sg leading-[1.05] tracking-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: TEXT }}>
                  YOUR FRACTIONAL<br />
                  <span style={{ color: ACCENT }}>SYSTEMS OPERATOR</span>
                </p>
                <div className="w-10 h-1 rounded-full mt-3 mb-4" style={{ background: ACCENT }} />
                <p className="text-[14px] leading-relaxed max-w-[340px]" style={{ color: MUTED }}>
                  Most service business owners are stuck being the "systems guy" at 2am. We fill that seat for you. We audit your operation, identify profit leaks, and build the automated infrastructure that recovers that money within 90 days—guaranteed.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { Icon: Users,        value: "50+",     line1: "BUSINESSES",   line2: "AUTOMATED" },
                  { Icon: DollarSign,   value: "$30K+",   line1: "AVG. REVENUE", line2: "GENERATED" },
                  { Icon: CalendarDays, value: "90 DAYS", line1: "OR WE KEEP",   line2: "WORKING" },
                  { Icon: Star,         value: "5-STAR",  line1: "CLIENT",       line2: "REVIEWS" },
                ].map(({ Icon, value, line1, line2 }) => (
                  <div key={value} className="flex items-center gap-3 rounded-xl px-4 py-5"
                    style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}25` }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: ACCENT }} />
                    </div>
                    <div>
                      <p className="font-black sg leading-none mb-1" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: TEXT, letterSpacing: "-0.02em" }}>{value}</p>
                      <p className="text-[11px] font-semibold sg leading-tight" style={{ color: ACCENT }}>{line1}</p>
                      <p className="text-[11px] font-semibold sg leading-tight" style={{ color: MUTED }}>{line2}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: WorkflowCard */}
            <div className="w-full lg:w-auto lg:flex-shrink-0 lg:max-w-[420px]">
              <WorkflowCard />
            </div>
          </div>
        </section>

        {/* ── CASE STUDY LINK ── */}
        <section className="py-12" style={{ background: BG }}>
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <div className="rounded-xl overflow-hidden" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                <div className="flex flex-col md:flex-row">
                  {/* Left — description */}
                  <div className="flex-1 p-7 md:p-9 flex flex-col justify-center gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded sg" style={{ color: ACCENT, background: `${ACCENT}10`, border: `1px solid ${ACCENT}20` }}>Case Study · March 2026</span>
                      <span className="text-[12px]" style={{ color: MUTED }}>BCAT Logistics · Ivan Cartage · Best Care Auto</span>
                    </div>
                    <h3 className="font-bold sg leading-tight" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: TEXT, letterSpacing: "-0.02em" }}>
                      How One Logistics Group Created<br className="hidden sm:block" /> $2.0M in Net New Revenue — Without Adding Headcount
                    </h3>
                    <p className="text-[14px] leading-relaxed max-w-lg" style={{ color: MUTED }}>
                      A multi-company transportation group deployed a unified AI command center across three business units — turning five hidden revenue leaks into five working profit engines in 12 months.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-1">
                      {[["$2.0M+", "Net new revenue"], ["$310K", "Margin recovery"], ["$3.78M", "Active pipeline"]].map(([v, l]) => (
                        <div key={l}>
                          <p className="font-bold text-[1.1rem] sg leading-none mb-0.5" style={{ color: ACCENT, letterSpacing: "-0.02em" }}>{v}</p>
                          <p className="text-[12px]" style={{ color: MUTED }}>{l}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right — CTA */}
                  <div className="md:w-64 flex-shrink-0 flex flex-col items-center justify-center gap-5 p-7 md:p-9" style={{ borderTop: `1px solid ${BORDER}`, ...(true && { borderTop: undefined }) }}>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}20` }}>
                      <FileText className="w-6 h-6" style={{ color: ACCENT }} />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-[14px] sg mb-1" style={{ color: TEXT }}>Full case study</p>
                      <p className="text-[12px]" style={{ color: MUTED }}>12-page PDF · Free download</p>
                    </div>
                    <a
                      href={`${import.meta.env.BASE_URL}case-study.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-semibold text-[14px] px-5 py-2.5 rounded-lg transition-opacity duration-150 hover:opacity-80 sg"
                      style={{ background: ACCENT, color: "#fff" }}
                    >
                      Read the Case Study <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section className="py-16 px-6" style={{ background: BG }}>
          <div className="max-w-5xl mx-auto">
            <Fade>
              <Label>Why Service Businesses Hire Us</Label>
              <H2>Your business is bleeding $30K–$50K per year</H2>
              <p className="text-[16px] leading-relaxed mt-4 max-w-2xl" style={{ color: MUTED }}>
                Most service businesses aren't struggling because of a bad product or weak demand. They're losing money through three completely fixable problems.
              </p>
            </Fade>
            <div className="mt-10 grid sm:grid-cols-3 gap-6">
              {[
                { Icon: Users, title: "Lost Leads", desc: "Manual follow-up means 40–60% of leads go cold before anyone reaches them. That's revenue walking out the door every single day." },
                { Icon: BarChart3, title: "Data Chaos", desc: "No visibility into what's actually working costs you thousands in wasted spend. You can't optimize what you can't see." },
                { Icon: Wrench, title: "Manual Busywork", desc: "Your team spends 15+ hours per week on tasks a system should handle. That's payroll dollars going to work a computer should be doing." },
              ].map(({ Icon, title, desc }) => (
                <Fade key={title}>
                  <div className="rounded-xl p-6 flex flex-col gap-4 h-full" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}18` }}>
                      <Icon className="w-5 h-5" style={{ color: ACCENT }} />
                    </div>
                    <h3 className="font-bold text-[17px] sg" style={{ color: TEXT }}>{title}</h3>
                    <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>{desc}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section id="industries" className="py-16" style={{ background: BG2 }}>
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <Label>Who We Work With</Label>
              <H2>Built for businesses where time literally equals money</H2>
            </Fade>
            <div className="mt-10 grid md:grid-cols-3 gap-4">
              {industries.map((ind, i) => (
                <Fade key={ind.title} delay={i * 0.06}>
                  <div
                    className="rounded-xl p-6 flex flex-col gap-4 h-full transition-colors duration-150"
                    style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#2e2e32"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BORDER}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}18` }}>
                      <ind.Icon className="w-4.5 h-4.5" style={{ color: ACCENT }} />
                    </div>
                    <h3 className="font-bold text-[17px] sg" style={{ color: TEXT, letterSpacing: "-0.01em" }}>{ind.title}</h3>
                    <p className="text-[13px] leading-relaxed flex-1" style={{ color: MUTED }}>{ind.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ind.tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1 text-[12px] font-medium px-2.5 py-1 rounded-md" style={{ color: MUTED, background: `${TEXT}06`, border: `1px solid ${BORDER}` }}>
                          <Check className="w-3 h-3" style={{ color: ACCENT }} /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* ── INLINE CTA #1 ── */}
        <section className="py-12" style={{ background: BG }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 px-6 sm:py-8 sm:px-8 rounded-xl" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <div>
                <p className="font-bold text-[18px] sg mb-1" style={{ color: TEXT, letterSpacing: "-0.01em" }}>Ready to recover your $30,000?</p>
                <p className="text-[13px]" style={{ color: MUTED }}>Free profit recovery audit. No commitment. You keep the blueprint either way.</p>
              </div>
              <PrimaryBtn size="lg" className="flex-shrink-0" onClick={() => setShowBooking(true)}>
                Book Your Free Profit Recovery Audit <ArrowRight className="w-4 h-4" />
              </PrimaryBtn>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="py-16" style={{ background: BG2 }}>
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <Label>What You Get</Label>
              <H2>Four services that recover lost profit.</H2>
            </Fade>
            <Fade delay={0.08}>
              <div className="mt-10 mb-8 rounded-xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
                <img
                  src={`${import.meta.env.BASE_URL}hero-diagram.png`}
                  alt="Inbound to Impact — Automated by JobsDone Labs"
                  className="w-full h-auto block"
                />
              </div>
            </Fade>
            <div className="flex flex-col gap-3">
              {services.map((s, i) => (
                <Fade key={s.title} delay={i * 0.05}>
                  <div
                    className="rounded-xl p-6 flex flex-col md:flex-row gap-5 transition-colors duration-150"
                    style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#2e2e32"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BORDER}
                  >
                    <div className="flex-shrink-0 flex items-start gap-3 md:w-16">
                      <span className="font-bold text-[2.2rem] leading-none sg" style={{ color: `${ACCENT}25`, letterSpacing: "-0.03em" }}>{s.num}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[17px] mb-1.5 sg" style={{ color: TEXT, letterSpacing: "-0.01em" }}>{s.title}</h3>
                      <p className="text-[13px] leading-relaxed mb-3" style={{ color: MUTED }}>{s.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {s.tags.map(tag => (
                          <span key={tag} className="text-[12px] px-2.5 py-1 rounded-md" style={{ color: MUTED, background: `${TEXT}06`, border: `1px solid ${BORDER}` }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="py-16" style={{ background: BG }}>
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <Label>The Process</Label>
              <H2>The 90-Day Profit Recovery Process</H2>
            </Fade>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((s, i) => (
                <Fade key={s.title} delay={i * 0.06}>
                  <div
                    className="rounded-xl p-5 transition-colors duration-150"
                    style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
                    data-testid={`card-step-${i}`}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#2e2e32"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BORDER}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-[1.5rem] sg" style={{ color: ACCENT, letterSpacing: "-0.02em" }}>{s.num}</span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md sg" style={{ color: MUTED, background: `${TEXT}06`, border: `1px solid ${BORDER}` }}>{s.sub}</span>
                    </div>
                    <h3 className="font-bold text-[15px] mb-1.5 sg" style={{ color: TEXT }}>{s.title}</h3>
                    <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="py-16" style={{ background: BG2 }}>
          <div className="max-w-5xl mx-auto px-6">
            <Fade>
              <Label>Us vs. The Alternative</Label>
              <H2>Why service businesses choose us over everything else</H2>
            </Fade>
            <Fade delay={0.08}>
              <div className="mt-10 rounded-xl overflow-hidden overflow-x-auto" style={{ border: `1px solid ${BORDER}` }}>
                <div className="min-w-[520px]">
                  <div className="grid grid-cols-4" style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
                    <div className="p-3 sm:p-4" />
                    {["Hiring In-House","Generic Freelancers","Working With Us"].map((h, i) => (
                      <div key={h} className="p-3 sm:p-4 text-center" style={{
                        borderLeft: `1px solid ${BORDER}`,
                        ...(i === 2 ? { background: `${ACCENT}08`, borderLeft: `1px solid ${ACCENT}25` } : {}),
                      }}>
                        <span className="text-[12px] sm:text-[13px] font-semibold sg" style={{ color: i === 2 ? ACCENT : MUTED }}>{h}</span>
                      </div>
                    ))}
                  </div>
                  {comparison.map((row, i) => (
                    <div key={row.aspect} className="grid grid-cols-4" style={{ borderBottom: i < comparison.length - 1 ? `1px solid ${BORDER}` : "none", background: i % 2 === 0 ? BG : BG2 }}>
                      <div className="px-3 sm:px-4 py-3 text-[12px] sm:text-[13px] font-medium sg" style={{ color: MUTED }}>{row.aspect}</div>
                      <div className="px-3 sm:px-4 py-3 text-[12px] sm:text-[13px] text-center" style={{ borderLeft: `1px solid ${BORDER}`, color: MUTED }}>{row.inHouse}</div>
                      <div className="px-3 sm:px-4 py-3 text-[12px] sm:text-[13px] text-center" style={{ borderLeft: `1px solid ${BORDER}`, color: MUTED }}>{row.freelancer}</div>
                      <div className="px-3 sm:px-4 py-3 text-[12px] sm:text-[13px] text-center font-semibold sg" style={{ borderLeft: `1px solid ${ACCENT}25`, background: `${ACCENT}06`, color: ACCENT }}>{row.us}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Fade>
          </div>
        </section>

        {/* ── GUARANTEE ── */}
        <section className="py-16 px-6" style={{ background: BG }}>
          <Fade>
            <div className="max-w-3xl mx-auto rounded-xl p-6 sm:p-10 text-center" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <Label>Our Promise</Label>
              <h2 className="font-bold leading-tight mb-4 sg" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: TEXT, letterSpacing: "-0.02em" }}>
                Our $30,000 Guarantee
              </h2>
              <p className="text-[15px] leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: MUTED }}>
                We guarantee you recover at least $30,000 in measurable net profit within 90 days of system implementation, or you get 100% of your money back—no questions asked. We only work with service businesses doing $500K+ annually with average customer values above $2,000, because we know the economics work.
              </p>
              <PrimaryBtn size="lg" onClick={() => setShowBooking(true)}>
                Book Your Free Profit Recovery Audit <ArrowRight className="w-4 h-4" />
              </PrimaryBtn>
              <p className="text-[12px] mt-4" style={{ color: `${MUTED}80` }}>100% money back if we don't hit $30K. You own everything we build.</p>
            </div>
          </Fade>
        </section>

        {/* ── WHO THIS IS FOR ── */}
        <section className="py-16" style={{ background: BG2 }}>
          <div className="max-w-4xl mx-auto px-6">
            <Fade>
              <Label>Who This Is For</Label>
              <H2>Is this right for your business?</H2>
              <p className="text-[16px] leading-relaxed mt-4 mb-8 max-w-2xl" style={{ color: MUTED }}>
                We only work with service businesses where we know the economics work. Check how many of these apply to you.
              </p>
            </Fade>
            <Fade delay={0.08}>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Service business doing $500K–$5M per year",
                  "Average customer value above $2,000",
                  "Currently losing leads due to slow or manual follow-up",
                  "Using 3+ disconnected tools that don't talk to each other",
                  "Owner or team spending 10+ hours/week on manual busywork",
                  "No clear visibility into what marketing or sales activities actually work",
                ].map(item => (
                  <div key={item} className="flex items-start gap-3 rounded-xl px-5 py-4" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }}>
                      <Check className="w-3 h-3" style={{ color: ACCENT }} />
                    </div>
                    <p className="text-[14px] leading-snug" style={{ color: TEXT }}>{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-[17px] font-semibold sg text-center" style={{ color: MUTED }}>
                If you checked 3 or more,{" "}
                <span style={{ color: TEXT }}>we can recover $30K+ for you in 90 days.</span>
              </p>
            </Fade>
          </div>
        </section>

        {/* ── WRITTEN REVIEWS ── */}
        <section id="results" className="py-16" style={{ background: BG }}>
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <Label>Client Results</Label>
              <H2>Recovered profit for service businesses like yours</H2>
            </Fade>
            <Fade delay={0.08}>
              <div className="mt-10">
                <ReviewsCarousel />
              </div>
            </Fade>
          </div>
        </section>


        {/* ── FAQ ── */}
        <section id="faq" className="py-16" style={{ background: BG }}>
          <div className="max-w-2xl mx-auto px-6">
            <Fade>
              <Label>FAQ</Label>
              <H2>Common questions</H2>
            </Fade>
            <Fade delay={0.08}>
              <div className="mt-8 rounded-xl overflow-hidden" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                <div className="px-6">
                  {faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
                </div>
              </div>
            </Fade>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-16 px-6" style={{ background: BG2 }}>
          <div className="max-w-5xl mx-auto">
            <Fade>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className="md:w-72 flex-shrink-0 relative" style={{ background: "#0a0a0c" }}>
                    <img
                      src={`${import.meta.env.BASE_URL}ryne.png`}
                      alt="Ryne Bandolik — Founder, JobsDone Labs"
                      className="w-full h-full object-cover object-top min-h-[240px] md:min-h-full"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 to-transparent p-4">
                      <p className="text-white font-semibold text-[13px] leading-none sg">Ryne Bandolik</p>
                      <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Founder, JobsDone Labs</p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center p-8 md:p-12" style={{ background: SURFACE }}>
                    <Label>Ready To Recover Your $30K?</Label>
                    <h2 className="font-bold leading-tight mb-4 sg" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", color: TEXT, letterSpacing: "-0.02em" }}>
                      Book your free<br />Profit Recovery Audit
                    </h2>
                    <p className="text-[14px] leading-relaxed mb-7" style={{ color: MUTED }}>
                      Book a free audit call. I'll find where you're bleeding money, show you exactly how we'd recover it, and give you a full blueprint of the systems we'd build—yours to keep either way.
                    </p>
                    <div className="flex flex-col gap-2">
                      <PrimaryBtn size="lg" className="w-full sm:w-auto" onClick={() => setShowBooking(true)}>
                        Book Your Free Profit Recovery Audit <ArrowRight className="w-4 h-4" />
                      </PrimaryBtn>
                      <p className="text-[12px]" style={{ color: `${MUTED}70` }}>No commitment. No sales pressure. You keep the blueprint either way.</p>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-6 pt-6" style={{ borderTop: `1px solid ${BORDER}` }}>
                      {["$30K profit recovery guaranteed","100% money back if we miss","You own everything we build"].map(t => (
                        <span key={t} className="flex items-center gap-1.5 text-[12px] sg" style={{ color: MUTED }}>
                          <Check className="w-3.5 h-3.5" style={{ color: ACCENT }} /> {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="py-12" style={{ borderTop: `1px solid ${BORDER}`, background: BG }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-8">
            <div className="flex flex-col gap-3.5 max-w-[220px]">
              <JobsDoneLogo />
              <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>We recover $30K in profit within 90 days—guaranteed.</p>
              <div className="flex gap-3.5">
                <a href="#" className="transition-colors duration-150" style={{ color: `${TEXT}20` }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = ACCENT}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = `${TEXT}20`}>
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="transition-colors duration-150" style={{ color: `${TEXT}20` }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = ACCENT}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = `${TEXT}20`}>
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#" className="transition-colors duration-150" style={{ color: `${TEXT}20` }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = ACCENT}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = `${TEXT}20`}>
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 text-[13px]">
              <div>
                <p className="font-semibold mb-3 sg text-[13px]" style={{ color: TEXT }}>Services</p>
                {["Profit Recovery Audit","Custom Automation Build","Tool Integration","90-Day Profit Recovery Program"].map(l => (
                  <p key={l} className="mb-1.5 transition-colors duration-150 cursor-pointer" style={{ color: MUTED }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = TEXT}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUTED}>{l}</p>
                ))}
              </div>
              <div>
                <p className="font-semibold mb-3 sg text-[13px]" style={{ color: TEXT }}>Industries</p>
                {["Home Service","Aesthetic Businesses","Medspas & Practices","Marketing Agencies"].map(l => (
                  <p key={l} className="mb-1.5 transition-colors duration-150 cursor-pointer" style={{ color: MUTED }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = TEXT}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUTED}>{l}</p>
                ))}
              </div>
              <div>
                <p className="font-semibold mb-3 sg text-[13px]" style={{ color: TEXT }}>Company</p>
                <Link href="/privacy" className="block mb-1.5 transition-colors duration-150" style={{ color: MUTED }}>Privacy Policy</Link>
                <Link href="/terms" className="block mb-1.5 transition-colors duration-150" style={{ color: MUTED }}>Terms of Service</Link>
                <Link href="/contact" className="block mb-1.5 transition-colors duration-150" style={{ color: MUTED }}>Contact</Link>
              </div>
            </div>
          </div>
          <div className="pt-5 flex flex-col md:flex-row justify-between items-center gap-2 text-[12px]" style={{ borderTop: `1px solid ${BORDER}`, color: `${MUTED}70` }}>
            <span>© {new Date().getFullYear()} JobsDone Labs. All rights reserved.</span>
            <span>support@jobsdonelabs.ai</span>
          </div>
        </div>
      </footer>

      <BookingModal open={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
}
