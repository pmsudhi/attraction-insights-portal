export interface WeatherDataPoint {
  date: string;
  condition: string;
  temperature: number;
  attendanceImpact: number;
  revenueImpact: number;
  energyImpact: number;
}

export interface MonthlyImpact {
  month: string;
  attendanceImpact: number;
  revenueImpact: number;
  energyImpact: number;
}

export interface SeasonalImpact {
  season: string;
  attendanceImpact: number;
  revenueImpact: number;
  energyImpact: number;
}

export interface PropertyWeatherData {
  [key: string]: WeatherDataPoint[];
}

export interface PropertyHistoricalImpact {
  monthly: MonthlyImpact[];
  seasonal: SeasonalImpact[];
}

export interface HistoricalWeatherImpact {
  [key: string]: PropertyHistoricalImpact;
}

// Mock weather data
export const weatherData: PropertyWeatherData = {
  "Adventure Park": [
    {
      date: "2024-04-07",
      condition: "Sunny",
      temperature: 75,
      attendanceImpact: 0.15,
      revenueImpact: 0.12,
      energyImpact: 0.08
    },
    {
      date: "2024-04-08",
      condition: "Cloudy",
      temperature: 68,
      attendanceImpact: -0.05,
      revenueImpact: -0.03,
      energyImpact: -0.02
    }
  ]
};

export const historicalWeatherImpact: HistoricalWeatherImpact = {
  "Adventure Park": {
    monthly: [
      {
        month: "March",
        attendanceImpact: 0.08,
        revenueImpact: 0.06,
        energyImpact: 0.04
      }
    ],
    seasonal: [
      {
        season: "Spring",
        attendanceImpact: 0.10,
        revenueImpact: 0.08,
        energyImpact: 0.05
      }
    ]
  }
};

export interface WeatherAdaptationStrategy {
  id: number;
  name: string;
  description: string;
  cost: number;
  effectiveness: number;
}

export const weatherAdaptationStrategies: WeatherAdaptationStrategy[] = [
  {
    id: 1,
    name: "Indoor Attractions",
    description: "Expand indoor attractions during inclement weather",
    cost: 500000,
    effectiveness: 0.8
  },
  {
    id: 2,
    name: "Weather Protection",
    description: "Install weather protection systems",
    cost: 300000,
    effectiveness: 0.6
  }
]; 