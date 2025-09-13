import { 
  type User, 
  type InsertUser,
  type Bus,
  type InsertBus,
  type Route,
  type InsertRoute,
  type Alert,
  type InsertAlert,
  type PassengerHeatmap,
  type InsertPassengerHeatmap,
  type AiRecommendation,
  type InsertAiRecommendation,
  type SystemMetrics,
  type InsertSystemMetrics,
  type SosRequest,
  type InsertSosRequest,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Bus methods
  getAllBuses(): Promise<Bus[]>;
  getBusById(id: string): Promise<Bus | undefined>;
  createBus(bus: InsertBus): Promise<Bus>;
  updateBus(id: string, updates: Partial<InsertBus>): Promise<Bus | undefined>;
  deleteBus(id: string): Promise<boolean>;

  // Route methods
  getAllRoutes(): Promise<Route[]>;
  getRouteById(id: string): Promise<Route | undefined>;
  createRoute(route: InsertRoute): Promise<Route>;
  updateRoute(id: string, updates: Partial<InsertRoute>): Promise<Route | undefined>;

  // Alert methods
  getAllAlerts(): Promise<Alert[]>;
  getActiveAlerts(): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  updateAlert(id: string, updates: Partial<InsertAlert>): Promise<Alert | undefined>;

  // Passenger Heatmap methods
  getAllPassengerHeatmap(): Promise<PassengerHeatmap[]>;
  createPassengerHeatmap(data: InsertPassengerHeatmap): Promise<PassengerHeatmap>;
  
  // AI Recommendations methods
  getAllAiRecommendations(): Promise<AiRecommendation[]>;
  getPendingAiRecommendations(): Promise<AiRecommendation[]>;
  createAiRecommendation(recommendation: InsertAiRecommendation): Promise<AiRecommendation>;
  updateAiRecommendation(id: string, updates: Partial<InsertAiRecommendation>): Promise<AiRecommendation | undefined>;

  // System Metrics methods
  getLatestSystemMetrics(): Promise<SystemMetrics | undefined>;
  createSystemMetrics(metrics: InsertSystemMetrics): Promise<SystemMetrics>;

  // SOS methods
  getAllSosRequests(): Promise<SosRequest[]>;
  getActiveSosRequests(): Promise<SosRequest[]>;
  createSosRequest(request: InsertSosRequest): Promise<SosRequest>;
  updateSosRequest(id: string, updates: Partial<InsertSosRequest>): Promise<SosRequest | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private buses: Map<string, Bus>;
  private routes: Map<string, Route>;
  private alerts: Map<string, Alert>;
  private passengerHeatmap: Map<string, PassengerHeatmap>;
  private aiRecommendations: Map<string, AiRecommendation>;
  private systemMetrics: Map<string, SystemMetrics>;
  private sosRequests: Map<string, SosRequest>;

  constructor() {
    this.users = new Map();
    this.buses = new Map();
    this.routes = new Map();
    this.alerts = new Map();
    this.passengerHeatmap = new Map();
    this.aiRecommendations = new Map();
    this.systemMetrics = new Map();
    this.sosRequests = new Map();

    this.initializeData();
  }

  private initializeData() {
    // Initialize with comprehensive sample data for demonstration
    
    // Routes
    const sampleRoutes = [
      {
        id: randomUUID(),
        number: "12",
        name: "Central Station → Tech Park",
        source: "Central Station",
        destination: "Tech Park",
        stops: [
          { name: "Central Station", lat: 28.6139, lng: 77.2090 },
          { name: "Mall Road", lat: 28.6129, lng: 77.2095 },
          { name: "University Gate", lat: 28.6119, lng: 77.2100 },
          { name: "Tech Park", lat: 28.6109, lng: 77.2105 }
        ],
        isActive: true,
      },
      {
        id: randomUUID(),
        number: "07",
        name: "Mall Road → University",
        source: "Mall Road",
        destination: "University",
        stops: [
          { name: "Mall Road", lat: 28.6129, lng: 77.2095 },
          { name: "City Center", lat: 28.6135, lng: 77.2098 },
          { name: "University", lat: 28.6145, lng: 77.2102 }
        ],
        isActive: true,
      },
      {
        id: randomUUID(),
        number: "25",
        name: "Airport → Downtown",
        source: "Airport",
        destination: "Downtown",
        stops: [
          { name: "Airport", lat: 28.6200, lng: 77.2100 },
          { name: "Metro Station", lat: 28.6180, lng: 77.2110 },
          { name: "Business District", lat: 28.6160, lng: 77.2120 },
          { name: "Downtown", lat: 28.6140, lng: 77.2130 }
        ],
        isActive: true,
      },
      {
        id: randomUUID(),
        number: "33",
        name: "Hospital → Shopping Mall",
        source: "Hospital",
        destination: "Shopping Mall",
        stops: [
          { name: "Hospital", lat: 28.6050, lng: 77.2050 },
          { name: "Park Gate", lat: 28.6060, lng: 77.2060 },
          { name: "Sports Complex", lat: 28.6070, lng: 77.2070 },
          { name: "Shopping Mall", lat: 28.6080, lng: 77.2080 }
        ],
        isActive: true,
      }
    ];

    const routeIds = sampleRoutes.map(route => {
      this.routes.set(route.id, route);
      return route.id;
    });

    // Buses
    const sampleBuses = [
      {
        id: randomUUID(),
        routeNumber: "12",
        currentLocation: { lat: 28.6125, lng: 77.2092 },
        speed: 35,
        status: "active",
        passengerCount: 28,
        capacity: 50,
        lastUpdated: new Date()
      },
      {
        id: randomUUID(),
        routeNumber: "12",
        currentLocation: { lat: 28.6115, lng: 77.2098 },
        speed: 42,
        status: "active",
        passengerCount: 33,
        capacity: 50,
        lastUpdated: new Date()
      },
      {
        id: randomUUID(),
        routeNumber: "07",
        currentLocation: { lat: 28.6132, lng: 77.2097 },
        speed: 0,
        status: "delayed",
        passengerCount: 45,
        capacity: 50,
        lastUpdated: new Date()
      },
      {
        id: randomUUID(),
        routeNumber: "25",
        currentLocation: { lat: 28.6190, lng: 77.2105 },
        speed: 55,
        status: "active",
        passengerCount: 22,
        capacity: 60,
        lastUpdated: new Date()
      },
      {
        id: randomUUID(),
        routeNumber: "25",
        currentLocation: { lat: 28.6150, lng: 77.2125 },
        speed: 38,
        status: "active",
        passengerCount: 41,
        capacity: 60,
        lastUpdated: new Date()
      },
      {
        id: randomUUID(),
        routeNumber: "33",
        currentLocation: { lat: 28.6065, lng: 77.2065 },
        speed: 0,
        status: "breakdown",
        passengerCount: 18,
        capacity: 45,
        lastUpdated: new Date()
      }
    ];

    sampleBuses.forEach(bus => {
      this.buses.set(bus.id, bus);
    });

    // Alerts
    const now = new Date();
    const sampleAlerts = [
      {
        id: randomUUID(),
        type: "critical",
        title: "Bus Breakdown on Route 33",
        description: "Bus has broken down near Sports Complex. Rescue team dispatched.",
        routeId: routeIds[3],
        busId: Array.from(this.buses.values()).find(bus => bus.routeNumber === "33")?.id,
        isActive: true,
        createdAt: new Date(now.getTime() - 15 * 60000) // 15 minutes ago
      },
      {
        id: randomUUID(),
        type: "warning",
        title: "Heavy Traffic on Route 12",
        description: "Delays expected due to traffic congestion near University Gate.",
        routeId: routeIds[0],
        busId: null,
        isActive: true,
        createdAt: new Date(now.getTime() - 8 * 60000) // 8 minutes ago
      },
      {
        id: randomUUID(),
        type: "info",
        title: "Route 07 Schedule Update",
        description: "Additional bus deployed during peak hours starting today.",
        routeId: routeIds[1],
        busId: null,
        isActive: true,
        createdAt: new Date(now.getTime() - 2 * 60000) // 2 minutes ago
      },
      {
        id: randomUUID(),
        type: "critical",
        title: "Emergency SOS Alert",
        description: "Passenger emergency reported on Route 25 near Metro Station.",
        routeId: routeIds[2],
        busId: null,
        isActive: true,
        createdAt: new Date(now.getTime() - 45 * 60000) // 45 minutes ago
      },
      {
        id: randomUUID(),
        type: "warning",
        title: "Route Deviation",
        description: "Route 12 bus temporarily diverted due to road construction.",
        routeId: routeIds[0],
        busId: null,
        isActive: false,
        createdAt: new Date(now.getTime() - 120 * 60000) // 2 hours ago
      }
    ];

    sampleAlerts.forEach(alert => {
      this.alerts.set(alert.id, alert);
    });

    // AI Recommendations
    const sampleRecommendations = [
      {
        id: randomUUID(),
        type: "deploy_bus",
        title: "Deploy Additional Bus on Route 12",
        description: "High passenger demand detected. Deploy extra bus to reduce overcrowding.",
        priority: "high",
        routeId: routeIds[0],
        busId: null,
        estimatedImpact: "Reduce waiting time by 8 minutes, increase satisfaction by 15%",
        status: "pending",
        createdAt: new Date(now.getTime() - 20 * 60000)
      },
      {
        id: randomUUID(),
        type: "reroute",
        title: "Optimize Route 25 Path",
        description: "Alternative route through Business District can save 12 minutes during peak hours.",
        priority: "medium",
        routeId: routeIds[2],
        busId: null,
        estimatedImpact: "Save 12 min per trip, reduce fuel consumption by 8%",
        status: "pending",
        createdAt: new Date(now.getTime() - 35 * 60000)
      },
      {
        id: randomUUID(),
        type: "hold_bus",
        title: "Hold Bus at Central Station",
        description: "Metro train arriving in 3 minutes with 200+ passengers.",
        priority: "high",
        routeId: routeIds[0],
        busId: Array.from(this.buses.values()).find(bus => bus.routeNumber === "12")?.id,
        estimatedImpact: "Accommodate 45 additional passengers",
        status: "implemented",
        createdAt: new Date(now.getTime() - 10 * 60000)
      }
    ];

    sampleRecommendations.forEach(rec => {
      this.aiRecommendations.set(rec.id, rec);
    });

    // Passenger Heatmap Data
    const sampleHeatmapData = [
      {
        id: randomUUID(),
        location: { lat: 28.6139, lng: 77.2090 },
        stopName: "Central Station",
        crowdLevel: "high",
        passengerCount: 85,
        timestamp: new Date()
      },
      {
        id: randomUUID(),
        location: { lat: 28.6129, lng: 77.2095 },
        stopName: "Mall Road",
        crowdLevel: "medium",
        passengerCount: 42,
        timestamp: new Date()
      },
      {
        id: randomUUID(),
        location: { lat: 28.6145, lng: 77.2102 },
        stopName: "University",
        crowdLevel: "high",
        passengerCount: 68,
        timestamp: new Date()
      },
      {
        id: randomUUID(),
        location: { lat: 28.6200, lng: 77.2100 },
        stopName: "Airport",
        crowdLevel: "low",
        passengerCount: 15,
        timestamp: new Date()
      },
      {
        id: randomUUID(),
        location: { lat: 28.6080, lng: 77.2080 },
        stopName: "Shopping Mall",
        crowdLevel: "medium",
        passengerCount: 38,
        timestamp: new Date()
      }
    ];

    sampleHeatmapData.forEach(data => {
      this.passengerHeatmap.set(data.id, data);
    });

    // SOS Requests
    const sampleSosRequests = [
      {
        id: randomUUID(),
        location: { lat: 28.6180, lng: 77.2110 },
        busId: Array.from(this.buses.values()).find(bus => bus.routeNumber === "25")?.id,
        routeId: routeIds[2],
        status: "active",
        priority: "high",
        createdAt: new Date(now.getTime() - 5 * 60000),
        resolvedAt: null
      },
      {
        id: randomUUID(),
        location: { lat: 28.6065, lng: 77.2065 },
        busId: Array.from(this.buses.values()).find(bus => bus.routeNumber === "33")?.id,
        routeId: routeIds[3],
        status: "resolved",
        priority: "high",
        createdAt: new Date(now.getTime() - 60 * 60000),
        resolvedAt: new Date(now.getTime() - 30 * 60000)
      }
    ];

    sampleSosRequests.forEach(request => {
      this.sosRequests.set(request.id, request);
    });

    // System Metrics
    const initialMetrics: SystemMetrics = {
      id: randomUUID(),
      activeBuses: 248,
      averageDelay: 3.4,
      punctuality: 92.5,
      criticalAlerts: 5,
      co2Saved: 2.4,
      timestamp: new Date(),
    };

    this.systemMetrics.set(initialMetrics.id, initialMetrics);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Bus methods
  async getAllBuses(): Promise<Bus[]> {
    return Array.from(this.buses.values());
  }

  async getBusById(id: string): Promise<Bus | undefined> {
    return this.buses.get(id);
  }

  async createBus(insertBus: InsertBus): Promise<Bus> {
    const id = randomUUID();
    const bus: Bus = { 
      speed: 0,
      status: "active",
      passengerCount: 0,
      capacity: 50,
      ...insertBus, 
      id, 
      lastUpdated: new Date() 
    };
    this.buses.set(id, bus);
    return bus;
  }

  async updateBus(id: string, updates: Partial<InsertBus>): Promise<Bus | undefined> {
    const bus = this.buses.get(id);
    if (!bus) return undefined;
    
    const updatedBus: Bus = { 
      ...bus, 
      ...updates, 
      lastUpdated: new Date() 
    };
    this.buses.set(id, updatedBus);
    return updatedBus;
  }

  async deleteBus(id: string): Promise<boolean> {
    return this.buses.delete(id);
  }

  // Route methods
  async getAllRoutes(): Promise<Route[]> {
    return Array.from(this.routes.values());
  }

  async getRouteById(id: string): Promise<Route | undefined> {
    return this.routes.get(id);
  }

  async createRoute(insertRoute: InsertRoute): Promise<Route> {
    const id = randomUUID();
    const route: Route = { 
      isActive: true,
      ...insertRoute, 
      id 
    };
    this.routes.set(id, route);
    return route;
  }

  async updateRoute(id: string, updates: Partial<InsertRoute>): Promise<Route | undefined> {
    const route = this.routes.get(id);
    if (!route) return undefined;
    
    const updatedRoute: Route = { ...route, ...updates };
    this.routes.set(id, updatedRoute);
    return updatedRoute;
  }

  // Alert methods
  async getAllAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getActiveAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values())
      .filter(alert => alert.isActive)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = randomUUID();
    const alert: Alert = { 
      ...insertAlert, 
      id, 
      createdAt: new Date() 
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async updateAlert(id: string, updates: Partial<InsertAlert>): Promise<Alert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;
    
    const updatedAlert: Alert = { ...alert, ...updates };
    this.alerts.set(id, updatedAlert);
    return updatedAlert;
  }

  // Passenger Heatmap methods
  async getAllPassengerHeatmap(): Promise<PassengerHeatmap[]> {
    return Array.from(this.passengerHeatmap.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async createPassengerHeatmap(insertData: InsertPassengerHeatmap): Promise<PassengerHeatmap> {
    const id = randomUUID();
    const data: PassengerHeatmap = { 
      ...insertData, 
      id, 
      timestamp: new Date() 
    };
    this.passengerHeatmap.set(id, data);
    return data;
  }

  // AI Recommendations methods
  async getAllAiRecommendations(): Promise<AiRecommendation[]> {
    return Array.from(this.aiRecommendations.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getPendingAiRecommendations(): Promise<AiRecommendation[]> {
    return Array.from(this.aiRecommendations.values())
      .filter(rec => rec.status === 'pending')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createAiRecommendation(insertRecommendation: InsertAiRecommendation): Promise<AiRecommendation> {
    const id = randomUUID();
    const recommendation: AiRecommendation = { 
      ...insertRecommendation, 
      id, 
      createdAt: new Date() 
    };
    this.aiRecommendations.set(id, recommendation);
    return recommendation;
  }

  async updateAiRecommendation(id: string, updates: Partial<InsertAiRecommendation>): Promise<AiRecommendation | undefined> {
    const recommendation = this.aiRecommendations.get(id);
    if (!recommendation) return undefined;
    
    const updatedRecommendation: AiRecommendation = { ...recommendation, ...updates };
    this.aiRecommendations.set(id, updatedRecommendation);
    return updatedRecommendation;
  }

  // System Metrics methods
  async getLatestSystemMetrics(): Promise<SystemMetrics | undefined> {
    const metrics = Array.from(this.systemMetrics.values());
    if (metrics.length === 0) return undefined;
    
    return metrics.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
  }

  async createSystemMetrics(insertMetrics: InsertSystemMetrics): Promise<SystemMetrics> {
    const id = randomUUID();
    const metrics: SystemMetrics = { 
      ...insertMetrics, 
      id, 
      timestamp: new Date() 
    };
    this.systemMetrics.set(id, metrics);
    return metrics;
  }

  // SOS methods
  async getAllSosRequests(): Promise<SosRequest[]> {
    return Array.from(this.sosRequests.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getActiveSosRequests(): Promise<SosRequest[]> {
    return Array.from(this.sosRequests.values())
      .filter(request => request.status === 'active')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createSosRequest(insertRequest: InsertSosRequest): Promise<SosRequest> {
    const id = randomUUID();
    const request: SosRequest = { 
      ...insertRequest, 
      id, 
      createdAt: new Date() 
    };
    this.sosRequests.set(id, request);
    return request;
  }

  async updateSosRequest(id: string, updates: Partial<InsertSosRequest>): Promise<SosRequest | undefined> {
    const request = this.sosRequests.get(id);
    if (!request) return undefined;
    
    const updatedRequest: SosRequest = { ...request, ...updates };
    if (updates.status === 'resolved') {
      updatedRequest.resolvedAt = new Date();
    }
    this.sosRequests.set(id, updatedRequest);
    return updatedRequest;
  }
}

export const storage = new MemStorage();
