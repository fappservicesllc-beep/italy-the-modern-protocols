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

// server/index.ts
var app = express2();
app.use(express2.json());
var server = http.createServer(app);
(async () => {
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
