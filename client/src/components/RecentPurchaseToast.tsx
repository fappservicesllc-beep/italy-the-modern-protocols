import { useEffect, useRef, useState } from "react";

type ScannedProduct = {
  title: string;
  editionLabel: string;
  priceNumber: number;
  priceText: string;
  thumbnailUrl: string;
};

type ToastData = {
  id: number;
  name: string;
  city: string;
  product: ScannedProduct;
};

const NAMES = [
  "Emma", "Olivia", "Sophia", "Isabella", "Mia", "Charlotte", "Amelia", "Harper",
  "Evelyn", "Abigail", "Liam", "Noah", "Oliver", "James", "Elijah", "William",
  "Henry", "Lucas", "Benjamin", "Theodore", "Jack", "Levi", "Alexander", "Owen",
  "Ava", "Luna", "Ella", "Aria", "Scarlett", "Grace", "Chloe", "Camila",
  "Penelope", "Riley", "Layla", "Lillian", "Nora", "Zoey", "Mila", "Aurora",
  "Hannah", "Lily", "Addison", "Eleanor", "Natalie", "Leah", "Hazel", "Violet",
  "Aurora", "Savannah", "Audrey", "Brooklyn", "Bella", "Claire", "Skylar", "Lucy",
  "Paisley", "Everly", "Anna", "Caroline", "Nova", "Genesis", "Emilia", "Kennedy",
  "Samantha", "Maya", "Willow", "Kinsley", "Naomi", "Aaliyah", "Elena", "Sarah",
  "Mason", "Ethan", "Logan", "Aiden", "Jacob", "Michael", "Daniel", "Matthew",
  "Sebastian", "David", "Joseph", "Carter", "Samuel", "John", "Wyatt", "Luke",
  "Jayden", "Dylan", "Grayson", "Levi", "Isaac", "Gabriel", "Julian", "Mateo",
  "Anthony", "Jaxon", "Lincoln", "Joshua", "Christopher", "Andrew", "Theodore",
  "Caleb", "Ryan", "Asher", "Nathan", "Thomas", "Leo", "Isaiah", "Charles",
];

const US_CITIES = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA",
  "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "Indianapolis, IN",
  "Charlotte, NC", "San Francisco, CA", "Seattle, WA", "Denver, CO", "Washington, DC",
  "Boston, MA", "Nashville, TN", "Baltimore, MD", "Portland, OR", "Las Vegas, NV",
  "Milwaukee, WI", "Albuquerque, NM", "Tucson, AZ", "Fresno, CA", "Sacramento, CA",
  "Kansas City, MO", "Mesa, AZ", "Atlanta, GA", "Miami, FL", "Tampa, FL",
  "Raleigh, NC", "Omaha, NE", "Long Beach, CA", "Minneapolis, MN", "Tulsa, OK",
  "Arlington, TX", "New Orleans, LA", "Wichita, KS", "Cleveland, OH", "Bakersfield, CA",
  "Aurora, CO", "Anaheim, CA", "Honolulu, HI", "Santa Ana, CA", "Riverside, CA",
  "Corpus Christi, TX", "Lexington, KY", "Henderson, NV", "Stockton, CA", "Saint Paul, MN",
  "Cincinnati, OH", "St. Louis, MO", "Pittsburgh, PA", "Greensboro, NC", "Lincoln, NE",
  "Anchorage, AK", "Plano, TX", "Orlando, FL", "Irvine, CA", "Newark, NJ",
  "Toledo, OH", "Durham, NC", "Chula Vista, CA", "Fort Wayne, IN", "Jersey City, NJ",
  "St. Petersburg, FL", "Laredo, TX", "Madison, WI", "Chandler, AZ", "Buffalo, NY",
  "Lubbock, TX", "Scottsdale, AZ", "Reno, NV", "Glendale, AZ", "Gilbert, AZ",
  "Winston-Salem, NC", "North Las Vegas, NV", "Norfolk, VA", "Chesapeake, VA",
  "Garland, TX", "Irving, TX", "Hialeah, FL", "Fremont, CA", "Boise, ID",
  "Richmond, VA", "Baton Rouge, LA", "Spokane, WA", "Des Moines, IA", "Tacoma, WA",
  "San Bernardino, CA", "Modesto, CA", "Fontana, CA", "Santa Clarita, CA",
  "Birmingham, AL", "Oxnard, CA", "Fayetteville, NC", "Moreno Valley, CA",
  "Rochester, NY", "Glendale, CA", "Huntington Beach, CA", "Salt Lake City, UT",
  "Grand Rapids, MI", "Amarillo, TX", "Yonkers, NY", "Aurora, IL", "Montgomery, AL",
  "Akron, OH", "Little Rock, AR", "Huntsville, AL", "Augusta, GA", "Port St. Lucie, FL",
];

