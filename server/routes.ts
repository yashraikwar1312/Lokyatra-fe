import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { 
  insertBusSchema, 
  insertRouteSchema, 
  insertAlertSchema, 
  insertPassengerHeatmapSchema, 
  insertAiRecommendationSchema, 
  insertSystemMetricsSchema,
  insertSosRequestSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // WebSocket server
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // Store active WebSocket connections
  const clients = new Set<WebSocket>();

  wss.on('connection', (ws: WebSocket) => {
    clients.add(ws);
    console.log('WebSocket client connected');

    ws.on('close', () => {
      clients.delete(ws);
      console.log('WebSocket client disconnected');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clients.delete(ws);
    });
  });

  // Broadcast function for real-time updates
  const broadcast = (data: any) => {
    const message = JSON.stringify(data);
    clients.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });
  };

  // API Routes

  // System Metrics
  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await storage.getLatestSystemMetrics();
      if (!metrics) {
        return res.status(404).json({ message: "No metrics found" });
      }
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch metrics" });
    }
  });

  app.post("/api/metrics", async (req, res) => {
    try {
      const validatedData = insertSystemMetricsSchema.parse(req.body);
      const metrics = await storage.createSystemMetrics(validatedData);
      broadcast({ type: 'metrics_update', data: metrics });
      res.status(201).json(metrics);
    } catch (error) {
      res.status(400).json({ message: "Invalid metrics data", error });
    }
  });

  // Buses
  app.get("/api/buses", async (req, res) => {
    try {
      const buses = await storage.getAllBuses();
      res.json(buses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch buses" });
    }
  });

  app.get("/api/buses/:id", async (req, res) => {
    try {
      const bus = await storage.getBusById(req.params.id);
      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }
      res.json(bus);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bus" });
    }
  });

  app.post("/api/buses", async (req, res) => {
    try {
      const validatedData = insertBusSchema.parse(req.body);
      const bus = await storage.createBus(validatedData);
      broadcast({ type: 'bus_created', data: bus });
      res.status(201).json(bus);
    } catch (error) {
      res.status(400).json({ message: "Invalid bus data", error });
    }
  });

  app.put("/api/buses/:id", async (req, res) => {
    try {
      const validatedData = insertBusSchema.partial().parse(req.body);
      const bus = await storage.updateBus(req.params.id, validatedData);
      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }
      broadcast({ type: 'bus_updated', data: bus });
      res.json(bus);
    } catch (error) {
      res.status(400).json({ message: "Invalid bus data", error });
    }
  });

  app.delete("/api/buses/:id", async (req, res) => {
    try {
      const success = await storage.deleteBus(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Bus not found" });
      }
      broadcast({ type: 'bus_deleted', data: { id: req.params.id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete bus" });
    }
  });

  // Routes
  app.get("/api/routes", async (req, res) => {
    try {
      const routes = await storage.getAllRoutes();
      res.json(routes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch routes" });
    }
  });

  app.get("/api/routes/:id", async (req, res) => {
    try {
      const route = await storage.getRouteById(req.params.id);
      if (!route) {
        return res.status(404).json({ message: "Route not found" });
      }
      res.json(route);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch route" });
    }
  });

  app.post("/api/routes", async (req, res) => {
    try {
      const validatedData = insertRouteSchema.parse(req.body);
      const route = await storage.createRoute(validatedData);
      broadcast({ type: 'route_created', data: route });
      res.status(201).json(route);
    } catch (error) {
      res.status(400).json({ message: "Invalid route data", error });
    }
  });

  // Alerts
  app.get("/api/alerts", async (req, res) => {
    try {
      const alerts = req.query.active === 'true' 
        ? await storage.getActiveAlerts()
        : await storage.getAllAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const validatedData = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(validatedData);
      broadcast({ type: 'alert_created', data: alert });
      res.status(201).json(alert);
    } catch (error) {
      res.status(400).json({ message: "Invalid alert data", error });
    }
  });

  app.put("/api/alerts/:id", async (req, res) => {
    try {
      const validatedData = insertAlertSchema.partial().parse(req.body);
      const alert = await storage.updateAlert(req.params.id, validatedData);
      if (!alert) {
        return res.status(404).json({ message: "Alert not found" });
      }
      broadcast({ type: 'alert_updated', data: alert });
      res.json(alert);
    } catch (error) {
      res.status(400).json({ message: "Invalid alert data", error });
    }
  });

  // Passenger Heatmap
  app.get("/api/passenger-heatmap", async (req, res) => {
    try {
      const heatmap = await storage.getAllPassengerHeatmap();
      res.json(heatmap);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch passenger heatmap" });
    }
  });

  app.post("/api/passenger-heatmap", async (req, res) => {
    try {
      const validatedData = insertPassengerHeatmapSchema.parse(req.body);
      const heatmap = await storage.createPassengerHeatmap(validatedData);
      broadcast({ type: 'heatmap_updated', data: heatmap });
      res.status(201).json(heatmap);
    } catch (error) {
      res.status(400).json({ message: "Invalid heatmap data", error });
    }
  });

  // AI Recommendations
  app.get("/api/ai-recommendations", async (req, res) => {
    try {
      const recommendations = req.query.status === 'pending'
        ? await storage.getPendingAiRecommendations()
        : await storage.getAllAiRecommendations();
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AI recommendations" });
    }
  });

  app.post("/api/ai-recommendations", async (req, res) => {
    try {
      const validatedData = insertAiRecommendationSchema.parse(req.body);
      const recommendation = await storage.createAiRecommendation(validatedData);
      broadcast({ type: 'recommendation_created', data: recommendation });
      res.status(201).json(recommendation);
    } catch (error) {
      res.status(400).json({ message: "Invalid recommendation data", error });
    }
  });

  app.put("/api/ai-recommendations/:id", async (req, res) => {
    try {
      const validatedData = insertAiRecommendationSchema.partial().parse(req.body);
      const recommendation = await storage.updateAiRecommendation(req.params.id, validatedData);
      if (!recommendation) {
        return res.status(404).json({ message: "Recommendation not found" });
      }
      broadcast({ type: 'recommendation_updated', data: recommendation });
      res.json(recommendation);
    } catch (error) {
      res.status(400).json({ message: "Invalid recommendation data", error });
    }
  });

  // SOS Requests
  app.get("/api/sos", async (req, res) => {
    try {
      const requests = req.query.active === 'true'
        ? await storage.getActiveSosRequests()
        : await storage.getAllSosRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch SOS requests" });
    }
  });

  app.post("/api/sos", async (req, res) => {
    try {
      const validatedData = insertSosRequestSchema.parse(req.body);
      const request = await storage.createSosRequest(validatedData);
      broadcast({ type: 'sos_created', data: request });
      res.status(201).json(request);
    } catch (error) {
      res.status(400).json({ message: "Invalid SOS request data", error });
    }
  });

  app.put("/api/sos/:id", async (req, res) => {
    try {
      const validatedData = insertSosRequestSchema.partial().parse(req.body);
      const request = await storage.updateSosRequest(req.params.id, validatedData);
      if (!request) {
        return res.status(404).json({ message: "SOS request not found" });
      }
      broadcast({ type: 'sos_updated', data: request });
      res.json(request);
    } catch (error) {
      res.status(400).json({ message: "Invalid SOS request data", error });
    }
  });

  return httpServer;
}
