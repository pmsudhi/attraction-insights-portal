
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  return (
    <header className="border-b bg-card py-2 px-4 md:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden" 
        onClick={onMenuClick} 
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="flex-1 max-w-md relative hidden md:flex">
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-8 w-full bg-secondary/50"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:block text-right">
            <div className="font-medium text-sm">Park Admin</div>
            <div className="text-xs text-muted-foreground">admin@magicworld.com</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-medium">
            PA
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
