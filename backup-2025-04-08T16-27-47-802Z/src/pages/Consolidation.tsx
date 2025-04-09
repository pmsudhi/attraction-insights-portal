"use client"

import { useState } from "react"
import { MultiPropertyConsolidation } from "../components/consolidation/MultiPropertyConsolidation"
import { CurrencyDashboard } from "../components/consolidation/CurrencyDashboard"
import { TaxComplianceCalendar } from "../components/consolidation/TaxComplianceCalendar"
import { TransferPricingModel } from "../components/consolidation/TransferPricingModel"

export const Consolidation = () => {
  const [activeTab, setActiveTab] = useState("properties")

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Consolidation</h1>
          <p className="mt-1 text-sm text-gray-500">
            Consolidate financial data across properties, currencies, and business units
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === "properties"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
            onClick={() => setActiveTab("properties")}
          >
            Multi-Property Consolidation
          </button>
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === "currency"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
            onClick={() => setActiveTab("currency")}
          >
            Multi-Currency Management
          </button>
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === "tax"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
            onClick={() => setActiveTab("tax")}
          >
            Tax Optimization
          </button>
        </nav>
      </div>

      {/* Multi-Property Consolidation content */}
      {activeTab === "properties" && <MultiPropertyConsolidation />}

      {/* Multi-Currency Management content */}
      {activeTab === "currency" && <CurrencyDashboard />}

      {/* Tax Optimization content */}
      {activeTab === "tax" && (
        <div className="space-y-6">
          <TaxComplianceCalendar />

          <TransferPricingModel />
        </div>
      )}
    </div>
  )
}

export default Consolidation;

