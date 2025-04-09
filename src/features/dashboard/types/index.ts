export interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  trend: 'up' | 'down';
  trendColor: 'green' | 'red';
  icon: React.ReactNode;
}

export interface PropertyPerformance {
  id: string;
  name: string;
  location: string;
  attendance: number;
  attendanceChange: number;
  revenue: number;
  revenueChange: number;
  perCapita: number;
  yoyChange: number;
  status: 'operational' | 'maintenance' | 'closed';
}

export type TimeRange = '7d' | '30d' | '90d';

export interface ChartDataPoint {
  month: string;
  attendance: number;
  revenue: number;
  [key: string]: string | number;
}

export interface RevenueCategory {
  category: string;
  revenue: number;
  [key: string]: string | number;
}

export interface BreakEvenData {
  date: string;
  attendance: number;
  breakEvenThreshold: number;
  [key: string]: string | number;
} 