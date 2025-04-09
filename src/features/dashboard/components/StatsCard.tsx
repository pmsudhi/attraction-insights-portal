import { StatsCardProps } from '../types';

export const StatsCard = ({
  title,
  value,
  change,
  changeLabel,
  trend,
  trendColor,
  icon
}: StatsCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-primary-50 rounded-lg p-3">
            <div className="text-primary-600">
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-600 truncate">{title}</dt>
              <dd className="flex items-baseline mt-2">
                <div className="text-2xl font-bold tracking-tight text-gray-900">{value}</div>
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                  trendColor === 'green' ? 'text-success-600' : 'text-danger-600'
                }`}>
                  <span className="mr-0.5">{trend === 'up' ? '↑' : '↓'}</span>
                  {Math.abs(change)}%
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {changeLabel}
        </div>
      </div>
    </div>
  );
}; 