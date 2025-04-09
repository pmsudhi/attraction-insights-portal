import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

interface UserEngagement {
  metric: string
  daily: number
  weekly: number
  monthly: number
  trend: number
  change: number
}

interface FeatureUsage {
  feature: string
  activeUsers: number
  sessions: number
  avgTimeSpent: number
  retention: number
  satisfaction: number
  recommendations: string[]
}

interface AppConversion {
  stage: string
  users: number
  dropoffs: number
  conversionRate: number
  revenue: number
  avgTimeToConvert: number
  improvement: string[]
}

const userEngagementData: UserEngagement[] = [
  {
    metric: 'Active Users',
    daily: 5000,
    weekly: 25000,
    monthly: 100000,
    trend: 0.15,
    change: 0.08
  },
  {
    metric: 'Session Duration',
    daily: 15,
    weekly: 12,
    monthly: 10,
    trend: -0.05,
    change: -0.02
  },
  {
    metric: 'Session Frequency',
    daily: 3,
    weekly: 8,
    monthly: 25,
    trend: 0.10,
    change: 0.05
  }
]

const featureUsageData: FeatureUsage[] = [
  {
    feature: 'Ticket Booking',
    activeUsers: 75000,
    sessions: 150000,
    avgTimeSpent: 5,
    retention: 0.85,
    satisfaction: 0.92,
    recommendations: ['Add quick booking option', 'Implement saved preferences']
  },
  {
    feature: 'Interactive Map',
    activeUsers: 60000,
    sessions: 120000,
    avgTimeSpent: 8,
    retention: 0.78,
    satisfaction: 0.88,
    recommendations: ['Add AR navigation', 'Include wait times']
  },
  {
    feature: 'Virtual Queue',
    activeUsers: 45000,
    sessions: 90000,
    avgTimeSpent: 3,
    retention: 0.82,
    satisfaction: 0.90,
    recommendations: ['Add notifications', 'Show estimated wait times']
  }
]

const conversionData: AppConversion[] = [
  {
    stage: 'App Install',
    users: 100000,
    dropoffs: 0,
    conversionRate: 1.0,
    revenue: 0,
    avgTimeToConvert: 0,
    improvement: ['Optimize app store listing', 'Improve app preview']
  },
  {
    stage: 'Account Creation',
    users: 80000,
    dropoffs: 20000,
    conversionRate: 0.8,
    revenue: 0,
    avgTimeToConvert: 2,
    improvement: ['Simplify signup process', 'Add social login options']
  },
  {
    stage: 'Ticket Purchase',
    users: 40000,
    dropoffs: 40000,
    conversionRate: 0.4,
    revenue: 1200000,
    avgTimeToConvert: 5,
    improvement: ['Add express checkout', 'Implement saved payment methods']
  }
]

export const MobileAppAnalytics = () => {
  const [selectedTab, setSelectedTab] = useState('engagement')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mobile App Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="engagement">User Engagement</TabsTrigger>
            <TabsTrigger value="features">Feature Usage</TabsTrigger>
            <TabsTrigger value="conversion">Conversion Funnel</TabsTrigger>
          </TabsList>

          <TabsContent value="engagement">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">User Engagement Metrics</h3>
                <Button size="sm">Export Report</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weekly</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userEngagementData.map((metric) => (
                      <tr key={metric.metric}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{metric.metric}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{metric.daily.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{metric.weekly.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{metric.monthly.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(metric.trend * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(metric.change * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Feature Usage Analysis</h3>
                <Button size="sm">Add Feature</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Users</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time (min)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retention</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {featureUsageData.map((feature) => (
                      <tr key={feature.feature}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feature.feature}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feature.activeUsers.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feature.sessions.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feature.avgTimeSpent}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(feature.retention * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(feature.satisfaction * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="conversion">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Conversion Funnel Analysis</h3>
                <Button size="sm">Optimize Funnel</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dropoffs</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time (min)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {conversionData.map((stage) => (
                      <tr key={stage.stage}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stage.stage}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stage.users.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stage.dropoffs.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(stage.conversionRate * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${stage.revenue.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stage.avgTimeToConvert}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 