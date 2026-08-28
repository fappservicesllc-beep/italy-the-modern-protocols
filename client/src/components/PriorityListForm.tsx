import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DESTINATION_EMAIL = "themodernprotocols@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${DESTINATION_EMAIL}`;

// Netlify Forms mirror — the ghost <form name="priority-list"> in
// client/index.html registers this at build time, so leads are also stored in
// the Netlify dashboard even if both other channels fail.
const NETLIFY_FORM_NAME = "priority-list";

// Same-origin relay. The browser NEVER calls GoHighLevel directly: office
// firewalls and tracker blockers (uBlock, Brave Shields, AdGuard, EasyPrivacy)
// deny-list leadconnectorhq.com, so a direct call dies client-side before DNS.
// Posting to our own domain removes that failure mode entirely — the server
// (netlify/functions/lead.mjs in production, server/routes.ts in the preview)
// forwards to GHL from a network where no blocker exists.
const LEAD_ENDPOINT = "/api/lead";

// GoHighLevel Inbound Webhook, forwarded by FormSubmit's own servers via the
// `_webhook` field. That server-to-server hop is a second, independent path
// into the CRM, immune to the same client-side blocking.
const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/6jUCcpr6kuNkR0rlbxtr/webhook-trigger/j1BZ02HVHO9FQY1pMzwY";

// Tag applied in GHL so Pronunciation Lab waitlist leads can be segmented
// away from the Packing Masterlist list and enrolled in their own workflow.
const LEAD_TAG = "italy-pronunciation-lab-waitlist";

const LEAD_REQUEST_TIMEOUT_MS = 8000;

/**
 * Priority-list capture for The Italy Pronunciation Lab, inside the "Coming
 * Soon" card on /planyourtripwithus. Replaces the old mailto: link, which
 * depended on the reader having a working mail client and dropped the lead
 * entirely on phones and webmail-only machines. Submitting now reaches the CRM
 * over the same three channels the Packing Masterlist form uses.
 */
export function PriorityListForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Fire-and-forget on every channel: a slow or failed network can NEVER block
  // the confirmation the reader sees.
  const persistLead = (address: string) => {
    try {
      window.localStorage.setItem(
        "iip_pronunciation_lab_lead",
        JSON.stringify({ email: address, ts: Date.now() }),
      );
    } catch {
      /* localStorage unavailable (private mode) — ignore */
    }

    // Channel 1 — same-origin endpoint, which relays to GoHighLevel server-side.
    const leadFields: Record<string, string> = {
      email: address,
      first_name: address.split("@")[0] ?? "",
      tags: LEAD_TAG,
      source: "Italy Pronunciation Lab - Priority List",
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
          console.info("[priority list relay]", res.status, text);
        })
        .catch((err) => {
          console.warn("[priority list relay] failed:", err);
        });
    } catch {
      /* ignore */
    }

    // Channel 2 — inbox copy, plus FormSubmit's server-side forward to GHL.
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
          tags: LEAD_TAG,
          _subject: "New lead — Italy Pronunciation Lab priority list",
          source: "Priority list — italy.themodernprotocols.com/planyourtripwithus",
          _template: "table",
          _captcha: "false",
          _webhook: GHL_WEBHOOK_URL,
        }),
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

    window.setTimeout(() => {
      try {
        window.fbq?.("track", "Lead", {
          content_name: "Italy Pronunciation Lab — Priority List",
        });
      } catch {
        /* pixel not loaded — ignore */
      }
    }, 0);
  };

  if (submitted) {
    return (
      <div
        className="w-full md:w-[300px]"
        role="status"
        data-testid="text-priority-list-success"
      >
        <p className="font-serif text-2xl text-emerald-900 leading-tight">
          <span aria-hidden="true">✓</span> You&rsquo;re on the list.
        </p>
        <p className="mt-2 font-sans font-light text-[13px] text-charcoal/70 leading-relaxed">
          I&rsquo;ll email you before the first session opens — sessions are
          capped at 5 travelers, and the list is served in order.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[300px]">
      <form
        name={NETLIFY_FORM_NAME}
        onSubmit={handleSubmit}
        className="flex flex-col gap-2.5"
        data-testid="form-priority-list"
        noValidate
      >
        {/* FormSubmit forwards this submission to GoHighLevel from its own
            servers, so the CRM is reached even without JavaScript. */}
        <input
          type="hidden"
          name="_webhook"
          value={GHL_WEBHOOK_URL}
          data-testid="input-priority-webhook"
        />

        <label htmlFor="priority-list-email" className="sr-only">
          Email Address
        </label>
        <input
          id="priority-list-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full rounded-sm border border-charcoal/20 bg-ivory px-4 py-3.5 font-sans text-base text-charcoal placeholder:text-charcoal/40 focus:border-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-900/15 transition-colors"
          data-testid="input-priority-list-email"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center w-full border border-emerald-900/30 bg-emerald-900 text-ivory px-7 py-4 rounded-sm font-sans text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 hover-elevate active-elevate-2 cursor-pointer"
          data-testid="button-join-priority-list"
        >
          Join the Priority List
        </button>
      </form>

      {error && (
        <p
          className="mt-2 font-sans text-[13px] text-[#8a1220]"
          role="alert"
          data-testid="text-priority-list-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}
