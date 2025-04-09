import * as React from "react"
import { cn } from "../../lib/utils"

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      className,
      required = false,
      ...props
    },
    ref
  ): JSX.Element => {
    return (
      <label
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-0.5 text-danger-500">*</span>
        )}
      </label>
    )
  }
)

Label.displayName = "Label" 