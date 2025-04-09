import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { LineChart, BarChart } from '@/components/ui/charts'

interface MarketingMixModel {
  channel: string
  spend: number
  contribution: number
  roi: number
  elasticity: number
  optimalSpend: number
  recommendations: string[]
}

interface ConversionOptimization {
  page: string
  visitors: number
  conversions: number
  rate: number
  revenue: number
  improvement: number
  recommendations: string[]
}

interface PriceElasticityModel {
  product: string
  currentPrice: number
  optimalPrice: number
  elasticity: number
  revenueImpact: number
  confidence: number
}

interface CompetitivePositioning {
  competitor: string
  product: string
  ourPrice: number
  theirPrice: number
  priceGap: number
  marketShare: number
  recommendations: string[]
}

const marketingMixData: MarketingMixModel[] = [
  {
    channel: 'Digital Advertising',
    spend: 500000,
    contribution: 1500000,
    roi: 3.0,
    elasticity: 0.8,
    optimalSpend: 600000,
    recommendations: ['Increase spend on high-performing campaigns', 'Optimize targeting parameters']
  },
  {
    channel: 'Social Media',
    spend: 300000,
    contribution: 900000,
    roi: 3.0,
    elasticity: 0.6,
    optimalSpend: 350000,
    recommendations: ['Enhance content strategy', 'Increase influencer partnerships']
  },
  {
    channel: 'Email Marketing',
    spend: 100000,
    contribution: 400000,
    roi: 4.0,
    elasticity: 0.4,
    optimalSpend: 120000,
    recommendations: ['Improve segmentation', 'Personalize content']
  }
]

const conversionData: ConversionOptimization[] = [
  {
    page: 'Homepage',
    visitors: 100000,
    conversions: 5000,
    rate: 0.05,
    revenue: 250000,
    improvement: 0.15,
    recommendations: ['Optimize hero section', 'Add social proof']
  },
  {
    page: 'Product Pages',
    visitors: 75000,
    conversions: 3750,
    rate: 0.05,
    revenue: 187500,
    improvement: 0.20,
    recommendations: ['Enhance product images', 'Add customer reviews']
  },
  {
    page: 'Checkout',
    visitors: 3750,
    conversions: 1875,
    rate: 0.50,
    revenue: 93750,
    improvement: 0.10,
    recommendations: ['Simplify checkout process', 'Add trust badges']
  }
]

const priceElasticityData: PriceElasticityModel[] = [
  {
    product: 'Single Day Adult',
    currentPrice: 85.00,
    optimalPrice: 89.99,
    elasticity: -1.8,
    revenueImpact: 0.12,
    confidence: 0.92
  },
  {
    product: 'Family Pass',
    currentPrice: 299.99,
    optimalPrice: 319.99,
    elasticity: -1.5,
    revenueImpact: 0.15,
    confidence: 0.88
  },
  {
    product: 'Season Pass',
    currentPrice: 189.99,
    optimalPrice: 199.99,
    elasticity: -1.2,
    revenueImpact: 0.08,
    confidence: 0.85
  }
]

const competitiveData: CompetitivePositioning[] = [
  {
    competitor: 'Competitor A',
    product: 'Single Day Adult',
    ourPrice: 85.00,
    theirPrice: 79.99,
    priceGap: 0.06,
    marketShare: 0.45,
    recommendations: ['Highlight value-add features', 'Consider targeted promotions']
  },
  {
    competitor: 'Competitor B',
    product: 'Family Pass',
    ourPrice: 299.99,
    theirPrice: 289.99,
    priceGap: 0.03,
    marketShare: 0.35,
    recommendations: ['Emphasize unique experiences', 'Bundle with popular attractions']
  },
  {
    competitor: 'Competitor C',
    product: 'Season Pass',
    ourPrice: 189.99,
    theirPrice: 199.99,
    priceGap: -0.05,
    marketShare: 0.20,
    recommendations: ['Maintain premium positioning', 'Enhance member benefits']
  }
]

export const MarketingMixModeling = () => {
  const [selectedTab, setSelectedTab] = useState('mix')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketing Mix & Conversion Optimization</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="mix">Marketing Mix</TabsTrigger>
            <TabsTrigger value="conversion">Conversion Rate</TabsTrigger>
            <TabsTrigger value="elasticity">Price Elasticity</TabsTrigger>
            <TabsTrigger value="competitive">Competitive Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="mix">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Marketing Mix Analysis</h3>
                <Button size="sm">Update Model</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spend</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contribution</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Elasticity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Optimal Spend</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {marketingMixData.map((item) => (
                      <tr key={item.channel}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.channel}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.spend.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.contribution.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.roi}x</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.elasticity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.optimalSpend.toLocaleString()}</td>
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
                <h3 className="text-lg font-medium">Conversion Rate Optimization</h3>
                <Button size="sm">Run A/B Test</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {conversionData.map((page) => (
                  <Card key={page.page}>
                    <CardContent className="pt-6">
                      <h4 className="text-lg font-medium mb-4">{page.page}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Visitors</span>
                          <span className="text-sm font-medium">{page.visitors.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Conversion Rate</span>
                          <span className="text-sm font-medium">{(page.rate * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Revenue</span>
                          <span className="text-sm font-medium">${page.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Improvement Potential</span>
                          <span className="text-sm font-medium text-green-600">{(page.improvement * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="elasticity">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Price Elasticity Analysis</h3>
                <Button size="sm">Update Model</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Optimal Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Elasticity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Impact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {priceElasticityData.map((item) => (
                      <tr key={item.product}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.currentPrice.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.optimalPrice.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.elasticity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item.revenueImpact * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item.confidence * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="competitive">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Competitive Price Positioning</h3>
                <Button size="sm">Update Analysis</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competitor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Our Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Their Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Gap</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Share</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {competitiveData.map((item) => (
                      <tr key={`${item.competitor}-${item.product}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.competitor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.ourPrice.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.theirPrice.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item.priceGap * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item.marketShare * 100).toFixed(1)}%</td>
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