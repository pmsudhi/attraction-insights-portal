import * as React from "react"
import { cn } from "../../lib/utils"
import { CheckIcon } from "@heroicons/react/24/solid"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: string
  label?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      error,
      id: providedId,
      label,
      ...props
    },
    ref
  ): JSX.Element => {
    const uniqueId = React.useId()
    const checkboxId = providedId || `checkbox-${uniqueId}`

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <div className="relative h-4 w-4">
            <input
              className={cn(
                "peer h-4 w-4 appearance-none rounded border border-input bg-transparent transition-colors checked:border-primary-600 checked:bg-primary-600 hover:border-primary-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-danger-500 focus-visible:ring-danger-500",
                className
              )}
              id={checkboxId}
              ref={ref}
              type="checkbox"
              {...props}
            />
            <CheckIcon
              className="pointer-events-none absolute left-0 top-0 h-4 w-4 text-white opacity-0 transition-opacity peer-checked:opacity-100"
              aria-hidden="true"
            />
          </div>
          {label && (
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor={checkboxId}
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

Checkbox.displayName = "Checkbox" 