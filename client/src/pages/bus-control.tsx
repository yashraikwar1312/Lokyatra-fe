import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Bus, Route } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Clock, 
  Zap, 
  AlertTriangle, 
  Search,
  Filter,
  Phone,
  MessageSquare,
  Settings,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Navigation,
  Users,
  Fuel,
  ChevronDown,
  Eye,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function BusControl() {
  const { toast } = useToast();
  
  const { data: buses = [], isLoading: busesLoading } = useQuery<Bus[]>({
    queryKey: ['/api/buses'],
  });

  const { data: routes = [], isLoading: routesLoading } = useQuery<Route[]>({
    queryKey: ['/api/routes'],
  });

  const updateBusMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Bus> }) => {
      return apiRequest('PUT', `/api/buses/${id}`, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/buses'] });
      toast({
        title: "Bus updated",
        description: "Bus status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Failed to update bus status.",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-secondary">On Time</Badge>;
      case 'delayed':
        return <Badge variant="destructive">Delayed</Badge>;
      case 'breakdown':
        return <Badge variant="destructive">Breakdown</Badge>;
      case 'maintenance':
        return <Badge variant="secondary">Maintenance</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleBusAction = (busId: string, action: string) => {
    switch (action) {
      case 'hold':
        updateBusMutation.mutate({ id: busId, updates: { speed: 0 } });
        break;
      case 'release':
        updateBusMutation.mutate({ id: busId, updates: { speed: 35 } });
        break;
      case 'maintenance':
        updateBusMutation.mutate({ id: busId, updates: { status: 'maintenance' } });
        break;
      case 'activate':
        updateBusMutation.mutate({ id: busId, updates: { status: 'active' } });
        break;
    }
  };

  const activeBuses = buses.filter(bus => bus.status === 'active').length;
  const delayedBuses = buses.filter(bus => bus.status === 'delayed').length;
  const breakdownBuses = buses.filter(bus => bus.status === 'breakdown').length;
  const maintenanceBuses = buses.filter(bus => bus.status === 'maintenance').length;

  const mockStats = {
    onTime: activeBuses,
    minorDelays: delayedBuses,
    criticalIssues: breakdownBuses + maintenanceBuses,
    revenuePerHour: 15420,
  };

  const isLoading = busesLoading || routesLoading;

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Bus Control Center</h1>
          <p className="text-muted-foreground">Real-time vehicle monitoring and operations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Bus Control Center</h1>
        <p className="text-muted-foreground">Real-time vehicle monitoring and operations</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-foreground/80 text-sm">On Time</p>
                <p className="text-2xl font-bold" data-testid="text-on-time-buses">{mockStats.onTime}</p>
                <p className="text-xs text-secondary-foreground/70">buses</p>
              </div>
              <Clock className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent-foreground/80 text-sm">Minor Delays</p>
                <p className="text-2xl font-bold" data-testid="text-minor-delays">{mockStats.minorDelays}</p>
                <p className="text-xs text-accent-foreground/70">buses</p>
              </div>
              <Zap className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-destructive-foreground/80 text-sm">Critical Issues</p>
                <p className="text-2xl font-bold" data-testid="text-critical-issues">{mockStats.criticalIssues}</p>
                <p className="text-xs text-destructive-foreground/70">buses</p>
              </div>
              <AlertTriangle className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">Revenue/Hour</p>
                <p className="text-2xl font-bold" data-testid="text-revenue-per-hour">₹{mockStats.revenuePerHour.toLocaleString()}</p>
                <p className="text-xs text-primary-foreground/70">current</p>
              </div>
              <MapPin className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Control Interface */}
      <Tabs defaultValue="fleet" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fleet" data-testid="tab-fleet">Fleet Overview</TabsTrigger>
          <TabsTrigger value="routes" data-testid="tab-routes">Route Assignment</TabsTrigger>
          <TabsTrigger value="communication" data-testid="tab-communication">Driver Communication</TabsTrigger>
          <TabsTrigger value="analytics" data-testid="tab-analytics">Real-time Analytics</TabsTrigger>
        </TabsList>

        {/* Fleet Overview Tab */}
        <TabsContent value="fleet" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Fleet Overview</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search buses..."
                      className="pl-9 w-64"
                      data-testid="input-search-buses"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32" data-testid="select-filter-status">
                      <Filter size={16} className="mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="delayed">Delayed</SelectItem>
                      <SelectItem value="breakdown">Breakdown</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Speed</TableHead>
                    <TableHead>Passengers</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buses.map((bus) => (
                    <TableRow key={bus.id} data-testid={`row-bus-${bus.id}`}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                            {bus.routeNumber}
                          </div>
                          <div>
                            <p className="font-medium">Bus {bus.id.slice(0, 8)}</p>
                            <p className="text-sm text-muted-foreground">ID: {bus.id.slice(-4)}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Route {bus.routeNumber}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(bus.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">{bus.speed}</span>
                          <span className="text-sm text-muted-foreground">km/h</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{bus.passengerCount}/{bus.capacity}</span>
                            <span className="text-muted-foreground">
                              {Math.round((bus.passengerCount / bus.capacity) * 100)}%
                            </span>
                          </div>
                          <Progress 
                            value={(bus.passengerCount / bus.capacity) * 100} 
                            className="h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{bus.currentLocation.lat.toFixed(4)}</div>
                          <div className="text-muted-foreground">{bus.currentLocation.lng.toFixed(4)}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleBusAction(bus.id, bus.speed === 0 ? 'release' : 'hold')}
                            data-testid={`button-${bus.speed === 0 ? 'release' : 'hold'}-${bus.id}`}
                          >
                            {bus.speed === 0 ? <PlayCircle size={14} /> : <PauseCircle size={14} />}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleBusAction(bus.id, 'maintenance')}
                            data-testid={`button-maintenance-${bus.id}`}
                          >
                            <Settings size={14} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            data-testid={`button-track-${bus.id}`}
                          >
                            <Eye size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Route Assignment Tab */}
        <TabsContent value="routes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Route Assignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {routes.map((route) => {
                  const routeBuses = buses.filter(bus => bus.routeNumber === route.number);
                  const activeBusCount = routeBuses.filter(bus => bus.status === 'active').length;
                  
                  return (
                    <div key={route.id} className="border rounded-lg p-4" data-testid={`route-card-${route.id}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">Route {route.number}</h4>
                          <p className="text-sm text-muted-foreground">{route.name}</p>
                        </div>
                        <Badge variant={activeBusCount > 0 ? "default" : "secondary"}>
                          {activeBusCount} buses active
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <MapPin size={14} className="mr-2 text-muted-foreground" />
                          <span>{route.source} → {route.destination}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users size={14} className="mr-2 text-muted-foreground" />
                          <span>{route.stops.length} stops</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" variant="outline" data-testid={`button-assign-${route.id}`}>
                          Assign Bus
                        </Button>
                        <Button size="sm" variant="outline" data-testid={`button-optimize-${route.id}`}>
                          Optimize
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Unassigned Buses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {buses.filter(bus => bus.status === 'maintenance').map((bus) => (
                    <div key={bus.id} className="flex items-center justify-between border rounded-lg p-3" data-testid={`unassigned-bus-${bus.id}`}>
                      <div className="flex items-center space-x-3">
                        <div className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                          {bus.routeNumber}
                        </div>
                        <div>
                          <p className="font-medium">Bus {bus.id.slice(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">Available</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleBusAction(bus.id, 'activate')}
                        data-testid={`button-activate-${bus.id}`}
                      >
                        Assign
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Driver Communication Tab */}
        <TabsContent value="communication" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {buses.filter(bus => bus.status === 'active').map((bus, index) => (
                    <div key={bus.id} className="flex items-center justify-between border rounded-lg p-4" data-testid={`driver-card-${bus.id}`}>
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold">
                          {bus.routeNumber}
                        </div>
                        <div>
                          <p className="font-medium">Driver {index + 1}</p>
                          <p className="text-sm text-muted-foreground">Bus {bus.id.slice(0, 8)}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Online
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" data-testid={`button-call-${bus.id}`}>
                          <Phone size={14} />
                        </Button>
                        <Button size="sm" variant="outline" data-testid={`button-message-${bus.id}`}>
                          <MessageSquare size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Broadcast Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Message Type</label>
                  <Select defaultValue="general">
                    <SelectTrigger data-testid="select-message-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Update</SelectItem>
                      <SelectItem value="emergency">Emergency Alert</SelectItem>
                      <SelectItem value="route">Route Change</SelectItem>
                      <SelectItem value="weather">Weather Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Recipients</label>
                  <Select defaultValue="all">
                    <SelectTrigger data-testid="select-recipients">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Drivers</SelectItem>
                      <SelectItem value="route12">Route 12 Only</SelectItem>
                      <SelectItem value="route07">Route 07 Only</SelectItem>
                      <SelectItem value="active">Active Buses Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea 
                    className="w-full mt-1 p-3 border rounded-md resize-none h-24" 
                    placeholder="Type your message here..."
                    data-testid="textarea-broadcast-message"
                  />
                </div>
                
                <Button className="w-full" data-testid="button-send-broadcast">
                  <MessageSquare size={16} className="mr-2" />
                  Send Broadcast
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Real-time Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>On-time Performance</span>
                      <span className="font-medium">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Fleet Utilization</span>
                      <span className="font-medium">87.5%</span>
                    </div>
                    <Progress value={87.5} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Fuel Efficiency</span>
                      <span className="font-medium">82.1%</span>
                    </div>
                    <Progress value={82.1} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Route Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {routes.slice(0, 4).map((route) => {
                    const routeBuses = buses.filter(bus => bus.routeNumber === route.number);
                    const performance = Math.random() * 20 + 80; // Mock performance data
                    
                    return (
                      <div key={route.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Route {route.number}</p>
                          <p className="text-sm text-muted-foreground">{routeBuses.length} buses</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{performance.toFixed(1)}%</p>
                          <div className="flex items-center">
                            {performance > 90 ? 
                              <CheckCircle size={14} className="text-green-500" /> : 
                              <XCircle size={14} className="text-red-500" />
                            }
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Live Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{buses.reduce((sum, bus) => sum + bus.passengerCount, 0)}</p>
                    <p className="text-sm text-muted-foreground">Total Passengers</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold">{Math.round(buses.reduce((sum, bus) => sum + bus.speed, 0) / buses.length)}</p>
                    <p className="text-sm text-muted-foreground">Avg Speed (km/h)</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold">₹{mockStats.revenuePerHour.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Revenue/Hour</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
