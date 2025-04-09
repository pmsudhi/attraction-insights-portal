import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { LineChart } from "@/components/ui/charts"
import { ChartBarIcon, WrenchScrewdriverIcon, CurrencyDollarIcon, ClockIcon } from "@heroicons/react/24/outline"

interface Attraction {
  id: string
  name: string
  type: string
  directRevenue: number
  indirectRevenue: number
  directCosts: number
  allocatedCosts: number
  profitMargin: number
  roi: number
  lifecycle: {
    year: number
    revenue: number
    costs: number
    profit: number
  }[]
  costAllocation: {
    category: string
    amount: number
    percentage: number
  }[]
}

interface GuestFlow {
  sourceAttraction: string
  targetAttraction: string
  flowPercentage: number
  averageWaitTime: number
  revenueImpact: number
  peakHourFlow: number
  offPeakHourFlow: number
}

interface EnergyConsumption {
  attractionId: string
  totalConsumption: number
  peakHourConsumption: number
  offPeakHourConsumption: number
  costPerKwh: number
  monthlyTrend: {
    month: string
    consumption: number
    cost: number
  }[]
  efficiencyScore: number
}

interface IPLicensing {
  attractionId: string
  licenseName: string
  annualFee: number
  revenueShare: number
  minimumGuarantee: number
  term: string
  renewalDate: string
  performanceMetrics: {
    attendance: number
    revenue: number
    merchandiseSales: number
  }
}

interface PhotographyRevenue {
  attractionId: string
  totalRevenue: number
  digitalDownloads: number
  printSales: number
  packageSales: number
  averageOrderValue: number
  conversionRate: number
  peakHourRevenue: number
  offPeakHourRevenue: number
}

interface UtilizationVariance {
  attractionId: string
  peakUtilization: number
  offPeakUtilization: number
  variance: number
  revenueImpact: number
  capacityWaste: number
  optimizationOpportunity: number
}

const attractions: Attraction[] = [
  {
    id: "thrill-seeker",
    name: "Thrill Seeker",
    type: "Roller Coaster",
    directRevenue: 4250000,
    indirectRevenue: 1845000,
    directCosts: 1250000,
    allocatedCosts: 850000,
    profitMargin: 42.5,
    roi: 28.4,
    lifecycle: [
      { year: 2020, revenue: 3800000, costs: 2800000, profit: 1000000 },
      { year: 2021, revenue: 4100000, costs: 2900000, profit: 1200000 },
      { year: 2022, revenue: 4250000, costs: 3000000, profit: 1250000 },
      { year: 2023, revenue: 4250000, costs: 2100000, profit: 2150000 },
    ],
    costAllocation: [
      { category: "Labor", amount: 450000, percentage: 21.4 },
      { category: "Maintenance", amount: 380000, percentage: 18.1 },
      { category: "Utilities", amount: 320000, percentage: 15.2 },
      { category: "Insurance", amount: 280000, percentage: 13.3 },
      { category: "Depreciation", amount: 420000, percentage: 20.0 },
      { category: "Other", amount: 250000, percentage: 12.0 },
    ],
  },
  {
    id: "splash-mountain",
    name: "Splash Mountain",
    type: "Water Ride",
    directRevenue: 3120000,
    indirectRevenue: 1450000,
    directCosts: 980000,
    allocatedCosts: 720000,
    profitMargin: 38.2,
    roi: 24.1,
    lifecycle: [
      { year: 2020, revenue: 2800000, costs: 2200000, profit: 600000 },
      { year: 2021, revenue: 2950000, costs: 2300000, profit: 650000 },
      { year: 2022, revenue: 3120000, costs: 2400000, profit: 720000 },
      { year: 2023, revenue: 3120000, costs: 1700000, profit: 1420000 },
    ],
    costAllocation: [
      { category: "Labor", amount: 380000, percentage: 22.4 },
      { category: "Maintenance", amount: 320000, percentage: 18.8 },
      { category: "Utilities", amount: 280000, percentage: 16.5 },
      { category: "Insurance", amount: 240000, percentage: 14.1 },
      { category: "Depreciation", amount: 360000, percentage: 21.2 },
      { category: "Other", amount: 220000, percentage: 7.0 },
    ],
  },
  {
    id: "fantasy-castle",
    name: "Fantasy Castle",
    type: "Dark Ride",
    directRevenue: 2850000,
    indirectRevenue: 1250000,
    directCosts: 1450000,
    allocatedCosts: 650000,
    profitMargin: 25.0,
    roi: 15.8,
    lifecycle: [
      { year: 2020, revenue: 2500000, costs: 2100000, profit: 400000 },
      { year: 2021, revenue: 2700000, costs: 2200000, profit: 500000 },
      { year: 2022, revenue: 2850000, costs: 2300000, profit: 550000 },
      { year: 2023, revenue: 2850000, costs: 2100000, profit: 750000 },
    ],
    costAllocation: [
      { category: "Labor", amount: 320000, percentage: 15.2 },
      { category: "Maintenance", amount: 280000, percentage: 13.3 },
      { category: "Utilities", amount: 240000, percentage: 11.4 },
      { category: "Insurance", amount: 200000, percentage: 9.5 },
      { category: "Depreciation", amount: 420000, percentage: 20.0 },
      { category: "Other", amount: 640000, percentage: 30.6 },
    ],
  },
]