const FALLBACK_PRODUCTS: ScannedProduct[] = [
  {
    title: "The Italy Insider Protocol",
    editionLabel: "Physical Book",
    priceNumber: 14,
    priceText: "$14.00",
    thumbnailUrl: "/protocol-hero.jpg",
  },
  {
    title: "The Italy Insider Protocol",
    editionLabel: "Digital Edition",
    priceNumber: 14,
    priceText: "$14.00",
    thumbnailUrl: "/protocol-hero.jpg",
  },
];

const FALLBACK_WEIGHTS = [0.7, 0.3];

function parsePrice(text: string): { number: number; formatted: string } | null {
  if (!text) return null;
  // Match $10.95, $27, 27.00 USD, USD 27, 27 USD, etc.
  const match = text.match(
    /(?:\$|USD\s*)?\s*(\d{1,4}(?:[.,]\d{2})?)\s*(?:USD)?/i
  );
  if (!match) return null;
  const raw = match[1].replace(",", ".");
  const num = parseFloat(raw);
  if (isNaN(num) || num <= 0 || num > 9999) return null;
  const formatted = `$${num.toFixed(num % 1 === 0 ? 0 : 2)}`;
  return { number: num, formatted };
}

function scanJsonLd(): ScannedProduct[] {
  const products: ScannedProduct[] = [];
  const scripts = document.querySelectorAll<HTMLScriptElement>(
    'script[type="application/ld+json"]'
  );
  scripts.forEach((script) => {
    try {
      const data = JSON.parse(script.textContent || "");
      const items = Array.isArray(data) ? data : [data];
      items.forEach((item) => {
        if (item["@type"] === "Product" || item["@type"]?.includes?.("Product")) {
          const offer = Array.isArray(item.offers) ? item.offers[0] : item.offers;
          const priceRaw = offer?.price ?? item.price;
          const priceNum = typeof priceRaw === "number" ? priceRaw : parseFloat(priceRaw);
          if (!isNaN(priceNum) && priceNum > 0) {
            products.push({
              title: item.name || "Product",
              editionLabel: item.category || "Standard Edition",
              priceNumber: priceNum,
              priceText: `$${priceNum.toFixed(priceNum % 1 === 0 ? 0 : 2)}`,
              thumbnailUrl: Array.isArray(item.image) ? item.image[0] : item.image || "",
            });
          }
        }
      });
    } catch {
      // ignore malformed JSON-LD
    }
  });
  return products;
}

function scanDomProducts(): ScannedProduct[] {
  const products: ScannedProduct[] = [];
  const seen = new Set<string>();

  // Look for elements containing CTA-like text
  const ctaRegex = /add to cart|buy now|buy|checkout|order now|comprar|añadir al carrito|get the protocol|unlock|purchase/i;

  const allButtons = Array.from(
    document.querySelectorAll<HTMLElement>('button, a, [role="button"]')
  );
  const ctaCandidates = allButtons.filter((el) =>
    ctaRegex.test(el.textContent || "")
  );

  ctaCandidates.forEach((cta) => {
    // Walk up to find a reasonable card/section container
    let container: HTMLElement | null = cta;
    for (let i = 0; i < 6; i++) {
      if (!container?.parentElement) break;
      container = container.parentElement;
      const text = container.textContent || "";
      if (text.length > 60 && /\$\s?\d/.test(text)) break;
    }
    if (!container) return;

    const text = container.textContent || "";
    const priceMatch = text.match(/\$\s?\d{1,4}(?:\.\d{2})?/);
    if (!priceMatch) return;
    const parsed = parsePrice(priceMatch[0]);
    if (!parsed) return;

    // Title: first heading inside container
    const heading = container.querySelector<HTMLElement>("h1, h2, h3, h4");
    const title = heading?.textContent?.trim() || "Italy Insider Protocol";

    // Edition label: look for small/uppercase eyebrow text
    const eyebrow = container.querySelector<HTMLElement>(
      ".uppercase, .tracking-widest, .text-xs, .text-sm"
    );
    const editionLabel = eyebrow?.textContent?.trim().slice(0, 60) || "Standard Edition";

    // Thumbnail: first image in container
    const img = container.querySelector<HTMLImageElement>("img");
    const thumbnailUrl = img?.src || "/protocol-hero.jpg";

    const key = `${title}::${parsed.number}`;
    if (seen.has(key)) return;
    seen.add(key);

    products.push({
      title,
      editionLabel,
      priceNumber: parsed.number,
      priceText: parsed.formatted,
      thumbnailUrl,
    });
  });

  return products;
}

