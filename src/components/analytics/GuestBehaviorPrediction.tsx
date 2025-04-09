
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, PieChart } from "@/components/ui/charts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  DownloadCloud, 
  UserCheck, 
  Utensils, 
  ShoppingBag, 
  Map, 
  Clock,
  TrendingUp
} from "lucide-react";

interface GuestMetric {
  hour: string;
  dining: number;
  shopping: number;
  attractions: number;
}

const hourlyData: GuestMetric[] = [
  { hour: "9am", dining: 120, shopping: 85, attractions: 450 },
  { hour: "10am", dining: 150, shopping: 120, attractions: 890 },
  { hour: "11am", dining: 310, shopping: 165, attractions: 1200 },
  { hour: "12pm", dining: 580, shopping: 210, attractions: 980 },
  { hour: "1pm", dining: 750, shopping: 245, attractions: 850 },
  { hour: "2pm", dining: 480, shopping: 280, attractions: 1050 },
  { hour: "3pm", dining: 320, shopping: 340, attractions: 1150 },
  { hour: "4pm", dining: 390, shopping: 410, attractions: 950 },
  { hour: "5pm", dining: 580, shopping: 390, attractions: 780 },
  { hour: "6pm", dining: 690, shopping: 320, attractions: 680 },
  { hour: "7pm", dining: 520, shopping: 280, attractions: 750 },
  { hour: "8pm", dining: 380, shopping: 210, attractions: 620 },
];

const segmentationData = [
  { name: 'Families', value: 42, color: 'hsl(var(--chart-1))' },
  { name: 'Couples', value: 28, color: 'hsl(var(--chart-2))' },
  { name: 'Solo Visitors', value: 15, color: 'hsl(var(--chart-3))' },
  { name: 'Groups', value: 15, color: 'hsl(var(--chart-4))' },
];

const guestTypes = [
  { id: "all", name: "All Guests" },
  { id: "firsttime", name: "First-time" },
  { id: "returning", name: "Returning" },
];

const GuestBehaviorPrediction: React.FC = () => {
  return (
    <Card className="shadow-sm border border-gray-200 animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">Guest Behavior Prediction</CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              AI-driven analysis of guest movement patterns and preferences
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs flex items-center gap-1 bg-white">
              <Calendar className="h-3.5 w-3.5" />
              Today
            </Button>
            <Button variant="outline" size="sm" className="text-xs flex items-center gap-1 bg-white">
              <DownloadCloud className="h-3.5 w-3.5" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
          <Tabs defaultValue="all" className="w-full max-w-xs">
            <TabsList className="grid grid-cols-3 mb-2">
              {guestTypes.map((type) => (
                <TabsTrigger key={type.id} value={type.id} className="text-xs">
                  {type.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground flex items-center gap-1">
              <UserCheck className="h-4 w-4 text-brand-500" /> 
              12,453 Guests Today
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Tabs defaultValue="hourly">
              <TabsList className="mb-6">
                <TabsTrigger value="hourly">Hourly Activity</TabsTrigger>
                <TabsTrigger value="heatmap">Density Map</TabsTrigger>
              </TabsList>

              <TabsContent value="hourly" className="mt-0">
                <div className="h-[300px]">
                  <LineChart 
                    data={hourlyData}
                    xField="hour"
                    yFields={["dining", "shopping", "attractions"]}
                  />
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="text-sm font-medium mt-1">Peak Time</div>
                    <div className="text-sm text-gray-600">11am - 2pm</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary-100 p-2 rounded-full">
                      <Map className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="text-sm font-medium mt-1">Hotspot</div>
                    <div className="text-sm text-gray-600">Adventure Land</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary-100 p-2 rounded-full">
                      <TrendingUp className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="text-sm font-medium mt-1">Trend</div>
                    <div className="text-sm text-gray-600">+12% Activity</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="heatmap" className="mt-0">
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-lg">
                  <p className="text-gray-500">Interactive heat map coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <h3 className="text-base font-medium mb-4">Guest Segmentation</h3>
            <div className="h-[250px]">
              <PieChart data={segmentationData} />
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                <Utensils className="h-6 w-6 text-brand-500 mb-1" />
                <div className="text-xs text-gray-500">Dining Preference</div>
                <div className="text-sm font-semibold mt-1">Quick Service</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                <ShoppingBag className="h-6 w-6 text-brand-500 mb-1" />
                <div className="text-xs text-gray-500">Shopping Trend</div>
                <div className="text-sm font-semibold mt-1">Souvenirs</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                <Map className="h-6 w-6 text-brand-500 mb-1" />
                <div className="text-xs text-gray-500">Most Visited</div>
                <div className="text-sm font-semibold mt-1">Main Street</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestBehaviorPrediction;
