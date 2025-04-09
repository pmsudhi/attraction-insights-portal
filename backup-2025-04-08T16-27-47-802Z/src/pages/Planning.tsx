"use client"

import { useState } from "react"
import { Button } from "../components/ui/Button"
import { CalendarIcon, PlusIcon } from "@heroicons/react/24/outline"
import ScenarioComparison from "../components/scenarios/ScenarioComparison"
import ScenarioList from "../components/scenarios/ScenarioList"
import ScenarioEditor from "../components/scenarios/ScenarioEditor"
import { sampleScenarios } from "../utils/scenario-modeling/sample-data"
import { calculateOutcomes } from "../utils/scenario-modeling"
import type { Scenario, ScenarioAssumption } from "../utils/scenario-modeling/types"
import DriverImpactVisualization from "../components/scenarios/DriverImpactVisualization"
import OperatingCalendar from "../components/planning/OperatingCalendar"
import AttendanceModeling from "../components/planning/AttendanceModeling"
import RollingForecast from "../components/planning/RollingForecast"

export default function Planning() {
  const [activeTab, setActiveTab] = useState("scenarios")
  const [scenarios, setScenarios] = useState<Scenario[]>(sampleScenarios)
  const [editingScenario, setEditingScenario] = useState<Scenario | null>(null)
  const [baselineScenario, setBaselineScenario] = useState<Scenario>(
    sampleScenarios.find((s) => s.type === "baseline") || sampleScenarios[0],
  )

  const handleCreateScenario = () => {
    const newScenario: Scenario = {
      id: `scenario-${Date.now()}`,
      name: "New Scenario",
      description: "Description of the new scenario",
      lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      type: "custom",
      scope: "all",
      driverValues: {},
      outcomes: calculateOutcomes({}),
      assumptions: [],
      versions: [
        {
          id: `version-${Date.now()}`,
          version: 1,
          createdAt: new Date().toISOString(),
          createdBy: "Current User", // TODO: Get from auth context
          changes: "Initial scenario creation",
          scenario: {} as Scenario, // Circular reference, will be populated at runtime
        },
      ],
      status: "draft",
    }
    setEditingScenario(newScenario)
  }

  const handleEditScenario = (scenario: Scenario) => {
    setEditingScenario({ ...scenario })
  }

  const handleCloneScenario = (scenario: Scenario) => {
    const clonedScenario: Scenario = {
      ...scenario,
      id: `scenario-${Date.now()}`,
      name: `${scenario.name} (Copy)`,
      lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      assumptions: scenario.assumptions.map((a: ScenarioAssumption) => ({ ...a, id: `assumption-${Date.now()}-${Math.random()}` })),
      versions: [
        {
          id: `version-${Date.now()}`,
          version: 1,
          createdAt: new Date().toISOString(),
          createdBy: "Current User", // TODO: Get from auth context
          changes: "Cloned from previous version",
          scenario: {} as Scenario, // Circular reference, will be populated at runtime
        },
      ],
      status: "draft",
    }
    setScenarios([...scenarios, clonedScenario])
  }

  const handleDeleteScenario = (scenarioId: string) => {
    setScenarios(scenarios.filter((s) => s.id !== scenarioId))
  }

  const handleSaveScenario = (scenario: Scenario) => {
    const existingIndex = scenarios.findIndex((s) => s.id === scenario.id)

    if (existingIndex >= 0) {
      // Update existing scenario
      const updatedScenarios = [...scenarios]
      updatedScenarios[existingIndex] = scenario
      setScenarios(updatedScenarios)
    } else {
      // Add new scenario
      setScenarios([...scenarios, scenario])
    }

    setEditingScenario(null)
  }

  const handleCancelEdit = () => {
    setEditingScenario(null)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planning & Scenario Building</h1>
          <p className="mt-1 text-sm text-gray-500">Create, manage, and compare business scenarios</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4" />
            2025 Season
          </Button>
          <Button variant="default" size="sm" onClick={handleCreateScenario}>
            <PlusIcon className="h-4 w-4" />
            New Scenario
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === "scenarios"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
            onClick={() => setActiveTab("scenarios")}
          >
            Scenarios
          </button>
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === "calendar"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
            onClick={() => setActiveTab("calendar")}
          >
            Calendar
          </button>
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === "attendance"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
            onClick={() => setActiveTab("attendance")}
          >
            Attendance Modeling
          </button>
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === "forecast"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
            onClick={() => setActiveTab("forecast")}
          >
            Rolling Forecast
          </button>
        </nav>
      </div>

      {/* Scenarios content */}
      {activeTab === "scenarios" && (
        <div className="space-y-6">
          {editingScenario ? (
            <ScenarioEditor scenario={editingScenario} onSave={handleSaveScenario} onCancel={handleCancelEdit} />
          ) : (
            <>
              <ScenarioComparison scenarios={scenarios} baselineScenario={baselineScenario} />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <ScenarioList
                  scenarios={scenarios}
                  onEdit={handleEditScenario}
                  onClone={handleCloneScenario}
                  onDelete={handleDeleteScenario}
                />

                <div className="space-y-6">
                  <DriverImpactVisualization data={baselineScenario.driverValues} />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Calendar content */}
      {activeTab === "calendar" && <OperatingCalendar />}

      {/* Attendance Modeling content */}
      {activeTab === "attendance" && <AttendanceModeling />}

      {/* Rolling Forecast content */}
      {activeTab === "forecast" && <RollingForecast />}
    </div>
  )
}

