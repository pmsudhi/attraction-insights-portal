"use client"

import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { ErrorBoundary } from "../ErrorBoundary"

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardLayout = ({ children, className = "" }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex min-h-screen flex-col lg:pl-72">
        <Header setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 py-10">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ErrorBoundary
              fallback={
                <div className="rounded-lg border border-danger-200 bg-danger-50 p-4 text-danger-600">
                  <h3 className="mb-2 font-semibold">Something went wrong</h3>
                  <p>Please try again later or contact support if the problem persists.</p>
                </div>
              }
            >
              <div className={className}>{children}</div>
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

