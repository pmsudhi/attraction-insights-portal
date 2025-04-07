
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
    <div className={cn('flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4', className)}>
      <div>
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      
      {actions && (
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
