"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { ChevronDownIcon, PencilIcon, DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline"
import type { Scenario } from "../../utils/scenario-modeling/types"

interface ScenarioListProps {
  scenarios: Scenario[]
  onEdit: (scenario: Scenario) => void
  onClone: (scenario: Scenario) => void
  onDelete: (scenarioId: string) => void
}

export const ScenarioList = ({ scenarios, onEdit, onClone, onDelete }: ScenarioListProps) => {
  const getTypeColor = (scenarioType: string) => {
    switch (scenarioType) {
      case "baseline":
        return "default"
      case "optimistic":
        return "default"
      case "conservative":
        return "secondary"
      case "weather":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Scenarios</CardTitle>
        <CardDescription>Access and manage your scenarios</CardDescription>
        <div className="mt-4">
          <Button variant="outline" size="sm">
            <ChevronDownIcon className="h-4 w-4" />
            All Properties
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className={`flex items-center justify-between p-4 border rounded-lg ${
                scenario.type === "baseline" ? "bg-primary-50 border-primary-200" : "bg-gray-50 border-gray-200"
              }`}
            >
              <div>
                <h3 className="text-sm font-medium text-gray-900">{scenario.name}</h3>
                <p className="text-xs text-gray-500 mt-1">Last updated: {scenario.lastUpdated}</p>
                <div className="flex items-center mt-2">
                  <Badge variant={getTypeColor(scenario.type)}>
                    {scenario.type.charAt(0).toUpperCase() + scenario.type.slice(1)}
                  </Badge>
                  <Badge variant="secondary" className="ml-2">
                    {scenario.scope === "all" ? "All Properties" : "Specific Properties"}
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(scenario)}>
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => onClone(scenario)}>
                  <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
                  Clone
                </Button>
                {scenario.type !== "baseline" && (
                  <Button variant="outline" size="sm" onClick={() => onDelete(scenario.id)}>
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ScenarioList;

