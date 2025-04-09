"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import { useLocation } from "react-router-dom"

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void
}

export const Header = ({ setSidebarOpen }: HeaderProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const notificationsRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Store ARIA attribute values as string literals
  const notificationsExpanded = notificationsOpen ? "true" : "false"
  const userMenuExpanded = userMenuOpen ? "true" : "false"

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close menus on escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setNotificationsOpen(false)
        setUserMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [])

  // Get page title based on current route
  const getPageTitle = () => {
    if (pathname === "/") return "Dashboard"
    if (pathname.includes("/planning")) return "Planning & Scenario Building"
    if (pathname.includes("/financial")) return "Financial Modeling & Analytics"
    if (pathname.includes("/revenue")) return "Revenue Optimization"
    if (pathname.includes("/consolidation")) return "Financial Consolidation"
    if (pathname.includes("/executive")) return "Executive Intelligence"
    if (pathname.includes("/analytics")) return "Cross-Functional Analytics"
    return "Dashboard"
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 justify-between px-4">
        <div className="flex flex-1 items-center">
          <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
        </div>

        <div className="ml-4 flex items-center md:ml-6 space-x-3">
          {/* Search */}
          <div className="relative">
            <label htmlFor="search-input" className="sr-only">
              Search
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search-input"
              type="text"
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 hidden md:block"
              placeholder="Search"
            />
          </div>

          {/* Calendar button */}
          <button
            type="button"
            className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="View calendar"
          >
            <span className="sr-only">View calendar</span>
            <CalendarIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Reports button */}
          <button
            type="button"
            className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="View reports"
          >
            <span className="sr-only">View reports</span>
            <ChartBarIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Settings button */}
          <button
            type="button"
            className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="View settings"
          >
            <span className="sr-only">View settings</span>
            <CogIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Notification dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              aria-expanded="false"
              aria-haspopup="true"
              aria-label="View notifications"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              <span
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center"
                aria-label="3 unread notifications"
              >
                3
              </span>
            </button>

            {notificationsOpen && (
              <div
                className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-dropdown ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                tabIndex={-1}
              >
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                  <div className="font-medium">Notifications</div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100"
                    role="menuitem"
                  >
                    <p className="font-medium">Break-even alert</p>
                    <p className="text-xs text-gray-500">Water Park attendance approaching break-even threshold</p>
                    <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100"
                    role="menuitem"
                  >
                    <p className="font-medium">Weather alert</p>
                    <p className="text-xs text-gray-500">Thunderstorm forecast for Adventure Park</p>
                    <p className="text-xs text-gray-400 mt-1">25 minutes ago</p>
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    <p className="font-medium">Capacity alert</p>
                    <p className="text-xs text-gray-500">Main Street approaching 85% capacity</p>
                    <p className="text-xs text-gray-400 mt-1">45 minutes ago</p>
                  </a>
                </div>
                <div className="border-t border-gray-100 px-4 py-2">
                  <a href="#" className="text-xs text-primary-600 hover:text-primary-800" role="menuitem">
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-expanded="false"
              aria-haspopup="true"
              aria-label="Open user menu"
            >
              <span className="sr-only">Open user menu</span>
              <UserCircleIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
            </button>

            {userMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-dropdown ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                tabIndex={-1}
              >
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Your Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

