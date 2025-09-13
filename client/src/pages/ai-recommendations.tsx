import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AiRecommendation } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { 
  Bot, 
  Check, 
  X, 
  TrendingUp, 
  Clock, 
  Zap, 
  MoreHorizontal,
  ChevronRight 
} from "lucide-react";

export default function AiRecommendations() {
  const { toast } = useToast();

  const { data: recommendations = [], isLoading } = useQuery<AiRecommendation[]>({
    queryKey: ['/api/ai-recommendations'],
  });

  const updateRecommendationMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest('PUT', `/api/ai-recommendations/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ai-recommendations'] });
      toast({
        title: "Recommendation updated",
        description: "The AI recommendation status has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Failed to update the recommendation status.",
        variant: "destructive",
      });
    },
  });

  const handleRecommendationAction = (id: string, status: 'implemented' | 'declined') => {
    updateRecommendationMutation.mutate({ id, status });
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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-accent text-accent-foreground">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deploy_bus':
        return '🚌';
      case 'reroute':
        return '🗺️';
      case 'hold_bus':
        return '⏸️';
      default:
        return '💡';
    }
  };

  const pendingRecommendations = recommendations.filter(r => r.status === 'pending');
  const implementedRecommendations = recommendations.filter(r => r.status === 'implemented');
  const declinedRecommendations = recommendations.filter(r => r.status === 'declined');

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">AI Recommendations</h1>
          <p className="text-muted-foreground">Intelligent transport optimization suggestions</p>
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

  // Mock AI metrics - in real app these would come from API
  const aiMetrics = {
    accuracy: 94.2,
    decisionsPerHour: 156,
    efficiencyGain: 18.5,
    responseTime: 230
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">AI Recommendations</h1>
        <p className="text-muted-foreground">Intelligent transport optimization suggestions</p>
      </div>

      {/* AI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">Accuracy</p>
                <p className="text-2xl font-bold" data-testid="text-ai-accuracy">{aiMetrics.accuracy}%</p>
                <p className="text-xs text-primary-foreground/70">prediction rate</p>
              </div>
              <TrendingUp className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-foreground/80 text-sm">Decisions/Hour</p>
                <p className="text-2xl font-bold" data-testid="text-decisions-per-hour">{aiMetrics.decisionsPerHour}</p>
                <p className="text-xs text-secondary-foreground/70">automated</p>
              </div>
              <Bot className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent-foreground/80 text-sm">Efficiency Gain</p>
                <p className="text-2xl font-bold" data-testid="text-efficiency-gain">{aiMetrics.efficiencyGain}%</p>
                <p className="text-xs text-accent-foreground/70">vs manual</p>
              </div>
              <Zap className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Response Time</p>
                <p className="text-2xl font-bold" data-testid="text-response-time">{aiMetrics.responseTime}</p>
                <p className="text-xs text-white/70">milliseconds</p>
              </div>
              <Clock className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Recommendations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="text-primary" size={20} />
                <CardTitle>Pending Recommendations</CardTitle>
                <Badge variant="secondary">{pendingRecommendations.length}</Badge>
              </div>
              <Button size="sm" variant="outline" data-testid="button-refresh-recommendations">
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {pendingRecommendations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No pending recommendations
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                {pendingRecommendations.map((recommendation) => (
                  <div
                    key={recommendation.id}
                    className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow"
                    data-testid={`recommendation-${recommendation.id}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{getTypeIcon(recommendation.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-foreground" data-testid={`text-rec-title-${recommendation.id}`}>
                              {recommendation.title}
                            </h4>
                            {getPriorityBadge(recommendation.priority)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2" data-testid={`text-rec-description-${recommendation.id}`}>
                            {recommendation.description}
                          </p>
                          {recommendation.estimatedImpact && (
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="h-4 w-4 text-secondary" />
                              <span className="text-sm text-secondary font-medium">
                                {recommendation.estimatedImpact}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="default"
                          className="bg-secondary hover:bg-secondary/90"
                          onClick={() => handleRecommendationAction(recommendation.id, 'implemented')}
                          disabled={updateRecommendationMutation.isPending}
                          data-testid={`button-implement-${recommendation.id}`}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Implement
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRecommendationAction(recommendation.id, 'declined')}
                          disabled={updateRecommendationMutation.isPending}
                          data-testid={`button-decline-${recommendation.id}`}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Decline
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          data-testid={`button-details-${recommendation.id}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatDistanceToNow(new Date(recommendation.createdAt), { addSuffix: true })}</span>
                      <div className="flex items-center space-x-1">
                        <span className={getPriorityColor(recommendation.priority)}>●</span>
                        <span>{recommendation.priority} priority</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics and History */}
        <div className="space-y-6">
          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Implementation Rate</span>
                    <span className="text-sm font-medium">
                      {Math.round((implementedRecommendations.length / Math.max(recommendations.length, 1)) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.round((implementedRecommendations.length / Math.max(recommendations.length, 1)) * 100)} 
                    className="h-2"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="text-sm font-medium">{aiMetrics.accuracy}%</span>
                  </div>
                  <Progress value={aiMetrics.accuracy} className="h-2" />
                </div>
                
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Recommendations</span>
                    <Badge variant="outline">{recommendations.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Implemented</span>
                    <Badge variant="default" className="bg-secondary">{implementedRecommendations.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pending</span>
                    <Badge variant="outline">{pendingRecommendations.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Declined</span>
                    <Badge variant="destructive">{declinedRecommendations.length}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                {[...implementedRecommendations, ...declinedRecommendations]
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 10)
                  .map((recommendation) => (
                    <div
                      key={recommendation.id}
                      className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
                      data-testid={`recent-action-${recommendation.id}`}
                    >
                      <div className="text-lg">{getTypeIcon(recommendation.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{recommendation.title}</p>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={recommendation.status === 'implemented' ? 'default' : 'destructive'}
                            className={recommendation.status === 'implemented' ? 'bg-secondary' : ''}
                          >
                            {recommendation.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(recommendation.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>

          {/* AI Settings */}
          <Card>
            <CardHeader>
              <CardTitle>AI Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Auto-implementation</span>
                  <Badge variant="outline">Disabled</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Learning Mode</span>
                  <Badge variant="default" className="bg-primary">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Confidence Threshold</span>
                  <Badge variant="outline">85%</Badge>
                </div>
                <Button className="w-full mt-4" variant="outline" data-testid="button-ai-settings">
                  Configure AI Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
