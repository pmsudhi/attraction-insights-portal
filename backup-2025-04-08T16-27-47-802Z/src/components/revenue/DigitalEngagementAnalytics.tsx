import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { LineChart, BarChart } from '@/components/ui/charts'

interface CustomerAcquisitionCost {
  channel: string
  cost: number
  conversions: number
  cac: number
  trend: number
  roi: number
  recommendations: string[]
}

interface DigitalEngagementMetrics {
  platform: string
  visitors: number
  engagement: number
  conversion: number
  bounceRate: number
  avgTimeOnSite: number
  revenue: number
}

interface SocialMediaMetrics {
  platform: string
  followers: number
  engagement: number
  reach: number
  clicks: number
  conversions: number
  revenue: number
}

interface MobileAppMetrics {
  metric: string
  value: number
  change: number
  target: number
  status: 'above' | 'below' | 'on-track'
}

interface MultiTouchAttribution {
  channel: string
  touchpoints: number
  firstTouch: number
  lastTouch: number
  assistedConversions: number
  directConversions: number
  revenue: number
  attributionModel: string
}

interface ConversionFunnel {
  stage: string
  visitors: number
  dropoffs: number
  conversionRate: number
  revenue: number
  avgTimeInStage: number
  improvement: number
  recommendations: string[]
}

interface ABTestResult {
  id: string
  name: string
  variant: string
  visitors: number
  conversions: number
  conversionRate: number
  revenue: number
  confidence: number
  winner: boolean
  recommendations: string[]
}

const customerAcquisitionData: CustomerAcquisitionCost[] = [
  {
    channel: 'Google Ads',
    cost: 25000,
    conversions: 1250,
    cac: 20,
    trend: -0.15,
    roi: 3.2,
    recommendations: ['Optimize keyword targeting', 'Increase budget for high-performing campaigns']
  },
  {
    channel: 'Social Media',
    cost: 15000,
    conversions: 750,
    cac: 20,
    trend: -0.08,
    roi: 2.8,
    recommendations: ['Enhance content strategy', 'Target lookalike audiences']
  },
  {
    channel: 'Email Marketing',
    cost: 5000,
    conversions: 500,
    cac: 10,
    trend: -0.05,
    roi: 4.5,
    recommendations: ['Segment email lists', 'Personalize content']
  }
]

const digitalEngagementData: DigitalEngagementMetrics[] = [
  {
    platform: 'Website',
    visitors: 150000,
    engagement: 0.65,
    conversion: 0.03,
    bounceRate: 0.35,
    avgTimeOnSite: 4.5,
    revenue: 450000
  },
  {
    platform: 'Mobile Web',
    visitors: 100000,
    engagement: 0.58,
    conversion: 0.025,
    bounceRate: 0.42,
    avgTimeOnSite: 3.8,
    revenue: 250000
  }
]

const socialMediaData: SocialMediaMetrics[] = [
  {
    platform: 'Facebook',
    followers: 50000,
    engagement: 0.04,
    reach: 75000,
    clicks: 5000,
    conversions: 250,
    revenue: 75000
  },
  {
    platform: 'Instagram',
    followers: 35000,
    engagement: 0.06,
    reach: 52500,
    clicks: 3500,
    conversions: 175,
    revenue: 52500
  },
  {
    platform: 'Twitter',
    followers: 25000,
    engagement: 0.03,
    reach: 37500,
    clicks: 2500,
    conversions: 125,
    revenue: 37500
  }
]

const mobileAppMetrics: MobileAppMetrics[] = [
  {
    metric: 'Daily Active Users',
    value: 15000,
    change: 0.15,
    target: 20000,
    status: 'below'
  },
  {
    metric: 'Session Duration',
    value: 8.5,
    change: 0.10,
    target: 10,
    status: 'below'
  },
  {
    metric: 'Booking Conversion',
    value: 0.25,
    change: 0.05,
    target: 0.20,
    status: 'above'
  }
]

const multiTouchData: MultiTouchAttribution[] = [
  {
    channel: 'Google Ads',
    touchpoints: 3.2,
    firstTouch: 0.35,
    lastTouch: 0.25,
    assistedConversions: 450,
    directConversions: 800,
    revenue: 375000,
    attributionModel: 'Time Decay'
  },
  {
    channel: 'Social Media',
    touchpoints: 2.8,
    firstTouch: 0.30,
    lastTouch: 0.20,
    assistedConversions: 300,
    directConversions: 450,
    revenue: 225000,
    attributionModel: 'Time Decay'
  },
  {
    channel: 'Email Marketing',
    touchpoints: 2.5,
    firstTouch: 0.15,
    lastTouch: 0.35,
    assistedConversions: 200,
    directConversions: 300,
    revenue: 150000,
    attributionModel: 'Time Decay'
  }
]

