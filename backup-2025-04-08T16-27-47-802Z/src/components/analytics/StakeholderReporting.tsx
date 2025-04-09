import React from 'react'
import { 
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'
import { StakeholderReport } from '../../types'

// Mock data for stakeholder reports
const stakeholderReports: StakeholderReport[] = [
  {
    id: "ESG2024",
    name: "2024 ESG Report",
    type: "ESG",
    audience: "Investors",
    frequency: "Annual",
    lastPublished: "2024-01-15",
    nextDue: "2025-01-15",
    status: "Published",
    metrics: [
      {
        category: "Environmental",
        metrics: [
          "Carbon Emissions",
          "Energy Consumption",
          "Waste Management",
          "Water Conservation"
        ]
      },
      {
        category: "Social",
        metrics: [
          "Employee Engagement",
          "Community Impact",
          "Health & Safety",
          "Diversity & Inclusion"
        ]
      }
    ],
    template: "ESG_Annual_Report_Template"
  },
  {
    id: "Q1SUST",
    name: "Q1 2024 Sustainability Report",
    type: "Sustainability",
    audience: "Community",
    frequency: "Quarterly",
    lastPublished: "2024-03-31",
    nextDue: "2024-06-30",
    status: "In Review",
    metrics: [
      {
        category: "Environmental Impact",
        metrics: [
          "Renewable Energy Usage",
          "Waste Reduction",
          "Water Conservation",
          "Biodiversity Impact"
        ]
      },
      {
        category: "Community Engagement",
        metrics: [
          "Local Partnerships",
          "Educational Programs",
          "Volunteer Hours",
          "Community Investment"
        ]
      }
    ],
    template: "Sustainability_Quarterly_Template"
  }
]

const renderCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-lg shadow p-6">
    {children}
  </div>
)

const getStatusColor = (status: string) => {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-800"
    case "In Review":
      return "bg-yellow-100 text-yellow-800"
    case "Draft":
      return "bg-blue-100 text-blue-800"
    case "Overdue":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Published":
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />
    case "In Review":
      return <ClockIcon className="h-5 w-5 text-yellow-500" />
    case "Draft":
      return <DocumentTextIcon className="h-5 w-5 text-blue-500" />
    case "Overdue":
      return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
    default:
      return <DocumentTextIcon className="h-5 w-5 text-gray-500" />
  }
}

export default function StakeholderReporting(): React.ReactElement {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stakeholderReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{report.name}</h3>
                <p className="text-sm text-gray-500">{report.type} - {report.audience}</p>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(report.status)}`}>
                {getStatusIcon(report.status)}
                <span className="text-sm font-medium">{report.status}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Last Published</p>
                  <p className="font-medium">{report.lastPublished}</p>
                </div>
                <div>
                  <p className="text-gray-500">Next Due</p>
                  <p className="font-medium">{report.nextDue}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Included Metrics</p>
                <div className="space-y-2">
                  {report.metrics.map((category) => (
                    <div key={category.category}>
                      <p className="text-sm font-medium">{category.category}</p>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {category.metrics.map((metric) => (
                          <li key={metric}>{metric}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Template</p>
                <p className="text-sm font-medium">{report.template}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 