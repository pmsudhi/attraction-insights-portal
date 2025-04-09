
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';

const Planning = () => {
  return (
    <div>
      <PageHeader 
        title="Planning"
        description="Plan your park operations"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="stat-card">Planning content coming soon</div>
      </div>
    </div>
  );
};

export default Planning;
