
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Tab } from '@headlessui/react';
import { Brain, Users, Clock, Map, CalendarClock, Settings, ArrowRight } from 'lucide-react';

const visitPatternData = [
  { hour: '8AM', weekday: 120, weekend: 420 },
  { hour: '9AM', weekday: 280, weekend: 680 },
  { hour: '10AM', weekday: 450, weekend: 890 },
  { hour: '11AM', weekday: 620, weekend: 1100 },
  { hour: '12PM', weekday: 720, weekend: 1250 },
  { hour: '1PM', weekday: 800, weekend: 1400 },
  { hour: '2PM', weekday: 750, weekend: 1350 },
  { hour: '3PM', weekday: 690, weekend: 1300 },
  { hour: '4PM', weekday: 620, weekend: 1200 },
  { hour: '5PM', weekday: 520, weekend: 1100 },
  { hour: '6PM', weekday: 400, weekend: 950 },
  { hour: '7PM', weekday: 350, weekend: 800 },
  { hour: '8PM', weekday: 200, weekend: 600 },
];

const ageDistributionData = [
  { name: '0-12', value: 30 },
  { name: '13-17', value: 15 },
  { name: '18-24', value: 20 },
  { name: '25-34', value: 25 },
  { name: '35-44', value: 18 },
  { name: '45-54', value: 12 },
  { name: '55+', value: 10 },
];

const attractionPopularityData = [
  { name: 'Roller Coaster A', value: 85 },
  { name: 'Water Ride B', value: 72 },
  { name: 'Family Ride C', value: 68 },
  { name: 'Thrill Ride D', value: 90 },
  { name: 'Children\'s Area E', value: 65 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const predictionInsights = [
  {
    id: 1,
    title: "Peak Visit Times",
    description: "Saturdays from 12PM to 3PM consistently show highest guest traffic",
    impact: "Critical",
    recommendation: "Schedule additional staff during peak hours",
    icon: Clock
  },
  {
    id: 2,
    title: "Popular Attractions",
    description: "Thrill Ride D and Roller Coaster A are most popular, creating congestion",
    impact: "High",
    recommendation: "Implement virtual queuing systems for these rides",
    icon: Map
  },
  {
    id: 3,
    title: "Visit Duration",
    description: "Average visit duration is 5.2 hours, with 30% staying until closing",
    impact: "Medium",
    recommendation: "Create late afternoon special events to increase full-day visits",
    icon: CalendarClock
  },
  {
    id: 4,
    title: "Visitor Demographics",
    description: "Growing segment of young adults (18-34) visiting without children",
    impact: "High",
    recommendation: "Develop evening experiences targeting young adults",
    icon: Users
  }
];

const GuestBehaviorPrediction = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="bg-purple-50 p-2 rounded-md">
            <Brain className="h-5 w-5 text-purple-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Guest Behavior Prediction</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          
          <select className="text-sm border border-gray-200 rounded-md px-2 py-1">
            <option>Last 30 days</option>
            <option>Last 60 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      {showSettings && (
        <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-100 animate-fade-in">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Prediction Model Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Data Source</label>
              <select className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 text-sm">
                <option>Ticket Sales</option>
                <option>App Usage</option>
                <option>WiFi Connections</option>
                <option>All Sources</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Model Type</label>
              <select className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 text-sm">
                <option>Machine Learning</option>
                <option>Statistical</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Prediction Window</label>
              <select className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 text-sm">
                <option>Next 7 days</option>
                <option>Next 14 days</option>
                <option>Next 30 days</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              className="bg-purple-500 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-600 transition-colors"
            >
              Apply Settings
            </button>
          </div>
        </div>
      )}

      <Tab.Group onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-lg bg-gray-50 p-1 mb-6">
          <Tab 
            className={({ selected }) =>
              `w-full rounded-md py-2.5 text-sm font-medium leading-5 transition-colors
              ${selected 
                ? 'bg-white text-purple-600 shadow'
                : 'text-gray-500 hover:bg-white/[0.5] hover:text-gray-700'
              }`
            }
          >
            Visit Patterns
          </Tab>
          <Tab 
            className={({ selected }) =>
              `w-full rounded-md py-2.5 text-sm font-medium leading-5 transition-colors
              ${selected 
                ? 'bg-white text-purple-600 shadow'
                : 'text-gray-500 hover:bg-white/[0.5] hover:text-gray-700'
              }`
            }
          >
            Demographics
          </Tab>
          <Tab 
            className={({ selected }) =>
              `w-full rounded-md py-2.5 text-sm font-medium leading-5 transition-colors
              ${selected 
                ? 'bg-white text-purple-600 shadow'
                : 'text-gray-500 hover:bg-white/[0.5] hover:text-gray-700'
              }`
            }
          >
            Insights
          </Tab>
        </Tab.List>
        
        <Tab.Panels>
          <Tab.Panel>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-100 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Daily Visit Pattern Prediction</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Forecasted guest arrival patterns based on historical data and upcoming events
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-xs text-gray-500">Weekday</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-gray-500">Weekend</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-80 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={visitPatternData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="hour" stroke="#6b7280" fontSize={12} />
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
                  <Area 
                    type="monotone" 
                    dataKey="weekday" 
                    name="Weekday Visits" 
                    stroke="#8b5cf6" 
                    fill="#c4b5fd" 
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="weekend" 
                    name="Weekend Visits" 
                    stroke="#3b82f6" 
                    fill="#93c5fd" 
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Tab.Panel>
          
          <Tab.Panel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-100 mb-6">
                  <h3 className="font-semibold text-gray-800">Age Distribution</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Breakdown of visitors by age group
                  </p>
                </div>
                
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ageDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {ageDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value}%`, name]}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '0.5rem',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                          border: '1px solid #e5e7eb',
                          padding: '12px'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-100 mb-6">
                  <h3 className="font-semibold text-gray-800">Attraction Popularity</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Most popular attractions based on guest activity
                  </p>
                </div>
                
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={attractionPopularityData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                      <XAxis type="number" stroke="#6b7280" fontSize={12} />
                      <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={12} width={90} />
                      <Tooltip
                        formatter={(value) => [`${value}% popularity`, '']}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '0.5rem',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                          border: '1px solid #e5e7eb',
                          padding: '12px'
                        }} 
                      />
                      <Bar 
                        dataKey="value" 
                        fill="#6366f1" 
                        radius={[0, 4, 4, 0]} 
                        barSize={20}
                        name="Popularity"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </Tab.Panel>
          
          <Tab.Panel>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-100 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">AI-Powered Insights & Recommendations</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Machine learning generated insights based on visitor behavior patterns
                  </p>
                </div>
                <button className="mt-3 md:mt-0 bg-purple-500 text-white px-4 py-2 text-sm rounded-md hover:bg-purple-600 transition-colors flex items-center">
                  <span>Generate New Insights</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predictionInsights.map((insight) => (
                <div key={insight.id} className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 p-2 rounded-md">
                      <insight.icon className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {insight.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 mr-2">Impact:</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            insight.impact === 'Critical' 
                              ? 'bg-red-100 text-red-800' 
                              : insight.impact === 'High'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {insight.impact}
                          </span>
                        </div>
                        <button className="text-purple-500 hover:text-purple-700 text-xs font-medium transition-colors">
                          View Details
                        </button>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <h5 className="text-xs font-medium text-gray-700">Recommendation</h5>
                        <p className="text-sm text-gray-800 mt-1">
                          {insight.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default GuestBehaviorPrediction;
