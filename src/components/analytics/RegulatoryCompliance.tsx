import React from 'react'
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon,
  ClockIcon,
  DocumentCheckIcon,
  DocumentIcon
} from '@heroicons/react/24/outline'
import { RegulatoryRequirement, ComplianceMetrics } from '../../types'

// Mock data for regulatory requirements
const regulatoryRequirements: RegulatoryRequirement[] = [
  {
    id: "ENV001",
    name: "Carbon Emissions Reporting",
    category: "Environmental",
    jurisdiction: "EU",
    status: "Compliant",
    dueDate: "2024-12-31",
    lastReviewDate: "2024-03-15",
    nextReviewDate: "2024-09-15",
    documentation: [
      {
        name: "Emissions Report 2024",
        status: "Complete",
        lastUpdated: "2024-03-15"
      }
    ],
    notes: "Annual carbon emissions reporting compliant with EU regulations"
  },
  {
    id: "SAF001",
    name: "Safety Inspection Protocol",
    category: "Safety",
    jurisdiction: "US",
    status: "In Progress",
    dueDate: "2024-06-30",
    lastReviewDate: "2024-01-15",
    nextReviewDate: "2024-04-15",
    documentation: [
      {
        name: "Safety Inspection Checklist",
        status: "In Progress",
        lastUpdated: "2024-03-01"
      }
    ],
    notes: "Quarterly safety inspection protocol implementation"
  }
]

// Mock data for compliance metrics
const complianceMetrics: ComplianceMetrics = {
  overallScore: 92,
  byCategory: [
    {
      category: "Environmental",
      score: 95,
      requirements: 12,
      compliant: 11,
      nonCompliant: 0,
      inProgress: 1
    },
    {
      category: "Safety",
      score: 90,
      requirements: 15,
      compliant: 13,
      nonCompliant: 1,
      inProgress: 1
    }
  ],
  recentUpdates: [
    {
      requirement: "Carbon Emissions Reporting",
      date: "2024-03-15",
      change: "Updated annual emissions data"
    },
    {
      requirement: "Safety Inspection Protocol",
      date: "2024-03-01",
      change: "Initiating quarterly inspection process"
    }
  ]
}

const renderCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-lg shadow p-6">
    {children}
  </div>
)

const getStatusColor = (status: string) => {
  switch (status) {
    case "Compliant":
      return "bg-green-100 text-green-800"
    case "Non-Compliant":
      return "bg-red-100 text-red-800"
    case "In Progress":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Compliant":
      return <ShieldCheckIcon className="h-5 w-5 text-green-500" />
    case "Non-Compliant":
      return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
    case "In Progress":
      return <ClockIcon className="h-5 w-5 text-yellow-500" />
    default:
      return <DocumentIcon className="h-5 w-5 text-gray-500" />
  }
}

export default function RegulatoryCompliance(): React.ReactElement {
  return (
    <div className="space-y-6">
      {/* Overall Compliance Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          {renderCard({
            children: (
              <div>
                <h2 className="text-xl font-semibold mb-4">Compliance Overview</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold">{complianceMetrics.overallScore}%</p>
                    <p className="text-sm text-gray-500">Overall Compliance Score</p>
                  </div>
                  <div className="space-y-2">
                    {complianceMetrics.byCategory.map((category) => (
                      <div key={category.category} className="flex items-center justify-between">
                        <span className="text-sm">{category.category}</span>
                        <span className="text-sm font-medium">{category.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
          })}
        </div>
        <div>
          {renderCard({
            children: (
              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
                <div className="space-y-3">
                  {complianceMetrics.recentUpdates.map((update) => (
                    <div key={update.requirement} className="text-sm">
                      <p className="font-medium">{update.requirement}</p>
                      <p className="text-gray-500">{update.date}</p>
                      <p className="text-gray-600">{update.change}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
          })}
        </div>
      </div>

      {/* Regulatory Requirements */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Regulatory Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regulatoryRequirements.map((requirement) => (
            <div key={requirement.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{requirement.name}</h3>
                  <p className="text-sm text-gray-500">{requirement.category} - {requirement.jurisdiction}</p>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(requirement.status)}`}>
                  {getStatusIcon(requirement.status)}
                  <span className="text-sm font-medium">{requirement.status}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Due Date</p>
                    <p className="font-medium">{requirement.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Next Review</p>
                    <p className="font-medium">{requirement.nextReviewDate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Documentation</p>
                  <div className="space-y-2">
                    {requirement.documentation.map((doc) => (
                      <div key={doc.name} className="flex items-center justify-between text-sm">
                        <span>{doc.name}</span>
                        <span className={`px-2 py-1 rounded ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="text-sm">{requirement.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 