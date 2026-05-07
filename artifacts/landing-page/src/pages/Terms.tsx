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

export default function Terms() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between" style={{ background: `${BG}f0`, borderBottom: `1px solid ${BORDER}`, backdropFilter: "blur(12px)" }}>
        <JobsDoneLogo />
        <div className="flex items-center gap-6 text-[13px]" style={{ color: MUTED }}>
          <Link href="/terms" style={{ color: ACCENT }} className="font-medium">Terms of Service</Link>
          <Link href="/privacy" className="transition-colors hover:text-white" style={{ color: MUTED }}>Privacy Policy</Link>
          <Link href="/">
            <button className="text-[13px] font-semibold px-4 py-1.5 rounded-lg transition-colors" style={{ background: ACCENT, color: "#fff" }}>
              Home
            </button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-bold text-[2rem] mb-2 sg" style={{ color: TEXT, letterSpacing: "-0.02em" }}>Terms of Service</h1>
        <p className="text-[14px] mb-10" style={{ color: MUTED }}>Last updated: May 7, 2026</p>

        <div className="flex flex-col gap-6 text-[15px] leading-relaxed" style={{ color: `${TEXT}cc` }}>
          <p>These Terms of Service ("Terms") govern your use of the website located at <a href="https://jobsdonelabs.ai" style={{ color: ACCENT }}>https://jobsdonelabs.ai</a> (the "Site") and any services, content, or communications offered by Jobs Done Labs LLC ("Jobs Done Labs," "we," "us," or "our"). By accessing or using the Site, by submitting a form on the Site, or by communicating with us via SMS, email, phone, or other means, you agree to be bound by these Terms.</p>
          <p>If you do not agree to these Terms, do not use the Site or our services.</p>

          <Section title="1. Services Provided">
            <p>Jobs Done Labs provides marketing automation and CRM consulting services, including funnel diagnostics, audit calls, and related advisory services. Specific services and deliverables are agreed separately in writing between Jobs Done Labs and each client.</p>
          </Section>

          <Section title="2. Eligibility">
            <p>You must be at least 18 years of age and have the legal capacity to enter into a binding agreement to use this Site or our services.</p>
          </Section>

          <Section title="3. SMS Communications and Consent">
            <p>By providing your phone number through any form on the Site, by submitting a Meta (Facebook or Instagram) lead form referencing Jobs Done Labs, or by booking an appointment with us, you expressly consent to receive text messages (SMS) from Jobs Done Labs at the phone number provided. These messages may include:</p>
            <ul className="list-disc pl-6 mt-3 flex flex-col gap-1.5">
              <li>Appointment confirmations and reminders</li>
              <li>Follow-up communications related to your inquiry</li>
              <li>Information about our services</li>
              <li>Customer-service replies</li>
            </ul>
            <p className="mt-4">Message frequency varies. Message and data rates may apply. Consent is not a condition of any purchase.</p>
            <p className="mt-3">You can opt out at any time by replying <strong style={{ color: TEXT }}>STOP</strong> to any SMS message you receive from us. You may receive a one-time confirmation that you have been unsubscribed. You can also reply <strong style={{ color: TEXT }}>HELP</strong> at any time to receive support information.</p>
            <p className="mt-3">We will not sell, rent, or share your phone number or SMS opt-in data with any third parties or affiliates for marketing or promotional purposes. See our <Link href="/privacy" style={{ color: ACCENT }}>Privacy Policy</Link> for details.</p>
          </Section>

          <Section title="4. Intellectual Property">
            <p>All content on the Site — including text, graphics, logos, images, and software — is the property of Jobs Done Labs or its licensors and is protected by U.S. and international copyright and trademark laws. You may not reproduce, distribute, or create derivative works from any Site content without our prior written permission.</p>
          </Section>

          <Section title="5. User Conduct">
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mt-3 flex flex-col gap-1.5">
              <li>Use the Site for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any portion of the Site</li>
              <li>Interfere with the Site's operation</li>
              <li>Submit false or misleading information through any form on the Site</li>
              <li>Use automated tools (bots, scrapers) to access the Site without our express permission</li>
            </ul>
          </Section>

          <Section title="6. Disclaimers">
            <p>The Site and all content are provided on an "as is" and "as available" basis without warranty of any kind, express or implied. We make no warranties about the accuracy, completeness, reliability, or timeliness of any content. Any results discussed in case studies or marketing materials are specific to the clients described and should not be relied upon as guarantees of similar results for your business.</p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>To the maximum extent permitted by law, in no event shall Jobs Done Labs LLC, its officers, employees, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site or our services. Our total liability for any claim arising under these Terms shall not exceed the amount paid by you to Jobs Done Labs in the twelve (12) months preceding the claim.</p>
          </Section>

          <Section title="8. Indemnification">
            <p>You agree to indemnify and hold harmless Jobs Done Labs LLC and its officers, employees, and affiliates from any claims, liabilities, damages, losses, or expenses (including reasonable attorney's fees) arising out of your use of the Site, your violation of these Terms, or your violation of any rights of a third party.</p>
          </Section>

          <Section title="9. Third-Party Links and Services">
            <p>The Site may contain links to third-party websites or reference third-party services. We are not responsible for the content, privacy practices, or accuracy of any third-party site or service.</p>
          </Section>

          <Section title="10. Changes to These Terms">
            <p>We may update these Terms from time to time. The updated version will be posted on this page with a new "Last updated" date. Your continued use of the Site after any changes constitutes acceptance of the updated Terms.</p>
          </Section>

          <Section title="11. Governing Law">
            <p>These Terms are governed by the laws of the State of Illinois, without regard to its conflict of laws rules. Any dispute arising under these Terms shall be resolved exclusively in the state or federal courts located in McHenry County, Illinois.</p>
          </Section>

          <Section title="12. Contact Us">
            <p>For questions about these Terms, contact:</p>
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
            <Link href="/terms" style={{ color: ACCENT }}>Terms of Service</Link>
            <Link href="/privacy" className="transition-colors hover:text-white" style={{ color: MUTED }}>Privacy Policy</Link>
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
