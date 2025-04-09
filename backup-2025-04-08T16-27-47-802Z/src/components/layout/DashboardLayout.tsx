"use client"

import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { ErrorBoundary } from "../../utils/ErrorBoundary"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <ErrorBoundary
            fallback={<div className="p-4 text-danger-600">Something went wrong. Please try again later.</div>}
          >
            {children}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

