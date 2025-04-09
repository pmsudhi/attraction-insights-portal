import * as React from "react"
import { cn } from "../../lib/utils"

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: string
  label?: string
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
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
    const switchId = providedId || `switch-${uniqueId}`

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <div className="relative inline-flex h-5 w-9 items-center">
            <input
              className={cn(
                "peer h-0 w-0 appearance-none",
                className
              )}
              id={switchId}
              ref={ref}
              type="checkbox"
              {...props}
            />
            <div
              className={cn(
                "absolute h-5 w-9 cursor-pointer rounded-full bg-gray-200 transition-colors peer-checked:bg-primary-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                error && "bg-danger-100 peer-checked:bg-danger-600"
              )}
            >
              <div
                className={cn(
                  "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4"
                )}
              />
            </div>
          </div>
          {label && (
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor={switchId}
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

Switch.displayName = "Switch" 