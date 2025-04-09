import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { LineChart } from "../../components/ui/charts"
import {
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ShoppingBagIcon,
  TicketIcon,
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"

interface PricingRule {
  id: string
  name: string
  description: string
  type: "demand" | "seasonal" | "special" | "segment"
  status: "active" | "inactive" | "scheduled"
  impact: number
  lastUpdated: string
}

interface PriceElasticity {
  segment: string
  bookingWindow: string
  elasticity: number
  confidence: number
  recommendation: string
}

interface CompetitorPrice {
  competitor: string
  product: string
  price: number
  date: string
  difference: number
}

interface PriceChangeImpact {
  product: string
  currentPrice: number
  proposedPrice: number
  projectedAttendance: number
  projectedRevenue: number
  breakEvenPoint: number
}

interface DemandBasedRecommendation {
  id: string
  product: string
  currentPrice: number
  recommendedPrice: number
  confidence: number
  factors: {
    demand: number
    capacity: number
    seasonality: number
    competition: number
  }
  expectedImpact: {
    revenue: number
    attendance: number
    profit: number
  }
}

interface RealTimePriceAdjustment {
  id: string
  product: string
  originalPrice: number
  adjustedPrice: number
  trigger: string
  timestamp: string
  impact: number
}

interface SpecialEventPricing {
  id: string
  name: string
  date: string
  type: "peak" | "special" | "holiday"
  basePrice: number
  premiumMultiplier: number
  expectedAttendance: number
  revenueImpact: number
}

interface PerCapitaSpending {
  segment: string
  current: number
  target: number
  opportunities: {
    category: string
    currentSpend: number
    potentialSpend: number
    recommendation: string
  }[]
}

interface AdmissionVsInPark {
  category: string
  admissionRevenue: number
  inParkRevenue: number
  ratio: number
  target: number
  recommendations: string[]
}

interface SeasonPassOptimization {
  type: string
  currentPrice: number
  recommendedPrice: number
  benefits: string[]
  targetSegments: string[]
  expectedUptake: number
  revenueImpact: number
}

interface PremiumProductPricing {
  product: string
  category: string
  currentPrice: number
  recommendedPrice: number
  valueScore: number
  demandScore: number
  competitivePosition: number
  recommendations: string[]
}

interface GuestHourOptimization {
  timeSlot: string
  currentRevenue: number
  targetRevenue: number
  capacity: number
  utilization: number
  recommendations: string[]
}

interface YieldManagement {
  segment: string
  currentYield: number
  targetYield: number
  pricingStrategy: string
  capacityAllocation: number
  expectedRevenue: number
}

interface LengthOfStayImpact {
  duration: string
  averageSpend: number
  ticketType: string
  additionalRevenue: number
  recommendations: string[]
}

interface BookingIncentive {
  type: string
  discount: number
  conditions: string[]
  targetSegment: string
  expectedUptake: number
  revenueImpact: number
}

const pricingRules: PricingRule[] = [
  {
    id: "peak-day-premium",
    name: "Peak Day Premium",
    description: "Increase prices by 15% on weekends and holidays",
    type: "seasonal",
    status: "active",
    impact: 8.5,
    lastUpdated: "2023-12-15",
  },
  {
    id: "early-bird-discount",
    name: "Early Bird Discount",
    description: "10% discount for bookings 30+ days in advance",
    type: "demand",
    status: "active",
    impact: -5.2,
    lastUpdated: "2023-12-10",
  },
  {
    id: "family-package",
    name: "Family Package Premium",
    description: "5% premium on family packages during school breaks",
    type: "segment",
    status: "active",
    impact: 3.8,
    lastUpdated: "2023-12-05",
  },
  {
    id: "summer-festival",
    name: "Summer Festival Special",
    description: "Special pricing for annual summer festival",
    type: "special",
    status: "scheduled",
    impact: 12.3,
    lastUpdated: "2023-11-28",
  },
]

const priceElasticityData: PriceElasticity[] = [
  {
    segment: "Families",
    bookingWindow: "0-7 days",
    elasticity: -1.8,
    confidence: 0.92,
    recommendation: "Increase prices by 5%",
  },
  {
    segment: "Families",
    bookingWindow: "8-30 days",
    elasticity: -1.2,
    confidence: 0.88,
    recommendation: "Increase prices by 8%",
  },
  {
    segment: "Families",
    bookingWindow: "31+ days",
    elasticity: -0.9,
    confidence: 0.85,
    recommendation: "Increase prices by 12%",
  },
  {
    segment: "Couples",
    bookingWindow: "0-7 days",
    elasticity: -2.1,
    confidence: 0.90,
    recommendation: "Increase prices by 3%",
  },
  {
    segment: "Couples",
    bookingWindow: "8-30 days",
    elasticity: -1.5,
    confidence: 0.87,
    recommendation: "Increase prices by 7%",
  },
  {
    segment: "Couples",
    bookingWindow: "31+ days",
    elasticity: -1.0,
    confidence: 0.84,
    recommendation: "Increase prices by 10%",
  },
  {
    segment: "Groups",
    bookingWindow: "0-7 days",
    elasticity: -1.6,
    confidence: 0.89,
    recommendation: "Increase prices by 4%",
  },
  {
    segment: "Groups",
    bookingWindow: "8-30 days",
    elasticity: -1.3,
    confidence: 0.86,
    recommendation: "Increase prices by 6%",
  },
  {
    segment: "Groups",
    bookingWindow: "31+ days",
    elasticity: -0.8,
    confidence: 0.82,
    recommendation: "Increase prices by 15%",
  },
]

const competitorPrices: CompetitorPrice[] = [
  {
    competitor: "Adventure World",
    product: "Single Day Adult",
    price: 89.99,
    date: "2023-12-20",
    difference: 5.01,
  },
  {
    competitor: "Adventure World",
    product: "Family Pass (4)",
    price: 299.99,
    date: "2023-12-20",
    difference: 20.01,
  },
  {
    competitor: "Adventure World",
    product: "Season Pass",
    price: 199.99,
    date: "2023-12-20",
    difference: 10.01,
  },
  {
    competitor: "Fantasy Land",
    product: "Single Day Adult",
    price: 92.50,
    date: "2023-12-20",
    difference: 2.50,
  },
  {
    competitor: "Fantasy Land",
    product: "Family Pass (4)",
    price: 310.00,
    date: "2023-12-20",
    difference: 10.00,
  },
  {
    competitor: "Fantasy Land",
    product: "Season Pass",
    price: 185.00,
    date: "2023-12-20",
    difference: 25.00,
  },
]

const priceChangeImpacts: PriceChangeImpact[] = [
  {
    product: "Single Day Adult",
    currentPrice: 85.00,
    proposedPrice: 89.99,
    projectedAttendance: -3.2,
    projectedRevenue: 4.2,
    breakEvenPoint: -2.8,
  },
  {
    product: "Family Pass (4)",
    currentPrice: 280.00,
    proposedPrice: 299.99,
    projectedAttendance: -2.5,
    projectedRevenue: 5.8,
    breakEvenPoint: -1.9,
  },
  {
    product: "Season Pass",
    currentPrice: 189.99,
    proposedPrice: 199.99,
    projectedAttendance: -1.8,
    projectedRevenue: 3.5,
    breakEvenPoint: -1.2,
  },
  {
    product: "VIP Experience",
    currentPrice: 249.99,
    proposedPrice: 279.99,
    projectedAttendance: -5.0,
    projectedRevenue: 8.5,
    breakEvenPoint: -3.2,
  },
]

const demandRecommendations: DemandBasedRecommendation[] = [
  {
    id: "rec1",
    product: "Single Day Adult",
    currentPrice: 85.00,
    recommendedPrice: 89.99,
    confidence: 0.92,
    factors: {
      demand: 0.85,
      capacity: 0.75,
      seasonality: 0.90,
      competition: 0.82
    },
    expectedImpact: {
      revenue: 5.2,
      attendance: -2.5,
      profit: 4.8
    }
  }
]

const realTimeAdjustments: RealTimePriceAdjustment[] = [
  {
    id: "adj1",
    product: "VIP Experience",
    originalPrice: 249.99,
    adjustedPrice: 279.99,
    trigger: "High Demand",
    timestamp: "2023-12-20T14:30:00",
    impact: 12.0
  }
]

const specialEventPricing: SpecialEventPricing[] = [
  {
    id: "event1",
    name: "Christmas Eve",
    date: "2023-12-24",
    type: "special",
    basePrice: 85.00,
    premiumMultiplier: 1.25,
    expectedAttendance: 15000,
    revenueImpact: 18.5
  }
]

const perCapitaSpending: PerCapitaSpending[] = [
  {
    segment: "Family",
    current: 45.50,
    target: 55.00,
    opportunities: [
      {
        category: "Food & Beverage",
        currentSpend: 25.00,
        potentialSpend: 35.00,
        recommendation: "Introduce family meal deals"
      }
    ]
  }
]

const admissionVsInPark: AdmissionVsInPark[] = [
  {
    category: "Family",
    admissionRevenue: 280.00,
    inParkRevenue: 180.00,
    ratio: 0.64,
    target: 0.75,
    recommendations: ["Bundle food credits with admission"]
  }
]

const seasonPassOptimization: SeasonPassOptimization[] = [
  {
    type: "Premium",
    currentPrice: 189.99,
    recommendedPrice: 199.99,
    benefits: ["Free parking", "Monthly rewards"],
    targetSegments: ["Local families", "Frequent visitors"],
    expectedUptake: 15,
    revenueImpact: 8.5
  }
]

const premiumProductPricing: PremiumProductPricing[] = [
  {
    product: "VIP Experience",
    category: "Premium Access",
    currentPrice: 249.99,
    recommendedPrice: 279.99,
    valueScore: 0.85,
    demandScore: 0.90,
    competitivePosition: 0.75,
    recommendations: ["Add exclusive dining experience"]
  }
]

const guestHourOptimization: GuestHourOptimization[] = [
  {
    timeSlot: "14:00-16:00",
    currentRevenue: 25000,
    targetRevenue: 30000,
    capacity: 5000,
    utilization: 0.85,
    recommendations: ["Introduce afternoon tea package"]
  }
]

const yieldData: YieldManagement[] = [
  {
    segment: "International Tourists",
    currentYield: 95.00,
    targetYield: 110.00,
    pricingStrategy: "Premium pricing with added value",
    capacityAllocation: 25,
    expectedRevenue: 275000
  }
]

const lengthOfStayImpact: LengthOfStayImpact[] = [
  {
    duration: "2 days",
    averageSpend: 180.00,
    ticketType: "Multi-day pass",
    additionalRevenue: 45.00,
    recommendations: ["Offer hotel package deals"]
  }
]

const bookingIncentives: BookingIncentive[] = [
  {
    type: "Early Bird",
    discount: 15,
    conditions: ["Book 60+ days ahead"],
    targetSegment: "Families",
    expectedUptake: 25,
    revenueImpact: 12.5
  }
]

export const DynamicPricingEngine = () => {
  const [activeTab, setActiveTab] = React.useState("rules")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Pricing & Revenue Optimization</CardTitle>
          <CardDescription>Optimize pricing based on demand forecasts, capacity utilization, and guest spending patterns</CardDescription>
          <div className="mt-4">
            <Button variant="secondary" size="sm">
              <span className="flex items-center">
                <ChartBarIcon className="h-4 w-4 mr-2" />
                Refresh
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="rules">
                <span className="flex items-center">
                  <TagIcon className="h-4 w-4 mr-2" />
                  Pricing Rules
                </span>
              </TabsTrigger>
              <TabsTrigger value="demand">
                <span className="flex items-center">
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-2" />
                  Demand Based
                </span>
              </TabsTrigger>
              <TabsTrigger value="real-time">
                <span className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Real-Time
                </span>
              </TabsTrigger>
              <TabsTrigger value="events">
                <span className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Special Events
                </span>
              </TabsTrigger>
              <TabsTrigger value="spending">
                <span className="flex items-center">
                  <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                  Per Capita
                </span>
              </TabsTrigger>
              <TabsTrigger value="admission">
                <span className="flex items-center">
                  <TicketIcon className="h-4 w-4 mr-2" />
                  Admission Balance
                </span>
              </TabsTrigger>
              <TabsTrigger value="season">
                <span className="flex items-center">
                  <SparklesIcon className="h-4 w-4 mr-2" />
                  Season Pass
                </span>
              </TabsTrigger>
              <TabsTrigger value="premium">
                <span className="flex items-center">
                  <UserGroupIcon className="h-4 w-4 mr-2" />
                  Premium Products
                </span>
              </TabsTrigger>
              <TabsTrigger value="guest-hour">
                <span className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Guest Hour
                </span>
              </TabsTrigger>
              <TabsTrigger value="yield">
                <span className="flex items-center">
                  <ChartBarIcon className="h-4 w-4 mr-2" />
                  Yield Management
                </span>
              </TabsTrigger>
              <TabsTrigger value="stay">
                <span className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Length of Stay
                </span>
              </TabsTrigger>
              <TabsTrigger value="incentives">
                <span className="flex items-center">
                  <SparklesIcon className="h-4 w-4 mr-2" />
                  Booking Incentives
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rules">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Active Pricing Rules</h3>
                  <Button size="sm">Create New Rule</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rule Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue Impact
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Updated
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pricingRules.map((rule) => (
                        <tr key={rule.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                            <div className="text-xs text-gray-500">{rule.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                rule.type === "demand"
                                  ? "default"
                                  : rule.type === "seasonal"
                                  ? "secondary"
                                  : rule.type === "special"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {rule.type.charAt(0).toUpperCase() + rule.type.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                rule.status === "active"
                                  ? "default"
                                  : rule.status === "inactive"
                                  ? "destructive"
                                  : "outline"
                              }
                            >
                              {rule.status.charAt(0).toUpperCase() + rule.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`text-sm ${
                                rule.impact >= 0 ? "text-success-600" : "text-danger-600"
                              }`}
                            >
                              {rule.impact >= 0 ? "+" : ""}
                              {rule.impact}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(rule.lastUpdated).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Button variant="secondary" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="demand">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Demand-Based Recommendations</h3>
                  <Button size="sm">Apply Recommendations</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recommended
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Confidence
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expected Impact
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {demandRecommendations.map((rec) => (
                        <tr key={rec.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{rec.product}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(rec.currentPrice)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(rec.recommendedPrice)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{(rec.confidence * 100).toFixed(0)}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-success-600">+{rec.expectedImpact.revenue}% Revenue</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="real-time">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Real-Time Price Adjustments</h3>
                  <Button size="sm">View History</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Original Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Adjusted Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trigger
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Impact
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {realTimeAdjustments.map((adj) => (
                        <tr key={adj.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{adj.product}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(adj.originalPrice)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(adj.adjustedPrice)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{adj.trigger}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-success-600">+{adj.impact}%</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Special Event & Peak Day Pricing</h3>
                  <Button size="sm">Add Event</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Premium
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expected Impact
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {specialEventPricing.map((event) => (
                        <tr key={event.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{event.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{event.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={event.type === "special" ? "default" : "secondary"}>
                              {event.type}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{(event.premiumMultiplier * 100 - 100).toFixed(0)}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-success-600">+{event.revenueImpact}%</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="spending">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Per Capita Spending Optimization</h3>
                  <Button size="sm">Update Targets</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Segment
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Target
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Opportunities
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {perCapitaSpending.map((spending) => (
                        <tr key={spending.segment}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{spending.segment}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(spending.current)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(spending.target)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {spending.opportunities.map((opp) => (
                                <div key={opp.category} className="mb-1">
                                  <span className="font-medium">{opp.category}:</span> {opp.recommendation}
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="admission">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Admission vs In-Park Spending Balance</h3>
                  <Button size="sm">Optimize Balance</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Admission Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          In-Park Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ratio
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recommendations
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {admissionVsInPark.map((item) => (
                        <tr key={item.category}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.admissionRevenue)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.inParkRevenue)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{(item.ratio * 100).toFixed(0)}%</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {item.recommendations.map((rec, index) => (
                                <div key={index} className="mb-1">{rec}</div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="season">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Season Pass Optimization</h3>
                  <Button size="sm">Update Structure</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recommended
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Benefits
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expected Impact
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {seasonPassOptimization.map((pass) => (
                        <tr key={pass.type}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{pass.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(pass.currentPrice)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(pass.recommendedPrice)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {pass.benefits.map((benefit, index) => (
                                <div key={index} className="mb-1">{benefit}</div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-success-600">+{pass.revenueImpact}%</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="premium">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Premium Product Pricing</h3>
                  <Button size="sm">Update Premium Products</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recommended
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Scores
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recommendations
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {premiumProductPricing.map((product) => (
                        <tr key={product.product}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{product.product}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.currentPrice)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.recommendedPrice)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              Value: {(product.valueScore * 100).toFixed(0)}%<br />
                              Demand: {(product.demandScore * 100).toFixed(0)}%<br />
                              Position: {(product.competitivePosition * 100).toFixed(0)}%
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {product.recommendations.map((rec, index) => (
                                <div key={index} className="mb-1">{rec}</div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guest-hour">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Revenue per Available Guest Hour</h3>
                  <Button size="sm">Optimize Hours</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time Slot
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Target Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Utilization
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recommendations
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {guestHourOptimization.map((hour) => (
                        <tr key={hour.timeSlot}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{hour.timeSlot}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(hour.currentRevenue)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(hour.targetRevenue)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{(hour.utilization * 100).toFixed(0)}%</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {hour.recommendations.map((rec, index) => (
                                <div key={index} className="mb-1">{rec}</div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="yield">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Yield Management by Segment</h3>
                  <Button size="sm">Update Strategy</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Segment
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Yield
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Target Yield
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Strategy
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expected Revenue
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {yieldData.map((yieldItem) => (
                        <tr key={yieldItem.segment}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{yieldItem.segment}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(yieldItem.currentYield)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(yieldItem.targetYield)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{yieldItem.pricingStrategy}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(yieldItem.expectedRevenue)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stay">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Length of Stay Impact Analysis</h3>
                  <Button size="sm">Update Analysis</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Average Spend
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ticket Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Additional Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recommendations
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {lengthOfStayImpact.map((stay) => (
                        <tr key={stay.duration}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{stay.duration}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(stay.averageSpend)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{stay.ticketType}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(stay.additionalRevenue)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {stay.recommendations.map((rec, index) => (
                                <div key={index} className="mb-1">{rec}</div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="incentives">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Advanced Booking Incentives</h3>
                  <Button size="sm">Create Incentive</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Discount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Conditions
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Target Segment
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expected Impact
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookingIncentives.map((incentive) => (
                        <tr key={incentive.type}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{incentive.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{incentive.discount}%</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {incentive.conditions.map((condition, index) => (
                                <div key={index} className="mb-1">{condition}</div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{incentive.targetSegment}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-success-600">+{incentive.revenueImpact}%</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 