const conversionFunnelData: ConversionFunnel[] = [
  {
    stage: 'Landing Page',
    visitors: 100000,
    dropoffs: 25000,
    conversionRate: 0.75,
    revenue: 0,
    avgTimeInStage: 45,
    improvement: 0.15,
    recommendations: ['Optimize page load speed', 'Improve value proposition']
  },
  {
    stage: 'Product Selection',
    visitors: 75000,
    dropoffs: 15000,
    conversionRate: 0.80,
    revenue: 0,
    avgTimeInStage: 120,
    improvement: 0.20,
    recommendations: ['Enhance product filtering', 'Add comparison feature']
  },
  {
    stage: 'Cart',
    visitors: 60000,
    dropoffs: 12000,
    conversionRate: 0.80,
    revenue: 0,
    avgTimeInStage: 180,
    improvement: 0.10,
    recommendations: ['Add progress indicator', 'Show shipping estimate']
  },
  {
    stage: 'Checkout',
    visitors: 48000,
    dropoffs: 24000,
    conversionRate: 0.50,
    revenue: 1200000,
    avgTimeInStage: 240,
    improvement: 0.25,
    recommendations: ['Simplify form fields', 'Add trust badges']
  }
]

const abTestResults: ABTestResult[] = [
  {
    id: 'test1',
    name: 'Homepage Hero Section',
    variant: 'A',
    visitors: 50000,
    conversions: 2500,
    conversionRate: 0.05,
    revenue: 125000,
    confidence: 0.95,
    winner: true,
    recommendations: ['Implement variant A', 'Further optimize CTA']
  },
  {
    id: 'test1',
    name: 'Homepage Hero Section',
    variant: 'B',
    visitors: 50000,
    conversions: 2000,
    conversionRate: 0.04,
    revenue: 100000,
    confidence: 0.95,
    winner: false,
    recommendations: ['Archive variant B', 'Test new hero concepts']
  }
]

export const DigitalEngagementAnalytics = () => {
  const [selectedTab, setSelectedTab] = useState('acquisition')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Digital Engagement Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="acquisition">Customer Acquisition</TabsTrigger>
            <TabsTrigger value="attribution">Multi-Touch Attribution</TabsTrigger>
            <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
            <TabsTrigger value="abtesting">A/B Testing</TabsTrigger>
            <TabsTrigger value="engagement">Digital Engagement</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="mobile">Mobile App</TabsTrigger>
          </TabsList>

          <TabsContent value="acquisition">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Customer Acquisition Cost by Channel</h3>
                <Button size="sm">Export Report</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CAC</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customerAcquisitionData.map((item) => (
                      <tr key={item.channel}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.channel}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.cost.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.conversions.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.cac}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item.trend * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.roi}x</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attribution">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Multi-Touch Attribution Analysis</h3>
                <Button size="sm">Export Report</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Touchpoints</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Touch %</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Touch %</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assisted Conv.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Direct Conv.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {multiTouchData.map((channel) => (
                      <tr key={channel.channel}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{channel.channel}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{channel.touchpoints}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(channel.firstTouch * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(channel.lastTouch * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{channel.assistedConversions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{channel.directConversions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${channel.revenue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="funnel">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Conversion Funnel Analysis</h3>
                <Button size="sm">View Details</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitors</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dropoffs</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conv. Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Improvement</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {conversionFunnelData.map((stage) => (
                      <tr key={stage.stage}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stage.stage}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stage.visitors.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stage.dropoffs.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(stage.conversionRate * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stage.avgTimeInStage}s</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(stage.improvement * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="abtesting">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">A/B Test Results</h3>
                <Button size="sm">New Test</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitors</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conv. Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winner</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {abTestResults.map((test) => (
                      <tr key={`${test.id}-${test.variant}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{test.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.variant}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.visitors.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(test.conversionRate * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${test.revenue.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(test.confidence * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.winner ? 'Yes' : 'No'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="engagement">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Digital Engagement Metrics</h3>
                <Button size="sm">View Details</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {digitalEngagementData.map((platform) => (
                  <Card key={platform.platform}>
                    <CardContent className="pt-6">
                      <h4 className="text-lg font-medium mb-4">{platform.platform}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Visitors</span>
                          <span className="text-sm font-medium">{platform.visitors.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Engagement Rate</span>
                          <span className="text-sm font-medium">{(platform.engagement * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Conversion Rate</span>
                          <span className="text-sm font-medium">{(platform.conversion * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Revenue</span>
                          <span className="text-sm font-medium">${platform.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Social Media Performance</h3>
                <Button size="sm">Schedule Post</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reach</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {socialMediaData.map((platform) => (
                      <tr key={platform.platform}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{platform.platform}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{platform.followers.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(platform.engagement * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{platform.reach.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{platform.conversions.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${platform.revenue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mobile">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Mobile App Performance</h3>
                <Button size="sm">View Analytics</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mobileAppMetrics.map((metric) => (
                  <Card key={metric.metric}>
                    <CardContent className="pt-6">
                      <h4 className="text-lg font-medium mb-2">{metric.metric}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Current</span>
                          <span className="text-sm font-medium">{metric.value.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Change</span>
                          <span className={`text-sm font-medium ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {(metric.change * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Target</span>
                          <span className="text-sm font-medium">{metric.target.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 