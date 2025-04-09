
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { Tab } from '@headlessui/react';
import { Calendar, CalendarX, TrendingUp, Users, Filter } from 'lucide-react';

const seasonalData = [
  { month: 'Jan', visitors: 2400, revenue: 24000, percentOptimized: 20 },
  { month: 'Feb', visitors: 3600, revenue: 35000, percentOptimized: 25 },
  { month: 'Mar', visitors: 4800, revenue: 42000, percentOptimized: 30 },
  { month: 'Apr', visitors: 5400, revenue: 48000, percentOptimized: 40 },
  { month: 'May', visitors: 6200, revenue: 52000, percentOptimized: 45 },
  { month: 'Jun', visitors: 7800, revenue: 67000, percentOptimized: 55 },
  { month: 'Jul', visitors: 9200, revenue: 78000, percentOptimized: 65 },
  { month: 'Aug', visitors: 8900, revenue: 74000, percentOptimized: 60 },
  { month: 'Sep', visitors: 7200, revenue: 63000, percentOptimized: 50 },
  { month: 'Oct', visitors: 5800, revenue: 51000, percentOptimized: 35 },
  { month: 'Nov', visitors: 4900, revenue: 42000, percentOptimized: 30 },
  { month: 'Dec', visitors: 6400, revenue: 56000, percentOptimized: 40 }
];

const optimizationStrategies = [
  {
    id: 1,
    name: 'Dynamic Pricing',
    description: 'Adjusts ticket prices based on historical demand patterns and weather forecasts',
    impact: 'High',
    implementation: 'Medium',
    roi: '215%'
  },
  {
    id: 2,
    name: 'Staff Scheduling',
    description: 'Optimizes employee allocation based on predicted visitor traffic',
    impact: 'Medium',
    implementation: 'Low',
    roi: '180%'
  },
  {
    id: 3,
    name: 'Attraction Maintenance',
    description: 'Schedules maintenance during low traffic periods to minimize disruption',
    impact: 'Medium',
    implementation: 'Medium',
    roi: '135%'
  },
  {
    id: 4,
    name: 'Special Events',
    description: 'Creates targeted events during historically slow periods',
    impact: 'High',
    implementation: 'High',
    roi: '250%'
  }
];

const SeasonalOptimization = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-50 p-2 rounded-md">
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Seasonal Optimization</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          
          <select className="text-sm border border-gray-200 rounded-md px-2 py-1">
            <option>Last 12 months</option>
            <option>Last 6 months</option>
            <option>Last 3 months</option>
          </select>
        </div>
      </div>

      {filterOpen && (
        <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-100 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Date Range</label>
              <select className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 text-sm">
                <option>Last 12 months</option>
                <option>Last 6 months</option>
                <option>Last 3 months</option>
                <option>Custom range</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Metric</label>
              <select className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 text-sm">
                <option>Visitors</option>
                <option>Revenue</option>
                <option>Optimization %</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Compare To</label>
              <select className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 text-sm">
                <option>Previous Year</option>
                <option>2 Years Ago</option>
                <option>5 Years Ago</option>
                <option>None</option>
              </select>
            </div>
            <div className="flex items-end space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors">
                Apply Filters
              </button>
              <button 
                onClick={() => setFilterOpen(false)}
                className="border border-gray-200 text-gray-500 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Tab.Group onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-lg bg-gray-50 p-1 mb-6">
          <Tab 
            className={({ selected }) =>
              `w-full rounded-md py-2.5 text-sm font-medium leading-5 transition-colors
              ${selected 
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-500 hover:bg-white/[0.5] hover:text-gray-700'
              }`
            }
          >
            Metrics
          </Tab>
          <Tab 
            className={({ selected }) =>
              `w-full rounded-md py-2.5 text-sm font-medium leading-5 transition-colors
              ${selected 
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-500 hover:bg-white/[0.5] hover:text-gray-700'
              }`
            }
          >
            Strategies
          </Tab>
        </Tab.List>
        
        <Tab.Panels>
          <Tab.Panel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-700">Total Visitors</span>
                  <Users className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-800">68,600</div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                  <span className="text-emerald-500 font-medium">+12.5%</span>
                  <span className="text-gray-500 ml-1">vs. last year</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-700">Total Revenue</span>
                  <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-800">$632,000</div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                  <span className="text-emerald-500 font-medium">+8.7%</span>
                  <span className="text-gray-500 ml-1">vs. last year</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-amber-700">Optimization Level</span>
                  <svg className="h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-800">42.1%</div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                  <span className="text-emerald-500 font-medium">+15.3%</span>
                  <span className="text-gray-500 ml-1">vs. last year</span>
                </div>
              </div>
            </div>

            <div className="h-80 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={seasonalData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '0.5rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      border: '1px solid #e5e7eb',
                      padding: '12px'
                    }} 
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar 
                    dataKey="visitors" 
                    name="Visitors" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]} 
                    barSize={20} 
                  />
                  <Bar 
                    dataKey="percentOptimized" 
                    name="Optimization %" 
                    fill="#059669" 
                    radius={[4, 4, 0, 0]} 
                    barSize={20} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Tab.Panel>
          
          <Tab.Panel>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-100 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-semibold text-gray-800">Seasonal Optimization Strategies</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Implementing these strategies can help maximize revenue during all seasons
                  </p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600 transition-colors">
                  Generate New Strategy
                </button>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Strategy
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Impact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Implementation
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ROI
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {optimizationStrategies.map((strategy) => (
                    <tr key={strategy.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-800">{strategy.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{strategy.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          strategy.impact === 'High' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {strategy.impact}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          strategy.implementation === 'Low' 
                            ? 'bg-green-100 text-green-800' 
                            : strategy.implementation === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {strategy.implementation}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                        {strategy.roi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SeasonalOptimization;
