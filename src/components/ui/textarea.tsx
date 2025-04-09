import * as React from "react"
import { cn } from "../../lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
    const textareaId = providedId || `textarea-${uniqueId}`

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor={textareaId}
          >
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-danger-500 focus-visible:ring-danger-500",
            className
          )}
          id={textareaId}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-danger-500">{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = "Textarea" 