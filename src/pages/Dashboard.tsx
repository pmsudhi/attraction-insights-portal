
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';

const Dashboard = () => {
  return (
    <div>
      <PageHeader 
        title="Dashboard"
        description="Welcome to the Magic World Parks Dashboard"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="stat-card">Dashboard content coming soon</div>
      </div>
    </div>
  );
};

export default Dashboard;
