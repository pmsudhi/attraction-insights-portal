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
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-800 px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <AttractionPlanLogo className="h-8 w-auto text-white" />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className={`
                                  group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                                  ${
                                    pathname === item.href
                                      ? "bg-primary-700 text-white"
                                      : "text-primary-200 hover:bg-primary-700 hover:text-white"
                                  }
                                `}
                                onClick={() => setSidebarOpen(false)}
                              >
                                <item.icon
                                  className={`
                                    h-6 w-6 shrink-0
                                    ${
                                      pathname === item.href
                                        ? "text-white"
                                        : "text-primary-200 group-hover:text-white"
                                    }
                                  `}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-primary-200">Support</div>
                        <ul role="list" className="mt-2 -mx-2 space-y-1">
                          {secondaryNavigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-primary-200 hover:bg-primary-700 hover:text-white"
                                onClick={() => setSidebarOpen(false)}
                              >
                                <item.icon
                                  className="h-6 w-6 shrink-0 text-primary-200 group-hover:text-white"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-800 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <AttractionPlanLogo className="h-8 w-auto text-white" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                          ${
                            pathname === item.href
                              ? "bg-primary-700 text-white"
                              : "text-primary-200 hover:bg-primary-700 hover:text-white"
                          }
                        `}
                      >
                        <item.icon
                          className={`
                            h-6 w-6 shrink-0
                            ${
                              pathname === item.href
                                ? "text-white"
                                : "text-primary-200 group-hover:text-white"
                            }
                          `}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <div className="text-xs font-semibold leading-6 text-primary-200">Support</div>
                <ul role="list" className="mt-2 -mx-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-primary-200 hover:bg-primary-700 hover:text-white"
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0 text-primary-200 group-hover:text-white"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

