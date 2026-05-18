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
        <p className="text-[14px] mb-10" style={{ color: MUTED }}>Last updated: May 18, 2026</p>

        <div className="flex flex-col gap-6 text-[15px] leading-relaxed" style={{ color: `${TEXT}cc` }}>
          <p>Jobsdone Inc. ("Jobsdone Inc.," "we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, share, and protect information you provide through our website at <a href="https://jobsdonelabs.ai" style={{ color: ACCENT }}>https://jobsdonelabs.ai</a> (the "Site"), through forms on Meta (Facebook and Instagram) lead ads referencing Jobsdone Inc., through SMS communications, and through any other communications you have with us.</p>
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
              <li>Send marketing and promotional SMS communications about our services (only to recipients who have provided separate, explicit opt-in consent)</li>
              <li>Improve our website, services, and marketing</li>
              <li>Comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="3. SMS Communications — Opt-In, Consent, and Data Practices">
            <p>This section describes how Jobsdone Inc. handles SMS (text message) communications, including marketing and promotional messages.</p>

            <p><strong style={{ color: TEXT }}>Eligibility.</strong> Our SMS program is intended for individuals 18 years of age or older. By opting in, you confirm you are 18 or older.</p>

            <p><strong style={{ color: TEXT }}>How You Opt In.</strong> SMS consent is a separate, optional action. Simply providing your phone number to Jobsdone Inc. does <strong style={{ color: TEXT }}>NOT</strong> enroll you in SMS communications. You will only receive SMS messages from Jobsdone Inc. after you explicitly opt in by one of the following methods:</p>
            <ul className="list-disc pl-6 flex flex-col gap-1.5">
              <li>Selecting a separate, optional consent checkbox on a Meta (Facebook or Instagram) lead form, where the consent question clearly states you agree to receive marketing SMS from Jobsdone Inc.; or</li>
              <li>Submitting a website opt-in form that clearly identifies SMS marketing consent as a separate, optional choice with a checkbox that is not pre-checked.</li>
            </ul>
            <p>You may submit any of our forms or book an appointment without opting in to SMS messages, and SMS consent is never a condition of any purchase or service.</p>

            <p><strong style={{ color: TEXT }}>Types of SMS Messages You May Receive.</strong> After you opt in, you may receive recurring marketing and promotional SMS messages from Jobsdone Inc., including:</p>
            <ul className="list-disc pl-6 flex flex-col gap-1.5">
              <li>Special offers, discounts, and limited-time promotions</li>
              <li>New service and product announcements</li>
              <li>Event invitations and promotional updates</li>
              <li>Appointment confirmations, reminders, and inquiry follow-ups (for those who have booked with us)</li>
            </ul>

            <p><strong style={{ color: TEXT }}>Message Frequency.</strong> Message frequency varies based on your interaction with us, typically up to 4–8 messages per month per recipient.</p>
            <p><strong style={{ color: TEXT }}>Message and Data Rates.</strong> Message and data rates may apply. Check with your mobile carrier for any applicable charges.</p>

            <p><strong style={{ color: TEXT }}>How to Opt Out.</strong> You can opt out of SMS communications at any time by replying <strong style={{ color: TEXT }}>STOP</strong> to any message you receive from us. After replying STOP, you will receive a confirmation message and no further SMS messages will be sent unless you opt in again. For help, reply <strong style={{ color: TEXT }}>HELP</strong> and we will respond with support contact information. You can also contact us directly at <a href="mailto:ryne@jobsdone.io" style={{ color: ACCENT }}>ryne@jobsdone.io</a> or <a href="tel:+12247151381" style={{ color: ACCENT }}>+1 224-715-1381</a> to opt out.</p>

            <div className="p-4 rounded-xl" style={{ background: `${ACCENT}0a`, border: `1px solid ${ACCENT}25` }}>
              <p><strong style={{ color: TEXT }}>No Sharing of Phone Numbers or SMS Opt-In Data.</strong> Jobsdone Inc. does <strong style={{ color: TEXT }}>NOT</strong> sell, rent, lease, share, or transfer your phone number, SMS opt-in data, consent information, or text-message content to any third parties, affiliates, or marketing partners for their own marketing or promotional purposes — under any circumstances. We share this information only with vendors that directly support delivery of the messages you have consented to receive (for example, our SMS messaging provider), under contractual obligations that prohibit them from using your data for their own purposes. Phone numbers and SMS opt-in data are never transferred to advertising networks, data brokers, lead resellers, or any affiliate marketing arrangement.</p>
            </div>

            <p><strong style={{ color: TEXT }}>Carrier Disclaimer.</strong> Mobile carriers (including but not limited to T-Mobile, AT&T, Verizon, Sprint, U.S. Cellular, Boost, MetroPCS, Cricket, and Google Fi) are not liable for delayed or undelivered messages.</p>
            <p><strong style={{ color: TEXT }}>Supported Carriers.</strong> SMS services are available on major U.S. wireless carriers. Service may not be available on all carriers at all times.</p>
          </Section>

          <Section title="4. How We Share Other Information">
            <p>For information other than SMS opt-in data (which is governed by Section 3), we may share with:</p>
            <ul className="list-disc pl-6 mt-3 flex flex-col gap-2">
              <li><strong style={{ color: TEXT }}>Service Providers.</strong> Vendors that help us run our business — including our CRM (HighLevel), email service provider, calendar provider, and SMS messaging provider — under contracts that require them to protect your information and use it only to provide services to us.</li>
              <li><strong style={{ color: TEXT }}>Legal Authorities.</strong> When required by law, court order, subpoena, or to protect our rights or the safety of others.</li>
              <li><strong style={{ color: TEXT }}>Business Transfers.</strong> If Jobsdone Inc. is involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction. We will notify you of any such change.</li>
            </ul>
            <p>We do <strong style={{ color: TEXT }}>NOT</strong> sell or rent your personal information to third parties.</p>
          </Section>

          <Section title="5. Cookies and Tracking">
            <p>The Site uses cookies and similar technologies, including Google Analytics and Meta Pixel, to understand how visitors use the Site and to support our marketing. You can control cookies through your browser settings. Disabling cookies may impair some Site functionality. Information collected via cookies is not combined with SMS opt-in data for any third-party marketing purpose.</p>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. You may request deletion of your information by contacting us at <a href="mailto:ryne@jobsdone.io" style={{ color: ACCENT }}>ryne@jobsdone.io</a>.</p>
          </Section>

          <Section title="7. Data Security">
            <p>We implement reasonable administrative, technical, and physical safeguards — including encryption in transit, access controls, and vendor due diligence — to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </Section>

          <Section title="8. Your Rights">
            <p>Depending on where you live, you may have rights regarding your information:</p>
            <ul className="list-disc pl-6 mt-3 flex flex-col gap-2">
              <li><strong style={{ color: TEXT }}>Access.</strong> Request a copy of the information we hold about you.</li>
              <li><strong style={{ color: TEXT }}>Correction.</strong> Request that we correct inaccurate information.</li>
              <li><strong style={{ color: TEXT }}>Deletion.</strong> Request that we delete your information, subject to legal exceptions.</li>
              <li><strong style={{ color: TEXT }}>Opt-Out.</strong> Withdraw consent to marketing or SMS communications at any time. For SMS, reply STOP to any message. For email, use the unsubscribe link or contact us.</li>
            </ul>
            <p className="mt-3">To exercise these rights, contact us at <a href="mailto:ryne@jobsdone.io" style={{ color: ACCENT }}>ryne@jobsdone.io</a>.</p>
            <p className="mt-3"><em>California residents:</em> California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to deletion, and the right to opt out of the sale of personal information. We do not sell personal information.</p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>The Site and our SMS program are not intended for children. Our SMS program is restricted to individuals 18 years of age or older. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, contact us and we will delete it.</p>
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
              <p className="font-semibold mb-1" style={{ color: TEXT }}>Jobsdone Inc.</p>
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
            <p className="font-semibold mb-0.5" style={{ color: TEXT }}>Jobsdone Inc.</p>
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
