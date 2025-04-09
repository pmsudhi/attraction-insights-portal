
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';

const Analytics = () => {
  return (
    <div>
      <PageHeader 
        title="Analytics"
        description="Advanced analytics and reporting"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="stat-card">Analytics content coming soon</div>
      </div>
    </div>
  );
};

export default Analytics;
