import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { BarChart, LineChart } from "../../components/ui/charts"
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline"

interface ChannelMetrics {
  id: string
  name: string
  type: "digital" | "traditional" | "social" | "direct"
  metrics: {
    impressions: number
    clicks: number
    conversions: number
    revenue: number
    cost: number
    roi: number
    conversionRate: number
    ctr: number
    cpc: number
  }
  trends: {
    impressions: number[]
    conversions: number[]
    revenue: number[]
  }
  segments: {
    name: string
    performance: number
  }[]
}

const channelData: ChannelMetrics[] = [
  {
    id: "email",
    name: "Email Marketing",
    type: "digital",
    metrics: {
      impressions: 150000,
      clicks: 25000,
      conversions: 2500,
      revenue: 125000,
      cost: 15000,
      roi: 733,
      conversionRate: 10,
      ctr: 16.7,
      cpc: 0.6,
    },
    trends: {
      impressions: [120000, 135000, 150000],
      conversions: [2000, 2250, 2500],
      revenue: [100000, 112500, 125000],
    },
    segments: [
      { name: "Families", performance: 85 },
      { name: "Couples", performance: 75 },
      { name: "Groups", performance: 65 },
    ],
  },
  {
    id: "social",
    name: "Social Media",
    type: "social",
    metrics: {
      impressions: 200000,
      clicks: 30000,
      conversions: 2000,
      revenue: 100000,
      cost: 20000,
      roi: 400,
      conversionRate: 6.7,
      ctr: 15,
      cpc: 0.67,
    },
    trends: {
      impressions: [180000, 190000, 200000],
      conversions: [1800, 1900, 2000],
      revenue: [90000, 95000, 100000],
    },
    segments: [
      { name: "Young Adults", performance: 90 },
      { name: "Families", performance: 70 },
      { name: "Seniors", performance: 50 },
    ],
  },
  {
    id: "search",
    name: "Search Ads",
    type: "digital",
    metrics: {
      impressions: 100000,
      clicks: 15000,
      conversions: 1500,
      revenue: 75000,
      cost: 25000,
      roi: 200,
      conversionRate: 10,
      ctr: 15,
      cpc: 1.67,
    },
    trends: {
      impressions: [90000, 95000, 100000],
      conversions: [1350, 1425, 1500],
      revenue: [67500, 71250, 75000],
    },
    segments: [
      { name: "Business", performance: 80 },
      { name: "Leisure", performance: 75 },
      { name: "Group", performance: 70 },
    ],
  },
  {
    id: "display",
    name: "Display Advertising",
    type: "digital",
    metrics: {
      impressions: 300000,
      clicks: 20000,
      conversions: 1000,
      revenue: 50000,
      cost: 30000,
      roi: 67,
      conversionRate: 5,
      ctr: 6.7,
      cpc: 1.5,
    },
    trends: {
      impressions: [280000, 290000, 300000],
      conversions: [900, 950, 1000],
      revenue: [45000, 47500, 50000],
    },
    segments: [
      { name: "General", performance: 60 },
      { name: "Local", performance: 55 },
      { name: "Tourist", performance: 50 },
    ],
  },
]

export const ChannelEffectivenessComparison = () => {
  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return "success"
    if (performance >= 60) return "warning"
    return "danger"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Channel Effectiveness</CardTitle>
        <CardDescription>Compare performance across marketing channels</CardDescription>
        <div className="mt-4">
          <Button variant="default" size="sm">
            Export Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {channelData.map((channel) => (
            <div key={channel.id} className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{channel.name}</h4>
                  <Badge variant="secondary" rounded>
                    {channel.type.charAt(0).toUpperCase() + channel.type.slice(1)}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                      channel.metrics.revenue
                    )}
                  </div>
                  <div className="text-sm text-gray-500">Revenue</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">ROI</p>
                  <p className="text-lg font-medium text-gray-900">{channel.metrics.roi}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Conversion Rate</p>
                  <p className="text-lg font-medium text-gray-900">{channel.metrics.conversionRate}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Channel Performance Trends</h4>
            <LineChart
              data={channelData.map((channel) => ({
                label: channel.name,
                value: channel.metrics.revenue
              }))}
            />
          </div>

          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Segment Performance</h4>
            <div className="space-y-4">
              {channelData.map((channel) => (
                <div key={channel.id}>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">{channel.name}</h5>
                  <div className="space-y-2">
                    {channel.segments.map((segment) => (
                      <div key={segment.name} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{segment.name}</span>
                        <div className="flex items-center">
                          <Badge variant={getPerformanceColor(segment.performance) as any} rounded>
                            {segment.performance}%
                          </Badge>
                          {segment.performance > 70 ? (
                            <ArrowUpIcon className="h-4 w-4 text-success-500 ml-1" />
                          ) : (
                            <ArrowDownIcon className="h-4 w-4 text-danger-500 ml-1" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Detailed Metrics</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Channel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Impressions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CTR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPC
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conv. Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ROI
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {channelData.map((channel) => (
                  <tr key={channel.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {channel.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {channel.metrics.impressions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {channel.metrics.clicks.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {channel.metrics.ctr}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                        channel.metrics.cpc
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {channel.metrics.conversions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {channel.metrics.conversionRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                        channel.metrics.cost
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                        channel.metrics.revenue
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {channel.metrics.roi}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

