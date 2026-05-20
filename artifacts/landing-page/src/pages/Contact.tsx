import { useState } from "react";
import { Link } from "wouter";
import { FlaskConical, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

const BG = "#0E0E10";
const SURFACE = "#161618";
const BORDER = "#222226";
const TEXT = "#F0F0F0";
const MUTED = "#888892";
const ACCENT = "#1F62FF";
const CALENDLY = "https://api.leadconnectorhq.com/widget/bookings/jdl-audit-call-ryne";

function JobsDoneLogo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 cursor-pointer select-none">
        <FlaskConical className="w-5 h-5" style={{ color: ACCENT }} />
        <div className="flex flex-col leading-none">
          <span className="font-bold text-[15px] tracking-tight sg" style={{ color: TEXT }}>
            JOBS<span style={{ color: ACCENT }}>DONE</span>
          </span>
          <span className="text-[9px] tracking-[0.18em] font-medium sg" style={{ color: MUTED }}>LABS</span>
        </div>
      </div>
    </Link>
  );
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  smsConsent: boolean;
}

interface Errors {
  fullName?: string;
  email?: string;
  phone?: string;
  smsConsent?: string;
}

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.fullName.trim()) errors.fullName = "Full name is required.";
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[\d\s\-().]{7,}$/.test(form.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    smsConsent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between" style={{ background: `${BG}f0`, borderBottom: `1px solid ${BORDER}`, backdropFilter: "blur(12px)" }}>
        <JobsDoneLogo />
        <div className="flex items-center gap-6 text-[13px]" style={{ color: MUTED }}>
          <Link href="/" className="transition-colors hover:text-white" style={{ color: MUTED }}>Home</Link>
          <Link href="/terms" className="transition-colors hover:text-white" style={{ color: MUTED }}>Terms</Link>
          <Link href="/privacy" className="transition-colors hover:text-white" style={{ color: MUTED }}>Privacy</Link>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
            <button className="text-[13px] font-semibold px-4 py-1.5 rounded-lg transition-colors" style={{ background: ACCENT, color: "#fff" }}>
              Book a Call
            </button>
          </a>
        </div>
      </nav>

      <main className="max-w-lg mx-auto px-6 py-16">
        {submitted ? (
          <SuccessState name={form.fullName} />
        ) : (
          <>
            {/* Header */}
            <div className="mb-10">
              <p className="text-[12px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: ACCENT }}>Get in Touch</p>
              <h1 className="font-bold text-[2rem] leading-tight mb-3 sg" style={{ color: TEXT, letterSpacing: "-0.02em" }}>
                Contact information
              </h1>
              <p style={{ color: MUTED }} className="text-[15px] leading-relaxed">
                Answer these quick questions so we can see if you qualify. Takes under 60 seconds.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {/* Full Name */}
              <Field label="Full name" error={errors.fullName}>
                <input
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your answer."
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-all"
                  style={{
                    background: SURFACE,
                    border: `1px solid ${errors.fullName ? "#ef4444" : BORDER}`,
                    color: TEXT,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = errors.fullName ? "#ef4444" : BORDER)}
                />
              </Field>

              {/* Email */}
              <Field label="Email" error={errors.email} hint="Jobsdone Inc. may contact you to follow up.">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your answer."
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-all"
                  style={{
                    background: SURFACE,
                    border: `1px solid ${errors.email ? "#ef4444" : BORDER}`,
                    color: TEXT,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = errors.email ? "#ef4444" : BORDER)}
                />
              </Field>

              {/* Phone */}
              <Field label="Phone number" error={errors.phone} hint="Jobsdone Inc. may contact you to follow up.">
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Enter your answer."
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-all"
                  style={{
                    background: SURFACE,
                    border: `1px solid ${errors.phone ? "#ef4444" : BORDER}`,
                    color: TEXT,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = errors.phone ? "#ef4444" : BORDER)}
                />
              </Field>

              {/* Divider */}
              <div className="pt-2 pb-1">
                <div style={{ borderTop: `1px solid ${BORDER}` }} />
              </div>

              {/* Consent to Contact section */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-semibold text-[15px] mb-2" style={{ color: TEXT }}>Consent to Contact</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
                    By submitting this form and providing your phone number, you agree to receive SMS messages from Jobsdone Inc. about your inquiry. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. View our{" "}
                    <Link href="/privacy" style={{ color: ACCENT }}>Privacy Policy</Link> and{" "}
                    <Link href="/terms" style={{ color: ACCENT }}>Terms</Link>.
                  </p>
                </div>

                {/* SMS opt-in checkbox */}
                <label className="flex gap-3 cursor-pointer p-4 rounded-xl transition-colors" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                  <div className="flex-shrink-0 mt-0.5">
                    <input
                      name="smsConsent"
                      type="checkbox"
                      checked={form.smsConsent}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center transition-all"
                      style={{
                        background: form.smsConsent ? ACCENT : "transparent",
                        border: `2px solid ${form.smsConsent ? ACCENT : MUTED}`,
                      }}
                    >
                      {form.smsConsent && (
                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                          <path d="M1 4L4 7L10 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
                    I agree to receive marketing and informational text messages from Jobsdone Inc at the phone number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out, HELP for help. View our{" "}
                    <Link href="/privacy" style={{ color: ACCENT }}>Privacy Policy</Link> and{" "}
                    <Link href="/terms" style={{ color: ACCENT }}>Terms of Service</Link>.
                  </p>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full font-semibold text-[15px] py-3.5 rounded-xl flex items-center justify-center gap-2 transition-opacity mt-2"
                style={{ background: ACCENT, color: "#fff", opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[12px]" style={{ color: MUTED }}>
                By clicking Submit, you agree to send your info to Jobsdone Inc. who agrees to use it according to their{" "}
                <Link href="/privacy" style={{ color: ACCENT }}>privacy policy</Link>.
              </p>
            </form>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 text-[13px]" style={{ borderTop: `1px solid ${BORDER}`, color: MUTED }}>
        <div className="max-w-lg mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="font-semibold mb-0.5" style={{ color: TEXT }}>Jobsdone Inc.</p>
            <p>414 N River Rd, Fox River Grove, IL 60021</p>
            <p><a href="mailto:support@jobsdonelabs.ai" style={{ color: ACCENT }}>support@jobsdonelabs.ai</a></p>
          </div>
          <div className="flex gap-4">
            <Link href="/terms" className="transition-colors hover:text-white" style={{ color: MUTED }}>Terms</Link>
            <Link href="/privacy" className="transition-colors hover:text-white" style={{ color: MUTED }}>Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium" style={{ color: TEXT }}>
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="text-[12px]" style={{ color: MUTED }}>{hint}</p>
      )}
      {error && (
        <p className="text-[12px]" style={{ color: "#ef4444" }}>{error}</p>
      )}
    </div>
  );
}

function SuccessState({ name }: { name: string }) {
  const firstName = name.split(" ")[0];
  return (
    <div className="flex flex-col items-center text-center py-10">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: `${ACCENT}15` }}>
        <CheckCircle2 className="w-8 h-8" style={{ color: ACCENT }} />
      </div>
      <h2 className="font-bold text-[1.75rem] mb-3 sg" style={{ color: TEXT, letterSpacing: "-0.02em" }}>
        Thanks, {firstName}!
      </h2>
      <p className="text-[15px] leading-relaxed mb-8 max-w-sm" style={{ color: MUTED }}>
        We've received your info and will be in touch shortly. In the meantime, you can book your audit call directly.
      </p>
      <a
        href={CALENDLY}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-semibold text-[15px] px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
        style={{ background: ACCENT, color: "#fff" }}
      >
        Book Your Audit Call
        <ArrowRight className="w-4 h-4" />
      </a>
      <Link href="/" className="mt-4 text-[13px] transition-colors hover:text-white" style={{ color: MUTED }}>
        ← Back to home
      </Link>
    </div>
  );
}
