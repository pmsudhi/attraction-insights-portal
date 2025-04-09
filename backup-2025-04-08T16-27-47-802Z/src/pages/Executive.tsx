"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/Badge"
import {
  PresentationChartLineIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserGroupIcon,
  BanknotesIcon,
  ScaleIcon,
  ChartBarIcon,
  CalendarIcon,
  WrenchScrewdriverIcon,
  TicketIcon,
  MegaphoneIcon,
  GlobeAltIcon,
  HeartIcon,
  StarIcon,
  DocumentChartBarIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"
import { PortfolioHeatMap } from "../components/executive/PortfolioHeatMap"
import { CompetitivePositioning } from "../components/executive/CompetitivePositioning"
import { BrandValueMetrics } from "../components/executive/BrandValueMetrics"
import { CashFlowForecast } from "../components/executive/CashFlowForecast"
import { DebtServiceDashboard } from "../components/executive/DebtServiceDashboard"
import { GuestExperienceMatrix } from "../components/executive/GuestExperienceMatrix"
import { AssetPerformanceTracker } from "../components/executive/AssetPerformanceTracker"
import { MarketingROIDashboard } from "../components/executive/MarketingROIDashboard"
import { GuestSegmentationLTV } from "../components/executive/GuestSegmentationLTV"
import { FinancialSustainability } from "../components/executive/FinancialSustainability"
import { StrategicRiskManagement } from "../components/executive/StrategicRiskManagement"
import { OrganizationalHealth } from "../components/executive/OrganizationalHealth"
import { CFOFinancialCommandCenter } from "../components/executive/CFOFinancialCommandCenter"
import { COOOperationalExcellenceHub } from "../components/executive/COOOperationalExcellenceHub"

export default function Executive(): JSX.Element {
  const [activeTab, setActiveTab] = useState("ceo")

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Executive Intelligence</h1>
          <p className="mt-1 text-sm text-gray-500">Role-specific dashboards for executive decision-making</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="default" size="sm">
            <PresentationChartLineIcon className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === "ceo"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
            onClick={() => setActiveTab("ceo")}
          >
            CEO Strategic Dashboard
          </button>
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === "cfo"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
            onClick={() => setActiveTab("cfo")}
          >
            CFO Financial Command Center
          </button>
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === "coo"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
            onClick={() => setActiveTab("coo")}
          >
            COO Operational Excellence Hub
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "ceo" && (
          <div className="space-y-6">
            <PortfolioHeatMap />
            <CompetitivePositioning />
            <BrandValueMetrics />
            <CashFlowForecast />
            <DebtServiceDashboard />
            <GuestExperienceMatrix />
            <AssetPerformanceTracker />
            <MarketingROIDashboard />
            <GuestSegmentationLTV />
            <FinancialSustainability />
            <StrategicRiskManagement />
            <OrganizationalHealth />
          </div>
        )}
        {activeTab === "cfo" && <CFOFinancialCommandCenter />}
        {activeTab === "coo" && <COOOperationalExcellenceHub />}
      </div>
    </div>
  )
}

