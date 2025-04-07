
import { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface TabViewProps {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string;
}

export function TabView({ tabs, defaultValue = tabs[0]?.id, className }: TabViewProps) {
  return (
    <Tabs defaultValue={defaultValue} className={cn("w-full", className)}>
      <TabsList className="grid grid-flow-col auto-cols-fr mb-6 bg-secondary/40">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="data-[state=active]:bg-background">
            <div className="flex items-center gap-2">
              {tab.icon}
              <span>{tab.label}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
