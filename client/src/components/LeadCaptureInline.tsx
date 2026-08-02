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

// Same-origin lead endpoint. The browser NEVER calls GoHighLevel directly any
// more, and that is the whole point.
//
// Symptom that proved it: a submission from an office computer delivered the
// FormSubmit email but produced nothing in GHL — while hitting the GHL webhook
// URL with curl always worked. That combination can only mean the request died
// client-side, before it ever hit the network. Two very common causes:
// corporate firewalls deny-list CRM/marketing hosts, and ad/tracker blockers
// (uBlock Origin, Brave Shields, AdGuard, and the EasyPrivacy list they share)
// block leadconnectorhq.com as a tracker. FormSubmit kept working because
// nobody blocks formsubmit.co.
//
// Posting to our own domain instead removes the failure mode entirely: there is
// no third-party hostname to match on and no CORS preflight. The server
// (netlify/functions/lead.mjs in production, server/routes.ts in the preview)
// forwards the lead to GHL from a network where no blocker exists — and it
// sends a flat JSON body matching the trigger's saved Mapping Reference, so
// Create/Update Contact reads the email correctly.
const LEAD_ENDPOINT = "/api/lead";

// GoHighLevel Inbound Webhook. Requested by GHL support as a FormSubmit
// `_webhook` forward: FormSubmit re-posts every submission it receives to this
// URL from ITS OWN servers. That server-to-server hop is immune to the office
// firewall / tracker-blocker problem described above, because the browser never
// contacts leadconnectorhq.com — FormSubmit does. It runs alongside (not
// instead of) the /api/lead relay, so the lead reaches GHL by two independent
// paths and a failure in either one is survivable.
const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/6jUCcpr6kuNkR0rlbxtr/webhook-trigger/j1BZ02HVHO9FQY1pMzwY";

const LEAD_REQUEST_TIMEOUT_MS = 8000;

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

    // Channel 1 — our own same-origin endpoint, which relays to GoHighLevel
    // server-side. EXACTLY ONE request per lead, so the workflow enrolls once
    // and the reader is emailed the Masterlist once.
    const leadFields: Record<string, string> = {
      email: address,
      first_name: address.split("@")[0] ?? "",
      source: "Italy Insider Protocol - Packing Masterlist form",
      page: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      void fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadFields),
        keepalive: true,
        signal:
          typeof AbortSignal !== "undefined" && "timeout" in AbortSignal
            ? AbortSignal.timeout(LEAD_REQUEST_TIMEOUT_MS)
            : undefined,
      })
        .then(async (res) => {
          const text = await res.text().catch(() => "");
          console.info("[lead relay]", res.status, text);
        })
        .catch((err) => {
          console.warn("[lead relay] failed:", err);
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
          first_name: address.split("@")[0] ?? "",
          _subject: "New lead — 2026 Italy Packing Masterlist",
          source: "Inline form under Bonus #2 — italy.themodernprotocols.com",
          _template: "table",
          _captcha: "false",
          // FormSubmit forwards this submission to GoHighLevel from its own
          // servers — a second, blocker-proof path into the CRM.
          _webhook: GHL_WEBHOOK_URL,
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
            {/* FormSubmit forwards every submission to GoHighLevel from its own
                servers. Present in the rendered form HTML so a no-JS / native
                POST submission still reaches the CRM. */}
            <input
              type="hidden"
              name="_webhook"
              value={GHL_WEBHOOK_URL}
              data-testid="input-ghl-webhook"
            />

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
