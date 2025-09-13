import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Clock, 
  Navigation, 
  Star, 
  Shield, 
  Award, 
  Search,
  QrCode,
  Smartphone,
  Bell
} from "lucide-react";

export default function CommuterMobile() {
  // Mock data for mobile interface
  const nearestStops = [
    {
      id: '1',
      name: 'Central Bus Station',
      distance: '0.2 km',
      nextBuses: [
        { route: '12', destination: 'Tech Park', eta: 4, crowdLevel: 'low' },
        { route: '07', destination: 'University', eta: 8, crowdLevel: 'medium' },
        { route: '23', destination: 'Mall Complex', eta: 12, crowdLevel: 'high' }
      ]
    },
    {
      id: '2',
      name: 'Mall Road Junction',
      distance: '0.5 km',
      nextBuses: [
        { route: '15', destination: 'Hospital', eta: 6, crowdLevel: 'low' },
        { route: '09', destination: 'Airport', eta: 15, crowdLevel: 'medium' }
      ]
    }
  ];

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-secondary';
      case 'medium':
        return 'text-accent';
      case 'high':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getCrowdLevelBadge = (level: string) => {
    switch (level) {
      case 'low':
        return <Badge variant="default" className="bg-secondary">🟢 Low</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-accent text-accent-foreground">🟡 Medium</Badge>;
      case 'high':
        return <Badge variant="destructive">🔴 High</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Mobile Commuter App</h1>
        <p className="text-muted-foreground">Passenger-facing mobile application interface</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main App Interface */}
        <div className="space-y-6">
          {/* Location & Search */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Smartphone className="text-primary" size={18} />
                <CardTitle>Current Location</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Central Business District</p>
                    <p className="text-sm text-muted-foreground">Detected via GPS</p>
                  </div>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search destination..."
                    className="pl-9"
                    data-testid="input-destination-search"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nearest Stops */}
          <Card>
            <CardHeader>
              <CardTitle>Nearest Bus Stops</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nearestStops.map((stop) => (
                  <div key={stop.id} className="p-4 border rounded-lg" data-testid={`stop-${stop.id}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold" data-testid={`text-stop-name-${stop.id}`}>{stop.name}</h4>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Navigation className="h-4 w-4 mr-1" />
                          {stop.distance} away
                        </p>
                      </div>
                      <Button size="sm" variant="outline" data-testid={`button-directions-${stop.id}`}>
                        Get Directions
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {stop.nextBuses.map((bus, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                          <div className="flex items-center space-x-2">
                            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                              {bus.route}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{bus.destination}</p>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{bus.eta} min</span>
                                {getCrowdLevelBadge(bus.crowdLevel)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Live Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Live Bus Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-secondary text-secondary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold">
                        12
                      </div>
                      <div>
                        <p className="font-semibold">Bus 12 → Tech Park</p>
                        <p className="text-sm text-muted-foreground">Your selected route</p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-secondary">Tracking</Badge>
                  </div>
                  
                  {/* Mini Map Placeholder */}
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg h-32 relative overflow-hidden mb-3">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs animate-pulse-slow">
                      🚌
                    </div>
                    <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-secondary/30"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Arriving in 4 minutes</p>
                      <p className="text-xs text-muted-foreground">Speed: 32 km/h</p>
                    </div>
                    <Button size="sm" data-testid="button-set-reminder">
                      <Bell className="h-4 w-4 mr-1" />
                      Set Reminder
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Features & Safety */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-16" data-testid="button-qr-ticket">
                  <div className="flex flex-col items-center space-y-1">
                    <QrCode className="h-5 w-5" />
                    <span className="text-xs">QR Ticket</span>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-16" data-testid="button-route-planner">
                  <div className="flex flex-col items-center space-y-1">
                    <Navigation className="h-5 w-5" />
                    <span className="text-xs">Route Planner</span>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-16" data-testid="button-fare-calculator">
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-lg">💰</span>
                    <span className="text-xs">Fare Calculator</span>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-16" data-testid="button-trip-history">
                  <div className="flex flex-col items-center space-y-1">
                    <Clock className="h-5 w-5" />
                    <span className="text-xs">Trip History</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Safety Features */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="text-destructive" size={18} />
                <CardTitle>Safety Features</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground py-4 text-lg font-semibold" 
                  data-testid="button-emergency-sos"
                >
                  🚨 EMERGENCY SOS
                </Button>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-secondary" />
                      <span className="text-sm">Live Location Sharing</span>
                    </div>
                    <Badge variant="default" className="bg-secondary">ON</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-secondary" />
                      <span className="text-sm">Safe Journey Mode</span>
                    </div>
                    <Badge variant="default" className="bg-secondary">ON</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Emergency Contacts</span>
                    </div>
                    <Badge variant="outline">3 Added</Badge>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-primary mb-1">95%</div>
                  <p className="text-xs text-muted-foreground">Route Safety Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gamification */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Award className="text-accent" size={18} />
                <CardTitle>Eco Rewards</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-1">1,247</div>
                  <p className="text-sm text-muted-foreground">Eco Points Earned</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🏆</span>
                      <span className="text-sm">Daily Streak</span>
                    </div>
                    <Badge variant="default" className="bg-accent text-accent-foreground">7 days</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🌱</span>
                      <span className="text-sm">CO₂ Saved</span>
                    </div>
                    <Badge variant="outline">12.5 kg</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-accent" />
                      <span className="text-sm">Level</span>
                    </div>
                    <Badge variant="default" className="bg-accent text-accent-foreground">Eco Warrior</Badge>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline" data-testid="button-rewards-store">
                  🎁 Rewards Store
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    12
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Central Station → Tech Park</p>
                    <p className="text-xs text-muted-foreground">Today, 9:15 AM • ₹25</p>
                  </div>
                  <Badge variant="outline" className="bg-secondary/10">+50 pts</Badge>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="bg-secondary text-secondary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    07
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Mall Road → University</p>
                    <p className="text-xs text-muted-foreground">Yesterday, 6:30 PM • ₹18</p>
                  </div>
                  <Badge variant="outline" className="bg-accent/10">+35 pts</Badge>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    23
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Airport → City Center</p>
                    <p className="text-xs text-muted-foreground">Jan 12, 2:45 PM • ₹45</p>
                  </div>
                  <Badge variant="outline" className="bg-emerald/10">+75 pts</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
