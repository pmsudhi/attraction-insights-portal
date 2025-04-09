"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export function GuestSegmentationLTV() {
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
        // Sample data for the guest segmentation LTV
        const data = {
          labels: ["Families", "Young Adults", "Seniors", "Tourists", "Locals", "Season Pass Holders"],
          datasets: [
            {
              type: "bar",
              label: "Lifetime Value ($)",
              data: [1250, 850, 680, 920, 780, 2200],
              backgroundColor: "rgba(59, 130, 246, 0.8)",
              yAxisID: "y",
            },
            {
              type: "bar",
              label: "Acquisition Cost ($)",
              data: [85, 65, 45, 120, 35, 180],
              backgroundColor: "rgba(239, 68, 68, 0.8)",
              yAxisID: "y",
            },
            {
              type: "line",
              label: "LTV:CAC Ratio",
              data: [14.7, 13.1, 15.1, 7.7, 22.3, 12.2],
              borderColor: "rgb(16, 185, 129)",
              backgroundColor: "rgba(16, 185, 129, 0.5)",
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
                  text: "Guest Segment",
                },
              },
              y: {
                type: "linear",
                display: true,
                position: "left",
                title: {
                  display: true,
                  text: "Value ($)",
                },
              },
              y1: {
                type: "linear",
                display: true,
                position: "right",
                title: {
                  display: true,
                  text: "LTV:CAC Ratio",
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
                text: "Guest Segment Lifetime Value Analysis",
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

