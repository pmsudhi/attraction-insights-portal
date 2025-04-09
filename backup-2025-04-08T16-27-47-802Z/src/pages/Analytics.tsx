"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs"
import { 
  CloudIcon,
  ChartBarIcon,
  UserGroupIcon,
  CalendarIcon,
  BuildingStorefrontIcon,
  QueueListIcon,
  BellAlertIcon,
  WrenchIcon
} from "@heroicons/react/24/outline"
import WeatherImpactAnalysis from "../components/analytics/WeatherImpactAnalysis"
import WeatherSensitivityAnalysis from "../components/analytics/WeatherSensitivityAnalysis"
import WeatherImpactDetails from "../components/analytics/WeatherImpactDetails"
import { SeasonalIntelligence } from "../components/analytics/SeasonalIntelligence"
import { SustainabilityESGIntelligence } from "../components/analytics/SustainabilityESGIntelligence"

export default function Analytics() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>("weather")

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "sustainability") {
      setActiveTab("sustainability")
    }
  }, [searchParams])

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="weather">
            <CloudIcon className="h-4 w-4 mr-2" />
            Weather Impact
          </TabsTrigger>
          <TabsTrigger value="sensitivity">
            <UserGroupIcon className="h-4 w-4 mr-2" />
            Guest Sensitivity
          </TabsTrigger>
          <TabsTrigger value="details">
            <BuildingStorefrontIcon className="h-4 w-4 mr-2" />
            Impact Details
          </TabsTrigger>
          <TabsTrigger value="seasonal">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Seasonal
          </TabsTrigger>
          <TabsTrigger value="optimization">
            <WrenchIcon className="h-4 w-4 mr-2" />
            Optimization
          </TabsTrigger>
          <TabsTrigger value="sustainability">
            <ChartBarIcon className="h-4 w-4 mr-2" />
            Sustainability
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weather">
          <Card>
            <CardHeader>
              <CardTitle>Weather Impact Analysis</CardTitle>
              <CardDescription>Analysis of weather patterns and their impact on park operations</CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherImpactAnalysis />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sensitivity">
          <Card>
            <CardHeader>
              <CardTitle>Guest Weather Sensitivity</CardTitle>
              <CardDescription>Analysis of how different guest segments respond to weather conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherSensitivityAnalysis />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Weather Impact Details</CardTitle>
              <CardDescription>Detailed analysis of weather impact on attractions, queues, and shows</CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherImpactDetails />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Intelligence</CardTitle>
              <CardDescription>Analysis of seasonal patterns and optimization strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <SeasonalIntelligence />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Optimization</CardTitle>
              <CardDescription>Advanced tools for optimizing seasonal operations and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center text-gray-500">
                Seasonal optimization features are coming soon.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sustainability">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability & ESG Intelligence</CardTitle>
              <CardDescription>Comprehensive analysis of environmental impact, sustainability metrics, and ESG performance</CardDescription>
            </CardHeader>
            <CardContent>
              <SustainabilityESGIntelligence />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

