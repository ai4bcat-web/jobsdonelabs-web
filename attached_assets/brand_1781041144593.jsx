// Shared brand elements: flask mark + JOBSDONE wordmark + VSL player
// Rendered in plain markup; styling driven by variation-scoped CSS classes.

function FlaskMark({ className = "", stroke }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true"
         style={{ width: "1em", height: "1em" }}>
      {/* Erlenmeyer flask outline */}
      <path
        d="M18 7 H30 M20 7 V19 L11.5 38 Q10 41.5 13.8 41.5 H34.2 Q38 41.5 36.5 38 L28 19 V7"
        stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* circuit nodes inside */}
      <line x1="20.5" y1="25.5" x2="26" y2="30.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="30.5" x2="20.5" y2="35.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <circle cx="20.5" cy="25.5" r="2.6" fill={stroke} />
      <circle cx="26.5" cy="30.5" r="2.6" fill={stroke} />
      <circle cx="20.5" cy="35.5" r="2.6" fill={stroke} />
    </svg>
  );
}

// variant: which CSS scope ("v1"/"v2"/"v3"); inkOnDark flips colors for dark panels
function Wordmark({ variant, size = 22, onDark = false }) {
  const ink = onDark ? "var(--cream)" : "var(--ink)";
  const accent = "var(--accent)";
  return (
    <div className="wm" style={{ display: "flex", alignItems: "center", gap: ".5em", fontSize: size }}>
      <FlaskMark stroke={accent} className="wm-flask" />
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span className="wm-text" style={{ fontStyle: "italic", fontWeight: 800, letterSpacing: "-.01em" }}>
          <span style={{ color: ink }}>JOBS</span><span style={{ color: accent }}>DONE</span>
        </span>
        <span className="wm-sub" style={{
          display: "flex", alignItems: "center", gap: ".5em", marginTop: ".42em",
          fontWeight: 700, fontSize: ".3em", letterSpacing: ".44em",
          color: onDark ? "rgba(255,255,255,.7)" : "var(--ink-soft)"
        }}>
          <span style={{ flex: 1, height: "1.5px", background: "currentColor", opacity: .55 }} />
          <span style={{ paddingLeft: ".44em" }}>LABS</span>
          <span style={{ flex: 1, height: "1.5px", background: "currentColor", opacity: .55 }} />
        </span>
      </div>
    </div>
  );
}

// VSL — 16:9. Autoplays muted; tap to unmute. Falls back to styled placeholder if no videoId.
function VSL({ variant, label = "Watch the 4-min breakdown", duration = "VSL", onDark = false, videoId }) {
  const [sound, setSound] = React.useState(false);
  if (videoId) {
    const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${sound ? 0 : 1}&rel=0&playsinline=1&modestbranding=1`;
    return (
      <div className={`vsl vsl-${variant} ${onDark ? "vsl-ondark" : ""}`}>
        <div className="vsl-frame">
          <div className="vsl-glow" />
          <div className="vsl-thumb">
            <iframe key={sound ? "on" : "off"} className="vsl-iframe" src={src}
              title="Jobs Done Labs VSL" frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            {!sound && (
              <button className="vsl-unmute" onClick={() => setSound(true)} aria-label="Tap for sound">
                <span className="vsl-unmute-pill">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8v8a4.5 4.5 0 002.5-4zM14 3v2.06a7 7 0 010 13.88V21a9 9 0 000-18z" /></svg>
                  <span>{label}</span>
                  <span className="tap">· Tap for sound</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`vsl vsl-${variant} ${onDark ? "vsl-ondark" : ""}`}>
      <div className="vsl-frame">
        <div className="vsl-glow" />
        <div className="vsl-thumb">
          <div className="vsl-grid" />
          <button className="vsl-play" aria-label="Play video"><svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></button>
          <div className="vsl-caption">
            <span className="vsl-rec"><span className="vsl-dot" /> VSL</span>
            <span className="vsl-label">{label}</span>
          </div>
          <span className="vsl-dur">{duration}</span>
          <div className="vsl-scrub"><span style={{ width: "0%" }} /></div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FlaskMark, Wordmark, VSL });
