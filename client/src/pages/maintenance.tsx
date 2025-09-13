import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Settings, 
  TrendingUp,
  AlertCircle,
  Gavel
} from "lucide-react";

export default function Maintenance() {
  // Mock maintenance data - in real app this would come from APIs
  const maintenanceSchedule = [
    {
      id: '1',
      busId: 'BUS-001',
      routeNumber: '12',
      type: 'Engine Service',
      status: 'scheduled',
      scheduledDate: '2024-01-15',
      estimatedHours: 4,
      priority: 'high',
      description: 'Regular engine maintenance and oil change'
    },
    {
      id: '2',
      busId: 'BUS-007',
      routeNumber: '07',
      type: 'Brake Inspection',
      status: 'in_progress',
      scheduledDate: '2024-01-14',
      estimatedHours: 2,
      priority: 'medium',
      description: 'Brake system inspection and pad replacement'
    },
    {
      id: '3',
      busId: 'BUS-023',
      routeNumber: '23',
      type: 'Tire Replacement',
      status: 'completed',
      scheduledDate: '2024-01-13',
      estimatedHours: 3,
      priority: 'high',
      description: 'Front tire replacement due to wear'
    },
    {
      id: '4',
      busId: 'BUS-015',
      routeNumber: '15',
      type: 'AC Service',
      status: 'scheduled',
      scheduledDate: '2024-01-16',
      estimatedHours: 2,
      priority: 'low',
      description: 'Air conditioning system service and filter change'
    },
  ];

  const vehicleHealth = [
    { busId: 'BUS-001', routeNumber: '12', health: 85, lastService: '2024-01-01', issues: 2 },
    { busId: 'BUS-007', routeNumber: '07', health: 92, lastService: '2023-12-28', issues: 0 },
    { busId: 'BUS-023', routeNumber: '23', health: 78, lastService: '2024-01-13', issues: 1 },
    { busId: 'BUS-015', routeNumber: '15', health: 88, lastService: '2023-12-30', issues: 1 },
    { busId: 'BUS-009', routeNumber: '09', health: 95, lastService: '2024-01-05', issues: 0 },
    { busId: 'BUS-018', routeNumber: '18', health: 72, lastService: '2023-12-20', issues: 3 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent">Scheduled</Badge>;
      case 'in_progress':
        return <Badge variant="default" className="bg-primary">In Progress</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-secondary">Completed</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-accent';
      case 'low':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-secondary';
    if (health >= 75) return 'text-accent';
    return 'text-destructive';
  };

  const getHealthBadge = (health: number) => {
    if (health >= 90) return <Badge variant="default" className="bg-secondary">Excellent</Badge>;
    if (health >= 75) return <Badge variant="secondary" className="bg-accent text-accent-foreground">Good</Badge>;
    if (health >= 60) return <Badge variant="secondary" className="bg-accent text-accent-foreground">Fair</Badge>;
    return <Badge variant="destructive">Poor</Badge>;
  };

  const scheduledMaintenance = maintenanceSchedule.filter(m => m.status === 'scheduled');
  const inProgressMaintenance = maintenanceSchedule.filter(m => m.status === 'in_progress');
  const completedMaintenance = maintenanceSchedule.filter(m => m.status === 'completed');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Vehicle Maintenance</h1>
        <p className="text-muted-foreground">Fleet maintenance management and vehicle health monitoring</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">Total Vehicles</p>
                <p className="text-2xl font-bold" data-testid="text-total-vehicles">248</p>
                <p className="text-xs text-primary-foreground/70">active fleet</p>
              </div>
              <Wrench className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-foreground/80 text-sm">Scheduled</p>
                <p className="text-2xl font-bold" data-testid="text-scheduled-maintenance">{scheduledMaintenance.length}</p>
                <p className="text-xs text-secondary-foreground/70">this week</p>
              </div>
              <Calendar className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent-foreground/80 text-sm">In Progress</p>
                <p className="text-2xl font-bold" data-testid="text-in-progress-maintenance">{inProgressMaintenance.length}</p>
                <p className="text-xs text-accent-foreground/70">active jobs</p>
              </div>
              <Settings className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Fleet Health</p>
                <p className="text-2xl font-bold" data-testid="text-fleet-health">86%</p>
                <p className="text-xs text-white/70">average</p>
              </div>
              <TrendingUp className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Maintenance Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            {maintenanceSchedule.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No scheduled maintenance
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                {maintenanceSchedule.map((maintenance) => (
                  <div
                    key={maintenance.id}
                    className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow"
                    data-testid={`maintenance-${maintenance.id}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold">
                          {maintenance.routeNumber}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground" data-testid={`text-maintenance-type-${maintenance.id}`}>
                            {maintenance.type}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {maintenance.busId} • Route {maintenance.routeNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(maintenance.status)}
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(maintenance.priority).replace('text-', 'bg-')}`}></div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3" data-testid={`text-maintenance-description-${maintenance.id}`}>
                      {maintenance.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Scheduled Date</p>
                        <p className="text-sm font-medium">{maintenance.scheduledDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Est. Duration</p>
                        <p className="text-sm font-medium">{maintenance.estimatedHours}h</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" data-testid={`button-view-${maintenance.id}`}>
                        View Details
                      </Button>
                      {maintenance.status === 'scheduled' && (
                        <Button size="sm" data-testid={`button-start-${maintenance.id}`}>
                          Start Work
                        </Button>
                      )}
                      {maintenance.status === 'in_progress' && (
                        <Button size="sm" variant="default" className="bg-secondary" data-testid={`button-complete-${maintenance.id}`}>
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vehicle Health Monitor */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Health Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
                {vehicleHealth.map((vehicle) => (
                  <div
                    key={vehicle.busId}
                    className="p-3 border rounded-lg"
                    data-testid={`vehicle-health-${vehicle.busId}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                          {vehicle.routeNumber}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{vehicle.busId}</p>
                          <p className="text-xs text-muted-foreground">Route {vehicle.routeNumber}</p>
                        </div>
                      </div>
                      {getHealthBadge(vehicle.health)}
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Health Score</span>
                        <span className={`text-sm font-medium ${getHealthColor(vehicle.health)}`}>
                          {vehicle.health}%
                        </span>
                      </div>
                      <Progress value={vehicle.health} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last Service: {vehicle.lastService}</span>
                      {vehicle.issues > 0 && (
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3 text-destructive" />
                          <span>{vehicle.issues} issues</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Alerts */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-destructive" size={18} />
                <CardTitle>Maintenance Alerts</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Overdue Service</p>
                      <p className="text-xs text-muted-foreground">BUS-018 service overdue by 5 days</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Service Due Soon</p>
                      <p className="text-xs text-muted-foreground">3 vehicles due for service this week</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-start space-x-2">
                    <Gavel className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Parts Required</p>
                      <p className="text-xs text-muted-foreground">Order brake pads for 2 vehicles</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" variant="outline" data-testid="button-schedule-maintenance">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Maintenance
                </Button>
                <Button className="w-full" variant="outline" data-testid="button-fleet-report">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Fleet Health Report
                </Button>
                <Button className="w-full" variant="outline" data-testid="button-parts-inventory">
                  <Settings className="h-4 w-4 mr-2" />
                  Parts Inventory
                </Button>
                <Button className="w-full" data-testid="button-maintenance-settings">
                  <Wrench className="h-4 w-4 mr-2" />
                  Maintenance Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
