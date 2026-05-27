import { useEffect } from "react";
import { X } from "lucide-react";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/bookings/jdl-audit-call-ryne";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function BookingModal({ open, onClose }: BookingModalProps) {
  useEffect(() => {
    if (!open) return;
    window.fbq?.("track", "Schedule");
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

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
          src={BOOKING_URL}
          title="Book a Call"
          className="w-full border-0"
          style={{ height: "80vh", minHeight: 560, maxHeight: 720 }}
        />
      </div>
    </div>
  );
}