function scanCatalog(): ScannedProduct[] {
  const jsonLd = scanJsonLd();
  if (jsonLd.length > 0) return jsonLd;

  const dom = scanDomProducts();
  if (dom.length > 0) return dom;

  return FALLBACK_PRODUCTS;
}

function weightedPick<T>(items: T[], weights?: number[]): T {
  if (!weights || weights.length !== items.length) {
    return items[Math.floor(Math.random() * items.length)];
  }
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

export function RecentPurchaseToast() {
  const [toast, setToast] = useState<ToastData | null>(null);
  const [visible, setVisible] = useState(false);
  const recentNamesRef = useRef<string[]>([]);
  const catalogRef = useRef<ScannedProduct[]>([]);
  const usedFallbackRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    // Scan after a short delay so the DOM is fully painted
    const scanTimer = window.setTimeout(() => {
      const catalog = scanCatalog();
      catalogRef.current = catalog;
      usedFallbackRef.current = catalog === FALLBACK_PRODUCTS;
    }, 500);

    const pickName = (): string => {
      const recent = recentNamesRef.current;
      const available = NAMES.filter((n) => !recent.includes(n));
      const pool = available.length > 0 ? available : NAMES;
      const name = pool[Math.floor(Math.random() * pool.length)];
      recent.push(name);
      if (recent.length > 10) recent.shift();
      return name;
    };

    const pickProduct = (): ScannedProduct => {
      const cat = catalogRef.current;
      if (cat.length === 0) return FALLBACK_PRODUCTS[0];
      if (usedFallbackRef.current && cat.length === FALLBACK_PRODUCTS.length) {
        return weightedPick(cat, FALLBACK_WEIGHTS);
      }
      return cat[Math.floor(Math.random() * cat.length)];
    };

    const showToast = () => {
      const newToast: ToastData = {
        id: ++counterRef.current,
        name: pickName(),
        city: US_CITIES[Math.floor(Math.random() * US_CITIES.length)],
        product: pickProduct(),
      };
      setToast(newToast);
      // Next tick to trigger transition
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setVisible(true));
      });

      // After 4s, hide
      const hideTimer = window.setTimeout(() => {
        setVisible(false);
        const removeTimer = window.setTimeout(() => {
          setToast(null);
          scheduleNext();
        }, 600);
        timersRef.current.push(removeTimer);
      }, 4000);
      timersRef.current.push(hideTimer);
    };

    const scheduleNext = () => {
      const delay = 8000 + Math.random() * 7000; // 8–15s
      const t = window.setTimeout(showToast, delay);
      timersRef.current.push(t);
    };

    // First toast after 3s
    const firstTimer = window.setTimeout(showToast, 3000);
    timersRef.current.push(firstTimer);

    return () => {
      window.clearTimeout(scanTimer);
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current = [];
    };
  }, []);

  if (!toast) return null;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="toast-recent-purchase"
      className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 px-3 w-full max-w-sm pointer-events-none"
    >
      <div
        className="pointer-events-auto flex items-center gap-3 rounded-xl border border-emerald-900/10 bg-white shadow-lg p-3 pr-4"
        style={{
          transition: prefersReducedMotion
            ? "opacity 200ms ease-out"
            : "opacity 400ms ease-out, transform 400ms ease-out",
          opacity: visible ? 1 : 0,
          transform: prefersReducedMotion
            ? "none"
            : visible
            ? "translateY(0)"
            : "translateY(16px)",
        }}
      >
        <img
          src={toast.product.thumbnailUrl}
          alt=""
          className="h-12 w-12 rounded-md object-cover flex-shrink-0 border border-emerald-900/10"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          data-testid="img-toast-thumbnail"
        />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] leading-snug text-emerald-950" data-testid="text-toast-message">
            <span className="font-semibold">{toast.name}</span>
            <span className="text-emerald-900/70"> in </span>
            <span className="font-medium">{toast.city}</span>
            <span className="text-emerald-900/70"> just purchased </span>
            <span className="font-semibold">{toast.product.editionLabel}</span>
            <span className="text-emerald-900/70"> — </span>
            <span className="font-bold text-emerald-900">{toast.product.priceText}</span>
          </p>
          <p className="text-[10px] uppercase tracking-wider text-emerald-900/50 mt-0.5">
            Verified purchase · just now
          </p>
        </div>
      </div>
    </div>
  );
}
