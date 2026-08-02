/**
 * Server-side lead relay for the Packing Masterlist form.
 *
 * WHY THIS EXISTS
 * ---------------
 * The browser used to POST the lead straight to the GoHighLevel Inbound Webhook
 * at services.leadconnectorhq.com. That works from a plain network, but it
 * silently fails on a large slice of real traffic:
 *
 *   - Corporate networks and office firewalls block CRM/marketing hostnames
 *     outright (leadconnectorhq.com is on many enterprise deny-lists).
 *   - Ad/tracker blockers (uBlock Origin, Brave Shields, Ghostery, AdGuard, and
 *     the EasyPrivacy list they all ship) block leadconnectorhq.com as a
 *     tracker. The fetch never leaves the browser — it's cancelled before DNS.
 *   - In every one of those cases the request dies CLIENT-side, which is why
 *     FormSubmit (a domain nobody blocks) kept delivering while GHL got nothing,
 *     and why hitting the webhook URL directly with curl always worked.
 *
 * The fix is to never let the browser talk to GHL. The browser posts to
 * /api/lead — same-origin, on the site's own domain, so there is nothing for a
 * blocker or firewall to match on and no CORS preflight at all — and THIS
 * function forwards the lead to GHL from Netlify's server, where no blocker or
 * corporate proxy exists.
 *
 * The payload shape sent to GHL is a flat JSON body, matching the trigger's
 * saved Mapping Reference ({ "email": "...", "first_name": "..." }) exactly, so
 * the workflow's Create/Update Contact step reads the email correctly.
 */

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/6jUCcpr6kuNkR0rlbxtr/webhook-trigger/j1BZ02HVHO9FQY1pMzwY";

const DESTINATION_EMAIL = "themodernprotocols@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${DESTINATION_EMAIL}`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const JSON_HEADERS = {
  "Content-Type": "application/json",
  // Same-origin in production, but the preview environment lives on another
  // host, so allow it explicitly rather than debugging a phantom CORS error.
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: JSON_HEADERS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ok: false, error: "Method not allowed" }),
    };
  }

  let payload = {};
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ok: false, error: "Invalid JSON body" }),
    };
  }

  const email = String(payload.email || "").trim();
  if (!EMAIL_RE.test(email)) {
    return {
      statusCode: 400,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ok: false, error: "A valid email is required" }),
    };
  }

  // Flat fields using GHL's canonical contact names so the workflow's mapping
  // resolves without custom-field gymnastics.
  const ghlFields = {
    email,
    first_name: String(payload.first_name || email.split("@")[0] || ""),
    tags: "italy-packing-masterlist",
    source:
      String(payload.source || "") ||
      "Italy Insider Protocol - Packing Masterlist form",
    page: String(payload.page || ""),
    submitted_at: new Date().toISOString(),
  };

  let ghlStatus = 0;
  let ghlBody = "";
  let ghlError = "";

  try {
    const res = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ghlFields),
    });
    ghlStatus = res.status;
    ghlBody = await res.text().catch(() => "");
    console.log("[lead] GHL responded", ghlStatus, ghlBody);
  } catch (err) {
    ghlError = String(err);
    console.error("[lead] GHL request failed:", ghlError);
  }

  // Inbox safety net, also sent server-side. If a blocker killed the browser's
  // own FormSubmit call too, the lead still reaches the inbox from here.
  let emailRelayStatus = 0;
  try {
    const res = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email,
        _subject: "New lead — 2026 Italy Packing Masterlist (server relay)",
        source: ghlFields.source,
        page: ghlFields.page,
        _template: "table",
        _captcha: "false",
      }),
    });
    emailRelayStatus = res.status;
  } catch (err) {
    console.warn("[lead] inbox relay failed:", String(err));
  }

  const ghlAccepted = ghlStatus >= 200 && ghlStatus < 300;

  return {
    statusCode: ghlAccepted ? 200 : 502,
    headers: JSON_HEADERS,
    body: JSON.stringify({
      ok: ghlAccepted,
      ghlStatus,
      ghlBody: ghlBody.slice(0, 500),
      ghlError,
      emailRelayStatus,
    }),
  };
};
