import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Expand } from "lucide-react";

export function LiveMap() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Live City Overview</CardTitle>
          <div className="flex space-x-2">
            <Button size="sm" variant="default" data-testid="button-toggle-traffic">Traffic</Button>
            <Button size="sm" variant="outline" data-testid="button-toggle-routes">Routes</Button>
            <Button size="sm" variant="outline" data-testid="button-toggle-heatmap">Heatmap</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* 3D Map Mock */}
        <div className="relative h-80 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg overflow-hidden map-container">
          {/* City blocks */}
          <div className="absolute inset-0 opacity-20">
            {/* Mock city layout */}
            <div className="absolute top-8 left-8 w-16 h-12 bg-slate-600 rounded opacity-60"></div>
            <div className="absolute top-8 left-28 w-20 h-16 bg-slate-600 rounded opacity-60"></div>
            <div className="absolute top-28 left-8 w-24 h-20 bg-slate-600 rounded opacity-60"></div>
            <div className="absolute top-28 left-36 w-16 h-24 bg-slate-600 rounded opacity-60"></div>
            
            {/* Roads */}
            <div className="absolute top-0 left-24 w-1 h-full bg-slate-500 opacity-40"></div>
            <div className="absolute left-0 top-24 w-full h-1 bg-slate-500 opacity-40"></div>
          </div>
          
          {/* Bus icons with animation */}
          <div className="absolute top-16 left-16 text-secondary bus-animation">
            <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-bold shadow-lg">
              🚌 B12
            </div>
          </div>
          
          <div className="absolute top-32 left-40 text-secondary animate-pulse-slow">
            <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-bold shadow-lg">
              🚌 B07
            </div>
          </div>
          
          <div className="absolute top-48 left-24 text-secondary animate-bus-animation" style={{animationDirection: 'reverse'}}>
            <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-bold shadow-lg">
              🚌 B23
            </div>
          </div>
          
          {/* Traffic indicators */}
          <div className="absolute bottom-4 left-4 flex space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="text-white">Smooth</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-white">Moderate</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <span className="text-white">Congested</span>
            </div>
          </div>
          
          {/* Passenger heatmap dots */}
          <div className="absolute top-12 left-32 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-36 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-52 left-44 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
        
        {/* Map Controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            Last updated: <span>2 seconds ago</span>
          </div>
          <Button variant="ghost" size="sm" data-testid="button-fullscreen-map">
            <Expand size={16} className="mr-2" />
            Full Screen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
