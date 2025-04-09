import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import type { Scenario, ScenarioVersion } from "../../utils/scenario-modeling/types"

interface ScenarioVersionHistoryProps {
  scenario: Scenario
  onApprove: () => void
  onReject: (reason: string) => void
  onViewVersion: (version: ScenarioVersion) => void
}

export default function ScenarioVersionHistory({
  scenario,
  onApprove,
  onReject,
  onViewVersion,
}: ScenarioVersionHistoryProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "success"
      case "rejected":
        return "destructive"
      case "pending_review":
        return "warning"
      default:
        return "secondary"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  return (
    <div className="space-y-6">
      {/* Current Status Section */}
      <div className="border-b border-gray-200 pb-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Current Status</h4>
        <div className="flex items-center space-x-2">
          <Badge variant={getStatusBadgeVariant(scenario.status)}>
            {scenario.status.charAt(0).toUpperCase() + scenario.status.slice(1).replace('_', ' ')}
          </Badge>
          {scenario.status === "pending_review" && (
            <div className="flex space-x-2">
              <Button size="sm" variant="default" onClick={onApprove}>
                Approve
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onReject("Needs revision")}>
                Reject
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Version History List */}
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-4">Version History</h4>
        <div className="space-y-4">
          {scenario.versions.map((version) => (
            <div
              key={version.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900">Version {version.version}</span>
                  <span className="text-xs text-gray-500">{formatDate(version.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{version.changes}</p>
                <p className="text-xs text-gray-500 mt-1">Created by {version.createdBy}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewVersion(version)}
                className="ml-4"
              >
                View Version
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 