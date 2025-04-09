"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from "../components/ui/Badge"
import {
  CurrencyDollarIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  TagIcon,
  ShoppingBagIcon,
  TicketIcon,
  MegaphoneIcon,
  BoltIcon,
} from "@heroicons/react/24/outline"
import { LineChart, BarChart } from "@/components/ui/charts"

// Import extracted components
import {
  PricingRecommendationEngine,
  CompetitorPriceTracking,
  PriceChangeImpactForecasting,
  MultiChannelPricingOptimization,
  ProductAffinityAnalysis,
  CrossSellOpportunities,
  NewProductImpactProjection,
  PromotionCalendar,
  CampaignPerformanceTracking,
  ChannelEffectivenessComparison,
  ABTestResultsVisualization,
  DiscountImpactAnalysis,
} from "../components/revenue"

import { DynamicPricingEngine } from '../components/revenue/DynamicPricingEngine'
import { ProductMixOptimization } from '../components/revenue/ProductMixOptimization'
import { DigitalEngagementAnalytics } from '../components/revenue/DigitalEngagementAnalytics'
import { MarketingMixModeling } from '../components/revenue/MarketingMixModeling'
import { SocialMediaAnalytics } from '../components/revenue/SocialMediaAnalytics'
import { MobileAppAnalytics } from '../components/revenue/MobileAppAnalytics'

const channelData = [
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
];

const getChannelColor = (channelId: string, alpha = 1) => {
  const colors = {
    email: `rgba(37, 99, 235, ${alpha})`,   // blue-600
    social: `rgba(59, 130, 246, ${alpha})`,  // blue-500
    search: `rgba(96, 165, 250, ${alpha})`,  // blue-400
    display: `rgba(147, 197, 253, ${alpha})`  // blue-300
  };
  return colors[channelId] || `rgba(37, 99, 235, ${alpha})`;
};

