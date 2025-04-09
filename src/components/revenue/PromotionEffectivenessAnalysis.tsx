import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { BarChart } from "../../components/ui/charts"
import {
  ChartBarIcon,
  MegaphoneIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  TagIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"

interface Promotion {
  id: string
  name: string
  description: string
  type: "discount" | "bundle" | "seasonal" | "special"
  status: "active" | "scheduled" | "completed"
  startDate: string
  endDate: string
  budget: number
  revenue: number
  roi: number
  conversionRate: number
  metrics: {
    roi: number
    conversionRate: number
    revenue: number
    budget: number
    ctr: number
    responseRate: number
  }
}

interface ChannelPerformance {
  channel: string
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  ctr: number
  conversionRate: number
  cpc: number
}

interface SegmentResponse {
  segment: string
  responseRate: number
  conversionRate: number
  revenue: number
  averageOrderValue: number
  roi: number
}

interface ABTestResult {
  id: string
  promotionId: string
  testName: string
  variantA: {
    name: string
    description: string
    metrics: {
      impressions: number
      clicks: number
      conversions: number
      revenue: number
      conversionRate: number
    }
  }
  variantB: {
    name: string
    description: string
    metrics: {
      impressions: number
      clicks: number
      conversions: number
      revenue: number
      conversionRate: number
    }
  }
  winner: "A" | "B" | "none"
  confidenceLevel: number
  startDate: string
  endDate: string
  insights: string[]
}

interface BarChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
    }[]
  }
  ariaLabel: string
}

const promotions: Promotion[] = [
  {
    id: "summer-splash",
    name: "Summer Splash Sale",
    description: "20% off all water park tickets",
    type: "seasonal",
    status: "active",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    budget: 50000,
    revenue: 250000,
    roi: 400,
    conversionRate: 15,
    metrics: {
      roi: 400,
      conversionRate: 15,
      revenue: 250000,
      budget: 50000,
      ctr: 15,
      responseRate: 25,
    },
  },
  {
    id: "family-bundle",
    name: "Family Fun Bundle",
    description: "Save 25% on family packages",
    type: "bundle",
    status: "active",
    startDate: "2023-05-15",
    endDate: "2023-12-31",
    budget: 75000,
    revenue: 375000,
    roi: 400,
    conversionRate: 12,
    metrics: {
      roi: 400,
      conversionRate: 12,
      revenue: 375000,
      budget: 75000,
      ctr: 15,
      responseRate: 25,
    },
  },
  {
    id: "early-bird",
    name: "Early Bird Special",
    description: "15% off advance bookings",
    type: "discount",
    status: "scheduled",
    startDate: "2023-09-01",
    endDate: "2023-11-30",
    budget: 25000,
    revenue: 0,
    roi: 0,
    conversionRate: 0,
    metrics: {
      roi: 0,
      conversionRate: 0,
      revenue: 0,
      budget: 25000,
      ctr: 0,
      responseRate: 0,
    },
  },
  {
    id: "holiday-festival",
    name: "Holiday Festival Pass",
    description: "Special access to holiday events",
    type: "special",
    status: "scheduled",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    budget: 100000,
    revenue: 0,
    roi: 0,
    conversionRate: 0,
    metrics: {
      roi: 0,
      conversionRate: 0,
      revenue: 0,
      budget: 100000,
      ctr: 0,
      responseRate: 0,
    },
  },
]

const channelPerformance: ChannelPerformance[] = [
  {
    channel: "Email",
    impressions: 250000,
    clicks: 37500,
    conversions: 3750,
    revenue: 187500,
    ctr: 15,
    conversionRate: 10,
    cpc: 0.5,
  },
  {
    channel: "Social Media",
    impressions: 500000,
    clicks: 75000,
    conversions: 3750,
    revenue: 187500,
    ctr: 15,
    conversionRate: 5,
    cpc: 1.0,
  },
  {
    channel: "Search",
    impressions: 300000,
    clicks: 45000,
    conversions: 2250,
    revenue: 112500,
    ctr: 15,
    conversionRate: 5,
    cpc: 1.5,
  },
  {
    channel: "Display",
    impressions: 1000000,
    clicks: 50000,
    conversions: 1500,
    revenue: 75000,
    ctr: 5,
    conversionRate: 3,
    cpc: 0.75,
  },
]

