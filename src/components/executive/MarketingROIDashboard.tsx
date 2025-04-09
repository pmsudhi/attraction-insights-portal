"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card"

export function MarketingROIDashboard() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        // Sample data for the marketing ROI dashboard
        const data = {
          labels: ["Paid Search", "Social Media", "Email", "Display", "Influencer", "Content", "PR"],
          datasets: [
            {
              type: "bar",
              label: "Marketing Spend ($K)",
              data: [1200, 850, 320, 580, 420, 280, 150],
              backgroundColor: "rgba(59, 130, 246, 0.8)",
              yAxisID: "y",
            },
            {
              type: "bar",
              label: "Revenue Generated ($K)",
              data: [7800, 4200, 2100, 2900, 1680, 1120, 450],
              backgroundColor: "rgba(16, 185, 129, 0.8)",
              yAxisID: "y",
            },
            {
              type: "line",
              label: "ROI (%)",
              data: [650, 494, 656, 500, 400, 400, 300],
              borderColor: "rgb(245, 158, 11)",
              backgroundColor: "rgba(245, 158, 11, 0.5)",
              yAxisID: "y1",
              tension: 0.4,
            },
          ],
        }

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Marketing Channel",
                },
              },
              y: {
                type: "linear",
                display: true,
                position: "left",
                title: {
                  display: true,
                  text: "Amount ($K)",
                },
              },
              y1: {
                type: "linear",
                display: true,
                position: "right",
                title: {
                  display: true,
                  text: "ROI (%)",
                },
                grid: {
                  drawOnChartArea: false,
                },
              },
            },
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Marketing ROI by Channel",
              },
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketing ROI Dashboard</CardTitle>
        <CardDescription>Analysis of marketing spend, revenue, and ROI by channel</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  )
}

