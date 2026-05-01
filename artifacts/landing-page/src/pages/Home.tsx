import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  FlaskConical,
  Play,
  Share2,
  Heart,
  BookmarkPlus,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* SECTION 1 — NAVIGATION */}
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
            className="border-[#4F535B] text-white hover:bg-white/5 hover:text-white rounded-[4px] font-medium"
            data-testid="button-book-call-nav"
          >
            Book a Call
          </Button>
        </div>
      </header>

      <main className="pt-32 pb-16">
        {/* SECTION 2 — HERO */}
        <section className="container mx-auto px-4 pt-10 pb-20 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.div variants={fadeIn} className="mb-8">
              <div className="inline-flex items-center rounded-full border border-border/50 bg-card p-1 pr-4 text-sm shadow-sm transition-colors hover:bg-card/80">
                <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary mr-3">
                  Attention
                </span>
                <span className="text-muted-foreground flex items-center gap-1">
                  Businesses Looking to Automate <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
            >
              We'll identify <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">$25,000-$250,000</span> in AI automation savings for your business, or you don't pay.
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed"
            >
              Get an executive-grade AI readiness analysis that maps automatable processes, calculates 3-year ROI, and reveals quick wins to accelerate your growth.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col items-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/90 bg-white/5 py-2 px-6 rounded-full border border-white/10">
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                $12+ Million in Savings Identified for Our Clients
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-[6px] h-14 px-8 text-lg font-bold shadow-[0_0_40px_-10px_rgba(31,98,255,0.5)] hover:shadow-[0_0_60px_-15px_rgba(31,98,255,0.7)] transition-all"
                data-testid="button-get-report-hero"
              >
                Get Your Free AI Readiness Report
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 3 — VSL VIDEO PLAYER */}
        <section className="container mx-auto px-4 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border bg-card shadow-2xl relative group cursor-pointer"
          >
            {/* Fake Video Header */}
            <div className="h-12 bg-black/40 border-b border-border/50 flex items-center justify-between px-4 absolute top-0 left-0 right-0 z-10 backdrop-blur-sm">
              <div className="flex flex-col">
                <span className="text-white font-semibold text-sm">The NEW Way to Identify AI Automation Opportunities</span>
                <span className="text-muted-foreground text-xs">JobsDone Labs</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Heart className="w-4 h-4 hover:text-white transition-colors" />
                <BookmarkPlus className="w-4 h-4 hover:text-white transition-colors" />
                <Share2 className="w-4 h-4 hover:text-white transition-colors" />
              </div>
            </div>

            {/* Video Thumbnail */}
            <div className="aspect-video relative bg-card">
              <img
                src="/vsl-thumb.png"
                alt="Presentation Thumbnail"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=2000";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-black/30" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Progress bar fake */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div className="h-full bg-primary w-1/3" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 4 — SOCIAL PROOF / RESULTS */}
        <section className="border-y border-border bg-card/30 py-12 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/50">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-white mb-2">100+</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Businesses Analyzed</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-white mb-2">$12M+</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Savings Identified</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-white mb-2">3.4x</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Average ROI</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-white mb-2">95%</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — HOW IT WORKS */}
        <section className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our streamlined process to uncover hidden revenue and time savings in your operations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Submit Your URL",
                desc: "Fill out a brief 2-minute form with your company details and current tech stack.",
              },
              {
                step: "02",
                title: "We Analyze",
                desc: "Our experts map your workflows against 400+ automation frameworks to find inefficiencies.",
              },
              {
                step: "03",
                title: "Get Your Report",
                desc: "Receive a comprehensive AI readiness report with projected ROI and actionable steps.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-card border border-border p-8 rounded-2xl relative"
              >
                <div className="text-6xl font-black text-white/5 absolute top-4 right-6 pointer-events-none select-none">
                  {item.step}
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xl mb-6">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 6 — TESTIMONIALS */}
        <section className="bg-card/50 py-24 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Don't just take our word for it</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  quote: "JobsDone Labs found $140,000 in annualized savings in our customer service workflows alone. The ROI on their audit was immediate.",
                  name: "Marcus T.",
                  role: "COO, Nexus Retail",
                  img: "/testimonial-1.png",
                },
                {
                  quote: "I thought we were too small for AI. They showed us how to automate 30 hours of manual data entry a week using tools we already paid for.",
                  name: "Sarah J.",
                  role: "Founder, Elevate Agency",
                  img: "/testimonial-2.png",
                },
                {
                  quote: "The report was an eye-opener. It wasn't just technical jargon—it was a clear business case with exact dollar amounts and implementation timelines.",
                  name: "David W.",
                  role: "Owner, Precision Logistics",
                  img: "/testimonial-3.png",
                },
              ].map((test, i) => (
                <motion.div
                  key={test.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-background border border-border p-8 rounded-2xl flex flex-col justify-between"
                >
                  <div className="mb-8">
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-primary fill-primary" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-lg text-white/90 italic">"{test.quote}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src={test.img}
                      alt={test.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-border"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${test.name}&background=1F62FF&color=fff`;
                      }}
                    />
                    <div>
                      <div className="font-bold text-white">{test.name}</div>
                      <div className="text-sm text-muted-foreground">{test.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7 — FINAL CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 pattern-dots pattern-border pattern-size-4 pattern-opacity-10 mix-blend-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Stop Leaving Money on the Table</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Find out exactly how much time and money AI can save your business. The analysis is free. The insights are priceless.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-[6px] h-14 px-10 text-lg font-bold shadow-[0_0_40px_-10px_rgba(31,98,255,0.5)] hover:shadow-[0_0_60px_-15px_rgba(31,98,255,0.7)] transition-all"
              data-testid="button-get-report-bottom"
            >
              Get Your Free AI Readiness Report
            </Button>
            <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              100% Free. No commitment required.
            </p>
          </div>
        </section>
      </main>

      {/* SECTION 8 — FOOTER */}
      <footer className="border-t border-border bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg">JOBSDONE <span className="text-primary">LABS</span></span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-white transition-colors" data-testid="link-privacy">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors" data-testid="link-terms">Terms of Service</Link>
              <Link href="/contact" className="hover:text-white transition-colors" data-testid="link-contact">Contact</Link>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} JobsDone Labs. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
