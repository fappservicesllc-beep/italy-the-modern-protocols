import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import type { Server } from "http";

export function log(message: string) {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [express] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
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
        "@shared": path.resolve(import.meta.dirname, "..", "shared"),
      },
    },
    server: {
      middlewareMode: true,
      hmr: { server, clientPort: 443 },
      allowedHosts: true,
    },
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
      },
    },
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
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
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
