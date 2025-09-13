import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Alert, SosRequest } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { 
  AlertTriangle, 
  Shield, 
  MapPin, 
  Search, 
  Filter, 
  AlertCircle, 
  Info,
  Eye,
  CheckCircle,
  Clock,
  Phone,
  MessageSquare,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Camera,
  Siren,
  Radio,
  Navigation,
  FileText,
  Download,
  RefreshCw,
  Plus,
  Minus,
  Target,
  Zap
} from "lucide-react";

export default function AlertsSafety() {
  const { toast } = useToast();

  const { data: alerts = [], isLoading: alertsLoading } = useQuery<Alert[]>({
    queryKey: ['/api/alerts'],
  });

  const { data: sosRequests = [], isLoading: sosLoading } = useQuery<SosRequest[]>({
    queryKey: ['/api/sos'],
  });

  const updateAlertMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      return apiRequest('PUT', `/api/alerts/${id}`, { isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts'] });
      toast({
        title: "Alert updated",
        description: "Alert status has been updated successfully.",
      });
    },
  });

  const updateSosMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest('PUT', `/api/sos/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sos'] });
      toast({
        title: "SOS request updated",
        description: "SOS request status has been updated.",
      });
    },
  });

  const createAlertMutation = useMutation({
    mutationFn: async (alertData: any) => {
      return apiRequest('POST', '/api/alerts', alertData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts'] });
      toast({
        title: "Alert created",
        description: "New alert has been created successfully.",
      });
    },
  });

  const emergencyBroadcastMutation = useMutation({
    mutationFn: async (message: string) => {
      return apiRequest('POST', '/api/emergency-broadcast', { message });
    },
    onSuccess: () => {
      toast({
        title: "Emergency broadcast sent",
        description: "Emergency message has been broadcast to all units.",
      });
    },
  });

  const handleEmergencyResponse = (sosId: string, responseType: string) => {
    if (responseType === 'dispatch') {
      toast({
        title: "Emergency response dispatched",
        description: "Emergency response team has been notified and dispatched.",
      });
    } else if (responseType === 'call') {
      toast({
        title: "Emergency call initiated",
        description: "Calling emergency services now.",
      });
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-accent" />;
      case 'info':
        return <Info className="h-5 w-5 text-primary" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return "border-l-4 border-destructive bg-destructive/5";
      case 'warning':
        return "border-l-4 border-accent bg-accent/5";
      case 'info':
        return "border-l-4 border-primary bg-primary/5";
      default:
        return "border-l-4 border-muted bg-muted/5";
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-accent text-accent-foreground">Warning</Badge>;
      case 'info':
        return <Badge variant="outline">Info</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const criticalAlerts = alerts.filter(alert => alert.type === 'critical' && alert.isActive);
  const warningAlerts = alerts.filter(alert => alert.type === 'warning' && alert.isActive);
  const infoAlerts = alerts.filter(alert => alert.type === 'info' && alert.isActive);
  const activeSosRequests = sosRequests.filter(request => request.status === 'active');
  const resolvedSosRequests = sosRequests.filter(request => request.status === 'resolved');
  const avgResponseTime = activeSosRequests.length > 0 ? 2.3 : 1.8;

  const isLoading = alertsLoading || sosLoading;

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Alerts & Safety</h1>
          <p className="text-muted-foreground">System alerts and emergency monitoring</p>
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
        <h1 className="text-3xl font-bold text-foreground">Alerts & Safety</h1>
        <p className="text-muted-foreground">System alerts and emergency monitoring</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-destructive-foreground/80 text-sm">Critical Alerts</p>
                <p className="text-2xl font-bold" data-testid="text-critical-alerts">{criticalAlerts.length}</p>
                <p className="text-xs text-destructive-foreground/70">active</p>
              </div>
              <AlertTriangle className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent-foreground/80 text-sm">Warning Alerts</p>
                <p className="text-2xl font-bold" data-testid="text-warning-alerts">{warningAlerts.length}</p>
                <p className="text-xs text-accent-foreground/70">active</p>
              </div>
              <AlertCircle className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">SOS Requests</p>
                <p className="text-2xl font-bold" data-testid="text-sos-requests">{activeSosRequests.length}</p>
                <p className="text-xs text-primary-foreground/70">active</p>
              </div>
              <Shield className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-foreground/80 text-sm">Response Time</p>
                <p className="text-2xl font-bold">{avgResponseTime}</p>
                <p className="text-xs text-secondary-foreground/70">minutes avg</p>
              </div>
              <Clock className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Safety Dashboard with Tabs */}
      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="alerts" data-testid="tab-alerts">Real-time Alerts</TabsTrigger>
          <TabsTrigger value="emergency" data-testid="tab-emergency">Emergency Response</TabsTrigger>
          <TabsTrigger value="analytics" data-testid="tab-analytics">Safety Analytics</TabsTrigger>
          <TabsTrigger value="monitoring" data-testid="tab-monitoring">Security Monitoring</TabsTrigger>
        </TabsList>

        {/* Real-time Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Alerts Feed */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Real-time Alerts Feed</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32" data-testid="select-alert-filter">
                        <Filter size={16} className="mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Alerts</SelectItem>
                        <SelectItem value="critical">Critical Only</SelectItem>
                        <SelectItem value="warning">Warnings</SelectItem>
                        <SelectItem value="active">Active Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="outline" data-testid="button-refresh-alerts">
                      <RefreshCw size={16} className="mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {alerts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Target className="mx-auto mb-2 text-secondary" size={32} />
                      <p>No alerts found</p>
                      <p className="text-xs mt-1">System monitoring is active</p>
                    </div>
                  ) : (
                    alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 rounded-lg transition-all hover:shadow-md ${getAlertStyle(alert.type)} ${
                          !alert.isActive ? 'opacity-60' : ''
                        }`}
                        data-testid={`alert-${alert.id}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            {getAlertIcon(alert.type)}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold text-foreground" data-testid={`text-alert-title-${alert.id}`}>
                                  {alert.title}
                                </h4>
                                {getAlertBadge(alert.type)}
                                {!alert.isActive && <Badge variant="outline">Resolved</Badge>}
                                {alert.type === 'critical' && alert.isActive && (
                                  <Badge variant="destructive" className="animate-pulse">
                                    URGENT
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3" data-testid={`text-alert-description-${alert.id}`}>
                                {alert.description}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                                </span>
                                {alert.routeId && (
                                  <span className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    Route affected
                                  </span>
                                )}
                                <span className="flex items-center">
                                  <Activity className="h-3 w-3 mr-1" />
                                  System auto-detected
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-3">
                            <Button size="sm" variant="outline" data-testid={`button-view-${alert.id}`}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            {alert.isActive && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateAlertMutation.mutate({ id: alert.id, isActive: false })}
                                disabled={updateAlertMutation.isPending}
                                data-testid={`button-resolve-${alert.id}`}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Alert Management Panel */}
            <div className="space-y-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center">
                    <Plus className="mr-2" size={18} />
                    Create New Alert
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Alert Type</label>
                    <Select defaultValue="info">
                      <SelectTrigger data-testid="select-alert-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="info">Information</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input placeholder="Alert title" data-testid="input-alert-title" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      placeholder="Describe the alert..." 
                      className="h-20 resize-none"
                      data-testid="textarea-alert-description"
                    />
                  </div>
                  
                  <Button className="w-full" data-testid="button-create-alert">
                    <Plus size={16} className="mr-2" />
                    Create Alert
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Active Alerts</span>
                      <Badge variant="outline">{criticalAlerts.length + warningAlerts.length + infoAlerts.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Critical Priority</span>
                      <Badge variant="destructive">{criticalAlerts.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Avg Resolution Time</span>
                      <Badge variant="secondary">4.2 min</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-Resolution Rate</span>
                      <Badge variant="default" className="bg-secondary">78%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Emergency Response Tab */}
        <TabsContent value="emergency" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SOS Request Management */}
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center">
                  <Siren className="mr-2" size={18} />
                  Active SOS Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeSosRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="mx-auto mb-2 text-secondary" size={32} />
                    <p>No active SOS requests</p>
                    <p className="text-xs mt-1">Emergency monitoring is active</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeSosRequests.map((request) => (
                      <div
                        key={request.id}
                        className="p-4 bg-destructive/5 rounded-lg border border-destructive/20"
                        data-testid={`sos-request-${request.id}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
                            <Badge variant="destructive" data-testid={`badge-status-${request.id}`}>
                              {request.status.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="bg-destructive/5">
                              {request.priority} Priority
                            </Badge>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            ID: {request.id.slice(-6)}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>Location: {request.location.lat.toFixed(4)}, {request.location.lng.toFixed(4)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</span>
                          </div>
                          {request.busId && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Navigation className="h-4 w-4 text-muted-foreground" />
                              <span>Bus ID: {request.busId.slice(0, 8)}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleEmergencyResponse(request.id, 'dispatch')}
                            data-testid={`button-dispatch-${request.id}`}
                          >
                            <Zap size={14} className="mr-1" />
                            Dispatch
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEmergencyResponse(request.id, 'call')}
                            data-testid={`button-call-${request.id}`}
                          >
                            <Phone size={14} className="mr-1" />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateSosMutation.mutate({ id: request.id, status: 'resolved' })}
                            disabled={updateSosMutation.isPending}
                            data-testid={`button-resolve-sos-${request.id}`}
                          >
                            <CheckCircle size={14} className="mr-1" />
                            Resolve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Emergency Response Tools */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Radio className="mr-2" size={18} />
                    Emergency Broadcast
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Message Type</label>
                    <Select defaultValue="emergency">
                      <SelectTrigger data-testid="select-broadcast-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency Alert</SelectItem>
                        <SelectItem value="evacuation">Evacuation Notice</SelectItem>
                        <SelectItem value="safety">Safety Update</SelectItem>
                        <SelectItem value="weather">Weather Warning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Recipients</label>
                    <Select defaultValue="all">
                      <SelectTrigger data-testid="select-broadcast-recipients">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Units</SelectItem>
                        <SelectItem value="buses">All Buses</SelectItem>
                        <SelectItem value="staff">Staff Only</SelectItem>
                        <SelectItem value="passengers">Passengers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <Textarea 
                      placeholder="Emergency message..." 
                      className="h-20 resize-none"
                      data-testid="textarea-emergency-message"
                    />
                  </div>
                  
                  <Button className="w-full" variant="destructive" data-testid="button-send-broadcast">
                    <Siren size={16} className="mr-2" />
                    Send Emergency Broadcast
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Teams</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-card border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-sm">Medical Team Alpha</span>
                      </div>
                      <Badge variant="secondary">Available</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-card border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                        <span className="font-medium text-sm">Security Team Beta</span>
                      </div>
                      <Badge variant="destructive">Deployed</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-card border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-sm">Fire Safety Unit</span>
                      </div>
                      <Badge variant="secondary">Standby</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Safety Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Safety Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Safety Score</span>
                      <span className="font-medium">95.2%</span>
                    </div>
                    <Progress value={95.2} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Incident Response Rate</span>
                      <span className="font-medium">98.7%</span>
                    </div>
                    <Progress value={98.7} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Emergency Preparedness</span>
                      <span className="font-medium">92.1%</span>
                    </div>
                    <Progress value={92.1} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">-23%</p>
                    <p className="text-sm text-muted-foreground">Incident reduction</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Critical Incidents</span>
                      <div className="flex items-center">
                        <TrendingDown className="text-secondary mr-1" size={14} />
                        <span className="font-medium">-2</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Response Time</span>
                      <div className="flex items-center">
                        <TrendingDown className="text-secondary mr-1" size={14} />
                        <span className="font-medium">-0.8min</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Safety Reports</span>
                      <div className="flex items-center">
                        <TrendingUp className="text-primary mr-1" size={14} />
                        <span className="font-medium">+12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Live Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{avgResponseTime.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">Avg Response Time (min)</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Monitors</span>
                      <Badge variant="default" className="bg-primary">247</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">CCTV Systems</span>
                      <Badge variant="default" className="bg-secondary">98% Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Emergency Contacts</span>
                      <Badge variant="default" className="bg-secondary">Connected</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="mr-2" size={18} />
                  CCTV Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 rounded-lg p-4 text-center text-white">
                      <div className="text-xs mb-2">Bus Terminal A</div>
                      <div className="h-16 bg-slate-700 rounded flex items-center justify-center">
                        <Camera size={24} className="text-slate-400" />
                      </div>
                      <Badge variant="secondary" className="mt-2 bg-green-600">LIVE</Badge>
                    </div>
                    
                    <div className="bg-slate-800 rounded-lg p-4 text-center text-white">
                      <div className="text-xs mb-2">Central Station</div>
                      <div className="h-16 bg-slate-700 rounded flex items-center justify-center">
                        <Camera size={24} className="text-slate-400" />
                      </div>
                      <Badge variant="secondary" className="mt-2 bg-green-600">LIVE</Badge>
                    </div>
                    
                    <div className="bg-slate-800 rounded-lg p-4 text-center text-white">
                      <div className="text-xs mb-2">Route 12 Stop</div>
                      <div className="h-16 bg-slate-700 rounded flex items-center justify-center">
                        <Camera size={24} className="text-slate-400" />
                      </div>
                      <Badge variant="secondary" className="mt-2 bg-green-600">LIVE</Badge>
                    </div>
                    
                    <div className="bg-slate-800 rounded-lg p-4 text-center text-white">
                      <div className="text-xs mb-2">Mall Junction</div>
                      <div className="h-16 bg-slate-700 rounded flex items-center justify-center">
                        <Camera size={24} className="text-slate-400" />
                      </div>
                      <Badge variant="destructive" className="mt-2">OFFLINE</Badge>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1" data-testid="button-view-all-cameras">
                      <Eye size={16} className="mr-2" />
                      View All
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" data-testid="button-camera-settings">
                      Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-card border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">Monthly Safety Report</h4>
                      <Badge variant="secondary">Ready</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Comprehensive safety analysis for December 2024
                    </p>
                    <Button size="sm" variant="outline" className="w-full" data-testid="button-download-monthly">
                      <Download size={14} className="mr-2" />
                      Download Report
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-card border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">Incident Analysis</h4>
                      <Badge variant="outline">Generating</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Detailed analysis of recent security incidents
                    </p>
                    <Button size="sm" variant="outline" className="w-full" disabled data-testid="button-download-incident">
                      <FileText size={14} className="mr-2" />
                      Processing...
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-card border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">Emergency Protocols</h4>
                      <Badge variant="default" className="bg-primary">Updated</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Latest emergency response procedures
                    </p>
                    <Button size="sm" variant="outline" className="w-full" data-testid="button-view-protocols">
                      <Eye size={14} className="mr-2" />
                      View Protocols
                    </Button>
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
