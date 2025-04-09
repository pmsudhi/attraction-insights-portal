import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { LineChart } from "@/components/ui/charts"
import {
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
  LightBulbIcon,
  HomeModernIcon,
  TicketIcon,
  ShoppingBagIcon,
  CameraIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline"

interface Driver {
  id: string
  name: string
  category: string
  description: string
  impact: "High" | "Medium" | "Low"
  trend: number
  icon: React.ComponentType<{ className?: string }>
  sensitivity: {
    base: number
    min: number
    max: number
    unit: string
  }
  historicalData: {
    date: string
    value: number
  }[]
}

const sampleDrivers: Driver[] = [
  {
    id: "labor",
    name: "Labor Costs",
    category: "Cost",
    description: "Staff wages, benefits, training",
    impact: "High",
    trend: 4.5,
    icon: WrenchScrewdriverIcon,
    sensitivity: {
      base: 2500000,
      min: 2000000,
      max: 3000000,
      unit: "USD"
    },
    historicalData: [
      { date: "2023-Q1", value: 2300000 },
      { date: "2023-Q2", value: 2400000 },
      { date: "2023-Q3", value: 2500000 },
      { date: "2023-Q4", value: 2600000 }
    ]
  },
  // ... Add more sample drivers
]

export const DriverBasedModeling = () => {
  const [selectedDriver, setSelectedDriver] = React.useState<Driver | null>(null)
  const [sensitivityRange, setSensitivityRange] = React.useState<number>(0)

  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver)
  }

  const handleSensitivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSensitivityRange(Number(event.target.value))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cost Drivers</CardTitle>
            <CardDescription>Key cost drivers by category</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Driver Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Impact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sampleDrivers.map((driver) => (
                    <tr 
                      key={driver.id}
                      className={`cursor-pointer hover:bg-gray-50 ${selectedDriver?.id === driver.id ? 'bg-primary-50' : ''}`}
                      onClick={() => handleDriverSelect(driver)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-primary-100 rounded-md flex items-center justify-center">
                            <driver.icon className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                            <div className="text-xs text-gray-500">{driver.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={driver.impact === "High" ? "primary" : driver.impact === "Medium" ? "warning" : "secondary"} 
                          rounded
                        >
                          {driver.impact}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${driver.trend > 0 ? 'text-danger-600' : 'text-success-600'}`}>
                          {driver.trend > 0 ? '+' : ''}{driver.trend}% YOY
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
        <CardTitle>Sensitivity Analysis</CardTitle>
        <CardDescription>Impact of driver changes on profitability</CardDescription>
      </CardHeader>
          <CardContent>
            {selectedDriver ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{selectedDriver.name}</h3>
                    <p className="text-sm text-gray-500">{selectedDriver.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-gray-900">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                        selectedDriver.sensitivity.base * (1 + sensitivityRange / 100)
                      )}
                    </div>
                    <div className="text-sm text-gray-500">Base value with {sensitivityRange}% change</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="sensitivity-range" className="text-sm font-medium text-gray-700">
                    Sensitivity Range: {sensitivityRange}%
                  </label>
                  <input
                    id="sensitivity-range"
                    type="range"
                    min="-20"
                    max="20"
                    value={sensitivityRange}
                    onChange={handleSensitivityChange}
                    className="w-full"
                    aria-label="Sensitivity range slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>-20%</span>
                    <span>0%</span>
                    <span>+20%</span>
                  </div>
                </div>

                <div className="h-64">
                  <LineChart
                    data={{
                      labels: selectedDriver.historicalData.map(d => d.date),
                      datasets: [{
                        label: selectedDriver.name,
                        data: selectedDriver.historicalData.map(d => d.value),
                        borderColor: "#3B82F6",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        fill: true
                      }]
                    }}
                    ariaLabel={`${selectedDriver.name} Historical Trend`}
                  />
                </div>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500">Select a driver to view sensitivity analysis</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
        <CardTitle>Driver-Based Forecasting</CardTitle>
        <CardDescription>Forecast future performance based on key drivers</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Forecast Parameters</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="time-horizon" className="block text-sm font-medium text-gray-700">Time Horizon</label>
                  <select 
                    id="time-horizon"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    aria-label="Select time horizon"
                  >
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>1 Year</option>
                    <option>2 Years</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="scenario" className="block text-sm font-medium text-gray-700">Scenario</label>
                  <select 
                    id="scenario"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    aria-label="Select scenario"
                  >
                    <option>Base Case</option>
                    <option>Optimistic</option>
                    <option>Pessimistic</option>
                  </select>
                </div>
                <Button variant="default" className="w-full">
                  Generate Forecast
                </Button>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="h-80 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Forecast visualization will be displayed here</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

