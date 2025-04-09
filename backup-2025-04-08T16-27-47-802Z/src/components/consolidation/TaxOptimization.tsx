"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import {
  CalendarDaysIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  DocumentChartBarIcon,
  ChevronDownIcon,
  BanknotesIcon,
  ChartBarIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentCheckIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  DocumentMagnifyingGlassIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline"
import { TaxComplianceCalendar } from "./TaxComplianceCalendar"
import { TransferPricingModel } from "./TransferPricingModel"
import { BarChart, LineChart } from "@/components/ui/charts"

// Define interfaces for the component
interface TaxJurisdiction {
  country: string
  code: string
  statutoryRate: number
  effectiveRate: number
  preTaxIncome: number
  taxExpense: number
  taxCredits: number
  taxAssets: number
  taxLiabilities: number
  complianceStatus: "compliant" | "pending" | "non-compliant"
  riskLevel: "low" | "medium" | "high"
}

interface TaxTreaty {
  id: string
  country: string
  effectiveRate: number
  withholdingRate: number
  treatyDate: string
  status: "active" | "pending" | "expired"
  benefits: string[]
}

interface TransferPricing {
  id: string
  entity: string
  country: string
  method: string
  margin: number
  compliance: number
  risk: "low" | "medium" | "high"
}

interface TaxExposure {
  id: string
  category: string
  amount: number
  currency: string
  risk: "low" | "medium" | "high"
  mitigation: string
}

// Sample data
const taxJurisdictions: TaxJurisdiction[] = [
  {
    country: "United States",
    code: "US",
    statutoryRate: 21,
    effectiveRate: 18.5,
    preTaxIncome: 250000000,
    taxExpense: 46250000,
    taxCredits: 6250000,
    taxAssets: 85000000,
    taxLiabilities: 40000000,
    complianceStatus: "compliant",
    riskLevel: "low",
  },
  {
    country: "United Kingdom",
    code: "UK",
    statutoryRate: 19,
    effectiveRate: 17.2,
    preTaxIncome: 180000000,
    taxExpense: 30960000,
    taxCredits: 3600000,
    taxAssets: 49600000,
    taxLiabilities: 27360000,
    complianceStatus: "compliant",
    riskLevel: "low",
  },
  {
    country: "Germany",
    code: "DE",
    statutoryRate: 30,
    effectiveRate: 25.5,
    preTaxIncome: 150000000,
    taxExpense: 38250000,
    taxCredits: 3000000,
    taxAssets: 46400000,
    taxLiabilities: 35250000,
    complianceStatus: "pending",
    riskLevel: "medium",
  },
  {
    country: "France",
    code: "FR",
    statutoryRate: 25,
    effectiveRate: 22.8,
    preTaxIncome: 120000000,
    taxExpense: 27360000,
    taxCredits: 2400000,
    taxAssets: 33600000,
    taxLiabilities: 24960000,
    complianceStatus: "compliant",
    riskLevel: "low",
  },
  {
    country: "Japan",
    code: "JP",
    statutoryRate: 23.2,
    effectiveRate: 20.5,
    preTaxIncome: 100000000,
    taxExpense: 20500000,
    taxCredits: 2000000,
    taxAssets: 30400000,
    taxLiabilities: 18500000,
    complianceStatus: "non-compliant",
    riskLevel: "high",
  },
]

const taxTreaties: TaxTreaty[] = [
  {
    id: "tt-001",
    country: "United Kingdom",
    effectiveRate: 19.0,
    withholdingRate: 0.0,
    treatyDate: "2023-01-01",
    status: "active",
    benefits: ["Reduced withholding tax", "Permanent establishment protection"],
  },
  {
    id: "tt-002",
    country: "Japan",
    effectiveRate: 23.2,
    withholdingRate: 10.0,
    treatyDate: "2023-06-15",
    status: "active",
    benefits: ["Dividend exemption", "Capital gains protection"],
  },
]

const transferPricing: TransferPricing[] = [
  {
    id: "tp-001",
    entity: "Disney Parks International",
    country: "France",
    method: "TNMM",
    margin: 8.5,
    compliance: 95,
    risk: "low",
  },
  {
    id: "tp-002",
    entity: "Disney Consumer Products Asia",
    country: "Singapore",
    method: "CUP",
    margin: 12.0,
    compliance: 92,
    risk: "medium",
  },
]

const taxExposures: TaxExposure[] = [
  {
    id: "te-001",
    category: "Permanent Establishment Risk",
    amount: 25000000,
    currency: "USD",
    risk: "medium",
    mitigation: "Implement centralized management structure",
  },
  {
    id: "te-002",
    category: "Transfer Pricing Adjustments",
    amount: 15000000,
    currency: "USD",
    risk: "high",
    mitigation: "Documentation and benchmarking study",
  },
]

