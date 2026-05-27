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
/*  Workflow Card  (dark, no emojis)               */
/* ─────────────────────────────────────────────── */
function WorkflowCard() {
  const row = (icon: React.ReactNode, label: string, sub: string, badge: React.ReactNode) => (
    <div className="flex items-center justify-between px-3.5 py-2.5 rounded-lg" style={{ background: BG, border: `1px solid ${BORDER}` }}>
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}20` }}>
          {icon}
        </div>
        <div>
          <p className="font-semibold text-[13px] leading-none mb-0.5 sg" style={{ color: TEXT }}>{label}</p>
          <p className="text-[11px]" style={{ color: MUTED }}>{sub}</p>
        </div>
      </div>
      {badge}
    </div>
  );

  const pill = (label: string, variant: "blue" | "gray" | "green") => {
    const styles = {
      blue: { color: ACCENT, bg: `${ACCENT}12`, border: `${ACCENT}25` },
      gray: { color: MUTED, bg: `${BORDER}80`, border: BORDER },
      green: { color: "#34d399", bg: "#34d39912", border: "#34d39925" },
    }[variant];
    return (
      <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ color: styles.color, background: styles.bg, border: `1px solid ${styles.border}` }}>
        {label}
      </span>
    );
  };

  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: ACCENT }} />
          <span className="text-[11px] font-semibold uppercase tracking-wider sg" style={{ color: MUTED }}>Live Automation System</span>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ color: "#34d399", background: "#34d39910", border: "1px solid #34d39920" }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#34d399" }} />
          Active
        </span>
      </div>

      <div className="flex flex-col gap-2 p-4">
        {row(<ClipboardList className="w-3.5 h-3.5" style={{ color: ACCENT }} />, "Lead Capture", "New inquiry received", pill("Triggered", "blue"))}
        <div className="flex justify-center">
          <div className="w-px h-3.5" style={{ borderLeft: `1px dashed ${BORDER}` }} />
        </div>
        {row(<Bot className="w-3.5 h-3.5" style={{ color: ACCENT }} />, "AI Qualification", "Tagged, scored, enriched", pill("→ Processing", "gray"))}
        <div className="flex justify-center">
          <div className="w-px h-3.5" style={{ borderLeft: `1px dashed ${BORDER}` }} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg" style={{ background: BG, border: `1px solid ${BORDER}` }}>
            <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${ACCENT}12` }}>
              <Mail className="w-3 h-3" style={{ color: ACCENT }} />
            </div>
            <div>
              <p className="font-semibold text-[12px] leading-none mb-0.5 sg" style={{ color: TEXT }}>Email/SMS Nurture</p>
              <p className="text-[10px]" style={{ color: MUTED }}>Follow-up sent</p>
            </div>
          </div>
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg" style={{ background: BG, border: `1px solid ${BORDER}` }}>
            <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#f59e0b12" }}>
              <Bell className="w-3 h-3" style={{ color: "#f59e0b" }} />
            </div>
            <div>
              <p className="font-semibold text-[12px] leading-none mb-0.5 sg" style={{ color: TEXT }}>Team Alert</p>
              <p className="text-[10px]" style={{ color: MUTED }}>Sales notified</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-px h-3.5" style={{ borderLeft: `1px dashed ${BORDER}` }} />
        </div>
        {row(<PhoneCall className="w-3.5 h-3.5" style={{ color: "#34d399" }} />, "Sales Call", "Closed / Won", pill("Closed/Won", "green"))}
        <div className="flex justify-center">
          <div className="w-px h-3.5" style={{ borderLeft: `1px dashed ${BORDER}` }} />
        </div>
        {row(<Rocket className="w-3.5 h-3.5" style={{ color: "#34d399" }} />, "Client Onboarding", "Resources created automatically", pill("Complete", "green"))}
      </div>

      <div className="grid grid-cols-3 divide-x px-0" style={{ borderTop: `1px solid ${BORDER}`, borderColor: BORDER }}>
        {[["12h", "Saved weekly"], ["0", "Manual steps"], ["24/7", "Always on"]].map(([v, l]) => (
          <div key={l} className="py-3 text-center">
            <p className="text-base font-bold sg" style={{ color: ACCENT }}>{v}</p>
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
        className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer"
        style={{ background: "#0a0a0c", border: `1px solid ${BORDER}` }}
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
  { num: "01", Icon: Database, title: "CRM Infrastructure", desc: "A solid CRM is the backbone of every scalable business. We build it right — so every lead is automatically structured, tagged, and scored without anyone lifting a finger.", tags: ["Auto lead scoring","Consistent naming conventions","Pipeline automation"] },
  { num: "02", Icon: Funnel, title: "Lead Capture", desc: "Every inquiry from every channel flows automatically into your CRM. No more manual copy-paste, no more lost leads from slow response times.", tags: ["Omni-channel capture","Instant qualification","Zero data entry errors"] },
  { num: "03", Icon: Mail, title: "Lead Nurture", desc: "Prospects who don't book immediately get systematically engaged with personalized touchpoints — dramatically reducing no-shows and building trust before the call.", tags: ["Reduced no-shows","Personalized sequences","Better-qualified leads"] },
  { num: "04", Icon: FileText, title: "Transcript Analysis", desc: "Every sales call is automatically recorded, transcribed, and analyzed. Get strategic insights, action items, and performance data without reviewing a single recording yourself.", tags: ["Auto transcription","AI insights","Sales performance data"] },
  { num: "05", Icon: Zap, title: "Client Onboarding", desc: "From signed contract to full access — automated. Resources created, comms sent, permissions set. Your clients hit the ground running the moment ink dries.", tags: ["Instant resource creation","Consistent experience","Zero missed steps"] },
];

const steps = [
  { num: "01", title: "Free Audit Call", sub: "Day 1", desc: "We map your business, find the biggest bottlenecks eating your time, and build a custom automation roadmap." },
  { num: "02", title: "Onboarding & Setup", sub: "Week 1", desc: "Your dedicated automation engineer learns your systems, tools, and workflows. We're in your Slack within 48 hours." },
  { num: "03", title: "Weekly Builds", sub: "Ongoing", desc: "Each week we ship new automations based on your priorities. Weekly strategy calls keep everything aligned." },
  { num: "04", title: "24/7 Maintenance", sub: "Always On", desc: "We monitor, fix, and optimize every system we build. Under 24-hour response to any issue, guaranteed." },
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
  { q: "How is this different from hiring a full-time ops person?", a: "An ops hire costs $60–80K+/year, takes months to ramp, and can only work on one thing at a time. We bring a full team — strategy, automation, implementation — from day one. You get an entire ops department at a fraction of the cost, working 24/7." },
  { q: "What industries do you specialize in?", a: "Marketing agencies (ads, email, SEO, PPC, social, video), home service businesses (HVAC, roofing, plumbing, landscaping, cleaning), and finance & professional service firms." },
  { q: "What does the monthly fee include?", a: "Ongoing automation management, new workflow builds each week, system optimization, priority Slack support (under 24-hr response), weekly strategy calls, and a monthly systems report." },
  { q: "Is there a long-term contract?", a: "No. Month-to-month only. You own everything we build. If you ever leave, the automations stay with you." },
  { q: "What if I already have some automations running?", a: "We work with what you have. We map your existing systems, identify gaps, and build on top of what's already working. We optimize — we don't rip and replace." },
  { q: "What tools do you work with?", a: "We primarily build on Make.com, Airtable, and Slack — but we integrate with virtually any CRM, calendar, payment processor, or project management tool." },
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
    <h2 className="text-3xl md:text-[2.6rem] font-bold leading-[1.1] sg" style={{ color: TEXT, letterSpacing: "-0.02em" }}>
      {children}
    </h2>
  );
}

function PrimaryBtn({ href, children, size = "md", onClick, className = "" }: { href?: string; children: React.ReactNode; size?: "sm" | "md" | "lg"; onClick?: () => void; className?: string }) {
  const pad = size === "lg" ? "px-8 h-12 text-[15px]" : size === "sm" ? "px-4 h-8 text-[13px]" : "px-6 h-10 text-[14px]";
  const btn = (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 font-semibold rounded-lg transition-colors duration-150 ${pad} ${className}`}
      style={{ background: ACCENT, color: "#fff" }}
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
                  Book My Free Audit Call <ArrowRight className="w-4 h-4" />
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
            <h1 className="font-bold leading-[1.08] mb-5 sg"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: TEXT, letterSpacing: "-0.025em" }}>
              We guarantee you generate{" "}
              <span style={{ color: ACCENT }}>$30,000 in net profit</span>{" "}
              within 90 days.
            </h1>

            {/* Sub-copy */}
            <p className="text-[16px] leading-[1.65] mb-8 max-w-[540px] mx-auto" style={{ color: MUTED }}>
              By eliminating the lead leaks, slow follow-up, and manual bottlenecks currently costing you deals — or we keep working until we do.
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
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            <PrimaryBtn size="lg" onClick={() => setShowBooking(true)}>
              Book a Free Audit Call <ArrowRight className="w-4 h-4" />
            </PrimaryBtn>
            <a
              href="https://replit.com/@rynestone/Jobsdone-Labs-Course-AI-Platform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[15px] font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150"
              style={{ color: ACCENT, border: `1px solid ${ACCENT}40`, background: `${ACCENT}0d` }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${ACCENT}1a`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${ACCENT}0d`; }}
            >
              Free AI Course <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Laurel stats + Workflow Card — 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="max-w-5xl mx-auto w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16 text-left"
          >
            {/* Left: headline + stat cards */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Stacked headline */}
              <div>
                <p className="font-black sg leading-[1.05] tracking-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: TEXT }}>
                  AUTOMATE.<br />
                  <span style={{ color: ACCENT }}>CLOSE MORE.</span><br />
                  GROW FASTER.
                </p>
                <div className="w-10 h-1 rounded-full mt-3 mb-4" style={{ background: ACCENT }} />
                <p className="text-[14px] leading-relaxed max-w-[340px]" style={{ color: MUTED }}>
                  Our live automation system works 24/7 to capture leads, nurture prospects, and close more deals on autopilot.
                </p>
              </div>

              {/* 2×2 stat cards */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { Icon: Users,        value: "50+",   line1: "BUSINESSES",  line2: "AUTOMATED" },
                  { Icon: DollarSign,   value: "$30K+", line1: "AVG. REVENUE", line2: "GENERATED" },
                  { Icon: CalendarDays, value: "90 DAYS", line1: "OR WE KEEP", line2: "WORKING" },
                  { Icon: Star,         value: "5-STAR", line1: "CLIENT",      line2: "REVIEWS" },
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
          </motion.div>
        </section>

        {/* ── LOGO STRIP ── */}
        <section className="py-7 overflow-hidden" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: BG2 }}>
          <p className="text-center text-[11px] uppercase tracking-[0.13em] font-semibold mb-5 sg" style={{ color: ACCENT }}>
            Trusted by 7-figure agency founders &amp; business owners
          </p>
          <div className="relative">
            <div className="flex animate-[marquee_30s_linear_infinite] gap-16 w-max">
              {[...trustLogos,...trustLogos].map((l,i) => (
                <span key={i} className="font-semibold text-[13px] tracking-wide whitespace-nowrap sg" style={{ color: `${TEXT}18` }}>{l}</span>
              ))}
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

        {/* ── BIG NUMBERS ── */}
        <section className="py-12 md:py-16 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { num: "$30K+", label: "Average net profit generated per client in 90 days" },
              { num: "50+", label: "Businesses automated" },
              { num: "80%", label: "Reduction in manual ops work" },
            ].map(({ num, label }) => (
              <Fade key={num}>
                <div className="border-l-2 pl-5" style={{ borderColor: `${ACCENT}40` }}>
                  <p className="font-bold mb-1 sg" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: ACCENT, letterSpacing: "-0.03em" }}>{num}</p>
                  <p className="text-[13px] leading-snug" style={{ color: MUTED }}>{label}</p>
                </div>
              </Fade>
            ))}
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
                <p className="font-bold text-[18px] sg mb-1" style={{ color: TEXT, letterSpacing: "-0.01em" }}>Ready to see what's possible for your business?</p>
                <p className="text-[13px]" style={{ color: MUTED }}>Free 45-minute audit. No commitment. You keep the roadmap.</p>
              </div>
              <PrimaryBtn size="lg" className="flex-shrink-0" onClick={() => setShowBooking(true)}>
                Book Your Free Audit <ArrowRight className="w-4 h-4" />
              </PrimaryBtn>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="py-16" style={{ background: BG2 }}>
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <Label>What We Build</Label>
              <H2>Five core systems. Infinite hours recovered.</H2>
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
              <H2>Up and running in 30 days. Optimizing forever.</H2>
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
              <H2>Why founders choose us over everything else</H2>
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
                $30,000 in net profit within 90 days — guaranteed.
              </h2>
              <p className="text-[15px] leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: MUTED }}>
                If we don't deliver measurable ROI in your first 90 days, we keep working until we do. No extra charge. No excuses.
              </p>
              <PrimaryBtn size="lg" onClick={() => setShowBooking(true)}>
                Claim Your Free Audit Call <ArrowRight className="w-4 h-4" />
              </PrimaryBtn>
              <p className="text-[12px] mt-4" style={{ color: `${MUTED}80` }}>Month-to-month. No long-term contracts. You own everything we build.</p>
            </div>
          </Fade>
        </section>

        {/* ── COMMUNITY ── */}
        <section className="py-16" style={{ background: BG2 }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <Fade>
                <div>
                  <Label>Community</Label>
                  <H2>Ready to bring back hours of time?</H2>
                  <p className="text-[15px] leading-relaxed mt-4 mb-6" style={{ color: MUTED }}>
                    Join founders and operators inside our community — breakdowns, templates, and live Q&amp;A on automation that actually ships.
                  </p>
                  <button onClick={() => setShowBooking(true)} className="text-[14px] font-medium transition-colors duration-150" style={{ color: ACCENT }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.7"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}>
                    Join the community →
                  </button>
                </div>
              </Fade>
              <Fade delay={0.1}>
                <VideoPlayer />
              </Fade>
            </div>
          </div>
        </section>

        {/* ── WRITTEN REVIEWS ── */}
        <section id="results" className="py-16" style={{ background: BG }}>
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <Label>Client Results</Label>
              <H2>What clients say</H2>
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
                    <Label>Ready to get your time back?</Label>
                    <h2 className="font-bold leading-tight mb-4 sg" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", color: TEXT, letterSpacing: "-0.02em" }}>
                      Book your free<br />automation audit call
                    </h2>
                    <p className="text-[14px] leading-relaxed mb-7" style={{ color: MUTED }}>
                      In 45 minutes, I'll personally map your biggest bottlenecks and hand you a custom roadmap — whether you hire us or not.
                    </p>
                    <div className="flex flex-col gap-2">
                      <PrimaryBtn size="lg" className="w-full sm:w-auto" onClick={() => setShowBooking(true)}>
                        Book a Call with Ryne <ArrowRight className="w-4 h-4" />
                      </PrimaryBtn>
                      <p className="text-[12px]" style={{ color: `${MUTED}70` }}>No commitment. No sales pressure. You keep the roadmap either way.</p>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-6 pt-6" style={{ borderTop: `1px solid ${BORDER}` }}>
                      {["$30K net profit in 90 days","Month-to-month only","You own everything"].map(t => (
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
              <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>Your embedded automation team.</p>
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
                {["CRM Infrastructure","Lead Capture","Lead Nurture","Transcript Analysis","Client Onboarding"].map(l => (
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
