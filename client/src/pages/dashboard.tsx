import { KpiCards } from "@/components/dashboard/kpi-cards";
import { CityOverview2D } from "@/components/dashboard/city-overview-2d";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";
import { AiRecommendationsWidget } from "@/components/dashboard/ai-recommendations";
import { PunctualityChart } from "@/components/dashboard/punctuality-chart";
import { RouteUsageChart } from "@/components/dashboard/route-usage-chart";
import { MobilePreview } from "@/components/dashboard/mobile-preview";

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* KPI Cards Section */}
      <KpiCards />
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <CityOverview2D />
        
        {/* Right Column Widgets */}
        <div className="space-y-6">
          <RecentAlerts />
          <AiRecommendationsWidget />
        </div>
      </div>
      
      {/* Bottom Section - Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PunctualityChart />
        <RouteUsageChart />
      </div>
      
      {/* Mobile-Optimized Commuter Preview */}
      <MobilePreview />
    </div>
  );
}
