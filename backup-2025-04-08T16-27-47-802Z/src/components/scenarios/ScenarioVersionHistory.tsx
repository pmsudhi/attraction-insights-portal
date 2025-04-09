import { Button } from "../ui/Button"
import { Card, CardHeader, CardContent } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { ClockIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import type { ScenarioVersion, Scenario } from "../../utils/scenario-modeling/types"

interface ScenarioVersionHistoryProps {
  scenario: Scenario
  onApprove: () => void
  onReject: (reason: string) => void
  onViewVersion: (version: ScenarioVersion) => void
}

export const ScenarioVersionHistory = ({ scenario, onApprove, onReject, onViewVersion }: ScenarioVersionHistoryProps) => {
  const getStatusColor = (status: Scenario["status"]) => {
    switch (status) {
      case "draft":
        return "secondary"
      case "pending_review":
        return "secondary"
      case "approved":
        return "default"
      case "rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <h2 className="text-lg font-semibold">Version History & Approval</h2>
          <p className="text-sm text-gray-500">Track changes and manage scenario approval workflow</p>
        </div>
        {scenario.status === "pending_review" && (
          <div className="flex space-x-2 mt-4">
            <Button variant="destructive" size="sm" onClick={() => onReject("")}>
              <XMarkIcon className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button variant="default" size="sm" onClick={onApprove}>
              <CheckIcon className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Current Status</h3>
              <div className="flex items-center mt-2">
                <Badge variant={getStatusColor(scenario.status)}>
                  {scenario.status.replace("_", " ").charAt(0).toUpperCase() + scenario.status.slice(1)}
                </Badge>
              </div>
            </div>
            {scenario.approvedBy && (
              <div className="text-sm text-gray-500">
                Approved by {scenario.approvedBy} on {scenario.approvedAt}
              </div>
            )}
            {scenario.rejectedBy && (
              <div className="text-sm text-gray-500">
                Rejected by {scenario.rejectedBy} on {scenario.rejectedAt}
                {scenario.rejectionReason && <div className="mt-1">Reason: {scenario.rejectionReason}</div>}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Version History</h3>
          {scenario.versions.map((version) => (
            <div key={version.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Version {version.version}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Created by {version.createdBy} on {version.createdAt}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">{version.changes}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => onViewVersion(version)}>
                  <ClockIcon className="h-4 w-4 mr-2" />
                  View Version
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ScenarioVersionHistory; 