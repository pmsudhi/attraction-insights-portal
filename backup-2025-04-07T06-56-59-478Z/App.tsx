"use client"

import { AppProvider } from "./context/AppContext"
import { DashboardLayout } from "./components/layout/DashboardLayout"

export function App() {
  return (
    <AppProvider>
      <DashboardLayout>
        <div className="p-4">Welcome to the Dashboard</div>
      </DashboardLayout>
    </AppProvider>
  )
}

