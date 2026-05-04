import { useState, useEffect } from "react";
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
} from "lucide-react";

/* ─────────────────────────────────────────────── */
/*  Logo                                           */
/* ─────────────────────────────────────────────── */
function JobsDoneLogo({ size = "md" }: { size?: "sm" | "md" | "lg"; dark?: boolean }) {
  const s = {
    sm: { icon: "w-5 h-5", text: "text-sm", labs: "text-[9px]", gap: "gap-1.5" },
    md: { icon: "w-7 h-7", text: "text-lg", labs: "text-[10px]", gap: "gap-2" },
    lg: { icon: "w-9 h-9", text: "text-2xl", labs: "text-xs", gap: "gap-2.5" },
  }[size];
  return (
    <div className={`flex items-center ${s.gap}`}>
      <FlaskConical className={`${s.icon} text-[#1F62FF] flex-shrink-0`} />
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline">
          <span className={`font-black ${s.text} text-[#FAFAFA] tracking-tight`}>JOBS</span>
          <span className={`font-black ${s.text} text-[#1F62FF] tracking-tight`}>DONE</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="flex-1 h-px bg-[#1F62FF]/40" />
          <span className={`${s.labs} font-semibold text-white/30 tracking-[0.18em] uppercase`}>Labs</span>
          <span className="flex-1 h-px bg-[#1F62FF]/40" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  Workflow Card  (dark)                          */
/* ─────────────────────────────────────────────── */
function WorkflowCard() {
  return (
    <div className="bg-[#111114] rounded-2xl border border-[#1F1F23] p-5 w-full shadow-[0_8px_60px_rgba(31,98,255,0.12)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-white/30 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F62FF]/50 inline-block" />
          Live Automation System
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          Active
        </span>
      </div>

      <div className="bg-[#0A0A0B] border border-[#1F1F23] rounded-xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#1F62FF]/10 rounded-lg flex items-center justify-center flex-shrink-0 text-base">📋</div>
          <div>
            <p className="font-semibold text-[#FAFAFA] text-sm leading-none mb-0.5">Lead Capture</p>
            <p className="text-[#9CA3AF] text-xs">New inquiry received</p>
          </div>
        </div>
        <span className="text-xs font-medium text-[#1F62FF] bg-[#1F62FF]/10 px-2.5 py-1 rounded-md border border-[#1F62FF]/20 whitespace-nowrap">Triggered</span>
      </div>

      <div className="flex justify-center my-1.5">
        <div className="w-px h-5 border-l-2 border-dashed border-[#1F1F23]" />
      </div>

      <div className="bg-[#0A0A0B] border border-[#1F1F23] rounded-xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#1F62FF]/10 rounded-lg flex items-center justify-center flex-shrink-0 text-base">🤖</div>
          <div>
            <p className="font-semibold text-[#FAFAFA] text-sm leading-none mb-0.5">AI Qualification</p>
            <p className="text-[#9CA3AF] text-xs">Tagged, scored, enriched</p>
          </div>
        </div>
        <span className="text-xs font-medium text-[#9CA3AF] bg-[#1F1F23] px-2.5 py-1 rounded-md border border-[#1F1F23] whitespace-nowrap">→ Processing</span>
      </div>

      <div className="flex justify-center my-1.5">
        <div className="w-px h-5 border-l-2 border-dashed border-[#1F1F23]" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-[#0A0A0B] border border-[#1F1F23] rounded-xl p-3 flex items-start gap-2">
          <div className="w-7 h-7 bg-[#1F62FF]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">📧</div>
          <div>
            <p className="font-semibold text-[#FAFAFA] text-xs leading-none mb-0.5">Email Nurture</p>
            <p className="text-[#9CA3AF] text-[11px]">Follow-up sent</p>
          </div>
        </div>
        <div className="bg-[#0A0A0B] border border-[#1F1F23] rounded-xl p-3 flex items-start gap-2">
          <div className="w-7 h-7 bg-amber-950/40 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">🔔</div>
          <div>
            <p className="font-semibold text-[#FAFAFA] text-xs leading-none mb-0.5">Team Alert</p>
            <p className="text-[#9CA3AF] text-[11px]">Sales notified</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-1.5">
        <div className="w-px h-5 border-l-2 border-dashed border-[#1F1F23]" />
      </div>

      <div className="bg-[#0A0A0B] border border-[#1F1F23] rounded-xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-emerald-950/40 rounded-lg flex items-center justify-center flex-shrink-0 text-base">🚀</div>
          <div>
            <p className="font-semibold text-[#FAFAFA] text-sm leading-none mb-0.5">Client Onboarding</p>
            <p className="text-[#9CA3AF] text-xs">Resources created automatically</p>
          </div>
        </div>
        <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/60">Complete</span>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#1F1F23]">
        <div className="text-center">
          <p className="text-xl font-black text-[#1F62FF]">12h</p>
          <p className="text-xs text-[#9CA3AF]">Saved weekly</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-black text-[#1F62FF]">0</p>
          <p className="text-xs text-[#9CA3AF]">Manual steps</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-black text-[#1F62FF]">24/7</p>
          <p className="text-xs text-[#9CA3AF]">Always running</p>
        </div>
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
        style={{ background: "linear-gradient(135deg,#060610 0%,#0c0c1a 100%)", boxShadow: "0 0 0 1px #1F1F23, 0 8px 60px rgba(31,98,255,0.2)" }}
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
            <div className="absolute inset-0 opacity-[0.06]" style={{
              backgroundImage: "linear-gradient(rgba(31,98,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(31,98,255,0.5) 1px,transparent 1px)",
              backgroundSize: "40px 40px"
            }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex items-center justify-center w-20 h-20 rounded-full bg-[#1F62FF] hover:scale-110 transition-transform duration-200"
                style={{ animation: "pulse-play 2.5s ease-in-out infinite" }}
              >
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white/50 text-xs">▶ Placeholder — swap in your real video</p>
            </div>
          </>
        )}
      </div>
      {label && <p className="text-center text-[#9CA3AF] text-sm mt-4 tracking-wide">{label}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  Data                                           */
/* ─────────────────────────────────────────────── */
const trustLogos = ["Apollo.io","HubSpot","Make.com","Airtable","Slack","ClickUp","Zapier","ActiveCampaign"];

const industries = [
  { icon: "📢", title: "Marketing Agencies", desc: "Automate client onboarding, CRM management, lead nurture, and sales call transcriptions — so your team delivers faster without growing headcount.", tags: ["Onboarding in minutes","Zero manual CRM entry","Faster client delivery"] },
  { icon: "🏠", title: "Home Service Businesses", desc: "From lead capture to follow-up to scheduling — stop losing jobs to missed calls and slow responses. Your automated ops system works while your crews are in the field.", tags: ["Instant lead response","Automated follow-ups","Job tracking & reports"] },
  { icon: "💼", title: "Finance & Professional Services", desc: "Streamline client intake, compliance documentation, appointment nurture, and reporting. Show measurable ROI to clients while running a leaner back office.", tags: ["Client intake automated","No-show reduction","Reporting automated"] },
];

const services = [
  { num: "01", title: "CRM Infrastructure", desc: "A solid CRM is the backbone of every scalable business. We build it right — so every lead is automatically structured, tagged, and scored without anyone lifting a finger.", tags: ["Auto lead scoring","Consistent naming conventions","Pipeline automation"] },
  { num: "02", title: "Lead Capture", desc: "Every inquiry from every channel flows automatically into your CRM. No more manual copy-paste, no more lost leads from slow response times.", tags: ["Omni-channel capture","Instant qualification","Zero data entry errors"] },
  { num: "03", title: "Lead Nurture", desc: "Prospects who don't book immediately get systematically engaged with personalized touchpoints — dramatically reducing no-shows and building trust before the call.", tags: ["Reduced no-shows","Personalized sequences","Better-qualified leads"] },
  { num: "04", title: "Transcript Analysis", desc: "Every sales call is automatically recorded, transcribed, and analyzed. Get strategic insights, action items, and performance data without reviewing a single recording yourself.", tags: ["Auto transcription","AI insights","Sales performance data"] },
  { num: "05", title: "Client Onboarding", desc: "From signed contract to full access — automated. Resources created, comms sent, permissions set. Your clients hit the ground running the moment ink dries.", tags: ["Instant resource creation","Consistent experience","Zero missed steps"] },
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
/*  FAQ Item                                       */
/* ─────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1F1F23] last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-[#FAFAFA] font-semibold text-base leading-snug group-hover:text-[#1F62FF] transition-colors">{q}</span>
        <ChevronDown className={`w-5 h-5 text-[#9CA3AF] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#1F62FF]" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[#9CA3AF] leading-relaxed text-sm">{a}</p>
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
    <div className="relative max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="bg-[#111114] border border-[#1F1F23] rounded-2xl p-8 text-center"
        >
          <div className="flex justify-center gap-1 mb-5">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
          </div>
          <p className="text-[#FAFAFA] text-lg leading-relaxed mb-6 italic">"{r.quote}"</p>
          <p className="font-bold text-[#FAFAFA]">{r.name}</p>
          <p className="text-[#9CA3AF] text-sm">{r.company}</p>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-3 mt-6">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-[#1F1F23] flex items-center justify-center hover:border-[#1F62FF] hover:text-[#1F62FF] text-[#9CA3AF] transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        {reviews.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-2.5 rounded-full transition-all ${i === idx ? "bg-[#1F62FF] w-6" : "bg-[#1F1F23] w-2.5"}`} />
        ))}
        <button onClick={next} className="w-10 h-10 rounded-full border border-[#1F1F23] flex items-center justify-center hover:border-[#1F62FF] hover:text-[#1F62FF] text-[#9CA3AF] transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  Helpers                                        */
/* ─────────────────────────────────────────────── */
function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[#1F62FF] text-[13px] font-semibold uppercase tracking-[0.12em] mb-4">{children}</p>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-4xl md:text-5xl font-black tracking-tight text-[#FAFAFA] leading-[1.05]"
      style={{ fontFamily: "'Inter Display', 'Inter', sans-serif", letterSpacing: "-0.02em" }}
    >
      {children}
    </h2>
  );
}

function CtaButton({ href, children, size = "md", className = "" }: { href: string; children: React.ReactNode; size?: "sm" | "md" | "lg"; className?: string }) {
  const p = size === "lg" ? "px-10 h-16 text-lg" : size === "sm" ? "px-6 h-10 text-sm" : "px-8 h-13 text-base";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <button
        className={`bg-[#1F62FF] hover:bg-[#1a54e0] text-white font-bold ${p} rounded-xl transition-all inline-flex items-center gap-2 hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(31,98,255,0.45)]`}
        style={{ boxShadow: "0 4px 24px rgba(31,98,255,0.35)" }}
      >
        {children}
      </button>
    </a>
  );
}

const CALENDLY = "https://calendly.com/ryne-bandolik";

/* ─────────────────────────────────────────────── */
/*  Exit-Intent Popup                              */
/* ─────────────────────────────────────────────── */
function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);

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

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={() => setVisible(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-[101] px-4"
          >
            <div className="bg-[#111114] rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-[#1F1F23]">
              <button
                onClick={() => setVisible(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1F1F23] text-[#9CA3AF] hover:text-[#FAFAFA] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-5">
                <img
                  src={`${import.meta.env.BASE_URL}ryne.png`}
                  alt="Ryne Bandolik"
                  className="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-[#1F62FF]/40"
                />
                <div className="text-left">
                  <p className="text-[#1F62FF] text-xs font-semibold uppercase tracking-widest mb-0.5">Wait — before you go</p>
                  <p className="font-bold text-[#FAFAFA] text-sm leading-snug">A personal note from Ryne</p>
                  <p className="text-[#9CA3AF] text-xs">Founder, JobsDone Labs</p>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-[#FAFAFA] leading-tight mb-3">
                  We guarantee $30,000 recovered in 90 days — or we keep working for free.
                </h2>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">
                  Most businesses are leaking revenue every day through slow follow-up and broken ops. Book a free 45-min audit and I'll show you exactly where yours are.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <CtaButton href={CALENDLY} className="block">
                  Book My Free Audit Call <ArrowRight className="w-4 h-4" />
                </CtaButton>
                <button
                  onClick={() => setVisible(false)}
                  className="w-full text-[#9CA3AF] hover:text-[#FAFAFA] text-sm py-2 transition-colors"
                >
                  No thanks, I'll pass on the free roadmap
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-[#9CA3AF]">
                <span>✓ No commitment</span>
                <span>✓ Month-to-month</span>
                <span>✓ You own everything</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page                                           */
/* ─────────────────────────────────────────────── */
export default function Home() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: "#0A0A0B", color: "#FAFAFA" }}>

      <ExitIntentPopup />

      {/* ── NAV ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0B]/85 backdrop-blur-md border-b border-[#1F1F23]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" data-testid="link-logo"><JobsDoneLogo /></Link>
          <nav className="hidden md:flex items-center gap-8">
            {[["Services","services"],["Industries","industries"],["Results","results"],["FAQ","faq"]].map(([label,id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-[#9CA3AF] hover:text-[#FAFAFA] text-sm font-medium transition-colors">{label}</button>
            ))}
            <Link href="/roi-calculator">
              <button className="flex items-center gap-1.5 text-[#9CA3AF] hover:text-[#FAFAFA] text-sm font-medium transition-colors">
                <Calculator className="w-3.5 h-3.5" /> ROI Calculator
              </button>
            </Link>
          </nav>
          <CtaButton href={CALENDLY} size="sm">
            Book a Call
          </CtaButton>
        </div>
      </header>

      <main>

        {/* ── HERO ── */}
        <section
          className="max-w-6xl mx-auto px-6 pt-20 pb-12"
          style={{ background: "radial-gradient(ellipse 80% 60% at 60% -10%, rgba(31,98,255,0.13) 0%, transparent 60%)" }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="flex-1 min-w-0"
            >
              <div className="inline-flex items-center gap-2 text-[#1F62FF] text-[12px] font-semibold uppercase tracking-[0.12em] mb-8 border border-[#1F62FF]/25 rounded-full px-4 py-1.5 bg-[#1F62FF]/5">
                <span>For Agencies &amp; Service Businesses</span>
                <span className="w-1 h-1 rounded-full bg-[#1F62FF] inline-block" />
                <span>90-Day Guarantee</span>
              </div>
              <h1
                className="text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.04] text-[#FAFAFA] mb-6"
                style={{ fontFamily: "'Inter Display', 'Inter', sans-serif", letterSpacing: "-0.025em" }}
              >
                We guarantee you recover a minimum of{" "}
                <span className="text-[#1F62FF]">$30,000 in lost revenue</span>{" "}
                within 90 days.
              </h1>
              <p className="text-[#9CA3AF] text-lg leading-[1.65] mb-9 max-w-lg">
                By eliminating the lead leaks, slow follow-up, and manual bottlenecks currently costing you deals — or we keep working until we do. No excuses.
              </p>
              <div className="flex flex-wrap gap-4 mb-9">
                <CtaButton href={CALENDLY} data-testid="button-hero-primary">
                  Book a Free Audit Call <ArrowRight className="w-4 h-4" />
                </CtaButton>
                <button
                  onClick={() => scrollTo("results")}
                  className="border border-[#1F1F23] hover:border-[#1F62FF]/40 text-[#9CA3AF] hover:text-[#FAFAFA] text-base font-medium px-8 h-13 py-3.5 rounded-xl transition-all"
                  data-testid="button-hero-results"
                >
                  See Client Results
                </button>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-[#9CA3AF] text-sm">50+ businesses automated · Avg. $30K+ saved in 90 days</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex-1 min-w-0 w-full lg:max-w-[460px]"
            >
              <WorkflowCard />
            </motion.div>

          </div>
        </section>

        {/* ── VIDEO ── */}
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <Fade>
            <VideoPlayer label="WATCH: How we save agencies $30K+ in 90 days (3 min)" />
          </Fade>
        </section>

        {/* ── LOGO STRIP ── */}
        <section className="border-y border-[#1F1F23] bg-[#0D0D10] py-8 overflow-hidden">
          <p className="text-center text-[#9CA3AF] text-[12px] uppercase tracking-[0.14em] font-semibold mb-6">As featured in — Trusted by 7-figure founders</p>
          <div className="relative">
            <div className="flex animate-[marquee_28s_linear_infinite] gap-16 w-max">
              {[...trustLogos,...trustLogos].map((l,i) => (
                <span key={i} className="text-white/20 font-bold text-sm tracking-wide whitespace-nowrap">{l}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── BIG NUMBERS ── */}
        <section className="py-24 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { num: "$30K+", label: "Average saved per client in 90 days" },
              { num: "50+", label: "Businesses automated" },
              { num: "80%", label: "Reduction in manual ops work" },
            ].map(({ num, label }) => (
              <Fade key={num}>
                <div>
                  <p
                    className="text-[#1F62FF] font-black mb-2 leading-none"
                    style={{ fontFamily: "'Inter Display', 'Inter', sans-serif", fontSize: "clamp(3rem, 7vw, 5rem)", letterSpacing: "-0.03em", textShadow: "0 0 60px rgba(31,98,255,0.35)" }}
                  >
                    {num}
                  </p>
                  <p className="text-[#9CA3AF] text-sm leading-snug">{label}</p>
                </div>
              </Fade>
            ))}
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section id="industries" className="py-24 bg-[#0D0D10]">
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <SectionLabel>Who We Work With</SectionLabel>
              <SectionHeading>Built for businesses where time literally equals money</SectionHeading>
            </Fade>
            <div className="mt-12 grid md:grid-cols-3 gap-5">
              {industries.map((ind, i) => (
                <Fade key={ind.title} delay={i * 0.08}>
                  <div className="bg-[#111114] border border-[#1F1F23] rounded-2xl p-7 hover:border-[#1F62FF]/35 hover:shadow-[0_4px_32px_rgba(31,98,255,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 h-full">
                    <div className="text-3xl">{ind.icon}</div>
                    <h3 className="font-bold text-[#FAFAFA] text-xl">{ind.title}</h3>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed flex-1">{ind.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {ind.tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1.5 text-[#1F62FF] text-xs font-medium bg-[#1F62FF]/8 border border-[#1F62FF]/20 px-3 py-1 rounded-full">
                          <Check className="w-3 h-3" /> {tag}
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
        <section className="py-16 bg-[#1F62FF]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-5 tracking-tight">Ready to see what's possible for your business?</h2>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              <button className="bg-white hover:bg-[#FAFAFA] text-[#1F62FF] font-bold text-base px-10 h-13 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 hover:scale-[1.03]">
                Book Your Free Audit <ArrowRight className="w-4 h-4" />
              </button>
            </a>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="py-24 bg-[#0A0A0B]">
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <SectionLabel>What We Build</SectionLabel>
              <SectionHeading>Five core systems. Infinite hours recovered.</SectionHeading>
            </Fade>
            <Fade delay={0.1}>
              <div className="mt-12 mb-8 rounded-2xl overflow-hidden ring-1 ring-[#1F1F23]" style={{ boxShadow: "0 4px 60px rgba(31,98,255,0.15)" }}>
                <img
                  src={`${import.meta.env.BASE_URL}hero-diagram.png`}
                  alt="Inbound to Impact — Automated by JobsDone Labs"
                  className="w-full h-auto block"
                />
              </div>
            </Fade>
            <div className="flex flex-col gap-4">
              {services.map((s, i) => (
                <Fade key={s.title} delay={i * 0.06}>
                  <div className="bg-[#111114] border border-[#1F1F23] rounded-2xl p-7 flex flex-col md:flex-row gap-6 hover:border-[#1F62FF]/30 hover:shadow-[0_4px_32px_rgba(31,98,255,0.1)] hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <span
                        className="font-black text-[#1F62FF]/15 leading-none select-none"
                        style={{ fontFamily: "'Inter Display', 'Inter', sans-serif", fontSize: "5.5rem", lineHeight: 1 }}
                      >
                        {s.num}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#FAFAFA] text-xl mb-2">{s.title}</h3>
                      <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">{s.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map(tag => (
                          <span key={tag} className="text-[#9CA3AF] text-xs bg-[#1F1F23] border border-white/5 px-3 py-1 rounded-full">{tag}</span>
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
        <section className="py-24 bg-[#0D0D10]">
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <SectionLabel>The Process</SectionLabel>
              <SectionHeading>Up and running in 30 days. Optimizing forever.</SectionHeading>
            </Fade>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((s, i) => (
                <Fade key={s.title} delay={i * 0.08}>
                  <div className="bg-[#111114] border border-[#1F1F23] rounded-2xl p-6 hover:border-[#1F62FF]/30 hover:shadow-[0_4px_24px_rgba(31,98,255,0.1)] hover:-translate-y-1 transition-all duration-300" data-testid={`card-step-${i}`}>
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className="font-black text-[#1F62FF]"
                        style={{ fontFamily: "'Inter Display', 'Inter', sans-serif", fontSize: "2rem" }}
                      >
                        {s.num}
                      </span>
                      <span className="text-xs font-medium text-[#9CA3AF] bg-[#1F1F23] border border-white/5 px-2.5 py-1 rounded-full">{s.sub}</span>
                    </div>
                    <h3 className="font-bold text-[#FAFAFA] text-base mb-2">{s.title}</h3>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="py-24 bg-[#0A0A0B]">
          <div className="max-w-5xl mx-auto px-6">
            <Fade>
              <SectionLabel>Us vs. The Alternative</SectionLabel>
              <SectionHeading>Why founders choose us over everything else</SectionHeading>
            </Fade>
            <Fade delay={0.1}>
              <div className="mt-12 rounded-2xl border border-[#1F1F23] overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-4 bg-[#111114] border-b border-[#1F1F23]">
                  <div className="p-4 text-[#9CA3AF] text-sm font-semibold" />
                  <div className="p-4 text-[#9CA3AF] text-sm font-semibold text-center border-l border-[#1F1F23]">Hiring In-House</div>
                  <div className="p-4 text-[#9CA3AF] text-sm font-semibold text-center border-l border-[#1F1F23]">Generic Freelancers</div>
                  <div className="p-4 text-center border-l border-[#1F62FF]/40" style={{ background: "rgba(31,98,255,0.06)" }}>
                    <span className="text-[#1F62FF] text-sm font-bold">Working With Us</span>
                  </div>
                </div>
                {comparison.map((row, i) => (
                  <div key={row.aspect} className={`grid grid-cols-4 border-b border-[#1F1F23] last:border-0 ${i % 2 === 0 ? "bg-[#0A0A0B]" : "bg-[#0D0D10]"}`}>
                    <div className="p-4 text-[#9CA3AF] text-sm font-semibold">{row.aspect}</div>
                    <div className="p-4 text-[#9CA3AF] text-sm text-center border-l border-[#1F1F23]">{row.inHouse}</div>
                    <div className="p-4 text-[#9CA3AF] text-sm text-center border-l border-[#1F1F23]">{row.freelancer}</div>
                    <div
                      className="p-4 text-[#1F62FF] text-sm font-semibold text-center border-l border-[#1F62FF]/30"
                      style={{ background: "rgba(31,98,255,0.06)" }}
                    >
                      {row.us}
                    </div>
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        </section>

        {/* ── GUARANTEE ── */}
        <section className="py-20 px-6 bg-[#0D0D10]">
          <Fade>
            <div
              className="max-w-4xl mx-auto rounded-2xl p-12 text-center relative overflow-hidden"
              style={{ animation: "pulse-glow 3s ease-in-out infinite", background: "linear-gradient(135deg, #0D0D14 0%, #0A0A10 100%)" }}
            >
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(ellipse at center, #1F62FF 0%, transparent 70%)" }} />
              <div className="relative z-10">
                <p className="text-[#1F62FF] text-[12px] font-semibold uppercase tracking-[0.14em] mb-5">Our Promise</p>
                <h2
                  className="text-4xl md:text-5xl font-black text-[#FAFAFA] mb-5 leading-tight"
                  style={{ fontFamily: "'Inter Display', 'Inter', sans-serif", letterSpacing: "-0.02em" }}
                >
                  $30,000 in recovered time within 90 days — guaranteed.
                </h2>
                <p className="text-[#9CA3AF] text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                  If we don't deliver measurable ROI in your first 90 days, we keep working until we do. No extra charge. No excuses.
                </p>
                <CtaButton href={CALENDLY} size="lg" data-testid="button-guarantee-cta">
                  Claim Your Free Audit Call <ArrowRight className="w-5 h-5" />
                </CtaButton>
                <p className="text-[#9CA3AF]/60 text-xs mt-5">Month-to-month. No long-term contracts. You own everything we build.</p>
              </div>
            </div>
          </Fade>
        </section>

        {/* ── COMMUNITY ── */}
        <section className="py-24 bg-[#0A0A0B]">
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <SectionLabel>Community</SectionLabel>
              <SectionHeading>Ready to bring back hours of time?</SectionHeading>
            </Fade>
            <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
              <Fade delay={0.08}>
                <div className="flex flex-col gap-5">
                  <p className="text-[#9CA3AF] text-lg leading-relaxed">
                    Join founders and operators inside our community — breakdowns, templates, and live Q&amp;A on automation that actually ships.
                  </p>
                  <div>
                    <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                      <button className="border border-[#1F62FF]/50 text-[#1F62FF] hover:bg-[#1F62FF] hover:text-white font-semibold px-6 h-10 rounded-lg transition-all text-sm">
                        Join the community →
                      </button>
                    </a>
                  </div>
                </div>
              </Fade>
              <Fade delay={0.15}>
                <VideoPlayer />
              </Fade>
            </div>
          </div>
        </section>

        {/* ── RESULTS (text testimonials) ── */}
        <section id="results" className="py-24 bg-[#0D0D10]">
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <SectionLabel>Client Results</SectionLabel>
              <SectionHeading>Founders who've used our system — and what happened.</SectionHeading>
              <p className="text-[#9CA3AF] mt-4 mb-12 text-lg leading-relaxed max-w-2xl">Agency owners and business founders share what changed after putting our automation systems to work.</p>
            </Fade>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <Fade key={t.name} delay={i * 0.05}>
                  <div className="bg-[#111114] border border-[#1F1F23] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#1F62FF]/30 hover:shadow-[0_4px_24px_rgba(31,98,255,0.1)] hover:-translate-y-1 transition-all duration-300" data-testid={`card-testimonial-${i}`}>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed italic flex-1">"{t.quote}"</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-[#1F1F23]">
                      <div className="w-9 h-9 rounded-full bg-[#1F62FF]/10 border border-[#1F62FF]/20 flex items-center justify-center text-[#1F62FF] font-bold text-sm flex-shrink-0">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-[#FAFAFA] text-sm leading-none mb-0.5">{t.name}</p>
                        <p className="text-[#1F62FF] text-xs font-medium">{t.company}</p>
                        <p className="text-[#9CA3AF] text-xs">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* ── WRITTEN REVIEWS ── */}
        <section className="py-24 bg-[#0A0A0B]">
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <SectionLabel>Reviews</SectionLabel>
              <SectionHeading>What clients say</SectionHeading>
            </Fade>
            <Fade delay={0.1}>
              <div className="mt-12">
                <ReviewsCarousel />
              </div>
            </Fade>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-24 bg-[#0D0D10]">
          <div className="max-w-3xl mx-auto px-6">
            <Fade>
              <SectionLabel>FAQ</SectionLabel>
              <SectionHeading>Common questions</SectionHeading>
            </Fade>
            <Fade delay={0.1}>
              <div className="mt-12 bg-[#111114] rounded-2xl border border-[#1F1F23] px-6">
                {faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
              </div>
            </Fade>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section
          className="py-24 px-6 bg-[#0A0A0B]"
          style={{ background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(31,98,255,0.08) 0%, transparent 65%), #0A0A0B" }}
        >
          <div className="max-w-5xl mx-auto">
            <Fade>
              <div className="bg-[#111114] border border-[#1F1F23] rounded-3xl overflow-hidden">
                <div className="flex flex-col md:flex-row items-stretch">

                  {/* Photo side */}
                  <div className="md:w-[340px] flex-shrink-0 relative bg-[#0A0A0B]">
                    <img
                      src={`${import.meta.env.BASE_URL}ryne.png`}
                      alt="Ryne Bandolik — Founder, JobsDone Labs"
                      className="w-full h-full object-cover object-top min-h-[280px] md:min-h-full"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                      <p className="text-white font-bold text-sm leading-none">Ryne Bandolik</p>
                      <p className="text-white/50 text-xs mt-0.5">Founder, JobsDone Labs</p>
                    </div>
                  </div>

                  {/* Text side */}
                  <div className="flex-1 flex flex-col justify-center p-10 md:p-14">
                    <p className="text-[#1F62FF] text-[12px] font-semibold uppercase tracking-[0.12em] mb-5">Ready to get your time back?</p>
                    <h2
                      className="font-black text-[#FAFAFA] tracking-tight mb-5 leading-tight text-3xl md:text-4xl"
                      style={{ fontFamily: "'Inter Display', 'Inter', sans-serif", letterSpacing: "-0.02em" }}
                    >
                      Book your free<br />automation audit call
                    </h2>
                    <p className="text-[#9CA3AF] text-base leading-relaxed mb-9">
                      In 45 minutes, I'll personally map your biggest bottlenecks and hand you a custom roadmap — whether you hire us or not.
                    </p>

                    <div className="flex flex-col gap-3">
                      <CtaButton href={CALENDLY} size="lg" className="w-full sm:w-auto" data-testid="button-final-cta">
                        Book a Call with Ryne <ArrowRight className="w-5 h-5" />
                      </CtaButton>
                      <p className="text-[#9CA3AF]/60 text-xs">No commitment. No sales pressure. You keep the roadmap either way.</p>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-[#1F1F23]">
                      {["$30K guaranteed in 90 days", "Month-to-month only", "You own everything we build"].map(t => (
                        <span key={t} className="flex items-center gap-1.5 text-xs text-[#9CA3AF] font-medium">
                          <span className="w-4 h-4 rounded-full bg-[#1F62FF]/15 flex items-center justify-center flex-shrink-0">
                            <Check className="w-2.5 h-2.5 text-[#1F62FF]" />
                          </span>
                          {t}
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
      <footer className="border-t border-[#1F1F23] bg-[#0A0A0B] py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
            <div className="flex flex-col gap-4 max-w-xs">
              <JobsDoneLogo />
              <p className="text-[#9CA3AF] text-sm leading-relaxed">Your embedded automation team.</p>
              <div className="flex gap-4">
                <a href="#" className="text-white/20 hover:text-[#1F62FF] transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="text-white/20 hover:text-[#1F62FF] transition-colors"><Youtube className="w-5 h-5" /></a>
                <a href="#" className="text-white/20 hover:text-[#1F62FF] transition-colors"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-10 text-sm">
              <div>
                <p className="text-[#FAFAFA] font-semibold mb-3">Services</p>
                {["CRM Infrastructure","Lead Capture","Lead Nurture","Transcript Analysis","Client Onboarding"].map(l => (
                  <p key={l} className="text-[#9CA3AF] hover:text-[#FAFAFA] cursor-pointer mb-1.5 transition-colors">{l}</p>
                ))}
              </div>
              <div>
                <p className="text-[#FAFAFA] font-semibold mb-3">Industries</p>
                {["Marketing Agencies","Home Service","Finance Firms","Professional Services"].map(l => (
                  <p key={l} className="text-[#9CA3AF] hover:text-[#FAFAFA] cursor-pointer mb-1.5 transition-colors">{l}</p>
                ))}
              </div>
              <div>
                <p className="text-[#FAFAFA] font-semibold mb-3">Company</p>
                <Link href="/privacy" className="block text-[#9CA3AF] hover:text-[#FAFAFA] mb-1.5 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="block text-[#9CA3AF] hover:text-[#FAFAFA] mb-1.5 transition-colors">Terms of Service</Link>
                <a href="mailto:support@jobsdonelabs.ai" className="block text-[#9CA3AF] hover:text-[#FAFAFA] mb-1.5 transition-colors">Contact</a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#1F1F23] pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-[#9CA3AF]">
            <span>© {new Date().getFullYear()} JobsDone Labs. All rights reserved.</span>
            <span>support@jobsdonelabs.ai</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
