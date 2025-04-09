import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Badge } from "../../components/ui/Badge"
import { ArrowTrendingUpIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline"

export const CrossSellOpportunities = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cross-Sell & Upsell Opportunities</CardTitle>
        <CardDescription>Identify opportunities to increase per-capita spending</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Upsell Opportunities</h3>
            <div className="space-y-4">
              <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                    <ArrowTrendingUpIcon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Standard to Express Pass</h4>
                    <p className="mt-1 text-xs text-gray-500">
                      42% of standard ticket purchasers are likely to upgrade to express pass when offered at checkout
                    </p>
                    <div className="mt-2">
                      <Badge variant="default">
                        High Conversion Potential
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                    <ArrowTrendingUpIcon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">1-Day to 2-Day Ticket</h4>
                    <p className="mt-1 text-xs text-gray-500">
                      28% of 1-day ticket purchasers convert to 2-day when shown value comparison
                    </p>
                    <div className="mt-2">
                      <Badge variant="default">
                        Medium Conversion Potential
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Cross-Sell Opportunities</h3>
            <div className="space-y-4">
              <div className="p-4 bg-secondary-50 border border-secondary-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1 bg-secondary-100 rounded-md">
                    <ArrowsPointingOutIcon className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Photo Package with Tickets</h4>
                    <p className="mt-1 text-xs text-gray-500">
                      35% of families purchase photo package when offered with ticket purchase
                    </p>
                    <div className="mt-2">
                      <Badge variant="secondary">
                        High Conversion Potential
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-secondary-50 border border-secondary-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1 bg-secondary-100 rounded-md">
                    <ArrowsPointingOutIcon className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Dining Plan with Multi-Day Tickets</h4>
                    <p className="mt-1 text-xs text-gray-500">
                      52% of multi-day ticket purchasers add dining plan when offered at checkout
                    </p>
                    <div className="mt-2">
                      <Badge variant="secondary">
                        Very High Conversion Potential
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

