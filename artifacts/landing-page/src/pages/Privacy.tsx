import { Link } from "wouter";

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
        <span style={{ fontStyle:"italic", fontWeight:800, fontSize:16, letterSpacing:"-0.01em", fontFamily:"'Hanken Grotesk',sans-serif" }}>
          <span style={{ color:INK }}>JOBS</span><span style={{ color:ACCENT }}>DONE</span>
          <span style={{ fontStyle:"normal", fontWeight:700, fontSize:9, letterSpacing:"0.38em", color:INK_SOFT, marginLeft:6 }}>LABS</span>
        </span>
      </div>
    </Link>
  );
}

function Section({ title, children }: { title:string; children:React.ReactNode }) {
  return (
    <div>
      <h2 style={{ fontWeight:700, fontSize:17, letterSpacing:"-0.01em", color:INK, marginBottom:10, fontFamily:"'Hanken Grotesk',sans-serif" }}>{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

export default function Privacy() {
  return (
    <div style={{ background:CREAM2, minHeight:"100vh", color:INK, fontFamily:"'Hanken Grotesk',sans-serif" }}>
      <nav className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background:"rgba(244,239,227,.88)", backdropFilter:"blur(14px)", borderBottom:`1px solid ${LINE}` }}>
        <SubLogo />
        <div className="flex items-center gap-6" style={{ fontSize:13 }}>
          <Link href="/terms" style={{ color:INK_SOFT, textDecoration:"none" }}>Terms of Service</Link>
          <Link href="/privacy" style={{ color:ACCENT, fontWeight:600, textDecoration:"none" }}>Privacy Policy</Link>
          <Link href="/">
            <button style={{ fontSize:13, fontWeight:700, padding:"7px 16px", borderRadius:100, background:ACCENT, color:"#fff", border:"none", cursor:"pointer", fontFamily:"'Hanken Grotesk',sans-serif" }}>Home</button>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div style={{ background:CREAM, border:`1px solid ${LINE}`, borderRadius:20, padding:"40px 36px" }}>
          <h1 className="anton" style={{ fontSize:"clamp(1.9rem,4vw,2.4rem)", color:INK, letterSpacing:"-0.01em", marginBottom:6 }}>Privacy Policy</h1>
          <p style={{ fontSize:14, color:INK_SOFT, marginBottom:36, fontFamily:"'Hanken Grotesk',sans-serif" }}>Last updated: May 18, 2026</p>

          <div className="flex flex-col gap-6" style={{ fontSize:15, lineHeight:1.7, color:INK_SOFT }}>
            <p>Jobsdone Inc. ("Jobsdone Inc.," "we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, share, and protect information you provide through our website at <a href="https://jobsdonelabs.ai" style={{ color:ACCENT }}>https://jobsdonelabs.ai</a> (the "Site"), through forms on Meta (Facebook and Instagram) lead ads referencing Jobsdone Inc., through SMS communications, and through any other communications you have with us.</p>
            <p>By using the Site or providing your information to us, you consent to the practices described in this Privacy Policy.</p>

            <Section title="1. Information We Collect">
              <p>We collect the following categories of information:</p>
              <ul className="list-disc pl-6 mt-3 flex flex-col gap-2">
                <li><strong style={{ color:INK }}>Information You Provide Directly.</strong> When you submit a form on the Site, submit a Meta lead form, or book an appointment with us, you may provide your name, email address, phone number, company name, role/title, and details about your business or inquiry.</li>
                <li><strong style={{ color:INK }}>Information from Cookies and Tracking.</strong> We use cookies, web beacons, and similar technologies to collect information about how you use the Site, including pages viewed, time spent, and referral source. We may use Google Analytics, Meta Pixel, and similar analytics tools.</li>
                <li><strong style={{ color:INK }}>Communication Records.</strong> When you communicate with us via SMS, email, or phone, we keep records of those communications for our internal records and to improve our services.</li>
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
              <p><strong style={{ color:INK }}>Eligibility.</strong> Our SMS program is intended for individuals 18 years of age or older. By opting in, you confirm you are 18 or older.</p>
              <p><strong style={{ color:INK }}>How You Opt In.</strong> SMS consent is a separate, optional action. Simply providing your phone number to Jobsdone Inc. does <strong style={{ color:INK }}>NOT</strong> enroll you in SMS communications. You will only receive SMS messages from Jobsdone Inc. after you explicitly opt in by one of the following methods:</p>
              <ul className="list-disc pl-6 flex flex-col gap-1.5">
                <li>Selecting a separate, optional consent checkbox on a Meta (Facebook or Instagram) lead form, where the consent question clearly states you agree to receive marketing SMS from Jobsdone Inc.; or</li>
                <li>Submitting a website opt-in form that clearly identifies SMS marketing consent as a separate, optional choice with a checkbox that is not pre-checked.</li>
              </ul>
              <p>You may submit any of our forms or book an appointment without opting in to SMS messages, and SMS consent is never a condition of any purchase or service.</p>
              <p><strong style={{ color:INK }}>Types of SMS Messages You May Receive.</strong> After you opt in, you may receive recurring marketing and promotional SMS messages from Jobsdone Inc., including:</p>
              <ul className="list-disc pl-6 flex flex-col gap-1.5">
                <li>Special offers, discounts, and limited-time promotions</li>
                <li>New service and product announcements</li>
                <li>Event invitations and promotional updates</li>
                <li>Appointment confirmations, reminders, and inquiry follow-ups (for those who have booked with us)</li>
              </ul>
              <p><strong style={{ color:INK }}>Message Frequency.</strong> Message frequency varies based on your interaction with us, typically up to 4–8 messages per month per recipient.</p>
              <p><strong style={{ color:INK }}>Message and Data Rates.</strong> Message and data rates may apply. Check with your mobile carrier for any applicable charges.</p>
              <p><strong style={{ color:INK }}>How to Opt Out.</strong> You can opt out of SMS communications at any time by replying <strong style={{ color:INK }}>STOP</strong> to any message you receive from us. After replying STOP, you will receive a confirmation message and no further SMS messages will be sent unless you opt in again. For help, reply <strong style={{ color:INK }}>HELP</strong> and we will respond with support contact information. You can also contact us directly at <a href="mailto:ryne@jobsdone.io" style={{ color:ACCENT }}>ryne@jobsdone.io</a> or <a href="tel:+12247151381" style={{ color:ACCENT }}>+1 224-715-1381</a> to opt out.</p>
              <div className="p-4 rounded-xl flex flex-col gap-3" style={{ background:`${ACCENT}0A`, border:`1px solid ${ACCENT}25` }}>
                <p><strong style={{ color:INK }}>No Sharing of Phone Numbers or SMS Opt-In Data.</strong> Jobsdone Inc. does <strong style={{ color:INK }}>NOT</strong> sell, rent, lease, share, or transfer your phone number, SMS opt-in data, consent information, or text-message content to any third parties, affiliates, or marketing partners for their own marketing or promotional purposes — under any circumstances. We share this information only with vendors that directly support delivery of the messages you have consented to receive (for example, our SMS messaging provider), under contractual obligations that prohibit them from using your data for their own purposes. Phone numbers and SMS opt-in data are never transferred to advertising networks, data brokers, lead resellers, or any affiliate marketing arrangement.</p>
                <p>Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.</p>
              </div>
              <p><strong style={{ color:INK }}>Carrier Disclaimer.</strong> Mobile carriers (including but not limited to T-Mobile, AT&amp;T, Verizon, Sprint, U.S. Cellular, Boost, MetroPCS, Cricket, and Google Fi) are not liable for delayed or undelivered messages.</p>
              <p><strong style={{ color:INK }}>Supported Carriers.</strong> SMS services are available on major U.S. wireless carriers. Service may not be available on all carriers at all times.</p>
            </Section>

            <Section title="4. How We Share Other Information">
              <p>For information other than SMS opt-in data (which is governed by Section 3), we may share with:</p>
              <ul className="list-disc pl-6 mt-3 flex flex-col gap-2">
                <li><strong style={{ color:INK }}>Service Providers.</strong> Vendors that help us run our business — including our CRM (HighLevel), email service provider, calendar provider, and SMS messaging provider — under contracts that require them to protect your information and use it only to provide services to us.</li>
                <li><strong style={{ color:INK }}>Legal Authorities.</strong> When required by law, court order, subpoena, or to protect our rights or the safety of others.</li>
                <li><strong style={{ color:INK }}>Business Transfers.</strong> If Jobsdone Inc. is involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction. We will notify you of any such change.</li>
              </ul>
              <p>We do <strong style={{ color:INK }}>NOT</strong> sell or rent your personal information to third parties.</p>
            </Section>

            <Section title="5. Cookies and Tracking">
              <p>The Site uses cookies and similar technologies, including Google Analytics and Meta Pixel, to understand how visitors use the Site and to support our marketing. You can control cookies through your browser settings. Disabling cookies may impair some Site functionality. Information collected via cookies is not combined with SMS opt-in data for any third-party marketing purpose.</p>
            </Section>

            <Section title="6. Data Retention">
              <p>We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. You may request deletion of your information by contacting us at <a href="mailto:ryne@jobsdone.io" style={{ color:ACCENT }}>ryne@jobsdone.io</a>.</p>
            </Section>

            <Section title="7. Data Security">
              <p>We implement reasonable administrative, technical, and physical safeguards — including encryption in transit, access controls, and vendor due diligence — to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
            </Section>

            <Section title="8. Your Rights">
              <p>Depending on where you live, you may have rights regarding your information:</p>
              <ul className="list-disc pl-6 mt-3 flex flex-col gap-2">
                <li><strong style={{ color:INK }}>Access.</strong> Request a copy of the information we hold about you.</li>
                <li><strong style={{ color:INK }}>Correction.</strong> Request that we correct inaccurate information.</li>
                <li><strong style={{ color:INK }}>Deletion.</strong> Request that we delete your information, subject to legal exceptions.</li>
                <li><strong style={{ color:INK }}>Opt-Out.</strong> Withdraw consent to marketing or SMS communications at any time. For SMS, reply STOP to any message. For email, use the unsubscribe link or contact us.</li>
              </ul>
              <p className="mt-3">To exercise these rights, contact us at <a href="mailto:ryne@jobsdone.io" style={{ color:ACCENT }}>ryne@jobsdone.io</a>.</p>
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
              <div className="mt-3 p-5 rounded-xl" style={{ background:CREAM2, border:`1px solid ${LINE}` }}>
                <p style={{ fontWeight:600, marginBottom:4, color:INK, fontSize:14, fontFamily:"'Hanken Grotesk',sans-serif" }}>Jobsdone Inc.</p>
                <p style={{ color:INK_SOFT, fontSize:13, fontFamily:"'Hanken Grotesk',sans-serif" }}>414 N River Rd, Fox River Grove, IL 60021</p>
                <p className="mt-1" style={{ fontSize:13, fontFamily:"'Hanken Grotesk',sans-serif" }}><a href="mailto:ryne@jobsdone.io" style={{ color:ACCENT }}>ryne@jobsdone.io</a></p>
                <p style={{ fontSize:13, fontFamily:"'Hanken Grotesk',sans-serif" }}><a href="tel:+12247151381" style={{ color:ACCENT }}>+1 224-715-1381</a></p>
              </div>
            </Section>
          </div>
        </div>
      </main>

      <footer className="py-8 px-6" style={{ borderTop:`1px solid ${LINE}` }}>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div style={{ fontSize:13, color:INK_SOFT, fontFamily:"'Hanken Grotesk',sans-serif" }}>
            <p style={{ fontWeight:600, marginBottom:2, color:INK }}>Jobsdone Inc.</p>
            <p>414 N River Rd, Fox River Grove, IL 60021</p>
            <p><a href="mailto:ryne@jobsdone.io" style={{ color:ACCENT }}>ryne@jobsdone.io</a> · <a href="tel:+12247151381" style={{ color:ACCENT }}>+1 224-715-1381</a></p>
          </div>
          <div className="flex gap-4" style={{ fontSize:13 }}>
            <Link href="/terms" style={{ color:INK_SOFT, textDecoration:"none" }}>Terms of Service</Link>
            <Link href="/privacy" style={{ color:ACCENT, textDecoration:"none" }}>Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
