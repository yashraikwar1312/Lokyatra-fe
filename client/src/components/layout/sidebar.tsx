import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Home,
  Map,
  Bus,
  Users,
  AlertTriangle,
  Bot,
  BarChart3,
  Wrench,
  Settings,
  Route
} from "lucide-react";

const navigationItems = [
  { path: "/", icon: Home, label: "Dashboard" },
  { path: "/map", icon: Map, label: "3D Map" },
  { path: "/bus-control", icon: Bus, label: "Bus Control" },
  { path: "/passenger-heatmap", icon: Users, label: "Passenger Heatmap" },
  { path: "/alerts-safety", icon: AlertTriangle, label: "Alerts & Safety", badge: 5 },
  { path: "/ai-recommendations", icon: Bot, label: "AI Recommendations" },
  { path: "/analytics", icon: BarChart3, label: "Analytics" },
  { path: "/maintenance", icon: Wrench, label: "Maintenance" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-72 bg-sidebar border-r border-sidebar-border flex-shrink-0 hidden lg:flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
            <Route className="text-primary-foreground" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">Nirdeshak</h1>
            <p className="text-xs text-muted-foreground">Smart Transport Hub</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 custom-scrollbar overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors group",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Icon size={18} />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      
      {/* User Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Users size={16} className="text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">Transport Authority</p>
          </div>
          <Settings size={16} className="text-muted-foreground" />
        </div>
      </div>
    </aside>
  );
}
