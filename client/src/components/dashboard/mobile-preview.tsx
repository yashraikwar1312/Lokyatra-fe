import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, MapPin, Award, Shield } from "lucide-react";

const mobileScreens = [
  {
    title: "Home Screen",
    color: "bg-primary",
    content: (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MapPin size={16} className="text-primary" />
          <span className="text-sm text-foreground">Central Bus Station</span>
        </div>
        
        <div className="bg-secondary/10 p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-foreground">Bus 12 → Tech Park</p>
              <p className="text-xs text-muted-foreground">Arriving in</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-secondary">4 min</p>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/50 p-3 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Alternative</p>
          <p className="text-sm text-foreground">Bus 07 → Mall Road → Tech Park</p>
          <p className="text-xs text-muted-foreground">+3 min via alternate route</p>
        </div>
        
        <Button 
          className="w-full bg-destructive text-destructive-foreground" 
          size="sm"
          data-testid="button-emergency-sos"
        >
          🚨 Emergency SOS
        </Button>
        
        <div className="bg-accent/10 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Daily Streak</p>
              <p className="text-sm font-semibold text-foreground">🏆 7 days</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Eco Points</p>
              <p className="text-sm font-bold text-accent">+50</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Live Tracking",
    color: "bg-secondary",
    content: (
      <div className="space-y-4">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg h-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs animate-pulse-slow">
            🚌
          </div>
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-secondary/30"></div>
        </div>
        
        <div className="bg-secondary/10 p-3 rounded-lg">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Bus 12</span>
            <span className="text-sm text-secondary font-bold">2 min away</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Speed: 35 km/h</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span className="text-sm text-foreground">Current Stop: Mall Road</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
            <span className="text-sm text-muted-foreground">Next: University Gate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
            <span className="text-sm text-muted-foreground">Your Stop: Tech Park</span>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Crowd Levels",
    color: "bg-accent",
    content: (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground mb-1">🟢 Low</div>
          <p className="text-sm text-muted-foreground">Current bus occupancy</p>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Upcoming Stops</h4>
          
          <div className="flex items-center justify-between p-2 bg-secondary/10 rounded">
            <span className="text-sm">University Gate</span>
            <div className="flex items-center space-x-1">
              <span className="text-xs">🟡</span>
              <span className="text-xs text-muted-foreground">Medium</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-destructive/10 rounded">
            <span className="text-sm">Tech Park</span>
            <div className="flex items-center space-x-1">
              <span className="text-xs">🔴</span>
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-secondary/10 rounded">
            <span className="text-sm">Mall Complex</span>
            <div className="flex items-center space-x-1">
              <span className="text-xs">🟢</span>
              <span className="text-xs text-muted-foreground">Low</span>
            </div>
          </div>
        </div>
        
        <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
          <p className="text-xs text-primary font-medium">💡 Tip</p>
          <p className="text-xs text-muted-foreground mt-1">Consider Bus 07 for less crowded journey to Tech Park</p>
        </div>
      </div>
    )
  },
  {
    title: "Safety Hub",
    color: "bg-destructive",
    content: (
      <div className="space-y-4">
        <Button 
          className="w-full bg-destructive text-destructive-foreground font-bold text-lg py-4" 
          data-testid="button-emergency-sos-mobile"
        >
          🚨 EMERGENCY SOS
        </Button>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-secondary/10 rounded">
            <div className="flex items-center space-x-2">
              <Shield size={16} className="text-secondary" />
              <span className="text-sm">Live Location</span>
            </div>
            <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">ON</span>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-secondary/10 rounded">
            <div className="flex items-center space-x-2">
              <Smartphone size={16} className="text-secondary" />
              <span className="text-sm">Emergency Contacts</span>
            </div>
            <span className="text-xs text-muted-foreground">3</span>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-secondary/10 rounded">
            <div className="flex items-center space-x-2">
              <Award size={16} className="text-secondary" />
              <span className="text-sm">Safe Journey Mode</span>
            </div>
            <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">ON</span>
          </div>
        </div>
        
        <div className="bg-secondary/10 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-secondary mb-1">95%</div>
          <p className="text-xs text-muted-foreground">Route Safety Score</p>
        </div>
        
        <div className="bg-accent/10 p-2 rounded text-center">
          <p className="text-xs text-accent-foreground">
            💡 Well-lit stops with CCTV coverage
          </p>
        </div>
      </div>
    )
  },
];

export function MobilePreview() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Mobile Commuter Interface</CardTitle>
            <p className="text-sm text-muted-foreground">Preview of passenger-facing mobile app</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            <span className="text-xs text-secondary font-medium">Live Preview</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mobileScreens.map((screen, index) => (
            <div 
              key={index}
              className="bg-background border border-border rounded-2xl p-4 shadow-lg max-w-sm mx-auto"
              data-testid={`mobile-screen-${screen.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className={`${screen.color} text-white text-center py-2 rounded-t-xl -m-4 mb-4`}>
                <span className="text-sm font-medium">{screen.title}</span>
              </div>
              
              {screen.content}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
