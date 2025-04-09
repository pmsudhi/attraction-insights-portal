
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ setSidebarOpen }: HeaderProps): JSX.Element => {
  return (
    <header className="sticky top-0 z-30 border-b border-border/40 bg-background/95 backdrop-blur py-3 px-4 md:px-6 flex items-center justify-between gap-4 animate-fade-in">
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden" 
        onClick={() => setSidebarOpen(true)} 
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="flex-1 max-w-md relative hidden md:flex">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-9 w-full bg-muted/50 border-muted focus-visible:border-primary/30"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full"></span>
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <div className="font-medium text-sm">Park Admin</div>
            <div className="text-xs text-muted-foreground">admin@magicworld.com</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shadow-sm border border-primary-foreground/10">
            PA
          </div>
        </div>
      </div>
    </header>
  );
};
