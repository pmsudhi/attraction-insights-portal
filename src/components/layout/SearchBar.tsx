import React from 'react'
import { Input } from "../ui/Input"
import { Search } from "lucide-react"

export interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function SearchBar({ 
  placeholder = "Search...", 
  value, 
  onChange,
  className 
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`pl-10 ${className}`}
      />
    </div>
  )
}

export default SearchBar 