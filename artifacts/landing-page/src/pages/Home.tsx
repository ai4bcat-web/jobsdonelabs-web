import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Search,
  Rocket,
  MessageSquare,
  BarChart3,
  Shield,
  CalendarCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const faqs = [
  {
    q: "Why should I trust you to deliver these results?",
    a: "We've booked thousands of qualified sales calls for B2B service providers across coaching, consulting, and agency niches. Every client gets a dedicated campaign manager, weekly reporting, and our ironclad guarantee — if we don't hit your target, we keep working for free.",
  },
  {
    q: "How do I know this will work for my specific business?",
    a: "During your free strategy call, we'll audit your current lead generation, map your ICP, and build a custom campaign blueprint. If we don't think we can get you results, we'll tell you upfront — we only take on clients we're confident we can help.",
  },
  {
    q: "What if I'm not tech-savvy?",
    a: "You don't need to be. We handle 100% of the technical setup — domains, email inboxes, LinkedIn automation, lead lists, copy, and response management. All you do is show up to the booked calls.",
  },
  {
    q: "How long does it take to see results?",
    a: "Most clients see their first qualified calls booked within 30 days. We guarantee 5 calls in 60 days. Setup takes 1–2 weeks, campaigns launch in week 3, and calls typically start rolling in shortly after.",
  },
  {
    q: "What counts as a 'qualified call'?",
    a: "A qualified call is a booked meeting with a prospect who matches your ideal client profile — right industry, right size, right pain point, and has expressed genuine interest in your service. Cold tire-kickers don't count.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. There are no long-term lock-ins. We work on a month-to-month basis after an initial setup period. If you're not happy, you can cancel with 30 days' notice.",
  },
  {
    q: "Do you work with businesses in my industry?",
    a: "We work best with B2B service providers — coaches, consultants, agencies, and professional services with a high average client value ($3k+ per engagement). If you're B2C or have a very broad target market, we may not be the right fit.",
  },
  {
    q: "What's the catch?",
    a: "There isn't one. We take on a limited number of clients each month to maintain quality. If we can't get you results, we don't get paid beyond setup. Our success is directly tied to yours.",
  },
];

const caseStudies = [
  {
    name: "James R.",
    title: "B2B SaaS Consultant",
    before: "Booking 2–3 calls/month through referrals only",
    after: "Now booking 10–12 calls/month consistently",
    revenue: "$220,000 in new revenue in 6 months",
    roi: "14.2x ROI",
  },
  {
    name: "Priya M.",
    title: "Executive Coach",
    before: "Relying on LinkedIn DMs manually — inconsistent",
    after: "6–8 qualified discovery calls booked every week",
    revenue: "$95,000 added to pipeline in 90 days",
    roi: "9.8x ROI",
  },
  {
    name: "Tom K.",
    title: "Agency Owner",
    before: "Spending 15 hrs/week on cold outreach personally",
    after: "Fully automated — zero time spent on prospecting",
    revenue: "$180,000 in new contracts signed in 4 months",
    roi: "11.6x ROI",
  },
];

