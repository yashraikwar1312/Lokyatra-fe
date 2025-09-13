import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PassengerHeatmap, AiRecommendation } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Users, 
  TrendingUp, 
  Bot, 
  Clock,
  AlertTriangle,
  Navigation,
  Activity,
  BarChart3,
  Eye,
  Zap,
  Target,
  ArrowUp,
  ArrowDown,
  Minus,
  RefreshCw,
  Filter,
  Calendar,
  Download,
  Settings
} from "lucide-react";

export default function PassengerHeatmapPage() {
  const { toast } = useToast();
  
  const { data: heatmapData = [], isLoading: heatmapLoading } = useQuery<PassengerHeatmap[]>({
    queryKey: ['/api/passenger-heatmap'],
  });

  const { data: aiRecommendations = [], isLoading: aiLoading } = useQuery<AiRecommendation[]>({
    queryKey: ['/api/ai-recommendations'],
  });

  const deployBusMutation = useMutation({
    mutationFn: async (recommendation: any) => {
      return apiRequest('POST', '/api/ai-recommendations', recommendation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ai-recommendations'] });
      toast({
        title: "Bus deployment initiated",
        description: "Extra bus has been deployed to reduce overcrowding.",
      });
    },
    onError: () => {
      toast({
        title: "Deployment failed",
        description: "Failed to deploy additional bus.",
        variant: "destructive",
      });
    },
  });

  const handleDeployBus = (stopId: string, stopName: string) => {
    deployBusMutation.mutate({
      type: 'deploy_bus',
      title: `Deploy Extra Bus to ${stopName}`,
      description: `High passenger density detected at ${stopName}. Deploying additional bus to reduce wait times.`,
      priority: 'high',
      routeId: null,
      busId: null,
      estimatedImpact: 'Reduce wait time by 8-12 minutes, improve passenger satisfaction',
      status: 'pending'
    });
  };

  const isLoading = heatmapLoading || aiLoading;

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-accent text-accent-foreground';
      case 'low':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCrowdLevelIcon = (level: string) => {
    switch (level) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Passenger Heatmap</h1>
          <p className="text-muted-foreground">Real-time passenger density and crowd monitoring</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 animate-pulse">
            <CardContent className="p-6">
              <div className="h-96 bg-muted rounded"></div>
            </CardContent>
          </Card>
          <Card className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-96 bg-muted rounded"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const highCrowdStops = heatmapData.filter(data => data.crowdLevel === 'high');
  const mediumCrowdStops = heatmapData.filter(data => data.crowdLevel === 'medium');
  const lowCrowdStops = heatmapData.filter(data => data.crowdLevel === 'low');
  const totalPassengers = heatmapData.reduce((sum, data) => sum + data.passengerCount, 0);
  const avgWaitTime = totalPassengers > 0 ? (highCrowdStops.length * 8 + mediumCrowdStops.length * 4 + lowCrowdStops.length * 2) / heatmapData.length : 0;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Passenger Heatmap</h1>
        <p className="text-muted-foreground">Real-time passenger density and crowd monitoring</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">Total Passengers</p>
                <p className="text-2xl font-bold" data-testid="text-total-passengers">{totalPassengers}</p>
                <p className="text-xs text-primary-foreground/70">waiting</p>
              </div>
              <Users className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-destructive-foreground/80 text-sm">High Crowd Stops</p>
                <p className="text-2xl font-bold" data-testid="text-high-crowd-stops">{highCrowdStops.length}</p>
                <p className="text-xs text-destructive-foreground/70">critical</p>
              </div>
              <AlertTriangle className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-foreground/80 text-sm">Avg Wait Time</p>
                <p className="text-2xl font-bold">{avgWaitTime.toFixed(1)}</p>
                <p className="text-xs text-secondary-foreground/70">minutes</p>
              </div>
              <Clock className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent-foreground/80 text-sm">AI Recommendations</p>
                <p className="text-2xl font-bold">{aiRecommendations.filter(r => r.status === 'pending').length}</p>
                <p className="text-xs text-accent-foreground/70">pending</p>
              </div>
              <Bot className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Interface with Tabs */}
      <Tabs defaultValue="realtime" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="realtime" data-testid="tab-realtime">Real-time View</TabsTrigger>
          <TabsTrigger value="analytics" data-testid="tab-analytics">Analytics</TabsTrigger>
          <TabsTrigger value="predictions" data-testid="tab-predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="historical" data-testid="tab-historical">Historical Trends</TabsTrigger>
        </TabsList>

        {/* Real-time View Tab */}
        <TabsContent value="realtime" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive Heatmap */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Interactive Passenger Heatmap</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32" data-testid="select-time-filter">
                        <Filter size={16} className="mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Times</SelectItem>
                        <SelectItem value="peak">Peak Hours</SelectItem>
                        <SelectItem value="off-peak">Off-Peak</SelectItem>
                        <SelectItem value="night">Night Hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="outline" data-testid="button-refresh-heatmap">
                      <RefreshCw size={16} className="mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-96 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg overflow-hidden">
                  {/* Enhanced city background */}
                  <div className="absolute inset-0 opacity-20">
                    {/* Buildings */}
                    <div className="absolute top-8 left-8 w-16 h-12 bg-slate-600 rounded opacity-60"></div>
                    <div className="absolute top-8 left-28 w-20 h-16 bg-slate-600 rounded opacity-60"></div>
                    <div className="absolute top-28 left-8 w-24 h-20 bg-slate-600 rounded opacity-60"></div>
                    <div className="absolute top-28 left-36 w-16 h-24 bg-slate-600 rounded opacity-60"></div>
                    
                    {/* Parks and landmarks */}
                    <div className="absolute top-20 right-20 w-16 h-16 bg-green-600 rounded-full opacity-40"></div>
                    <div className="absolute bottom-20 left-20 w-20 h-20 bg-blue-600 rounded opacity-40"></div>
                  </div>

                  {/* Interactive heatmap points */}
                  {heatmapData.map((data) => (
                    <Tooltip key={data.id}>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-125"
                          style={{
                            left: `${((data.location.lng - 77.200) / 0.020) * 100}%`,
                            top: `${(1 - (data.location.lat - 28.600) / 0.025) * 100}%`,
                          }}
                          data-testid={`heatmap-point-${data.id}`}
                        >
                          <div className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold animate-pulse ${getCrowdLevelColor(data.crowdLevel)}`}>
                            {getCrowdLevelIcon(data.crowdLevel)}
                            {/* Pulsing effect for high crowd */}
                            {data.crowdLevel === 'high' && (
                              <div className="absolute inset-0 w-8 h-8 rounded-full bg-destructive animate-ping opacity-75"></div>
                            )}
                          </div>
                          {data.stopName && (
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/70 px-2 py-1 rounded whitespace-nowrap">
                              {data.stopName}
                            </div>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <div className="space-y-1">
                          <p className="font-medium">{data.stopName || 'Bus Stop'}</p>
                          <p className="text-sm">Crowd Level: {data.crowdLevel}</p>
                          <p className="text-sm">Passengers Waiting: {data.passengerCount}</p>
                          <p className="text-sm">Est. Wait Time: {data.crowdLevel === 'high' ? '8-12' : data.crowdLevel === 'medium' ? '4-6' : '2-3'} min</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}

                  {/* Enhanced legend */}
                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                    <h4 className="text-sm font-semibold mb-2">Live Crowd Density</h4>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <span>🔴</span>
                        <span>High ({'>'}50 people)</span>
                        <Badge variant="destructive" className="ml-auto">{highCrowdStops.length}</Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span>🟡</span>
                        <span>Medium (20-50)</span>
                        <Badge variant="secondary" className="ml-auto bg-accent text-accent-foreground">{mediumCrowdStops.length}</Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span>🟢</span>
                        <span>Low ({'<'}20 people)</span>
                        <Badge variant="secondary" className="ml-auto">{lowCrowdStops.length}</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Live indicator */}
                  <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium">LIVE</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    Last updated: <span className="font-medium">30 seconds ago</span> • Next update in: <span className="font-medium">30s</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" data-testid="button-export-data">
                      <Download size={16} className="mr-2" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline" data-testid="button-settings">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Panel */}
            <div className="space-y-6">
              {/* Critical Stops Alert */}
              <Card className="border-destructive/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-destructive flex items-center">
                    <AlertTriangle className="mr-2" size={18} />
                    Critical Overcrowding
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {highCrowdStops.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Target className="mx-auto mb-2 text-secondary" size={32} />
                      <p>No critical overcrowding detected</p>
                      <p className="text-xs mt-1">All stops within normal capacity</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {highCrowdStops.slice(0, 5).map((stop) => (
                        <div 
                          key={stop.id}
                          className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg border border-destructive/20"
                          data-testid={`critical-stop-${stop.id}`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
                              <div className="absolute inset-0 w-3 h-3 bg-destructive rounded-full animate-ping opacity-75"></div>
                            </div>
                            <div>
                              <p className="font-medium text-sm">{stop.stopName || 'Unknown Stop'}</p>
                              <p className="text-xs text-muted-foreground">
                                {stop.passengerCount} waiting • Est. 8-12 min delay
                              </p>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeployBus(stop.id, stop.stopName || 'Unknown Stop')}
                            disabled={deployBusMutation.isPending}
                            data-testid={`button-deploy-${stop.id}`}
                          >
                            <Zap size={14} className="mr-1" />
                            Deploy
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-primary flex items-center">
                    <Bot className="mr-2" size={18} />
                    Smart Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiRecommendations.filter(r => r.status === 'pending').slice(0, 3).map((recommendation) => (
                      <div key={recommendation.id} className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{recommendation.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {recommendation.description}
                            </p>
                            {recommendation.estimatedImpact && (
                              <p className="text-xs text-primary mt-1 font-medium">
                                Impact: {recommendation.estimatedImpact}
                              </p>
                            )}
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {recommendation.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Live Activity Feed */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2" size={18} />
                    Live Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span className="text-muted-foreground">2 min ago</span>
                      <span>High crowd detected at Central Station</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-muted-foreground">5 min ago</span>
                      <span>Bus deployed to Mall Road</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">8 min ago</span>
                      <span>Peak hour pattern detected</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">12 min ago</span>
                      <span>Route optimization suggested</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Crowd Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>High Density Stops</span>
                      <span className="font-medium">{highCrowdStops.length}</span>
                    </div>
                    <Progress value={(highCrowdStops.length / heatmapData.length) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Medium Density Stops</span>
                      <span className="font-medium">{mediumCrowdStops.length}</span>
                    </div>
                    <Progress value={(mediumCrowdStops.length / heatmapData.length) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Low Density Stops</span>
                      <span className="font-medium">{lowCrowdStops.length}</span>
                    </div>
                    <Progress value={(lowCrowdStops.length / heatmapData.length) * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wait Time Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold">{avgWaitTime.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">Average Wait Time (min)</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Below Target (&lt;5 min)</span>
                      <span className="text-secondary font-medium">{(lowCrowdStops.length + mediumCrowdStops.length)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Above Target (&gt;5 min)</span>
                      <span className="text-destructive font-medium">{highCrowdStops.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peak Hours Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold">8-10 AM</p>
                    <p className="text-sm text-muted-foreground">Current Peak Window</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Peak Intensity</span>
                      <div className="flex items-center">
                        <ArrowUp className="text-destructive mr-1" size={14} />
                        <span className="font-medium">High</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Expected Duration</span>
                      <span className="font-medium">45 min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Buses Deployed</span>
                      <span className="font-medium">3 additional</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Predictions Tab */}
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Predictive Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-medium">Next Hour Prediction</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Central Station crowd level expected to increase by 30% due to incoming metro train
                    </p>
                    <div className="flex items-center mt-2 text-sm">
                      <TrendingUp className="text-destructive mr-1" size={14} />
                      <span>High probability (85%)</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                    <h4 className="font-medium">Route Optimization</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Rerouting 2 buses from Route 07 to Route 12 can reduce overall wait time by 12%
                    </p>
                    <div className="flex items-center mt-2 text-sm">
                      <ArrowDown className="text-secondary mr-1" size={14} />
                      <span>Recommended action</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <h4 className="font-medium">Weather Impact</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Light rain expected in 2 hours. 25% increase in bus demand predicted
                    </p>
                    <div className="flex items-center mt-2 text-sm">
                      <TrendingUp className="text-accent mr-1" size={14} />
                      <span>Prepare additional buses</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Smart Deployment Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiRecommendations.filter(r => r.status === 'pending').map((recommendation) => (
                    <div key={recommendation.id} className="p-4 bg-card border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{recommendation.title}</h4>
                        <Badge variant={recommendation.priority === 'high' ? 'destructive' : recommendation.priority === 'medium' ? 'secondary' : 'outline'}>
                          {recommendation.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {recommendation.description}
                      </p>
                      {recommendation.estimatedImpact && (
                        <p className="text-xs text-primary mb-3 font-medium">
                          Expected Impact: {recommendation.estimatedImpact}
                        </p>
                      )}
                      <div className="flex space-x-2">
                        <Button size="sm" variant="default" data-testid={`button-implement-${recommendation.id}`}>
                          Implement
                        </Button>
                        <Button size="sm" variant="outline" data-testid={`button-schedule-${recommendation.id}`}>
                          Schedule Later
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Historical Trends Tab */}
        <TabsContent value="historical" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                    const peakIntensity = [85, 92, 88, 90, 95, 65, 45][index];
                    return (
                      <div key={day} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{day}</span>
                          <span className="font-medium">{peakIntensity}% peak intensity</span>
                        </div>
                        <Progress value={peakIntensity} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">+15%</p>
                    <p className="text-sm text-muted-foreground">Passenger increase vs last month</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Peak Hours Duration</span>
                      <div className="flex items-center">
                        <ArrowUp className="text-destructive mr-1" size={14} />
                        <span className="font-medium">+20 min</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Critical Incidents</span>
                      <div className="flex items-center">
                        <ArrowDown className="text-secondary mr-1" size={14} />
                        <span className="font-medium">-3 events</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AI Deployments</span>
                      <div className="flex items-center">
                        <ArrowUp className="text-primary mr-1" size={14} />
                        <span className="font-medium">+12 actions</span>
                      </div>
                    </div>
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
