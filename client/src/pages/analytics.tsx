import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  Download, 
  BarChart3, 
  Leaf, 
  Users, 
  Clock,
  Filter
} from "lucide-react";

export default function Analytics() {
  // Mock data - in real app this would come from APIs
  const punctualityData = [
    { day: 'Mon', punctuality: 89, passengers: 12500 },
    { day: 'Tue', punctuality: 92, passengers: 13200 },
    { day: 'Wed', punctuality: 95, passengers: 14100 },
    { day: 'Thu', punctuality: 88, passengers: 13800 },
    { day: 'Fri', punctuality: 94, passengers: 15600 },
    { day: 'Sat', punctuality: 96, passengers: 11200 },
    { day: 'Sun', punctuality: 93, passengers: 9800 },
  ];

  const routeUsageData = [
    { route: 'Route 12', passengers: 2456, efficiency: 92 },
    { route: 'Route 07', passengers: 2123, efficiency: 88 },
    { route: 'Route 23', passengers: 1987, efficiency: 85 },
    { route: 'Route 15', passengers: 1654, efficiency: 91 },
    { route: 'Route 09', passengers: 1432, efficiency: 86 },
    { route: 'Route 18', passengers: 1289, efficiency: 89 },
  ];

  const alertCategoryData = [
    { name: 'Traffic Delays', value: 45, color: '#f59e0b' },
    { name: 'Vehicle Breakdown', value: 25, color: '#ef4444' },
    { name: 'Route Diversion', value: 20, color: '#3b82f6' },
    { name: 'Weather Issues', value: 10, color: '#10b981' },
  ];

  const sustainabilityData = [
    { month: 'Jan', co2Saved: 18.5, fuelSaved: 2100 },
    { month: 'Feb', co2Saved: 22.3, fuelSaved: 2450 },
    { month: 'Mar', co2Saved: 25.1, fuelSaved: 2800 },
    { month: 'Apr', co2Saved: 28.7, fuelSaved: 3200 },
    { month: 'May', co2Saved: 31.2, fuelSaved: 3650 },
    { month: 'Jun', co2Saved: 35.8, fuelSaved: 4100 },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
        <p className="text-muted-foreground">Comprehensive transport system analytics and insights</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">Daily Passengers</p>
                <p className="text-2xl font-bold" data-testid="text-daily-passengers">89,420</p>
                <p className="text-xs text-primary-foreground/70">+12% vs yesterday</p>
              </div>
              <Users className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-foreground/80 text-sm">Avg Trip Time</p>
                <p className="text-2xl font-bold" data-testid="text-avg-trip-time">24.5</p>
                <p className="text-xs text-secondary-foreground/70">minutes</p>
              </div>
              <Clock className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent-foreground/80 text-sm">Revenue Today</p>
                <p className="text-2xl font-bold" data-testid="text-revenue-today">₹4.2L</p>
                <p className="text-xs text-accent-foreground/70">+8% vs avg</p>
              </div>
              <TrendingUp className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">CO₂ Saved</p>
                <p className="text-2xl font-bold" data-testid="text-co2-saved">35.8</p>
                <p className="text-xs text-white/70">tons this month</p>
              </div>
              <Leaf className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Punctuality Trends */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Daily Punctuality Trends</CardTitle>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" data-testid="button-filter-punctuality">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm" variant="outline" data-testid="button-export-punctuality">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={punctualityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="punctuality" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    name="Punctuality %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">On-time performance</span>
                </div>
              </div>
              <div className="text-foreground font-medium">
                Weekly Avg: <span className="text-secondary">92.4%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Usage */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Passenger Usage by Route</CardTitle>
              <Button size="sm" variant="outline" data-testid="button-view-all-routes-analytics">
                View Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={routeUsageData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    type="category"
                    dataKey="route" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar 
                    dataKey="passengers" 
                    fill="hsl(var(--secondary))"
                    name="Daily Passengers"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Alert Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Categories Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={alertCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {alertCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {alertCategoryData.map((category) => (
                <div key={category.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <div>
                    <p className="text-sm font-medium">{category.name}</p>
                    <p className="text-xs text-muted-foreground">{category.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sustainability Metrics */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Leaf className="text-emerald-500" size={20} />
              <CardTitle>Sustainability Impact</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sustainabilityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="co2Saved" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    name="CO₂ Saved (tons)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Month</span>
                <Badge className="bg-emerald text-emerald-foreground">35.8 tons CO₂</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Equivalent Cars Off Road</span>
                <Badge variant="outline">78 cars/day</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Fuel Saved</span>
                <Badge variant="outline">4,100 liters</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Efficiency Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>System Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Fleet Utilization</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Route Efficiency</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Fuel Efficiency</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Passenger Satisfaction</span>
                  <span className="text-sm font-medium">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Operational Cost/Day</span>
                <span className="text-sm font-medium">₹2.8L</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Revenue/Day</span>
                <span className="text-sm font-medium text-secondary">₹4.2L</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Profit Margin</span>
                <Badge variant="default" className="bg-secondary">33.3%</Badge>
              </div>
              
              <hr className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Fuel Cost</span>
                  <span className="text-sm">₹1.2L</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Maintenance</span>
                  <span className="text-sm">₹0.8L</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Staff Salary</span>
                  <span className="text-sm">₹0.6L</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Other</span>
                  <span className="text-sm">₹0.2L</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" variant="outline" data-testid="button-daily-report">
                <Calendar className="h-4 w-4 mr-2" />
                Daily Operations Report
              </Button>
              
              <Button className="w-full" variant="outline" data-testid="button-weekly-report">
                <BarChart3 className="h-4 w-4 mr-2" />
                Weekly Performance Report
              </Button>
              
              <Button className="w-full" variant="outline" data-testid="button-monthly-report">
                <TrendingUp className="h-4 w-4 mr-2" />
                Monthly Analytics Report
              </Button>
              
              <Button className="w-full" variant="outline" data-testid="button-sustainability-report">
                <Leaf className="h-4 w-4 mr-2" />
                Sustainability Report
              </Button>
              
              <hr className="my-4" />
              
              <Button className="w-full" data-testid="button-custom-report">
                <Download className="h-4 w-4 mr-2" />
                Custom Report Builder
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
