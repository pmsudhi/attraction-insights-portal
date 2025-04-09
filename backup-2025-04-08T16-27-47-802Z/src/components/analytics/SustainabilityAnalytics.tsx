import React, { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  LineChart, 
  BarChart 
} from "@/components/ui/charts"
import { 
  BoltIcon,
  TrashIcon,
  CloudIcon,
  LeafIcon
} from "@heroicons/react/24/outline"

interface EnergyMetrics {
  category: string
  current: number
  target: number
  trend: number[]
  savings: number
  recommendations: string[]
}

interface WasteMetrics {
  category: string
  current: number
  target: number
  recyclingRate: number
  reduction: number
  recommendations: string[]
}

interface ClimateRisk {
  category: string
  riskLevel: "high" | "medium" | "low"
  impact: string
  probability: number
  mitigation: string[]
  adaptation: string[]
}

// Sample data for energy metrics
const energyData: EnergyMetrics[] = [
  {
    category: "Electricity",
    current: 850,
    target: 700,
    trend: [900, 880, 850, 830, 820, 850],
    savings: 50,
    recommendations: [
      "Install LED lighting throughout the park",
      "Implement smart HVAC controls",
      "Add solar panels to parking structures"
    ]
  },
  {
    category: "Water",
    current: 120,
    target: 100,
    trend: [130, 125, 120, 118, 115, 120],
    savings: 10,
    recommendations: [
      "Install water-efficient fixtures",
      "Implement rainwater harvesting",
      "Add water recycling systems"
    ]
  }
]

// Sample data for waste metrics
const wasteData: WasteMetrics[] = [
  {
    category: "General Waste",
    current: 500,
    target: 400,
    recyclingRate: 0.45,
    reduction: 0.15,
    recommendations: [
      "Implement waste sorting stations",
      "Increase composting programs",
      "Reduce packaging in food service"
    ]
  },
  {
    category: "Hazardous Waste",
    current: 50,
    target: 30,
    recyclingRate: 0.60,
    reduction: 0.20,
    recommendations: [
      "Improve hazardous waste collection",
      "Train staff on proper disposal",
      "Audit chemical usage"
    ]
  }
]

// Sample data for climate risks
const climateRisks: ClimateRisk[] = [
  {
    category: "Extreme Weather",
    riskLevel: "high",
    impact: "Operational disruption and property damage",
    probability: 0.8,
    mitigation: [
      "Strengthen infrastructure",
      "Develop emergency response plans",
      "Install weather monitoring systems"
    ],
    adaptation: [
      "Design for climate resilience",
      "Implement flexible scheduling",
      "Create backup power systems"
    ]
  },
  {
    category: "Rising Temperatures",
    riskLevel: "medium",
    impact: "Increased cooling costs and guest comfort",
    probability: 0.6,
    mitigation: [
      "Enhance shade structures",
      "Improve building insulation",
      "Install energy-efficient cooling"
    ],
    adaptation: [
      "Add misting stations",
      "Create cooling zones",
      "Adjust operating hours"
    ]
  }
]

export default function SustainabilityAnalytics() {
  const [activeTab, setActiveTab] = useState<string>("energy")

  // Prepare data for charts
  const energyChartData = energyData.map(item => ({
    category: item.category,
    current: item.current,
    target: item.target
  }))

  const wasteChartData = wasteData.map(item => ({
    category: item.category,
    current: item.current,
    target: item.target
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sustainability & ESG Analytics</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="energy">
            <BoltIcon className="h-4 w-4 mr-2" />
            Energy
          </TabsTrigger>
          <TabsTrigger value="waste">
            <TrashIcon className="h-4 w-4 mr-2" />
            Waste
          </TabsTrigger>
          <TabsTrigger value="climate">
            <CloudIcon className="h-4 w-4 mr-2" />
            Climate Risk
          </TabsTrigger>
        </TabsList>

        <TabsContent value="energy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Energy Efficiency Metrics</CardTitle>
              <CardDescription>
                Tracking energy consumption and efficiency improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mb-6">
                <BarChart
                  data={energyChartData}
                  xField="category"
                  yFields={["current", "target"]}
                  colors={["#3b82f6", "#10b981"]}
                  labels={["Current (kWh)", "Target (kWh)"]}
                />
              </div>
              <div className="space-y-4">
                {energyData.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{item.category}</h3>
                          <p className="text-sm text-gray-500">
                            Monthly Consumption
                          </p>
                        </div>
                        <Badge className={`
                          ${item.current <= item.target ? "bg-green-100 text-green-800" : 
                            "bg-yellow-100 text-yellow-800"}
                        `}>
                          {item.savings}% Savings Target
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Current</p>
                          <p className="font-medium">{item.current} kWh</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Target</p>
                          <p className="font-medium">{item.target} kWh</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Recommendations:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {item.recommendations.map((rec, i) => (
                            <li key={i}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waste" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Waste Management Metrics</CardTitle>
              <CardDescription>
                Tracking waste reduction and recycling initiatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mb-6">
                <BarChart
                  data={wasteChartData}
                  xField="category"
                  yFields={["current", "target"]}
                  colors={["#3b82f6", "#10b981"]}
                  labels={["Current (kg)", "Target (kg)"]}
                />
              </div>
              <div className="space-y-4">
                {wasteData.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{item.category}</h3>
                          <p className="text-sm text-gray-500">
                            Monthly Generation
                          </p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                          {formatPercent(item.recyclingRate)} Recycling Rate
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Current</p>
                          <p className="font-medium">{item.current} kg</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Target</p>
                          <p className="font-medium">{item.target} kg</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Reduction</p>
                          <p className="font-medium">{formatPercent(item.reduction)}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Recommendations:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {item.recommendations.map((rec, i) => (
                            <li key={i}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="climate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Climate Risk Assessment</CardTitle>
              <CardDescription>
                Analysis of climate-related risks and adaptation strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {climateRisks.map((risk, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{risk.category}</h3>
                          <p className="text-sm text-gray-500">
                            Impact: {risk.impact}
                          </p>
                        </div>
                        <Badge className={`
                          ${risk.riskLevel === "high" ? "bg-red-100 text-red-800" : 
                            risk.riskLevel === "medium" ? "bg-yellow-100 text-yellow-800" : 
                            "bg-green-100 text-green-800"}
                        `}>
                          {risk.riskLevel.toUpperCase()} Risk
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Probability</p>
                          <p className="font-medium">{formatPercent(risk.probability)}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Mitigation Strategies:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {risk.mitigation.map((strategy, i) => (
                              <li key={i}>{strategy}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Adaptation Strategies:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {risk.adaptation.map((strategy, i) => (
                              <li key={i}>{strategy}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function to format percentages
function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`
} 