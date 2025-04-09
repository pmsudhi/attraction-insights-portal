import * as React from "react"
import { cn } from "../../lib/utils"

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: string
  label?: string
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      error,
      id: providedId,
      label,
      ...props
    },
    ref
  ) => {
    const uniqueId = React.useId()
    const radioId = providedId || `radio-${uniqueId}`

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <div className="relative h-4 w-4">
            <input
              className={cn(
                "peer h-4 w-4 appearance-none rounded-full border border-input bg-transparent transition-colors checked:border-primary-600 checked:bg-primary-600 hover:border-primary-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-danger-500 focus-visible:ring-danger-500",
                className
              )}
              id={radioId}
              ref={ref}
              type="radio"
              {...props}
            />
            <div
              className="pointer-events-none absolute left-0 top-0 h-4 w-4 rounded-full border-2 border-white opacity-0 transition-opacity peer-checked:opacity-100"
              aria-hidden="true"
            />
          </div>
          {label && (
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor={radioId}
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="text-sm text-danger-500">{error}</p>
        )}
      </div>
    )
  }
)

Radio.displayName = "Radio" 