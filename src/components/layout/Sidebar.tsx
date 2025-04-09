
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  DollarSign, 
  Star, 
  Settings,
  Calendar,
  Ticket,
  X,
  PanelLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps): JSX.Element => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  // Animation for initial mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Menu items with proper route matching
  const menuItems = [
    {
      label: 'Overview',
      items: [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Calendar', icon: Calendar, path: '/calendar' },
      ]
    },
    {
      label: 'Analytics',
      items: [
        { name: 'Attendance', icon: Users, path: '/attendance' },
        { name: 'Revenue', icon: DollarSign, path: '/revenue' },
        { name: 'Satisfaction', icon: Star, path: '/satisfaction' },
      ]
    },
    {
      label: 'Management',
      items: [
        { name: 'Operations', icon: BarChart3, path: '/operations' },
        { name: 'Tickets', icon: Ticket, path: '/tickets' },
        { name: 'Settings', icon: Settings, path: '/settings' },
      ]
    },
  ];

  // Check if a route is active (exact match or starts with for nested routes)
  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-200",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0 shadow-xl lg:shadow-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          mounted ? "animate-fade-in" : "opacity-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile header with close button */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-sidebar-border/50">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-sidebar-accent text-sidebar-accent-foreground flex items-center justify-center font-bold shadow-inner">MW</div>
              <span className="font-bold text-lg text-sidebar-foreground">Magic World</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="text-sidebar-foreground hover:bg-sidebar-border/20">
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Desktop logo */}
          <div className="hidden lg:flex items-center space-x-2 p-5">
            <div className="w-10 h-10 rounded-md bg-sidebar-accent text-sidebar-accent-foreground flex items-center justify-center font-bold text-lg shadow-sm">MW</div>
            <span className="font-bold text-xl text-sidebar-foreground">Magic World</span>
          </div>

          {/* Navigation items with animations */}
          <div className="flex-grow overflow-y-auto py-5 px-3">
            {menuItems.map((section, idx) => (
              <div key={idx} className={cn("space-y-1 mb-6", mounted && "animate-slide-in")} style={{ animationDelay: `${idx * 100}ms` }}>
                <h3 className="text-sidebar-foreground/70 font-medium text-xs uppercase tracking-wider px-3 mb-3">{section.label}</h3>
                {section.items.map((item, itemIdx) => {
                  const isActive = isActiveRoute(item.path);
                  return (
                    <Link 
                      key={item.name} 
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                          : "text-sidebar-foreground hover:bg-sidebar-border/20"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/70")} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border/50 flex items-center justify-between">
            <div className="text-sm text-sidebar-foreground/80">
              <p>Magic World Parks</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-sidebar-foreground/70 hover:bg-sidebar-border/20 hidden lg:flex" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <PanelLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