const guestFlowData: GuestFlow[] = [
  {
    sourceAttraction: "Thrill Seeker",
    targetAttraction: "Splash Mountain",
    flowPercentage: 65,
    averageWaitTime: 45,
    revenueImpact: 125000,
    peakHourFlow: 850,
    offPeakHourFlow: 420
  },
  {
    sourceAttraction: "Splash Mountain",
    targetAttraction: "Fantasy Castle",
    flowPercentage: 55,
    averageWaitTime: 30,
    revenueImpact: 95000,
    peakHourFlow: 720,
    offPeakHourFlow: 380
  },
  {
    sourceAttraction: "Fantasy Castle",
    targetAttraction: "Thrill Seeker",
    flowPercentage: 45,
    averageWaitTime: 25,
    revenueImpact: 85000,
    peakHourFlow: 620,
    offPeakHourFlow: 310
  }
]

const energyConsumptionData: EnergyConsumption[] = [
  {
    attractionId: "thrill-seeker",
    totalConsumption: 1250000,
    peakHourConsumption: 85000,
    offPeakHourConsumption: 45000,
    costPerKwh: 0.12,
    monthlyTrend: [
      { month: "Jan", consumption: 95000, cost: 11400 },
      { month: "Feb", consumption: 88000, cost: 10560 },
      { month: "Mar", consumption: 92000, cost: 11040 },
      { month: "Apr", consumption: 98000, cost: 11760 }
    ],
    efficiencyScore: 85
  },
  {
    attractionId: "splash-mountain",
    totalConsumption: 980000,
    peakHourConsumption: 72000,
    offPeakHourConsumption: 38000,
    costPerKwh: 0.12,
    monthlyTrend: [
      { month: "Jan", consumption: 75000, cost: 9000 },
      { month: "Feb", consumption: 72000, cost: 8640 },
      { month: "Mar", consumption: 78000, cost: 9360 },
      { month: "Apr", consumption: 82000, cost: 9840 }
    ],
    efficiencyScore: 82
  },
  {
    attractionId: "fantasy-castle",
    totalConsumption: 850000,
    peakHourConsumption: 62000,
    offPeakHourConsumption: 32000,
    costPerKwh: 0.12,
    monthlyTrend: [
      { month: "Jan", consumption: 65000, cost: 7800 },
      { month: "Feb", consumption: 62000, cost: 7440 },
      { month: "Mar", consumption: 68000, cost: 8160 },
      { month: "Apr", consumption: 72000, cost: 8640 }
    ],
    efficiencyScore: 88
  }
]

const ipLicensingData: IPLicensing[] = [
  {
    attractionId: "thrill-seeker",
    licenseName: "Superhero Universe",
    annualFee: 850000,
    revenueShare: 8.5,
    minimumGuarantee: 750000,
    term: "5 years",
    renewalDate: "2025-12-31",
    performanceMetrics: {
      attendance: 1250000,
      revenue: 4250000,
      merchandiseSales: 850000
    }
  },
  {
    attractionId: "splash-mountain",
    licenseName: "Adventure Series",
    annualFee: 720000,
    revenueShare: 7.2,
    minimumGuarantee: 650000,
    term: "5 years",
    renewalDate: "2026-06-30",
    performanceMetrics: {
      attendance: 980000,
      revenue: 3120000,
      merchandiseSales: 624000
    }
  },
  {
    attractionId: "fantasy-castle",
    licenseName: "Magic Kingdom",
    annualFee: 950000,
    revenueShare: 9.5,
    minimumGuarantee: 850000,
    term: "5 years",
    renewalDate: "2025-09-30",
    performanceMetrics: {
      attendance: 1150000,
      revenue: 2850000,
      merchandiseSales: 855000
    }
  }
]

