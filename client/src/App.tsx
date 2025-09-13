import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/layout";
import { useRealtimeData } from "@/hooks/use-realtime-data";
import { ThemeProvider } from "@/contexts/theme-context";
import { LanguageProvider } from "@/contexts/language-context";

// Pages
import Dashboard from "@/pages/dashboard";
import Map from "@/pages/map";
import BusControl from "@/pages/bus-control";
import PassengerHeatmap from "@/pages/passenger-heatmap";
import AlertsSafety from "@/pages/alerts-safety";
import AiRecommendations from "@/pages/ai-recommendations";
import Analytics from "@/pages/analytics";
import Maintenance from "@/pages/maintenance";
import CommuterMobile from "@/pages/commuter-mobile";
import NotFound from "@/pages/not-found";

function AppContent() {
  useRealtimeData(); // Initialize real-time data connections

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/map" component={Map} />
        <Route path="/bus-control" component={BusControl} />
        <Route path="/passenger-heatmap" component={PassengerHeatmap} />
        <Route path="/alerts-safety" component={AlertsSafety} />
        <Route path="/ai-recommendations" component={AiRecommendations} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/maintenance" component={Maintenance} />
        <Route path="/commuter-mobile" component={CommuterMobile} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider defaultLanguage="en">
          <TooltipProvider>
            <Toaster />
            <AppContent />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
