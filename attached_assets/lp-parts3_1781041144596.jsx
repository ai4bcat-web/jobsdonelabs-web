// Jobs Done Labs — full landing page, part 3 (new sections from the real site)
// Industries · Fractional Systems Operator + Tracker · Inline CTA · Services + Profit Diagram · Comparison

// --- extra icons ---
const IHome = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></svg>);
const ITruck = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h11v9H3z" /><path d="M14 9h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.7" /><circle cx="17.5" cy="18" r="1.7" /></svg>);
const IFactory = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V10l5 3V10l5 3V8l8 4v9z" /><path d="M3 21h18" /></svg>);
const IBolt = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>);
const IFunnel = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h18l-7 8v6l-4 2v-8z" /></svg>);
const IDatabase = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></svg>);
const IGear = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></svg>);
const IChart = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 14l3-3 3 3 5-6" /></svg>);
const IArrowR = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>);

/* ---------- INDUSTRIES ---------- */
const INDS = [
  { ic: <IHome />, h: "Service Businesses", p: "HVAC, plumbing, electrical, roofing, and field service. High call volume, mobile teams, and quotes that win or lose on response speed.", pills: ["Instant quoting", "Scheduling", "Review engine"] },
  { ic: <ITruck />, h: "Logistics & Transportation", p: "Freight brokerages, Amazon DSPs, fleets, and distribution. Thin margins where per-load and per-asset visibility decides whether you profit.", pills: ["Spot quoting", "Per-asset P&L", "Track & trace"] },
  { ic: <IFactory />, h: "Manufacturing & Industrial", p: "Shops, fabricators, and production teams bleeding profit to slow RFQs, manual follow-up, and zero real-time visibility on the floor.", pills: ["RFQ automation", "Job costing", "Throughput"] },
];

