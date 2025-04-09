import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

interface SearchBoxProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
}

export function SearchBox({ placeholder = "Search dashboard...", value, onChange }: SearchBoxProps) {
  return (
    <div className="relative w-[400px]">
      <div className="absolute left-2.5 top-[7px] pointer-events-none">
        <MagnifyingGlassIcon className="h-[18px] w-[18px] text-gray-500" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[32px] pl-8 pr-3 bg-white border border-gray-200 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] rounded-[4px] text-[13px] text-gray-900 placeholder:text-gray-400"
      />
    </div>
  )
} 