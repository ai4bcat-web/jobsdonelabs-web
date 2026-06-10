import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Mail, Clock, MapPin, CheckCircle2, Loader2 } from "lucide-react";

const CREAM    = "#F4EFE3";
const CREAM2   = "#EFE8D8";
const INK      = "#0B0D12";
const INK2     = "#11131B";
const INK_SOFT = "#54596A";
const LINE     = "rgba(11,13,18,.12)";
const ACCENT   = "#1466FF";

function Logo() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, userSelect:"none" }}>
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none">
        <path d="M18 7 H30 M20 7 V19 L11.5 38 Q10 41.5 13.8 41.5 H34.2 Q38 41.5 36.5 38 L28 19 V7"
          stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="20.5" y1="25.5" x2="26" y2="30.5" stroke={ACCENT} strokeWidth="2" strokeLinecap="round"/>
        <line x1="26" y1="30.5" x2="20.5" y2="35.5" stroke={ACCENT} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20.5" cy="25.5" r="2.6" fill={ACCENT}/>
        <circle cx="26.5" cy="30.5" r="2.6" fill={ACCENT}/>
        <circle cx="20.5" cy="35.5" r="2.6" fill={ACCENT}/>
      </svg>
      <div style={{ display:"flex", flexDirection:"column", lineHeight:1 }}>
        <span style={{ fontStyle:"italic", fontWeight:800, fontSize:17, letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif" }}>
          <span style={{ color:INK }}>JOBS</span><span style={{ color:ACCENT }}>DONE</span>
        </span>
        <span style={{ display:"flex", alignItems:"center", gap:"0.4em", marginTop:4, fontWeight:700, fontSize:5, letterSpacing:"0.42em", color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>
          <span style={{ flex:1, height:1.5, background:"currentColor", opacity:0.5 }} />
          <span style={{ paddingLeft:"0.42em" }}>LABS</span>
          <span style={{ flex:1, height:1.5, background:"currentColor", opacity:0.5 }} />
        </span>
      </div>
    </div>
  );
}

const inputStyle = {
  width:"100%", padding:"12px 14px", borderRadius:8,
  border:`1px solid ${LINE}`, background:CREAM, color:INK,
  fontSize:14.5, fontFamily:"'Hanken Grotesk',sans-serif",
  outline:"none", boxSizing:"border-box" as const,
};

const labelStyle = {
  fontSize:11, fontWeight:700, letterSpacing:"0.1em",
  textTransform:"uppercase" as const, color:INK_SOFT,
  fontFamily:"'Hanken Grotesk',sans-serif", marginBottom:6, display:"block",
};

export default function Contact() {
  const [showBooking, setShowBooking] = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [form, setForm] = useState({
    fullName:"", email:"", company:"",
    industry:"", revenue:"", leaking:"",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]:value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div style={{ minHeight:"100vh", background:CREAM, color:INK,
      fontFamily:"'Hanken Grotesk',sans-serif", display:"flex", flexDirection:"column" }}>

      {/* Nav */}
      <header style={{ position:"sticky", top:0, zIndex:50,
        background:"rgba(244,239,227,.92)", backdropFilter:"blur(14px)",
        borderBottom:`1px solid ${LINE}` }}>
        <div style={{ maxWidth:1120, margin:"0 auto", padding:"0 24px",
          height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <Link href="/"><Logo /></Link>
          <nav style={{ display:"flex", alignItems:"center", gap:28 }}>
            {[["Services","/#services"],["Industries","/#industries"],["ROI Calculator","/roi-calculator"]].map(([label,href]) => (
              <Link key={label} href={href}>
                <span style={{ fontSize:14, fontWeight:600, color:INK_SOFT, cursor:"pointer",
                  fontFamily:"'Hanken Grotesk',sans-serif", textDecoration:"none" }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color=INK}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color=INK_SOFT}>
                  {label}
                </span>
              </Link>
            ))}
            <button onClick={() => setShowBooking(true)}
              style={{ background:ACCENT, color:"#fff", border:"none", borderRadius:50,
                padding:"10px 22px", fontSize:14, fontWeight:700, cursor:"pointer",
                fontFamily:"'Hanken Grotesk',sans-serif", boxShadow:`0 4px 16px -4px ${ACCENT}66` }}>
              Book a Call
            </button>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth:1120, margin:"0 auto", padding:"40px 24px 80px", flex:1 }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom:44 }}>
          <Link href="/">
            <span style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13.5,
              fontWeight:600, color:INK_SOFT, cursor:"pointer", textDecoration:"none" }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color=INK}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color=INK_SOFT}>
              <ArrowLeft size={14} /> Back to home
            </span>
          </Link>
        </div>

        {submitted ? (
          <SuccessState name={form.fullName} onBook={() => setShowBooking(true)} />
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:64, alignItems:"start" }}
            className="contact-grid">

            {/* Left: info */}
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:7,
                border:`1.5px solid ${ACCENT}`, borderRadius:50,
                padding:"4px 12px", marginBottom:24 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:ACCENT, flexShrink:0 }} />
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em",
                  textTransform:"uppercase", color:ACCENT,
                  fontFamily:"'Hanken Grotesk',sans-serif" }}>Contact</span>
              </div>

              <h1 className="anton" style={{ fontSize:"clamp(2rem,3.8vw,3rem)",
                lineHeight:1.05, color:INK, marginBottom:20 }}>
                Let's find your<br />$30K.
              </h1>

              <p style={{ fontSize:15.5, lineHeight:1.7, color:INK_SOFT, marginBottom:36,
                fontFamily:"'Hanken Grotesk',sans-serif" }}>
                The fastest way to start is to book a free Profit Recovery Audit. Prefer to send a note first? Use the form and we'll get back within one business day.
              </p>

              {/* Info items */}
              <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                {[
                  { icon:<Mail size={18}/>, title:"ryne@jobsdone.io", sub:"Email us anytime" },
                  { icon:<Clock size={18}/>, title:"Mon–Fri · 9am–6pm", sub:"We reply within 1 business day" },
                  { icon:<MapPin size={18}/>, title:"Remote-first", sub:"Serving operators across North America" },
                ].map(item => (
                  <div key={item.title} style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                    <div style={{ width:44, height:44, borderRadius:10, background:INK,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      flexShrink:0, color:"#fff" }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontSize:14.5, fontWeight:700, color:INK,
                        fontFamily:"'Hanken Grotesk',sans-serif", marginBottom:2 }}>{item.title}</p>
                      <p style={{ fontSize:13, color:INK_SOFT,
                        fontFamily:"'Hanken Grotesk',sans-serif" }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form card */}
            <div style={{ background:CREAM2, border:`1px solid ${LINE}`, borderRadius:16,
              padding:"36px 32px" }}>
              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:20 }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input name="fullName" type="text" placeholder="Jane Operator"
                    value={form.fullName} onChange={handleChange} required
                    style={inputStyle}
                    onFocus={e=>(e.currentTarget.style.borderColor=ACCENT)}
                    onBlur={e=>(e.currentTarget.style.borderColor=LINE)} />
                </div>

                <div>
                  <label style={labelStyle}>Work Email</label>
                  <input name="email" type="email" placeholder="jane@yourbusiness.com"
                    value={form.email} onChange={handleChange} required
                    style={inputStyle}
                    onFocus={e=>(e.currentTarget.style.borderColor=ACCENT)}
                    onBlur={e=>(e.currentTarget.style.borderColor=LINE)} />
                </div>

                <div>
                  <label style={labelStyle}>Company</label>
                  <input name="company" type="text" placeholder="Your business"
                    value={form.company} onChange={handleChange}
                    style={inputStyle}
                    onFocus={e=>(e.currentTarget.style.borderColor=ACCENT)}
                    onBlur={e=>(e.currentTarget.style.borderColor=LINE)} />
                </div>

                <div>
                  <label style={labelStyle}>Industry</label>
                  <select name="industry" value={form.industry} onChange={handleChange}
                    style={{ ...inputStyle, appearance:"none" as const,
                      backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2354596A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat:"no-repeat", backgroundPosition:"right 14px center",
                      paddingRight:36, cursor:"pointer" }}>
                    <option value="">Select industry…</option>
                    <option>Home service (HVAC, plumbing, etc.)</option>
                    <option>Freight &amp; logistics</option>
                    <option>Manufacturing</option>
                    <option>Auto transport</option>
                    <option>Food service distribution</option>
                    <option>Wholesale &amp; supply</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Annual Revenue</label>
                  <select name="revenue" value={form.revenue} onChange={handleChange}
                    style={{ ...inputStyle, appearance:"none" as const,
                      backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2354596A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat:"no-repeat", backgroundPosition:"right 14px center",
                      paddingRight:36, cursor:"pointer" }}>
                    <option value="">Select range…</option>
                    <option>$1M – $3M</option>
                    <option>$3M – $5M</option>
                    <option>$5M – $10M</option>
                    <option>$10M – $25M</option>
                    <option>$25M+</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>What's leaking? <span style={{ fontWeight:400, textTransform:"none", fontSize:10 }}>(optional)</span></label>
                  <textarea name="leaking" rows={4}
                    placeholder="Tell us where you think profit is slipping away…"
                    value={form.leaking} onChange={handleChange}
                    style={{ ...inputStyle, resize:"vertical", lineHeight:1.6 }}
                    onFocus={e=>(e.currentTarget.style.borderColor=ACCENT)}
                    onBlur={e=>(e.currentTarget.style.borderColor=LINE)} />
                </div>

                <button type="submit" disabled={submitting}
                  style={{ width:"100%", padding:"15px", borderRadius:50, border:"none",
                    background:ACCENT, color:"#fff", fontSize:15, fontWeight:700,
                    cursor:submitting?"not-allowed":"pointer",
                    fontFamily:"'Hanken Grotesk',sans-serif",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                    opacity:submitting?.75:1, boxShadow:`0 6px 24px -6px ${ACCENT}88` }}>
                  {submitting
                    ? <><Loader2 size={16} style={{ animation:"spin 1s linear infinite" }} />Sending…</>
                    : <>Send message <ArrowRight size={16} /></>}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ background:INK2, padding:"28px 24px" }}>
        <div style={{ maxWidth:1120, margin:"0 auto", display:"flex",
          alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <p style={{ fontSize:13, color:"rgba(255,255,255,.35)",
            fontFamily:"'Hanken Grotesk',sans-serif" }}>
            © 2026 Jobs Done Labs. All rights reserved.
          </p>
          <div style={{ display:"flex", gap:20 }}>
            {[["Privacy Policy","/privacy"],["Terms of Service","/terms"],["ROI Calculator","/roi-calculator"]].map(([label,href]) => (
              <Link key={label} href={href}>
                <span style={{ fontSize:13, color:"rgba(255,255,255,.45)", cursor:"pointer",
                  fontFamily:"'Hanken Grotesk',sans-serif" }}>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <BookingModal open={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
}

function SuccessState({ name, onBook }: { name:string; onBook:()=>void }) {
  const first = name.split(" ")[0] || "there";
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
      textAlign:"center", padding:"64px 24px" }}>
      <div style={{ width:64, height:64, borderRadius:"50%", background:`${ACCENT}15`,
        display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24 }}>
        <CheckCircle2 size={32} style={{ color:ACCENT }} />
      </div>
      <h2 className="anton" style={{ fontSize:32, color:INK, marginBottom:12 }}>
        Thanks, {first}!
      </h2>
      <p style={{ fontSize:16, lineHeight:1.68, color:INK_SOFT, maxWidth:380,
        marginBottom:32, fontFamily:"'Hanken Grotesk',sans-serif" }}>
        We've got your message and will be in touch within one business day. Want to move faster?
      </p>
      <button onClick={onBook}
        style={{ display:"inline-flex", alignItems:"center", gap:8,
          fontWeight:700, fontSize:15, padding:"13px 28px", borderRadius:50,
          background:ACCENT, color:"#fff", border:"none", cursor:"pointer",
          boxShadow:`0 4px 16px -4px ${ACCENT}55`,
          fontFamily:"'Hanken Grotesk',sans-serif", marginBottom:16 }}>
        Book your free audit <ArrowRight size={16} />
      </button>
      <Link href="/">
        <span style={{ fontSize:13, color:INK_SOFT, cursor:"pointer" }}>← Back to home</span>
      </Link>
    </div>
  );
}
