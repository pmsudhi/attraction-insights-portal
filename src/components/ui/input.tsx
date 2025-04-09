import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      id: providedId,
      label,
      type = "text",
      ...props
    },
    ref
  ): JSX.Element => {
    const uniqueId = React.useId()
    const inputId = providedId || `input-${uniqueId}`

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor={inputId}
          >
            {label}
          </label>
        )}
        <input
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-danger-500 focus-visible:ring-danger-500",
            className
          )}
          id={inputId}
          ref={ref}
          type={type}
          {...props}
        />
        {error && (
          <p className="text-sm text-danger-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input" 