import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Expand, Layers, MapPin, Navigation } from "lucide-react";

export default function Map() {
  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">3D City Map</h1>
        <p className="text-muted-foreground">Interactive real-time transport visualization</p>
      </div>

      <div className="grid grid-cols-1 gap-6 h-full">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Transport Map</CardTitle>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" data-testid="button-toggle-3d">
                  <Layers size={16} className="mr-2" />
                  3D View
                </Button>
                <Button size="sm" variant="outline" data-testid="button-center-map">
                  <Navigation size={16} className="mr-2" />
                  Center
                </Button>
                <Button size="sm" variant="outline" data-testid="button-fullscreen">
                  <Expand size={16} className="mr-2" />
                  Fullscreen
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            {/* Full 3D Map */}
            <div className="relative w-full h-96 lg:h-[600px] bg-gradient-to-br from-slate-800 to-slate-700 overflow-hidden map-container">
              {/* Enhanced city layout */}
              <div className="absolute inset-0 opacity-30">
                {/* Buildings */}
                <div className="absolute top-12 left-12 w-20 h-16 bg-slate-600 rounded opacity-80 shadow-lg"></div>
                <div className="absolute top-12 left-36 w-24 h-20 bg-slate-600 rounded opacity-80 shadow-lg"></div>
                <div className="absolute top-40 left-12 w-28 h-24 bg-slate-600 rounded opacity-80 shadow-lg"></div>
                <div className="absolute top-40 left-44 w-20 h-28 bg-slate-600 rounded opacity-80 shadow-lg"></div>
                
                {/* Parks */}
                <div className="absolute top-20 left-68 w-16 h-16 bg-secondary/60 rounded-full opacity-60"></div>
                <div className="absolute bottom-20 right-20 w-20 h-20 bg-secondary/60 rounded-full opacity-60"></div>
                
                {/* Road network */}
                <div className="absolute top-0 left-32 w-2 h-full bg-slate-500 opacity-50"></div>
                <div className="absolute left-0 top-32 w-full h-2 bg-slate-500 opacity-50"></div>
                <div className="absolute top-0 right-32 w-2 h-full bg-slate-500 opacity-50"></div>
                <div className="absolute left-0 bottom-32 w-full h-2 bg-slate-500 opacity-50"></div>
              </div>
              
              {/* Enhanced bus animations */}
              <div className="absolute top-20 left-20 text-secondary bus-animation">
                <div className="bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm font-bold shadow-xl flex items-center space-x-2">
                  <span>🚌</span>
                  <div>
                    <div>B12</div>
                    <div className="text-xs opacity-80">32 km/h</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-40 left-48 text-secondary animate-pulse-slow">
                <div className="bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm font-bold shadow-xl flex items-center space-x-2">
                  <span>🚌</span>
                  <div>
                    <div>B07</div>
                    <div className="text-xs opacity-80">28 km/h</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-60 left-28 text-secondary animate-bus-animation" style={{animationDirection: 'reverse'}}>
                <div className="bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm font-bold shadow-xl flex items-center space-x-2">
                  <span>🚌</span>
                  <div>
                    <div>B23</div>
                    <div className="text-xs opacity-80">35 km/h</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-20 right-40 text-accent">
                <div className="bg-accent text-accent-foreground px-3 py-2 rounded-lg text-sm font-bold shadow-xl flex items-center space-x-2">
                  <span>🚌</span>
                  <div>
                    <div>B15</div>
                    <div className="text-xs opacity-80">Delayed</div>
                  </div>
                </div>
              </div>
              
              {/* Bus stops */}
              <div className="absolute top-16 left-60">
                <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
                  <MapPin size={12} />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/70 px-2 py-1 rounded">
                  Central Station
                </div>
              </div>
              
              <div className="absolute top-48 left-80">
                <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
                  <MapPin size={12} />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/70 px-2 py-1 rounded">
                  Tech Park
                </div>
              </div>
              
              {/* Traffic flow indicators */}
              <div className="absolute bottom-6 left-6 flex space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-secondary rounded-full"></div>
                  <span className="text-white">Smooth Traffic</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-accent rounded-full"></div>
                  <span className="text-white">Moderate Traffic</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-destructive rounded-full"></div>
                  <span className="text-white">Heavy Traffic</span>
                </div>
              </div>
              
              {/* Enhanced passenger heatmap dots */}
              <div className="absolute top-24 left-44 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute top-52 left-32 w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute top-72 left-56 w-2 h-2 bg-blue-300 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute bottom-32 right-28 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg"></div>
              
              {/* Map controls overlay */}
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Traffic Layer</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Bus Routes</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    <span>Passenger Heatmap</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    <span>Incidents</span>
                  </label>
                </div>
              </div>
              
              {/* Live update indicator */}
              <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  <span>Live Updates</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
