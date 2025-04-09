import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { LineChart } from "../../components/ui/charts"

export const DiscountImpactAnalysis = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Discount Impact Analysis</CardTitle>
        <CardDescription>Analyze the impact of discounts on revenue and profitability</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
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
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Discount Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Discount %
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Redemptions
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Revenue Impact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Profit Impact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Incremental Visits
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Effectiveness
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Early Bird</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">15%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">4,285</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-success-600">+$245K</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-success-600">+$180K</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">3,420</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-success-500 h-2.5 rounded-full" style={{ width: "85%" }} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">High (85%)</div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Group Discount</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">20%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">2,845</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-success-600">+$320K</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-success-600">+$210K</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">5,690</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-success-500 h-2.5 rounded-full" style={{ width: "92%" }} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Very High (92%)</div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Flash Sale</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">25%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">1,245</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-success-600">+$85K</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-danger-600">-$15K</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">1,120</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-warning-500 h-2.5 rounded-full" style={{ width: "45%" }} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Low (45%)</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