export default function Revenue() {
  const [activeTab, setActiveTab] = useState("pricing")
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [selectedChannel, setSelectedChannel] = useState("all")
  const [optimizationTarget, setOptimizationTarget] = useState("revenue")

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Revenue Optimization Center</h1>
          <p className="text-gray-500">Comprehensive analytics and optimization tools for revenue growth</p>
        </div>
        <div className="space-x-4">
          <Button variant="default">
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline">Create Price Rule</Button>
        </div>
      </div>

      <div className="grid gap-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Dynamic Pricing Strategy</h2>
          <PricingRecommendationEngine />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Competitor Analysis</h2>
          <CompetitorPriceTracking />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Price Impact Analysis</h2>
          <PriceChangeImpactForecasting />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Multi-Channel Optimization</h2>
          <MultiChannelPricingOptimization />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Product Analysis</h2>
          <ProductAffinityAnalysis />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Cross-Sell Opportunities</h2>
          <CrossSellOpportunities />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">New Product Impact</h2>
          <NewProductImpactProjection />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Promotion Calendar</h2>
          <PromotionCalendar />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Campaign Performance</h2>
          <CampaignPerformanceTracking />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Channel Effectiveness</h2>
          <ChannelEffectivenessComparison />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">A/B Test Results</h2>
          <ABTestResultsVisualization />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Discount Impact</h2>
          <DiscountImpactAnalysis />
        </section>
      </div>

      {/* Dynamic Pricing content */}
      {activeTab === "pricing" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Average Ticket Price</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">$89.95</p>
                    <Badge variant="default" className="mt-1">+4.2% from last month</Badge>
                  </div>
                  <div className="p-2 bg-primary-50 rounded-md">
                    <TicketIcon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Price Elasticity</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">-0.85</p>
                    <Badge variant="secondary" className="mt-1">Moderately elastic</Badge>
                  </div>
                  <div className="p-2 bg-primary-50 rounded-md">
                    <TagIcon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Per Capita Spending</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">$76.85</p>
                    <Badge variant="default" className="mt-1">+5.4% from last month</Badge>
                  </div>
                  <div className="p-2 bg-primary-50 rounded-md">
                    <ShoppingBagIcon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Revenue per Available Hour</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">$12.45</p>
                    <Badge variant="default" className="mt-1">+3.8% from last month</Badge>
                  </div>
                  <div className="p-2 bg-primary-50 rounded-md">
                    <CurrencyDollarIcon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Use extracted components */}
          <PricingRecommendationEngine />
          <CompetitorPriceTracking />

          <Card>
            <CardHeader>
              <CardTitle>Price Elasticity Analysis</CardTitle>
              <CardDescription>Impact of price changes on demand by segment</CardDescription>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <span className="flex items-center">
                    All Segments
                    <ChevronDownIcon className="h-4 w-4 ml-2" />
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <LineChart 
                  data={[
                    { label: "2024-01", value: 100 },
                    { label: "2024-02", value: 120 },
                    { label: "2024-03", value: 115 },
                    { label: "2024-04", value: 130 }
                  ]}
                  xField="label"
                  yFields={["value"]}
                />
              </div>
            </CardContent>
          </Card>

          <PriceChangeImpactForecasting />
          <MultiChannelPricingOptimization />

          <Card>
            <CardHeader>
              <CardTitle>Real-Time Pricing Recommendations</CardTitle>
              <CardDescription>AI-powered pricing recommendations based on current demand and capacity</CardDescription>
              <div className="mt-4">
                <Button variant="default" size="sm">
                  <span className="flex items-center">
                    <BoltIcon className="h-4 w-4 mr-2" />
                    Apply Recommendations
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guest Segment</label>
                  <select
                    value={selectedSegment}
                    onChange={(e) => setSelectedSegment(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    aria-label="Select segment"
                  >
                    <option value="all">All Segments</option>
                    <option value="families">Families</option>
                    <option value="young-adults">Young Adults</option>
                    <option value="seniors">Seniors</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sales Channel</label>
                  <select
                    value={selectedChannel}
                    onChange={(e) => setSelectedChannel(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    aria-label="Select channel"
                  >
                    <option value="all">All Channels</option>
                    <option value="direct">Direct Website</option>
                    <option value="ota">OTA Partners</option>
                    <option value="mobile">Mobile App</option>
                    <option value="group">Group Sales</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Optimization Target</label>
                  <select
                    value={optimizationTarget}
                    onChange={(e) => setOptimizationTarget(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    aria-label="Select optimization target"
                  >
                    <option value="revenue">Revenue</option>
                    <option value="profit">Profit</option>
                    <option value="attendance">Attendance</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Ticket Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Current Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Recommended Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Change
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Projected Impact
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Confidence
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">1-Day Adult</div>
                        <div className="text-xs text-gray-500">Standard</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">$89.99</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-primary-600">$94.99</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="default">+5.6%</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">+$42K Revenue</div>
                        <div className="text-xs text-gray-500">-2.1% Volume</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: "85%" }} />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">High (85%)</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button variant="outline" size="sm">
                          Apply
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Price Optimization Recommendations</CardTitle>
              <CardDescription>AI-generated pricing recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-1 bg-green-100 rounded-md">
                      <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Increase Weekend Prices</h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Demand analysis shows opportunity to increase weekend prices by 5-8% without significant
                        impact on attendance.
                      </p>
                      <div className="mt-2">
                        <Badge variant="secondary">Optimized</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-1 bg-blue-100 rounded-md">
                      <TagIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Optimize Multi-Day Tickets</h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Current 3-day ticket pricing is suboptimal. Recommend adjusting to encourage longer stays.
                      </p>
                      <div className="mt-2">
                        <Badge variant="outline">Adjustment Needed</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-1 bg-yellow-100 rounded-md">
                      <ShoppingBagIcon className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Bundle Premium Experiences</h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Create premium bundles combining admission with VIP experiences to increase per capita
                        spending.
                      </p>
                      <div className="mt-2">
                        <Badge variant="secondary">Success</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Product Mix content */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance Analysis</CardTitle>
              <CardDescription>Performance metrics for ticket types and packages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <BarChart 
                  data={[
                    { label: "Single-Day", value: 42.5 },
                    { label: "Multi-Day", value: 18.2 },
                    { label: "Season Pass", value: 15.8 },
                    { label: "VIP", value: 8.4 },
                    { label: "Group", value: 7.9 }
                  ]}
                  xField="label"
                  yFields={["value"]}
                />
              </div>
            </CardContent>
          </Card>

          <ProductAffinityAnalysis />
          <CrossSellOpportunities />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Product Mix</CardTitle>
                <CardDescription>Revenue contribution by product type</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Revenue
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          % of Total
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          YOY Change
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Profit Margin
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Single-Day Tickets</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">$42.5M</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">45.8%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-success-600">+8.2%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">62.4%</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Multi-Day Passes</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">$18.2M</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">19.6%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-success-600">+12.5%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">68.1%</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Season Passes</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">$15.8M</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">17.0%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-success-600">+5.3%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">72.5%</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">VIP Experiences</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">$8.4M</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">9.1%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-success-600">+18.7%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">78.2%</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Group Sales</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">$7.9M</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">8.5%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-danger-600">-2.1%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">54.8%</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <NewProductImpactProjection />
          </div>
        </div>
      )}

      {/* Promotions content */}
      {activeTab === "promotions" && (
        <div className="space-y-6">
          <PromotionCalendar />
          <CampaignPerformanceTracking />

          <Card>
            <CardHeader>
              <CardTitle>Promotion Effectiveness</CardTitle>
              <CardDescription>Performance metrics for current and past promotions</CardDescription>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <span className="flex items-center">
                    Last 90 Days
                    <ChevronDownIcon className="h-4 w-4 ml-2" />
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Promotion
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Channel
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Redemptions
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Revenue
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Cost
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ROI
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-md flex items-center justify-center">
                            <MegaphoneIcon className="h-6 w-6 text-primary-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Summer Family Package</div>
                            <div className="text-xs text-gray-500">Jun 1 - Aug 31</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Email, Social</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">4,285</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">$845,230</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">$125,000</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-success-600">576%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary">Active</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-secondary-100 rounded-md flex items-center justify-center">
                            <MegaphoneIcon className="h-6 w-6 text-secondary-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Spring Break Special</div>
                            <div className="text-xs text-gray-500">Mar 1 - Apr 15</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Email, Display</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">3,124</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">$624,800</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">$95,000</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-success-600">557%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline">Completed</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-warning-100 rounded-md flex items-center justify-center">
                            <MegaphoneIcon className="h-6 w-6 text-warning-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Local Resident Discount</div>
                            <div className="text-xs text-gray-500">Year-round</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Local Media, Direct</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">2,845</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">$426,750</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">$85,000</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-success-600">402%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary">Active</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Channel Performance</CardTitle>
              <CardDescription>Revenue distribution across channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <BarChart 
                  data={[
                    { label: 'Direct', value: 1200000 },
                    { label: 'OTA', value: 800000 },
                    { label: 'Travel Agent', value: 600000 },
                    { label: 'Corporate', value: 400000 }
                  ]}
                  xField="label"
                  yFields={["value"]}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Promotion Performance</CardTitle>
              <CardDescription>Impact of promotional campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Summer Special</p>
                    <Badge variant="secondary">+15% Conversion</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$45,000</p>
                    <p className="text-xs text-gray-500">Revenue</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Early Bird</p>
                    <Badge variant="outline">+8% Conversion</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$32,000</p>
                    <p className="text-xs text-gray-500">Revenue</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Group Discount</p>
                    <Badge variant="outline">+12% Conversion</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$28,000</p>
                    <p className="text-xs text-gray-500">Revenue</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Channel Effectiveness</CardTitle>
              <CardDescription>Compare performance across marketing channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {channelData.map((channel) => (
                  <div key={channel.id} className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{channel.name}</h4>
                        <Badge variant="secondary">
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
                    data={channelData.map(channel => ({
                      label: channel.name,
                      value: channel.metrics.revenue
                    }))}
                    xField="label"
                    yFields={["value"]}
                  />
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Segment Performance</h4>
                  <BarChart
                    data={channelData[0].segments.map(segment => ({
                      label: segment.name,
                      value: segment.performance
                    }))}
                    xField="label"
                    yFields={["value"]}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <ChannelEffectivenessComparison />
          <ABTestResultsVisualization />
          <DiscountImpactAnalysis />
        </div>
      )}
    </div>
  )
}

