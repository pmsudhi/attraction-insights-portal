import React from 'react';
import { Card, CardContent } from "@/components/ui/Card";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

export const CapitalPlanning: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total CapEx Budget</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">$85.4M</p>
            </div>
            <div className="p-2 bg-primary-50 rounded-md">
              <CurrencyDollarIcon className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

