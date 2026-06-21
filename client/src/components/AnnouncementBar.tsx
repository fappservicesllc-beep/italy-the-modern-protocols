import { useEffect, useState } from "react";

function getTonightMidnightMiami(): number {
  // Target: tonight at 23:59:59 in America/New_York (Miami's timezone).
  // Intl handles DST automatically (EDT in summer = UTC-4, EST in winter = UTC-5),
  // so we never have to hardcode an offset.
  const TZ = "America/New_York";
  const now = new Date();

  // Read the current wall-clock date in Miami's timezone.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const year = get("year");
  const month = get("month");
  const day = get("day");

  // Find the UTC epoch ms that corresponds to YYYY-MM-DD 23:59:59 in America/New_York.
  // Strategy: pick a UTC guess, see what Miami wall-clock it produces, adjust.
  const targetWall = Date.UTC(year, month - 1, day, 23, 59, 59);
  const guessAsLocal = new Date(targetWall);
  const miamiParts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(guessAsLocal);
  const mGet = (type: string) => Number(miamiParts.find((p) => p.type === type)?.value);
  const miamiAsUtc = Date.UTC(
    mGet("year"),
    mGet("month") - 1,
    mGet("day"),
    mGet("hour"),
    mGet("minute"),
    mGet("second"),
  );
  const offsetMs = miamiAsUtc - targetWall;
  let targetEpoch = targetWall - offsetMs;

  // If midnight already passed in Miami, roll to tomorrow night.
  if (targetEpoch <= now.getTime()) {
    targetEpoch += 24 * 60 * 60 * 1000;
  }

  return targetEpoch;
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
  const [targetMs] = useState<number>(() => getTonightMidnightMiami());
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
        🔥 Offer Ends Tonight: $10.95 — Price increases to $27 at midnight. Time remaining:{" "}
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
