import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

interface SentimentAnalysis {
  platform: string
  positive: number
  neutral: number
  negative: number
  sentimentScore: number
  trendingTopics: string[]
  keyPhrases: string[]
}

interface ContentPerformance {
  id: string
  platform: string
  type: string
  title: string
  engagement: number
  reach: number
  clicks: number
  conversions: number
  revenue: number
  bestPerformingTime: string
  recommendations: string[]
}

interface InfluencerCampaign {
  id: string
  influencer: string
  platform: string
  followers: number
  engagement: number
  reach: number
  clicks: number
  conversions: number
  revenue: number
  roi: number
  cost: number
}

const sentimentData: SentimentAnalysis[] = [
  {
    platform: 'Facebook',
    positive: 0.65,
    neutral: 0.25,
    negative: 0.10,
    sentimentScore: 0.78,
    trendingTopics: ['New Attractions', 'Family Fun', 'Special Events'],
    keyPhrases: ['Great experience', 'Family friendly', 'Worth the price']
  },
  {
    platform: 'Instagram',
    positive: 0.70,
    neutral: 0.20,
    negative: 0.10,
    sentimentScore: 0.82,
    trendingTopics: ['Photo Spots', 'Food', 'Shows'],
    keyPhrases: ['Beautiful photos', 'Amazing food', 'Must visit']
  },
  {
    platform: 'Twitter',
    positive: 0.60,
    neutral: 0.30,
    negative: 0.10,
    sentimentScore: 0.75,
    trendingTopics: ['Events', 'Tips', 'Reviews'],
    keyPhrases: ['Great day', 'Fun experience', 'Helpful staff']
  }
]

const contentPerformanceData: ContentPerformance[] = [
  {
    id: 'fb1',
    platform: 'Facebook',
    type: 'Video',
    title: 'Behind the Scenes: New Attraction',
    engagement: 0.08,
    reach: 75000,
    clicks: 5000,
    conversions: 250,
    revenue: 75000,
    bestPerformingTime: '18:00-20:00',
    recommendations: ['Optimize video length', 'Add call-to-action overlay']
  },
  {
    id: 'ig1',
    platform: 'Instagram',
    type: 'Carousel',
    title: 'Top 5 Photo Spots',
    engagement: 0.12,
    reach: 52500,
    clicks: 3500,
    conversions: 175,
    revenue: 52500,
    bestPerformingTime: '12:00-14:00',
    recommendations: ['Add location tags', 'Include user-generated content']
  }
]

const influencerData: InfluencerCampaign[] = [
  {
    id: 'inf1',
    influencer: 'Travel Family Blog',
    platform: 'Instagram',
    followers: 100000,
    engagement: 0.05,
    reach: 75000,
    clicks: 5000,
    conversions: 250,
    revenue: 75000,
    roi: 3.0,
    cost: 25000
  },
  {
    id: 'inf2',
    influencer: 'Adventure Vlogger',
    platform: 'YouTube',
    followers: 500000,
    engagement: 0.04,
    reach: 200000,
    clicks: 10000,
    conversions: 500,
    revenue: 150000,
    roi: 2.5,
    cost: 60000
  }
]

export const SocialMediaAnalytics = () => {
  const [selectedTab, setSelectedTab] = useState('sentiment')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
            <TabsTrigger value="content">Content Performance</TabsTrigger>
            <TabsTrigger value="influencer">Influencer Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="sentiment">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Sentiment Analysis</h3>
                <Button size="sm">Export Report</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Positive</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Neutral</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Negative</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trending Topics</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sentimentData.map((platform) => (
                      <tr key={platform.platform}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{platform.platform}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(platform.positive * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(platform.neutral * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(platform.negative * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(platform.sentimentScore * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{platform.trendingTopics.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Content Performance</h3>
                <Button size="sm">Schedule Post</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reach</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contentPerformanceData.map((content) => (
                      <tr key={content.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{content.platform}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(content.engagement * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.reach.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.conversions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${content.revenue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="influencer">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Influencer Campaign Performance</h3>
                <Button size="sm">New Campaign</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {influencerData.map((campaign) => (
                      <tr key={campaign.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.influencer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.platform}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.followers.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(campaign.engagement * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.conversions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${campaign.revenue.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.roi}x</td>
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