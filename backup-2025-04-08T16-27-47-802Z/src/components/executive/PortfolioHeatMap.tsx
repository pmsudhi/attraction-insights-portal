"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export function PortfolioHeatMap() {
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
        // Sample data for the heatmap
        const data = {
          labels: ["Adventure Park", "Water Paradise", "Safari Kingdom", "European Park"],
          datasets: [
            {
              label: "Revenue Growth",
              data: [8.4, 5.2, 7.8, 4.5],
              backgroundColor: "rgba(59, 130, 246, 0.8)",
            },
            {
              label: "EBITDA Margin",
              data: [34.8, 32.0, 33.5, 32.0],
              backgroundColor: "rgba(16, 185, 129, 0.8)",
            },
            {
              label: "Attendance Growth",
              data: [12.5, 8.3, -1.2, 6.7],
              backgroundColor: "rgba(245, 158, 11, 0.8)",
            },
            {
              label: "Per Capita Spending",
              data: [81.88, 76.93, 88.19, 89.25],
              backgroundColor: "rgba(139, 92, 246, 0.8)",
            },
          ],
        }

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: data,
          options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: false,
                title: {
                  display: true,
                  text: "Value",
                },
              },
              y: {
                stacked: false,
                title: {
                  display: true,
                  text: "Property",
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
                    if (context.parsed.x !== null) {
                      if (label.includes("Growth")) {
                        label += context.parsed.x + "%"
                      } else if (label.includes("Margin")) {
                        label += context.parsed.x + "%"
                      } else if (label.includes("Spending")) {
                        label += "$" + context.parsed.x
                      } else {
                        label += context.parsed.x
                      }
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
                text: "Portfolio Performance Metrics",
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

  return <canvas ref={chartRef} />
}

