"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export function BrandValueMetrics() {
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
        // Sample data for the brand value metrics
        const data = {
          labels: [
            "Brand Awareness",
            "Brand Consideration",
            "Brand Preference",
            "Net Promoter Score",
            "Brand Sentiment",
            "Social Media Engagement",
          ],
          datasets: [
            {
              label: "Current",
              data: [78, 65, 58, 42, 84, 72],
              fill: true,
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderColor: "rgb(59, 130, 246)",
              pointBackgroundColor: "rgb(59, 130, 246)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(59, 130, 246)",
            },
            {
              label: "Previous Year",
              data: [73, 63, 52, 34, 78, 65],
              fill: true,
              backgroundColor: "rgba(107, 114, 128, 0.2)",
              borderColor: "rgb(107, 114, 128)",
              pointBackgroundColor: "rgb(107, 114, 128)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(107, 114, 128)",
            },
            {
              label: "Target",
              data: [75, 70, 60, 40, 85, 75],
              fill: false,
              borderColor: "rgb(16, 185, 129)",
              pointBackgroundColor: "rgb(16, 185, 129)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(16, 185, 129)",
              borderDash: [5, 5],
            },
          ],
        }

        chartInstance.current = new Chart(ctx, {
          type: "radar",
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              line: {
                borderWidth: 3,
              },
            },
            scales: {
              r: {
                angleLines: {
                  display: true,
                },
                suggestedMin: 0,
                suggestedMax: 100,
              },
            },
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Brand Value Metrics",
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

