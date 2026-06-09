// Jobs Done Labs — full landing page, part 1
// Icons + Nav + Hero + Trust strip + Problem + Process

const IArrow = () => (<svg className="arr" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
const IStar = () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.6 5 21l1.4-6.8L1.3 9.6l6.9-.7z" /></svg>);
const Stars5 = () => (<span className="stars">{[0,1,2,3,4].map(i => <IStar key={i} />)}</span>);
const ICheck = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>);
const IX = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>);
const IPlus = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>);
const IClock = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
const IPhone = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /><path d="M15 4l5 5M20 4l-5 5" /></svg>);
const IRoute = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="2.4" /><circle cx="18" cy="5" r="2.4" /><path d="M8.2 18H14a3 3 0 000-6H10a3 3 0 010-6h5.6" /></svg>);
const IEye = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>);

function LPNav() {
  return (
    <nav className="lpnav">
      <div className="lpnav-inner">
        <Wordmark variant="v2" size={24} />
        <div className="lpnav-links">
          <a href="#services">Services</a>
          <a href="#industries">Industries</a>
          <a href="#results">Results</a>
          <a href="#faq">FAQ</a>
          <a href="roi-calculator.html">ROI Calculator</a>
          <a href="contact.html">Contact</a>
        </div>
        <div className="lpnav-right">
          <a className="nav-ghost" href="#">Free AI Course</a>
          <a className="btn btn-sm" href="#book">Book a Call <IArrow /></a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero-lp">
      <div className="container">
        <div className="hero-grid">
          <div>
            <span className="tag-flag">⚡ Profit recovery, guaranteed</span>
            <h1 className="hero-h1">We find the <span className="hl">$30K</span> hiding in your operations. <span className="h1-sub">In 90 days or you don't pay.</span></h1>
            <p className="hero-sub">If you're doing $1M+ in service, logistics, or manufacturing, you're leaking profit every week — to leads that go cold, jobs that slip, and work that should run itself. We find that money and recover it in 90 days, guaranteed.</p>
            <div className="hero-cta">
              <a className="btn btn-lg" href="#book">Book your free audit <IArrow /></a>
              <div className="hero-microtrust">
                <div className="avatars"><span /><span /><span /><span /></div>
                <div><Stars5 /><div style={{ fontSize: "13px", fontWeight: 700, marginTop: "3px" }}>40+ operators automated</div></div>
              </div>
            </div>
          </div>
          <div className="hero-right-lp">
            <div className="stamp"><b>$30K</b><small>GUARANTEED</small></div>
            <VSL variant="v2" label="Watch the 4-min breakdown" duration="VSL" videoId="FP_yxHX9Zvc" />
          </div>
        </div>
      </div>
    </section>
  );
}

const TYPES = ["HVAC & Plumbing", "Freight & Logistics", "Manufacturing", "Field Service", "Construction", "Distribution", "Home Service", "Wholesale & Supply"];

function TrustStrip() {
  const loop = [...TYPES, ...TYPES];
  return (
    <section className="mband" aria-label="Industries we serve">
      <div className="mband-track">
        {loop.map((t, i) => (
          <React.Fragment key={i}>
            <span className="lab">{t}</span>
            <span className="dot">●</span>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

const PAINS = [
  { ic: <IClock />, h: "Your team quotes by hand", p: "Estimates sit in someone's inbox for days. By the time you follow up, the job's gone cold — or gone to a competitor who answered first.", cost: "Lost: 20–40% of winnable jobs" },
  { ic: <IPhone />, h: "Leads slip through the cracks", p: "Calls missed, forms unanswered, follow-ups forgotten. Every lead that doesn't get a fast, consistent response is money walking out the door.", cost: "Lost: thousands in booked revenue / mo" },
  { ic: <IRoute />, h: "Your operations run on guesswork", p: "Jobs double-booked, your calendar built on memory, and your team idle between appointments. The inefficiency you can't see is the inefficiency you keep paying for.", cost: "Lost: hours of billable capacity daily" },
  { ic: <IEye />, h: "You're flying blind on the numbers", p: "No real-time view of margin, utilization, or where profit leaks out. You find out something's broken a quarter too late.", cost: "Lost: $30K+ you never recover" },
];

function Problem() {
  return (
    <section className="problem dark" id="problem">
      <div className="container">
        <div className="sec-head">
          <span className="sec-eyebrow">The leak</span>
          <h2 className="h2">Your business is bleeding <span className="accent">$30K+ a year.</span> You just can't see where.</h2>
          <p className="lead">It's not a sales problem. It's a thousand tiny operational leaks — manual work, dropped balls, and zero visibility — quietly draining profit you already earned.</p>
        </div>
        <div className="pain-grid">
          {PAINS.map((x, i) => (
            <div className="pain" key={i}>
              <div className="pain-ic">{x.ic}</div>
              <h3>{x.h}</h3>
              <p>{x.p}</p>
              <div className="cost">▸ {x.cost}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", h: "Audit", p: "We map every workflow in your operation and pinpoint exactly where profit leaks out — quoting, follow-up, scheduling, billing, reporting. You get a clear number: what we can recover.", when: "Week 1 · Free", b: "b1" },
  { n: "02", h: "Blueprint", p: "We design the exact systems to plug those leaks and model the recovery. You approve the plan and the projected return before a single thing gets built.", when: "Week 2", b: "b1" },
  { n: "03", h: "Build", p: "We architect, integrate, and deploy custom AI automation around your real processes — built against your actual data and tested with your team.", when: "Weeks 3–4", b: "b2" },
  { n: "04", h: "Recover", p: "Systems run live and claw back profit — faster quotes, zero dropped leads, tighter operations, real-time visibility. We measure recovery against the guarantee.", when: "Days 30–90", b: "b3" },
];

function Process() {
  return (
    <section className="process" id="process">
      <div className="container">
        <div className="sec-head">
          <span className="sec-eyebrow ghost">How it works</span>
          <h2 className="h2">Three steps. Ninety days.<br />Jobs done.</h2>
          <p className="lead">No bloated retainers. No year-long roadmaps. A focused sprint that pays for itself before it ends.</p>
        </div>
        <div className="step-grid s4">
          {STEPS.map((s, i) => (
            <div className={`step ${s.b}`} key={i}>
              <div className="step-n">{s.n}</div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
              <div className="when">{s.when}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { IArrow, IStar, Stars5, ICheck, IX, IPlus, LPNav, Hero, TrustStrip, Problem, Process });
