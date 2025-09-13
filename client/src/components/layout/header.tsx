import { Search, Bell, Menu, LogOut, Moon, Sun, Monitor, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/contexts/theme-context";
import { useLanguage } from "@/contexts/language-context";
import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Bus, Route, Alert, AiRecommendation } from "@shared/schema";

interface SearchResult {
  id: string;
  type: 'bus' | 'route' | 'alert' | 'recommendation';
  title: string;
  description: string;
  status?: string;
}

export function Header() {
  const { theme, setTheme, isDark } = useTheme();
  const { t, currentLanguageInfo, supportedLanguages, setLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Fetch all data for search
  const { data: buses = [] } = useQuery<Bus[]>({ queryKey: ['/api/buses'] });
  const { data: routes = [] } = useQuery<Route[]>({ queryKey: ['/api/routes'] });
  const { data: alerts = [] } = useQuery<Alert[]>({ queryKey: ['/api/alerts'] });
  const { data: recommendations = [] } = useQuery<AiRecommendation[]>({ queryKey: ['/api/ai-recommendations'] });

  // Real-time search across all data
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    // Search buses
    buses.forEach(bus => {
      const title = `Bus Route ${bus.routeNumber}`;
      const description = `${bus.status}, ${bus.passengerCount}/${bus.capacity} passengers`;
      if (title.toLowerCase().includes(query) || description.toLowerCase().includes(query) || bus.routeNumber.toLowerCase().includes(query)) {
        results.push({
          id: bus.id,
          type: 'bus',
          title,
          description,
          status: bus.status
        });
      }
    });

    // Search routes
    routes.forEach(route => {
      const title = `Route ${route.number} - ${route.name}`;
      const description = `${route.source} → ${route.destination}`;
      if (title.toLowerCase().includes(query) || description.toLowerCase().includes(query) || route.number.toLowerCase().includes(query)) {
        results.push({
          id: route.id,
          type: 'route',
          title,
          description,
          status: route.isActive ? 'active' : 'inactive'
        });
      }
    });

    // Search alerts
    alerts.forEach(alert => {
      if (alert.title.toLowerCase().includes(query) || alert.description.toLowerCase().includes(query)) {
        results.push({
          id: alert.id,
          type: 'alert',
          title: alert.title,
          description: alert.description,
          status: alert.type
        });
      }
    });

    // Search recommendations
    recommendations.forEach(rec => {
      if (rec.title.toLowerCase().includes(query) || rec.description.toLowerCase().includes(query)) {
        results.push({
          id: rec.id,
          type: 'recommendation',
          title: rec.title,
          description: rec.description,
          status: rec.status
        });
      }
    });

    return results.slice(0, 10); // Limit to 10 results
  }, [searchQuery, buses, routes, alerts, recommendations]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowResults(query.trim().length > 0 && searchResults.length > 0);
  };

  const handleLogout = () => {
    // Mock logout functionality
    console.log('Logout clicked');
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'bus': return '🚌';
      case 'route': return '🗺️';
      case 'alert': return '⚠️';
      case 'recommendation': return '🤖';
      default: return '📍';
    }
  };

  return (
    <header className="bg-card dark:bg-card border-b border-border dark:border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground dark:text-foreground">
            {t('dashboard_overview')}
          </h2>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
            {t('transport_monitoring')}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-muted-foreground" />
            <Input 
              type="search" 
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-64 pl-10 bg-background dark:bg-background text-foreground dark:text-foreground border-input dark:border-input"
              data-testid="search-input"
              onFocus={() => setShowResults(searchQuery.trim().length > 0 && searchResults.length > 0)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
            
            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover dark:bg-popover border border-border dark:border-border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                <div className="p-2">
                  <p className="text-xs font-medium text-muted-foreground dark:text-muted-foreground mb-2">
                    {t('search_results')}
                  </p>
                  {searchResults.length === 0 && searchQuery.trim() && (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      {t('no_results')}
                    </div>
                  )}
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-start space-x-3 p-2 hover:bg-accent dark:hover:bg-accent rounded-sm cursor-pointer"
                      data-testid={`search-result-${result.id}`}
                    >
                      <span className="text-sm mt-0.5">{getResultIcon(result.type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground dark:text-foreground truncate">
                          {result.title}
                        </p>
                        <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                          {result.description}
                        </p>
                        {result.status && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            {result.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative"
            data-testid="button-notifications"
          >
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
              5
            </span>
          </Button>
          
          {/* User Badge & Hamburger Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center space-x-3 px-3 py-2 h-auto"
                data-testid="button-user-menu"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User size={16} />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-foreground dark:text-foreground">
                    {t('bus_controller')}
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                    {t('transport_authority')}
                  </p>
                </div>
                <Menu size={16} className="text-muted-foreground dark:text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{t('bus_controller')}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {t('transport_authority')}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* Theme Toggle */}
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                {t('dark_mode')}
              </DropdownMenuLabel>
              <DropdownMenuItem 
                onClick={() => setTheme('light')}
                className="flex items-center justify-between"
                data-testid="theme-light"
              >
                <div className="flex items-center space-x-2">
                  <Sun size={16} />
                  <span>Light</span>
                </div>
                {theme === 'light' && <Check size={16} />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('dark')}
                className="flex items-center justify-between"
                data-testid="theme-dark"
              >
                <div className="flex items-center space-x-2">
                  <Moon size={16} />
                  <span>Dark</span>
                </div>
                {theme === 'dark' && <Check size={16} />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('system')}
                className="flex items-center justify-between"
                data-testid="theme-system"
              >
                <div className="flex items-center space-x-2">
                  <Monitor size={16} />
                  <span>System</span>
                </div>
                {theme === 'system' && <Check size={16} />}
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              {/* Language Toggle */}
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                {t('language')}
              </DropdownMenuLabel>
              {supportedLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className="flex items-center justify-between"
                  data-testid={`language-${lang.code}`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </div>
                  {currentLanguageInfo.code === lang.code && <Check size={16} />}
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-destructive focus:text-destructive"
                data-testid="button-logout"
              >
                <LogOut size={16} className="mr-2" />
                {t('logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