const segmentResponse: SegmentResponse[] = [
  {
    segment: "Families",
    responseRate: 25,
    conversionRate: 15,
    revenue: 300000,
    averageOrderValue: 200,
    roi: 450,
  },
  {
    segment: "Couples",
    responseRate: 20,
    conversionRate: 12,
    revenue: 240000,
    averageOrderValue: 150,
    roi: 380,
  },
  {
    segment: "Groups",
    responseRate: 15,
    conversionRate: 10,
    revenue: 180000,
    averageOrderValue: 180,
    roi: 320,
  },
  {
    segment: "Individual",
    responseRate: 10,
    conversionRate: 8,
    revenue: 120000,
    averageOrderValue: 120,
    roi: 280,
  },
]

const abTestResults: ABTestResult[] = [
  {
    id: "ab1",
    promotionId: "summer-splash",
    testName: "Email Subject Line Test",
    variantA: {
      name: "Control",
      description: "Original subject line: 'Summer Splash Sale - 20% Off!'",
      metrics: {
        impressions: 50000,
        clicks: 7500,
        conversions: 750,
        revenue: 37500,
        conversionRate: 10,
      },
    },
    variantB: {
      name: "Test",
      description: "New subject line: 'Beat the Heat - Cool Savings Inside!'",
      metrics: {
        impressions: 50000,
        clicks: 10000,
        conversions: 1200,
        revenue: 60000,
        conversionRate: 12,
      },
    },
    winner: "B",
    confidenceLevel: 95,
    startDate: "2023-06-01",
    endDate: "2023-06-15",
    insights: [
      "New subject line increased open rate by 33%",
      "Conversion rate improved by 20%",
      "Revenue per email increased by 60%",
    ],
  },
  {
    id: "ab2",
    promotionId: "family-bundle",
    testName: "Landing Page Layout Test",
    variantA: {
      name: "Control",
      description: "Original layout with pricing table first",
      metrics: {
        impressions: 25000,
        clicks: 3750,
        conversions: 375,
        revenue: 18750,
        conversionRate: 10,
      },
    },
    variantB: {
      name: "Test",
      description: "New layout with benefits and testimonials first",
      metrics: {
        impressions: 25000,
        clicks: 5000,
        conversions: 750,
        revenue: 37500,
        conversionRate: 15,
      },
    },
    winner: "B",
    confidenceLevel: 99,
    startDate: "2023-05-15",
    endDate: "2023-05-30",
    insights: [
      "New layout increased engagement time by 45%",
      "Conversion rate improved by 50%",
      "Average order value increased by 25%",
    ],
  },
]

