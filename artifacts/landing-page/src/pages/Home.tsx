import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Star,
  FlaskConical,
  CheckCircle2,
  Shield,
  Search,
  Rocket,
  MessageSquare,
  BarChart3,
  Target,
  Calendar,
  Mail,
  Linkedin,
  Zap,
} from "lucide-react";

/* ── Logo (light-mode version) ── */
function JobsDoneLogo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <FlaskConical className="w-7 h-7 text-[#1F62FF] flex-shrink-0" />
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline">
          <span className={`font-black text-lg tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>JOBS</span>
          <span className="font-black text-lg text-[#1F62FF] tracking-tight">DONE</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="flex-1 h-px bg-[#1F62FF]/40" />
          <span className={`text-[9px] font-semibold tracking-[0.2em] uppercase ${dark ? "text-white/50" : "text-slate-400"}`}>Labs</span>
          <span className="flex-1 h-px bg-[#1F62FF]/40" />
        </div>
      </div>
    </div>
  );
}

/* ── Workflow card (hero right) ── */
function WorkflowCard() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] border border-slate-100 p-5 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
          Live Outreach System
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          Active
        </span>
      </div>

      {/* Step 1 */}
      <div className="bg-slate-50 rounded-xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Target className="w-4 h-4 text-[#1F62FF]" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm leading-none mb-0.5">Lead List Built</p>
            <p className="text-slate-400 text-xs">5,000+ contacts verified</p>
          </div>
        </div>
        <span className="text-xs font-medium text-[#1F62FF] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 whitespace-nowrap">Triggered</span>
      </div>

      {/* Connector */}
      <div className="flex justify-center my-1.5">
        <div className="w-px h-5 border-l-2 border-dashed border-slate-200" />
      </div>

      {/* Step 2 */}
      <div className="bg-slate-50 rounded-xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Mail className="w-4 h-4 text-[#1F62FF]" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm leading-none mb-0.5">Campaign Launched</p>
            <p className="text-slate-400 text-xs">10,000 emails deployed</p>
          </div>
        </div>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 whitespace-nowrap">→ Processing</span>
      </div>

      {/* Connector */}
      <div className="flex justify-center my-1.5">
        <div className="w-px h-5 border-l-2 border-dashed border-slate-200" />
      </div>

      {/* Step 3 — two parallel */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-50 rounded-xl p-3 flex items-start gap-2">
          <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <MessageSquare className="w-3.5 h-3.5 text-[#1F62FF]" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-xs leading-none mb-0.5">Reply Received</p>
            <p className="text-slate-400 text-[11px]">Lead responds</p>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 flex items-start gap-2">
          <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-xs leading-none mb-0.5">Call Booked</p>
            <p className="text-slate-400 text-[11px]">Cal. notified</p>
          </div>
        </div>
      </div>

      {/* Connector */}
      <div className="flex justify-center my-1.5">
        <div className="w-px h-5 border-l-2 border-dashed border-slate-200" />
      </div>

      {/* Step 4 */}
      <div className="bg-slate-50 rounded-xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm leading-none mb-0.5">Qualified Call Confirmed</p>
            <p className="text-slate-400 text-xs">Added to your calendar</p>
          </div>
        </div>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">Complete</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100">
        <div className="text-center">
          <p className="text-xl font-black text-[#1F62FF]">10+</p>
          <p className="text-xs text-slate-400">Calls/month</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-black text-[#1F62FF]">0</p>
          <p className="text-xs text-slate-400">Manual steps</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-black text-[#1F62FF]">60d</p>
          <p className="text-xs text-slate-400">Guaranteed</p>
        </div>
      </div>
    </div>
  );
}

/* ── Data ── */
const faqs = [
  { q: "Why should I trust you to deliver these results?", a: "We've booked thousands of qualified sales calls for B2B service providers across coaching, consulting, and agency niches. Every client gets a dedicated campaign manager, weekly reporting, and our ironclad guarantee — if we don't hit your target, we keep working for free." },
  { q: "How do I know this will work for my specific business?", a: "During your free strategy call, we'll audit your current lead generation, map your ICP, and build a custom campaign blueprint. If we don't think we can get you results, we'll tell you upfront — we only take on clients we're confident we can help." },
  { q: "What if I'm not tech-savvy?", a: "You don't need to be. We handle 100% of the technical setup — domains, email inboxes, LinkedIn automation, lead lists, copy, and response management. All you do is show up to the booked calls." },
  { q: "How long does it take to see results?", a: "Most clients see their first qualified calls booked within 30 days. We guarantee 10 calls in 60 days. Setup takes 1–2 weeks, campaigns launch in week 3, and calls typically start rolling in shortly after." },
  { q: "What counts as a 'qualified call'?", a: "A qualified call is a booked meeting with a prospect who matches your ideal client profile — right industry, right size, right pain point, and has expressed genuine interest in your service. Cold tire-kickers don't count." },
  { q: "Can I cancel anytime?", a: "Yes. There are no long-term lock-ins. We work on a month-to-month basis after an initial setup period. If you're not happy, you can cancel with 30 days' notice." },
  { q: "Do you work with businesses in my industry?", a: "We work best with B2B service providers — coaches, consultants, agencies, and professional services with a high average client value ($3k+ per engagement). If you're B2C or have a very broad target market, we may not be the right fit." },
  { q: "What's the catch?", a: "There isn't one. We take on a limited number of clients each month to maintain quality. If we can't get you results, we don't get paid beyond setup. Our success is directly tied to yours." },
];

const caseStudies = [
  { name: "James R.", title: "B2B SaaS Consultant", before: "Booking 2–3 calls/month through referrals only", after: "Now booking 10–12 calls/month consistently", revenue: "$220,000 in new revenue in 6 months", roi: "14.2x ROI" },
  { name: "Priya M.", title: "Executive Coach", before: "Relying on LinkedIn DMs manually — inconsistent", after: "6–8 qualified discovery calls booked every week", revenue: "$95,000 added to pipeline in 90 days", roi: "9.8x ROI" },
  { name: "Tom K.", title: "Agency Owner", before: "Spending 15 hrs/week on cold outreach personally", after: "Fully automated — zero time spent on prospecting", revenue: "$180,000 in new contracts signed in 4 months", roi: "11.6x ROI" },
];

const services = [
  {
    icon: Mail,
    title: "Cold Email Infrastructure",
    desc: "We build and manage your entire cold email system — 5–10 domains, 10–20 warmed inboxes, verified lead lists, and compelling copy — all done for you.",
    points: ["5,000+ verified contacts per campaign", "10,000+ emails deployed per month", "Full domain & inbox management"],
  },
  {
    icon: Linkedin,
    title: "LinkedIn Outreach",
    desc: "We deploy targeted LinkedIn connection campaigns using your profile or a dedicated SDR account, reaching decision-makers with personalized sequences.",
    points: ["500 connection requests per month", "Multi-step message sequences", "ICP-matched prospect targeting"],
  },
  {
    icon: Calendar,
    title: "Response Management",
    desc: "We monitor all replies 24/7, qualify every lead against your ICP, handle objections, and book only the best-fit prospects directly into your calendar.",
    points: ["24/7 inbox monitoring & reply handling", "ICP qualification before booking", "Calls land directly in your calendar"],
  },
];

const steps = [
  { num: "01", icon: Search, title: "Strategy & Setup", sub: "Week 1–2", desc: "We audit your ICP, build your domain infrastructure, warm inboxes, and compile a targeted list of 5,000+ verified prospects." },
  { num: "02", icon: Rocket, title: "Campaign Launch", sub: "Week 3–4", desc: "We write all copy and launch cold email and LinkedIn campaigns simultaneously — 10,000+ emails and 500 connection requests per month." },
  { num: "03", icon: MessageSquare, title: "Response Management", sub: "Ongoing", desc: "We handle every reply 24/7, qualify leads, handle objections, and book calls directly into your calendar." },
  { num: "04", icon: BarChart3, title: "Optimize & Scale", sub: "Month 2+", desc: "We A/B test messaging, refresh lead lists, monitor deliverability, and send you weekly performance reports." },
];

const trustLogos = ["Apollo.io", "Instantly", "Lemlist", "HubSpot", "LinkedIn", "Clay", "Smartlead", "Salesforce"];

const avatarColors = ["bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500"];
const avatarInitials = ["ES", "DH", "MZ", "RK"];

/* ── FAQ Item ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        onClick={() => setOpen((o) => !o)}
        data-testid={`faq-toggle-${q.slice(0, 20).replace(/\s/g, "-")}`}
      >
        <span className="text-slate-800 font-semibold text-base leading-snug group-hover:text-[#1F62FF] transition-colors">{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#1F62FF]" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-500 leading-relaxed text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Page ── */
export default function Home() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "Results", id: "results" },
    { label: "How It Works", id: "how-it-works" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: "linear-gradient(160deg, #eef6ff 0%, #ffffff 40%, #f0f8ff 100%)" }}>

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" data-testid="link-logo">
            <JobsDoneLogo />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <a href="https://calendly.com/ryne-bandolik" target="_blank" rel="noopener noreferrer">
            <button
              className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 h-9 rounded-lg transition-all flex items-center gap-1.5"
              data-testid="button-book-call-nav"
            >
              Book a Call <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </a>
        </div>
      </header>

      <main>

        {/* ── HERO ── */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 min-w-0"
            >
              {/* Badge pills */}
              <div className="flex flex-wrap gap-2 mb-7">
                <span className="border border-slate-300 text-slate-600 text-xs font-medium px-3.5 py-1.5 rounded-full">For B2B Service Businesses</span>
                <span className="border border-slate-300 text-slate-600 text-xs font-medium px-3.5 py-1.5 rounded-full">60-Day Guarantee</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.0] tracking-tight mb-6">
                Stop Chasing<br />
                Leads. Let<br />
                <span className="text-[#1F62FF]">Outreach</span><br />
                Run For You.
              </h1>

              {/* Body */}
              <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-md">
                JobsDone Labs deploys done-for-you cold email &amp; LinkedIn outreach that books 10+ qualified sales calls in 60 days — giving you back the time to actually close.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <a href="https://calendly.com/ryne-bandolik" target="_blank" rel="noopener noreferrer">
                  <button
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-base px-7 h-12 rounded-lg transition-all flex items-center gap-2"
                    data-testid="button-book-call-hero"
                  >
                    Book a Free Strategy Call <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
                <button
                  onClick={() => scrollTo("results")}
                  className="border border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-800 text-base font-medium px-7 h-12 rounded-lg transition-all"
                  data-testid="button-see-offer"
                >
                  See Client Results
                </button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {avatarInitials.map((init, i) => (
                    <div key={i} className={`w-9 h-9 rounded-full ${avatarColors[i]} border-2 border-white flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {init}
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-sm">
                  <strong className="text-slate-800">500+ businesses</strong> served. Avg. 10+ calls booked in 60 days.
                </p>
              </div>
            </motion.div>

            {/* Right column — workflow card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex-1 min-w-0 w-full lg:max-w-[480px]"
            >
              <WorkflowCard />
            </motion.div>

          </div>
        </section>

        {/* ── TRUST LOGOS ── */}
        <section className="border-y border-slate-100 bg-white/70 py-7 overflow-hidden">
          <p className="text-center text-slate-400 text-xs uppercase tracking-widest font-semibold mb-5">Trusted by teams using</p>
          <div className="relative">
            <div className="flex animate-[marquee_28s_linear_infinite] gap-14 w-max">
              {[...trustLogos, ...trustLogos].map((logo, i) => (
                <span key={i} className="text-slate-300 font-bold text-sm tracking-wide whitespace-nowrap hover:text-slate-500 transition-colors cursor-default">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="py-24 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-12"
          >
            <p className="text-[#1F62FF] text-xs uppercase tracking-widest font-semibold mb-2">What We Do</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Everything done for you.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                  <s.icon className="w-5 h-5 text-[#1F62FF]" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2">
                  {s.points.map(pt => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-[#1F62FF] flex-shrink-0 mt-0.5" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section id="results" className="bg-slate-900 py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mb-12"
            >
              <p className="text-[#1F62FF] text-xs uppercase tracking-widest font-semibold mb-2">Client Results</p>
              <h2 className="text-4xl font-black text-white tracking-tight">Real results from real clients.</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {caseStudies.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col gap-5"
                  data-testid={`card-case-study-${i}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1F62FF]/20 border border-[#1F62FF]/30 flex items-center justify-center text-[#1F62FF] font-bold text-sm flex-shrink-0">
                      {c.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{c.name}</p>
                      <p className="text-slate-400 text-xs">{c.title}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-400"><span className="text-slate-500 font-medium">Before: </span>{c.before}</p>
                    <p className="text-slate-200"><span className="text-slate-300 font-medium">After: </span>{c.after}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                    <span className="text-emerald-400 font-semibold text-sm">{c.revenue}</span>
                    <span className="text-[#1F62FF] font-bold text-xs bg-[#1F62FF]/10 px-3 py-1 rounded-full border border-[#1F62FF]/20">{c.roi}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="py-24 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-12"
          >
            <p className="text-[#1F62FF] text-xs uppercase tracking-widest font-semibold mb-2">The Process</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">How We Get You 10 Qualified Calls in 60 Days.</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
                data-testid={`card-step-${i}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-[#1F62FF]" />
                  </div>
                  <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">{s.sub}</span>
                </div>
                <p className="text-[#1F62FF] text-xs font-black mb-1">{s.num}</p>
                <h3 className="font-bold text-slate-900 text-base mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── GUARANTEE ── */}
        <section className="bg-[#1F62FF] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="flex-1"
              >
                <p className="text-blue-200 text-xs uppercase tracking-widest font-semibold mb-3">Zero Risk</p>
                <h2 className="text-4xl font-black text-white tracking-tight mb-5">Our Iron-Clad 60-Day Guarantee.</h2>
                <p className="text-blue-100 leading-relaxed mb-4 text-lg">
                  We guarantee you <strong className="text-white">10 qualified sales calls</strong> booked in your first 60 days — or we work for free until we hit that number.
                </p>
                <p className="text-blue-200 leading-relaxed mb-8">
                  If we don't deliver, we waive your monthly fee and keep working. You have nothing to lose.
                </p>
                <div className="flex items-center gap-4">
                  <img src="/ryne.png" alt="Ryne Bandolik" className="w-12 h-12 rounded-full object-cover object-top border-2 border-white/30 flex-shrink-0" />
                  <a href="https://calendly.com/ryne-bandolik" target="_blank" rel="noopener noreferrer">
                    <button
                      className="bg-white text-[#1F62FF] font-bold text-base px-7 h-12 rounded-lg hover:bg-blue-50 transition-all"
                      data-testid="button-book-call-guarantee"
                    >
                      Book a Free Strategy Call
                    </button>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="flex-1 w-full"
              >
                <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center backdrop-blur-sm">
                  <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-3xl font-black text-white mb-2">10 Calls in 60 Days</p>
                  <p className="text-blue-200 text-sm mb-6">or we work for free until we do</p>
                  <div className="space-y-3">
                    {["No extra charge if we miss the target", "Dedicated campaign manager throughout", "Weekly performance reports included"].map(item => (
                      <div key={item} className="flex items-center gap-3 text-sm text-blue-100">
                        <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-24 max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="lg:w-72 flex-shrink-0"
            >
              <p className="text-[#1F62FF] text-xs uppercase tracking-widest font-semibold mb-3">FAQ</p>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-5">Frequently Asked Questions.</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Everything you need to know before booking your free strategy call.
              </p>
              <a href="https://calendly.com/ryne-bandolik" target="_blank" rel="noopener noreferrer">
                <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 h-10 rounded-lg transition-all flex items-center gap-1.5">
                  Book a Strategy Call <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex-1"
            >
              {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </motion.div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="bg-slate-900 py-24">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#1F62FF] text-xs uppercase tracking-widest font-semibold mb-4">Ready to grow?</p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5 leading-[1.05]">
                Book your free strategy call today.
              </h2>
              <p className="text-slate-400 text-lg mb-10">
                We'll show you exactly how we'd get you 10 calls in 60 days — or you don't pay.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <img src="/ryne.png" alt="Ryne Bandolik" className="w-14 h-14 rounded-full object-cover object-top border-2 border-slate-600 flex-shrink-0" />
                <div className="flex flex-col items-center sm:items-start gap-1">
                  <a href="https://calendly.com/ryne-bandolik" target="_blank" rel="noopener noreferrer">
                    <button
                      className="bg-white hover:bg-slate-100 text-slate-900 font-black text-lg px-10 h-14 rounded-lg transition-all flex items-center gap-2"
                      data-testid="button-book-call-final"
                    >
                      Book Your Free Strategy Call <ArrowRight className="w-5 h-5" />
                    </button>
                  </a>
                  <span className="text-slate-500 text-xs">Talk directly with Ryne</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 border-t border-slate-800 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5 text-sm">
          <div className="flex items-center gap-4">
            <JobsDoneLogo dark />
            <div className="flex items-center gap-2">
              <img src="/ryne.png" alt="Ryne Bandolik" className="w-6 h-6 rounded-full object-cover object-top border border-slate-600" />
              <span className="text-slate-500 text-xs">Ryne Bandolik, Founder</span>
            </div>
          </div>
          <span className="text-slate-500">support@jobsdonelabs.ai</span>
          <div className="flex items-center gap-5 text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors" data-testid="link-privacy">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors" data-testid="link-terms">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