const steps = [
  {
    icon: Search,
    title: "Infrastructure Setup",
    sub: "Week 1–2",
    desc: "We build your entire cold email & LinkedIn infrastructure: 5–10 domains, 10–20 email inboxes, LinkedIn automation, and a lead list of 5,000+ verified contacts.",
  },
  {
    icon: Rocket,
    title: "Campaign Launch",
    sub: "Week 3–4",
    desc: "We write all your email copy and LinkedIn messages, then launch campaigns — 10,000 emails/month and 500 LinkedIn connection requests per month.",
  },
  {
    icon: MessageSquare,
    title: "Response Management",
    sub: "Ongoing",
    desc: "We monitor all responses 24/7, qualify leads using your ICP criteria, and book qualified calls directly into your calendar.",
  },
  {
    icon: BarChart3,
    title: "Optimization & Scaling",
    sub: "Month 2+",
    desc: "We A/B test messaging, monitor deliverability, refresh lead lists monthly, and provide weekly performance reports.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/60 last:border-0">
      <button
        className="w-full flex items-center justify-between py-6 text-left gap-4 group"
        onClick={() => setOpen((o) => !o)}
        data-testid={`faq-toggle-${q.slice(0, 20).replace(/\s/g, "-")}`}
      >
        <span className="text-white font-semibold text-base md:text-lg leading-snug group-hover:text-primary/90 transition-colors">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed text-base">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-18 flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3" data-testid="link-logo">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <CalendarCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg text-white tracking-tight">
              JobsDone <span className="text-primary">Labs</span>
            </span>
          </Link>
          <Button
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 font-medium text-sm h-10"
            data-testid="button-book-call-nav"
          >
            Book a Free Call
          </Button>
        </div>
      </header>

      <main className="pt-20">

        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto px-6 pt-24 pb-28 flex flex-col items-center text-center relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl mx-auto flex flex-col items-center"
            >
              <motion.div variants={fadeIn} className="mb-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm">
                  <span className="text-primary font-medium">Attention</span>
                  <span className="text-white/60">·</span>
                  <span className="text-white/70">B2B Service Providers &amp; Coaches</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary" />
                </div>
              </motion.div>

              <motion.h1
                variants={fadeIn}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.12] tracking-tight"
              >
                We'll Book You{" "}
                <span className="text-primary">
                  5 Qualified Sales Calls
                </span>{" "}
                in 60 Days—Or We Work For Free
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed"
              >
                For B2B service providers, coaches, and consultants who need predictable sales calls without the guesswork.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-col items-center gap-5 w-full max-w-sm">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-14 text-lg font-semibold shadow-[0_8px_30px_rgba(31,98,255,0.35)] hover:shadow-[0_8px_40px_rgba(31,98,255,0.5)] transition-all"
                  data-testid="button-book-call-hero"
                >
                  Book Your Free Strategy Call
                </Button>

                <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-white/50">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                    No credit card required
                  </span>
                  <span className="hidden sm:block">·</span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                    30-minute call
                  </span>
                  <span className="hidden sm:block">·</span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                    No commitment
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* VIDEO SECTION */}
        <section className="container mx-auto px-6 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-white/50 uppercase text-xs tracking-widest font-medium mb-4">Watch Before You Decide</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-snug">
              See How We Guarantee 5 Qualified Sales Calls in 60 Days
            </h2>

            <div
              className="rounded-2xl overflow-hidden border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative group cursor-pointer"
              data-testid="vsl-video-container"
            >
              <div className="aspect-video relative bg-card">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1600"
                  alt="VSL Video Thumbnail"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-18 h-18 w-[72px] h-[72px] bg-white/95 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-7 h-7 text-primary fill-primary ml-1" />
                    </div>
                    <span className="text-white/80 text-sm font-medium bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full">
                      8 minutes · No fluff
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="mt-10 bg-primary hover:bg-primary/90 text-white rounded-full h-13 h-[52px] px-8 text-base font-semibold shadow-[0_8px_24px_rgba(31,98,255,0.3)] transition-all"
              data-testid="button-book-call-below-video"
            >
              Yes, I Want 5 Qualified Calls in 60 Days
            </Button>
          </motion.div>
        </section>

        {/* STATS BAR */}
        <section className="border-y border-white/6 py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { val: "500+", label: "Clients Served" },
                { val: "$40M+", label: "Pipeline Generated" },
                { val: "60 Days", label: "Guaranteed" },
                { val: "97%", label: "Client Satisfaction" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-3xl md:text-4xl font-bold text-white">{s.val}</span>
                  <span className="text-sm text-white/40 font-medium">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDIES */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-3">Client Results</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Real results from real clients</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {caseStudies.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/4 border border-white/8 rounded-2xl p-7 flex flex-col gap-5 hover:border-primary/30 hover:bg-white/6 transition-all duration-300"
                  data-testid={`card-case-study-${i}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {c.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{c.name}</p>
                      <p className="text-white/40 text-xs">{c.title}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-primary fill-primary" />)}
                    </div>
                  </div>

                  <div className="space-y-2.5 text-sm">
                    <div className="flex gap-2">
                      <span className="text-white/30 text-xs mt-0.5 shrink-0">Before</span>
                      <span className="text-white/60">{c.before}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-white/30 text-xs mt-0.5 shrink-0">After</span>
                      <span className="text-white/80">{c.after}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                    <span className="text-green-400 font-semibold text-sm">{c.revenue}</span>
                    <span className="text-primary font-bold text-xs bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{c.roi}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-3">Zero Risk</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Our Iron-Clad Guarantee</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto border border-primary/25 bg-primary/5 rounded-3xl p-10 md:p-14 text-center"
            >
              <div className="w-14 h-14 bg-primary/15 rounded-2xl flex items-center justify-center mx-auto mb-7">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <p className="text-white text-lg md:text-xl leading-relaxed mb-4">
                We guarantee you <strong>5 qualified sales calls</strong> booked in your first 60 days—or we work for free until we hit that number.
              </p>
              <p className="text-white/60 leading-relaxed mb-4">
                If we don't book you 5 qualified calls in 60 days, we waive your monthly fee and keep working for free until we do.
              </p>
              <p className="font-semibold text-primary">You have nothing to lose and everything to gain.</p>
              <Button
                size="lg"
                className="mt-8 bg-primary hover:bg-primary/90 text-white rounded-full h-13 h-[52px] px-8 text-base font-semibold shadow-[0_8px_24px_rgba(31,98,255,0.3)] transition-all w-full sm:w-auto"
                data-testid="button-book-call-guarantee"
              >
                Book Your Free Strategy Call Now
              </Button>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 border-t border-white/6">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-3">The Process</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                How We Get You 5 Qualified Calls in 60 Days
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/3 border border-white/8 rounded-2xl p-7 flex flex-col gap-4 hover:border-primary/25 hover:bg-white/5 transition-all duration-300"
                  data-testid={`card-step-${i}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 bg-primary/12 rounded-xl flex items-center justify-center">
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-primary/60 bg-primary/8 px-2.5 py-1 rounded-full border border-primary/15">{s.sub}</span>
                  </div>
                  <h3 className="font-semibold text-white text-base leading-snug">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 border-t border-white/6">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-3">Got Questions?</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              {faqs.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-28 border-t border-white/6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/12 rounded-full blur-[120px] pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                Ready to Get 5 Qualified Sales Calls in 60 Days?
              </h2>
              <p className="text-lg text-white/50 mb-10 leading-relaxed">
                Book your free 30-minute strategy call. We'll show you exactly how we'd get you 5 calls in 60 days—or you don't pay.
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full h-14 px-10 text-lg font-semibold shadow-[0_8px_40px_rgba(31,98,255,0.4)] hover:shadow-[0_8px_50px_rgba(31,98,255,0.55)] transition-all w-full sm:w-auto"
                data-testid="button-book-call-final"
              >
                Book Your Free Strategy Call
              </Button>
              <p className="mt-8 text-sm italic text-white/35 leading-relaxed">
                P.S. — Every week you wait is another 30 hours wasted on manual lead gen. That's $18,000 in opportunity cost per month. How much longer are you going to let that continue?
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/6 bg-background py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5 text-sm text-white/30">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <CalendarCheck className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-white/60">JobsDone <span className="text-primary">Labs</span></span>
          </div>
          <span>support@jobsdonelabs.com</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white/60 transition-colors" data-testid="link-privacy">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors" data-testid="link-terms">Terms of Service</Link>
          </div>
          <span>© {new Date().getFullYear()} JobsDone Labs</span>
        </div>
      </footer>
    </div>
  );
}
