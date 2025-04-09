"use client"

import React, { useState } from "react"
import { Card, CardContent } from "../ui/Card"
import {
  BoltIcon,
  TrashIcon,
  BeakerIcon,
  SparklesIcon,
  SunIcon,
  CloudIcon,
  ArrowPathIcon,
  ArrowDownIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline"
import { sustainabilityData } from "../../utils/sustainability-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs"

interface SustainabilityMetrics {
  energyMetrics: {
    totalConsumption: number
    yearOverYearChange: number
    renewablePercentage: number
    efficiencyScore: number
    byAttraction: Array<{
      consumption: number
      efficiency: number
    }>
  }
  wasteMetrics: {
    totalWaste: number
    yearOverYearChange: number
    recyclingRate: number
    landfillDiversion: number
    byCategory: Array<{
      amount: number
      recycled: number
    }>
  }
  waterConservation: {
    totalUsage: number
    efficiencyScore: number
  }
}

export function SustainabilityESGIntelligence() {
  const [activeTab, setActiveTab] = useState("energy")

  const {
    energyMetrics,
    wasteMetrics,
    waterConservation
  } = sustainabilityData

  return (
    <Card>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Sustainability & ESG Intelligence</h2>
            <div className="flex items-center space-x-2">
              <button
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-primary-50 text-primary-700 hover:bg-primary-100"
                onClick={() => setActiveTab("energy")}
              >
                <BoltIcon className="w-4 h-4 mr-1.5" />
                Energy
              </button>
              <button
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-primary-50 text-primary-700 hover:bg-primary-100"
                onClick={() => setActiveTab("waste")}
              >
                <TrashIcon className="w-4 h-4 mr-1.5" />
                Waste
              </button>
              <button
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-primary-50 text-primary-700 hover:bg-primary-100"
                onClick={() => setActiveTab("water")}
              >
                <BeakerIcon className="w-4 h-4 mr-1.5" />
                Water
              </button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="energy">Energy Efficiency</TabsTrigger>
              <TabsTrigger value="waste">Waste Management</TabsTrigger>
              <TabsTrigger value="water">Water Conservation</TabsTrigger>
            </TabsList>

            <TabsContent value="energy">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                      <BoltIcon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Energy Usage</h3>
                      <p className="mt-1 text-2xl font-semibold text-primary-600">
                        {energyMetrics.totalConsumption} MWh
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Change: {energyMetrics.yearOverYearChange}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                      <SunIcon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Renewable Energy</h3>
                      <p className="mt-1 text-2xl font-semibold text-primary-600">
                        {energyMetrics.renewablePercentage}%
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Efficiency: {energyMetrics.efficiencyScore}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                      <CloudIcon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">By Attraction</h3>
                      <p className="mt-1 text-2xl font-semibold text-primary-600">
                        {energyMetrics.byAttraction[0].consumption} MWh
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Efficiency: {energyMetrics.byAttraction[0].efficiency}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="waste">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                      <TrashIcon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Waste Generation</h3>
                      <p className="mt-1 text-2xl font-semibold text-primary-600">
                        {wasteMetrics.totalWaste} tons
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Change: {wasteMetrics.yearOverYearChange}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                      <ArrowPathIcon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Recycling Rate</h3>
                      <p className="mt-1 text-2xl font-semibold text-primary-600">
                        {wasteMetrics.recyclingRate}%
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Landfill Diversion: {wasteMetrics.landfillDiversion}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                      <SparklesIcon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">By Category</h3>
                      <p className="mt-1 text-2xl font-semibold text-primary-600">
                        {wasteMetrics.byCategory[0].amount} tons
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Recycled: {wasteMetrics.byCategory[0].recycled}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="water">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                      <BeakerIcon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Water Usage</h3>
                      <p className="mt-1 text-2xl font-semibold text-primary-600">
                        {waterConservation.totalUsage} m³
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Efficiency: {waterConservation.efficiencyScore}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                      <ArrowDownIcon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Cost Savings</h3>
                      <p className="mt-1 text-2xl font-semibold text-primary-600">
                        ${waterConservation.costSavings.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Efficiency Score: {waterConservation.efficiencyScore}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                      <ShieldCheckIcon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Quality Score</h3>
                      <p className="mt-1 text-2xl font-semibold text-primary-600">
                        {waterConservation.efficiencyScore}/100
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Based on latest tests
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
} 