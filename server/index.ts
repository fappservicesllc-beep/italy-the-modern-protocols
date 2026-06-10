import express from "express";
import http from "http";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());

const server = http.createServer(app);

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
