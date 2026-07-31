import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, Plus, Minus } from "lucide-react";
import BookingModal, { type BookingIntent } from "@/components/BookingModal";
import { BLUEPRINT, TIERS, ADD_ONS, PRINCIPLES, MATRIX, PRICING_FAQ, LADDER, VS_HIRE, type Tier } from "@/lib/engagements";

/* Design tokens — mirrored from Home so the page reads as one site */
const CREAM       = "#F4EFE3";
const CREAM2      = "#EFE8D8";
const INK         = "#0B0D12";
const INK2        = "#11131B";
const INK_SOFT    = "#54596A";
const LINE        = "rgba(11,13,18,.12)";
const ACCENT      = "#1466FF";
const ACCENT_DEEP = "#0B49C9";
const GREEN       = "#34d399";
const HG          = "'Hanken Grotesk',sans-serif";

function FlaskMark({ stroke = ACCENT, size = 32 }: { stroke?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M18 7 H30 M20 7 V19 L11.5 38 Q10 41.5 13.8 41.5 H34.2 Q38 41.5 36.5 38 L28 19 V7"
        stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20.5" y1="25.5" x2="26" y2="30.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="30.5" x2="20.5" y2="35.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <circle cx="20.5" cy="25.5" r="2.6" fill={stroke} />
      <circle cx="26.5" cy="30.5" r="2.6" fill={stroke} />
      <circle cx="20.5" cy="35.5" r="2.6" fill={stroke} />
    </svg>
  );
}

function Wordmark({ size = 18, onDark = false }: { size?: number; onDark?: boolean }) {
  const inkColor   = onDark ? CREAM : INK;
  const mutedColor = onDark ? "rgba(244,239,227,.65)" : INK_SOFT;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, fontSize:size, lineHeight:1, userSelect:"none" }}>
      <FlaskMark stroke={ACCENT} size={Math.round(size * 1.55)} />
      <div style={{ display:"flex", flexDirection:"column" }}>
        <span style={{ fontStyle:"italic", fontWeight:800, letterSpacing:"-0.01em", fontSize:"1em", fontFamily:HG }}>
          <span style={{ color:inkColor }}>JOBS</span><span style={{ color:ACCENT }}>DONE</span>
        </span>
        <span style={{ display:"flex", alignItems:"center", gap:"0.4em", marginTop:"0.35em",
          fontWeight:700, fontSize:"0.28em", letterSpacing:"0.42em", color:mutedColor, fontFamily:HG }}>
          <span style={{ flex:1, height:1.5, background:"currentColor", opacity:0.5 }} />
          <span style={{ paddingLeft:"0.42em" }}>LABS</span>
          <span style={{ flex:1, height:1.5, background:"currentColor", opacity:0.5 }} />
        </span>
      </div>
    </div>
  );
}

