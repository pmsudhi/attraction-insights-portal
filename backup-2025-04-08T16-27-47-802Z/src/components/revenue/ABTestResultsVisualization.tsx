import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { BeakerIcon, ClockIcon, DocumentChartBarIcon, LightBulbIcon } from "@heroicons/react/24/outline"
import { LineChart } from "../../components/ui/charts"

export const ABTestResultsVisualization = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>A/B Test Results Visualization</CardTitle>
        <CardDescription>Analyze the results of A/B tests for promotions and pricing</CardDescription>
        <div className="mt-4">
          <Button variant="default" size="sm">
            <BeakerIcon className="h-4 w-4 mr-2" />
            New A/B Test
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Active Tests</h3>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-primary-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">Weekend Pricing Test</h4>
                  <Badge variant="default">
                    Active
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">Testing $89.99 vs $94.99 pricing for weekend tickets</p>
                <div className="mt-2 flex items-center text-xs">
                  <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-gray-500">8 days remaining</span>
                </div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">Email Subject Line Test</h4>
                  <Badge variant="secondary">
                    Completed
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">Testing promotional vs value-focused subject lines</p>
                <div className="mt-2 flex items-center text-xs">
                  <DocumentChartBarIcon className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-gray-500">View results</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Weekend Pricing Test Results</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium text-gray-500">Variant A: $89.99</div>
                    <div className="mt-1 text-lg font-semibold text-gray-900">4.2%</div>
                    <div className="mt-1 text-xs text-gray-500">Conversion Rate</div>
                  </div>
                  <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700">A</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-primary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium text-gray-500">Variant B: $94.99</div>
                    <div className="mt-1 text-lg font-semibold text-primary-600">3.8%</div>
                    <div className="mt-1 text-xs text-gray-500">Conversion Rate</div>
                  </div>
                  <div className="h-10 w-10 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">B</span>
                  </div>
                </div>
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
            <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                  <LightBulbIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Recommendation</h4>
                  <p className="mt-1 text-xs text-gray-700">
                    While Variant A has a higher conversion rate, Variant B generates 5.2% more revenue per visitor.
                    Recommend implementing Variant B pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

