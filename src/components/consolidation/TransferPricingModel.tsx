"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { DocumentTextIcon, ArrowsRightLeftIcon, ChartBarIcon, PlusIcon } from "@heroicons/react/24/outline"
import { BarChart } from "@/components/ui/charts"

export function TransferPricingModel() {
  const [selectedModel, setSelectedModel] = useState("current")
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Pricing Model</CardTitle>
        <CardDescription>Current transfer pricing arrangements</CardDescription>
        <div className="mt-4">
          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <ChartBarIcon className="h-4 w-4 mr-2" />
              Export Report
            </span>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowAddModal(true)}
          >
            <span className="flex items-center">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Transaction
            </span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddModal(false)}
          >
            <span className="flex items-center">
              Cancel
            </span>
          </Button>
          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <DocumentTextIcon className="h-4 w-4 mr-2" />
              Documentation
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center space-x-2">
          <Button
            variant={selectedModel === "current" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedModel("current")}
          >
            Current Model
          </Button>
          <Button
            variant={selectedModel === "proposed" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedModel("proposed")}
          >
            Proposed Model
          </Button>
        </div>

        <div className="h-48 mb-4">
          <BarChart
            data={[
              { category: "Management Services", value: 12.5 },
              { category: "IP Licensing", value: 28.4 },
              { category: "Shared Services", value: 8.7 }
            ]}
            xField="category"
            yFields={["value"]}
          />
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md mr-3">
                  <ArrowsRightLeftIcon className="h-5 w-5 text-primary-600" />
                </div>
                <span className="font-medium">Management Services</span>
              </div>
              <Badge variant="default">
                Cost Plus 5%
              </Badge>
            </div>
            <div className="text-xs text-gray-500 mt-1">US parent to European subsidiaries</div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-500">Annual Value:</span>
              <span className="text-gray-900">$12.5M</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md mr-3">
                  <ArrowsRightLeftIcon className="h-5 w-5 text-primary-600" />
                </div>
                <span className="font-medium">IP Licensing</span>
              </div>
              <Badge variant="default">
                Revenue Based
              </Badge>
            </div>
            <div className="text-xs text-gray-500 mt-1">US parent to all subsidiaries</div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-500">Annual Value:</span>
              <span className="text-gray-900">$28.4M</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md mr-3">
                  <ArrowsRightLeftIcon className="h-5 w-5 text-primary-600" />
                </div>
                <span className="font-medium">Shared Services</span>
              </div>
              <Badge variant="default">
                Cost Allocation
              </Badge>
            </div>
            <div className="text-xs text-gray-500 mt-1">Between all entities</div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-500">Annual Value:</span>
              <span className="text-gray-900">$8.7M</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900">Model Assessment</h3>
            <Badge variant="secondary">
              Optimization Needed
            </Badge>
          </div>
          <p className="text-xs text-gray-700">
            Current transfer pricing model is compliant but not optimized. Proposed restructuring could improve tax
            efficiency while maintaining compliance.
          </p>
          <div className="mt-3 flex justify-end">
            <Button variant="outline" size="sm">
              <ChartBarIcon className="h-4 w-4 mr-2" />
              View Analysis
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

