import * as React from "react"
import { cn } from "../../lib/utils"
import { XMarkIcon } from "@heroicons/react/24/solid"

interface DialogProps {
  children: React.ReactNode
  className?: string
  onClose: () => void
  open: boolean
  title?: string
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      children,
      className,
      onClose,
      open,
      title,
    },
    ref
  ) => {
    React.useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose()
        }
      }

      if (open) {
        document.addEventListener("keydown", handleEscape)
        document.body.style.overflow = "hidden"
      }

      return () => {
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = "unset"
      }
    }, [onClose, open])

    if (!open) {
      return null
    }

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        ref={ref}
      >
        <div
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />
        <div
          className={cn(
            "relative z-50 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg",
            className
          )}
        >
          <div className="flex items-start justify-between">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
            )}
            <button
              className="ml-4 rounded-md p-1 hover:bg-gray-100"
              onClick={onClose}
              type="button"
            >
              <XMarkIcon
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    )
  }
)

Dialog.displayName = "Dialog" 