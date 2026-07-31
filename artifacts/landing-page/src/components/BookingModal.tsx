import { useEffect } from "react";
import { X } from "lucide-react";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/bookings/jdl-audit-call-ryne";

/**
 * Where the visitor was standing when they asked for the call.
 *
 * Every CTA opens the same GHL calendar, so the only way the call gets
 * qualified before it happens is to tell GHL which offer was on screen.
 * The value rides along as UTM params, which the booking widget stores on
 * the contact and the appointment — so "clicked the $25K tier" and
 * "clicked the footer link" stop looking identical in the CRM.
 */
export type BookingIntent =
  | "hero"
  | "nav"
  | "inline-cta"
  | "engagements"
  | "final-cta"
  | "exit-intent"
  | "footer"
  | "cta-link"
  | "seats"
  | "blueprint"
  | "coach"
  | "cto"
  | "partner"
  | "pricing-hero"
  | "pricing-final";

/** Which page the CTA lives on — becomes utm_medium. */
function mediumFor(intent: BookingIntent): string {
  return intent.startsWith("pricing-") ||
    intent === "blueprint" ||
    intent === "coach" ||
    intent === "cto" ||
    intent === "partner"
    ? "pricing-page"
    : "home";
}

function bookingUrlFor(intent?: BookingIntent): string {
  if (!intent) return BOOKING_URL;
  const params = new URLSearchParams({
    utm_source: "jobsdonelabs.ai",
    utm_medium: mediumFor(intent),
    utm_campaign: "fractional-ai-cto",
    utm_content: intent,
  });
  return `${BOOKING_URL}?${params.toString()}`;
}

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  /** Which CTA opened the modal. Passed through to GHL as utm_content. */
  intent?: BookingIntent;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

export default function BookingModal({ open, onClose, intent }: BookingModalProps) {
  useEffect(() => {
    if (!open) return;
    window.fbq?.("track", "Schedule", intent ? { content_name: intent } : undefined);
    window.plausible?.("Booking Opened", intent ? { props: { intent } } : undefined);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, intent]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ maxWidth: 520, background: "#fff" }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors"
          style={{ background: "rgba(0,0,0,0.08)" }}
          aria-label="Close"
        >
          <X className="w-4 h-4" style={{ color: "#333" }} />
        </button>
        <iframe
          key={intent ?? "default"}
          src={bookingUrlFor(intent)}
          title="Book a Call"
          className="w-full border-0"
          style={{ height: "80vh", minHeight: 560, maxHeight: 720 }}
        />
      </div>
    </div>
  );
}
