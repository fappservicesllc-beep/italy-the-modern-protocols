// server/index.ts
import express2 from "express";
import http from "http";

// server/vite.ts
import express from "express";
import fs from "fs";
import path from "path";
function log(message) {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [express] ${message}`);
}
async function setupVite(app2, server2) {
  const { createServer: createViteServer, createLogger } = await import("vite");
  const { default: react } = await import("@vitejs/plugin-react");
  const viteLogger = createLogger();
  const vite = await createViteServer({
    configFile: false,
    appType: "custom",
    root: path.resolve(import.meta.dirname, "..", "client"),
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "..", "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "..", "shared")
      }
    },
    server: {
      middlewareMode: true,
      hmr: { server: server2, clientPort: 443 },
      allowedHosts: true
    },
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
      }
    }
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

// server/routes.ts
var GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/6jUCcpr6kuNkR0rlbxtr/webhook-trigger/j1BZ02HVHO9FQY1pMzwY";
var DESTINATION_EMAIL = "themodernprotocols@gmail.com";
var FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${DESTINATION_EMAIL}`;
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function registerRoutes(app2) {
  app2.post("/api/lead", async (req, res) => {
    const body = req.body ?? {};
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
      source: String(body.source ?? "") || "Italy Insider Protocol - Packing Masterlist form",
      page: String(body.page ?? ""),
      submitted_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    let ghlStatus = 0;
    let ghlBody = "";
    let ghlError = "";
    try {
      const ghlRes = await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ghlFields)
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
          Accept: "application/json"
        },
        body: JSON.stringify({
          email,
          _subject: `New lead \u2014 ${ghlFields.source} (server relay)`,
          source: ghlFields.source,
          page: ghlFields.page,
          _template: "table",
          _captcha: "false"
        })
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
      emailRelayStatus
    });
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
var server = http.createServer(app);
(async () => {
  registerRoutes(app);
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    await setupVite(app, server);
  }
  const port = parseInt(process.env.PORT || "5173", 10);
  server.listen({ port, host: "0.0.0.0" }, () => {
    log(`serving on port ${port}`);
  });
})();
