
"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { ErrorBoundary } from "../ErrorBoundary"
import { Toaster } from "@/components/ui/toaster"
import { useAppContext } from "@/context/AppContext"

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardLayout = ({ children, className = "" }: DashboardLayoutProps) => {
  const { sidebarCollapsed, toggleSidebar } = useAppContext();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Animation on initial load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar sidebarOpen={!sidebarCollapsed} setSidebarOpen={(open) => toggleSidebar()} />
      
      <div className="flex min-h-screen flex-col lg:pl-72 transition-all duration-300">
        <Header setSidebarOpen={toggleSidebar} />
        
        <main className="flex-1 py-8 md:py-10">
          <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <ErrorBoundary
              fallback={
                <div className="rounded-lg border border-danger-200 bg-danger/10 p-4 text-danger">
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
      
      <Toaster />
    </div>
  )
}

export default DashboardLayout
