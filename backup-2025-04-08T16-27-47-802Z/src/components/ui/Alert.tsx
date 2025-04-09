import * as React from "react"
import { cn } from "../../lib/utils"
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid"

export type AlertVariant = "success" | "error" | "warning" | "info"

const VARIANT_ICONS: Record<AlertVariant, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationCircleIcon,
  info: InformationCircleIcon,
}

const VARIANT_STYLES: Record<AlertVariant, string> = {
  success: "bg-success-50 text-success-800 border-success-200",
  error: "bg-danger-50 text-danger-800 border-danger-200",
  warning: "bg-warning-50 text-warning-800 border-warning-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode
  onClose?: () => void
  title?: string
  variant?: AlertVariant
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      action,
      children,
      className,
      onClose,
      title,
      variant = "info",
      ...props
    },
    ref
  ): JSX.Element => {
    const Icon = VARIANT_ICONS[variant]

    return (
      <div
        className={cn(
          "relative rounded-lg border p-4",
          VARIANT_STYLES[variant],
          className
        )}
        ref={ref}
        role="alert"
        {...props}
      >
        <div className="flex items-start gap-3">
          <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <div className="flex-1">
            {title && (
              <h3 className="mb-1 font-medium">{title}</h3>
            )}
            <div className="text-sm">{children}</div>
          </div>
          {(action || onClose) && (
            <div className="flex items-center gap-2">
              {action}
              {onClose && (
                <button
                  className="rounded-md p-1 hover:bg-black/5"
                  onClick={onClose}
                  type="button"
                >
                  <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Close</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)

Alert.displayName = "Alert" 