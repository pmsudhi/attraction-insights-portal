import { useState } from "react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import type { ScenarioAssumption } from "../../utils/scenario-modeling/types"

interface ScenarioAssumptionsProps {
  assumptions: ScenarioAssumption[]
  onAdd: (assumption: Omit<ScenarioAssumption, "id">) => void
  onEdit: (id: string, assumption: Partial<ScenarioAssumption>) => void
  onDelete: (id: string) => void
}

export default function ScenarioAssumptions({
  assumptions,
  onAdd,
  onEdit,
  onDelete,
}: ScenarioAssumptionsProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newAssumption, setNewAssumption] = useState({ title: "", description: "" })

  const handleAdd = () => {
    if (newAssumption.title.trim() && newAssumption.description.trim()) {
      onAdd({
        title: newAssumption.title,
        description: newAssumption.description,
        createdAt: new Date().toISOString(),
      })
      setNewAssumption({ title: "", description: "" })
      setIsAdding(false)
    }
  }

  const handleEdit = (id: string, updatedAssumption: Partial<ScenarioAssumption>) => {
    onEdit(id, updatedAssumption)
    setEditingId(null)
  }

  return (
    <div>
      {/* Header with Add Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-gray-900">Scenario Assumptions</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAdding(!isAdding)}
              className="h-7 px-2"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Assumption
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Document and track key assumptions used in this scenario
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="space-y-4 overflow-y-auto">
        {/* Add Form */}
        {isAdding && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-3 mb-4">
            <Input
              placeholder="Assumption title"
              value={newAssumption.title}
              onChange={(e) => setNewAssumption({ ...newAssumption, title: e.target.value })}
              className="w-full"
            />
            <Textarea
              placeholder="Describe your assumption..."
              value={newAssumption.description}
              onChange={(e) => setNewAssumption({ ...newAssumption, description: e.target.value })}
              rows={2}
              className="w-full"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsAdding(false)
                  setNewAssumption({ title: "", description: "" })
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleAdd}
                disabled={!newAssumption.title.trim() || !newAssumption.description.trim()}
              >
                Add
              </Button>
            </div>
          </div>
        )}

        {/* Assumptions List */}
        <div className="space-y-3">
          {assumptions.length === 0 && !isAdding && (
            <div className="text-center py-6 text-sm text-gray-500">
              No assumptions added yet. Click &quot;Add Assumption&quot; to get started.
            </div>
          )}
          
          {assumptions.map((assumption) => (
            <div
              key={assumption.id}
              className="bg-white border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors"
            >
              {editingId === assumption.id ? (
                <div className="space-y-3">
                  <Input
                    value={assumption.title}
                    onChange={(e) => handleEdit(assumption.id, { title: e.target.value })}
                    className="w-full"
                  />
                  <Textarea
                    value={assumption.description}
                    onChange={(e) => handleEdit(assumption.id, { description: e.target.value })}
                    rows={2}
                    className="w-full"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleEdit(assumption.id, assumption)}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between group">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{assumption.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{assumption.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Added {new Date(assumption.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingId(assumption.id)}
                        className="p-1 h-auto"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(assumption.id)}
                        className="p-1 h-auto text-red-600 hover:text-red-700"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 