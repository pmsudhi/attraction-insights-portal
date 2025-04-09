"use client"

import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import Chart from "chart.js/auto";

export const CapitalPlanning: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        // Sample data for capital planning
        const data = {
          labels: ["Q1", "Q2", "Q3", "Q4"],
          datasets: [
            {
              label: "Planned CapEx",
              data: [25.4, 18.2, 22.5, 19.3],
              backgroundColor: "rgba(59, 130, 246, 0.8)",
              yAxisID: "y",
            },
            {
              label: "Actual CapEx",
              data: [23.8, 17.5, 24.2, 19.8],
              backgroundColor: "rgba(16, 185, 129, 0.8)",
              yAxisID: "y",
            },
            {
              label: "Budget Utilization (%)",
              data: [94, 96, 108, 103],
              borderColor: "rgb(245, 158, 11)",
              backgroundColor: "rgba(245, 158, 11, 0.5)",
              yAxisID: "y1",
              tension: 0.4,
            },
          ],
        };

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
                  text: "Quarter",
                },
              },
              y: {
                type: "linear",
                display: true,
                position: "left",
                title: {
                  display: true,
                  text: "Amount ($M)",
                },
              },
              y1: {
                type: "linear",
                display: true,
                position: "right",
                title: {
                  display: true,
                  text: "Budget Utilization (%)",
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
                text: "Capital Expenditure Planning",
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Capital Planning</CardTitle>
          <CardDescription>Overview of capital expenditure planning and execution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-primary-50 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Total CapEx Budget</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">$85.4M</p>
              <div className="mt-2 flex items-center">
                <CurrencyDollarIcon className="h-5 w-5 text-primary-600 mr-1" />
                <span className="text-sm text-primary-600">Annual Budget</span>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Budget Utilization</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">98.5%</p>
              <div className="mt-2 flex items-center">
                <span className="text-sm text-green-600">On Track</span>
              </div>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Projects in Progress</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">12</p>
              <div className="mt-2 flex items-center">
                <span className="text-sm text-amber-600">3 Major, 9 Minor</span>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <canvas ref={chartRef} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

