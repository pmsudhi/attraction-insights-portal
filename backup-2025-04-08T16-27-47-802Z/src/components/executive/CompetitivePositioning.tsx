"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export function CompetitivePositioning() {
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
        // Sample data for the competitive positioning chart
        const data = {
          datasets: [
            {
              label: "Our Properties",
              data: [
                { x: 8.5, y: 32.4, r: 20, name: "Adventure Park" },
                { x: 5.2, y: 30.1, r: 15, name: "Water Paradise" },
                { x: 7.8, y: 33.5, r: 12, name: "Safari Kingdom" },
                { x: 4.5, y: 32.0, r: 18, name: "European Park" },
              ],
              backgroundColor: "rgba(59, 130, 246, 0.7)",
              borderColor: "rgb(59, 130, 246)",
            },
            {
              label: "Competitors",
              data: [
                { x: 6.2, y: 28.5, r: 18, name: "Competitor A" },
                { x: 9.1, y: 25.3, r: 22, name: "Competitor B" },
                { x: 3.8, y: 31.2, r: 14, name: "Competitor C" },
                { x: 7.2, y: 29.8, r: 16, name: "Competitor D" },
              ],
              backgroundColor: "rgba(239, 68, 68, 0.7)",
              borderColor: "rgb(239, 68, 68)",
            },
          ],
        }

        chartInstance.current = new Chart(ctx, {
          type: "bubble",
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Revenue Growth (%)",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "EBITDA Margin (%)",
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const dataset = context.dataset
                    const index = context.dataIndex
                    const data = dataset.data[index] as any
                    const name = data.name || ""
                    const growth = data.x
                    const margin = data.y
                    return `${name}: ${growth}% Growth, ${margin}% Margin`
                  },
                },
              },
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Competitive Positioning Matrix",
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

