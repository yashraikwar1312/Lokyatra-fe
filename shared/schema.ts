import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const buses = pgTable("buses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  routeNumber: text("route_number").notNull(),
  currentLocation: json("current_location").$type<{lat: number, lng: number}>().notNull(),
  speed: real("speed").notNull().default(0),
  status: text("status").notNull().default("active"), // active, delayed, breakdown, maintenance
  passengerCount: integer("passenger_count").notNull().default(0),
  capacity: integer("capacity").notNull().default(50),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const routes = pgTable("routes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  number: text("number").notNull().unique(),
  name: text("name").notNull(),
  source: text("source").notNull(),
  destination: text("destination").notNull(),
  stops: json("stops").$type<Array<{name: string, lat: number, lng: number}>>().notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const alerts = pgTable("alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // critical, warning, info
  title: text("title").notNull(),
  description: text("description").notNull(),
  routeId: varchar("route_id").references(() => routes.id),
  busId: varchar("bus_id").references(() => buses.id),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const passengerHeatmap = pgTable("passenger_heatmap", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  location: json("location").$type<{lat: number, lng: number}>().notNull(),
  stopName: text("stop_name"),
  crowdLevel: text("crowd_level").notNull(), // low, medium, high
  passengerCount: integer("passenger_count").notNull().default(0),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const aiRecommendations = pgTable("ai_recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // deploy_bus, reroute, hold_bus
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: text("priority").notNull(), // high, medium, low
  routeId: varchar("route_id").references(() => routes.id),
  busId: varchar("bus_id").references(() => buses.id),
  estimatedImpact: text("estimated_impact"),
  status: text("status").notNull().default("pending"), // pending, implemented, declined
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const systemMetrics = pgTable("system_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  activeBuses: integer("active_buses").notNull().default(0),
  averageDelay: real("average_delay").notNull().default(0),
  punctuality: real("punctuality").notNull().default(0),
  criticalAlerts: integer("critical_alerts").notNull().default(0),
  co2Saved: real("co2_saved").notNull().default(0),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const sosRequests = pgTable("sos_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  location: json("location").$type<{lat: number, lng: number}>().notNull(),
  busId: varchar("bus_id").references(() => buses.id),
  routeId: varchar("route_id").references(() => routes.id),
  status: text("status").notNull().default("active"), // active, resolved, false_alarm
  priority: text("priority").notNull().default("high"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

// Insert schemas
export const insertBusSchema = createInsertSchema(buses).omit({
  id: true,
  lastUpdated: true,
});

export const insertRouteSchema = createInsertSchema(routes).omit({
  id: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  createdAt: true,
});

export const insertPassengerHeatmapSchema = createInsertSchema(passengerHeatmap).omit({
  id: true,
  timestamp: true,
});

export const insertAiRecommendationSchema = createInsertSchema(aiRecommendations).omit({
  id: true,
  createdAt: true,
});

export const insertSystemMetricsSchema = createInsertSchema(systemMetrics).omit({
  id: true,
  timestamp: true,
});

export const insertSosRequestSchema = createInsertSchema(sosRequests).omit({
  id: true,
  createdAt: true,
  resolvedAt: true,
});

// Types
export type Bus = typeof buses.$inferSelect;
export type Route = typeof routes.$inferSelect;
export type Alert = typeof alerts.$inferSelect;
export type PassengerHeatmap = typeof passengerHeatmap.$inferSelect;
export type AiRecommendation = typeof aiRecommendations.$inferSelect;
export type SystemMetrics = typeof systemMetrics.$inferSelect;
export type SosRequest = typeof sosRequests.$inferSelect;

export type InsertBus = z.infer<typeof insertBusSchema>;
export type InsertRoute = z.infer<typeof insertRouteSchema>;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type InsertPassengerHeatmap = z.infer<typeof insertPassengerHeatmapSchema>;
export type InsertAiRecommendation = z.infer<typeof insertAiRecommendationSchema>;
export type InsertSystemMetrics = z.infer<typeof insertSystemMetricsSchema>;
export type InsertSosRequest = z.infer<typeof insertSosRequestSchema>;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
