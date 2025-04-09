"use client"

import DashboardLayout from "@/components/layout/DashboardLayout"
import { CFOFinancialCommandCenter } from "@/components/executive/CFOFinancialCommandCenter"
import { COOOperationalExcellenceHub } from "@/components/executive/COOOperationalExcellenceHub"
import { FinancialSustainability } from "@/components/executive/FinancialSustainability"
import { OrganizationalHealth } from "@/components/executive/OrganizationalHealth"
import { StrategicRiskManagement } from "@/components/executive/StrategicRiskManagement"
import { GuestSegmentationLTV } from "@/components/executive/GuestSegmentationLTV"
import { MarketingROIDashboard } from "@/components/executive/MarketingROIDashboard"
import { AssetPerformanceTracker } from "@/components/executive/AssetPerformanceTracker"
import { GuestExperienceMatrix } from "@/components/executive/GuestExperienceMatrix"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CFOFinancialCommandCenter />
        <COOOperationalExcellenceHub />
        <FinancialSustainability />
        <OrganizationalHealth />
        <StrategicRiskManagement />
        <GuestSegmentationLTV />
        <MarketingROIDashboard />
        <AssetPerformanceTracker />
        <GuestExperienceMatrix />
      </div>
    </DashboardLayout>
  )
}