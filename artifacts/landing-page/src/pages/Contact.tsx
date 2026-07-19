import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import { Link } from "wouter";
import { Mail, Clock, MapPin } from "lucide-react";

const CREAM    = "#F4EFE3";
const CREAM2   = "#EFE8D8";
const INK      = "#0B0D12";
const INK2     = "#11131B";
const INK_SOFT = "#54596A";
const LINE     = "rgba(11,13,18,.12)";
const ACCENT   = "#1466FF";

const HG = "'Hanken Grotesk',sans-serif";

const fieldLabel: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: "0.09em",
  textTransform: "uppercase",
  color: INK_SOFT,
  fontFamily: HG,
  marginBottom: 8,
};

const fieldInput: React.CSSProperties = {
  width: "100%",
  background: CREAM,
  border: `1.5px solid ${LINE}`,
  borderRadius: 12,
  padding: "14px 16px",
  fontSize: 16,
  fontWeight: 500,
  color: INK,
  fontFamily: HG,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color .15s",
};

function ContactChip({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
      <div style={{
        width:46, height:46, borderRadius:12, background:INK,
        display:"flex", alignItems:"center", justifyContent:"center",
        flexShrink:0, color:ACCENT,
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize:15, fontWeight:700, color:INK, fontFamily:HG, margin:0, lineHeight:1.3 }}>{title}</p>
        <p style={{ fontSize:13.5, color:INK_SOFT, fontFamily:HG, margin:"3px 0 0" }}>{sub}</p>
      </div>
    </div>
  );
}

// Lead capture → GoHighLevel. In GHL, create a Workflow with an "Inbound Webhook"
// trigger, copy its URL, and paste it below. Each submission POSTs the form as
// JSON; the workflow maps the fields onto a contact and kicks off the
// nurture/booking sequence. The same submit fires a Plausible "Contact Form
// Submit" event so the funnel step is measurable.
const GHL_INBOUND_WEBHOOK = ""; // ← paste GHL inbound webhook URL here

