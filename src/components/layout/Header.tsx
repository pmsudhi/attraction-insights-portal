"use client"

import { Bars3Icon } from "@heroicons/react/24/outline"
import { SearchBar } from "./SearchBar"
import { NotificationsMenu } from "./NotificationsMenu"
import { UserMenu } from "./UserMenu"

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ setSidebarOpen }: HeaderProps) => {
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // Implement search functionality
  };

  // Mock notifications data
  const notifications = [
    {
      id: "1",
      title: "New Report Available",
      message: "The Q2 2025 financial report is now available for review.",
      time: "1h ago",
      read: false,
    },
    {
      id: "2",
      title: "System Update",
      message: "System maintenance scheduled for tonight at 2 AM EST.",
      time: "2h ago",
      read: true,
    },
  ];

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1">
          <SearchBar onChange={handleSearch} placeholder="Search dashboard..." className="max-w-lg" />
        </div>

        <div className="ml-4 flex items-center space-x-4">
          <NotificationsMenu notifications={notifications} />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
};

