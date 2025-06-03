import express, { type Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { registerRoutes } from "./routes";
import { log, serveStatic } from "./vite-prod";

// Load environment variables
config();

const app = express();

// CORS configuration for production
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Alternative dev server
    process.env.FRONTEND_URL, // Production frontend URL
  ].filter(Boolean);

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
  try {
    console.log('🔄 Starting server initialization...');

    const server = await registerRoutes(app);
    console.log('✅ Routes registered successfully');

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      console.error('Express error:', err);
      res.status(status).json({ message });
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (process.env.NODE_ENV === "development") {
      console.log('🔧 Setting up Vite for development...');
      try {
        // Dynamically import Vite only in development
        const viteModule = await import("./vite");
        await viteModule.setupVite(app, server);
      } catch (error) {
        console.warn('Vite setup failed, falling back to static serving:', error);
        serveStatic(app);
      }
    } else {
      console.log('📦 Setting up static file serving for production...');
      serveStatic(app);
    }

    // Use Railway's PORT environment variable in production, fallback to 5000
    const port = parseInt(process.env.PORT || '5000', 10);
    console.log(`🌐 Attempting to start server on port ${port}...`);

    server.on('error', (error: any) => {
      console.error('❌ Server error:', error);
      process.exit(1);
    });

    server.listen(port, "0.0.0.0", () => {
      console.log(`🚀 SEO Audit Pro API serving on port ${port}`);
      console.log(`📍 Health check: http://0.0.0.0:${port}/`);
      console.log(`🔧 API endpoints: http://0.0.0.0:${port}/api/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
})().catch((error) => {
  console.error('❌ Unhandled startup error:', error);
  process.exit(1);
});
