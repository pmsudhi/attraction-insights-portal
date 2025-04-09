import { useState } from 'react';
import { TimeRange, ChartDataPoint, RevenueCategory, PropertyPerformance, BreakEvenData } from '../types';

export const useDashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  // Mock data - in a real app, this would come from an API
  const attendanceData: ChartDataPoint[] = [
    { month: "Jan", attendance: 100000, revenue: 7500000 },
    { month: "Feb", attendance: 120000, revenue: 9000000 },
    { month: "Mar", attendance: 150000, revenue: 11250000 },
    { month: "Apr", attendance: 180000, revenue: 13500000 },
    { month: "May", attendance: 200000, revenue: 15000000 },
    { month: "Jun", attendance: 220000, revenue: 16500000 }
  ];

  const revenueCategories: RevenueCategory[] = [
    { category: "Attractions", revenue: 40 },
    { category: "Food & Beverage", revenue: 30 },
    { category: "Merchandise", revenue: 20 },
    { category: "Other", revenue: 10 }
  ];

  const breakEvenData: BreakEvenData[] = [
    { date: "2024-03-20", attendance: 8500, breakEvenThreshold: 8245 },
    { date: "2024-03-21", attendance: 8100, breakEvenThreshold: 8245 },
    { date: "2024-03-22", attendance: 8300, breakEvenThreshold: 8245 },
    { date: "2024-03-23", attendance: 8700, breakEvenThreshold: 8245 },
    { date: "2024-03-24", attendance: 8900, breakEvenThreshold: 8245 },
    { date: "2024-03-25", attendance: 8400, breakEvenThreshold: 8245 },
    { date: "2024-03-26", attendance: 8200, breakEvenThreshold: 8245 }
  ];

  const propertyPerformance: PropertyPerformance[] = [
    {
      id: '1',
      name: 'Adventure Park',
      location: 'Orlando, FL',
      attendance: 12458,
      attendanceChange: 8.2,
      revenue: 984250,
      revenueChange: 10.5,
      perCapita: 78.92,
      yoyChange: 12.3,
      status: 'operational'
    }
    // Add more properties as needed
  ];

  return {
    timeRange,
    setTimeRange,
    attendanceData,
    revenueCategories,
    propertyPerformance,
    breakEvenData
  };
}; 