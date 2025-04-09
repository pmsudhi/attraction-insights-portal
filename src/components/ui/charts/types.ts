import { ChartData } from 'chart.js';

export type SimpleDataFormat = Array<{
  label: string;
  value: number;
}>;

export type ComplexDataFormat = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    color?: string;
  }>;
};

export type LegacyDataFormat = Array<{
  [key: string]: string | number;
}>;

export type ChartDataFormat = ChartData | SimpleDataFormat | ComplexDataFormat | LegacyDataFormat;

export interface BaseChartProps {
  data: ChartDataFormat;
  title?: string;
  className?: string;
  height?: number | string;
  width?: number | string;
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
}

export interface CartesianChartProps extends BaseChartProps {
  xField: string;
  yFields: string[];
}

export interface ChartColors {
  stroke: string;
  fill?: string;
}

export type ChartColorGenerator = (index: number, total: number) => ChartColors;

export interface BarChartProps extends CartesianChartProps {} 