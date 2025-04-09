"\"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export function BarChart() {
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
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            datasets: [
              {
                label: "Revenue",
                data: [120, 150, 180, 160],
                backgroundColor: "rgba(59, 130, 246, 0.8)",
                borderColor: "rgb(59, 130, 246)",
                borderWidth: 1,
              },
              {
                label: "Expenses",
                data: [80, 90, 110, 100],
                backgroundColor: "rgba(239, 68, 68, 0.8)",
                borderColor: "rgb(239, 68, 68)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Amount ($M)",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Quarter",
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
                      label += "$" + context.parsed.y + "M"
                    }
                    return label
                  },
                },
              },
              legend: {
                position: "top",
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

