import { Card } from "@/components/ui/card";
import { Bus, Clock, TrendingUp, AlertTriangle, Leaf } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { SystemMetrics } from "@shared/schema";

const cardConfigs = [
  {
    key: "activeBuses",
    label: "Active Buses",
    suffix: "running",
    icon: Bus,
    gradient: "from-secondary to-secondary/80",
    textColor: "text-secondary-foreground",
    iconBg: "bg-secondary-foreground/20",
  },
  {
    key: "averageDelay",
    label: "Average Delay",
    suffix: "minutes",
    icon: Clock,
    gradient: "from-accent to-accent/80",
    textColor: "text-accent-foreground",
    iconBg: "bg-accent-foreground/20",
  },
  {
    key: "punctuality",
    label: "Punctuality",
    suffix: "network wide",
    icon: TrendingUp,
    gradient: "from-primary to-primary/80",
    textColor: "text-primary-foreground",
    iconBg: "bg-primary-foreground/20",
    valueFormatter: (value: number) => `${value}%`,
  },
  {
    key: "criticalAlerts",
    label: "Critical Alerts",
    suffix: "active now",
    icon: AlertTriangle,
    gradient: "from-destructive to-destructive/80",
    textColor: "text-destructive-foreground",
    iconBg: "bg-destructive-foreground/20",
  },
  {
    key: "co2Saved",
    label: "CO₂ Saved",
    suffix: "tons today",
    icon: Leaf,
    gradient: "from-emerald-500 to-emerald-600",
    textColor: "text-white",
    iconBg: "bg-white/20",
  },
];

export function KpiCards() {
  const { data: metrics, isLoading } = useQuery<SystemMetrics>({
    queryKey: ['/api/metrics'],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-20 bg-muted rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No metrics data available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {cardConfigs.map((config) => {
        const Icon = config.icon;
        const value = metrics[config.key as keyof SystemMetrics] as number;
        const formattedValue = config.valueFormatter ? config.valueFormatter(value) : value;
        
        return (
          <div 
            key={config.key}
            className={`bg-gradient-to-br ${config.gradient} ${config.textColor} p-6 rounded-xl shadow-lg`}
            data-testid={`card-${config.key}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`${config.textColor}/80 text-sm font-medium`}>{config.label}</p>
                <p className="text-3xl font-bold mt-1" data-testid={`text-${config.key}-value`}>
                  {formattedValue}
                </p>
                <p className={`text-xs ${config.textColor}/70 mt-1`}>{config.suffix}</p>
              </div>
              <div className={`${config.iconBg} p-3 rounded-lg`}>
                <Icon size={24} />
              </div>
            </div>
            <div className="flex items-center mt-4 text-xs">
              <TrendingUp size={12} className={`${config.textColor}/80 mr-1`} />
              <span className={`${config.textColor}/80`}>Live data</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
