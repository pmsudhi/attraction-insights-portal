import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { LineChart, BarChart, PieChart } from "../ui/charts"
import {
  CurrencyDollarIcon,
  ScaleIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline"

// Sample data for capital structure optimization
const capitalStructureData = {
  current: {
    debt: 45,
    equity: 55,
    wacc: 8.5,
  },
  optimal: {
    debt: 40,
    equity: 60,
    wacc: 7.8,
  },
  metrics: {
    debtToEquity: 0.82,
    interestCoverage: 4.2,
    debtToEbitda: 2.4,
  },
}

// Sample data for risk management
const riskManagementData = {
  financialRisks: [
    { name: "Currency Risk", exposure: 25, hedged: 60, riskLevel: "medium" },
    { name: "Interest Rate Risk", exposure: 15, hedged: 80, riskLevel: "low" },
    { name: "Commodity Risk", exposure: 10, hedged: 40, riskLevel: "high" },
    { name: "Credit Risk", exposure: 20, hedged: 75, riskLevel: "medium" },
  ],
  insuranceCoverage: {
    property: { coverage: 85, adequacy: "adequate" },
    liability: { coverage: 90, adequacy: "adequate" },
    business: { coverage: 75, adequacy: "inadequate" },
    cyber: { coverage: 60, adequacy: "inadequate" },
  },
}

// Sample data for earnings quality
const earningsQualityData = {
  metrics: {
    accruals: 15,
    cashConversion: 85,
    revenueRecognition: 92,
    expenseClassification: 88,
  },
  trends: [
    { quarter: "Q1", accruals: 18, cashConversion: 82 },
    { quarter: "Q2", accruals: 16, cashConversion: 84 },
    { quarter: "Q3", accruals: 15, cashConversion: 85 },
    { quarter: "Q4", accruals: 15, cashConversion: 85 },
  ],
}

// Sample data for working capital
const workingCapitalData = {
  current: {
    receivables: 45,
    inventory: 30,
    payables: 25,
  },
  target: {
    receivables: 40,
    inventory: 25,
    payables: 35,
  },
  metrics: {
    cashConversionCycle: 45,
    workingCapitalRatio: 1.8,
    quickRatio: 1.2,
  },
}

// Sample data for financial contingency
const contingencyData = {
  scenarios: [
    {
      name: "Severe Weather Impact",
      probability: 15,
      impact: 25,
      mitigation: 60,
      status: "prepared",
    },
    {
      name: "Economic Downturn",
      probability: 20,
      impact: 35,
      mitigation: 75,
      status: "prepared",
    },
    {
      name: "Supply Chain Disruption",
      probability: 25,
      impact: 30,
      mitigation: 50,
      status: "partial",
    },
    {
      name: "Regulatory Change",
      probability: 10,
      impact: 20,
      mitigation: 40,
      status: "prepared",
    },
  ],
}

export const CFOFinancialCommandCenter = () => {
  const [activeTab, setActiveTab] = useState("capital")

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">WACC</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{capitalStructureData.current.wacc}%</p>
                <p className="mt-1 text-xs text-success-600">-0.7pp vs Target</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-md">
                <CurrencyDollarIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Cash Conversion</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{earningsQualityData.metrics.cashConversion}%</p>
                <p className="mt-1 text-xs text-success-600">+3% YOY</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-md">
                <ArrowTrendingUpIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Working Capital Ratio</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{workingCapitalData.metrics.workingCapitalRatio}x</p>
                <p className="mt-1 text-xs text-success-600">+0.2x YOY</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-md">
                <ScaleIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Risk Coverage</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">75%</p>
                <p className="mt-1 text-xs text-warning-600">+5% YOY</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-md">
                <ShieldCheckIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Capital Structure Optimization */}
      <Card>
        <CardHeader>
        <CardTitle>Capital Structure Optimization</CardTitle>
        <CardDescription>Current vs. optimal capital structure analysis</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Current Structure</h3>
              <div className="h-64">
                <PieChart
                  data={{
                    labels: ["Debt", "Equity"],
                    datasets: [{
                      data: [
                        capitalStructureData.current.debt,
                        capitalStructureData.current.equity
                      ],
                      backgroundColor: [
                        "rgba(59, 130, 246, 0.8)",
                        "rgba(16, 185, 129, 0.8)"
                      ],
                      borderColor: [
                        "rgb(59, 130, 246)",
                        "rgb(16, 185, 129)"
                      ],
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    plugins: {
                      legend: {
                        position: "right"
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const label = context.label || ""
                            const value = context.formattedValue
                            return `${label}: ${value}%`
                          }
                        }
                      }
                    }
                  }}
                  ariaLabel="Current capital structure"
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Debt/Equity</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{capitalStructureData.metrics.debtToEquity}x</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Interest Coverage</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{capitalStructureData.metrics.interestCoverage}x</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Debt/EBITDA</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{capitalStructureData.metrics.debtToEbitda}x</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Target Structure</h3>
              <div className="h-64">
                <PieChart
                  data={{
                    labels: ["Debt", "Equity"],
                    datasets: [{
                      data: [
                        capitalStructureData.optimal.debt,
                        capitalStructureData.optimal.equity
                      ],
                      backgroundColor: [
                        "rgba(59, 130, 246, 0.8)",
                        "rgba(16, 185, 129, 0.8)"
                      ],
                      borderColor: [
                        "rgb(59, 130, 246)",
                        "rgb(16, 185, 129)"
                      ],
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    plugins: {
                      legend: {
                        position: "right"
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const label = context.label || ""
                            const value = context.formattedValue
                            return `${label}: ${value}%`
                          }
                        }
                      }
                    }
                  }}
                  ariaLabel="Target capital structure"
                />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">WACC Optimization</span>
                  <Badge variant="default">-0.7pp</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full"
                    style={{ width: `${(capitalStructureData.current.wacc / 12) * 100}%` }}
                   />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Management Dashboard */}
      <Card>
        <CardHeader>
        <CardTitle>Risk Management Dashboard</CardTitle>
        <CardDescription>Comprehensive risk exposure and mitigation analysis</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Risk Exposure</h3>
              <div className="space-y-4">
                {riskManagementData.financialRisks.map((risk) => (
                  <div key={risk.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{risk.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-900">${risk.exposure}M</span>
                      <Badge
                        variant={
                          risk.riskLevel === "low"
                            ? "success"
                            : risk.riskLevel === "medium"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {risk.hedged}% Hedged
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Insurance Coverage</h3>
              <div className="space-y-4">
                {Object.entries(riskManagementData.insuranceCoverage).map(([type, data]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{type}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-900">{data.coverage}%</span>
                      <Badge
                        variant={data.adequacy === "adequate" ? "success" : "warning"}
                      >
                        {data.adequacy}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earnings Quality Assessment */}
      <Card>
        <CardHeader>
        <CardTitle>Earnings Quality Assessment</CardTitle>
        <CardDescription>Comprehensive analysis of earnings quality metrics</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quality Metrics</h3>
              <div className="space-y-4">
                {Object.entries(earningsQualityData.metrics).map(([metric, value]) => (
                  <div key={metric} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {metric.charAt(0).toUpperCase() + metric.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-900">{value}%</span>
                      <Badge variant={value >= 85 ? "success" : value >= 70 ? "warning" : "danger"}>
                        {value >= 85 ? "Strong" : value >= 70 ? "Moderate" : "Weak"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quality Trends</h3>
              <div className="h-64">
                <LineChart
                  data={earningsQualityData.trends.map((t) => ({
                    date: t.quarter,
                    predicted: t.accruals,
                    actual: t.cashConversion || null
                  }))}
                  xField="date"
                  yFields={["predicted", "actual"]}
                  title="Earnings Quality Trends"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Working Capital Optimization */}
      <Card>
        <CardHeader>
        <CardTitle>Working Capital Optimization</CardTitle>
        <CardDescription>Detailed working capital analysis and optimization</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Current vs Target</h3>
              <div className="h-64">
                <BarChart
                  data={{
                    labels: ["Receivables", "Inventory", "Payables"],
                    datasets: [
                      {
                        label: "Current",
                        data: [
                          workingCapitalData.current.receivables,
                          workingCapitalData.current.inventory,
                          workingCapitalData.current.payables
                        ],
                        backgroundColor: "rgba(59, 130, 246, 0.8)",
                        borderColor: "rgb(59, 130, 246)",
                        borderWidth: 1
                      },
                      {
                        label: "Target",
                        data: [
                          workingCapitalData.target.receivables,
                          workingCapitalData.target.inventory,
                          workingCapitalData.target.payables
                        ],
                        backgroundColor: "rgba(16, 185, 129, 0.8)",
                        borderColor: "rgb(16, 185, 129)",
                        borderWidth: 1
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Amount ($M)"
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        position: "top"
                      }
                    }
                  }}
                  ariaLabel="Working capital components comparison"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Cash Conversion Cycle</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-900">{workingCapitalData.metrics.cashConversionCycle} days</span>
                    <Badge variant="default">-5 days YOY</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Working Capital Ratio</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-900">{workingCapitalData.metrics.workingCapitalRatio}x</span>
                    <Badge variant="default">+0.2x YOY</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Quick Ratio</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-900">{workingCapitalData.metrics.quickRatio}x</span>
                    <Badge variant="default">+0.1x YOY</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Contingency Analysis */}
      <Card>
        <CardHeader>
        <CardTitle>Financial Contingency Analysis</CardTitle>
        <CardDescription>Scenario-based financial contingency planning</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contingencyData.scenarios.map((scenario) => (
                <div key={scenario.name} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">{scenario.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Probability</span>
                      <span className="text-sm font-medium text-gray-900">{scenario.probability}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Impact</span>
                      <span className="text-sm font-medium text-gray-900">${scenario.impact}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Mitigation</span>
                      <span className="text-sm font-medium text-gray-900">{scenario.mitigation}%</span>
                    </div>
                    <div className="mt-2">
                      <Badge
                        variant={
                          scenario.status === "prepared"
                            ? "success"
                            : scenario.status === "partial"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {scenario.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Currency Risk Visualization */}
      <Card>
        <CardHeader>
        <CardTitle>Currency Risk Visualization</CardTitle>
        <CardDescription>Comprehensive currency exposure and hedging analysis</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Currency Exposure</h3>
              <div className="space-y-4">
                {[
                  { currency: "EUR", exposure: 850000000, hedging: 510000000, risk: "medium" },
                  { currency: "GBP", exposure: 620000000, hedging: 496000000, risk: "low" },
                  { currency: "JPY", exposure: 580000000, hedging: 348000000, risk: "high" },
                  { currency: "CNY", exposure: 420000000, hedging: 252000000, risk: "medium" },
                  { currency: "AUD", exposure: 180000000, hedging: 144000000, risk: "low" }
                ].map((position) => (
                  <div key={position.currency} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{position.currency}/USD</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-900">${(position.exposure / 1000000).toFixed(1)}M</span>
                      <Badge
                        variant={
                          position.risk === "low"
                            ? "success"
                            : position.risk === "medium"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {((position.hedging / position.exposure) * 100).toFixed(0)}% Hedged
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Exchange Rate Trends</h3>
              <div className="h-64">
                <LineChart
                  data={[
                    { date: "2024-01", predicted: 1.05, actual: 1.05 },
                    { date: "2024-02", predicted: 1.06, actual: 1.06 },
                    { date: "2024-03", predicted: 1.07, actual: 1.07 },
                    { date: "2024-04", predicted: 1.08, actual: 1.08 },
                    { date: "2024-05", predicted: 1.09, actual: 1.09 },
                    { date: "2024-06", predicted: 1.08, actual: 1.08 }
                  ]}
                  xField="date"
                  yFields={["predicted", "actual"]}
                  title="Exchange Rate Trends"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Average Hedging Cost</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">0.8%</p>
                  <p className="mt-1 text-xs text-success-600">-0.2% YOY</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Overall Risk Score</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">Medium</p>
                  <p className="mt-1 text-xs text-success-600">-1 level YOY</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 