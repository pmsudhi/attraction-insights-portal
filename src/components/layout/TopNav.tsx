import { useState } from "react"
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import { SearchBox } from "../ui/SearchBox"

export function TopNav() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="h-16 border-b border-gray-200 bg-white">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left side - empty for now */}
        <div className="w-48"></div>

        {/* Center - Search Box */}
        <div className="flex-1 flex justify-center">
          <SearchBox
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Right Icons */}
        <div className="w-48 flex items-center justify-end space-x-3">
          <button
            type="button"
            className="p-1 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full relative"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-0.5 right-0.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
          <button
            type="button"
            className="p-1 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full"
          >
            <span className="sr-only">User menu</span>
            <UserCircleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 