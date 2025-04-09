import React from "react"
import { Card, CardContent, CardHeader } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { BarChart, PieChart } from "../../components/ui/charts"
import {
  ArrowTrendingUpIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  PuzzlePieceIcon,
  ShoppingBagIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"

interface TicketType {
  id: string
  name: string
  description: string
  price: number
  sales: number
  revenue: number
  growth: number
  margin: number
}

interface CrossSellOpportunity {
  id: string
  sourceProduct: string
  targetProduct: string
  conversionRate: number
  revenue: number
  potential: number
  confidence: number
}

interface BundlePerformance {
  id: string
  name: string
  products: string[]
  price: number
  sales: number
  revenue: number
  margin: number
  growth: number
}

interface ProductAffinity {
  id: string
  product1: string
  product2: string
  affinityScore: number
  purchaseFrequency: number
  averageTimeBetweenPurchases: number
  revenueImpact: number
  recommendations: string[]
}

interface ProductProfitability {
  id: string
  product: string
  revenue: number
  directCosts: number
  indirectCosts: number
  marketingCosts: number
  operationalCosts: number
  netProfit: number
  profitMargin: number
  roi: number
  breakEvenPoint: number
  recommendations: string[]
}

interface NewProductImpact {
  id: string
  name: string
  description: string
  targetSegment: string
  proposedPrice: number
  estimatedSales: number
  developmentCosts: number
  marketingCosts: number
  operationalCosts: number
  projectedRevenue: number
  projectedProfit: number
  paybackPeriod: number
  cannibalization: {
    affectedProducts: string[]
    revenueImpact: number
  }
  recommendations: string[]
}

const ticketTypes: TicketType[] = [
  {
    id: "single-day-adult",
    name: "Single Day Adult",
    description: "Standard single-day admission for adults",
    price: 85.00,
    sales: 125000,
    revenue: 10625000,
    growth: 5.2,
    margin: 65,
  },
  {
    id: "single-day-child",
    name: "Single Day Child",
    description: "Standard single-day admission for children",
    price: 65.00,
    sales: 95000,
    revenue: 6175000,
    growth: 4.8,
    margin: 70,
  },
  {
    id: "family-pass",
    name: "Family Pass (4)",
    description: "Admission for up to 4 people",
    price: 280.00,
    sales: 45000,
    revenue: 12600000,
    growth: 8.5,
    margin: 75,
  },
  {
    id: "season-pass",
    name: "Season Pass",
    description: "Unlimited visits for one year",
    price: 189.99,
    sales: 75000,
    revenue: 14249250,
    growth: 12.3,
    margin: 80,
  },
  {
    id: "vip-experience",
    name: "VIP Experience",
    description: "Premium experience with skip-the-line access",
    price: 249.99,
    sales: 25000,
    revenue: 6249750,
    growth: 15.7,
    margin: 85,
  },
]

const crossSellOpportunities: CrossSellOpportunity[] = [
  {
    id: "single-to-family",
    sourceProduct: "Single Day Adult",
    targetProduct: "Family Pass (4)",
    conversionRate: 25,
    revenue: 3150000,
    potential: 5250000,
    confidence: 0.85,
  },
  {
    id: "single-to-season",
    sourceProduct: "Single Day Adult",
    targetProduct: "Season Pass",
    conversionRate: 15,
    revenue: 1593750,
    potential: 2125000,
    confidence: 0.78,
  },
  {
    id: "family-to-vip",
    sourceProduct: "Family Pass (4)",
    targetProduct: "VIP Experience",
    conversionRate: 10,
    revenue: 1125000,
    potential: 1875000,
    confidence: 0.72,
  },
  {
    id: "season-to-vip",
    sourceProduct: "Season Pass",
    targetProduct: "VIP Experience",
    conversionRate: 8,
    revenue: 1499970,
    potential: 2499950,
    confidence: 0.68,
  },
]

const bundlePerformance: BundlePerformance[] = [
  {
    id: "family-vip",
    name: "Family VIP Bundle",
    products: ["Family Pass (4)", "VIP Experience"],
    price: 499.99,
    sales: 15000,
    revenue: 7499850,
    margin: 82,
    growth: 18.5,
  },
  {
    id: "season-plus",
    name: "Season Pass Plus",
    products: ["Season Pass", "VIP Experience"],
    price: 399.99,
    sales: 20000,
    revenue: 7999800,
    margin: 85,
    growth: 22.3,
  },
  {
    id: "ultimate-family",
    name: "Ultimate Family Package",
    products: ["Family Pass (4)", "VIP Experience", "Season Pass"],
    price: 699.99,
    sales: 10000,
    revenue: 6999900,
    margin: 88,
    growth: 25.7,
  },
]

const productAffinities: ProductAffinity[] = [
  {
    id: "aff1",
    product1: "Single Day Adult",
    product2: "VIP Experience",
    affinityScore: 0.68,
    purchaseFrequency: 0.45,
    averageTimeBetweenPurchases: 2,
    revenueImpact: 850000,
    recommendations: ["Create VIP upgrade package", "Target single-day visitors with VIP promotions"]
  },
  {
    id: "aff2",
    product1: "Season Pass",
    product2: "Photo Package",
    affinityScore: 0.54,
    purchaseFrequency: 0.32,
    averageTimeBetweenPurchases: 30,
    revenueImpact: 620000,
    recommendations: ["Bundle photo package with season pass renewal", "Offer photo package discount to season pass holders"]
  },
  {
    id: "aff3",
    product1: "Family Pass",
    product2: "Dining Plan",
    affinityScore: 0.47,
    purchaseFrequency: 0.28,
    averageTimeBetweenPurchases: 7,
    revenueImpact: 450000,
    recommendations: ["Create family dining package", "Offer dining plan discount with family pass"]
  }
]

const productProfitability: ProductProfitability[] = [
  {
    id: "prof1",
    product: "Single Day Adult",
    revenue: 10625000,
    directCosts: 2125000,
    indirectCosts: 1062500,
    marketingCosts: 531250,
    operationalCosts: 1593750,
    netProfit: 5312500,
    profitMargin: 50,
    roi: 125,
    breakEvenPoint: 25000,
    recommendations: ["Optimize operational costs", "Increase marketing efficiency"]
  },
  {
    id: "prof2",
    product: "VIP Experience",
    revenue: 6249750,
    directCosts: 1249950,
    indirectCosts: 624975,
    marketingCosts: 312487,
    operationalCosts: 937462,
    netProfit: 3124875,
    profitMargin: 50,
    roi: 150,
    breakEvenPoint: 12500,
    recommendations: ["Expand VIP capacity", "Enhance VIP amenities"]
  }
]

const newProductImpacts: NewProductImpact[] = [
  {
    id: "new1",
    name: "Premium Family Experience",
    description: "Exclusive family package with VIP access and dining",
    targetSegment: "Families with children 5-12",
    proposedPrice: 399.99,
    estimatedSales: 15000,
    developmentCosts: 250000,
    marketingCosts: 150000,
    operationalCosts: 450000,
    projectedRevenue: 5999850,
    projectedProfit: 2999925,
    paybackPeriod: 1.2,
    cannibalization: {
      affectedProducts: ["Family Pass (4)", "VIP Experience"],
      revenueImpact: -850000
    },
    recommendations: ["Phase in during off-peak season", "Target high-value family segments"]
  },
  {
    id: "new2",
    name: "Adventure Pass Plus",
    description: "Multi-day pass with premium experiences",
    targetSegment: "Young adults 18-35",
    proposedPrice: 299.99,
    estimatedSales: 20000,
    developmentCosts: 200000,
    marketingCosts: 120000,
    operationalCosts: 400000,
    projectedRevenue: 5999800,
    projectedProfit: 2999900,
    paybackPeriod: 1.5,
    cannibalization: {
      affectedProducts: ["Season Pass", "Single Day Adult"],
      revenueImpact: -950000
    },
    recommendations: ["Launch during peak season", "Focus on digital marketing"]
  }
]

export const ProductMixOptimization = () => {
  const [activeTab, setActiveTab] = React.useState("tickets")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          action={
            <Button 
              icon={<ChartBarIcon className="h-4 w-4" />}
              size="sm"
              variant="outline"
            >
              Refresh
            </Button>
          }
          subtitle="Analyze and optimize ticket types, bundles, and cross-sell opportunities"
          title="Product Mix Optimization"
        />
        <CardContent>
          <Tabs onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="tickets">
                <ChartBarIcon className="mr-2 h-4 w-4" />
                Ticket Types
              </TabsTrigger>
              <TabsTrigger value="cross-sell">
                <ArrowTrendingUpIcon className="mr-2 h-4 w-4" />
                Cross-Sell
              </TabsTrigger>
              <TabsTrigger value="bundles">
                <ShoppingBagIcon className="mr-2 h-4 w-4" />
                Bundles
              </TabsTrigger>
              <TabsTrigger value="affinity">
                <SparklesIcon className="mr-2 h-4 w-4" />
                Affinity
              </TabsTrigger>
              <TabsTrigger value="profitability">
                <CurrencyDollarIcon className="mr-2 h-4 w-4" />
                Profitability
              </TabsTrigger>
              <TabsTrigger value="new-products">
                <PuzzlePieceIcon className="mr-2 h-4 w-4" />
                New Products
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tickets">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Ticket Type Performance</h3>
                  <Button size="sm">Add New Ticket Type</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                          Ticket Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                          Sales
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                          Growth
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                          Margin
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {ticketTypes.map((ticket) => (
                        <tr key={ticket.id}>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{ticket.name}</div>
                            <div className="text-xs text-gray-500">{ticket.description}</div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(ticket.price)}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US").format(ticket.sales)}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(ticket.revenue)}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-success-600">+{ticket.growth}%</div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-900">{ticket.margin}%</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-700">Revenue Distribution</h4>
                    <div className="h-64">
                      <PieChart
                        data={ticketTypes.map((t) => ({
                          label: t.name,
                          value: t.revenue
                        }))}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-700">Growth Trends</h4>
                    <div className="h-64">
                      <BarChart
                        data={ticketTypes.map((t) => ({
                          label: t.name,
                          value: t.growth
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cross-sell">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Cross-Sell Opportunities</h3>
                  <Button size="sm">Create New Campaign</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          From
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          To
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Conversion Rate
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Potential Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Confidence
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {crossSellOpportunities.map((opportunity) => (
                        <tr key={opportunity.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{opportunity.sourceProduct}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{opportunity.targetProduct}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{opportunity.conversionRate}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                opportunity.revenue
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                opportunity.potential
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{(opportunity.confidence * 100).toFixed(0)}%</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Conversion Rate Analysis</h4>
                  <div className="h-64">
                    <BarChart
                      data={crossSellOpportunities.map((o) => ({
                        label: `${o.sourceProduct} → ${o.targetProduct}`,
                        value: o.conversionRate
                      }))}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bundles">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Bundle Performance</h3>
                  <Button size="sm">Create New Bundle</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bundle Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Products
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sales
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Margin
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Growth
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bundlePerformance.map((bundle) => (
                        <tr key={bundle.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{bundle.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{bundle.products.join(", ")}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(bundle.price)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US").format(bundle.sales)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(bundle.revenue)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{bundle.margin}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-success-600">+{bundle.growth}%</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Bundle Revenue Distribution</h4>
                    <div className="h-64">
                      <PieChart
                        data={{
                          labels: bundlePerformance.map((b) => b.name),
                          datasets: [
                            {
                              data: bundlePerformance.map((b) => b.revenue),
                              backgroundColor: [
                                "rgba(59, 130, 246, 0.8)",
                                "rgba(16, 185, 129, 0.8)",
                                "rgba(245, 158, 11, 0.8)",
                              ],
                            },
                          ],
                        }}
                        options={{
                          plugins: {
                            legend: {
                              position: "right",
                            },
                          },
                        }}
                        ariaLabel="Revenue distribution by bundle"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Bundle Growth Trends</h4>
                    <div className="h-64">
                      <BarChart
                        data={{
                          labels: bundlePerformance.map((b) => b.name),
                          datasets: [
                            {
                              label: "Growth Rate",
                              data: bundlePerformance.map((b) => b.growth),
                              backgroundColor: "rgba(59, 130, 246, 0.8)",
                            },
                          ],
                        }}
                        options={{
                          scales: {
                            y: {
                              title: {
                                display: true,
                                text: "Growth Rate (%)",
                              },
                            },
                          },
                        }}
                        ariaLabel="Growth trends by bundle"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="affinity">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Product Affinity Analysis</h3>
                  <Button size="sm">Update Analysis</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product 1
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product 2
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Affinity Score
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Purchase Frequency
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Avg. Time Between
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue Impact
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {productAffinities.map((affinity) => (
                        <tr key={affinity.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{affinity.product1}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{affinity.product2}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{(affinity.affinityScore * 100).toFixed(0)}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{(affinity.purchaseFrequency * 100).toFixed(0)}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{affinity.averageTimeBetweenPurchases} days</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                affinity.revenueImpact
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {productAffinities.map((affinity) => (
                      <div key={affinity.id} className="bg-white p-4 rounded-lg border border-gray-200">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">
                          {affinity.product1} + {affinity.product2}
                        </h5>
                        <ul className="space-y-2">
                          {affinity.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-gray-600">• {rec}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="profitability">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Product Profitability Analysis</h3>
                  <Button size="sm">Update Analysis</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Costs
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Net Profit
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Margin
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ROI
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Break-Even
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {productProfitability.map((profit) => (
                        <tr key={profit.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{profit.product}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                profit.revenue
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                profit.directCosts + profit.indirectCosts + profit.marketingCosts + profit.operationalCosts
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                profit.netProfit
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{profit.profitMargin}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{profit.roi}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US").format(profit.breakEvenPoint)} units
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Cost Breakdown</h4>
                  <div className="h-64">
                    <BarChart
                      data={{
                        labels: productProfitability.map((p) => p.product),
                        datasets: [
                          {
                            label: "Direct Costs",
                            data: productProfitability.map((p) => p.directCosts),
                            backgroundColor: "rgba(59, 130, 246, 0.8)",
                          },
                          {
                            label: "Indirect Costs",
                            data: productProfitability.map((p) => p.indirectCosts),
                            backgroundColor: "rgba(16, 185, 129, 0.8)",
                          },
                          {
                            label: "Marketing Costs",
                            data: productProfitability.map((p) => p.marketingCosts),
                            backgroundColor: "rgba(245, 158, 11, 0.8)",
                          },
                          {
                            label: "Operational Costs",
                            data: productProfitability.map((p) => p.operationalCosts),
                            backgroundColor: "rgba(139, 92, 246, 0.8)",
                          },
                        ],
                      }}
                      options={{
                        scales: {
                          y: {
                            title: {
                              display: true,
                              text: "Cost (USD)",
                            },
                          },
                        },
                      }}
                      ariaLabel="Cost breakdown by product"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="new-products">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">New Product Impact Analysis</h3>
                  <Button size="sm">Add New Product</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Target Segment
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Est. Sales
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Projected Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Projected Profit
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payback Period
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {newProductImpacts.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500">{product.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.targetSegment}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                product.proposedPrice
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US").format(product.estimatedSales)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                product.projectedRevenue
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                product.projectedProfit
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.paybackPeriod} years</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Cannibalization Impact</h4>
                    <div className="space-y-4">
                      {newProductImpacts.map((product) => (
                        <div key={product.id} className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">{product.name}</h5>
                          <div className="text-sm text-gray-600">
                            <p>Affected Products: {product.cannibalization.affectedProducts.join(", ")}</p>
                            <p>
                              Revenue Impact:{" "}
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                Math.abs(product.cannibalization.revenueImpact)
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
                    <div className="space-y-4">
                      {newProductImpacts.map((product) => (
                        <div key={product.id} className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">{product.name}</h5>
                          <ul className="space-y-2">
                            {product.recommendations.map((rec, index) => (
                              <li key={index} className="text-sm text-gray-600">• {rec}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 