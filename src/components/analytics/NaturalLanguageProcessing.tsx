"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "../ui/Card"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { ChatBubbleLeftIcon, DocumentTextIcon, ChartBarIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline"
import LineChart from "../charts/LineChart"

interface SentimentData {
  date: string
  positive: number
  neutral: number
  negative: number
}

interface TopicData {
  topic: string
  count: number
  sentiment: "positive" | "neutral" | "negative"
}

interface FeedbackItem {
  id: string
  text: string
  sentiment: "positive" | "neutral" | "negative"
  date: string
  source: string
  topics: string[]
}

export const NaturalLanguageProcessing = () => {
  const [timeframe, setTimeframe] = useState("7d")
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  // Mock sentiment trend data
  const sentimentData: SentimentData[] = [
    { date: "2024-03-28", positive: 65, neutral: 25, negative: 10 },
    { date: "2024-03-29", positive: 68, neutral: 22, negative: 10 },
    { date: "2024-03-30", positive: 72, neutral: 20, negative: 8 },
    { date: "2024-03-31", positive: 70, neutral: 22, negative: 8 },
    { date: "2024-04-01", positive: 75, neutral: 18, negative: 7 },
    { date: "2024-04-02", positive: 78, neutral: 16, negative: 6 },
    { date: "2024-04-03", positive: 80, neutral: 15, negative: 5 },
  ]

  // Mock topic data
  const topicData: TopicData[] = [
    { topic: "Ride Experience", count: 245, sentiment: "positive" },
    { topic: "Food & Beverage", count: 189, sentiment: "neutral" },
    { topic: "Staff Friendliness", count: 178, sentiment: "positive" },
    { topic: "Wait Times", count: 156, sentiment: "negative" },
    { topic: "Cleanliness", count: 142, sentiment: "positive" },
    { topic: "Ticket Pricing", count: 98, sentiment: "negative" },
    { topic: "Parking", count: 87, sentiment: "neutral" },
  ]

  // Mock feedback items
  const feedbackItems: FeedbackItem[] = [
    {
      id: "1",
      text: "The new roller coaster was amazing! Best ride in the park by far.",
      sentiment: "positive",
      date: "2024-04-03",
      source: "Mobile App",
      topics: ["Ride Experience", "New Attractions"]
    },
    {
      id: "2",
      text: "Lines were too long today. Consider adding more staff during peak hours.",
      sentiment: "negative",
      date: "2024-04-02",
      source: "Website",
      topics: ["Wait Times", "Staffing"]
    },
    {
      id: "3",
      text: "Food options were good but a bit expensive for what you get.",
      sentiment: "neutral",
      date: "2024-04-01",
      source: "Social Media",
      topics: ["Food & Beverage", "Pricing"]
    },
    {
      id: "4",
      text: "Staff was incredibly friendly and helpful throughout our visit.",
      sentiment: "positive",
      date: "2024-03-31",
      source: "Email",
      topics: ["Staff Friendliness", "Customer Service"]
    },
    {
      id: "5",
      text: "Park was very clean and well-maintained. Great job!",
      sentiment: "positive",
      date: "2024-03-30",
      source: "Mobile App",
      topics: ["Cleanliness", "Park Maintenance"]
    }
  ]

  // Filter feedback by selected topic
  const filteredFeedback = selectedTopic
    ? feedbackItems.filter(item => item.topics.includes(selectedTopic))
    : feedbackItems

  // Convert sentiment data to LineChart format
  const chartData = sentimentData.map(item => ({
    date: item.date,
    predicted: item.positive,
    actual: item.neutral,
    negative: item.negative
  }))

  return (
    <Card>
      <CardHeader
        title="Natural Language Processing"
        subtitle="Analyze guest feedback and sentiment"
        action={
          <div className="flex space-x-2">
            <Button
              variant={timeframe === "7d" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTimeframe("7d")}
            >
              7D
            </Button>
            <Button
              variant={timeframe === "30d" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTimeframe("30d")}
            >
              30D
            </Button>
            <Button
              variant={timeframe === "90d" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTimeframe("90d")}
            >
              90D
            </Button>
          </div>
        }
      />
      <CardContent>
        <div className="space-y-6">
          {/* Sentiment Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-success-100 rounded-md">
                  <ChatBubbleLeftIcon className="h-5 w-5 text-success-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Positive Sentiment</h3>
                  <p className="mt-1 text-2xl font-semibold text-success-600">80%</p>
                  <p className="mt-1 text-xs text-gray-500">+5% from last period</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-warning-100 rounded-md">
                  <ChatBubbleLeftIcon className="h-5 w-5 text-warning-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Neutral Sentiment</h3>
                  <p className="mt-1 text-2xl font-semibold text-warning-600">15%</p>
                  <p className="mt-1 text-xs text-gray-500">-3% from last period</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-danger-50 border border-danger-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-danger-100 rounded-md">
                  <ChatBubbleLeftIcon className="h-5 w-5 text-danger-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Negative Sentiment</h3>
                  <p className="mt-1 text-2xl font-semibold text-danger-600">5%</p>
                  <p className="mt-1 text-xs text-gray-500">-2% from last period</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                  <DocumentTextIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Feedback Volume</h3>
                  <p className="mt-1 text-2xl font-semibold text-primary-600">1,245</p>
                  <p className="mt-1 text-xs text-gray-500">+12% from last period</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sentiment Trend Chart */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Sentiment Trend</h3>
            <div className="h-80">
              <LineChart
                data={chartData}
                xField="date"
                yFields={["predicted", "actual", "negative"]}
                title="Sentiment Analysis Trend"
              />
            </div>
          </div>

          {/* Topics and Feedback */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Topics */}
            <div className="lg:col-span-1">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Feedback Topics</h3>
              <div className="space-y-2">
                {topicData.map((topic) => (
                  <div
                    key={topic.topic}
                    className={`p-3 rounded-lg cursor-pointer ${
                      selectedTopic === topic.topic
                        ? "bg-primary-50 border border-primary-200"
                        : "bg-white border border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedTopic(selectedTopic === topic.topic ? null : topic.topic)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{topic.topic}</span>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            topic.sentiment === "positive"
                              ? "success"
                              : topic.sentiment === "negative"
                              ? "danger"
                              : "warning"
                          }
                          size="sm"
                        >
                          {topic.count}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Items */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">
                  {selectedTopic ? `Feedback about "${selectedTopic}"` : "Recent Feedback"}
                </h3>
                <Button variant="secondary" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {filteredFeedback.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{item.text}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.topics.map((topic) => (
                            <Badge key={topic} variant="secondary" size="sm">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge
                        variant={
                          item.sentiment === "positive"
                            ? "success"
                            : item.sentiment === "negative"
                            ? "danger"
                            : "warning"
                        }
                        size="sm"
                      >
                        {item.sentiment}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <span>{item.date}</span>
                      <span>Source: {item.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 