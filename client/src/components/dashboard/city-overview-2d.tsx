import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/language-context";
import type { Bus } from "@shared/schema";

interface BusMarkerProps {
  bus: Bus;
  onClick?: () => void;
}

function BusMarker({ bus, onClick }: BusMarkerProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'delayed': return 'bg-yellow-500';
      case 'breakdown': return 'bg-red-500';
      case 'maintenance': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🚌';
      case 'delayed': return '⚠️';
      case 'breakdown': return '🔧';
      case 'maintenance': return '🛠️';
      default: return '🚌';
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110"
          style={{
            left: `${((bus.currentLocation.lng - 77.200) / 0.020) * 100}%`,
            top: `${(1 - (bus.currentLocation.lat - 28.600) / 0.025) * 100}%`,
          }}
          onClick={onClick}
          data-testid={`bus-marker-${bus.id}`}
        >
          <div className={`w-6 h-6 rounded-full ${getStatusColor(bus.status)} border-2 border-white shadow-lg flex items-center justify-center animate-pulse`}>
            <span className="text-xs text-white">
              {getStatusIcon(bus.status)}
            </span>
          </div>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <Badge variant="secondary" className="text-xs whitespace-nowrap">
              {bus.routeNumber}
            </Badge>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-1">
          <p className="font-medium">Route {bus.routeNumber}</p>
          <p className="text-sm">Status: {bus.status}</p>
          <p className="text-sm">Speed: {bus.speed} km/h</p>
          <p className="text-sm">Passengers: {bus.passengerCount}/{bus.capacity}</p>
          <p className="text-sm">Location: {bus.currentLocation.lat.toFixed(4)}, {bus.currentLocation.lng.toFixed(4)}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export function CityOverview2D() {
  const { t } = useLanguage();
  
  const { data: buses = [], isLoading } = useQuery<Bus[]>({
    queryKey: ['/api/buses'],
  });

  const handleBusClick = (bus: Bus) => {
    console.log('Bus clicked:', bus);
    // In a real app, this could open a bus details modal or navigate to bus details
  };

  if (isLoading) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>{t('live_map')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-muted rounded-lg">
            <div className="animate-pulse text-muted-foreground">
              {t('loading')}...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-2" data-testid="city-overview-2d">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t('live_map')}</span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-muted-foreground">{t('active')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs text-muted-foreground">{t('delayed')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-muted-foreground">{t('breakdown')}</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-lg overflow-hidden border border-border">
          {/* Static Map Background */}
          <div className="absolute inset-0">
            {/* Grid pattern to simulate streets */}
            <svg className="w-full h-full opacity-30" viewBox="0 0 400 300">
              {/* Horizontal streets */}
              <line x1="0" y1="60" x2="400" y2="60" stroke="#94a3b8" strokeWidth="2" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="#94a3b8" strokeWidth="3" />
              <line x1="0" y1="180" x2="400" y2="180" stroke="#94a3b8" strokeWidth="2" />
              <line x1="0" y1="240" x2="400" y2="240" stroke="#94a3b8" strokeWidth="2" />
              
              {/* Vertical streets */}
              <line x1="80" y1="0" x2="80" y2="300" stroke="#94a3b8" strokeWidth="2" />
              <line x1="160" y1="0" x2="160" y2="300" stroke="#94a3b8" strokeWidth="3" />
              <line x1="240" y1="0" x2="240" y2="300" stroke="#94a3b8" strokeWidth="2" />
              <line x1="320" y1="0" x2="320" y2="300" stroke="#94a3b8" strokeWidth="2" />
              
              {/* Key locations */}
              <circle cx="160" cy="60" r="8" fill="#3b82f6" opacity="0.7" />
              <text x="170" y="65" fill="#1e293b" fontSize="10">Central Station</text>
              
              <circle cx="240" cy="120" r="6" fill="#10b981" opacity="0.7" />
              <text x="250" y="125" fill="#1e293b" fontSize="10">Mall Road</text>
              
              <circle cx="320" cy="180" r="6" fill="#f59e0b" opacity="0.7" />
              <text x="330" y="185" fill="#1e293b" fontSize="10">University</text>
              
              <circle cx="80" cy="240" r="6" fill="#8b5cf6" opacity="0.7" />
              <text x="90" y="245" fill="#1e293b" fontSize="10">Tech Park</text>
              
              <circle cx="40" cy="60" r="5" fill="#ef4444" opacity="0.7" />
              <text x="50" y="65" fill="#1e293b" fontSize="10">Airport</text>
            </svg>
            
            {/* Landmarks */}
            <div className="absolute top-4 left-4 text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">
              📍 City Transport Hub
            </div>
            
            <div className="absolute bottom-4 right-4 text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">
              🗺️ Live View
            </div>
          </div>
          
          {/* Bus Markers */}
          {buses.map((bus) => (
            <BusMarker
              key={bus.id}
              bus={bus}
              onClick={() => handleBusClick(bus)}
            />
          ))}
          
          {/* Active Routes Overlay */}
          <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 400 300">
            {/* Route 12 path - highlighted */}
            <path
              d="M160,60 L200,100 L280,140 L80,240"
              stroke="#3b82f6"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              opacity="0.6"
            />
            
            {/* Route 25 path */}
            <path
              d="M40,60 L160,120 L240,180 L320,240"
              stroke="#10b981"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              opacity="0.6"
            />
          </svg>
        </div>
        
        {/* Map Stats */}
        <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex space-x-4">
            <span>📍 {buses.length} buses tracked</span>
            <span>🚌 {buses.filter(bus => bus.status === 'active').length} active</span>
            <span>⚠️ {buses.filter(bus => bus.status === 'delayed').length} delayed</span>
            <span>🔧 {buses.filter(bus => bus.status === 'breakdown').length} breakdown</span>
          </div>
          <div className="text-xs">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}