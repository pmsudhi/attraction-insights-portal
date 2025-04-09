"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card"

export function CashFlowForecast() {
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
        // Sample data for the cash flow forecast
        const data = {
          labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
          datasets: [
            {
              label: "Operating Cash Flow",
              data: [18.5, 22.3, 28.5, 32.1, 25.8, 20.4, 15.2, 12.8, 10.5, 12.2, 15.8, 18.9],
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              fill: true,
              tension: 0.4,
            },
            {
              label: "Capital Expenditures",
              data: [-8.2, -10.5, -12.8, -9.5, -7.2, -6.8, -5.2, -4.8, -6.2, -7.5, -9.2, -11.5],
              borderColor: "rgb(239, 68, 68)",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              fill: true,
              tension: 0.4,
            },
            {
              label: "Free Cash Flow",
              data: [10.3, 11.8, 15.7, 22.6, 18.6, 13.6, 10.0, 8.0, 4.3, 4.7, 6.6, 7.4],
              borderColor: "rgb(16, 185, 129)",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              fill: true,
              tension: 0.4,
            },
          ],
        }

        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Cash Flow ($ Millions)",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Month",
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    let label = context.dataset.label || ""
                    if (label) {
                      label += ": "
                    }
                    if (context.parsed.y !== null) {
                      label +=
                        new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        }).format(context.parsed.y) + "M"
                    }
                    return label
                  },
                },
              },
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Cash Flow Forecast (12 Months)",
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
        <CardTitle>Cash Flow Forecast</CardTitle>
        <CardDescription>12-month projection of operating and free cash flows</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  )
}

