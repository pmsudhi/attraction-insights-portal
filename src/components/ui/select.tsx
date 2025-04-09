"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  "aria-label"?: string
  hideLabel?: boolean
  label?: string
  onValueChange: (value: string) => void
  value: string
}

export const Select = ({
  "aria-label": ariaLabel,
  children,
  className,
  hideLabel = false,
  id: providedId,
  label,
  onValueChange,
  value,
  ...props
}: SelectProps): JSX.Element => {
  const id = React.useId()
  const selectId = providedId || id

  return (
    <div className="relative">
      {!hideLabel && label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        aria-label={ariaLabel || label}
        className={cn(
          "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm",
          className
        )}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

type SelectTriggerProps = React.HTMLAttributes<HTMLDivElement>

export const SelectTrigger = ({
  children,
  className,
  ...props
}: SelectTriggerProps): JSX.Element => {
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface SelectValueProps {
  children: React.ReactNode
}

export const SelectValue = ({
  children
}: SelectValueProps): JSX.Element => {
  return <span className="text-sm">{children}</span>
}

interface SelectContentProps {
  children: React.ReactNode
}

export const SelectContent = ({
  children
}: SelectContentProps): JSX.Element => {
  return (
    <div className="relative mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {children}
    </div>
  )
}

interface SelectItemProps {
  children: React.ReactNode
  value: string
}

export const SelectItem = ({
  children,
  value
}: SelectItemProps): JSX.Element => {
  return (
    <div
      className="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-primary-50"
      data-value={value}
    >
      {children}
    </div>
  )
} 