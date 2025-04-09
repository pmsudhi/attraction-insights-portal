
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';

const Executive = () => {
  return (
    <div>
      <PageHeader 
        title="Executive"
        description="Executive reports and KPIs"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="stat-card">Executive content coming soon</div>
      </div>
    </div>
  );
};

export default Executive;
