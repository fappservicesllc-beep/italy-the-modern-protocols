import { useEffect, useState } from "react";

function getNextSundayMidnightEST(): number {
  // Target: this coming Sunday at 23:59:59 in EST (UTC-5, no DST adjustment).
  // We shift "now" into EST clock, walk forward to Sunday 23:59:59, then
  // convert back to a UTC epoch ms so the countdown is correct in any viewer timezone.
  const EST_OFFSET_HOURS = -5;
  const nowUtcMs = Date.now();
  const nowEstMs = nowUtcMs + EST_OFFSET_HOURS * 60 * 60 * 1000;
  const nowEst = new Date(nowEstMs);

  const dayOfWeek = nowEst.getUTCDay(); // 0 = Sunday on EST-shifted clock
  const daysUntilSunday = (7 - dayOfWeek) % 7;

  const targetEst = new Date(nowEst);
  targetEst.setUTCDate(nowEst.getUTCDate() + daysUntilSunday);
  targetEst.setUTCHours(23, 59, 59, 0);

  // If it's already past Sunday 23:59 EST, jump to next week
  if (targetEst.getTime() <= nowEstMs) {
    targetEst.setUTCDate(targetEst.getUTCDate() + 7);
  }

  return targetEst.getTime() - EST_OFFSET_HOURS * 60 * 60 * 1000;
}

function formatRemaining(ms: number): string {
  if (ms <= 0) return "00d 00h 00m 00s";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

export function AnnouncementBar() {
  const [targetMs] = useState<number>(() => getNextSundayMidnightEST());
  const [remaining, setRemaining] = useState<number>(() => targetMs - Date.now());

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining(targetMs - Date.now());
    }, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 text-white text-center font-sans"
      style={{
        backgroundColor: "#1a3a2a",
        padding: "10px",
        fontSize: "13px",
        lineHeight: 1.3,
      }}
      data-testid="banner-announcement"
    >
      <span>
        🔥 Introductory Price: $10.95 — Price increases to $27 on Sunday. Time remaining:{" "}
      </span>
      <span
        data-testid="text-countdown"
        style={{
          fontVariantNumeric: "tabular-nums",
          fontWeight: 700,
          color: "#f5d28a",
          marginLeft: "4px",
          letterSpacing: "0.02em",
        }}
      >
        {formatRemaining(remaining)}
      </span>
    </div>
  );
}
