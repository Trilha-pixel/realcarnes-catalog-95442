// Royal Alimentos - Express Server with API
import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Port configuration
// Replit Autoscale sets PORT to 5000 (forwarded to external port 80)
// In development, use 5001 (separate from Vite dev server on 5000)
const PORT = process.env.PORT ? parseInt(process.env.PORT) : (process.env.NODE_ENV === 'production' ? 5000 : 5001);

// Middleware
app.use(cors());
// Aumentar limite para importação CSV de muitos produtos (50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
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

      console.log(logLine);
    }
  });

  next();
});

// Register API routes
registerRoutes(app);

// Serve static files from dist in production
if (process.env.NODE_ENV === 'production') {
  const distPath = join(__dirname, '..', 'dist');
  
  // Serve static assets
  app.use(express.static(distPath));
  
  // Serve public folder (produtos images)
  app.use('/produtos', express.static(join(__dirname, '..', 'public', 'produtos')));
  
  // SPA fallback - serve index.html for all non-API routes
  // Express 5.x requires app.use() middleware instead of app.get('/*')
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Only serve index.html for non-API routes
    if (!req.path.startsWith('/api') && !req.path.startsWith('/produtos')) {
      res.sendFile(join(distPath, 'index.html'));
    } else {
      next();
    }
  });
}

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Server error:", err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});

// Start server with error handling
const server = app.listen(PORT, () => {
  console.log(`🚀 Royal Alimentos API Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}).on('error', (err: any) => {
  console.error('❌ Failed to start server:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  }
  process.exit(1);
});
