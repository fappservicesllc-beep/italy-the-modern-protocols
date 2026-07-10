import { useEffect, useState } from "react";

// Flash sale expires Sunday, July 12th, 2026 at 11:59 PM (23:59, local time).
const DEADLINE = new Date(2026, 6, 12, 23, 59, 0, 0).getTime();

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
      <span className="font-sans font-bold tabular-nums text-base md:text-lg tracking-tight">
        {pad(value)}
      </span>
      <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.15em] text-white/70 mt-0.5">
        {label}
      </span>
    </div>
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
      className="sticky top-0 z-[80] w-full bg-[#6b1220] text-white shadow-md border-b border-[#8a1a2b]"
      data-testid="announcement-bar"
      role="alert"
    >
      <div className="max-w-5xl mx-auto px-3 py-2.5 md:py-3 flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-1.5 text-center">
        <p
          className="font-sans font-bold text-[11px] md:text-sm tracking-[0.03em] uppercase leading-tight"
          data-testid="text-announcement-message"
        >
          <span aria-hidden="true">🚨 </span>Flash Sale: Price Increases From
          $14 to $27 In:
        </p>
        <div
          className="flex items-center gap-2 md:gap-3"
          data-testid="countdown-timer"
        >
          <TimeUnit value={time.days} label="Days" />
          <span className="font-sans font-bold text-base md:text-lg text-white/50 -mt-2">
            :
          </span>
          <TimeUnit value={time.hours} label="Hrs" />
          <span className="font-sans font-bold text-base md:text-lg text-white/50 -mt-2">
            :
          </span>
          <TimeUnit value={time.minutes} label="Min" />
          <span className="font-sans font-bold text-base md:text-lg text-white/50 -mt-2">
            :
          </span>
          <TimeUnit value={time.seconds} label="Sec" />
        </div>
      </div>
    </div>
  );
}
