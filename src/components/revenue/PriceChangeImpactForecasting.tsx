"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { LineChart } from "@/components/ui/charts"

export const PriceChangeImpactForecasting = () => {
  const [priceChange, setPriceChange] = useState(0)
  const [ticketType, setTicketType] = useState("adult")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Change Impact Forecasting</CardTitle>
        <CardDescription>Forecast the impact of price changes on revenue, attendance, and profitability</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1">
            <label htmlFor="ticket-type" className="block text-sm font-medium text-gray-700 mb-1">Ticket Type</label>
            <select
              id="ticket-type"
              name="ticket-type"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
            >
              <option value="adult">1-Day Adult</option>
              <option value="child">1-Day Child</option>
              <option value="multi">Multi-Day Tickets</option>
              <option value="vip">VIP Experiences</option>
              <option value="all">All Ticket Types</option>
            </select>
          </div>
          <div className="col-span-2">
            <label htmlFor="price-change" className="block text-sm font-medium text-gray-700 mb-1">
              Price Change: {priceChange > 0 ? "+" : ""}
              {priceChange}%
            </label>
            <input
              id="price-change"
              name="price-change"
              type="range"
              min="-20"
              max="20"
              step="1"
              value={priceChange}
              onChange={(e) => setPriceChange(Number.parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-20%</span>
              <span>0%</span>
              <span>+20%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Revenue Impact</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">
              {priceChange > 0 ? "+" : ""}
              {(priceChange * 0.85).toFixed(1)}%
            </div>
            <div className="mt-1 text-xs text-gray-500">Estimated change in total revenue</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Attendance Impact</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">
              {priceChange > 0 ? "" : "+"}
              {(priceChange * -0.15).toFixed(1)}%
            </div>
            <div className="mt-1 text-xs text-gray-500">Estimated change in attendance</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Profit Impact</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">
              {priceChange > 0 ? "+" : ""}
              {(priceChange * 1.2).toFixed(1)}%
            </div>
            <div className="mt-1 text-xs text-gray-500">Estimated change in profitability</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Break-Even Days</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">
              {priceChange > 0 ? "-" : "+"}
              {Math.abs(Math.round(priceChange * 0.1))} days
            </div>
            <div className="mt-1 text-xs text-gray-500">Change in break-even days per month</div>
          </div>
        </div>

        <div className="h-64">
          <LineChart 
            data={[
              { label: "Jan 2024", value: 100 },
              { label: "Feb 2024", value: 120 },
              { label: "Mar 2024", value: 115 },
              { label: "Apr 2024", value: 130 }
            ]}
          />
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <Button variant="outline" size="sm">
            Reset
          </Button>
          <Button variant="default" size="sm">
            Run Detailed Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

