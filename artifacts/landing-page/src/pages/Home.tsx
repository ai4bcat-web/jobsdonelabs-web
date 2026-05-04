import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Search,
  Rocket,
  MessageSquare,
  BarChart3,
  Shield,
  Star,
  FlaskConical,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function JobsDoneLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const scales = {
    sm: { flask: "w-5 h-5", jobs: "text-sm", done: "text-sm", labs: "text-[9px]", gap: "gap-1.5" },
    md: { flask: "w-8 h-8", jobs: "text-xl", done: "text-xl", labs: "text-[11px]", gap: "gap-2" },
    lg: { flask: "w-10 h-10", jobs: "text-2xl", done: "text-2xl", labs: "text-xs", gap: "gap-2.5" },
  };
  const s = scales[size];
  return (
    <div className={`flex items-center ${s.gap}`}>
      <FlaskConical className={`${s.flask} text-primary flex-shrink-0`} />
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-0">
          <span className={`font-black ${s.jobs} text-white tracking-tight`}>JOBS</span>
          <span className={`font-black ${s.done} text-primary tracking-tight`}>DONE</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="flex-1 h-px bg-primary/50" />
          <span className={`${s.labs} font-semibold text-white/60 tracking-[0.2em] uppercase`}>Labs</span>
          <span className="flex-1 h-px bg-primary/50" />
        </div>
      </div>
    </div>
  );
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

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

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        onClick={() => setOpen((o) => !o)}
        data-testid={`faq-toggle-${q.slice(0, 20).replace(/\s/g, "-")}`}
      >
        <span className="text-white font-semibold text-base leading-snug group-hover:text-primary transition-colors duration-200">{q}</span>
        <ChevronDown className={`w-5 h-5 text-white/30 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`} />
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
            <p className="pb-5 text-white/55 leading-relaxed text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/6 bg-background/95 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center" data-testid="link-logo">
            <JobsDoneLogo size="md" />
          </Link>
          <Button
            className="bg-primary hover:bg-primary/90 text-white rounded-lg px-5 font-semibold text-sm h-9 shadow-[0_2px_12px_rgba(31,98,255,0.3)]"
            data-testid="button-book-call-nav"
          >
            Book a Call
          </Button>
        </div>
      </header>

      <main className="pt-16">

        {/* ── HERO (split layout) ── */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

            {/* Left column */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex-1 min-w-0"
            >
              {/* Badge */}
              <motion.div variants={fadeIn} className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/4 px-4 py-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                  <span className="text-white/80 font-medium">500+ B2B clients · 4.9/5 avg rating</span>
                </div>
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={fadeIn}
                className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-5"
              >
                Stop Chasing Leads.{" "}
                <span className="text-primary">Book 10 Qualified</span>{" "}
                Sales Calls in 60 Days—
                <span className="text-primary">Guaranteed.</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={fadeIn}
                className="text-white/55 text-lg leading-relaxed mb-7 max-w-lg"
              >
                JobsDone Labs deploys done-for-you cold email &amp; LinkedIn outreach systems so your pipeline never runs dry—without you lifting a finger.
              </motion.p>

              {/* Founder block */}
              <motion.div variants={fadeIn} className="flex items-center gap-3 mb-7">
                <img
                  src="/ryne.png"
                  alt="Ryne Bandolik"
                  className="w-12 h-12 rounded-full object-cover object-top border-2 border-primary/40 flex-shrink-0"
                />
                <div>
                  <p className="text-white font-semibold text-sm leading-none mb-1">Ryne Bandolik, Founder</p>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <span className="text-white/40 text-xs">4.9/5 from 190+ reviews</span>
                  </div>
                </div>
              </motion.div>

              {/* Bullet benefits */}
              <motion.ul variants={stagger} className="space-y-3 mb-8">
                {[
                  "Cold email & LinkedIn systems that book 10+ qualified calls in 60 days",
                  "Fully done-for-you — no manual prospecting ever again",
                  "Ironclad guarantee: we work free until you hit your target",
                ].map((item) => (
                  <motion.li key={item} variants={fadeIn} className="flex items-start gap-2.5 text-white/75 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Dual CTAs */}
              <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-lg h-12 px-7 font-semibold text-base shadow-[0_4px_20px_rgba(31,98,255,0.35)] hover:shadow-[0_4px_28px_rgba(31,98,255,0.5)] transition-all"
                  data-testid="button-book-call-hero"
                >
                  Book a Free Strategy Call <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white/70 hover:text-white hover:bg-white/6 rounded-lg h-12 px-6 font-medium text-base border border-white/10 hover:border-white/20 transition-all"
                  data-testid="button-see-offer"
                >
                  See How It Works <ChevronRight className="w-4 h-4 ml-0.5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right column — Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 min-w-0 w-full lg:max-w-[520px]"
            >
              <div
                className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.55)] relative group cursor-pointer"
                data-testid="vsl-video-container"
              >
                <div className="aspect-video relative bg-card">
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200"
                    alt="VSL thumbnail"
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-400"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-[0_4px_32px_rgba(31,98,255,0.5)] group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white/80 text-xs px-2.5 py-1 rounded-md font-medium">
                    8:42
                  </div>
                </div>
              </div>
              <p className="text-center text-white/35 text-xs mt-3">Watch before booking · No fluff, just results</p>
            </motion.div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <section className="border-y border-white/6 py-8 overflow-hidden">
          <p className="text-center text-white/30 text-xs uppercase tracking-widest font-semibold mb-6">Trusted by teams using</p>
          <div className="relative">
            <div className="flex animate-[marquee_25s_linear_infinite] gap-12 w-max">
              {[...trustLogos, ...trustLogos].map((logo, i) => (
                <span key={i} className="text-white/25 font-bold text-sm tracking-wide whitespace-nowrap hover:text-white/50 transition-colors cursor-default">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CASE STUDIES ── */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-12"
          >
            <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-2">Client Results</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Real results from real clients</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {caseStudies.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border border-white/8 rounded-xl p-6 flex flex-col gap-5 hover:border-white/16 hover:bg-white/2 transition-all duration-300"
                data-testid={`card-case-study-${i}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
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
                  <p className="text-white/40 leading-relaxed"><span className="text-white/25 font-medium">Before: </span>{c.before}</p>
                  <p className="text-white/70 leading-relaxed"><span className="text-white/45 font-medium">After: </span>{c.after}</p>
                </div>

                <div className="pt-4 border-t border-white/6 flex items-center justify-between">
                  <span className="text-green-400 font-semibold text-sm">{c.revenue}</span>
                  <span className="text-primary font-bold text-xs bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{c.roi}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── GUARANTEE ── */}
        <section className="border-t border-white/6 py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="flex-1"
              >
                <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-2">Zero Risk</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Our Iron-Clad Guarantee</h2>
                <p className="text-white/55 leading-relaxed mb-4">
                  We guarantee you <strong className="text-white">10 qualified sales calls</strong> booked in your first 60 days—or we work for free until we hit that number.
                </p>
                <p className="text-white/55 leading-relaxed mb-6">
                  If we don't deliver, we waive your monthly fee and keep working for free. You have nothing to lose and everything to gain.
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="/ryne.png"
                    alt="Ryne Bandolik"
                    className="w-14 h-14 rounded-full object-cover object-top border-2 border-primary/40 flex-shrink-0"
                  />
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white rounded-lg h-12 px-7 font-semibold text-base shadow-[0_4px_20px_rgba(31,98,255,0.3)] transition-all"
                    data-testid="button-book-call-guarantee"
                  >
                    Book Your Free Strategy Call Now
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="flex-1 w-full"
              >
                <div className="border border-primary/25 bg-primary/5 rounded-2xl p-8 md:p-10 text-center">
                  <div className="w-14 h-14 bg-primary/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-2">10 Calls in 60 Days</p>
                  <p className="text-white/45 text-sm mb-5">or we work for free until we do</p>
                  <div className="space-y-2.5">
                    {["No extra charge if we miss the target", "Dedicated campaign manager throughout", "Weekly performance reports included"].map(item => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-white/65">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
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
        <section className="border-t border-white/6 py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mb-12"
            >
              <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-2">The Process</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">How We Get You 10 Qualified Calls in 60 Days</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="border border-white/8 rounded-xl p-6 flex flex-col gap-4 hover:border-white/16 hover:bg-white/2 transition-all duration-300"
                  data-testid={`card-step-${i}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 bg-primary/12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-primary/70 bg-primary/8 px-2.5 py-1 rounded-full border border-primary/15 whitespace-nowrap">{s.sub}</span>
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-snug">{s.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-t border-white/6 py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="lg:w-72 flex-shrink-0"
              >
                <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-2">Got Questions?</p>
                <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                <p className="text-white/45 text-sm leading-relaxed">
                  Everything you need to know before booking your free strategy call.
                </p>
              </motion.div>

              <div className="flex-1">
                {faqs.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="border-t border-white/6 py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="max-w-xl"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Ready to Get <span className="text-primary">10 Qualified Sales Calls</span> in 60 Days?
                </h2>
                <p className="text-white/50 text-lg leading-relaxed mb-2">
                  Book your free 30-minute strategy call. We'll show you exactly how we'd get you 10 calls in 60 days—or you don't pay.
                </p>
                <p className="text-sm italic text-white/30 leading-relaxed">
                  P.S. — Every week you wait is another 30 hours wasted on manual lead gen. That's $18,000 in opportunity cost per month.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="flex flex-col items-center gap-4 flex-shrink-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/ryne.png"
                    alt="Ryne Bandolik"
                    className="w-16 h-16 rounded-full object-cover object-top border-2 border-primary/40 flex-shrink-0"
                  />
                  <div className="flex flex-col gap-1">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white rounded-lg h-14 px-10 text-lg font-bold shadow-[0_6px_30px_rgba(31,98,255,0.4)] hover:shadow-[0_6px_40px_rgba(31,98,255,0.55)] transition-all whitespace-nowrap"
                      data-testid="button-book-call-final"
                    >
                      Book Your Free Strategy Call
                    </Button>
                    <span className="text-white/35 text-xs text-center">Talk directly with Ryne</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/35 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  No credit card · 30 minutes · No commitment
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/6 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
          <div className="flex items-center gap-4">
            <JobsDoneLogo size="sm" />
            <div className="flex items-center gap-2">
              <img src="/ryne.png" alt="Ryne Bandolik" className="w-7 h-7 rounded-full object-cover object-top border border-white/15" />
              <span className="text-white/40 text-xs">Ryne Bandolik, Founder</span>
            </div>
          </div>
          <span>support@jobsdonelabs.com</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white/55 transition-colors" data-testid="link-privacy">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/55 transition-colors" data-testid="link-terms">Terms of Service</Link>
          </div>
          <span>© {new Date().getFullYear()} JobsDone Labs</span>
        </div>
      </footer>
    </div>
  );
}
