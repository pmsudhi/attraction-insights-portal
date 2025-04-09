"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { DocumentTextIcon, PlusIcon, DocumentMagnifyingGlassIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

export function ConsolidationEliminations() {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Intercompany Eliminations</CardTitle>
        <CardDescription>Manage and track intercompany transaction eliminations</CardDescription>
        <div className="mt-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <span className="flex items-center">
                <DocumentMagnifyingGlassIcon className="h-4 w-4 mr-2" />
                Audit Trail
              </span>
            </Button>
            <Button variant="default" size="sm">
              <span className="flex items-center">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Elimination
              </span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Transaction
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  From
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  To
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className={selectedTransaction === "ICT-001" ? "bg-primary-50" : ""}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">ICT-001</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Adventure Park</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Water Paradise</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">$12.5M</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="default">
                    Management Fee
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="default">
                    Eliminated
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="outline" size="sm"
                    onClick={() => setSelectedTransaction(selectedTransaction === "ICT-001" ? null : "ICT-001")}
                  >
                    {selectedTransaction === "ICT-001" ? "Hide Details" : "View Details"}
                  </Button>
                </td>
              </tr>
              {selectedTransaction === "ICT-001" && (
                <tr className="bg-primary-50">
                  <td colSpan={7} className="px-6 py-4">
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <div className="text-xs font-medium text-gray-500">Transaction Date</div>
                          <div className="mt-1 text-sm font-medium text-gray-900">March 15, 2025</div>
                        </div>
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <div className="text-xs font-medium text-gray-500">Elimination Date</div>
                          <div className="mt-1 text-sm font-medium text-gray-900">March 31, 2025</div>
                        </div>
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <div className="text-xs font-medium text-gray-500">Eliminated By</div>
                          <div className="mt-1 text-sm font-medium text-gray-900">John Smith</div>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-md border border-gray-200">
                        <div className="text-xs font-medium text-gray-500">Elimination Notes</div>
                        <div className="mt-1 text-sm text-gray-900">
                          Standard quarterly management fee elimination between Adventure Park and Water Paradise.
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <span className="flex items-center">
                            <DocumentTextIcon className="h-4 w-4 mr-2" />
                            Documentation
                          </span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <span className="flex items-center">
                            <DocumentMagnifyingGlassIcon className="h-4 w-4 mr-2" />
                            Audit History
                          </span>
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">ICT-002</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">European Park</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Safari Kingdom</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">$8.2M</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="default">
                    IP Licensing
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="default">
                    Eliminated
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">ICT-003</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Adventure Park</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">European Park</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">$15.8M</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="default">
                    Equipment Transfer
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="secondary">
                    Pending
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="outline" size="sm">
                    Process
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">ICT-004</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Safari Kingdom</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Water Paradise</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">$8.7M</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="default">
                    Shared Services
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="destructive">
                    Discrepancy
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="outline" size="sm">
                    Resolve
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
              <CheckCircleIcon className="h-5 w-5 text-primary-600" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900">Elimination Summary</h4>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-2 rounded-md border border-gray-200">
                  <div className="text-xs font-medium text-gray-500">Total Transactions</div>
                  <div className="mt-1 text-sm font-medium text-gray-900">12</div>
                </div>
                <div className="bg-white p-2 rounded-md border border-gray-200">
                  <div className="text-xs font-medium text-gray-500">Eliminated</div>
                  <div className="mt-1 text-sm font-medium text-success-600">10 ($38.2M)</div>
                </div>
                <div className="bg-white p-2 rounded-md border border-gray-200">
                  <div className="text-xs font-medium text-gray-500">Pending/Issues</div>
                  <div className="mt-1 text-sm font-medium text-warning-600">2 ($24.5M)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

