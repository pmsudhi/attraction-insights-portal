
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

const StatCard = ({
  title,
  value,
  change,
  changeLabel = 'vs. last period',
  icon,
  className
}: StatCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className={cn('stat-card', className)}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="stat-label">{title}</h3>
          <div className="stat-value">{value}</div>
          
          {change !== undefined && (
            <div className={cn("stat-indicator", {
              'positive': isPositive,
              'negative': isNegative
            })}>
              {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              <span>{Math.abs(change)}% {changeLabel}</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
