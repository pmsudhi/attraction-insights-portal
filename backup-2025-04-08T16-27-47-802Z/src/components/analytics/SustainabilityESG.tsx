"use client"

import React, { ReactNode } from "react"
import { Card, CardContent } from "../ui/Card"
import {
  BoltIcon,
  TrashIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  ArrowDownIcon,
  BeakerIcon,
  SparklesIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline"
import { sustainabilityData } from "../../utils/sustainability-data"
import RegulatoryCompliance from './RegulatoryCompliance'
import StakeholderReporting from './StakeholderReporting'

interface CardProps {
  children: ReactNode;
}

const renderCard = ({ children }: CardProps) => (
  <Card>
    <CardContent className="p-6">{children}</CardContent>
  </Card>
)

export default function SustainabilityESG(): React.ReactElement {
  const { energyMetrics, wasteMetrics, carbonFootprint, esgMetrics, sustainabilityGoals, waterConservation, circularEconomy } = sustainabilityData

  return (
    <div className="space-y-8">
      {/* Energy Efficiency Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Energy Efficiency</h3>
                <BoltIcon className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Efficiency Score</p>
                  <p className="text-2xl font-bold">{energyMetrics.efficiencyScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">YoY Change</p>
                  <div className="flex items-center">
                    {energyMetrics.yearOverYearChange < 0 ? (
                      <ArrowDownIcon className="h-5 w-5 text-green-500 mr-1" />
                    ) : (
                      <ArrowPathIcon className="h-5 w-5 text-red-500 mr-1" />
                    )}
                    <p className={`text-lg font-semibold ${energyMetrics.yearOverYearChange < 0 ? "text-green-500" : "text-red-500"}`}>
                      {Math.abs(energyMetrics.yearOverYearChange)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        })}

        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Energy by Attraction</h3>
                <ChartBarIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="space-y-4">
                {energyMetrics.byAttraction.map((attraction) => (
                  <div key={attraction.name} className="flex items-center justify-between">
                    <span className="text-sm">{attraction.name}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{attraction.consumption} MWh</span>
                      <span className="text-sm font-medium">{attraction.efficiency}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        })}
      </div>

      {/* Waste Management Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Waste Diversion</h3>
                <TrashIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Diversion Rate</p>
                  <p className="text-2xl font-bold">{wasteMetrics.landfillDiversion}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">YoY Change</p>
                  <div className="flex items-center">
                    {wasteMetrics.yearOverYearChange > 0 ? (
                      <ArrowPathIcon className="h-5 w-5 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-5 w-5 text-red-500 mr-1" />
                    )}
                    <p className={`text-lg font-semibold ${wasteMetrics.yearOverYearChange > 0 ? "text-green-500" : "text-red-500"}`}>
                      {Math.abs(wasteMetrics.yearOverYearChange)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        })}

        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Waste by Category</h3>
                <ChartBarIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="space-y-4">
                {wasteMetrics.byCategory.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <span className="text-sm">{category.name}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{category.amount} tons</span>
                      <span className="text-sm font-medium">{category.recycled}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        })}
      </div>

      {/* Carbon Footprint Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Carbon Reduction</h3>
                <SparklesIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">YoY Change</p>
                  <div className="flex items-center">
                    {carbonFootprint.yearOverYearChange < 0 ? (
                      <ArrowDownIcon className="h-5 w-5 text-green-500 mr-1" />
                    ) : (
                      <ArrowPathIcon className="h-5 w-5 text-red-500 mr-1" />
                    )}
                    <p className={`text-lg font-semibold ${carbonFootprint.yearOverYearChange < 0 ? "text-green-500" : "text-red-500"}`}>
                      {Math.abs(carbonFootprint.yearOverYearChange)}%
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reduction Target</p>
                  <p className="text-2xl font-bold">{carbonFootprint.reductionTarget}%</p>
                </div>
              </div>
            </div>
          ),
        })}

        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Emissions by Source</h3>
                <ChartBarIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="space-y-4">
                {carbonFootprint.bySource.map((source) => (
                  <div key={source.name} className="flex items-center justify-between">
                    <span className="text-sm">{source.name}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{source.emissions} tCO2e</span>
                      <span className="text-sm font-medium">{source.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        })}
      </div>

      {/* ESG Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Environmental</h3>
                <SparklesIcon className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-3xl font-bold mb-4">{esgMetrics.environmental.score}</p>
              <div className="space-y-2">
                {esgMetrics.environmental.initiatives.map((initiative) => (
                  <div key={initiative.name} className="flex items-center justify-between">
                    <span className="text-sm">{initiative.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      initiative.status === "Completed" ? "bg-green-100 text-green-800" :
                      initiative.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {initiative.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ),
        })}

        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Social</h3>
                <UserGroupIcon className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-3xl font-bold mb-4">{esgMetrics.social.score}</p>
              <div className="space-y-2">
                {esgMetrics.social.initiatives.map((initiative) => (
                  <div key={initiative.name} className="flex items-center justify-between">
                    <span className="text-sm">{initiative.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      initiative.status === "Completed" ? "bg-green-100 text-green-800" :
                      initiative.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {initiative.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ),
        })}

        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Governance</h3>
                <ShieldCheckIcon className="h-6 w-6 text-purple-500" />
              </div>
              <p className="text-3xl font-bold mb-4">{esgMetrics.governance.score}</p>
              <div className="space-y-2">
                {esgMetrics.governance.initiatives.map((initiative) => (
                  <div key={initiative.name} className="flex items-center justify-between">
                    <span className="text-sm">{initiative.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      initiative.status === "Completed" ? "bg-green-100 text-green-800" :
                      initiative.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {initiative.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ),
        })}
      </div>

      {/* Sustainability Goals Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Short-term Goals</h3>
                <ArrowPathIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="space-y-4">
                {sustainabilityGoals.shortTerm.map((goal) => (
                  <div key={goal.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{goal.name}</span>
                      <span className="text-sm font-medium">{goal.current}{goal.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">Current</span>
                      <span className="text-xs text-gray-500">Target: {goal.target}{goal.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        })}

        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Long-term Goals</h3>
                <ArrowPathIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="space-y-4">
                {sustainabilityGoals.longTerm.map((goal) => (
                  <div key={goal.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{goal.name}</span>
                      <span className="text-sm font-medium">{goal.current}{goal.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">Current</span>
                      <span className="text-xs text-gray-500">Target: {goal.target}{goal.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        })}
      </div>

      {/* Water Conservation Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Water Conservation</h3>
                <BeakerIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Efficiency Score</p>
                  <p className="text-2xl font-bold">{waterConservation.efficiencyScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">YoY Change</p>
                  <div className="flex items-center">
                    {waterConservation.yearOverYearChange < 0 ? (
                      <ArrowDownIcon className="h-5 w-5 text-green-500 mr-1" />
                    ) : (
                      <ArrowPathIcon className="h-5 w-5 text-red-500 mr-1" />
                    )}
                    <p className={`text-lg font-semibold ${waterConservation.yearOverYearChange < 0 ? "text-green-500" : "text-red-500"}`}>
                      {Math.abs(waterConservation.yearOverYearChange)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        })}

        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Water by Attraction</h3>
                <ChartBarIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="space-y-4">
                {waterConservation.byAttraction.map((attraction) => (
                  <div key={attraction.name} className="flex items-center justify-between">
                    <span className="text-sm">{attraction.name}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{attraction.usage} m³</span>
                      <span className="text-sm font-medium">{attraction.efficiency}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        })}
      </div>

      {/* Circular Economy Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Material Recovery</h3>
                <ArrowPathIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Recovery Rate</p>
                  <p className="text-2xl font-bold">{circularEconomy.materialRecovery.percentage}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">YoY Change</p>
                  <div className="flex items-center">
                    {circularEconomy.materialRecovery.yearOverYearChange > 0 ? (
                      <ArrowPathIcon className="h-5 w-5 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-5 w-5 text-red-500 mr-1" />
                    )}
                    <p className={`text-lg font-semibold ${circularEconomy.materialRecovery.yearOverYearChange > 0 ? "text-green-500" : "text-red-500"}`}>
                      {Math.abs(circularEconomy.materialRecovery.yearOverYearChange)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        })}

        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Materials by Type</h3>
                <ChartBarIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="space-y-4">
                {circularEconomy.byMaterial.map((material) => (
                  <div key={material.name} className="flex items-center justify-between">
                    <span className="text-sm">{material.name}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{material.amount} tons</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {material.recycled}% recycled
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {material.reused}% reused
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        })}
      </div>

      {/* Conservation Initiatives Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Water Conservation Initiatives</h3>
                <SparklesIcon className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="space-y-4">
                {waterConservation.conservationInitiatives.map((initiative) => (
                  <div key={initiative.name} className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">{initiative.name}</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded ${
                          initiative.status === "Completed" ? "bg-green-100 text-green-800" :
                          initiative.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {initiative.status}
                        </span>
                        <span className="text-xs text-gray-500">ROI: {initiative.roi}%</span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      initiative.impact === "High" ? "bg-purple-100 text-purple-800" :
                      initiative.impact === "Medium" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {initiative.impact} Impact
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ),
        })}

        {renderCard({
          children: (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Circular Economy Initiatives</h3>
                <SparklesIcon className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="space-y-4">
                {circularEconomy.initiatives.map((initiative) => (
                  <div key={initiative.name} className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">{initiative.name}</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded ${
                          initiative.status === "Completed" ? "bg-green-100 text-green-800" :
                          initiative.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {initiative.status}
                        </span>
                        <span className="text-xs text-gray-500">Savings: ${initiative.savings.toLocaleString()}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      initiative.impact === "High" ? "bg-purple-100 text-purple-800" :
                      initiative.impact === "Medium" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {initiative.impact} Impact
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ),
        })}
      </div>
    </div>
  )
} 