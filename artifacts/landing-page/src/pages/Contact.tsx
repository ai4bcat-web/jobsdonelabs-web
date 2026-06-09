import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import { Link } from "wouter";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

const CREAM    = "#F4EFE3";
const CREAM2   = "#EFE8D8";
const INK      = "#0B0D12";
const INK_SOFT = "#54596A";
const LINE     = "rgba(11,13,18,.12)";
const ACCENT   = "#1466FF";

function SubLogo() {
  return (
    <Link href="/">
      <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", userSelect:"none", textDecoration:"none" }}>
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
          <path d="M18 7 H30 M20 7 V19 L11.5 38 Q10 41.5 13.8 41.5 H34.2 Q38 41.5 36.5 38 L28 19 V7"
            stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="20.5" y1="25.5" x2="26" y2="30.5" stroke={ACCENT} strokeWidth="2" strokeLinecap="round"/>
          <line x1="26" y1="30.5" x2="20.5" y2="35.5" stroke={ACCENT} strokeWidth="2" strokeLinecap="round"/>
          <circle cx="20.5" cy="25.5" r="2.6" fill={ACCENT}/>
          <circle cx="26.5" cy="30.5" r="2.6" fill={ACCENT}/>
          <circle cx="20.5" cy="35.5" r="2.6" fill={ACCENT}/>
        </svg>
        <div style={{ display:"flex", flexDirection:"column", lineHeight:1 }}>
          <span style={{ fontStyle:"italic", fontWeight:800, fontSize:16, letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif" }}>
            <span style={{ color:INK }}>JOBS</span><span style={{ color:ACCENT }}>DONE</span>
          </span>
          <span style={{ fontSize:5, fontWeight:700, letterSpacing:"0.42em", color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif", marginTop:3 }}>LABS</span>
        </div>
      </div>
    </Link>
  );
}

interface FormState { fullName:string; email:string; phone:string; smsConsent:boolean; }
interface Errors    { fullName?:string; email?:string; phone?:string; smsConsent?:string; }

function validate(form:FormState):Errors {
  const errors:Errors = {};
  if (!form.fullName.trim()) errors.fullName="Full name is required.";
  if (!form.email.trim()) {
    errors.email="Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email="Please enter a valid email address.";
  }
  if (!form.phone.trim()) {
    errors.phone="Phone number is required.";
  } else if (!/^\+?[\d\s\-().]{7,}$/.test(form.phone)) {
    errors.phone="Please enter a valid phone number.";
  }
  return errors;
}

export default function Contact() {
  const [form, setForm]           = useState<FormState>({ fullName:"", email:"", phone:"", smsConsent:false });
  const [errors, setErrors]       = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]  = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]:type==="checkbox"?checked:value }));
    if (errors[name as keyof Errors]) setErrors(prev => ({ ...prev, [name]:undefined }));
  }

  async function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length>0) { setErrors(errs); return; }
    setSubmitting(true);
    await new Promise(r=>setTimeout(r,900));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div style={{ background:CREAM2, minHeight:"100vh", color:INK, fontFamily:"'Hanken Grotesk',sans-serif" }}>
      <nav className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background:"rgba(244,239,227,.88)", backdropFilter:"blur(14px)", borderBottom:`1px solid ${LINE}` }}>
        <SubLogo />
        <div className="flex items-center gap-6" style={{ fontSize:13 }}>
          <Link href="/" style={{ color:INK_SOFT, textDecoration:"none", fontWeight:500 }}>Home</Link>
          <Link href="/terms" style={{ color:INK_SOFT, textDecoration:"none", fontWeight:500 }}>Terms</Link>
          <Link href="/privacy" style={{ color:INK_SOFT, textDecoration:"none", fontWeight:500 }}>Privacy</Link>
          <button onClick={() => setShowBooking(true)}
            style={{ fontSize:13, fontWeight:700, padding:"7px 16px", borderRadius:100, background:ACCENT, color:"#fff", border:"none", cursor:"pointer", fontFamily:"'Hanken Grotesk',sans-serif" }}>
            Book a Call
          </button>
        </div>
      </nav>

      <main className="max-w-lg mx-auto px-6 py-16">
        {submitted ? (
          <SuccessState name={form.fullName} onOpenBooking={() => setShowBooking(true)} />
        ) : (
          <>
            <div className="mb-10">
              <p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:ACCENT, marginBottom:12, fontFamily:"'Hanken Grotesk',sans-serif" }}>Get in Touch</p>
              <h1 className="anton" style={{ fontSize:"clamp(1.9rem,4vw,2.4rem)", color:INK, letterSpacing:"-0.01em", lineHeight:1.1, marginBottom:10 }}>
                Contact information
              </h1>
              <p style={{ color:INK_SOFT, fontSize:15, lineHeight:1.65, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                Answer these quick questions so we can see if you qualify. Takes under 60 seconds.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <Field label="Full name" error={errors.fullName}>
                <input name="fullName" type="text" autoComplete="name" placeholder="Enter your answer."
                  value={form.fullName} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-all"
                  style={{ background:CREAM, border:`1px solid ${errors.fullName?"#ef4444":LINE}`, color:INK, fontFamily:"'Hanken Grotesk',sans-serif" }}
                  onFocus={e=>(e.currentTarget.style.borderColor=ACCENT)}
                  onBlur={e=>(e.currentTarget.style.borderColor=errors.fullName?"#ef4444":LINE)} />
              </Field>

              <Field label="Email" error={errors.email} hint="Jobsdone Inc. may contact you to follow up.">
                <input name="email" type="email" autoComplete="email" placeholder="Enter your answer."
                  value={form.email} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-all"
                  style={{ background:CREAM, border:`1px solid ${errors.email?"#ef4444":LINE}`, color:INK, fontFamily:"'Hanken Grotesk',sans-serif" }}
                  onFocus={e=>(e.currentTarget.style.borderColor=ACCENT)}
                  onBlur={e=>(e.currentTarget.style.borderColor=errors.email?"#ef4444":LINE)} />
              </Field>

              <Field label="Phone number" error={errors.phone} hint="Jobsdone Inc. may contact you to follow up.">
                <input name="phone" type="tel" autoComplete="tel" placeholder="Enter your answer."
                  value={form.phone} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-all"
                  style={{ background:CREAM, border:`1px solid ${errors.phone?"#ef4444":LINE}`, color:INK, fontFamily:"'Hanken Grotesk',sans-serif" }}
                  onFocus={e=>(e.currentTarget.style.borderColor=ACCENT)}
                  onBlur={e=>(e.currentTarget.style.borderColor=errors.phone?"#ef4444":LINE)} />
              </Field>

              <div className="pt-2 pb-1">
                <div style={{ borderTop:`1px solid ${LINE}` }} />
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <p style={{ fontWeight:600, fontSize:15, marginBottom:8, color:INK, fontFamily:"'Hanken Grotesk',sans-serif" }}>Consent to Contact</p>
                  <p style={{ fontSize:13, lineHeight:1.65, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                    By submitting this form and providing your phone number, you agree to receive SMS messages from Jobsdone Inc. about your inquiry. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. View our{" "}
                    <Link href="/privacy" style={{ color:ACCENT }}>Privacy Policy</Link> and{" "}
                    <Link href="/terms" style={{ color:ACCENT }}>Terms</Link>.
                  </p>
                </div>
                <label className="flex gap-3 cursor-pointer p-4 rounded-xl transition-colors"
                  style={{ background:CREAM, border:`1px solid ${LINE}` }}>
                  <div className="flex-shrink-0 mt-0.5">
                    <input name="smsConsent" type="checkbox" checked={form.smsConsent} onChange={handleChange} className="sr-only" />
                    <div className="w-5 h-5 rounded flex items-center justify-center transition-all"
                      style={{ background:form.smsConsent?ACCENT:"transparent", border:`2px solid ${form.smsConsent?ACCENT:INK_SOFT}` }}>
                      {form.smsConsent && (
                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                          <path d="M1 4L4 7L10 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize:13, lineHeight:1.65, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                    I agree to receive marketing and informational text messages from Jobsdone Inc at the phone number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out, HELP for help. View our{" "}
                    <Link href="/privacy" style={{ color:ACCENT }}>Privacy Policy</Link> and{" "}
                    <Link href="/terms" style={{ color:ACCENT }}>Terms of Service</Link>.
                  </p>
                </label>
              </div>

              <button type="submit" disabled={submitting}
                className="w-full text-[15px] py-3.5 rounded-xl flex items-center justify-center gap-2 transition-opacity mt-2"
                style={{ background:ACCENT, color:"#fff", fontWeight:700, opacity:submitting?.7:1, border:"none", cursor:"pointer",
                  boxShadow:`0 4px 16px -4px ${ACCENT}55`, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin"/>Submitting…</> : <>Submit <ArrowRight className="w-4 h-4"/></>}
              </button>

              <p className="text-center" style={{ fontSize:12, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>
                By clicking Submit, you agree to send your info to Jobsdone Inc. who agrees to use it according to their{" "}
                <Link href="/privacy" style={{ color:ACCENT }}>privacy policy</Link>.
              </p>
            </form>
          </>
        )}
      </main>

      <footer className="py-8 px-6" style={{ borderTop:`1px solid ${LINE}` }}>
        <div className="max-w-lg mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div style={{ fontSize:13, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>
            <p style={{ fontWeight:600, marginBottom:2, color:INK }}>Jobsdone Inc.</p>
            <p>414 N River Rd, Fox River Grove, IL 60021</p>
            <p><a href="mailto:ryne@jobsdone.io" style={{ color:ACCENT }}>ryne@jobsdone.io</a></p>
          </div>
          <div className="flex gap-4" style={{ fontSize:13 }}>
            <Link href="/terms" style={{ color:INK_SOFT, textDecoration:"none" }}>Terms</Link>
            <Link href="/privacy" style={{ color:INK_SOFT, textDecoration:"none" }}>Privacy</Link>
          </div>
        </div>
      </footer>

      <BookingModal open={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
}

function Field({ label, error, hint, children }: { label:string; error?:string; hint?:string; children:React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontSize:13, fontWeight:600, color:INK, fontFamily:"'Hanken Grotesk',sans-serif" }}>{label}</label>
      {children}
      {hint && !error && <p style={{ fontSize:12, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>{hint}</p>}
      {error && <p style={{ fontSize:12, color:"#ef4444", fontFamily:"'Hanken Grotesk',sans-serif" }}>{error}</p>}
    </div>
  );
}

function SuccessState({ name, onOpenBooking }: { name:string; onOpenBooking:()=>void }) {
  const firstName = name.split(" ")[0];
  return (
    <div className="flex flex-col items-center text-center py-10">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background:`${ACCENT}15` }}>
        <CheckCircle2 className="w-8 h-8" style={{ color:ACCENT }} />
      </div>
      <h2 className="anton" style={{ fontSize:28, color:INK, letterSpacing:"-0.01em", marginBottom:10 }}>Thanks, {firstName}!</h2>
      <p style={{ fontSize:15, lineHeight:1.65, marginBottom:28, maxWidth:360, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>
        We've received your info and will be in touch shortly. In the meantime, you can book your audit call directly.
      </p>
      <button onClick={onOpenBooking}
        className="inline-flex items-center gap-2 transition-opacity hover:opacity-90"
        style={{ fontWeight:700, fontSize:15, padding:"12px 24px", borderRadius:100, background:ACCENT, color:"#fff", border:"none", cursor:"pointer", boxShadow:`0 4px 16px -4px ${ACCENT}55`, fontFamily:"'Hanken Grotesk',sans-serif" }}>
        Book Your Audit Call <ArrowRight className="w-4 h-4" />
      </button>
      <Link href="/" style={{ marginTop:16, fontSize:13, color:INK_SOFT, textDecoration:"none", display:"block" }}>← Back to home</Link>
    </div>
  );
}
