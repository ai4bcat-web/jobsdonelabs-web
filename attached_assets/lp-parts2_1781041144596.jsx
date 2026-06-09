// Jobs Done Labs — full landing page, part 2
// Results / Guarantee / Fit / Testimonials / FAQ / Final CTA / Footer

function Results() {
  return (
    <section className="results dark" id="proof">
      <div className="container">
        <div className="sec-head">
          <span className="sec-eyebrow">Proof · BCAT Logistics Group</span>
          <h2 className="h2">We built this inside our own<br />logistics group first.</h2>
          <p className="lead">Across three transportation companies — freight brokerage, an Amazon DSP, and vehicle transport — we deployed one AI command center and turned five hidden profit leaks into five working engines. No new headcount.</p>
        </div>
        <div className="case">
          <div className="case-stats">
            <div className="cstat"><div className="n">$200<span className="u">K+</span></div><div className="l">Net new profit created in 12 months</div></div>
            <div className="cstat"><div className="n">+120<span className="u">bps</span></div><div className="l">Gross margin lift — same team</div></div>
            <div className="cstat"><div className="n">$3.78<span className="u">M</span></div><div className="l">Combined active sales pipeline</div></div>
            <div className="cstat"><div className="n">96.2<span className="u">%</span></div><div className="l">On-time delivery, up from 91.4%</div></div>
          </div>
          <div>
            <p className="case-quote">"The $200K wasn't hiding. It was just <span className="accent">invisible.</span> The command center made it visible — and the profit followed."</p>
            <div className="case-by">
              <img className="av" src="ryne.jpg" alt="Ryne Bandolik" />
              <div>
                <div className="nm">Ryne Bandolik</div>
                <div className="rl">Founder, Jobs Done Labs · BCAT Logistics Group</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Guarantee() {
  const items = [
    "We recover at least $30,000 in net profit within 90 days",
    "If we don't hit it, you don't pay us a cent",
    "No long-term retainers, no lock-in contracts",
    "You keep every system we build, forever",
  ];
  return (
    <section className="guarantee" id="guarantee">
      <div className="container">
        <div className="gtr-left">
          <div className="gtr-seal">
            <img src="ryne.jpg" alt="Ryne Bandolik, Founder" />
            <span className="gtr-seal-badge"><b>$30K</b> Guaranteed</span>
          </div>
          <div className="gtr-personal">
            <span className="lbl">Personally backed</span>
            <div className="gtr-sign">Ryne Bandolik</div>
            <div className="gtr-role">Founder, Jobs Done Labs</div>
            <p>"I put my own fee on the line because I ran this exact playbook inside my own logistics group — and recovered <b>$200K</b> doing it. If it works there, I'll prove it works for you."</p>
            <div className="gtr-stats">
              <div className="gtr-stat"><div className="n">$200K</div><div className="l">Recovered</div></div>
              <div className="gtr-stat"><div className="n">3</div><div className="l">Companies</div></div>
              <div className="gtr-stat"><div className="n">$0</div><div className="l">Your risk</div></div>
            </div>
          </div>
        </div>
        <div>
          <span className="sec-eyebrow on-dark" style={{ background: "#fff", color: "var(--accent-deep)" }}>The guarantee</span>
          <h2 className="h2">Recover $30K in 90 days,<br />or you pay nothing.</h2>
          <p>We put our entire fee on the line. Either we find and recover at least $30,000 in net profit for your business within 90 days — or you owe us nothing. That's how confident we are in the systems we build.</p>
          <ul className="gtr-list">
            {items.map((t, i) => (<li key={i}><span className="gtr-check"><ICheck /></span>{t}</li>))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const FOR = [
  "You're a service, logistics, or manufacturing business doing $1M+ in revenue",
  "You've got real operational volume — leads, jobs, trucks, orders flowing daily",
  "You know you're losing time and money to manual work, but can't pinpoint where",
  "You want systems you own, not another tool you rent forever",
];
const NOTFOR = [
  "You're pre-revenue or under $1M — the math doesn't work yet",
  "You want a cheap chatbot or a one-off automation, not real operational change",
  "You're not willing to give us access to map how your business actually runs",
  "You're looking for hype, not measurable profit recovery",
];

function Fit() {
  return (
    <section className="fit" id="fit">
      <div className="container">
        <div className="sec-head">
          <span className="sec-eyebrow ghost">Honest fit</span>
          <h2 className="h2">We're not for everyone.<br />Here's the truth.</h2>
        </div>
        <div className="fit-grid">
          <div className="fit-card yes">
            <h3><span className="fit-badge badge" style={{ background: "var(--accent)" }}><ICheck /></span> This is for you if</h3>
            <ul>{FOR.map((t, i) => (<li key={i}><span className="fit-tick"><ICheck /></span>{t}</li>))}</ul>
          </div>
          <div className="fit-card no">
            <h3><span className="fit-badge badge" style={{ background: "var(--ink)" }}><IX /></span> This isn't for you if</h3>
            <ul>{NOTFOR.map((t, i) => (<li key={i}><span className="fit-tick"><IX /></span>{t}</li>))}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const PILOT_SEATS = ["HVAC & Plumbing", "Freight & Logistics", "Manufacturing", "Field Service", "Auto Transport"];

function Testimonials() {
  return (
    <section className="pilot" id="results">
      <div className="container">
        <div className="pilot-card">
          <span className="sec-eyebrow on-dark">Pilot program · 2026</span>
          <h2 className="h2">We're building for <span className="hl">5</span><br />service businesses right now.</h2>
          <p>Instead of recycled testimonials, here's the truth: we're hand-engineering profit-recovery systems for a small founding cohort as we speak. Full, numbers-backed case studies drop <b>Q4 2026</b> — get in before they're public.</p>
          <div className="pilot-seats">
            {PILOT_SEATS.map((s, i) => (
              <span className="seat" key={i}><span className="ring" /> {s}</span>
            ))}
          </div>
          <div className="pilot-foot">
            <span className="pilot-stamp"><span className="pdot" /> Case studies coming Q4 2026</span>
            <a className="btn btn-lg" href="#book">Apply for the next cohort →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "How can you guarantee $30K in 90 days?", a: "Because we've done it repeatedly and we only take on businesses where the math is obvious. The free audit is where we prove it — if we don't see a clear path to $30K+ in recoverable profit, we won't take you on. And if we take you on and miss, you pay nothing." },
  { q: "What exactly do you build?", a: "Custom AI automation systems mapped to your real operation: instant quoting and follow-up, lead capture and routing, scheduling and operations optimization, automated billing, and real-time profit/utilization dashboards. Never generic templates — everything is built around how your business actually runs." },
  { q: "Do I need a technical team?", a: "No. We architect, build, integrate, and test everything. We train your team on the systems and hand them over fully documented. You own them outright — no dependency on us afterward." },
  { q: "How is this different from hiring an agency or buying software?", a: "Agencies bill you monthly to manage tools. SaaS makes you rent features forever. We install owned systems that recover profit and put our fee on the line against a hard number. We're operators who ran these businesses, not consultants reading from a deck." },
  { q: "What does it cost?", a: "Pricing depends on the scope we uncover in your audit, but it's always structured around the guarantee — the systems are designed to recover multiples of what they cost. The audit itself is free, with no obligation." },
  { q: "What happens on the free audit call?", a: "We map your workflows, identify where profit is leaking, and give you a concrete number for what's recoverable and how. You walk away with a clear plan whether or not we work together." },
];

function FAQItem({ q, a, open, onClick }) {
  const ref = React.useRef(null);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-q" onClick={onClick}>
        <span>{q}</span>
        <span className="faq-ic"><IPlus /></span>
      </button>
      <div className="faq-a" style={{ maxHeight: open ? (ref.current ? ref.current.scrollHeight + 20 : 400) : 0 }}>
        <div className="faq-a-inner" ref={ref}>{a}</div>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="sec-head" style={{ textAlign: "center", margin: "0 auto" }}>
          <span className="sec-eyebrow ghost">Questions</span>
          <h2 className="h2">No fluff. Straight answers.</h2>
        </div>
        <div className="faq-wrap">
          {FAQS.map((f, i) => (<FAQItem key={i} {...f} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="finalsplit" id="book">
      <div className="container">
        <div className="split-card">
          <div className="split-photo">
            <img className="split-img" src="ryne.jpg" alt="Ryne Bandolik, Founder of Jobs Done Labs" />
            <div className="name-tag">
              <div className="nm">Ryne Bandolik</div>
              <div className="rl">Founder, Jobs Done Labs</div>
            </div>
          </div>
          <div className="split-body">
            <span className="sec-eyebrow on-dark">Book your free audit</span>
            <h2 className="h2">Find your <span className="hl">$30K</span> in 90 days. Or pay nothing.</h2>
            <p>Book a free Profit Recovery Audit. We'll show you exactly where your profit is leaking and what it takes to recover it — no pitch, no pressure, no cost.</p>
            <a className="btn btn-xl" href="#book">Book your free audit <IArrow /></a>
            <div className="trust-badges">
              <span className="tbadge"><span className="ci"><ICheck /></span> $30K guaranteed</span>
              <span className="tbadge"><span className="ci"><ICheck /></span> No retainers</span>
              <span className="tbadge"><span className="ci"><ICheck /></span> Pay on results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Wordmark variant="v2" size={24} onDark={true} />
            <p className="footer-blurb">Custom AI automation systems that recover net profit for service, logistics &amp; manufacturing operators doing $1M+. Guaranteed, or you pay nothing.</p>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <a href="#services">Lead capture</a>
            <a href="#services">Quoting &amp; sales</a>
            <a href="#services">Operations</a>
            <a href="#services">Reporting</a>
          </div>
          <div className="footer-col">
            <h4>Industries</h4>
            <a href="#industries">Home service</a>
            <a href="#industries">Aesthetic &amp; high-ticket</a>
            <a href="#industries">Agencies</a>
            <a href="roi-calculator.html">ROI calculator</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#book">Book a call</a>
            <a href="contact.html">Contact</a>
            <a href="#faq">FAQ</a>
            <a href="mailto:ryne@jobsdone.io">ryne@jobsdone.io</a>
          </div>
        </div>
        <div className="footer-bot">
          <span>© 2026 Jobs Done Labs. All rights reserved.</span>
          <span style={{ display: "flex", gap: "22px" }}>
            <a href="privacy.html">Privacy Policy</a>
            <a href="terms.html">Terms of Service</a>
            <a href="opt-in-proof.html">Opt-in Proof</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Results, Guarantee, Fit, Testimonials, FAQ, FinalCTA, Footer });
