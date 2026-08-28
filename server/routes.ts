import type { Express } from "express";

/**
 * Dev/preview mirror of netlify/functions/lead.mjs.
 *
 * In production Netlify serves /api/lead from the serverless function; in the
 * sandbox preview there is no Netlify runtime, so Express answers the same path
 * with the same behaviour. Keeping both means the form can be tested end-to-end
 * from the preview without pushing.
 */

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/6jUCcpr6kuNkR0rlbxtr/webhook-trigger/j1BZ02HVHO9FQY1pMzwY";

const DESTINATION_EMAIL = "themodernprotocols@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${DESTINATION_EMAIL}`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function registerRoutes(app: Express): void {
  app.post("/api/lead", async (req, res) => {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const email = String(body.email ?? "").trim();

    if (!EMAIL_RE.test(email)) {
      res.status(400).json({ ok: false, error: "A valid email is required" });
      return;
    }

    const ghlFields = {
      email,
      first_name: String(body.first_name ?? email.split("@")[0] ?? ""),
      // Honour a tag sent by the caller so each form can be segmented into its
      // own GHL workflow; fall back to the Packing Masterlist tag for the
      // original form, which does not send one.
      tags: String(body.tags ?? "") || "italy-packing-masterlist",
      source:
        String(body.source ?? "") ||
        "Italy Insider Protocol - Packing Masterlist form",
      page: String(body.page ?? ""),
      submitted_at: new Date().toISOString(),
    };

    let ghlStatus = 0;
    let ghlBody = "";
    let ghlError = "";

    try {
      const ghlRes = await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ghlFields),
      });
      ghlStatus = ghlRes.status;
      ghlBody = await ghlRes.text().catch(() => "");
      console.log("[lead] GHL responded", ghlStatus, ghlBody);
    } catch (err) {
      ghlError = String(err);
      console.error("[lead] GHL request failed:", ghlError);
    }

    let emailRelayStatus = 0;
    try {
      const relay = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          _subject: `New lead — ${ghlFields.source} (server relay)`,
          source: ghlFields.source,
          page: ghlFields.page,
          _template: "table",
          _captcha: "false",
        }),
      });
      emailRelayStatus = relay.status;
    } catch (err) {
      console.warn("[lead] inbox relay failed:", String(err));
    }

    const ghlAccepted = ghlStatus >= 200 && ghlStatus < 300;

    res.status(ghlAccepted ? 200 : 502).json({
      ok: ghlAccepted,
      ghlStatus,
      ghlBody: ghlBody.slice(0, 500),
      ghlError,
      emailRelayStatus,
    });
  });
}
