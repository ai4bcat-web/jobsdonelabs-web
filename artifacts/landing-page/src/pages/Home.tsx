import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Search,
  Rocket,
  MessageSquare,
  BarChart3,
  Shield,
  Star,
  FlaskConical,
  CheckCircle2,
  Clock,
} from "lucide-react";

/* ── Logo ── */
function JobsDoneLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const scales = {
    sm: { flask: "w-5 h-5", jobs: "text-sm", done: "text-sm", labs: "text-[9px]", gap: "gap-1.5" },
    md: { flask: "w-8 h-8", jobs: "text-xl", done: "text-xl", labs: "text-[11px]", gap: "gap-2" },
    lg: { flask: "w-10 h-10", jobs: "text-2xl", done: "text-2xl", labs: "text-xs", gap: "gap-2.5" },
  };
  const s = scales[size];
  return (
    <div className={`flex items-center ${s.gap}`}>
      <FlaskConical className={`${s.flask} text-[#1F62FF] flex-shrink-0`} />
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-0">
          <span className={`font-black ${s.jobs} text-white tracking-tight`}>JOBS</span>
          <span className={`font-black ${s.done} text-[#1F62FF] tracking-tight`}>DONE</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="flex-1 h-px bg-[#1F62FF]/50" />
          <span className={`${s.labs} font-semibold text-white/50 tracking-[0.2em] uppercase`}>Labs</span>
          <span className="flex-1 h-px bg-[#1F62FF]/50" />
        </div>
      </div>
    </div>
  );
}

/* ── Animated starfield ── */
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.1 + 0.2,
      baseAlpha: Math.random() * 0.35 + 0.05,
      speed: Math.random() * 0.0008 + 0.0003,
      offset: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now();
      stars.forEach((star) => {
        const alpha = star.baseAlpha + Math.sin(t * star.speed + star.offset) * 0.15;
        ctx.beginPath();
        ctx.arc(star.x * canvas.width, star.y * canvas.height, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, alpha)})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
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

const steps = [
  { icon: Search, title: "Infrastructure Setup", sub: "Week 1–2", desc: "We build your entire cold email & LinkedIn infrastructure: 5–10 domains, 10–20 email inboxes, LinkedIn automation, and a lead list of 5,000+ verified contacts." },
  { icon: Rocket, title: "Campaign Launch", sub: "Week 3–4", desc: "We write all your email copy and LinkedIn messages, then launch campaigns — 10,000 emails/month and 500 LinkedIn connection requests per month." },
  { icon: MessageSquare, title: "Response Management", sub: "Ongoing", desc: "We monitor all responses 24/7, qualify leads using your ICP criteria, and book qualified calls directly into your calendar." },
  { icon: BarChart3, title: "Optimization & Scaling", sub: "Month 2+", desc: "We A/B test messaging, monitor deliverability, refresh lead lists monthly, and provide weekly performance reports." },
];

const trustLogos = ["Apollo.io", "Instantly", "Lemlist", "HubSpot", "LinkedIn", "Clay", "Smartlead", "Salesforce"];

