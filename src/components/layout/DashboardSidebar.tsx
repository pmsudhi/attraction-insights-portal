
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  DollarSign, 
  Star, 
  Settings,
  Calendar,
  Ticket,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent,
  SidebarFooter,
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const DashboardSidebar = ({ isMobileOpen, onMobileClose }: DashboardSidebarProps) => {
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

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-200",
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onMobileClose}
      />
      
      {/* Sidebar */}
      <Sidebar 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-sidebar border-r transition-transform duration-300 md:translate-x-0 md:static md:flex",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col min-h-screen">
          {/* Mobile close button */}
          <div className="md:hidden flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-brand-500 text-white flex items-center justify-center font-bold">MW</div>
              <span className="font-bold text-lg">Magic World</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onMobileClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 p-4">
            <div className="w-8 h-8 rounded-md bg-brand-500 text-white flex items-center justify-center font-bold">MW</div>
            <span className="font-bold text-lg">Magic World</span>
          </div>

          <SidebarContent className="flex-grow overflow-y-auto py-2">
            {menuItems.map((section, idx) => (
              <SidebarGroup key={idx}>
                <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                          <Link to={item.path} onClick={onMobileClose} className="flex items-center gap-3">
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <p>Magic World Parks</p>
              </div>
              <SidebarTrigger />
            </div>
          </SidebarFooter>
        </div>
      </Sidebar>
    </>
  );
};

export default DashboardSidebar;