const photographyRevenueData: PhotographyRevenue[] = [
  {
    attractionId: "thrill-seeker",
    totalRevenue: 425000,
    digitalDownloads: 250000,
    printSales: 125000,
    packageSales: 50000,
    averageOrderValue: 42.50,
    conversionRate: 35,
    peakHourRevenue: 85000,
    offPeakHourRevenue: 42500
  },
  {
    attractionId: "splash-mountain",
    totalRevenue: 312000,
    digitalDownloads: 187000,
    printSales: 94000,
    packageSales: 31000,
    averageOrderValue: 39.00,
    conversionRate: 32,
    peakHourRevenue: 62400,
    offPeakHourRevenue: 31200
  },
  {
    attractionId: "fantasy-castle",
    totalRevenue: 285000,
    digitalDownloads: 171000,
    printSales: 85000,
    packageSales: 29000,
    averageOrderValue: 38.00,
    conversionRate: 30,
    peakHourRevenue: 57000,
    offPeakHourRevenue: 28500
  }
]

const utilizationVarianceData: UtilizationVariance[] = [
  {
    attractionId: "thrill-seeker",
    peakUtilization: 95,
    offPeakUtilization: 65,
    variance: 30,
    revenueImpact: 850000,
    capacityWaste: 25,
    optimizationOpportunity: 15
  },
  {
    attractionId: "splash-mountain",
    peakUtilization: 92,
    offPeakUtilization: 62,
    variance: 30,
    revenueImpact: 620000,
    capacityWaste: 28,
    optimizationOpportunity: 18
  },
  {
    attractionId: "fantasy-castle",
    peakUtilization: 88,
    offPeakUtilization: 58,
    variance: 30,
    revenueImpact: 450000,
    capacityWaste: 32,
    optimizationOpportunity: 22
  }
]

