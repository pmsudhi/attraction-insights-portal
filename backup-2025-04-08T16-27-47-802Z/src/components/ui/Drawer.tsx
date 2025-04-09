import * as React from "react"
import { cn } from "../../lib/utils"
import { XMarkIcon } from "@heroicons/react/24/solid"

type DrawerPosition = "left" | "right" | "top" | "bottom"

interface DrawerProps {
  children: React.ReactNode
  className?: string
  onClose: () => void
  open: boolean
  position?: DrawerPosition
  title?: string
}

const POSITION_STYLES: Record<DrawerPosition, string> = {
  left: "left-0 h-full w-full max-w-sm transform -translate-x-full",
  right: "right-0 h-full w-full max-w-sm transform translate-x-full",
  top: "top-0 w-full h-full max-h-sm transform -translate-y-full",
  bottom: "bottom-0 w-full h-full max-h-sm transform translate-y-full",
}

const OPEN_STYLES: Record<DrawerPosition, string> = {
  left: "translate-x-0",
  right: "translate-x-0",
  top: "translate-y-0",
  bottom: "translate-y-0",
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      children,
      className,
      onClose,
      open,
      position = "right",
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
        className="fixed inset-0 z-50 flex"
        ref={ref}
      >
        <div
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />
        <div
          className={cn(
            "fixed bg-white shadow-lg transition-transform duration-300 ease-in-out",
            POSITION_STYLES[position],
            open && OPEN_STYLES[position],
            className
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b px-4 py-3">
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
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

Drawer.displayName = "Drawer" 