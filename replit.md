# Overview

Nirdeshak is a comprehensive real-time public transport tracking and management system designed for smart cities. The application serves as a unified platform for transport authorities to monitor bus operations, track passenger flow, manage alerts, and receive AI-powered recommendations for optimizing public transit efficiency. It features a modern dashboard with 3D mapping capabilities, real-time analytics, and mobile-optimized interfaces for both operators and commuters.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built with React and TypeScript using a modern component-based architecture. Key design decisions include:

**UI Framework**: Utilizes shadcn/ui components built on Radix UI primitives for consistent, accessible interface components. This provides a professional design system with proper keyboard navigation and screen reader support.

**Styling**: Implements Tailwind CSS with a custom design system featuring CSS variables for theming. The color palette uses blue and green accents to match the smart city aesthetic, with support for light/dark themes.

**State Management**: Uses TanStack Query (React Query) for server state management, providing automatic caching, background refetching, and optimistic updates. Local state is managed with React hooks.

**Routing**: Implements wouter for lightweight client-side routing, chosen for its minimal bundle size while providing essential routing functionality.

**Real-time Updates**: Custom WebSocket integration with automatic reconnection logic for live data streaming to keep dashboards current.

## Backend Architecture
The server follows a REST API design with real-time WebSocket capabilities:

**Runtime**: Node.js with Express.js framework for HTTP server functionality and routing.

**WebSocket Server**: Integrated WebSocket server for real-time data broadcasting to connected clients, enabling live updates across all dashboard components.

**API Design**: RESTful endpoints for CRUD operations on buses, routes, alerts, and analytics data. Consistent JSON response format with proper HTTP status codes.

**Error Handling**: Centralized error handling middleware with structured error responses and logging.

## Data Storage Solutions
**Database**: PostgreSQL configured through Drizzle ORM for type-safe database operations. The choice of PostgreSQL provides robust relational data handling with JSON support for complex data structures like GPS coordinates and route information.

**Schema Design**: Tables for buses, routes, alerts, passenger heatmap data, AI recommendations, system metrics, and SOS requests. Uses UUID primary keys and proper foreign key relationships.

**Connection Management**: Neon Database serverless PostgreSQL for cloud-based database hosting with automatic scaling.

## Authentication and Authorization
The application structure suggests role-based access control for different user types (authorities vs. commuters), though specific authentication implementation appears to be pending.

## External Service Integrations
**Maps and Geolocation**: Framework prepared for 3D mapping integration with real-time GPS tracking of vehicles.

**AI/ML Services**: Built-in support for AI recommendation engine that analyzes transport patterns and suggests operational improvements.

**Mobile Integration**: Responsive design with dedicated mobile interfaces and emergency SOS functionality for passenger safety.

# External Dependencies

## Core Technologies
- **React**: Frontend framework for building interactive user interfaces
- **TypeScript**: Type safety and development tooling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Build tool and development server for fast hot reloading

## UI Components
- **Radix UI**: Headless UI primitives for accessibility
- **shadcn/ui**: Pre-built component library based on Radix
- **Lucide React**: Icon library for consistent iconography

## Data Management
- **TanStack React Query**: Server state management and caching
- **Drizzle ORM**: Type-safe database ORM
- **Zod**: Runtime type validation and schema validation

## Database
- **PostgreSQL**: Primary database engine
- **Neon Database**: Serverless PostgreSQL hosting

## Development Tools
- **Drizzle Kit**: Database migrations and schema management
- **ESBuild**: Fast JavaScript bundler for production builds
- **Date-fns**: Date manipulation library for time-based features

## Real-time Communication
- **WebSocket (ws)**: Real-time bidirectional communication
- **Custom WebSocket Manager**: Connection handling and message routing

## Charts and Visualization
- **Recharts**: React charting library for analytics dashboards
- **Custom 3D Map Components**: Interactive transport visualization

## Form Handling
- **React Hook Form**: Performant form library with validation
- **Hookform Resolvers**: Integration with validation schemas