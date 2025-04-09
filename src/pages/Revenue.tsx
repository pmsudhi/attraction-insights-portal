
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';

const Revenue = () => {
  return (
    <div>
      <PageHeader 
        title="Revenue"
        description="Revenue breakdown and analysis"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="stat-card">Revenue content coming soon</div>
      </div>
    </div>
  );
};

export default Revenue;
