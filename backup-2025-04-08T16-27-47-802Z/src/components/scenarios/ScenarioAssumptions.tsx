import { useState } from "react"
import { Button } from "../ui/Button"
import { Card, CardHeader, CardContent } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import type { ScenarioAssumption } from "../../utils/scenario-modeling/types"

interface ScenarioAssumptionsProps {
  assumptions: ScenarioAssumption[]
  onAdd: (assumption: Omit<ScenarioAssumption, "id" | "lastUpdated">) => void
  onEdit: (assumption: ScenarioAssumption) => void
  onDelete: (id: string) => void
}

export const ScenarioAssumptions = ({ assumptions, onAdd, onEdit, onDelete }: ScenarioAssumptionsProps) => {
  const [isAdding, setIsAdding] = useState(false)
  const [newAssumption, setNewAssumption] = useState<Partial<ScenarioAssumption>>({
    category: "",
    description: "",
    value: "",
    unit: "",
    source: "",
    notes: "",
  })

  const handleAdd = () => {
    if (newAssumption.category && newAssumption.description && newAssumption.value) {
      onAdd(newAssumption as Omit<ScenarioAssumption, "id" | "lastUpdated">)
      setNewAssumption({
        category: "",
        description: "",
        value: "",
        unit: "",
        source: "",
        notes: "",
      })
      setIsAdding(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Scenario Assumptions</h3>
            <p className="text-sm text-gray-500">Document and track key assumptions used in this scenario</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsAdding(true)}>
            <span className="flex items-center">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Assumption
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  value={newAssumption.category}
                  onChange={(e) => setNewAssumption({ ...newAssumption, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={newAssumption.description}
                  onChange={(e) => setNewAssumption({ ...newAssumption, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                  Value
                </label>
                <input
                  type="text"
                  id="value"
                  value={newAssumption.value}
                  onChange={(e) => setNewAssumption({ ...newAssumption, value: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                  Unit
                </label>
                <input
                  type="text"
                  id="unit"
                  value={newAssumption.unit}
                  onChange={(e) => setNewAssumption({ ...newAssumption, unit: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                  Source
                </label>
                <input
                  type="text"
                  id="source"
                  value={newAssumption.source}
                  onChange={(e) => setNewAssumption({ ...newAssumption, source: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <input
                  type="text"
                  id="notes"
                  value={newAssumption.notes}
                  onChange={(e) => setNewAssumption({ ...newAssumption, notes: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button variant="default" size="sm" onClick={handleAdd}>
                Add Assumption
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {assumptions.map((assumption) => (
            <div key={assumption.id} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{assumption.category}</h4>
                  <p className="text-sm text-gray-600">{assumption.description}</p>
                  <div className="mt-2">
                    <Badge variant="secondary">{assumption.value} {assumption.unit}</Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(assumption)}>
                    <span className="flex items-center">
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Edit
                    </span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(assumption.id)}>
                    <span className="flex items-center">
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Delete
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ScenarioAssumptions; 