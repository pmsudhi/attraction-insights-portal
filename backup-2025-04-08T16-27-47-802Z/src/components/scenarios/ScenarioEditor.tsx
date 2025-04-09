"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { driverCategories, outcomeMetrics, calculateOutcomes } from "../../utils/scenario-modeling"
import type { Scenario, ScenarioAssumption, ScenarioVersion } from "../../utils/scenario-modeling/types"
import ScenarioAssumptions from "./ScenarioAssumptions"
import ScenarioVersionHistory from "./ScenarioVersionHistory"

interface ScenarioEditorProps {
  scenario: Scenario
  onSave: (scenario: Scenario) => void
  onCancel: () => void
}

export default function ScenarioEditor({ scenario, onSave, onCancel }: ScenarioEditorProps) {
  const [driverValues, setDriverValues] = useState<Record<string, number>>(scenario.driverValues || {})
  const [outcomes, setOutcomes] = useState(scenario.outcomes || {})
  const [name, setName] = useState(scenario.name)
  const [description, setDescription] = useState(scenario.description || "")
  const [type, setType] = useState<Scenario["type"]>(scenario.type)
  const [assumptions, setAssumptions] = useState<ScenarioAssumption[]>(scenario.assumptions || [])
  const [selectedVersion, setSelectedVersion] = useState<ScenarioVersion | null>(null)

  // Calculate outcomes whenever driver values change
  useEffect(() => {
    const newOutcomes = calculateOutcomes(driverValues)
    setOutcomes(newOutcomes)
  }, [driverValues])

  const handleDriverChange = (driverId: string, value: number) => {
    setDriverValues((prev) => ({
      ...prev,
      [driverId]: value,
    }))
  }

  const handleSave = () => {
    const now = new Date().toISOString();
    const newVersion: ScenarioVersion = {
      id: `version-${Date.now()}`,
      version: scenario.versions.length + 1,
      createdAt: now,
      createdBy: "Current User", // TODO: Get from auth context
      changes: "Updated scenario details and assumptions",
      scenario: {
        ...scenario,
        name,
        description,
        type,
        driverValues,
        assumptions,
        outcomes,
        lastUpdated: now,
        scope: scenario.scope || "all",
      }
    };

    const updatedScenario: Scenario = {
      ...scenario,
      name,
      description,
      type,
      driverValues,
      assumptions,
      outcomes,
      lastUpdated: now,
      status: scenario.status === "draft" ? "pending_review" : scenario.status,
      versions: [...scenario.versions, newVersion]
    };
    onSave(updatedScenario);
  }

  const handleAddAssumption = (assumption: Omit<ScenarioAssumption, "id" | "lastUpdated">) => {
    const newAssumption: ScenarioAssumption = {
      ...assumption,
      id: `assumption-${Date.now()}`,
      lastUpdated: new Date().toISOString(),
    }
    setAssumptions([...assumptions, newAssumption])
  }

  const handleEditAssumption = (assumption: ScenarioAssumption) => {
    const updatedAssumptions = assumptions.map((a) =>
      a.id === assumption.id ? { ...assumption, lastUpdated: new Date().toISOString() } : a,
    )
    setAssumptions(updatedAssumptions)
  }

  const handleDeleteAssumption = (id: string) => {
    setAssumptions(assumptions.filter((a) => a.id !== id))
  }

  const handleApprove = () => {
    const updatedScenario: Scenario = {
      ...scenario,
      status: "approved",
      approvedBy: "Current User", // TODO: Get from auth context
      approvedAt: new Date().toISOString(),
    }
    onSave(updatedScenario)
  }

  const handleReject = (reason: string) => {
    const updatedScenario: Scenario = {
      ...scenario,
      status: "rejected",
      rejectedBy: "Current User", // TODO: Get from auth context
      rejectedAt: new Date().toISOString(),
      rejectionReason: reason,
    }
    onSave(updatedScenario)
  }

  const handleViewVersion = (version: ScenarioVersion) => {
    const versionScenario = version.scenario;
    setName(versionScenario.name);
    setDescription(versionScenario.description || "");
    setType(versionScenario.type);
    setDriverValues(versionScenario.driverValues || {});
    setAssumptions(versionScenario.assumptions || []);
    setSelectedVersion(version);
    setOutcomes(versionScenario.outcomes || {});
  }

  const getTypeColor = (scenarioType: string) => {
    switch (scenarioType) {
      case "baseline":
        return "primary"
      case "optimistic":
        return "success"
      case "conservative":
        return "warning"
      case "weather":
        return "danger"
      default:
        return "gray"
    }
  }

  // Fix type issues with outcome metrics
  const formatOutcome = (metric: keyof typeof outcomeMetrics, value: number) => {
    const metricConfig = outcomeMetrics[metric];
    return `${metricConfig.unit}${value.toLocaleString()}`;
  };

  // Update the scenario type to match the expected interface
  const updatedScenario: Scenario = {
    ...scenario,
    lastUpdated: new Date().toISOString(),
    type: scenario.type || "custom",
    scope: scenario.scope || "all",
    driverValues: scenario.driverValues || {},
    outcomes: scenario.outcomes || {},
    assumptions: scenario.assumptions || [],
    versions: scenario.versions || [],
    status: scenario.status || "draft"
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Scenario Editor"
          subtitle="Adjust drivers to see their impact on outcomes"
          action={
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={onCancel} icon={<XMarkIcon className="h-4 w-4" />}>
                Cancel
              </Button>
              <Button variant="default" size="sm" onClick={handleSave} icon={<CheckIcon className="h-4 w-4" />}>
                Save Scenario
              </Button>
            </div>
          }
        />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Scenario Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Scenario Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value as Scenario["type"])}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="baseline">Baseline</option>
                  <option value="optimistic">Optimistic</option>
                  <option value="conservative">Conservative</option>
                  <option value="weather">Weather Impact</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div className="mt-6">
                <Badge variant={getTypeColor(type)} size="md">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
                <Badge variant="gray">
                  All Properties
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Projected Outcomes</h3>
              <div className="space-y-3">
                {(Object.keys(outcomeMetrics) as Array<keyof typeof outcomeMetrics>).map((key) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="font-medium">{outcomeMetrics[key].label}</span>
                    <div className="flex items-center">
                      <span className="text-gray-900">
                        {formatOutcome(key, outcomes[key]?.value || outcomeMetrics[key].baseline)}
                      </span>
                      {outcomes[key]?.percentChange !== undefined && (
                        <span className={`ml-2 ${outcomes[key].percentChange > 0 ? 'text-success-600' : 'text-danger-600'}`}>
                          ({outcomes[key].percentChange > 0 ? '+' : ''}{outcomes[key].percentChange.toFixed(1)}%)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Driver Adjustments</h3>

            {Object.entries(driverCategories).map(([categoryKey, category]) => (
              <div key={categoryKey} className="mb-6">
                <h4 className="text-md font-medium text-gray-800 mb-3">{category.label}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(category.drivers).map(([driverKey, driver]) => {
                    const fullDriverKey = `${categoryKey}.${driverKey}`
                    const currentValue = driverValues[fullDriverKey] || 0

                    return (
                      <div key={fullDriverKey} className="p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between mb-1">
                          <label htmlFor={fullDriverKey} className="block text-sm font-medium text-gray-700">
                            {driver.label}
                          </label>
                          <span
                            className={`text-sm font-medium ${currentValue > 0 ? "text-success-600" : currentValue < 0 ? "text-danger-600" : "text-gray-500"}`}
                          >
                            {currentValue > 0 ? "+" : ""}
                            {currentValue}%
                          </span>
                        </div>
                        <input
                          type="range"
                          id={fullDriverKey}
                          min="-20"
                          max="20"
                          step="0.5"
                          value={currentValue}
                          onChange={(e) => handleDriverChange(fullDriverKey, Number.parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>-20%</span>
                          <span>0%</span>
                          <span>+20%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ScenarioAssumptions
        assumptions={assumptions}
        onAdd={handleAddAssumption}
        onEdit={handleEditAssumption}
        onDelete={handleDeleteAssumption}
      />

      <ScenarioVersionHistory
        scenario={scenario}
        onApprove={handleApprove}
        onReject={handleReject}
        onViewVersion={handleViewVersion}
      />
    </div>
  )
}

