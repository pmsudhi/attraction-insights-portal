declare module "@/components/ui/charts" {
  export interface ChartData {
    [key: string]: string | number
  }
  
  export interface BarChartProps {
    data: ChartData[]
    xField: string
    yFields: string[]
    colors?: string[]
    labels?: string[]
  }
  
  export function BarChart(props: BarChartProps): JSX.Element
  export function LineChart(props: BarChartProps): JSX.Element
}

declare module "@/utils/formatters" {
  export function formatCurrency(value: number): string
  export function formatNumber(value: number): string
  export function formatPercent(value: number): string
  export function formatDate(date: Date): string
  export function formatDateTime(date: Date): string
  export function formatRelativeTime(date: Date): string
  export function truncateText(text: string, maxLength: number): string
}

declare module "@/utils/seasonal-data" {
  import { PropertySeasonalData, SeasonalOptimizationStrategy } from "@/types"
  export const seasonalData: Record<string, PropertySeasonalData>
  export const seasonalOptimizationStrategies: SeasonalOptimizationStrategy[]
}

declare module "@/types" {
  export interface MonthlyData {
    month: string
    attendance: number
    revenue: number
    operatingDays: number
    peakDays: number
  }

  export interface SeasonalData {
    season: string
    attendance: number
    revenue: number
    operatingDays: number
    peakDays: number
  }

  export interface PeakPeriod {
    name: string
    startDate: string
    endDate: string
    expectedAttendance: number
  }

  export interface OperatingHours {
    month: string
    weekday: string
    weekend: string
  }

  export interface PropertySeasonalData {
    monthly: MonthlyData[]
    seasonal: SeasonalData[]
    peakPeriods: PeakPeriod[]
    operatingHours: OperatingHours[]
  }

  export interface SeasonalOptimizationStrategy {
    id: string
    name: string
    description: string
    cost: number
    effectiveness: number
    implementationTime: string
    seasonalApplicability: string[]
  }

  export interface ChartData {
    [key: string]: string | number
  }
}

// Add Vite environment variable types
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // Add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 