function Fade({ children, delay=0, className="" }: { children:React.ReactNode; delay?:number; className?:string }) {
  return (
    <motion.div className={className}
      initial={{ opacity:0, y:22 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-60px" }}
      transition={{ duration:0.52, ease:[0.22,1,0.36,1], delay }}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children:React.ReactNode }) {
  return (
    <div style={{ display:"inline-flex", marginBottom:16 }}>
      <span style={{ fontSize:11, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase",
        fontFamily:HG, background:ACCENT, color:"#fff", padding:"5px 11px" }}>
        {children}
      </span>
    </div>
  );
}

function H2({ children, onDark=false, style: extra={} }: { children:React.ReactNode; onDark?:boolean; style?:React.CSSProperties }) {
  return (
    <h2 className="anton" style={{ fontSize:"clamp(2rem,4.2vw,3rem)", lineHeight:1.08, letterSpacing:"-0.01em",
      color:onDark?CREAM:INK, marginBottom:18, ...extra }}>
      {children}
    </h2>
  );
}

function PrimaryBtn({ children, onClick, small=false, light=false, full=false }:
  { children:React.ReactNode; onClick?:()=>void; small?:boolean; light?:boolean; full?:boolean }) {
  return (
    <button onClick={onClick}
      style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
        width: full ? "100%" : undefined,
        background:light?"#fff":ACCENT, color:light?ACCENT_DEEP:"#fff",
        fontSize:small?14:15.5, fontWeight:700, padding:small?"10px 18px":"14px 26px",
        borderRadius:50, border:"none", cursor:"pointer", letterSpacing:"-0.01em",
        boxShadow:light?"0 8px 28px -8px rgba(0,0,0,.28)":`0 4px 16px -4px ${ACCENT}66`,
        fontFamily:HG, transition:"transform .15s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform="translateY(-1px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform="translateY(0)"; }}>
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick, full=false }: { children:React.ReactNode; onClick?:()=>void; full?:boolean }) {
  return (
    <button onClick={onClick}
      style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
        width: full ? "100%" : undefined,
        background:"transparent", color:INK, fontSize:15, fontWeight:700,
        padding:"13px 24px", borderRadius:50, border:`1.5px solid ${LINE}`,
        cursor:"pointer", letterSpacing:"-0.01em", fontFamily:HG, transition:"border-color .15s,color .15s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor=ACCENT; (e.currentTarget as HTMLButtonElement).style.color=ACCENT; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor=LINE; (e.currentTarget as HTMLButtonElement).style.color=INK; }}>
      {children}
    </button>
  );
}

/* ───────────────────────────────────── */
/*  Nav                                 */
/* ───────────────────────────────────── */
function PricingNav({ onBook }: { onBook:()=>void }) {
  const links: [string,string][] = [
    ["/#services","Services"],
    ["/#industries","Industries"],
    ["/pricing","Engagements"],
    ["/blog/","Blog"],
    ["/case-study/logistics-200k-profit","Case Study"],
    ["/contact","Contact"],
  ];
  return (
    <nav style={{ position:"sticky", top:0, zIndex:50, background:"rgba(244,239,227,.86)",
      backdropFilter:"blur(14px) saturate(1.25)", borderBottom:`1px solid ${LINE}` }}>
      <div style={{ maxWidth:1120, margin:"0 auto", padding:"0 24px", height:64,
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link href="/" style={{ textDecoration:"none" }}><Wordmark size={18} /></Link>
        <div className="hidden md:flex" style={{ alignItems:"center", gap:22 }}>
          {links.map(([href,label]) => (
            <a key={href} href={href}
              style={{ fontSize:14, fontWeight:600, color:href==="/pricing"?INK:INK_SOFT,
                textDecoration:"none", letterSpacing:"-0.01em", fontFamily:HG }}>
              {label}
            </a>
          ))}
        </div>
        <PrimaryBtn onClick={onBook} small>Book a call <ArrowRight size={14} /></PrimaryBtn>
      </div>
    </nav>
  );
}

/* ───────────────────────────────────── */
/*  Hero                                */
/* ───────────────────────────────────── */
function PricingHero({ onBook }: { onBook:()=>void }) {
  return (
    <section style={{ background:CREAM, padding:"72px 24px 64px" }}>
      <div style={{ maxWidth:820, margin:"0 auto", textAlign:"center" }}>
        <Fade>
          <SectionLabel>Engagements</SectionLabel>
          <h1 className="anton" style={{ fontSize:"clamp(2.1rem,4.6vw,3.3rem)", lineHeight:1.06, color:INK, marginBottom:18 }}>
            Hire the{" "}
            <span style={{ background:ACCENT, color:"#fff", padding:"0.02em 0.14em 0.07em", borderRadius:4 }}>AI leader</span>
            {" "}you can't justify hiring full time.
          </h1>
          <p style={{ fontSize:17.5, lineHeight:1.7, color:INK_SOFT, maxWidth:620, margin:"0 auto 30px", fontFamily:HG }}>
            Ryne runs a logistics group, a software lab, and a portfolio of businesses where AI agents do real work every day —
            quoting, dispatching, reconciling, reporting. These are the ways you can put that seat inside your company,
            for a fixed monthly number and a term you can see the end of.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:26 }}>
            <PrimaryBtn onClick={onBook}>Book a free 45-min call <ArrowRight size={16} /></PrimaryBtn>
            <GhostBtn onClick={() => document.getElementById("tiers")?.scrollIntoView({ behavior:"smooth" })}>
              See the tiers
            </GhostBtn>
          </div>
          <div style={{ display:"flex", gap:22, justifyContent:"center", flexWrap:"wrap" }}>
            {["Retainers, not hourly","You own every system","Priced against a return"].map(b => (
              <div key={b} style={{ display:"flex", alignItems:"center", gap:7 }}>
                <div style={{ width:18, height:18, borderRadius:"50%", background:`${GREEN}22`,
                  display:"flex", alignItems:"center", justifyContent:"center", flex:"0 0 auto" }}>
                  <Check size={10} color={GREEN} strokeWidth={3} />
                </div>
                <span style={{ fontSize:13.5, color:INK_SOFT, fontFamily:HG }}>{b}</span>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Ladder — how an engagement starts   */
/* ───────────────────────────────────── */
function Ladder() {
  const steps = LADDER;
  return (
    <section style={{ background:INK, padding:"72px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <SectionLabel>The path</SectionLabel>
            <H2 onDark style={{ maxWidth:600, margin:"0 auto 0" }}>Nobody signs a retainer on a first date.</H2>
          </div>
        </Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <Fade key={s.step} delay={i*0.07}>
              <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)",
                borderRadius:12, padding:"26px 22px", height:"100%" }}>
                <div className="anton" style={{ fontSize:34, color:`${ACCENT}`, lineHeight:1, marginBottom:12, opacity:.9 }}>{s.step}</div>
                <h3 style={{ fontSize:16.5, fontWeight:700, color:CREAM, marginBottom:8, fontFamily:HG, letterSpacing:"-0.01em" }}>{s.label}</h3>
                <p style={{ fontSize:14, lineHeight:1.62, color:"rgba(244,239,227,.55)", fontFamily:HG }}>{s.body}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Blueprint band                      */
/* ───────────────────────────────────── */
function BlueprintBand({ onBook }: { onBook:()=>void }) {
  return (
    <section style={{ background:CREAM, padding:"80px 24px 40px" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <Fade>
          <div style={{ background:CREAM2, border:`1.5px solid ${LINE}`, borderRadius:16, padding:"36px 34px" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <SectionLabel>{BLUEPRINT.eyebrow}</SectionLabel>
                <h2 className="anton" style={{ fontSize:"clamp(1.7rem,3.2vw,2.3rem)", lineHeight:1.1, color:INK, marginBottom:14 }}>
                  {BLUEPRINT.name}
                </h2>
                <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:14 }}>
                  <span className="anton" style={{ fontSize:38, color:ACCENT, lineHeight:1 }}>{BLUEPRINT.price}</span>
                  <span style={{ fontSize:14.5, color:INK_SOFT, fontFamily:HG }}>{BLUEPRINT.cadence} · {BLUEPRINT.term}</span>
                </div>
                <p style={{ fontSize:16, lineHeight:1.68, color:INK_SOFT, marginBottom:18, fontFamily:HG }}>
                  {BLUEPRINT.promise}
                </p>
                <p style={{ fontSize:14, lineHeight:1.6, color:INK, fontFamily:HG, fontWeight:600, marginBottom:22 }}>
                  {BLUEPRINT.fit}
                </p>
                <PrimaryBtn onClick={onBook}>{BLUEPRINT.cta} <ArrowRight size={16} /></PrimaryBtn>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {BLUEPRINT.includes.map(item => (
                  <div key={item} style={{ display:"flex", gap:11, alignItems:"flex-start" }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background:`${ACCENT}18`, flex:"0 0 auto",
                      display:"flex", alignItems:"center", justifyContent:"center", marginTop:2 }}>
                      <Check size={11} color={ACCENT} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize:14.5, lineHeight:1.55, color:INK, fontFamily:HG }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Tier cards                          */
/* ───────────────────────────────────── */
function TierCard({ tier, onBook, delay }: { tier:Tier; onBook:(intent:BookingIntent)=>void; delay:number }) {
  const dark = !!tier.featured;
  return (
    <Fade delay={delay}>
      <div style={{
        background: dark ? INK2 : CREAM,
        border: dark ? `1px solid ${ACCENT}55` : `1px solid ${LINE}`,
        borderRadius:16, padding:"30px 28px", height:"100%",
        display:"flex", flexDirection:"column",
        boxShadow: dark ? `0 28px 64px -20px ${ACCENT}55` : "none",
        position:"relative",
      }}>
        {dark && (
          <div style={{ position:"absolute", top:-11, left:28, background:ACCENT, color:"#fff",
            fontSize:10.5, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase",
            padding:"4px 10px", fontFamily:HG }}>
            Most operators start here
          </div>
        )}
        <div style={{ fontSize:11, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase",
          color: dark ? ACCENT : INK_SOFT, fontFamily:HG, marginBottom:10 }}>
          {tier.eyebrow}
        </div>
        <h3 className="anton" style={{ fontSize:26, lineHeight:1.1, color: dark ? CREAM : INK, marginBottom:14 }}>
          {tier.name}
        </h3>
        <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:4 }}>
          <span className="anton" style={{ fontSize:36, color:ACCENT, lineHeight:1 }}>{tier.price}</span>
          <span style={{ fontSize:15, fontWeight:600, color: dark ? "rgba(244,239,227,.6)" : INK_SOFT, fontFamily:HG }}>{tier.cadence}</span>
        </div>
        <div style={{ fontSize:13, color: dark ? "rgba(244,239,227,.5)" : INK_SOFT, fontFamily:HG, marginBottom:18 }}>
          {tier.term}
        </div>
        <p style={{ fontSize:15, lineHeight:1.65, color: dark ? "rgba(244,239,227,.82)" : INK, fontFamily:HG, marginBottom:14 }}>
          {tier.promise}
        </p>
        <div style={{
          background: dark ? "rgba(255,255,255,.05)" : CREAM2,
          border: dark ? "1px solid rgba(255,255,255,.08)" : `1px solid ${LINE}`,
          borderRadius:8, padding:"12px 14px", marginBottom:20,
        }}>
          <div style={{ fontSize:10.5, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase",
            color: dark ? "rgba(244,239,227,.42)" : INK_SOFT, fontFamily:HG, marginBottom:5 }}>
            Best fit
          </div>
          <p style={{ fontSize:13.5, lineHeight:1.55, color: dark ? "rgba(244,239,227,.68)" : INK_SOFT, fontFamily:HG, margin:0 }}>
            {tier.fit}
          </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:11, marginBottom:26, flex:1 }}>
          {tier.includes.map(item => (
            <div key={item} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
              <div style={{ width:18, height:18, borderRadius:"50%",
                background: dark ? `${GREEN}22` : `${ACCENT}15`, flex:"0 0 auto",
                display:"flex", alignItems:"center", justifyContent:"center", marginTop:2 }}>
                <Check size={10} color={dark ? GREEN : ACCENT} strokeWidth={3} />
              </div>
              <span style={{ fontSize:14, lineHeight:1.55, color: dark ? "rgba(244,239,227,.78)" : INK_SOFT, fontFamily:HG }}>{item}</span>
            </div>
          ))}
        </div>
        {dark
          ? <PrimaryBtn onClick={() => onBook(tier.id as BookingIntent)} full>{tier.cta} <ArrowRight size={16} /></PrimaryBtn>
          : <GhostBtn onClick={() => onBook(tier.id as BookingIntent)} full>{tier.cta} <ArrowRight size={15} /></GhostBtn>}
      </div>
    </Fade>
  );
}

function Tiers({ onBook }: { onBook:(intent:BookingIntent)=>void }) {
  return (
    <section id="tiers" style={{ background:CREAM, padding:"40px 24px 88px" }}>
      <div style={{ maxWidth:1180, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <SectionLabel>Retainers</SectionLabel>
            <H2 style={{ maxWidth:620, margin:"0 auto 14px" }}>Three ways to work together.</H2>
            <p style={{ fontSize:16.5, color:INK_SOFT, maxWidth:560, margin:"0 auto", fontFamily:HG, lineHeight:1.65 }}>
              The only question that matters: who's holding the keyboard? Pick the tier that answers it honestly and
              the engagement works. Pick the wrong one and you'll feel it by week three.
            </p>
          </div>
        </Fade>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((t, i) => <TierCard key={t.id} tier={t} onBook={onBook} delay={i*0.08} />)}
        </div>
        <Fade delay={0.24}>
          <p style={{ textAlign:"center", fontSize:14, color:INK_SOFT, fontFamily:HG, marginTop:26 }}>
            Every retainer starts with the{" "}
            <a href="#blueprint" onClick={e => { e.preventDefault(); window.scrollTo({ top:0, behavior:"smooth" }); }}
              style={{ color:ACCENT, fontWeight:700, textDecoration:"none" }}>AI Operating Blueprint</a>
            {" "}— and its fee comes off your first invoice.
          </p>
        </Fade>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Matrix                              */
/* ───────────────────────────────────── */
function Dot({ on }: { on:boolean }) {
  if (on) return (
    <div style={{ width:24, height:24, borderRadius:"50%", background:`${GREEN}1A`,
      display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto" }}>
      <Check size={13} color={GREEN} strokeWidth={2.5} />
    </div>
  );
  return (
    <div style={{ width:24, height:24, borderRadius:"50%", background:"rgba(11,13,18,.05)",
      display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto" }}>
      <Minus size={13} color={INK_SOFT} strokeWidth={2.5} />
    </div>
  );
}

function Matrix() {
  const heads = ["Coach", "Fractional CTO", "Embedded Division"];
  return (
    <section style={{ background:CREAM2, padding:"88px 24px" }}>
      <div style={{ maxWidth:940, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <SectionLabel>Side by side</SectionLabel>
            <H2 style={{ maxWidth:560, margin:"0 auto 0" }}>What's actually included.</H2>
          </div>
        </Fade>
        <Fade delay={0.08}>
          <div style={{ background:CREAM, border:`1px solid ${LINE}`, borderRadius:12, overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr 1fr 1fr", borderBottom:`1px solid ${LINE}` }}>
              <div style={{ padding:"16px 20px" }} />
              {heads.map((h, i) => (
                <div key={h} style={{ padding:"16px 12px", textAlign:"center",
                  background:i===1?`${ACCENT}0D`:"transparent", borderLeft:`1px solid ${LINE}` }}>
                  <span style={{ fontSize:13, fontWeight:700, color:i===1?ACCENT:INK_SOFT, fontFamily:HG }}>{h}</span>
                  {i===1 && <div style={{ width:6, height:6, borderRadius:"50%", background:ACCENT, margin:"5px auto 0" }} />}
                </div>
              ))}
            </div>
            {MATRIX.map((row, i) => (
              <div key={row.feature} style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr 1fr 1fr",
                borderBottom:i<MATRIX.length-1?`1px solid ${LINE}`:"none",
                background:i%2===0?"transparent":`${CREAM2}66` }}>
                <div style={{ padding:"14px 20px" }}>
                  <span style={{ fontSize:14, fontWeight:500, color:INK, fontFamily:HG }}>{row.feature}</span>
                </div>
                {[row.coach, row.cto, row.partner].map((v, ci) => (
                  <div key={ci} style={{ padding:"14px 12px", display:"flex", alignItems:"center", justifyContent:"center",
                    background:ci===1?`${ACCENT}07`:"transparent", borderLeft:`1px solid ${LINE}` }}>
                    <Dot on={v} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Add-ons                             */
/* ───────────────────────────────────── */
function AddOns() {
  return (
    <section style={{ background:CREAM, padding:"88px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <SectionLabel>Add-ons</SectionLabel>
            <H2 style={{ maxWidth:560, margin:"0 auto 0" }}>Bolt on what you need.</H2>
          </div>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ADD_ONS.map((a, i) => (
            <Fade key={a.name} delay={i*0.07}>
              <div style={{ background:CREAM2, border:`1px solid ${LINE}`, borderRadius:12, padding:"26px 24px", height:"100%" }}>
                <h3 style={{ fontSize:17, fontWeight:700, color:INK, marginBottom:6, letterSpacing:"-0.01em", fontFamily:HG }}>{a.name}</h3>
                <div className="anton" style={{ fontSize:22, color:ACCENT, lineHeight:1, marginBottom:12 }}>{a.price}</div>
                <p style={{ fontSize:14.5, lineHeight:1.62, color:INK_SOFT, fontFamily:HG, margin:0 }}>{a.body}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Principles                          */
/* ───────────────────────────────────── */
function Principles() {
  return (
    <section style={{ background:INK, padding:"88px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <SectionLabel>How pricing works</SectionLabel>
            <H2 onDark style={{ maxWidth:620, margin:"0 auto 14px" }}>Six rules we won't bend.</H2>
            <p style={{ fontSize:16.5, color:"rgba(244,239,227,.55)", maxWidth:560, margin:"0 auto", fontFamily:HG, lineHeight:1.65 }}>
              Consulting gets a bad name from hourly billing, scope games, and rented software. None of that happens here.
            </p>
          </div>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRINCIPLES.map((p, i) => (
            <Fade key={p.title} delay={i*0.06}>
              <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)",
                borderRadius:12, padding:"26px 24px", height:"100%" }}>
                <h3 style={{ fontSize:16.5, fontWeight:700, color:CREAM, marginBottom:9, letterSpacing:"-0.01em", fontFamily:HG }}>{p.title}</h3>
                <p style={{ fontSize:14.5, lineHeight:1.62, color:"rgba(244,239,227,.55)", fontFamily:HG, margin:0 }}>{p.body}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Cost-of-hire comparison             */
/* ───────────────────────────────────── */
function VsHire() {
  const rows: [string, string, string][] = VS_HIRE.map(r => [r.label, r.hire, r.jdl]);
  return (
    <section style={{ background:CREAM2, padding:"88px 24px" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <SectionLabel>The honest math</SectionLabel>
            <H2 style={{ maxWidth:600, margin:"0 auto 0" }}>Fractional CTO vs. a full-time AI hire.</H2>
          </div>
        </Fade>
        <Fade delay={0.08}>
          <div style={{ background:CREAM, border:`1px solid ${LINE}`, borderRadius:12, overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderBottom:`1px solid ${LINE}` }}>
              <div style={{ padding:"16px 20px" }} />
              {["Full-time AI hire","Fractional AI CTO"].map((h, i) => (
                <div key={h} style={{ padding:"16px 16px", textAlign:"center",
                  background:i===1?`${ACCENT}0D`:"transparent", borderLeft:`1px solid ${LINE}` }}>
                  <span style={{ fontSize:13.5, fontWeight:700, color:i===1?ACCENT:INK_SOFT, fontFamily:HG }}>{h}</span>
                </div>
              ))}
            </div>
            {rows.map(([label, hire, jdl], i) => (
              <div key={label} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
                borderBottom:i<rows.length-1?`1px solid ${LINE}`:"none",
                background:i%2===0?"transparent":`${CREAM2}66` }}>
                <div style={{ padding:"15px 20px" }}>
                  <span style={{ fontSize:14, fontWeight:700, color:INK, fontFamily:HG }}>{label}</span>
                </div>
                <div style={{ padding:"15px 16px", borderLeft:`1px solid ${LINE}` }}>
                  <span style={{ fontSize:14, color:INK_SOFT, fontFamily:HG }}>{hire}</span>
                </div>
                <div style={{ padding:"15px 16px", borderLeft:`1px solid ${LINE}`, background:`${ACCENT}07` }}>
                  <span style={{ fontSize:14, fontWeight:600, color:INK, fontFamily:HG }}>{jdl}</span>
                </div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  FAQ                                 */
/* ───────────────────────────────────── */
function PricingFAQ() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <section style={{ background:CREAM, padding:"88px 24px" }}>
      <div style={{ maxWidth:760, margin:"0 auto" }}>
        <Fade>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <SectionLabel>Pricing FAQ</SectionLabel>
            <H2 style={{ margin:"0 auto 0" }}>The questions operators actually ask.</H2>
          </div>
        </Fade>
        <Fade delay={0.08}>
          <div style={{ borderTop:`1px solid ${LINE}` }}>
            {PRICING_FAQ.map((item, i) => (
              <div key={item.q} style={{ borderBottom:`1px solid ${LINE}` }}>
                <button onClick={() => setOpen(open===i?null:i)}
                  style={{ width:"100%", textAlign:"left", padding:"20px 0", border:"none", background:"none",
                    cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
                  <span style={{ fontSize:16.5, fontWeight:700, color:INK, letterSpacing:"-0.01em", fontFamily:HG }}>{item.q}</span>
                  <motion.span animate={{ rotate:open===i?45:0 }} transition={{ duration:0.2 }} style={{ flex:"0 0 auto", color:ACCENT }}>
                    <Plus size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open===i && (
                    <motion.div key="body" initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
                      exit={{ height:0, opacity:0 }} transition={{ duration:0.28, ease:"easeInOut" }} style={{ overflow:"hidden" }}>
                      <p style={{ paddingBottom:20, color:INK_SOFT, fontSize:15.5, lineHeight:1.65, fontFamily:HG }}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ───────────────────────────────────── */
/*  Final CTA + footer                  */
/* ───────────────────────────────────── */
function FinalCTA({ onBook }: { onBook:()=>void }) {
  return (
    <section style={{ background:ACCENT, padding:"80px 24px" }}>
      <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center" }}>
        <Fade>
          <h2 className="anton" style={{ fontSize:"clamp(1.9rem,3.8vw,2.6rem)", color:"#fff", marginBottom:16 }}>
            Not sure which tier fits?
          </h2>
          <p style={{ fontSize:17, lineHeight:1.7, color:"rgba(255,255,255,.85)", maxWidth:520, margin:"0 auto 28px", fontFamily:HG }}>
            That's what the free call is for. Forty-five minutes, no pitch — we'll tell you which tier fits,
            or that none of them do. Plenty of operators leave with a plan and no invoice.
          </p>
          <PrimaryBtn onClick={onBook} light>Book your free call <ArrowRight size={16} /></PrimaryBtn>
        </Fade>
      </div>
    </section>
  );
}

function MiniFooter() {
  const link: React.CSSProperties = { fontSize:13, color:"rgba(244,239,227,.45)", textDecoration:"none", fontFamily:HG };
  return (
    <footer style={{ background:INK2, padding:"36px 24px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto", display:"flex", alignItems:"center",
        justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
        <p style={{ fontSize:13, color:"rgba(244,239,227,.32)", fontFamily:HG, margin:0 }}>
          © 2026 Jobs Done Labs · All rights reserved.
        </p>
        <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
          <a href="https://makeitryne.ai" target="_blank" rel="noopener noreferrer" style={{ ...link, color:ACCENT, fontWeight:600 }}>
            Free AI builds &amp; prompts
          </a>
          <Link href="/contact" style={link}>Contact</Link>
          <Link href="/privacy" style={link}>Privacy</Link>
          <Link href="/terms" style={link}>Terms</Link>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────────────────── */
/*  Page                                */
/* ───────────────────────────────────── */
export default function Pricing() {
  const [showBooking, setShowBooking] = useState(false);
  const [intent, setIntent] = useState<BookingIntent>("pricing-hero");
  const open = (i: BookingIntent) => { setIntent(i); setShowBooking(true); };

  // The page is client-routed, so title/description/canonical are set on mount and
  // restored on unmount. If this page ever needs to rank on its own, pre-render it
  // into public/pricing/index.html the way the industries pages are handled.
  useEffect(() => {
    const desc = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const prev = {
      title: document.title,
      desc: desc?.getAttribute("content") ?? null,
      canonical: canonical?.getAttribute("href") ?? null,
    };
    document.title = "Engagements & Pricing — Fractional AI CTO | Jobs Done Labs";
    desc?.setAttribute(
      "content",
      "Fractional AI CTO and AI consulting retainers for $1M+ operators. Coaching from $4,500/mo, Fractional AI CTO $12,000/mo, Embedded AI Division from $25,000/mo. Starts with a $7,500 AI Operating Blueprint, credited back.",
    );
    canonical?.setAttribute("href", "https://www.jobsdonelabs.ai/pricing");
    return () => {
      document.title = prev.title;
      if (prev.desc !== null) desc?.setAttribute("content", prev.desc);
      if (prev.canonical !== null) canonical?.setAttribute("href", prev.canonical);
    };
  }, []);

  return (
    <div style={{ background:CREAM, color:INK, fontFamily:"'Hanken Grotesk',system-ui,sans-serif", WebkitFontSmoothing:"antialiased" }}>
      <PricingNav onBook={() => open("nav")} />
      <PricingHero onBook={() => open("pricing-hero")} />
      <Ladder />
      <BlueprintBand onBook={() => open("blueprint")} />
      <Tiers onBook={open} />
      <Matrix />
      <VsHire />
      <AddOns />
      <Principles />
      <PricingFAQ />
      <FinalCTA onBook={() => open("pricing-final")} />
      <MiniFooter />
      <BookingModal open={showBooking} onClose={() => setShowBooking(false)} intent={intent} />
    </div>
  );
}
