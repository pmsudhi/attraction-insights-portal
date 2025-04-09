"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card"

export function AssetPerformanceTracker() {
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
        // Sample data for the asset performance tracker
        const data = {
          labels: ["Thrill Seeker", "Splash Mountain", "Fantasy Castle", "Adventure Land", "Space Explorer"],
          datasets: [
            {
              label: "Uptime (%)",
              data: [98.2, 97.5, 99.1, 98.8, 96.5],
              backgroundColor: "rgba(16, 185, 129, 0.8)",
              yAxisID: "y",
            },
            {
              label: "Utilization (%)",
              data: [85, 92, 78, 65, 95],
              backgroundColor: "rgba(59, 130, 246, 0.8)",
              yAxisID: "y",
            },
            {
              label: "Wait Time (min)",
              data: [45, 60, 30, 20, 75],
              backgroundColor: "rgba(245, 158, 11, 0.8)",
              yAxisID: "y1",
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
                  text: "Attraction",
                },
              },
              y: {
                type: "linear",
                display: true,
                position: "left",
                min: 0,
                max: 100,
                title: {
                  display: true,
                  text: "Percentage (%)",
                },
              },
              y1: {
                type: "linear",
                display: true,
                position: "right",
                min: 0,
                max: 100,
                title: {
                  display: true,
                  text: "Wait Time (min)",
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
                text: "Attraction Performance Metrics",
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
        <CardTitle>Asset Performance Tracker</CardTitle>
        <CardDescription>Monitoring of key performance metrics for attractions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  )
}