function Industries() {
  return (
    <section className="industries" id="industries">
      <div className="container">
        <div className="sec-head">
          <span className="sec-eyebrow ghost">Industries</span>
          <h2 className="h2">Built for the operators<br />who keep things running.</h2>
          <p className="lead">If your business has real operational volume and thin time, there's profit leaking somewhere. These are the ones we recover it for most.</p>
        </div>
        <div className="ind-grid">
          {INDS.map((x, i) => (
            <div className="ind-card" key={i}>
              <div className="ind-ic">{x.ic}</div>
              <h3>{x.h}</h3>
              <p>{x.p}</p>
              <div className="pills">{x.pills.map((p, j) => (<span className="pill" key={j}>{p}</span>))}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FRACTIONAL SYSTEMS OPERATOR + TRACKER ---------- */
const FSTATS = [
  { n: "50+", u: "", l: "Businesses automated" },
  { n: "$30K", u: "+", l: "Min. recovered per client" },
  { n: "24/7", u: "", l: "Systems always running" },
  { n: "48", u: "hr", l: "From signed to building" },
];
const LEAKS = [
  { ic: <IFunnel />, nm: "Lead response", w: "92%", amt: "+$11.2K" },
  { ic: <IGear />, nm: "Quote automation", w: "84%", amt: "+$9.4K" },
  { ic: <IDatabase />, nm: "Scheduling & ops", w: "76%", amt: "+$7.1K" },
  { ic: <IChart />, nm: "Billing & reporting", w: "68%", amt: "+$5.8K" },
];

function FSO() {
  return (
    <section className="fso">
      <div className="container">
        <div className="fso-grid">
          <div>
            <span className="sec-eyebrow ghost">Your unfair advantage</span>
            <h2 className="h2 sm">Your fractional<br />systems operator.</h2>
            <p className="lead">Not an agency you manage. Not software you babysit. A dedicated operator who installs the systems, watches the numbers, and keeps the profit flowing back to you.</p>
            <div className="fso-stats">
              {FSTATS.map((s, i) => (
                <div className="fso-stat" key={i}><div className="n">{s.n}<span className="u">{s.u}</span></div><div className="l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="tracker">
            <div className="tracker-hd">
              <span className="t">Profit Recovery Tracker</span>
              <span className="live"><i />Live</span>
            </div>
            {LEAKS.map((l, i) => (
              <div className="leakrow" key={i}>
                <span className="ic">{l.ic}</span>
                <div className="meta">
                  <div className="nm">{l.nm}</div>
                  <div className="bar"><span style={{ width: l.w }} /></div>
                </div>
                <span className="amt">{l.amt}</span>
              </div>
            ))}
            <div className="tracker-total">
              <span className="lab">Recovered this quarter</span>
              <span className="big">$33.5<span className="u">K</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- INLINE CTA BANNER ---------- */
function InlineCTA() {
  return (
    <section className="inlinecta">
      <div className="container">
        <div className="bar">
          <h3>Ready to recover your $30,000?</h3>
          <a className="btn btn-lg" href="#book">Book your free audit <IArrowR /></a>
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVICES + PROFIT DIAGRAM ---------- */
function ProfitDiagram() {
  return (
    <div className="pdiagram">
      <div className="pd-col">
        <div className="pd-h leak">Where it leaks</div>
        {["Slow lead response", "Manual quoting", "Dropped follow-ups", "No visibility"].map((t, i) => (
          <div className="pd-item" key={i}><span className="dot" style={{ background: "#f97316" }} />{t}</div>
        ))}
      </div>
      <div className="pd-arrow"><IArrowR /></div>
      <div className="pd-col mid">
        <div className="pd-h">The recovery engine</div>
        {["Capture", "Automate", "Optimize", "Report"].map((t, i) => (
          <div className="pd-item" key={i}><span className="dot" style={{ background: "var(--accent)" }} />{t}</div>
        ))}
      </div>
      <div className="pd-arrow"><IArrowR /></div>
      <div className="pd-col">
        <div className="pd-h out">What you keep</div>
        {["More booked jobs", "Faster cash", "Hours back", "$30K+ recovered"].map((t, i) => (
          <div className="pd-item" key={i}><span className="dot" style={{ background: "#34d399" }} />{t}</div>
        ))}
      </div>
    </div>
  );
}

const SERVICES = [
  { n: "01", ic: <IFunnel />, h: "Lead capture & instant response", p: "Every call, form, and message captured and answered in seconds — across SMS, email, and chat — so no opportunity ever goes cold.", pills: ["Speed-to-lead", "Missed-call text-back", "Routing"] },
  { n: "02", ic: <IGear />, h: "Quoting & sales automation", p: "Turn requests into branded quotes automatically, with follow-up sequences that chase the close so your team doesn't have to.", pills: ["Auto-quotes", "Follow-up", "Pipeline"] },
  { n: "03", ic: <IDatabase />, h: "Operations & scheduling systems", p: "Scheduling, job tracking, and capacity planning built around how you actually run — fewer gaps, smoother workflow, more billable hours.", pills: ["Scheduling", "Job tracking", "Capacity"] },
  { n: "04", ic: <IChart />, h: "Reporting & profit visibility", p: "Real-time dashboards on margin, utilization, and recovery, so you see exactly where the money is and where it's still leaking.", pills: ["Dashboards", "Margin", "Alerts"] },
];

function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="sec-head">
          <span className="sec-eyebrow ghost">Services</span>
          <h2 className="h2">Four systems that<br />recover lost profit.</h2>
        </div>
        <ProfitDiagram />
        <div className="srv-list">
          {SERVICES.map((s, i) => (
            <div className="srow" key={i}>
              <div className="num">{s.n}</div>
              <div className="sic">{s.ic}</div>
              <div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
                <div className="pills">{s.pills.map((p, j) => (<span className="pill" key={j}>{p}</span>))}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- COMPARISON TABLE ---------- */
const CROWS = [
  { f: "Recovers profit in 90 days", inh: "no", fre: "no", us: "yes" },
  { f: "Guaranteed result or you pay $0", inh: "no", fre: "no", us: "yes" },
  { f: "Built by real operators", inh: "no", fre: "no", us: "yes" },
  { f: "Systems you own outright", inh: "yes", fre: "no", us: "yes" },
  { f: "No long-term retainer", inh: "no", fre: "yes", us: "yes" },
  { f: "Live in weeks, not quarters", inh: "no", fre: "no", us: "yes" },
];
function Cell({ v, us }) {
  return (
    <div className={`ccell col ${us ? "us" : ""}`}>
      <span className={`ci ${v === "yes" ? "yes" : "no"}`}>{v === "yes" ? <ICheck /> : <IX />}</span>
    </div>
  );
}
function Comparison() {
  return (
    <section className="compare">
      <div className="container">
        <div className="sec-head">
          <span className="sec-eyebrow ghost">The honest comparison</span>
          <h2 className="h2">Why operators choose us<br />over the alternatives.</h2>
        </div>
        <div className="ctable">
          <div className="crow head">
            <div className="ccell feat">&nbsp;</div>
            <div className="ccell col">In-house hire</div>
            <div className="ccell col">Freelancer</div>
            <div className="ccell us">Jobs Done Labs</div>
          </div>
          {CROWS.map((r, i) => (
            <div className="crow" key={i}>
              <div className="ccell feat">{r.f}</div>
              <Cell v={r.inh} />
              <Cell v={r.fre} />
              <Cell v={r.us} us />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Industries, FSO, InlineCTA, Services, Comparison });
