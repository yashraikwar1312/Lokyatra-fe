import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export function RecentAlerts() {
  const { data: alerts = [], isLoading } = useQuery<Alert[]>({
    queryKey: ['/api/alerts', 'active=true'],
  });

  const recentAlerts = alerts.slice(0, 3);

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          container: "bg-destructive/10 border-l-4 border-destructive",
          dot: "bg-destructive",
        };
      case 'warning':
        return {
          container: "bg-accent/10 border-l-4 border-accent",
          dot: "bg-accent",
        };
      default:
        return {
          container: "bg-primary/10 border-l-4 border-primary",
          dot: "bg-primary",
        };
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded-lg"></div>
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
        <CardTitle>Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        {recentAlerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No active alerts
          </div>
        ) : (
          <div className="space-y-3">
            {recentAlerts.map((alert) => {
              const style = getAlertStyle(alert.type);
              return (
                <div 
                  key={alert.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg ${style.container}`}
                  data-testid={`alert-${alert.id}`}
                >
                  <div className={`w-2 h-2 ${style.dot} rounded-full mt-2 flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground" data-testid={`text-alert-title-${alert.id}`}>
                      {alert.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1" data-testid={`text-alert-description-${alert.id}`}>
                      {alert.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <Button variant="ghost" className="w-full mt-4" data-testid="button-view-all-alerts">
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  );
}
