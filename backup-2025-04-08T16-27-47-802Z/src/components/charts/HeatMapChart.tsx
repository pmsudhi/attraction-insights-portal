import React from "react"
import { Card, CardContent } from "../ui/Card"

interface HeatMapData {
  date: string
  value: number
  label: string
}

interface HeatMapChartProps {
  data: HeatMapData[]
  colorScale?: string[]
  height?: number
  width?: number
  ariaLabel?: string
}

export const HeatMapChart: React.FC<HeatMapChartProps> = ({
  data,
  colorScale = ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
  height = 300,
  width = 600,
  ariaLabel = "Heat map visualization",
}) => {
  // Find min and max values for scaling
  const values = data.map((d) => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min

  // Calculate color index based on value
  const getColorIndex = (value: number) => {
    const normalizedValue = (value - min) / range
    return Math.floor(normalizedValue * (colorScale.length - 1))
  }

  return (
    <div role="img" aria-label={ariaLabel}>
      <svg width={width} height={height}>
        <g>
          {data.map((item, index) => {
            const colorIndex = getColorIndex(item.value)
            return (
              <g key={index} transform={`translate(${(index * width) / data.length}, 0)`}>
                <rect
                  width={width / data.length - 2}
                  height={height}
                  fill={colorScale[colorIndex]}
                  stroke="#fff"
                  strokeWidth={1}
                />
                <text
                  x={width / data.length / 2}
                  y={height - 5}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#666"
                >
                  {item.label}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
} 