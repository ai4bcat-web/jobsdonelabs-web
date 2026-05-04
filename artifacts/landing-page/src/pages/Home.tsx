import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical,
  Play,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Search,
  Rocket,
  MessageSquare,
  BarChart3,
  Shield,
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
    name: "James R., B2B SaaS Consultant",
    before: "Booking 2–3 calls/month through referrals only",
    after: "Now booking 10–12 calls/month consistently",
    revenue: "$220,000 in new revenue in 6 months",
    roi: "14.2x ROI",
  },
  {
    name: "Priya M., Executive Coach",
    before: "Relying on LinkedIn DMs manually — inconsistent",
    after: "6–8 qualified discovery calls booked every week",
    revenue: "$95,000 added to pipeline in 90 days",
    roi: "9.8x ROI",
  },
  {
    name: "Tom K., Agency Owner",
    before: "Spending 15 hrs/week on cold outreach personally",
    after: "Fully automated — zero time spent on prospecting",
    revenue: "$180,000 in new contracts signed in 4 months",
    roi: "11.6x ROI",
  },
];

const steps = [
  {
    icon: Search,
    title: "Infrastructure Setup (Week 1–2)",
    desc: "We build your entire cold email & LinkedIn infrastructure: 5–10 domains, 10–20 email inboxes, LinkedIn automation, and a lead list of 5,000+ verified contacts.",
  },
  {
    icon: Rocket,
    title: "Campaign Launch (Week 3–4)",
    desc: "We write all your email copy and LinkedIn messages, then launch campaigns — 10,000 emails/month and 500 LinkedIn connection requests per month.",
  },
  {
    icon: MessageSquare,
    title: "Response Management (Ongoing)",
    desc: "We monitor all responses 24/7, qualify leads using your ICP criteria, and book qualified calls directly into your calendar.",
  },
  {
    icon: BarChart3,
    title: "Optimization & Scaling (Month 2+)",
    desc: "We A/B test messaging, monitor deliverability, refresh lead lists monthly, and provide weekly performance reports.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between py-6 text-left gap-4"
        onClick={() => setOpen((o) => !o)}
        data-testid={`faq-toggle-${q.slice(0, 20).replace(/\s/g, "-")}`}
      >
        <span className="text-white font-semibold text-base md:text-lg">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
            <p className="pb-6 text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" data-testid="link-logo">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <FlaskConical className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              JOBSDONE <span className="text-primary">LABS</span>
            </span>
          </Link>
          <Button
            variant="outline"
            className="border-border text-white hover:bg-white/5 hover:text-white rounded-md font-medium"
            data-testid="button-book-call-nav"
          >
            Book a Call
          </Button>
        </div>
      </header>

      <main className="pt-24">

        {/* HERO */}
        <section className="container mx-auto px-4 pt-20 pb-24 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.div variants={fadeIn} className="mb-8">
              <div className="inline-flex items-center rounded-full border border-border/50 bg-card p-1 pr-4 text-sm shadow-sm">
                <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary mr-3">
                  Attention
                </span>
                <span className="text-muted-foreground flex items-center gap-1">
                  B2B Service Providers &amp; Coaches <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
            >
              We'll Book You{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                5 Qualified Sales Calls
              </span>{" "}
              in 60 Days—Or We Work For Free Until We Do
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
            >
              For B2B service providers, coaches, and consultants who need predictable sales calls without the guesswork.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col items-center gap-5">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-md h-14 px-8 text-lg font-bold shadow-[0_0_40px_-10px_rgba(31,98,255,0.5)] hover:shadow-[0_0_60px_-15px_rgba(31,98,255,0.7)] transition-all"
                data-testid="button-book-call-hero"
              >
                Book Your Free Strategy Call
              </Button>

              <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  No credit card required
                </span>
                <span className="hidden sm:block text-border">|</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  30-minute call
                </span>
                <span className="hidden sm:block text-border">|</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  We'll show you exactly how we'd get you 5 calls in 60 days
                </span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* VIDEO SECTION */}
        <section className="container mx-auto px-4 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Watch This 8-Minute Video to See How We Guarantee 5 Qualified Sales Calls in 60 Days
            </h2>

            <div
              className="rounded-xl overflow-hidden border border-border shadow-[0_10px_40px_rgba(0,0,0,0.4)] relative group cursor-pointer"
              data-testid="vsl-video-container"
            >
              <div className="aspect-video relative bg-card">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1600"
                  alt="VSL Video Thumbnail"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(31,98,255,0.5)] group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="mt-10 bg-primary hover:bg-primary/90 text-white rounded-md h-14 px-8 text-lg font-bold shadow-[0_0_30px_-10px_rgba(31,98,255,0.5)] transition-all"
              data-testid="button-book-call-below-video"
            >
              Yes, I Want 5 Qualified Calls in 60 Days
            </Button>
          </motion.div>
        </section>

        {/* CASE STUDIES */}
        <section className="bg-card/30 border-y border-border py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Real Results From Real Clients</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {caseStudies.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-background border border-border rounded-xl p-8 flex flex-col gap-4"
                  data-testid={`card-case-study-${i}`}
                >
                  <p className="font-bold text-white text-lg">{c.name}</p>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-white/70">Before: </span>{c.before}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-white/70">After: </span>{c.after}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border flex items-center justify-between">
                    <span className="text-green-400 font-bold text-base">{c.revenue}</span>
                    <span className="text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">{c.roi}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">Our Iron-Clad Guarantee</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto border-2 border-primary/40 bg-primary/5 rounded-2xl p-10 md:p-14 text-center"
            >
              <Shield className="w-14 h-14 text-primary mx-auto mb-6" />
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-4">
                We guarantee you <strong className="text-white">5 qualified sales calls</strong> booked in your first 60 days—or we work for free until we hit that number.
              </p>
              <p className="text-lg text-white/90 leading-relaxed mb-4">
                If we don't book you 5 qualified calls in 60 days, we waive your monthly fee and keep working for free until we do.
              </p>
              <p className="text-lg font-semibold text-primary">You have nothing to lose and everything to gain.</p>
              <Button
                size="lg"
                className="mt-10 bg-primary hover:bg-primary/90 text-white rounded-md h-14 px-8 text-lg font-bold shadow-[0_0_30px_-10px_rgba(31,98,255,0.5)] transition-all"
                data-testid="button-book-call-guarantee"
              >
                Book Your Free Strategy Call Now
              </Button>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-card/30 border-y border-border py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                How We Get You 5 Qualified Calls in 60 Days
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-background border border-border rounded-xl p-7 flex flex-col gap-4 relative"
                  data-testid={`card-step-${i}`}
                >
                  <div className="text-6xl font-black text-white/4 absolute top-4 right-5 select-none pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-card/50 border-t border-border py-28 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Get 5 Qualified Sales Calls in 60 Days?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Book your free 30-minute strategy call now. We'll show you exactly how we'd get you 5 calls in 60 days—or you don't pay.
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-md h-14 px-10 text-lg font-bold shadow-[0_0_40px_-10px_rgba(31,98,255,0.5)] hover:shadow-[0_0_60px_-15px_rgba(31,98,255,0.7)] transition-all"
                data-testid="button-book-call-final"
              >
                Book Your Free Strategy Call
              </Button>
              <p className="mt-6 text-sm italic text-muted-foreground max-w-xl mx-auto leading-relaxed">
                P.S. — Every week you wait is another 30 hours wasted on manual lead gen. That's $18,000 in opportunity cost per month. How much longer are you going to let that continue?
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-primary" />
            <span className="font-bold text-white">JOBSDONE <span className="text-primary">LABS</span></span>
          </div>
          <div className="flex items-center gap-1 text-center">
            support@jobsdonelabs.com
          </div>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors" data-testid="link-privacy">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors" data-testid="link-terms">Terms of Service</Link>
          </div>
          <span>© {new Date().getFullYear()} JobsDone Labs. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