export default function Contact() {
  const [showBooking, setShowBooking] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    fullName:"", email:"", phone:"", company:"", industry:"", revenue:"", leaking:"",
    smsConsent: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm(prev => ({ ...prev, [target.name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setError(false);
    setSending(true);

    // Funnel measurement (Plausible custom event). No-op until events are enabled.
    try {
      (window as unknown as { plausible?: (e: string, o?: unknown) => void }).plausible?.(
        "Contact Form Submit",
        { props: { industry: form.industry || "n/a", revenue: form.revenue || "n/a" } },
      );
    } catch { /* analytics must never block the lead */ }

    // Lead capture → GoHighLevel inbound webhook.
    try {
      if (!GHL_INBOUND_WEBHOOK) throw new Error("GHL webhook not configured");
      const res = await fetch(GHL_INBOUND_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.fullName,
          first_name: form.fullName.trim().split(" ")[0] || form.fullName,
          last_name: form.fullName.trim().split(" ").slice(1).join(" "),
          email: form.email,
          phone: form.phone,
          company: form.company,
          industry: form.industry,
          revenue: form.revenue,
          painpoint: form.leaking,
          sms_consent: form.smsConsent,
          source: "jobsdonelabs.ai — contact form",
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  function focusBlue(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = ACCENT;
  }
  function blurLine(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = LINE;
  }

  return (
    <div style={{ minHeight:"100vh", background:CREAM, color:INK, fontFamily:HG, display:"flex", flexDirection:"column" }}>

      <main style={{ maxWidth:1040, margin:"0 auto", padding:"48px 24px 80px", flex:1, width:"100%" }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom:52 }}>
          <Link href="/">
            <span style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:14,
              fontWeight:600, color:INK_SOFT, cursor:"pointer", fontFamily:HG }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color=INK}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color=INK_SOFT}>
              ← Back to home
            </span>
          </Link>
        </div>

        {/* Two-column grid */}
        <div className="contact-grid"
          style={{ display:"grid", gridTemplateColumns:"1fr 1.25fr", gap:56, alignItems:"start" }}>

          {/* ── Left column ── */}
          <div>
            {/* Square eyebrow */}
            <div style={{ display:"inline-flex", marginBottom:22 }}>
              <span style={{ fontSize:11, fontWeight:800, letterSpacing:"0.12em",
                textTransform:"uppercase", color:"#fff", background:ACCENT,
                padding:"5px 11px", borderRadius:0, fontFamily:HG }}>Contact</span>
            </div>

            {/* Headline */}
            <h2 className="anton" style={{ fontSize:"clamp(2rem,3.6vw,2.9rem)",
              lineHeight:1.06, color:INK, marginBottom:20, marginTop:0 }}>
              Let's find your $30K.
            </h2>

            {/* Blurb */}
            <p style={{ fontSize:18, lineHeight:1.68, color:INK_SOFT,
              fontFamily:HG, maxWidth:420, marginBottom:40 }}>
              The fastest way to start is to book a free Profit Recovery Audit. Prefer to send a note first? Use the form and we'll get back within one business day.
            </p>

            {/* Contact chips */}
            <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
              <ContactChip
                icon={<Mail size={19} />}
                title="ryne@jobsdone.io"
                sub="Email us anytime"
              />
              <ContactChip
                icon={<Clock size={19} />}
                title="Mon–Fri · 9am–6pm"
                sub="We reply within 1 business day"
              />
              <ContactChip
                icon={<MapPin size={19} />}
                title="Remote-first"
                sub="Serving operators across North America"
              />
            </div>
          </div>

          {/* ── Right column: form card ── */}
          <div style={{
            background: CREAM2,
            border: `1.5px solid ${LINE}`,
            borderRadius: 22,
            padding: 38,
          }}>
            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:20 }}>

              {/* Full name */}
              <div>
                <label style={fieldLabel}>Full Name</label>
                <input name="fullName" type="text" placeholder="Jane Operator"
                  value={form.fullName} onChange={handleChange} required
                  style={fieldInput} onFocus={focusBlue} onBlur={blurLine} />
              </div>

              {/* Work email */}
              <div>
                <label style={fieldLabel}>Work Email</label>
                <input name="email" type="email" placeholder="jane@yourbusiness.com"
                  value={form.email} onChange={handleChange} required
                  style={fieldInput} onFocus={focusBlue} onBlur={blurLine} />
              </div>

              {/* Phone number */}
              <div>
                <label style={fieldLabel}>Phone Number</label>
                <input name="phone" type="tel" placeholder="(555) 000-0000"
                  value={form.phone} onChange={handleChange} required
                  style={fieldInput} onFocus={focusBlue} onBlur={blurLine} />
              </div>

              {/* Company */}
              <div>
                <label style={fieldLabel}>Company</label>
                <input name="company" type="text" placeholder="Your business"
                  value={form.company} onChange={handleChange}
                  style={fieldInput} onFocus={focusBlue} onBlur={blurLine} />
              </div>

              {/* Industry */}
              <div>
                <label style={fieldLabel}>Industry</label>
                <select name="industry" value={form.industry} onChange={handleChange}
                  style={{ ...fieldInput,
                    appearance:"none",
                    backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2354596A' stroke-width='1.6' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat:"no-repeat", backgroundPosition:"right 16px center",
                    paddingRight:40, cursor:"pointer",
                  }}
                  onFocus={focusBlue} onBlur={blurLine}>
                  <option value="">Select industry…</option>
                  <option>Service businesses</option>
                  <option>Logistics &amp; transportation</option>
                  <option>Manufacturing &amp; industrial</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Annual revenue */}
              <div>
                <label style={fieldLabel}>Annual Revenue</label>
                <select name="revenue" value={form.revenue} onChange={handleChange}
                  style={{ ...fieldInput,
                    appearance:"none",
                    backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2354596A' stroke-width='1.6' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat:"no-repeat", backgroundPosition:"right 16px center",
                    paddingRight:40, cursor:"pointer",
                  }}
                  onFocus={focusBlue} onBlur={blurLine}>
                  <option value="">Select range…</option>
                  <option>$1M – $3M</option>
                  <option>$3M – $10M</option>
                  <option>$10M – $25M</option>
                  <option>$25M+</option>
                </select>
              </div>

              {/* What's leaking */}
              <div>
                <label style={fieldLabel}>
                  What's Leaking?{" "}
                  <span style={{ fontWeight:500, textTransform:"none", letterSpacing:0, fontSize:12 }}>(optional)</span>
                </label>
                <textarea name="leaking" rows={4}
                  placeholder="Tell us where you think profit is slipping away…"
                  value={form.leaking} onChange={handleChange}
                  style={{ ...fieldInput, minHeight:120, resize:"vertical", lineHeight:1.6 }}
                  onFocus={focusBlue} onBlur={blurLine} />
              </div>

              {/* SMS consent checkbox */}
              <label style={{
                display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer",
                padding:"14px 16px", borderRadius:12,
                background:"rgba(11,13,18,.04)", border:`1px solid ${LINE}`,
              }}>
                <input
                  name="smsConsent"
                  type="checkbox"
                  checked={form.smsConsent}
                  onChange={handleChange}
                  style={{ marginTop:3, width:16, height:16, accentColor:ACCENT, flexShrink:0, cursor:"pointer" }}
                />
                <span style={{ fontSize:13, lineHeight:1.55, color:INK_SOFT, fontFamily:HG }}>
                  I consent to receive informational text messages from JobsDone Inc. regarding my inquiry, project updates, and customer support. Message frequency varies. Message and data rates may apply. Reply <strong>HELP</strong> for help or <strong>STOP</strong> to opt out.
                </span>
              </label>

              {/* Submit */}
              <button type="submit" disabled={sent || sending}
                style={{
                  width:"100%", padding:"16px", borderRadius:14,
                  border:"none", background: sent ? "#2a7a2a" : ACCENT,
                  color:"#fff", fontSize:16, fontWeight:800,
                  cursor: sent || sending ? "default" : "pointer",
                  fontFamily:HG,
                  transition:"background .3s",
                  opacity: sending ? 0.8 : 1,
                  boxShadow: sent ? "none" : `0 6px 24px -6px ${ACCENT}88`,
                }}>
                {sent ? "Sent — we'll be in touch ✓" : sending ? "Sending…" : "Send message →"}
              </button>

              {error && (
                <p style={{ fontSize:13, color:ACCENT, fontFamily:HG, marginTop:-6 }}>
                  Something went wrong sending that. Please email{" "}
                  <a href="mailto:ryne@jobsdone.io" style={{ color:ACCENT, fontWeight:700 }}>ryne@jobsdone.io</a>{" "}
                  and we'll jump on it.
                </p>
              )}

              {/* Privacy & Terms links — visible directly below the form */}
              <p style={{ fontSize:12, color:INK_SOFT, fontFamily:HG, lineHeight:1.6, margin:"4px 0 0", textAlign:"center" }}>
                By submitting, you agree to our{" "}
                <Link href="/privacy">
                  <span style={{ color:ACCENT, fontWeight:600, cursor:"pointer", textDecoration:"underline" }}>Privacy Policy</span>
                </Link>
                {" "}and{" "}
                <Link href="/terms">
                  <span style={{ color:ACCENT, fontWeight:600, cursor:"pointer", textDecoration:"underline" }}>Terms of Service</span>
                </Link>.
              </p>

            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background:INK2, padding:"28px 24px" }}>
        <div style={{ maxWidth:1040, margin:"0 auto", display:"flex",
          alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", fontFamily:HG }}>
            © 2026 Jobs Done Labs. All rights reserved.
          </p>
          <div style={{ display:"flex", gap:22 }}>
            {[["Privacy Policy","/privacy"],["Terms of Service","/terms"],["ROI Calculator","/roi-calculator"]].map(([label,href]) => (
              <Link key={label} href={href}>
                <span style={{ fontSize:13, color:"rgba(255,255,255,.45)", cursor:"pointer", fontFamily:HG }}>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <BookingModal open={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
}
