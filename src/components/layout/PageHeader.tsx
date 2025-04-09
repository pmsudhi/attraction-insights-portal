
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

const PageHeader = ({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 animate-fade-in', className)}>
      <div className="space-y-1">
        <h1 className="text-fluid-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      
      {actions && (
        <div className="flex items-center gap-2 mt-2 md:mt-0 animate-fade-in animate-delay-200">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