export const AttractionProfitability = () => {
  const [selectedAttraction, setSelectedAttraction] = React.useState<Attraction>(attractions[0])

  const handleAttractionSelect = (attraction: Attraction) => {
    setSelectedAttraction(attraction)
  }

  const lifecycleData = selectedAttraction.lifecycle.map(l => ({
    date: l.year.toString(),
    predicted: l.revenue,
    actual: l.costs
  }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Attraction Profitability</CardTitle>
          <CardDescription>Profitability analysis by attraction</CardDescription>
          <div className="mt-4">
            <Button variant="outline" size="sm">
              <ChartBarIcon className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attraction
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Direct Revenue
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Indirect Revenue
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Direct Costs
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Allocated Costs
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profit Margin
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ROI
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attractions.map((attraction) => (
                  <tr
                    key={attraction.id}
                    className={`cursor-pointer hover:bg-gray-50 ${selectedAttraction?.id === attraction.id ? "bg-primary-50" : ""}`}
                    onClick={() => handleAttractionSelect(attraction)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-md flex items-center justify-center">
                          <WrenchScrewdriverIcon className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{attraction.name}</div>
                          <div className="text-xs text-gray-500">{attraction.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(attraction.directRevenue)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(attraction.indirectRevenue)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(attraction.directCosts)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(attraction.allocatedCosts)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${attraction.profitMargin >= 30 ? "text-success-600" : "text-warning-600"}`}>
                        {attraction.profitMargin}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${attraction.roi >= 20 ? "text-success-600" : "text-warning-600"}`}>
                        {attraction.roi}%
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
        <CardTitle>Lifecycle Profitability</CardTitle>
        <CardDescription>Historical and projected performance</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="h-80">
            <LineChart
              data={lifecycleData}
              xField="date"
              yFields={["predicted", "actual"]}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
        <CardTitle>Cost Allocation</CardTitle>
        <CardDescription>Breakdown of allocated costs by category</CardDescription>
      </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedAttraction.costAllocation.map((cost) => (
                <div key={cost.category} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{cost.category}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-900">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cost.amount)}
                    </span>
                    <span className="text-sm text-gray-500">{cost.percentage}%</span>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Total Allocated Costs</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                      selectedAttraction.allocatedCosts
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.map((attraction) => (
          <Card key={attraction.id}>
            <CardHeader 
              title={attraction.name}
              subtitle="Profitability Metrics"
            />
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Direct Revenue:</span>
                  <span className="font-medium">${attraction.directRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Indirect Revenue:</span>
                  <span className="font-medium">${attraction.indirectRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Direct Costs:</span>
                  <span className="font-medium">${attraction.directCosts.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Allocated Costs:</span>
                  <span className="font-medium">${attraction.allocatedCosts.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Profit Margin:</span>
                  <span className="font-medium">{attraction.profitMargin}%</span>
                </div>
                <div className="flex justify-between">
                  <span>ROI:</span>
                  <span className="font-medium">{attraction.roi}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
        <CardTitle>Cross-Attraction Guest Flow Analysis</CardTitle>
        <CardDescription>Guest movement patterns and revenue impact</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Source</th>
                  <th className="text-left">Target</th>
                  <th className="text-right">Flow %</th>
                  <th className="text-right">Avg Wait Time</th>
                  <th className="text-right">Revenue Impact</th>
                  <th className="text-right">Peak Hour Flow</th>
                  <th className="text-right">Off-Peak Flow</th>
                </tr>
              </thead>
              <tbody>
                {guestFlowData.map((flow, index) => (
                  <tr key={index}>
                    <td>{flow.sourceAttraction}</td>
                    <td>{flow.targetAttraction}</td>
                    <td className="text-right">{flow.flowPercentage}%</td>
                    <td className="text-right">{flow.averageWaitTime} min</td>
                    <td className="text-right">${flow.revenueImpact.toLocaleString()}</td>
                    <td className="text-right">{flow.peakHourFlow}</td>
                    <td className="text-right">{flow.offPeakHourFlow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
        <CardTitle>Energy Consumption Monitoring</CardTitle>
        <CardDescription>Monthly energy usage and costs</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {energyConsumptionData.map((energy) => {
              const attraction = attractions.find(a => a.id === energy.attractionId)
              return (
                <Card key={energy.attractionId}>
                  <CardHeader 
                    title={attraction?.name || ""}
                    subtitle="Energy Metrics"
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Consumption:</span>
                        <span className="font-medium">{energy.totalConsumption.toLocaleString()} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Peak Hour Usage:</span>
                        <span className="font-medium">{energy.peakHourConsumption.toLocaleString()} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Off-Peak Usage:</span>
                        <span className="font-medium">{energy.offPeakHourConsumption.toLocaleString()} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cost per kWh:</span>
                        <span className="font-medium">${energy.costPerKwh}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Efficiency Score:</span>
                        <span className="font-medium">{energy.efficiencyScore}/100</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
        <CardTitle>IP Licensing Cost Allocation</CardTitle>
        <CardDescription>License fees and performance metrics</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ipLicensingData.map((license) => {
              const attraction = attractions.find(a => a.id === license.attractionId)
              return (
                <Card key={license.attractionId}>
                  <CardHeader 
                    title={attraction?.name || ""}
                    subtitle={license.licenseName}
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Annual Fee:</span>
                        <span className="font-medium">${license.annualFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue Share:</span>
                        <span className="font-medium">{license.revenueShare}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Min Guarantee:</span>
                        <span className="font-medium">${license.minimumGuarantee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Term:</span>
                        <span className="font-medium">{license.term}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Renewal Date:</span>
                        <span className="font-medium">{license.renewalDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
        <CardTitle>Photography Revenue Attribution</CardTitle>
        <CardDescription>Digital media revenue breakdown</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photographyRevenueData.map((photo) => {
              const attraction = attractions.find(a => a.id === photo.attractionId)
              return (
                <Card key={photo.attractionId}>
                  <CardHeader 
                    title={attraction?.name || ""}
                    subtitle="Photo Revenue"
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Revenue:</span>
                        <span className="font-medium">${photo.totalRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Digital Downloads:</span>
                        <span className="font-medium">${photo.digitalDownloads.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Print Sales:</span>
                        <span className="font-medium">${photo.printSales.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Package Sales:</span>
                        <span className="font-medium">${photo.packageSales.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Order Value:</span>
                        <span className="font-medium">${photo.averageOrderValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversion Rate:</span>
                        <span className="font-medium">{photo.conversionRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
        <CardTitle>Peak vs Off-Peak Utilization</CardTitle>
        <CardDescription>Capacity utilization analysis</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {utilizationVarianceData.map((util) => {
              const attraction = attractions.find(a => a.id === util.attractionId)
              return (
                <Card key={util.attractionId}>
                  <CardHeader 
                    title={attraction?.name || ""}
                    subtitle="Utilization Metrics"
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Peak Utilization:</span>
                        <span className="font-medium">{util.peakUtilization}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Off-Peak Utilization:</span>
                        <span className="font-medium">{util.offPeakUtilization}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Variance:</span>
                        <span className="font-medium">{util.variance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue Impact:</span>
                        <span className="font-medium">${util.revenueImpact.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Capacity Waste:</span>
                        <span className="font-medium">{util.capacityWaste}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Optimization Opportunity:</span>
                        <span className="font-medium">{util.optimizationOpportunity}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

