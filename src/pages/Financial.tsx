
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';

const Financial = () => {
  return (
    <div>
      <PageHeader 
        title="Financial"
        description="Financial reports and analytics"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="stat-card">Financial content coming soon</div>
      </div>
    </div>
  );
};

export default Financial;
