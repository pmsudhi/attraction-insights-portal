import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { TicketIcon } from "@heroicons/react/24/outline"
import { LineChart } from "../../components/ui/charts"

export const NewProductImpactProjection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Product Impact Projection</CardTitle>
        <CardDescription>Project the impact of new products on revenue and attendance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="col-span-1 bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Proposed New Products</h3>
            <div className="space-y-3">
              <div className="flex items-center p-2 bg-gray-50 rounded-md cursor-pointer border border-primary-200">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                  <TicketIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Premium Season Pass</h4>
                  <p className="text-xs text-gray-500">Unlimited visits + express access</p>
                </div>
              </div>
              <div className="flex items-center p-2 bg-gray-50 rounded-md cursor-pointer">
                <div className="flex-shrink-0 p-1 bg-gray-100 rounded-md">
                  <TicketIcon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Flex Ticket</h4>
                  <p className="text-xs text-gray-500">Valid any day within 6 months</p>
                </div>
              </div>
              <div className="flex items-center p-2 bg-gray-50 rounded-md cursor-pointer">
                <div className="flex-shrink-0 p-1 bg-gray-100 rounded-md">
                  <TicketIcon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Family Bundle</h4>
                  <p className="text-xs text-gray-500">2 adults + 3 children package</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Premium Season Pass - Projected Impact</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-xs font-medium text-gray-500">Projected Sales (Year 1)</div>
                <div className="mt-1 text-xl font-semibold text-gray-900">12,500 units</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-xs font-medium text-gray-500">Revenue Impact</div>
                <div className="mt-1 text-xl font-semibold text-success-600">+$3.75M</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-xs font-medium text-gray-500">Cannibalization Rate</div>
                <div className="mt-1 text-xl font-semibold text-gray-900">18%</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-xs font-medium text-gray-500">Net Attendance Impact</div>
                <div className="mt-1 text-xl font-semibold text-success-600">+42,000</div>
              </div>
            </div>
            <div className="h-48">
              <LineChart 
                data={[
                  { label: "Jan", value: 100 },
                  { label: "Feb", value: 120 },
                  { label: "Mar", value: 115 },
                  { label: "Apr", value: 130 }
                ]}
                xField="label"
                yFields={["value"]}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

