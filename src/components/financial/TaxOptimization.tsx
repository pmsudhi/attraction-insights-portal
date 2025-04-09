import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { LineChart } from "../ui/charts"
import { 
  CurrencyDollarIcon, 
  GlobeAltIcon, 
  DocumentTextIcon,
  ChartBarIcon 
} from "@heroicons/react/24/outline"

interface TaxPosition {
  region: string
  effectiveRate: number
  statutoryRate: number
  taxExpense: number
  taxAssets: number
  taxLiabilities: number
  transferPricingImpact: number
  complianceStatus: "compliant" | "warning" | "non-compliant"
}

interface TransferPricingModel {
  id: string
  entity: string
  counterparty: string
  transactionType: string
  amount: number
  armLengthPrice: number
  complianceScore: number
  documentationStatus: "complete" | "incomplete" | "pending"
}

export const TaxOptimization = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState("12m")

  // Mock data for tax positions
  const taxPositions: TaxPosition[] = [
    {
      region: "North America",
      effectiveRate: 21.5,
      statutoryRate: 25.0,
      taxExpense: 12500000,
      taxAssets: 3500000,
      taxLiabilities: 2800000,
      transferPricingImpact: 0.8,
      complianceStatus: "compliant"
    },
    {
      region: "Europe",
      effectiveRate: 19.8,
      statutoryRate: 22.0,
      taxExpense: 8500000,
      taxAssets: 2200000,
      taxLiabilities: 1800000,
      transferPricingImpact: 0.9,
      complianceStatus: "warning"
    },
    {
      region: "Asia Pacific",
      effectiveRate: 17.2,
      statutoryRate: 20.0,
      taxExpense: 6200000,
      taxAssets: 1500000,
      taxLiabilities: 1200000,
      transferPricingImpact: 0.95,
      complianceStatus: "compliant"
    }
  ]

  // Mock data for transfer pricing models
  const transferPricingModels: TransferPricingModel[] = [
    {
      id: "TP001",
      entity: "US Operations",
      counterparty: "European HQ",
      transactionType: "IP License",
      amount: 25000000,
      armLengthPrice: 24500000,
      complianceScore: 98,
      documentationStatus: "complete"
    },
    {
      id: "TP002",
      entity: "Asian Operations",
      counterparty: "US HQ",
      transactionType: "Service Fee",
      amount: 15000000,
      armLengthPrice: 14800000,
      complianceScore: 95,
      documentationStatus: "complete"
    }
  ]

  // Mock chart data for tax trends
  const chartData = [
    { date: "2023-04", predicted: 21.5, actual: 25.0 },
    { date: "2023-05", predicted: 21.2, actual: 25.0 },
    { date: "2023-06", predicted: 20.8, actual: 25.0 },
    { date: "2023-07", predicted: 20.5, actual: 25.0 },
    { date: "2023-08", predicted: 20.2, actual: 25.0 },
    { date: "2023-09", predicted: 19.8, actual: 25.0 }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Optimization Center</CardTitle>
        <CardDescription>Global tax position management and optimization</CardDescription>
        <div className="mt-4">
          <Button variant="outline" size="sm">
            Update Tax Models
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Tax Position Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                  <CurrencyDollarIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Global Effective Rate</h3>
                  <p className="mt-1 text-2xl font-semibold text-primary-600">19.5%</p>
                  <p className="mt-1 text-xs text-gray-500">vs 22.0% statutory</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                  <GlobeAltIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Tax Efficiency</h3>
                  <p className="mt-1 text-2xl font-semibold text-primary-600">11.4%</p>
                  <p className="mt-1 text-xs text-gray-500">Rate reduction achieved</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                  <DocumentTextIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Compliance Score</h3>
                  <p className="mt-1 text-2xl font-semibold text-primary-600">96%</p>
                  <p className="mt-1 text-xs text-gray-500">Across all regions</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                  <ChartBarIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Tax Savings</h3>
                  <p className="mt-1 text-2xl font-semibold text-primary-600">$4.2M</p>
                  <p className="mt-1 text-xs text-gray-500">Year to date</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Rate Trends */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Effective vs Statutory Tax Rates</h3>
            <div className="h-80">
              <LineChart
                data={chartData}
                xField="date"
                yFields={["predicted", "actual"]}
                title="Tax Rate Trends"
              />
            </div>
          </div>

          {/* Regional Tax Positions */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Regional Tax Positions</h3>
            <div className="space-y-4">
              {taxPositions.map((position) => (
                <div
                  key={position.region}
                  className={`p-4 rounded-lg border ${
                    selectedRegion === position.region
                      ? "bg-primary-50 border-primary-200"
                      : "bg-white border-gray-200"
                  }`}
                  onClick={() => setSelectedRegion(position.region)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{position.region}</h4>
                      <div className="mt-1 flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          Effective Rate: {position.effectiveRate}%
                        </span>
                        <span className="text-sm text-gray-500">
                          Statutory Rate: {position.statutoryRate}%
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        position.complianceStatus === "compliant"
                          ? "success"
                          : position.complianceStatus === "warning"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {position.complianceStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transfer Pricing Models */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Transfer Pricing Models</h3>
            <div className="space-y-4">
              {transferPricingModels.map((model) => (
                <div key={model.id} className="p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {model.entity} → {model.counterparty}
                      </h4>
                      <div className="mt-1 flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          Type: {model.transactionType}
                        </span>
                        <span className="text-sm text-gray-500">
                          Amount: ${(model.amount / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          model.documentationStatus === "complete"
                            ? "success"
                            : model.documentationStatus === "pending"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {model.documentationStatus}
                      </Badge>
                      <span className="text-sm font-medium text-gray-900">
                        Score: {model.complianceScore}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 