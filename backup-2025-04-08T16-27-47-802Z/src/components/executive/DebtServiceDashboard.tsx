"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export function DebtServiceDashboard() {
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
        // Sample data for the debt service dashboard
        const data = {
          labels: ["2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032"],
          datasets: [
            {
              label: "Term Loan A",
              data: [25, 25, 25, 25, 25, 0, 0, 0],
              backgroundColor: "rgba(59, 130, 246, 0.8)",
              stack: "Stack 0",
            },
            {
              label: "Term Loan B",
              data: [0, 0, 0, 0, 0, 75, 75, 75],
              backgroundColor: "rgba(16, 185, 129, 0.8)",
              stack: "Stack 0",
            },
            {
              label: "Senior Notes",
              data: [0, 0, 0, 50, 50, 50, 50, 0],
              backgroundColor: "rgba(245, 158, 11, 0.8)",
              stack: "Stack 0",
            },
            {
              label: "Revolving Credit",
              data: [15, 15, 15, 0, 0, 0, 0, 0],
              backgroundColor: "rgba(139, 92, 246, 0.8)",
              stack: "Stack 0",
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
                stacked: true,
                title: {
                  display: true,
                  text: "Year",
                },
              },
              y: {
                stacked: true,
                title: {
                  display: true,
                  text: "Debt Maturity ($ Millions)",
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
              title: {
                display: true,
                text: "Debt Maturity Profile",
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

