import { Link } from "wouter";
import { FlaskConical } from "lucide-react";

const BG = "#0E0E10";
const SURFACE = "#161618";
const BORDER = "#222226";
const TEXT = "#F0F0F0";
const MUTED = "#888892";
const ACCENT = "#1F62FF";

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

export default function Privacy() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between" style={{ background: `${BG}f0`, borderBottom: `1px solid ${BORDER}`, backdropFilter: "blur(12px)" }}>
        <JobsDoneLogo />
        <div className="flex items-center gap-6 text-[13px]" style={{ color: MUTED }}>
          <Link href="/terms" className="transition-colors hover:text-white" style={{ color: MUTED }}>Terms of Service</Link>
          <Link href="/privacy" style={{ color: ACCENT }} className="font-medium">Privacy Policy</Link>
          <Link href="/">
            <button className="text-[13px] font-semibold px-4 py-1.5 rounded-lg transition-colors" style={{ background: ACCENT, color: "#fff" }}>
              Home
            </button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-bold text-[2rem] mb-2 sg" style={{ color: TEXT, letterSpacing: "-0.02em" }}>Privacy Policy</h1>
        <p className="text-[14px] mb-10" style={{ color: MUTED }}>Last updated: May 7, 2026</p>

        <div className="flex flex-col gap-6 text-[15px] leading-relaxed" style={{ color: `${TEXT}cc` }}>
          <p>Jobs Done Labs LLC ("Jobs Done Labs," "we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, share, and protect information you provide through our website at <a href="https://jobsdonelabs.ai" style={{ color: ACCENT }}>https://jobsdonelabs.ai</a> (the "Site"), through forms on Meta (Facebook and Instagram) lead ads referencing Jobs Done Labs, and through any communications you have with us.</p>
          <p>By using the Site or providing your information to us, you consent to the practices described in this Privacy Policy.</p>

          <Section title="1. Information We Collect">
            <p>We collect the following categories of information:</p>
            <ul className="list-disc pl-6 mt-3 flex flex-col gap-2">
              <li><strong style={{ color: TEXT }}>Information You Provide Directly.</strong> When you submit a form on the Site, submit a Meta lead form, or book an appointment with us, you may provide your name, email address, phone number, company name, role/title, and details about your business or inquiry.</li>
              <li><strong style={{ color: TEXT }}>Information from Cookies and Tracking.</strong> We use cookies, web beacons, and similar technologies to collect information about how you use the Site, including pages viewed, time spent, and referral source. We may use Google Analytics, Meta Pixel, and similar analytics tools.</li>
              <li><strong style={{ color: TEXT }}>Communication Records.</strong> When you communicate with us via SMS, email, or phone, we keep records of those communications for our internal records and to improve our services.</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-3 flex flex-col gap-1.5">
              <li>Respond to your inquiries</li>
              <li>Schedule and confirm audit calls</li>
              <li>Send appointment reminders and follow-up communications</li>
              <li>Provide our services to you if you become a client</li>
              <li>Send marketing communications about our services (subject to your consent and applicable law)</li>
              <li>Improve our website, services, and marketing</li>
              <li>Comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="3. SMS Communications — Opt-In and Consent">
            <p>When you provide your phone number through one of our forms or by booking an appointment, you consent to receive SMS (text message) communications from Jobs Done Labs at the number provided. SMS communications may include:</p>
            <ul className="list-disc pl-6 mt-3 flex flex-col gap-1.5">
              <li>Appointment confirmations and reminders</li>
              <li>Follow-up about your inquiry</li>
              <li>Information about our services</li>
            </ul>
            <p className="mt-3">Message frequency varies based on your interaction with us. Message and data rates may apply. Consent to receive SMS is not a condition of any purchase.</p>
            <p className="mt-3">To opt out, reply <strong style={{ color: TEXT }}>STOP</strong> to any message. To get help, reply <strong style={{ color: TEXT }}>HELP</strong>. We will respect opt-out requests immediately.</p>

            <div className="mt-4 p-4 rounded-xl" style={{ background: `${ACCENT}0a`, border: `1px solid ${ACCENT}25` }}>
              <p><strong style={{ color: TEXT }}>Phone Number and SMS Data Sharing.</strong> We do <strong style={{ color: TEXT }}>NOT</strong> sell, rent, lease, or share your phone number, SMS opt-in data, or text-message content with any third parties for their own marketing or promotional purposes. We may share this information only with our service providers (such as our SMS messaging vendor) strictly to deliver the messages you have consented to receive. We do not share opt-in data with affiliates or marketing partners.</p>
            </div>
          </Section>

          <Section title="4. How We Share Information">
            <p>We share information with:</p>
            <ul className="list-disc pl-6 mt-3 flex flex-col gap-2">
              <li><strong style={{ color: TEXT }}>Service Providers.</strong> Vendors that help us run our business — including our CRM (HighLevel), email service provider, calendar provider, and SMS messaging provider — under contracts that require them to protect your information and use it only to provide services to us.</li>
              <li><strong style={{ color: TEXT }}>Legal Authorities.</strong> When required by law, court order, subpoena, or to protect our rights or the safety of others.</li>
              <li><strong style={{ color: TEXT }}>Business Transfers.</strong> If Jobs Done Labs is involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction. We will notify you of any such change.</li>
            </ul>
            <p className="mt-3">We do <strong style={{ color: TEXT }}>NOT</strong> sell or rent your personal information to third parties.</p>
          </Section>

          <Section title="5. Cookies and Tracking">
            <p>The Site uses cookies and similar technologies. You can control cookies through your browser settings. Disabling cookies may impair some Site functionality.</p>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. You may request deletion of your information by contacting us at <a href="mailto:ryne@jobsdone.io" style={{ color: ACCENT }}>ryne@jobsdone.io</a>.</p>
          </Section>

          <Section title="7. Data Security">
            <p>We implement reasonable administrative, technical, and physical safeguards to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </Section>

          <Section title="8. Your Rights">
            <p>Depending on where you live, you may have rights regarding your information:</p>
            <ul className="list-disc pl-6 mt-3 flex flex-col gap-2">
              <li><strong style={{ color: TEXT }}>Access.</strong> Request a copy of the information we hold about you.</li>
              <li><strong style={{ color: TEXT }}>Correction.</strong> Request that we correct inaccurate information.</li>
              <li><strong style={{ color: TEXT }}>Deletion.</strong> Request that we delete your information, subject to legal exceptions.</li>
              <li><strong style={{ color: TEXT }}>Opt-Out.</strong> Withdraw consent to marketing or SMS communications at any time.</li>
            </ul>
            <p className="mt-3">To exercise these rights, contact us at <a href="mailto:ryne@jobsdone.io" style={{ color: ACCENT }}>ryne@jobsdone.io</a>.</p>
            <p className="mt-3"><em>California residents:</em> California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to deletion, and the right to opt out of the sale of personal information. We do not sell personal information.</p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>The Site is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, contact us and we will delete it.</p>
          </Section>

          <Section title="10. International Users">
            <p>If you are accessing the Site from outside the United States, your information will be transferred to and processed in the United States, where data protection laws may differ from your country of residence.</p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. The updated version will be posted on this page with a new "Last updated" date. We encourage you to review this Privacy Policy periodically.</p>
          </Section>

          <Section title="12. Contact Us">
            <p>For questions about this Privacy Policy or to exercise your rights, contact:</p>
            <div className="mt-3 p-5 rounded-xl text-[14px]" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <p className="font-semibold mb-1" style={{ color: TEXT }}>Jobs Done Labs LLC</p>
              <p style={{ color: MUTED }}>414 N River Rd, Fox River Grove, IL 60021</p>
              <p className="mt-1"><a href="mailto:ryne@jobsdone.io" style={{ color: ACCENT }}>ryne@jobsdone.io</a></p>
              <p><a href="tel:+12247151381" style={{ color: ACCENT }}>+1 224-715-1381</a></p>
            </div>
          </Section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 text-[13px]" style={{ borderTop: `1px solid ${BORDER}`, color: MUTED }}>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="font-semibold mb-0.5" style={{ color: TEXT }}>Jobs Done Labs LLC</p>
            <p>414 N River Rd, Fox River Grove, IL 60021</p>
            <p><a href="mailto:ryne@jobsdone.io" style={{ color: ACCENT }}>ryne@jobsdone.io</a> · <a href="tel:+12247151381" style={{ color: ACCENT }}>+1 224-715-1381</a></p>
          </div>
          <div className="flex gap-4">
            <Link href="/terms" className="transition-colors hover:text-white" style={{ color: MUTED }}>Terms of Service</Link>
            <Link href="/privacy" style={{ color: ACCENT }}>Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-bold text-[17px] mb-3 sg" style={{ color: TEXT, letterSpacing: "-0.01em" }}>{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
