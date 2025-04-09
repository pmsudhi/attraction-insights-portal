import { Fragment, useRef, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsMenuProps {
  notifications?: Notification[];
}

export const NotificationsMenu = ({ notifications = [] }: NotificationsMenuProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu on escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <Menu as="div" className="relative ml-3" ref={notificationsRef}>
      <div>
        <Menu.Button
          className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-expanded={notificationsOpen}
          aria-haspopup="true"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2 text-sm font-medium text-gray-900">
            Notifications
          </div>
          {notifications.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <Menu.Item key={notification.id}>
                  {({ active }) => (
                    <div
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm ${
                        notification.read ? "text-gray-700" : "font-medium text-gray-900"
                      }`}
                    >
                      <div className="flex justify-between">
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-xs text-gray-500">{notification.time}</div>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {notification.message}
                      </div>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No notifications
            </div>
          )}
          {notifications.length > 0 && (
            <div className="border-t border-gray-100 px-4 py-2">
              <button
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
                onClick={() => {
                  // Handle mark all as read
                  console.log("Mark all as read clicked");
                }}
              >
                Mark all as read
              </button>
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}; 