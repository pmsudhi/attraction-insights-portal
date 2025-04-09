"use client"

import { useState } from "react"
import { Button } from "../components/ui/Button"
import { ChartBarIcon } from "@heroicons/react/24/outline"
import {
  BreakEvenIntelligence,
  AttractionProfitability,
  DriverBasedModeling,
  CapitalPlanning,
  TaxOptimization,
  GlobalOperations
} from "../components/financial"

const Financial = () => {
  const [activeTab, setActiveTab] = useState("breakeven")

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Modeling & Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">Sophisticated tools for financial modeling and analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <ChartBarIcon className="h-4 w-4" />
            Export Analysis
          </Button>
          <Button variant="default" size="sm">
            New Model
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("breakeven")}
            className={`${
              activeTab === "breakeven"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Break-Even Analysis
          </button>
          <button
            onClick={() => setActiveTab("profitability")}
            className={`${
              activeTab === "profitability"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Profitability
          </button>
          <button
            onClick={() => setActiveTab("drivers")}
            className={`${
              activeTab === "drivers"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Cost Drivers
          </button>
          <button
            onClick={() => setActiveTab("capital")}
            className={`${
              activeTab === "capital"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Capital Planning
          </button>
          <button
            onClick={() => setActiveTab("tax")}
            className={`${
              activeTab === "tax"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Tax Optimization
          </button>
          <button
            onClick={() => setActiveTab("global")}
            className={`${
              activeTab === "global"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Global Operations
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === "breakeven" && <BreakEvenIntelligence />}
        {activeTab === "profitability" && <AttractionProfitability />}
        {activeTab === "drivers" && <DriverBasedModeling />}
        {activeTab === "capital" && <CapitalPlanning />}
        {activeTab === "tax" && <TaxOptimization />}
        {activeTab === "global" && <GlobalOperations />}
      </div>
    </div>
  )
}

export default Financial;

