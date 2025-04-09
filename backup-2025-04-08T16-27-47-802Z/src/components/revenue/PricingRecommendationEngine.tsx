"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { BoltIcon } from "@heroicons/react/24/outline"

export const PricingRecommendationEngine = () => {
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [selectedChannel, setSelectedChannel] = useState("all")
  const [optimizationTarget, setOptimizationTarget] = useState("revenue")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Pricing Recommendations</CardTitle>
        <CardDescription>AI-powered pricing recommendations based on current demand and capacity</CardDescription>
        <div className="mt-4">
          <Button variant="default" size="sm">
            <BoltIcon className="h-4 w-4 mr-2" />
            Apply Recommendations
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-3">
          <div>
            <label htmlFor="guest-segment" className="block text-sm font-medium text-gray-700 mb-1">Guest Segment</label>
            <select
              id="guest-segment"
              name="guest-segment"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
            >
              <option value="all">All Segments</option>
              <option value="families">Families</option>
              <option value="adults">Adults</option>
              <option value="seniors">Seniors</option>
              <option value="groups">Groups</option>
            </select>
          </div>
          <div>
            <label htmlFor="sales-channel" className="block text-sm font-medium text-gray-700 mb-1">Sales Channel</label>
            <select
              id="sales-channel"
              name="sales-channel"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
            >
              <option value="all">All Channels</option>
              <option value="direct">Direct</option>
              <option value="ota">OTAs</option>
              <option value="partners">Partners</option>
              <option value="mobile">Mobile App</option>
            </select>
          </div>
          <div>
            <label htmlFor="optimization-target" className="block text-sm font-medium text-gray-700 mb-1">Optimization Target</label>
            <select
              id="optimization-target"
              name="optimization-target"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={optimizationTarget}
              onChange={(e) => setOptimizationTarget(e.target.value)}
            >
              <option value="revenue">Revenue</option>
              <option value="profit">Profit</option>
              <option value="attendance">Attendance</option>
              <option value="capacity">Capacity Utilization</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ticket Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Current Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Recommended Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Change
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Projected Impact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Confidence
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">1-Day Adult</div>
                  <div className="text-xs text-gray-500">Standard</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">$89.99</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-primary-600">$94.99</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-success-600">+5.6%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">+$42K Revenue</div>
                  <div className="text-xs text-gray-500">-2.1% Volume</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-success-500 h-2.5 rounded-full" style={{ width: "85%" }} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">High (85%)</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">1-Day Child</div>
                  <div className="text-xs text-gray-500">Standard</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">$69.99</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-primary-600">$72.99</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-success-600">+4.3%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">+$18K Revenue</div>
                  <div className="text-xs text-gray-500">-1.8% Volume</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-success-500 h-2.5 rounded-full" style={{ width: "78%" }} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">High (78%)</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">2-Day Adult</div>
                  <div className="text-xs text-gray-500">Multi-day</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">$149.99</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-danger-600">$144.99</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-danger-600">-3.3%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">+$28K Revenue</div>
                  <div className="text-xs text-success-600">+8.2% Volume</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-warning-500 h-2.5 rounded-full" style={{ width: "65%" }} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Medium (65%)</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">VIP Experience</div>
                  <div className="text-xs text-gray-500">Premium</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">$199.99</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-primary-600">$219.99</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-success-600">+10.0%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">+$35K Revenue</div>
                  <div className="text-xs text-gray-500">-1.2% Volume</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-success-500 h-2.5 rounded-full" style={{ width: "92%" }} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Very High (92%)</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