/* ── FAQ Item ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        onClick={() => setOpen((o) => !o)}
        data-testid={`faq-toggle-${q.slice(0, 20).replace(/\s/g, "-")}`}
      >
        <span className="text-white font-semibold text-base leading-snug group-hover:text-[#1F62FF] transition-colors duration-200">{q}</span>
        <ChevronDown className={`w-5 h-5 text-white/30 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#1F62FF]" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-white/50 leading-relaxed text-sm">{a}</p>
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
    { label: "Results", id: "case-studies" },
    { label: "How It Works", id: "how-it-works" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" data-testid="link-logo">
            <JobsDoneLogo size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-white/55 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <a href="https://calendly.com/ryne-bandolik" target="_blank" rel="noopener noreferrer">
            <button
              className="border border-white/25 hover:border-white/60 text-white text-sm font-semibold px-5 h-9 rounded-lg transition-all duration-200 hover:bg-white/5"
              data-testid="button-book-call-nav"
            >
              Book a Call
            </button>
          </a>
        </div>
      </header>

      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-black">
          <Starfield />

          {/* Abstract blurred shapes */}
          <div className="absolute top-1/4 left-1/5 w-[500px] h-[120px] bg-white/[0.025] rounded-full blur-3xl -rotate-12 pointer-events-none" />
          <div className="absolute top-2/5 right-1/4 w-[300px] h-[80px] bg-white/[0.018] rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[100px] bg-[#1F62FF]/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 pb-24 pt-40 w-full">
            {/* Stats */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-white/35 text-sm mb-8 tracking-wide"
            >
              500+ B2B clients served &nbsp;·&nbsp; 4.9/5 avg rating
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.02] tracking-tight mb-5 max-w-4xl"
            >
              We Book 10 Qualified<br />
              <span className="text-[#1F62FF]">Sales Calls in 60 Days</span>
            </motion.h1>

            {/* Sub lines */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
            >
              <p className="text-white/50 text-xl md:text-2xl mb-1.5">with done-for-you cold email &amp; LinkedIn outreach</p>
              <p className="text-white/30 text-lg md:text-xl mb-10">guaranteed — or we work for free until we do</p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <a href="https://calendly.com/ryne-bandolik" target="_blank" rel="noopener noreferrer">
                <button
                  className="bg-white text-black font-bold text-base px-7 h-12 rounded-lg hover:bg-white/90 active:scale-95 transition-all duration-200 flex items-center gap-2"
                  data-testid="button-book-call-hero"
                >
                  Book a Free Strategy Call <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <button
                onClick={() => scrollTo("case-studies")}
                className="border border-white/20 text-white/70 hover:text-white hover:border-white/45 text-base font-medium px-7 h-12 rounded-lg transition-all duration-200"
                data-testid="button-see-offer"
              >
                View Case Studies
              </button>
            </motion.div>

            {/* Trust marks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-6 text-white/30 text-sm"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Ironclad guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>24/7 response management</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <section className="border-y border-white/6 py-8 overflow-hidden bg-black">
          <p className="text-center text-white/25 text-xs uppercase tracking-widest font-semibold mb-6">Trusted by teams using</p>
          <div className="relative">
            <div className="flex animate-[marquee_25s_linear_infinite] gap-14 w-max">
              {[...trustLogos, ...trustLogos].map((logo, i) => (
                <span key={i} className="text-white/20 font-bold text-sm tracking-wide whitespace-nowrap hover:text-white/45 transition-colors cursor-default">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CASE STUDIES ── */}
        <section id="case-studies" className="py-28 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mb-14"
            >
              <p className="text-[#1F62FF] text-xs uppercase tracking-widest font-semibold mb-3">Client Results</p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Real results from real clients.</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {caseStudies.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="border border-white/8 rounded-xl p-7 flex flex-col gap-5 hover:border-white/15 hover:bg-white/[0.02] transition-all duration-300 bg-white/[0.01]"
                  data-testid={`card-case-study-${i}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1F62FF]/15 border border-[#1F62FF]/25 flex items-center justify-center text-[#1F62FF] font-bold text-sm flex-shrink-0">
                      {c.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{c.name}</p>
                      <p className="text-white/35 text-xs">{c.title}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5 flex-shrink-0">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-white/35 leading-relaxed"><span className="text-white/20 font-medium">Before: </span>{c.before}</p>
                    <p className="text-white/65 leading-relaxed"><span className="text-white/40 font-medium">After: </span>{c.after}</p>
                  </div>

                  <div className="pt-4 border-t border-white/6 flex items-center justify-between">
                    <span className="text-green-400 font-semibold text-sm">{c.revenue}</span>
                    <span className="text-[#1F62FF] font-bold text-xs bg-[#1F62FF]/10 px-3 py-1 rounded-full border border-[#1F62FF]/20">{c.roi}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GUARANTEE ── */}
        <section className="border-t border-white/6 py-28 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="flex-1"
              >
                <p className="text-[#1F62FF] text-xs uppercase tracking-widest font-semibold mb-3">Zero Risk</p>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Our Iron-Clad Guarantee.</h2>
                <p className="text-white/50 leading-relaxed mb-4 text-lg">
                  We guarantee you <strong className="text-white">10 qualified sales calls</strong> booked in your first 60 days — or we work for free until we hit that number.
                </p>
                <p className="text-white/40 leading-relaxed mb-10">
                  If we don't deliver, we waive your monthly fee and keep working at no charge. You have nothing to lose and everything to gain.
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="/ryne.png"
                    alt="Ryne Bandolik"
                    className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#1F62FF]/35 flex-shrink-0"
                  />
                  <a href="https://calendly.com/ryne-bandolik" target="_blank" rel="noopener noreferrer">
                    <button
                      className="bg-white text-black font-bold text-base px-7 h-12 rounded-lg hover:bg-white/90 transition-all duration-200"
                      data-testid="button-book-call-guarantee"
                    >
                      Book Your Free Strategy Call Now
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
                <div className="border border-[#1F62FF]/20 bg-[#1F62FF]/[0.04] rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 bg-[#1F62FF]/12 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-[#1F62FF]" />
                  </div>
                  <p className="text-3xl font-black text-white mb-2">10 Calls in 60 Days</p>
                  <p className="text-white/40 text-sm mb-7">or we work for free until we do</p>
                  <div className="space-y-3">
                    {["No extra charge if we miss the target", "Dedicated campaign manager throughout", "Weekly performance reports included"].map(item => (
                      <div key={item} className="flex items-center gap-3 text-sm text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-[#1F62FF] flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="border-t border-white/6 py-28 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mb-14"
            >
              <p className="text-[#1F62FF] text-xs uppercase tracking-widest font-semibold mb-3">The Process</p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">How We Get You 10 Qualified<br className="hidden md:block" /> Calls in 60 Days.</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="border border-white/8 rounded-xl p-7 flex flex-col gap-4 hover:border-white/16 hover:bg-white/[0.02] transition-all duration-300 bg-white/[0.01]"
                  data-testid={`card-step-${i}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-11 h-11 bg-[#1F62FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <s.icon className="w-5 h-5 text-[#1F62FF]" />
                    </div>
                    <span className="text-xs font-medium text-[#1F62FF]/70 bg-[#1F62FF]/8 px-2.5 py-1 rounded-full border border-[#1F62FF]/15 whitespace-nowrap">{s.sub}</span>
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug">{s.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="border-t border-white/6 py-28 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-14 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="lg:w-80 flex-shrink-0"
              >
                <p className="text-[#1F62FF] text-xs uppercase tracking-widest font-semibold mb-3">Got Questions?</p>
                <h2 className="text-4xl font-black text-white tracking-tight mb-5">Frequently Asked Questions.</h2>
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  Everything you need to know before booking your free strategy call.
                </p>
                <a href="https://calendly.com/ryne-bandolik" target="_blank" rel="noopener noreferrer">
                  <button className="bg-white text-black font-bold text-sm px-6 h-10 rounded-lg hover:bg-white/90 transition-all">
                    Book a Strategy Call
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
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="border-t border-white/6 py-28 bg-black relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1F62FF]/[0.05] rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#1F62FF] text-xs uppercase tracking-widest font-semibold mb-4">Ready to grow?</p>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5 max-w-3xl mx-auto leading-[1.05]">
                Book your free<br />strategy call today.
              </h2>
              <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto">
                We'll show you exactly how we'd get you 10 calls in 60 days — or you don't pay.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <img
                  src="/ryne.png"
                  alt="Ryne Bandolik"
                  className="w-16 h-16 rounded-full object-cover object-top border-2 border-[#1F62FF]/35 flex-shrink-0"
                />
                <div className="flex flex-col items-center sm:items-start gap-1">
                  <a href="https://calendly.com/ryne-bandolik" target="_blank" rel="noopener noreferrer">
                    <button
                      className="bg-white text-black font-black text-lg px-10 h-14 rounded-lg hover:bg-white/90 active:scale-95 transition-all duration-200"
                      data-testid="button-book-call-final"
                    >
                      Book Your Free Strategy Call
                    </button>
                  </a>
                  <span className="text-white/30 text-xs">Talk directly with Ryne</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/6 py-10 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/25">
          <div className="flex items-center gap-4">
            <JobsDoneLogo size="sm" />
            <div className="flex items-center gap-2">
              <img src="/ryne.png" alt="Ryne Bandolik" className="w-7 h-7 rounded-full object-cover object-top border border-white/12" />
              <span className="text-white/30 text-xs">Ryne Bandolik, Founder</span>
            </div>
          </div>
          <span>support@jobsdonelabs.ai</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white/50 transition-colors" data-testid="link-privacy">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors" data-testid="link-terms">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
