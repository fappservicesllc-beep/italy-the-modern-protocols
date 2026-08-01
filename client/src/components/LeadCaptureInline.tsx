import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Destination inbox for every captured lead.
const DESTINATION_EMAIL = "themodernprotocols@gmail.com";

// FormSubmit.co relays a static-site form POST straight to the inbox above with
// zero backend and zero API keys. The address must confirm the very first
// submission once (FormSubmit emails a one-click activation link); every
// submission after that arrives automatically.
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${DESTINATION_EMAIL}`;

// Netlify Forms mirror — the ghost <form name="packing-masterlist"> in
// client/index.html registers this at build time so leads are ALSO stored in
// the Netlify dashboard. Belt and suspenders: if one channel fails, the other
// still keeps the lead.
const NETLIFY_FORM_NAME = "packing-masterlist";

// GoHighLevel Inbound Webhook trigger. This is the primary destination: the
// lead lands in the GHL workflow, which creates/updates the contact and can
// auto-deliver the Masterlist by email. A webhook URL is safe to ship in
// client-side code — unlike a GHL API token, it grants no account access, it
// only accepts inbound payloads.
export const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/6jUCcpr6kuNkR0rlbxtr/webhook-trigger/j1BZ02HVHO9FQY1pMzwY";

// Why GET-with-query-params is the PRIMARY shape rather than POST+JSON:
// measured against the live endpoint, a GET carrying query params answers with
// a `traceId` in the body, while a POST with a JSON body answers without one.
// That traceId is GHL recording the hit in its request trace — which is what
// populates the trigger's "Recent Requests" / "Test Trigger" picker used to
// pick a Mapping Reference. A GET is also a CORS-"simple" request: no OPTIONS
// preflight, no Content-Type header, so there is one less thing between the
// browser and GHL. POST+JSON is kept as an automatic fallback below.
const buildGhlUrl = (params: Record<string, string>) => {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) qs.set(key, value);
  }
  return `${GHL_WEBHOOK_URL}?${qs.toString()}`;
};

/**
 * Inline lead-capture block. Lives INSIDE the offer card, directly beneath the
 * Bonus #2 copy — deliberately not a popup, so it reads as one more piece of
 * the stack rather than an interruption. Submitting captures the email across
 * three channels (GoHighLevel webhook, inbox relay, Netlify Forms), all
 * fire-and-forget so a slow or failed network never blocks the reader. There is
 * no redirect: the reader stays on the offer with the green CTA in view.
 */
export function LeadCaptureInline() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Fire-and-forget persistence. Every channel is wrapped so a network failure
  // can NEVER block or slow the reader down.
  const persistLead = (address: string) => {
    try {
      window.localStorage.setItem(
        "iip_packing_lead",
        JSON.stringify({ email: address, ts: Date.now() }),
      );
    } catch {
      /* localStorage unavailable (private mode) — ignore */
    }

    // Channel 1 — GoHighLevel Inbound Webhook (primary CRM destination).
    // Fields are kept FLAT and use GHL's canonical contact names (email,
    // first_name, tags) so the workflow's Create/Update Contact step can map
    // them directly without custom-field gymnastics.
    const ghlFields: Record<string, string> = {
      email: address,
      first_name: address.split("@")[0] ?? "",
      tags: "italy-packing-masterlist",
      source: "Italy Insider Protocol - Packing Masterlist form",
      page: typeof window !== "undefined" ? window.location.href : "",
      submitted_at: new Date().toISOString(),
    };

    try {
      // Primary attempt: GET + query params. Simple CORS request (no preflight)
      // and the shape that GHL answers with a traceId, i.e. the one it records
      // in the trigger's Recent Requests list.
      void fetch(buildGhlUrl(ghlFields), {
        method: "GET",
        keepalive: true,
      })
        .then(async (res) => {
          const text = await res.text().catch(() => "");
          console.info("[GHL webhook GET]", res.status, text);
        })
        .catch((err) => {
          console.warn("[GHL webhook GET] failed:", err);
        });

      // Fallback attempt: POST + JSON body. Harmless duplicate — GHL dedupes on
      // email when the workflow's Create/Update Contact step runs — and it
      // guarantees delivery if the GET shape is ever rejected or rate-limited.
      void fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ghlFields),
        keepalive: true,
      })
        .then(async (res) => {
          const text = await res.text().catch(() => "");
          console.info("[GHL webhook POST]", res.status, text);
        })
        .catch((err) => {
          console.warn("[GHL webhook POST] failed:", err);
        });
    } catch {
      /* ignore */
    }

    // Channel 2 — email straight to the destination inbox.
    try {
      void fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: address,
          _subject: "New lead — 2026 Italy Packing Masterlist",
          source: "Inline form under Bonus #2 — italy.themodernprotocols.com",
          _template: "table",
          _captcha: "false",
        }),
        // Survives the redirect to Shopify — the browser finishes the request
        // even after this page starts unloading.
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* ignore */
    }

    // Channel 3 — Netlify Forms mirror.
    try {
      const body = new URLSearchParams({
        "form-name": NETLIFY_FORM_NAME,
        email: address,
      }).toString();
      void fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* ignore */
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const address = email.trim();

    if (!EMAIL_RE.test(address)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setSubmitted(true);
    persistLead(address);

    // Track the lead in Meta, deferred so it never delays the UI update.
    window.setTimeout(() => {
      try {
        window.fbq?.("track", "Lead", {
          content_name: "2026 Italy Packing Masterlist",
        });
      } catch {
        /* pixel not loaded — ignore */
      }
    }, 0);
  };

  return (
    <div
      className="max-w-xl mx-auto mt-4 md:mt-5 bg-white/70 border border-gold/35 rounded-sm px-4 sm:px-5 py-4 md:py-5"
      data-testid="inline-lead-capture"
    >
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-2.5">
          <div className="h-px w-5 bg-gold" />
          <span className="text-gold font-sans text-[10px] font-bold tracking-[0.25em] uppercase">
            Free Download
          </span>
          <div className="h-px w-5 bg-gold" />
        </div>
      </div>

      <h3
        className="font-serif text-xl md:text-2xl text-emerald-900 font-bold text-center leading-tight"
        data-testid="text-lead-headline"
      >
        Get my Free 2026 Italy Packing Masterlist{" "}
        <span aria-hidden="true">🇮🇹</span>
      </h3>

      <p className="font-sans font-light text-sm md:text-base text-charcoal/70 text-center mt-2 leading-snug">
        Enter your email to receive the list and continue to the Protocol.
      </p>

      {submitted ? (
        <div
          className="mt-4 text-center"
          role="status"
          data-testid="text-lead-success"
        >
          <p className="font-serif text-xl md:text-2xl text-emerald-900 font-bold">
            <span aria-hidden="true">✓</span> Your Masterlist is on its way.
          </p>
          <p className="font-sans text-sm text-charcoal/70 mt-1.5">
            Check your inbox in a few minutes — then claim your Protocol below.
          </p>
        </div>
      ) : (
        <>
          <form
            name={NETLIFY_FORM_NAME}
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col sm:flex-row gap-2.5"
            data-testid="form-lead-capture"
            noValidate
          >
            <label htmlFor="inline-lead-email" className="sr-only">
              Email Address
            </label>
            <input
              id="inline-lead-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full sm:flex-1 rounded-sm border border-charcoal/20 bg-ivory px-4 py-3.5 font-sans text-base text-charcoal placeholder:text-charcoal/40 focus:border-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-900/15 transition-colors"
              data-testid="input-lead-email"
            />
            <button
              type="submit"
              className="inline-flex w-full sm:w-auto flex-shrink-0 items-center justify-center bg-emerald-900 hover:bg-emerald-900/90 px-5 py-3.5 rounded-sm font-serif text-base tracking-[0.12em] uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-emerald-900/20 cursor-pointer whitespace-nowrap"
              style={{ color: "#C9A961" }}
              data-testid="button-send-masterlist"
            >
              Send my List &amp; Continue
            </button>
          </form>

          {error && (
            <p
              className="mt-2.5 text-center font-sans text-sm text-[#8a1220]"
              role="alert"
              data-testid="text-lead-error"
            >
              {error}
            </p>
          )}

          <p className="text-[10px] text-charcoal/50 font-sans text-center mt-3 uppercase tracking-[0.2em]">
            No spam · Unsubscribe anytime
          </p>
        </>
      )}
    </div>
  );
}
