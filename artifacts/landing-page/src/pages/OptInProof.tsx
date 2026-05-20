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

const images = [
  { src: "/opt-in-proof-1.png", label: "Opt-In Proof 1" },
  { src: "/opt-in-proof-2.png", label: "Opt-In Proof 2" },
  { src: "/opt-in-proof-3.png", label: "Opt-In Proof 3" },
];

export default function OptInProof() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between" style={{ background: `${BG}f0`, borderBottom: `1px solid ${BORDER}`, backdropFilter: "blur(12px)" }}>
        <JobsDoneLogo />
        <div className="flex items-center gap-6 text-[13px]" style={{ color: MUTED }}>
          <Link href="/terms" className="transition-colors hover:text-white" style={{ color: MUTED }}>Terms</Link>
          <Link href="/privacy" className="transition-colors hover:text-white" style={{ color: MUTED }}>Privacy</Link>
          <Link href="/">
            <button className="text-[13px] font-semibold px-4 py-1.5 rounded-lg transition-colors" style={{ background: ACCENT, color: "#fff" }}>
              Home
            </button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-[12px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: ACCENT }}>Compliance</p>
          <h1 className="font-bold text-[2rem] leading-tight mb-3 sg" style={{ color: TEXT, letterSpacing: "-0.02em" }}>
            SMS Opt-In Proof
          </h1>
          <p className="text-[15px] leading-relaxed max-w-xl" style={{ color: MUTED }}>
            The following screenshots document our SMS opt-in consent process, demonstrating compliance with carrier and regulatory requirements.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {images.map((img, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${BORDER}`, background: SURFACE }}
            >
              <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <span className="text-[13px] font-medium" style={{ color: MUTED }}>
                  {img.label}
                </span>
                <a
                  href={img.src}
                  download={img.label.replace(/ /g, "-").toLowerCase() + ".png"}
                  className="text-[12px] font-medium transition-colors hover:opacity-80"
                  style={{ color: ACCENT }}
                >
                  Download
                </a>
              </div>
              <div className="p-6 flex justify-center" style={{ background: "#fff" }}>
                <img
                  src={img.src}
                  alt={img.label}
                  className="max-w-full h-auto rounded"
                  style={{ maxHeight: "600px", objectFit: "contain" }}
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 text-[13px] mt-8" style={{ borderTop: `1px solid ${BORDER}`, color: MUTED }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
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
