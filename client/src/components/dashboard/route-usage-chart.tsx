import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Leaf } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Route } from "@shared/schema";

// Mock route usage data - in real app this would be calculated from passenger data
const routeUsageData = [
  { routeNumber: "12", passengers: 2456, percentage: 85, color: "bg-primary" },
  { routeNumber: "07", passengers: 2123, percentage: 72, color: "bg-secondary" },
  { routeNumber: "23", passengers: 1987, percentage: 68, color: "bg-accent" },
  { routeNumber: "15", passengers: 1654, percentage: 56, color: "bg-purple" },
];

export function RouteUsageChart() {
  const { data: routes = [], isLoading } = useQuery<Route[]>({
    queryKey: ['/api/routes'],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Routes by Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Top Routes by Usage</CardTitle>
          <Button variant="ghost" size="sm" data-testid="button-view-all-routes">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {routeUsageData.map((route) => {
            const routeInfo = routes.find(r => r.number === route.routeNumber);
            
            return (
              <div key={route.routeNumber} className="flex items-center space-x-4" data-testid={`route-usage-${route.routeNumber}`}>
                <div className={`flex items-center justify-center w-8 h-8 ${route.color} text-white rounded text-sm font-bold`}>
                  {route.routeNumber}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground" data-testid={`text-route-name-${route.routeNumber}`}>
                      {routeInfo ? `${routeInfo.source} → ${routeInfo.destination}` : `Route ${route.routeNumber}`}
                    </span>
                    <span className="text-sm text-muted-foreground" data-testid={`text-passengers-${route.routeNumber}`}>
                      {route.passengers.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={route.percentage} className="h-2" />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Sustainability metric */}
        <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald text-emerald-foreground rounded-lg flex items-center justify-center">
              <Leaf size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">Environmental Impact</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                These routes saved <strong>2.4 tons CO₂</strong> today
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
