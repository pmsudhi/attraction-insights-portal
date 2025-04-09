
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/ui/charts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, DownloadCloud, TrendingUp, Users } from "lucide-react";

interface SeasonalMetric {
  month: string;
  attendance: number;
  revenue: number;
  staffing: number;
}

const seasonalData: SeasonalMetric[] = [
  { month: "Jan", attendance: 42000, revenue: 980000, staffing: 450 },
  { month: "Feb", attendance: 45000, revenue: 1050000, staffing: 460 },
  { month: "Mar", attendance: 58000, revenue: 1250000, staffing: 520 },
  { month: "Apr", attendance: 72000, revenue: 1680000, staffing: 650 },
  { month: "May", attendance: 85000, revenue: 2100000, staffing: 780 },
  { month: "Jun", attendance: 110000, revenue: 2850000, staffing: 920 },
  { month: "Jul", attendance: 135000, revenue: 3680000, staffing: 1200 },
  { month: "Aug", attendance: 125000, revenue: 3420000, staffing: 1150 },
  { month: "Sep", attendance: 92000, revenue: 2350000, staffing: 850 },
  { month: "Oct", attendance: 78000, revenue: 1980000, staffing: 720 },
  { month: "Nov", attendance: 56000, revenue: 1280000, staffing: 540 },
  { month: "Dec", attendance: 68000, revenue: 1680000, staffing: 580 },
];

const parkTypes = [
  { id: "all", name: "All Parks" },
  { id: "theme", name: "Theme Parks" },
  { id: "water", name: "Water Parks" },
];

const years = ["2023", "2024", "2025 (Projected)"];

const SeasonalOptimization: React.FC = () => {
  return (
    <Card className="shadow-sm border border-gray-200 animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">Seasonal Optimization</CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              Analyze and optimize resources based on seasonal patterns
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs flex items-center gap-1 bg-white">
              <Calendar className="h-3.5 w-3.5" />
              2025
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
              {parkTypes.map((type) => (
                <TabsTrigger key={type.id} value={type.id} className="text-xs">
                  {type.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="font-medium text-foreground flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-brand-500" /> 
              8.4% YoY Growth
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="attendance">
          <TabsList className="mb-6">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="staffing">Staffing</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="mt-0">
            <div className="h-[350px]">
              <LineChart 
                data={seasonalData}
                xField="month"
                yFields={["attendance"]}
              />
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Peak Season</div>
                <div className="text-xl font-semibold mt-1 flex items-center gap-2">
                  <Users className="h-5 w-5 text-brand-500" />
                  June - August
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Avg. Daily Peak</div>
                <div className="text-xl font-semibold mt-1">4,350 visitors</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Recommended Capacity</div>
                <div className="text-xl font-semibold mt-1">5,200 visitors</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="mt-0">
            <div className="h-[350px]">
              <BarChart 
                data={seasonalData}
                xField="month"
                yFields={["revenue"]}
              />
            </div>
          </TabsContent>

          <TabsContent value="staffing" className="mt-0">
            <div className="h-[350px]">
              <LineChart 
                data={seasonalData}
                xField="month"
                yFields={["staffing"]}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SeasonalOptimization;
