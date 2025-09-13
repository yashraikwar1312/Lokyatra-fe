import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Mock data for the chart - in real app this would come from API
const punctualityData = [
  { day: 'Mon', punctuality: 89 },
  { day: 'Tue', punctuality: 92 },
  { day: 'Wed', punctuality: 95 },
  { day: 'Thu', punctuality: 88 },
  { day: 'Fri', punctuality: 94 },
  { day: 'Sat', punctuality: 96 },
  { day: 'Sun', punctuality: 93 },
];

export function PunctualityChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Punctuality Trends</CardTitle>
          <select className="text-sm border border-border rounded px-3 py-1 bg-background">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48">
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
              <Line 
                type="monotone" 
                dataKey="punctuality" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
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
            Average: <span className="text-secondary">92.5%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
