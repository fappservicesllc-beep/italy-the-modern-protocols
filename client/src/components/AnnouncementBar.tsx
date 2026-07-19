import { useEffect, useState } from "react";

// Launch offer expires Wednesday, July 15th, 2026 at 11:59 PM EST.
// EST is UTC-5, so 23:59 EST = 04:59 UTC on July 16th.
const DEADLINE = Date.UTC(2026, 6, 16, 4, 59, 0, 0);

function getRemaining() {
  const diff = DEADLINE - Date.now();
  if (diff <= 0) {
    return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { expired: false, days, hours, minutes, seconds };
}

const pad = (n: number) => String(n).padStart(2, "0");

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center leading-none">
      <span className="font-sans font-semibold tabular-nums text-sm md:text-base tracking-tight text-[#d4af37]">
        {pad(value)}
      </span>
      <span className="font-sans text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-white/40 mt-1">
        {label}
      </span>
    </div>
  );
}

// Amalfi lemon — small, high-quality inline SVG for premium "vibe".
function AmalfiLemon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 md:w-6 md:h-6 shrink-0"
      aria-hidden="true"
      data-testid="icon-amalfi-lemon"
    >
      <ellipse
        cx="12"
        cy="13"
        rx="6.4"
        ry="7.6"
        transform="rotate(-28 12 13)"
        fill="#e9c94a"
        stroke="#c9a227"
        strokeWidth="0.9"
      />
      <ellipse
        cx="10.2"
        cy="10.6"
        rx="2"
        ry="2.8"
        transform="rotate(-28 10.2 10.6)"
        fill="#f4de7a"
        opacity="0.8"
      />
      <path
        d="M6.2 6.8c1.1-1.2 2.6-1.6 3.6-1.3"
        fill="none"
        stroke="#4a5d3a"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M7 5.6c1.4-0.5 3.2-0.2 4 0.9-1.2 0.3-2.9 0.1-4-0.9z"
        fill="#5a7047"
        stroke="#4a5d3a"
        strokeWidth="0.5"
      />
    </svg>
  );
}

export function AnnouncementBar() {
  const [time, setTime] = useState(getRemaining);

  useEffect(() => {
    const id = window.setInterval(() => setTime(getRemaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (time.expired) return null;

  return (
    <div
      className="sticky top-0 z-[80] w-full bg-[#0f1c2e] text-white border-b border-[#d4af37]/30 shadow-sm"
      data-testid="announcement-bar"
      role="alert"
    >
      {/* Thin gold accent line at the very top for boutique polish */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 py-2.5 md:py-3 flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-2 text-center">
        <div className="flex items-center gap-2.5">
          <AmalfiLemon />
          <div className="flex flex-col md:flex-row md:items-baseline md:gap-2 leading-tight">
            <p
              className="font-sans font-semibold text-[11px] md:text-[13px] tracking-[0.12em] uppercase text-white"
              data-testid="text-announcement-headline"
            >
              By Popular Demand: Launch Offer Extended{" "}
              <span aria-hidden="true">🇮🇹</span>
            </p>
            <p
              className="font-sans text-[10px] md:text-xs tracking-wide text-white/70"
              data-testid="text-announcement-subtext"
            >
              Italy Insider Protocol —{" "}
              <span className="text-[#d4af37] font-semibold">just $17</span>{" "}
              <span className="line-through text-white/40">$27</span>
            </p>
          </div>
        </div>

        <div className="hidden md:block h-8 w-px bg-white/15" aria-hidden="true" />

        <div className="flex items-center gap-3">
          <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/40 hidden sm:inline">
            Expires In
          </span>
          <div
            className="flex items-center gap-2 md:gap-2.5"
            data-testid="countdown-timer"
          >
            <TimeUnit value={time.days} label="Days" />
            <span className="font-sans font-light text-sm md:text-base text-white/25 -mt-2">
              :
            </span>
            <TimeUnit value={time.hours} label="Hrs" />
            <span className="font-sans font-light text-sm md:text-base text-white/25 -mt-2">
              :
            </span>
            <TimeUnit value={time.minutes} label="Min" />
            <span className="font-sans font-light text-sm md:text-base text-white/25 -mt-2">
              :
            </span>
            <TimeUnit value={time.seconds} label="Sec" />
          </div>
        </div>
      </div>
    </div>
  );
}
