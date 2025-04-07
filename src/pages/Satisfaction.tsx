
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/dashboard/StatCard';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import SmallDataTable from '@/components/dashboard/SmallDataTable';
import { TabView, TabItem } from '@/components/ui/tab-view';
import { Star, TrendingUp, ThumbsUp, MessageCircle, AlertTriangle } from 'lucide-react';

// Mock data
const satisfactionTrend = [
  { month: 'Jan', overall: 4.6, rides: 4.7, dining: 4.3, staff: 4.8 },
  { month: 'Feb', overall: 4.5, rides: 4.6, dining: 4.2, staff: 4.7 },
  { month: 'Mar', overall: 4.7, rides: 4.8, dining: 4.5, staff: 4.8 },
  { month: 'Apr', overall: 4.8, rides: 4.9, dining: 4.6, staff: 4.9 },
  { month: 'May', overall: 4.7, rides: 4.8, dining: 4.5, staff: 4.8 },
  { month: 'Jun', overall: 4.8, rides: 4.9, dining: 4.7, staff: 4.8 },
];

const categoryRatings = [
  { category: 'Thrill Rides', rating: 4.9 },
  { category: 'Family Rides', rating: 4.7 },
  { category: 'Shows', rating: 4.8 },
  { category: 'Character Experiences', rating: 4.9 },
  { category: 'Quick Service Dining', rating: 4.5 },
  { category: 'Table Service Dining', rating: 4.6 },
  { category: 'Park Cleanliness', rating: 4.8 },
  { category: 'Staff Friendliness', rating: 4.9 },
];

const feedbackData = [
  { 
    id: 'FB-2854',
    category: 'Ride Experience', 
    feedback: 'The new dragon coaster exceeded all expectations!', 
    rating: 5.0,
    date: '2 days ago'
  },
  { 
    id: 'FB-2853',
    category: 'Dining', 
    feedback: 'Long wait times at signature restaurants needs improvement.', 
    rating: 3.5,
    date: '3 days ago'
  },
  { 
    id: 'FB-2852',
    category: 'Staff', 
    feedback: 'Cast members were incredibly helpful with our special needs child.', 
    rating: 5.0,
    date: '3 days ago'
  },
  { 
    id: 'FB-2851',
    category: 'Cleanliness', 
    feedback: 'Park was spotless despite the high attendance. Impressive!', 
    rating: 5.0,
    date: '4 days ago'
  },
  { 
    id: 'FB-2850',
    category: 'Wait Times', 
    feedback: 'Fast Pass system worked well but regular lines were too long.', 
    rating: 3.5,
    date: '5 days ago'
  },
];

const issuesData = [
  { 
    issue: 'Mobile App Crash During Check-in',
    category: 'Technology',
    impact: 'High',
    status: 'In Progress',
    reports: 124
  },
  { 
    issue: 'Long Wait at Fantasy Restaurant',
    category: 'Dining',
    impact: 'Medium',
    status: 'Resolved',
    reports: 87
  },
  { 
    issue: 'Main Street Restroom Cleanliness',
    category: 'Facilities',
    impact: 'Medium',
    status: 'Resolved',
    reports: 65
  },
  { 
    issue: 'Dragon Coaster Temporary Closure',
    category: 'Attractions',
    impact: 'High',
    status: 'Resolved',
    reports: 212
  },
];

const Satisfaction = () => {
  // Function to render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`h-4 w-4 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-2 font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  const satisfactionTabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Overall Satisfaction"
              value="4.8/5.0"
              change={3.2}
              icon={<Star className="h-5 w-5" />}
            />
            <StatCard
              title="Ride Experience Rating"
              value="4.9/5.0"
              change={4.1}
              icon={<ThumbsUp className="h-5 w-5" />}
            />
            <StatCard
              title="Net Promoter Score"
              value="86%"
              change={5.8}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <StatCard
              title="Response Rate"
              value="24.5%"
              change={2.3}
              icon={<MessageCircle className="h-5 w-5" />}
            />
          </div>
          
          <LineChart
            title="Satisfaction Trends by Category"
            data={satisfactionTrend}
            dataKeys={[
              { key: 'overall', color: '#00B0DF' },
              { key: 'rides', color: '#33C0E5' },
              { key: 'dining', color: '#66D0EC' },
              { key: 'staff', color: '#99E0F2' }
            ]}
            xAxisDataKey="month"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BarChart
              title="Category Satisfaction Ratings"
              data={categoryRatings}
              dataKeys={[{ key: 'rating', color: '#00B0DF' }]}
              xAxisDataKey="category"
            />
            
            <SmallDataTable
              title="Recent Guest Feedback"
              columns={[
                { key: 'category', title: 'Category' },
                { 
                  key: 'feedback', 
                  title: 'Feedback',
                  render: (value) => <div className="line-clamp-1">{value}</div>
                },
                { 
                  key: 'rating', 
                  title: 'Rating',
                  render: (value) => renderStars(value)
                }
              ]}
              data={feedbackData.slice(0, 4)}
            />
          </div>
        </div>
      )
    },
    {
      id: 'issues',
      label: 'Issues',
      icon: <AlertTriangle className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Open Issues"
              value="28"
              change={-12.5}
              icon={<AlertTriangle className="h-5 w-5" />}
            />
            <StatCard
              title="Avg Resolution Time"
              value="3.2 hrs"
              change={-8.5}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <StatCard
              title="Guest Complaints"
              value="0.26%"
              change={-4.2}
              icon={<MessageCircle className="h-5 w-5" />}
            />
          </div>
          
          <SmallDataTable
            title="Top Reported Issues"
            columns={[
              { key: 'issue', title: 'Issue' },
              { key: 'category', title: 'Category' },
              { 
                key: 'impact', 
                title: 'Impact',
                render: (value) => {
                  const color = value === 'High' 
                    ? 'bg-red-100 text-red-700' 
                    : value === 'Medium' 
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700';
                  
                  return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                      {value}
                    </span>
                  );
                }
              },
              { 
                key: 'status', 
                title: 'Status',
                render: (value) => {
                  const color = value === 'In Progress' 
                    ? 'bg-blue-100 text-blue-700' 
                    : value === 'Resolved' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700';
                  
                  return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                      {value}
                    </span>
                  );
                }
              },
              { key: 'reports', title: 'Reports', className: 'text-right' }
            ]}
            data={issuesData}
          />
          
          <SmallDataTable
            title="Recent Feedback Details"
            columns={[
              { key: 'id', title: 'ID' },
              { key: 'category', title: 'Category' },
              { 
                key: 'feedback', 
                title: 'Feedback'
              },
              { 
                key: 'rating', 
                title: 'Rating',
                render: (value) => renderStars(value)
              },
              { key: 'date', title: 'Date' }
            ]}
            data={feedbackData}
          />
        </div>
      )
    }
  ];
  
  return (
    <DashboardLayout>
      <PageHeader 
        title="Guest Satisfaction" 
        description="Customer experience metrics and feedback analysis"
      />
      
      <div className="space-y-8">
        <TabView tabs={satisfactionTabs} />
      </div>
    </DashboardLayout>
  );
};

export default Satisfaction;
