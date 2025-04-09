"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"
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
        return "default"
      case "optimistic":
        return "success"
      case "conservative":
        return "warning"
      case "weather":
        return "danger"
      default:
        return "secondary"
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
    <div className="h-screen flex flex-col">
      {/* Sticky Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Scenario Editor</h2>
              <p className="text-sm text-gray-500">Adjust drivers to see their impact on outcomes</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" onClick={onCancel}>
                <XMarkIcon className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button variant="default" size="sm" onClick={handleSave}>
                <CheckIcon className="h-4 w-4 mr-2" />
                Save Scenario
              </Button>
            </div>
          </div>

          {/* Top Section Grid */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {/* Scenario Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Scenario Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Scenario Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="Enter scenario name"
                  />
                </div>
                <div>
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
                <div className="flex space-x-2">
                  <Badge variant={getTypeColor(type)}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Badge>
                  <Badge variant="secondary">All Properties</Badge>
                </div>
              </div>
            </div>

            {/* Scenario Assumptions */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assumptions</h3>
              <div className="h-[200px] overflow-y-auto">
                <ScenarioAssumptions
                  assumptions={assumptions}
                  onAdd={handleAddAssumption}
                  onEdit={handleEditAssumption}
                  onDelete={handleDeleteAssumption}
                />
              </div>
            </div>

            {/* Projected Outcomes */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Projected Outcomes</h3>
              <div className="space-y-4">
                {/* Revenue & EBITDA */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-500">Revenue</span>
                    <div className="flex items-baseline">
                      <span className="text-lg font-bold text-gray-900">{formatOutcome('revenue', outcomes.revenue?.value || 0)}</span>
                      <span className={`ml-2 text-xs font-medium ${(outcomes.revenue?.percentChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {(outcomes.revenue?.percentChange || 0) > 0 ? '+' : ''}{outcomes.revenue?.percentChange?.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-500">EBITDA</span>
                    <div className="flex items-baseline">
                      <span className="text-lg font-bold text-gray-900">{formatOutcome('ebitda', outcomes.ebitda?.value || 0)}</span>
                      <span className={`ml-2 text-xs font-medium ${(outcomes.ebitda?.percentChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {(outcomes.ebitda?.percentChange || 0) > 0 ? '+' : ''}{outcomes.ebitda?.percentChange?.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Costs */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-500">Total Costs</span>
                    <div className="flex items-baseline">
                      <span className="text-lg font-bold text-gray-900">{formatOutcome('totalCosts', outcomes.totalCosts?.value || 0)}</span>
                      <span className={`ml-2 text-xs font-medium ${(outcomes.totalCosts?.percentChange || 0) <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {(outcomes.totalCosts?.percentChange || 0) > 0 ? '+' : ''}{outcomes.totalCosts?.percentChange?.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-500">Labor Cost</span>
                    <div className="flex items-baseline">
                      <span className="text-lg font-bold text-gray-900">{formatOutcome('laborCost', outcomes.laborCost?.value || 0)}</span>
                      <span className={`ml-2 text-xs font-medium ${(outcomes.laborCost?.percentChange || 0) <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {(outcomes.laborCost?.percentChange || 0) > 0 ? '+' : ''}{outcomes.laborCost?.percentChange?.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-500">Satisfaction</span>
                    <div className="flex items-baseline">
                      <span className="text-lg font-bold text-gray-900">{formatOutcome('satisfaction', outcomes.satisfaction?.value || 0)}</span>
                      <span className={`ml-2 text-xs font-medium ${(outcomes.satisfaction?.percentChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {(outcomes.satisfaction?.percentChange || 0) > 0 ? '+' : ''}{outcomes.satisfaction?.percentChange?.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-500">Efficiency</span>
                    <div className="flex items-baseline">
                      <span className="text-lg font-bold text-gray-900">{formatOutcome('operationalEfficiency', outcomes.operationalEfficiency?.value || 0)}</span>
                      <span className={`ml-2 text-xs font-medium ${(outcomes.operationalEfficiency?.percentChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {(outcomes.operationalEfficiency?.percentChange || 0) > 0 ? '+' : ''}{outcomes.operationalEfficiency?.percentChange?.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-7xl mx-auto p-4">
          {/* Description Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Describe the scenario"
            />
          </div>

          {/* Drivers Tabs Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <Tabs defaultValue="cost" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="cost">Cost Drivers</TabsTrigger>
                <TabsTrigger value="revenue">Revenue Drivers</TabsTrigger>
                <TabsTrigger value="external">External Drivers</TabsTrigger>
              </TabsList>

              <TabsContent value="cost">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(driverCategories.cost.drivers).map(([id, driver]) => (
                    <div key={id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor={`cost-${id}`} className="text-sm font-medium text-gray-700">{driver.label}</label>
                        <span className={`text-sm font-medium ${(driverValues[`cost.${id}`] || 0) > 0 ? 'text-green-600' : (driverValues[`cost.${id}`] || 0) < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                          {(driverValues[`cost.${id}`] || 0) > 0 ? '+' : ''}{driverValues[`cost.${id}`] || 0}%
                        </span>
                      </div>
                      <input
                        type="range"
                        id={`cost-${id}`}
                        aria-label={`Adjust ${driver.label}`}
                        min="-20"
                        max="20"
                        step="0.5"
                        value={driverValues[`cost.${id}`] || 0}
                        onChange={(e) => handleDriverChange(`cost.${id}`, parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>-20%</span>
                        <span>0%</span>
                        <span>+20%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="revenue">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(driverCategories.revenue.drivers).map(([id, driver]) => (
                    <div key={id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor={`revenue-${id}`} className="text-sm font-medium text-gray-700">{driver.label}</label>
                        <span className={`text-sm font-medium ${(driverValues[`revenue.${id}`] || 0) > 0 ? 'text-green-600' : (driverValues[`revenue.${id}`] || 0) < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                          {(driverValues[`revenue.${id}`] || 0) > 0 ? '+' : ''}{driverValues[`revenue.${id}`] || 0}%
                        </span>
                      </div>
                      <input
                        type="range"
                        id={`revenue-${id}`}
                        aria-label={`Adjust ${driver.label}`}
                        min="-20"
                        max="20"
                        step="0.5"
                        value={driverValues[`revenue.${id}`] || 0}
                        onChange={(e) => handleDriverChange(`revenue.${id}`, parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>-20%</span>
                        <span>0%</span>
                        <span>+20%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="external">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(driverCategories.external.drivers).map(([id, driver]) => (
                    <div key={id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor={`external-${id}`} className="text-sm font-medium text-gray-700">{driver.label}</label>
                        <span className={`text-sm font-medium ${(driverValues[`external.${id}`] || 0) > 0 ? 'text-green-600' : (driverValues[`external.${id}`] || 0) < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                          {(driverValues[`external.${id}`] || 0) > 0 ? '+' : ''}{driverValues[`external.${id}`] || 0}%
                        </span>
                      </div>
                      <input
                        type="range"
                        id={`external-${id}`}
                        aria-label={`Adjust ${driver.label}`}
                        min="-20"
                        max="20"
                        step="0.5"
                        value={driverValues[`external.${id}`] || 0}
                        onChange={(e) => handleDriverChange(`external.${id}`, parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>-20%</span>
                        <span>0%</span>
                        <span>+20%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Version History Section */}
          <div className="mt-4 bg-white rounded-lg border border-gray-200">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
              <h3 className="text-lg font-semibold text-gray-900">Version History</h3>
              <p className="text-sm text-gray-500">Track changes and updates</p>
            </div>
            <div className="p-4">
              <ScenarioVersionHistory
                scenario={updatedScenario}
                onApprove={handleApprove}
                onReject={handleReject}
                onViewVersion={handleViewVersion}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