export const PromotionEffectivenessAnalysis = () => {
  const [activeTab, setActiveTab] = React.useState("overview")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
        <CardTitle>Promotion Effectiveness Analysis</CardTitle>
        <CardDescription>Track and analyze promotion performance across channels and segments</CardDescription>
        <div className="mt-4">
            <Button variant="outline" size="sm">
              <span className="flex items-center">
                <ChartBarIcon className="h-4 w-4 mr-2" />
                Refresh
              </span>
            </Button>
        </div>
      </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">
                <MegaphoneIcon className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="channels">
                <ArrowTrendingUpIcon className="h-4 w-4 mr-2" />
                Channels
              </TabsTrigger>
              <TabsTrigger value="segments">
                <UserGroupIcon className="h-4 w-4 mr-2" />
                Segments
              </TabsTrigger>
              <TabsTrigger value="ab-tests">
                <SparklesIcon className="h-4 w-4 mr-2" />
                A/B Tests
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Active Promotions</h3>
                  <Button size="sm">Create New Promotion</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Promotion
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Budget
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ROI
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Conversion
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {promotions.map((promo) => (
                        <tr key={promo.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{promo.name}</div>
                            <div className="text-xs text-gray-500">{promo.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                promo.type === "discount"
                                  ? "default"
                                  : promo.type === "bundle"
                                  ? "secondary"
                                  : promo.type === "seasonal"
                                  ? "outline"
                                  : "secondary"
                              }
                            >
                              {promo.type.charAt(0).toUpperCase() + promo.type.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                promo.status === "active"
                                  ? "secondary"
                                  : promo.status === "scheduled"
                                  ? "outline"
                                  : "secondary"
                              }
                            >
                              {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(promo.budget)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(promo.revenue)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-success-600">{promo.roi}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{promo.conversionRate}%</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Promotion Performance</h4>
                    <div className="h-64">
                      <BarChart
                        data={{
                          labels: promotions.map((p) => p.name),
                          datasets: [
                            {
                              label: "ROI",
                              data: promotions.map((p) => p.metrics.roi),
                            },
                          ],
                        }}
                        xField="label"
                        yFields={["ROI"]}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Revenue vs Budget</h4>
                    <div className="h-64">
                      <BarChart
                        data={{
                          labels: promotions.map((p) => p.name),
                          datasets: [
                            {
                              label: "Revenue",
                              data: promotions.map((p) => p.metrics.revenue),
                            },
                            {
                              label: "Budget",
                              data: promotions.map((p) => p.metrics.budget),
                            },
                          ],
                        }}
                        xField="label"
                        yFields={["Revenue", "Budget"]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="channels">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Channel Performance</h3>
                  <Button size="sm">Add New Channel</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Channel
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Impressions
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Clicks
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          CTR
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Conversions
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Conv. Rate
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          CPC
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {channelPerformance.map((channel) => (
                        <tr key={channel.channel}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{channel.channel}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US").format(channel.impressions)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US").format(channel.clicks)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{channel.ctr}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US").format(channel.conversions)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{channel.conversionRate}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(channel.cpc)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                channel.revenue
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Channel Efficiency</h4>
                    <div className="h-64">
                      <BarChart
                        data={{
                          labels: channelPerformance.map((c) => c.channel),
                          datasets: [
                            {
                              label: "CTR",
                              data: channelPerformance.map((c) => c.ctr),
                            }
                          ]
                        }}
                        xField="label"
                        yFields={["CTR"]}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Revenue by Channel</h4>
                    <div className="h-64">
                      <BarChart
                        data={{
                          labels: channelPerformance.map((c) => c.channel),
                          datasets: [
                            {
                              label: "Revenue",
                              data: channelPerformance.map((c) => c.revenue),
                            },
                          ],
                        }}
                        xField="label"
                        yFields={["Revenue"]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="segments">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Segment Response Analysis</h3>
                  <Button size="sm">Add New Segment</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Segment
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Response Rate
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Conversion Rate
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Avg. Order Value
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ROI
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {segmentResponse.map((segment) => (
                        <tr key={segment.segment}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{segment.segment}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{segment.responseRate}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{segment.conversionRate}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                segment.averageOrderValue
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                segment.revenue
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-success-600">{segment.roi}%</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Segment Response Rates</h4>
                    <div className="h-64">
                      <BarChart
                        data={{
                          labels: segmentResponse.map((s) => s.segment),
                          datasets: [
                            {
                              label: "Response Rate",
                              data: segmentResponse.map((s) => s.responseRate),
                            },
                          ],
                        }}
                        xField="label"
                        yFields={["Response Rate"]}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Revenue by Segment</h4>
                    <div className="h-64">
                      <BarChart
                        data={{
                          labels: segmentResponse.map((s) => s.segment),
                          datasets: [
                            {
                              label: "Revenue",
                              data: segmentResponse.map((s) => s.revenue),
                            },
                          ],
                        }}
                        xField="label"
                        yFields={["Revenue"]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ab-tests">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">A/B Test Results</h3>
                  <Button size="sm">Create New Test</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Test Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Variant A
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Variant B
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Winner
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Confidence
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Period
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {abTestResults.map((test) => (
                        <tr key={test.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{test.testName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{test.variantA.name}</div>
                            <div className="text-xs text-gray-500">{test.variantA.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{test.variantB.name}</div>
                            <div className="text-xs text-gray-500">{test.variantB.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                test.winner === "none"
                                  ? "outline"
                                  : test.winner === "A"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {test.winner === "none" ? "No Clear Winner" : `Variant ${test.winner}`}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{test.confidenceLevel}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(test.startDate).toLocaleDateString()} -{" "}
                              {new Date(test.endDate).toLocaleDateString()}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Conversion Rate Comparison</h4>
                    <div className="h-64">
                      <BarChart
                        data={{
                          labels: abTestResults.map((test) => test.testName),
                          datasets: [
                            {
                              label: "Variant A",
                              data: abTestResults.map((test) => test.variantA.metrics.conversionRate),
                            },
                            {
                              label: "Variant B",
                              data: abTestResults.map((test) => test.variantB.metrics.conversionRate),
                            },
                          ],
                        }}
                        xField="label"
                        yFields={["Variant A", "Variant B"]}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Revenue Comparison</h4>
                    <div className="h-64">
                      <BarChart
                        data={{
                          labels: abTestResults.map((test) => test.testName),
                          datasets: [
                            {
                              label: "Variant A",
                              data: abTestResults.map((test) => test.variantA.metrics.revenue),
                            },
                            {
                              label: "Variant B",
                              data: abTestResults.map((test) => test.variantB.metrics.revenue),
                            },
                          ],
                        }}
                        xField="label"
                        yFields={["Variant A", "Variant B"]}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Test Insights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {abTestResults.map((test) => (
                      <div key={test.id} className="bg-white p-4 rounded-lg border border-gray-200">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">{test.testName}</h5>
                        <ul className="space-y-2">
                          {test.insights.map((insight, index) => (
                            <li key={index} className="text-sm text-gray-600">• {insight}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 