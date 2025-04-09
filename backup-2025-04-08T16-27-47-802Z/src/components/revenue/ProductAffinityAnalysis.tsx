import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Badge } from "../../components/ui/Badge"
import { PuzzlePieceIcon } from "@heroicons/react/24/outline"
import { BarChart } from "../../components/ui/charts"

export const ProductAffinityAnalysis = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Affinity Analysis</CardTitle>
        <CardDescription>Identify which products are frequently purchased together</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <BarChart 
            data={[
              { label: "1-Day + VIP", value: 68 },
              { label: "Season + Photo", value: 54 },
              { label: "Multi-Day + Dining", value: 47 },
              { label: "Group + Express", value: 42 }
            ]}
            xField="label"
            yFields={["value"]}
          />
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Top Product Combinations</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                  <span className="text-sm text-gray-700">1-Day Ticket + VIP Experience</span>
                </div>
                <span className="text-sm font-medium text-gray-900">68% Affinity</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mr-2" />
                  <span className="text-sm text-gray-700">Season Pass + Photo Package</span>
                </div>
                <span className="text-sm font-medium text-gray-900">54% Affinity</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-success-500 rounded-full mr-2" />
                  <span className="text-sm text-gray-700">Multi-Day Ticket + Dining Plan</span>
                </div>
                <span className="text-sm font-medium text-gray-900">47% Affinity</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-warning-500 rounded-full mr-2" />
                  <span className="text-sm text-gray-700">Group Ticket + Express Pass</span>
                </div>
                <span className="text-sm font-medium text-gray-900">42% Affinity</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Bundle Recommendations</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                  <PuzzlePieceIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Family Bundle</h4>
                  <p className="mt-1 text-xs text-gray-500">
                    2 Adult + 2 Child tickets with dining vouchers and photo package
                  </p>
                  <div className="mt-1">
                    <Badge variant="default">
                      +12% Revenue Potential
                    </Badge>
                  </div>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-secondary-100 rounded-md">
                  <PuzzlePieceIcon className="h-5 w-5 text-secondary-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Weekend Warrior</h4>
                  <p className="mt-1 text-xs text-gray-500">2-Day ticket with express pass and premium parking</p>
                  <div className="mt-1">
                    <Badge variant="secondary">
                      +8% Revenue Potential
                    </Badge>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

