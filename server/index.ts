import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Middleware to log API calls
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // ✅ Mock SMS endpoint (Twilio/Exotel will hit this)
  app.post("/sms", (req: Request, res: Response) => {
    const incomingMsg = (req.body.Body || "").trim().toUpperCase(); // Example: "BUS 101"
    let reply = "Sorry, I didn’t understand that. Try BUS <id>.";

    if (incomingMsg.startsWith("BUS")) {
      const busId = incomingMsg.split(" ")[1] || "?";
      // 🔹 In real system: query bus data from DB/GPS
      reply = `Bus ${busId} arriving in ~5 minutes.`;
    }

    // Respond with TwiML XML (Twilio format)
    res.type("text/xml");
    res.send(`
      <Response>
        <Message>${reply}</Message>
      </Response>
    `);
  });

  // ✅ Mock IVR endpoint
  app.post("/ivr", (_req: Request, res: Response) => {
    res.type("text/xml");
    res.send(`
      <Response>
        <Gather numDigits="1" action="/ivr/handle" method="POST">
          <Say>Welcome to LokYatra. Press 1 for Bus 101 ETA. Press 2 for Bus 102 ETA.</Say>
        </Gather>
      </Response>
    `);
  });

  app.post("/ivr/handle", (req: Request, res: Response) => {
    const digit = req.body.Digits;
    let message = "Sorry, invalid choice.";

    if (digit === "1") message = "Bus 101 arriving in 5 minutes.";
    if (digit === "2") message = "Bus 102 arriving in 12 minutes.";

    res.type("text/xml");
    res.send(`
      <Response>
        <Say>${message}</Say>
        <Hangup/>
      </Response>
    `);
  });

  // ✅ Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // ✅ Setup Vite only in dev
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ✅ Use environment port
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