export const TaxOptimization = () => {
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedPeriod, setSelectedPeriod] = useState("2025")
  const [activeTab, setActiveTab] = useState("overview")

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  // Calculate total tax expense
  const totalTaxExpense = taxJurisdictions.reduce((sum, jurisdiction) => sum + jurisdiction.taxExpense, 0)

  // Calculate average effective tax rate
  const averageEffectiveRate =
    taxJurisdictions.reduce((sum, jurisdiction) => sum + jurisdiction.effectiveRate, 0) / taxJurisdictions.length

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 mb-4">
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <ChevronDownIcon className="h-4 w-4 mr-2" />
              {selectedRegion}
            </span>
          </Button>
          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <DocumentTextIcon className="h-4 w-4 mr-2" />
              Tax Reports
            </span>
          </Button>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <CalendarDaysIcon className="h-4 w-4 mr-2" />
              Tax Calendar
            </span>
          </Button>
          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <DocumentTextIcon className="h-4 w-4 mr-2" />
              Documentation
            </span>
          </Button>
          <Button variant="default" size="sm">
            <span className="flex items-center">
              <DocumentChartBarIcon className="h-4 w-4 mr-2" />
              Tax Report
            </span>
          </Button>
        </div>
      </div>

      <TaxComplianceCalendar />

      <Card>
        <CardHeader>
          <CardTitle>Global Tax Position</CardTitle>
          <CardDescription>Tax rates and positions across jurisdictions</CardDescription>
          <div className="mt-4">
            <Button variant="outline" size="sm">
              <span className="flex items-center">
                <ShieldCheckIcon className="h-4 w-4 mr-2" />
                <span>Compliance Status</span>
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jurisdiction
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statutory Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Effective Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pre-Tax Income
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax Expense
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compliance Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Filing
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {taxJurisdictions.map((jurisdiction) => (
                  <tr key={jurisdiction.code}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-700 font-bold">{jurisdiction.code}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{jurisdiction.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatPercentage(jurisdiction.statutoryRate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatPercentage(jurisdiction.effectiveRate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(jurisdiction.preTaxIncome)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(jurisdiction.taxExpense)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={jurisdiction.complianceStatus === "compliant" ? "default" : "secondary"}>
                        {jurisdiction.complianceStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Next Filing Date</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tax Optimization</CardTitle>
              <CardDescription>Optimize tax strategies and compliance</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <span className="flex items-center">
                  <ChevronDownIcon className="h-4 w-4 mr-2" />
                  {selectedRegion}
                </span>
              </Button>
              <Button variant="outline" size="sm">
                <span className="flex items-center">
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  Refresh
                </span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Effective Tax Rate</CardTitle>
                <CardDescription>Current tax burden</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageEffectiveRate}%</div>
                <div className="text-sm text-muted-foreground">Target: {averageEffectiveRate}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tax Savings</CardTitle>
                <CardDescription>Potential optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${formatCurrency(totalTaxExpense)}</div>
                <div className="text-sm text-muted-foreground">+{averageEffectiveRate}% vs last year</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Compliance Score</CardTitle>
                <CardDescription>Tax compliance rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageEffectiveRate}%</div>
                <div className="text-sm text-muted-foreground">Compliant</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Risk Level</CardTitle>
                <CardDescription>Tax risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageEffectiveRate}%</div>
                <div className="text-sm text-muted-foreground">Low</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <TransferPricingModel />

      <Card>
        <CardHeader>
          <CardTitle>Tax Scenario Planning</CardTitle>
          <CardDescription>Model the impact of different tax scenarios</CardDescription>
          <div className="mt-4">
            <Button variant="default" size="sm">
              <span className="flex items-center">
                <ChartBarIcon className="h-4 w-4 mr-2" />
                New Scenario
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Scenario content */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentation Management</CardTitle>
          <CardDescription>Track and manage tax documentation</CardDescription>
          <div className="mt-4">
            <Button variant="default" size="sm">
              <span className="flex items-center">
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                Upload Document
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          {/* Documentation content */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Treaty Network</CardTitle>
          <CardDescription>Active tax treaties and their benefits</CardDescription>
          <div className="mt-4">
            <Button variant="outline" size="sm">
              <span className="flex items-center">
                <GlobeAltIcon className="h-4 w-4 mr-2" />
                Treaty Analysis
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          {/* Treaty content */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transfer Pricing Analysis</CardTitle>
          <CardDescription>Entity-level transfer pricing compliance</CardDescription>
          <div className="mt-4">
            <Button variant="outline" size="sm">
              <span className="flex items-center">
                <ChartBarIcon className="h-4 w-4 mr-2" />
                Detailed Analysis
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          {/* Transfer pricing content */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Risk Exposure</CardTitle>
          <CardDescription>Identified tax risks and mitigation strategies</CardDescription>
          <div className="mt-4">
            <Button variant="outline" size="sm">
              <span className="flex items-center">
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                Risk Report
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          {/* Risk exposure content */}
        </CardContent>
      </Card>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Tax Treaties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {taxTreaties.map((treaty, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{treaty.country}</CardTitle>
                <CardDescription>
                  Effective Rate: {treaty.effectiveRate}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`${
                      treaty.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : treaty.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {treaty.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <span className="flex items-center">
                      <DocumentTextIcon className="h-4 w-4 mr-2" />
                      View Treaty
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Transfer Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transferPricing.map((pricing, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{pricing.entity}</CardTitle>
                <CardDescription>
                  Method: {pricing.method}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`${
                      pricing.risk === 'low'
                        ? 'bg-green-100 text-green-800'
                        : pricing.risk === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {pricing.risk} risk
                  </Badge>
                  <Button variant="outline" size="sm">
                    <span className="flex items-center">
                      <ChartBarIcon className="h-4 w-4 mr-2" />
                      Analysis
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Tax Exposures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {taxExposures.map((exposure, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{exposure.category}</CardTitle>
                <CardDescription>
                  Amount: {exposure.currency} {formatCurrency(exposure.amount)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`${
                      exposure.risk === 'low'
                        ? 'bg-green-100 text-green-800'
                        : exposure.risk === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {exposure.risk} risk
                  </Badge>
                  <Button variant="outline" size="sm">
                    <span className="flex items-center">
                      <ShieldCheckIcon className="h-4 w-4 mr-2" />
                      Mitigate
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

