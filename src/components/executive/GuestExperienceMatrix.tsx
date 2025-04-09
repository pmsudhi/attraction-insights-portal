"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card"
import { ScriptableContext } from "chart.js"

interface ExperienceFactor {
  x: number
  y: number
  r: number
  name: string
}

export function GuestExperienceMatrix() {
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
        // Sample data for the guest experience matrix
        const data = {
          datasets: [
            {
              label: "Experience Factors",
              data: [
                { x: 4.8, y: 4.2, r: 20, name: "Ride Experience" },
                { x: 3.2, y: 4.7, r: 15, name: "Wait Times" },
                { x: 4.5, y: 3.8, r: 18, name: "Food Quality" },
                { x: 3.8, y: 3.2, r: 12, name: "Staff Friendliness" },
                { x: 4.2, y: 4.5, r: 16, name: "Cleanliness" },
                { x: 3.5, y: 3.9, r: 14, name: "Value for Money" },
                { x: 4.6, y: 3.5, r: 17, name: "Entertainment" },
              ],
              backgroundColor: (context: ScriptableContext<"bubble">) => {
                const value = context.raw as ExperienceFactor
                const satisfaction = value.x
                const importance = value.y

                // High importance, low satisfaction (pain points) = red
                if (importance > 4.0 && satisfaction < 4.0) {
                  return "rgba(239, 68, 68, 0.7)"
                }
                // High importance, high satisfaction (strengths) = green
                else if (importance > 4.0 && satisfaction >= 4.0) {
                  return "rgba(16, 185, 129, 0.7)"
                }
                // Low importance, high satisfaction (over-delivery) = blue
                else if (importance <= 4.0 && satisfaction >= 4.0) {
                  return "rgba(59, 130, 246, 0.7)"
                }
                // Low importance, low satisfaction (low priority) = yellow
                else {
                  return "rgba(245, 158, 11, 0.7)"
                }
              },
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
                min: 1,
                max: 5,
                title: {
                  display: true,
                  text: "Guest Satisfaction (1-5)",
                },
              },
              y: {
                min: 1,
                max: 5,
                title: {
                  display: true,
                  text: "Importance to Guest (1-5)",
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
                    const satisfaction = data.x
                    const importance = data.y
                    return `${name}: Satisfaction: ${satisfaction.toFixed(1)}, Importance: ${importance.toFixed(1)}`
                  },
                },
              },
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: "Guest Experience Matrix",
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
        <CardTitle>Guest Experience Matrix</CardTitle>
        <CardDescription>Analysis of satisfaction and importance across key experience factors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  )
}

