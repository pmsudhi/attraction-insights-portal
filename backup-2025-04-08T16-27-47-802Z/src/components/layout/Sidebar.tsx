"use client"

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Link, useLocation } from "react-router-dom"
import {
  HomeIcon,
  CalendarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  BuildingLibraryIcon,
  PresentationChartLineIcon,
  Cog8ToothIcon,
  CloudIcon,
  UserGroupIcon,
  DocumentTextIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline"
import { AttractionPlanLogo } from "../ui/Logo"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { pathname } = useLocation()

  const navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    { name: "Planning & Scenarios", href: "/planning", icon: CalendarIcon },
    { name: "Financial Modeling", href: "/financial", icon: ChartBarIcon },
    { name: "Revenue Optimization", href: "/revenue", icon: CurrencyDollarIcon },
    { name: "Financial Consolidation", href: "/consolidation", icon: BuildingLibraryIcon },
    { name: "Executive Intelligence", href: "/executive", icon: PresentationChartLineIcon },
    { name: "Cross-Functional Analytics", href: "/analytics", icon: CloudIcon },
    { name: "Sustainability & ESG", href: "/analytics?tab=sustainability", icon: GlobeAltIcon },
  ]

  const secondaryNavigation = [
    { name: "Settings", href: "/settings", icon: Cog8ToothIcon },
    { name: "Team", href: "/team", icon: UserGroupIcon },
    { name: "Documentation", href: "/docs", icon: DocumentTextIcon },
  ]

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-primary-800 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex flex-shrink-0 items-center px-4">
                  <AttractionPlanLogo className="h-8 w-auto text-white" />
                </div>

                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`
                          group flex items-center px-2 py-2 text-base font-medium rounded-md
                          ${
                            pathname === item.href
                              ? "bg-primary-900 text-white"
                              : "text-primary-100 hover:bg-primary-700 hover:text-white"
                          }
                        `}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon
                          className={`
                            mr-4 h-6 w-6 flex-shrink-0
                            ${
                              pathname === item.href
                                ? "text-primary-300"
                                : "text-primary-200 group-hover:text-primary-200"
                            }
                          `}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-10">
                    <p className="px-3 text-xs font-semibold text-primary-200 uppercase tracking-wider">Support</p>
                    <nav className="mt-2 space-y-1 px-2">
                      {secondaryNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-primary-100 hover:bg-primary-700 hover:text-white"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <item.icon
                            className="mr-4 h-6 w-6 flex-shrink-0 text-primary-200 group-hover:text-primary-200"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-primary-800">
          <div className="flex h-16 flex-shrink-0 items-center bg-primary-900 px-4">
            <AttractionPlanLogo className="h-8 w-auto text-white" />
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${
                      pathname === item.href
                        ? "bg-primary-900 text-white"
                        : "text-primary-100 hover:bg-primary-700 hover:text-white"
                    }
                  `}
                >
                  <item.icon
                    className={`
                      mr-3 h-6 w-6 flex-shrink-0
                      ${
                        pathname === item.href
                          ? "text-primary-300"
                          : "text-primary-200 group-hover:text-primary-200"
                      }
                    `}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-5 flex-shrink-0 border-t border-primary-700 p-4">
              <p className="px-3 text-xs font-semibold text-primary-200 uppercase tracking-wider">Support</p>
              <nav className="mt-2 space-y-1">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-primary-100 hover:bg-primary-700 hover:text-white"
                  >
                    <item.icon
                      className="mr-3 h-6 w-6 flex-shrink-0 text-primary-200 group-hover:text-primary-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

