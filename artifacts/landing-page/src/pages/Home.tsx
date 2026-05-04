import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  FlaskConical,
  CheckCircle2,
  Shield,
  Play,
  Linkedin,
  Youtube,
  Twitter,
} from "lucide-react";

/* ─────────────────────────────────────────────── */
/*  Logo                                           */
/* ─────────────────────────────────────────────── */
function JobsDoneLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
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
          <span className={`font-black ${s.text} text-white tracking-tight`}>JOBS</span>
          <span className={`font-black ${s.text} text-[#1F62FF] tracking-tight`}>DONE</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="flex-1 h-px bg-[#1F62FF]/40" />
          <span className={`${s.labs} font-semibold text-white/40 tracking-[0.18em] uppercase`}>Labs</span>
          <span className="flex-1 h-px bg-[#1F62FF]/40" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  Workflow Card (hero right)                     */
/* ─────────────────────────────────────────────── */
function WorkflowCard() {
  return (
    <div className="bg-[#0C1525] border border-[#182844] rounded-2xl p-5 w-full shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-white/30 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-white/30 inline-block" />
          Live Automation System
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          Active
        </span>
      </div>

      {/* Step 1 */}
      <div className="bg-[#0a1628] border border-[#182844] rounded-xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#1F62FF]/15 rounded-lg flex items-center justify-center flex-shrink-0 text-base">📋</div>
          <div>
            <p className="font-semibold text-white text-sm leading-none mb-0.5">Lead Capture</p>
            <p className="text-white/30 text-xs">New inquiry received</p>
          </div>
        </div>
        <span className="text-xs font-medium text-[#1F62FF] bg-[#1F62FF]/10 px-2.5 py-1 rounded-md border border-[#1F62FF]/20 whitespace-nowrap">Triggered</span>
      </div>

      <div className="flex justify-center my-1.5">
        <div className="w-px h-5 border-l-2 border-dashed border-white/10" />
      </div>

      {/* Step 2 */}
      <div className="bg-[#0a1628] border border-[#182844] rounded-xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#1F62FF]/15 rounded-lg flex items-center justify-center flex-shrink-0 text-base">🤖</div>
          <div>
            <p className="font-semibold text-white text-sm leading-none mb-0.5">AI Qualification</p>
            <p className="text-white/30 text-xs">Tagged, scored, enriched</p>
          </div>
        </div>
        <span className="text-xs font-medium text-white/40 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 whitespace-nowrap">→ Processing</span>
      </div>

      <div className="flex justify-center my-1.5">
        <div className="w-px h-5 border-l-2 border-dashed border-white/10" />
      </div>

      {/* Step 3 — parallel */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-[#0a1628] border border-[#182844] rounded-xl p-3 flex items-start gap-2">
          <div className="w-7 h-7 bg-[#1F62FF]/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">📧</div>
          <div>
            <p className="font-semibold text-white text-xs leading-none mb-0.5">Email Nurture</p>
            <p className="text-white/30 text-[11px]">Follow-up sent</p>
          </div>
        </div>
        <div className="bg-[#0a1628] border border-[#182844] rounded-xl p-3 flex items-start gap-2">
          <div className="w-7 h-7 bg-amber-400/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">🔔</div>
          <div>
            <p className="font-semibold text-white text-xs leading-none mb-0.5">Team Alert</p>
            <p className="text-white/30 text-[11px]">Sales notified</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-1.5">
        <div className="w-px h-5 border-l-2 border-dashed border-white/10" />
      </div>

      {/* Step 4 */}
      <div className="bg-[#0a1628] border border-[#182844] rounded-xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-emerald-400/10 rounded-lg flex items-center justify-center flex-shrink-0 text-base">🚀</div>
          <div>
            <p className="font-semibold text-white text-sm leading-none mb-0.5">Client Onboarding</p>
            <p className="text-white/30 text-xs">Resources created automatically</p>
          </div>
        </div>
        <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md border border-emerald-400/20">Complete</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/[0.06]">
        <div className="text-center">
          <p className="text-xl font-black text-[#1F62FF]">12h</p>
          <p className="text-xs text-white/30">Saved weekly</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-black text-[#1F62FF]">0</p>
          <p className="text-xs text-white/30">Manual steps</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-black text-[#1F62FF]">24/7</p>
          <p className="text-xs text-white/30">Always running</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  Video Player placeholder                       */
/* ─────────────────────────────────────────────── */
function VideoPlayer({ label }: { label?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="w-full">
      <div
        className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer ring-1 ring-white/10 shadow-[0_0_60px_rgba(31,98,255,0.25)]"
        style={{ background: "linear-gradient(135deg,#0a1628 0%,#0f1f3d 100%)" }}
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
            {/* subtle grid pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "linear-gradient(rgba(31,98,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(31,98,255,0.3) 1px,transparent 1px)",
              backgroundSize: "40px 40px"
            }} />
            {/* glow center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="group flex items-center justify-center w-20 h-20 rounded-full bg-[#1F62FF] shadow-[0_0_40px_rgba(31,98,255,0.6)] hover:scale-110 transition-transform duration-200">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </div>
            {/* label */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white/70 text-xs">▶ Placeholder — swap in your real video</p>
            </div>
          </>
        )}
      </div>
      {label && <p className="text-center text-white/40 text-sm mt-3">{label}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  Data                                           */
/* ─────────────────────────────────────────────── */
const trustLogos = ["Apollo.io","HubSpot","Make.com","Airtable","Slack","ClickUp","Zapier","ActiveCampaign"];

const industries = [
  {
    icon: "📢",
    title: "Marketing Agencies",
    desc: "Automate client onboarding, CRM management, lead nurture, and sales call transcriptions — so your team delivers faster without growing headcount.",
    tags: ["Onboarding in minutes","Zero manual CRM entry","Faster client delivery"],
  },
  {
    icon: "🏠",
    title: "Home Service Businesses",
    desc: "From lead capture to follow-up to scheduling — stop losing jobs to missed calls and slow responses. Your automated ops system works while your crews are in the field.",
    tags: ["Instant lead response","Automated follow-ups","Job tracking & reports"],
  },
  {
    icon: "💼",
    title: "Finance & Professional Services",
    desc: "Streamline client intake, compliance documentation, appointment nurture, and reporting. Show measurable ROI to clients while running a leaner back office.",
    tags: ["Client intake automated","No-show reduction","Reporting automated"],
  },
];

const services = [
  {
    num: "01",
    title: "CRM Infrastructure",
    desc: "A solid CRM is the backbone of every scalable business. We build it right — so every lead is automatically structured, tagged, and scored without anyone lifting a finger.",
    tags: ["Auto lead scoring","Consistent naming conventions","Pipeline automation"],
  },
  {
    num: "02",
    title: "Lead Capture",
    desc: "Every inquiry from every channel flows automatically into your CRM. No more manual copy-paste, no more lost leads from slow response times.",
    tags: ["Omni-channel capture","Instant qualification","Zero data entry errors"],
  },
  {
    num: "03",
    title: "Lead Nurture",
    desc: "Prospects who don't book immediately get systematically engaged with personalized touchpoints — dramatically reducing no-shows and building trust before the call.",
    tags: ["Reduced no-shows","Personalized sequences","Better-qualified leads"],
  },
  {
    num: "04",
    title: "Transcript Analysis",
    desc: "Every sales call is automatically recorded, transcribed, and analyzed. Get strategic insights, action items, and performance data without reviewing a single recording yourself.",
    tags: ["Auto transcription","AI insights","Sales performance data"],
  },
  {
    num: "05",
    title: "Client Onboarding",
    desc: "From signed contract to full access — automated. Resources created, comms sent, permissions set. Your clients hit the ground running the moment ink dries.",
    tags: ["Instant resource creation","Consistent experience","Zero missed steps"],
  },
];

const steps = [
  { num: "1", title: "Free Audit Call", sub: "Day 1", desc: "We map your business, find the biggest bottlenecks eating your time, and build a custom automation roadmap." },
  { num: "2", title: "Onboarding & Setup", sub: "Week 1", desc: "Your dedicated automation engineer learns your systems, tools, and workflows. We're in your Slack within 48 hours." },
  { num: "3", title: "Weekly Builds", sub: "Ongoing", desc: "Each week we ship new automations based on your priorities. Weekly strategy calls keep everything aligned." },
  { num: "4", title: "24/7 Maintenance", sub: "Always On", desc: "We monitor, fix, and optimize every system we build. Under 24-hour response to any issue, guaranteed." },
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
    <div className="border-b border-white/10 last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-white font-semibold text-base leading-snug group-hover:text-[#1F62FF] transition-colors">{q}</span>
        <ChevronDown className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#1F62FF]" : ""}`} />
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
            <p className="pb-5 text-white/50 leading-relaxed text-sm">{a}</p>
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
          className="bg-[#0C1525] border border-[#182844] rounded-2xl p-8 text-center"
        >
          <div className="flex justify-center gap-1 mb-5">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
          </div>
          <p className="text-white/80 text-lg leading-relaxed mb-6 italic">"{r.quote}"</p>
          <p className="font-bold text-white">{r.name}</p>
          <p className="text-white/40 text-sm">{r.company}</p>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-3 mt-6">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#1F62FF] hover:text-[#1F62FF] text-white/40 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        {reviews.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === idx ? "bg-[#1F62FF] w-6" : "bg-white/20"}`} />
        ))}
        <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#1F62FF] hover:text-[#1F62FF] text-white/40 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  Section wrapper (fade-in on scroll)            */
/* ─────────────────────────────────────────────── */
function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[#1F62FF] text-xs font-semibold uppercase tracking-widest mb-3">{children}</p>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{children}</h2>;
}

const CALENDLY = "https://calendly.com/ryne-bandolik";

/* ─────────────────────────────────────────────── */
/*  Page                                           */
/* ─────────────────────────────────────────────── */
export default function Home() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen font-sans overflow-x-hidden text-white" style={{ background: "#070D18" }}>

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06]" style={{ background: "rgba(7,13,24,0.92)", backdropFilter: "blur(14px)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" data-testid="link-logo"><JobsDoneLogo /></Link>
          <nav className="hidden md:flex items-center gap-8">
            {[["Services","services"],["Industries","industries"],["Results","results"],["FAQ","faq"]].map(([label,id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-white/60 hover:text-white text-sm font-medium transition-colors">{label}</button>
            ))}
          </nav>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
            <button className="bg-[#1F62FF] hover:bg-[#1a54e0] text-white text-sm font-semibold px-5 h-9 rounded-lg transition-all shadow-[0_0_20px_rgba(31,98,255,0.35)]" data-testid="button-nav-cta">
              Book a Call
            </button>
          </a>
        </div>
      </header>

      <main>

        {/* ── HERO ── */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 min-w-0"
            >
              <div className="inline-flex items-center gap-2 text-white/50 text-xs font-medium mb-7 border border-white/10 rounded-full px-4 py-1.5">
                <span>For Agencies &amp; Service Businesses</span>
                <span className="w-1 h-1 rounded-full bg-white/30 inline-block" />
                <span>90-Day Guarantee</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.0] mb-6">
                Stop Running<br />
                Your Business.<br />
                Let <span className="text-[#1F62FF]">Automation</span><br />
                Run It For You.
              </h1>
              <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-md">
                We build custom AI systems that cut 60–80% of manual work for marketing agencies, home service businesses, and finance firms — giving you back the time to actually grow.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  <button className="bg-[#1F62FF] hover:bg-[#1a54e0] text-white font-bold text-base px-8 h-12 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(31,98,255,0.4)]" data-testid="button-hero-primary">
                    Book a Free Audit Call <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
                <button onClick={() => scrollTo("results")} className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white text-base font-medium px-8 h-12 rounded-lg transition-all" data-testid="button-hero-results">
                  See Client Results
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-white/40 text-sm">50+ businesses automated · Avg. $30K+ saved in 90 days</p>
              </div>
            </motion.div>

            {/* Right column — workflow card */}
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
        <section className="max-w-4xl mx-auto px-6 pb-10">
          <Fade>
            <VideoPlayer label="Watch: How we save agencies $30K+ in 90 days (3 min)" />
          </Fade>
        </section>

        {/* ── LOGO STRIP ── */}
        <section className="border-y border-white/[0.06] py-8 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
          <p className="text-center text-white/30 text-xs uppercase tracking-widest font-semibold mb-6">Trusted by 7-figure agency founders &amp; business owners</p>
          <div className="relative">
            <div className="flex animate-[marquee_28s_linear_infinite] gap-16 w-max">
              {[...trustLogos,...trustLogos].map((l,i) => (
                <span key={i} className="text-white/20 font-bold text-sm tracking-wide whitespace-nowrap">{l}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section id="industries" className="py-24 max-w-6xl mx-auto px-6">
          <Fade>
            <SectionLabel>Who We Work With</SectionLabel>
            <SectionHeading>Built for businesses where time literally equals money</SectionHeading>
          </Fade>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <Fade key={ind.title} delay={i * 0.08}>
                <div className="bg-[#0C1525] border border-[#182844] rounded-2xl p-7 hover:border-[#1F62FF]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 h-full">
                  <div className="text-3xl">{ind.icon}</div>
                  <h3 className="font-bold text-white text-lg">{ind.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">{ind.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {ind.tags.map(tag => (
                      <span key={tag} className="text-[#1F62FF] text-xs font-medium bg-[#1F62FF]/10 border border-[#1F62FF]/20 px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="py-24" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <SectionLabel>What We Build</SectionLabel>
              <SectionHeading>Five core systems. Infinite hours recovered.</SectionHeading>
            </Fade>
            <div className="mt-10 flex flex-col gap-4">
              {services.map((s, i) => (
                <Fade key={s.title} delay={i * 0.06}>
                  <div className="bg-[#0C1525] border border-[#182844] rounded-2xl p-7 flex flex-col md:flex-row gap-5 hover:border-[#1F62FF]/30 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <span className="text-6xl font-black text-[#1F62FF]/15 leading-none select-none">{s.num}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-xl mb-2">{s.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-4">{s.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map(tag => (
                          <span key={tag} className="text-white/50 text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full">{tag}</span>
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
        <section className="py-24 max-w-6xl mx-auto px-6">
          <Fade>
            <SectionLabel>The Process</SectionLabel>
            <SectionHeading>Up and running in 30 days. Optimizing forever.</SectionHeading>
          </Fade>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <Fade key={s.title} delay={i * 0.08}>
                <div className="bg-[#0C1525] border border-[#182844] rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300" data-testid={`card-step-${i}`}>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-[#1F62FF]">{s.num}</span>
                    <span className="text-xs font-medium text-white/30 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">{s.sub}</span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </section>

        {/* ── GUARANTEE ── */}
        <section className="py-10 px-6">
          <Fade>
            <div className="max-w-4xl mx-auto rounded-2xl p-10 text-center relative overflow-hidden"
              style={{ background: "#0C1525", boxShadow: "0 0 0 1.5px #1F62FF, 0 0 60px rgba(31,98,255,0.25)" }}>
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: "radial-gradient(ellipse at center, #1F62FF 0%, transparent 70%)"
              }} />
              <div className="relative z-10">
                <p className="text-[#1F62FF] text-xs font-semibold uppercase tracking-widest mb-4">Our Promise</p>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  $30,000 in recovered time within 90 days — guaranteed.
                </h2>
                <p className="text-white/50 text-lg mb-8 max-w-2xl mx-auto">
                  If we don't deliver measurable ROI in your first 90 days, we keep working until we do. No extra charge. No excuses.
                </p>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  <button className="bg-[#1F62FF] hover:bg-[#1a54e0] text-white font-bold text-base px-10 h-12 rounded-lg transition-all inline-flex items-center gap-2 shadow-[0_0_30px_rgba(31,98,255,0.4)]" data-testid="button-guarantee-cta">
                    Claim Your Free Audit Call <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
                <p className="text-white/30 text-xs mt-4">Month-to-month. No long-term contracts. You own everything we build.</p>
              </div>
            </div>
          </Fade>
        </section>

        {/* ── COMMUNITY ── */}
        <section className="py-24 max-w-6xl mx-auto px-6">
          <Fade>
            <SectionLabel>Community</SectionLabel>
            <SectionHeading>Ready to bring back hours of time? Join our community.</SectionHeading>
          </Fade>
          <div className="mt-10 grid md:grid-cols-2 gap-8 items-center">
            <Fade delay={0.08}>
              <div className="flex flex-col gap-5">
                <p className="text-white/50 text-lg leading-relaxed">
                  Join founders and operators inside our community — breakdowns, templates, and live Q&amp;A on automation that actually ships.
                </p>
                <div>
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                    <button className="border border-[#1F62FF] text-[#1F62FF] hover:bg-[#1F62FF] hover:text-white font-semibold px-6 h-10 rounded-lg transition-all text-sm">
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
        </section>

        {/* ── RESULTS (video testimonials) ── */}
        <section id="results" className="py-24" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="max-w-6xl mx-auto px-6">
            <Fade>
              <SectionLabel>Client Results</SectionLabel>
              <SectionHeading>Real founders. Real results. All on camera.</SectionHeading>
              <p className="text-white/40 mt-3 mb-10">10 agency owners and business founders share exactly what changed after working with us.</p>
            </Fade>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <Fade key={t.name} delay={i * 0.05}>
                  <div className="bg-[#0C1525] border border-[#182844] rounded-2xl overflow-hidden hover:border-[#1F62FF]/30 hover:-translate-y-1 transition-all duration-300" data-testid={`card-testimonial-${i}`}>
                    {/* fake video thumbnail */}
                    <div className="aspect-video relative cursor-pointer group"
                      style={{ background: "linear-gradient(135deg,#0a1628,#0f1f3d)" }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#1F62FF]/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(31,98,255,0.4)]">
                          <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="font-bold text-white text-sm">{t.name}</p>
                      <p className="text-[#1F62FF] text-xs font-medium">{t.company}</p>
                      <p className="text-white/40 text-xs mb-3">{t.role}</p>
                      <p className="text-white/60 text-sm italic">"{t.quote}"</p>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* ── WRITTEN REVIEWS ── */}
        <section className="py-24 max-w-6xl mx-auto px-6">
          <Fade>
            <SectionLabel>Reviews</SectionLabel>
            <SectionHeading className="mb-10">What clients say</SectionHeading>
          </Fade>
          <Fade delay={0.1}>
            <div className="mt-10">
              <ReviewsCarousel />
            </div>
          </Fade>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-24" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="max-w-3xl mx-auto px-6">
            <Fade>
              <SectionLabel>FAQ</SectionLabel>
              <SectionHeading>Common questions</SectionHeading>
            </Fade>
            <Fade delay={0.1}>
              <div className="mt-10">
                {faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
              </div>
            </Fade>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-28 text-center px-6" style={{ background: "radial-gradient(ellipse at center, rgba(31,98,255,0.12) 0%, transparent 70%), #070D18" }}>
          <Fade>
            <p className="text-[#1F62FF] text-xs font-semibold uppercase tracking-widest mb-4">Ready to get your time back?</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5 leading-tight">
              Book your free automation audit call
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
              In 45 minutes, we'll map your biggest bottlenecks and hand you a custom roadmap — whether you hire us or not.
            </p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              <button className="bg-[#1F62FF] hover:bg-[#1a54e0] text-white font-black text-lg px-12 h-14 rounded-xl transition-all inline-flex items-center gap-2 shadow-[0_0_40px_rgba(31,98,255,0.45)]" data-testid="button-final-cta">
                Book a Call <ArrowRight className="w-5 h-5" />
              </button>
            </a>
            <p className="text-white/30 text-xs mt-5">No commitment. No sales pressure. Just a clear roadmap for your business.</p>
          </Fade>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] py-14" style={{ background: "#04090F" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
            <div className="flex flex-col gap-4 max-w-xs">
              <JobsDoneLogo />
              <p className="text-white/40 text-sm leading-relaxed">Your embedded automation team.</p>
              <div className="flex gap-4">
                <a href="#" className="text-white/30 hover:text-[#1F62FF] transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="text-white/30 hover:text-[#1F62FF] transition-colors"><Youtube className="w-5 h-5" /></a>
                <a href="#" className="text-white/30 hover:text-[#1F62FF] transition-colors"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-10 text-sm">
              <div>
                <p className="text-white/60 font-semibold mb-3">Services</p>
                {["CRM Infrastructure","Lead Capture","Lead Nurture","Transcript Analysis","Client Onboarding"].map(l => (
                  <p key={l} className="text-white/30 hover:text-white/60 cursor-pointer mb-1.5 transition-colors">{l}</p>
                ))}
              </div>
              <div>
                <p className="text-white/60 font-semibold mb-3">Industries</p>
                {["Marketing Agencies","Home Service","Finance Firms","Professional Services"].map(l => (
                  <p key={l} className="text-white/30 hover:text-white/60 cursor-pointer mb-1.5 transition-colors">{l}</p>
                ))}
              </div>
              <div>
                <p className="text-white/60 font-semibold mb-3">Company</p>
                <Link href="/privacy" className="block text-white/30 hover:text-white/60 mb-1.5 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="block text-white/30 hover:text-white/60 mb-1.5 transition-colors">Terms of Service</Link>
                <a href={`mailto:support@jobsdonelabs.ai`} className="block text-white/30 hover:text-white/60 mb-1.5 transition-colors">Contact</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-white/20">
            <span>© {new Date().getFullYear()} JobsDone Labs. All rights reserved.</span>
            <span>support@jobsdonelabs.ai</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
