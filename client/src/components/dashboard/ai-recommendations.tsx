import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Check, X } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AiRecommendation } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function AiRecommendationsWidget() {
  const { toast } = useToast();
  
  const { data: recommendations = [], isLoading } = useQuery<AiRecommendation[]>({
    queryKey: ['/api/ai-recommendations', 'status=pending'],
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

  const topRecommendations = recommendations.slice(0, 2);

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return "bg-primary/5 border-primary/20";
      case 'medium':
        return "bg-secondary/5 border-secondary/20";
      default:
        return "bg-muted/50 border-border";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bot className="text-primary" size={18} />
            <CardTitle>AI Recommendations</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-muted rounded-lg"></div>
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
        <div className="flex items-center space-x-2">
          <Bot className="text-primary" size={18} />
          <CardTitle>AI Recommendations</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {topRecommendations.length === 0 ? (
          <div className="space-y-4">
            <div className="mb-2 p-3 rounded border bg-yellow-50">
              <div className="font-semibold">🚌 Optimize Route 101</div>
              <div className="text-xs text-gray-600">
                AI suggests reducing wait time at Stop 3 by 2 minutes to improve punctuality.
              </div>
              <div className="mt-1 text-xs text-blue-600">Priority: High</div>
            </div>
            <div className="mb-2 p-3 rounded border bg-green-50">
              <div className="font-semibold">📈 Add Express Service</div>
              <div className="text-xs text-gray-600">
                Launch an express bus between City Center and Tech Park during peak hours for 20% faster commute.
              </div>
              <div className="mt-1 text-xs text-green-600">Priority: Medium</div>
            </div>
            <div className="mb-2 p-3 rounded border bg-blue-50">
              <div className="font-semibold">🔔 Notify Delays</div>
              <div className="text-xs text-gray-600">
                Enable push notifications for real-time delay alerts to commuters.
              </div>
              <div className="mt-1 text-xs text-blue-600">Priority: Low</div>
            </div>
            <div className="mb-2 p-3 rounded border bg-purple-50">
              <div className="font-semibold">🗺️ Dynamic Route Adjustment</div>
              <div className="text-xs text-gray-600">
                AI recommends rerouting Bus 102 during peak hours to avoid construction zones and reduce delays.
              </div>
              <div className="mt-1 text-xs text-purple-600">Priority: High</div>
            </div>
            <div className="mb-2 p-3 rounded border bg-pink-50">
              <div className="font-semibold">🌡️ AC Usage Optimization</div>
              <div className="text-xs text-gray-600">
                Reduce AC usage on low-occupancy buses to save energy and operational costs.
              </div>
              <div className="mt-1 text-xs text-pink-600">Priority: Medium</div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {topRecommendations.map((recommendation) => (
              <div 
                key={recommendation.id}
                className={`p-4 rounded-lg border ${getPriorityStyle(recommendation.priority)}`}
                data-testid={`recommendation-${recommendation.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground" data-testid={`text-recommendation-title-${recommendation.id}`}>
                      {recommendation.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1" data-testid={`text-recommendation-description-${recommendation.id}`}>
                      {recommendation.description}
                    </p>
                    {recommendation.estimatedImpact && (
                      <p className="text-xs text-secondary mt-1">
                        Impact: {recommendation.estimatedImpact}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRecommendationAction(recommendation.id, 'implemented')}
                      disabled={updateRecommendationMutation.isPending}
                      data-testid={`button-implement-${recommendation.id}`}
                    >
                      <Check size={12} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRecommendationAction(recommendation.id, 'declined')}
                      disabled={updateRecommendationMutation.isPending}
                      data-testid={`button-decline-${recommendation.id}`}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
