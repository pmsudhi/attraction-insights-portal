import * as React from "react"
import { cn } from "../../lib/utils"

type PopoverPosition = "top" | "right" | "bottom" | "left"

interface PopoverProps {
  children: React.ReactNode
  className?: string
  content: React.ReactNode
  onClose?: () => void
  open?: boolean
  position?: PopoverPosition
  showArrow?: boolean
  trigger?: "click" | "hover"
}

const POSITION_STYLES: Record<PopoverPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 -translate-y-2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
  bottom: "top-full left-1/2 -translate-x-1/2 translate-y-2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
}

const ARROW_STYLES: Record<PopoverPosition, string> = {
  top: "bottom-[-4px] left-1/2 -translate-x-1/2 border-t-white",
  right: "left-[-4px] top-1/2 -translate-y-1/2 border-r-white",
  bottom: "top-[-4px] left-1/2 -translate-x-1/2 border-b-white",
  left: "right-[-4px] top-1/2 -translate-y-1/2 border-l-white",
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,
      className,
      content,
      onClose,
      open: controlledOpen,
      position = "bottom",
      showArrow = true,
      trigger = "click",
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
    const isControlled = controlledOpen !== undefined
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen

    const handleClick = () => {
      if (!isControlled && trigger === "click") {
        setUncontrolledOpen(!uncontrolledOpen)
      }
    }

    const handleMouseEnter = () => {
      if (!isControlled && trigger === "hover") {
        setUncontrolledOpen(true)
      }
    }

    const handleMouseLeave = () => {
      if (!isControlled && trigger === "hover") {
        setUncontrolledOpen(false)
      }
    }

    React.useEffect(() => {
      if (!isOpen) {
        return
      }

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node
        const popover = ref as React.RefObject<HTMLDivElement>

        if (popover.current && !popover.current.contains(target)) {
          if (isControlled && onClose) {
            onClose()
          } else if (!isControlled) {
            setUncontrolledOpen(false)
          }
        }
      }

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          if (isControlled && onClose) {
            onClose()
          } else if (!isControlled) {
            setUncontrolledOpen(false)
          }
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        document.removeEventListener("keydown", handleEscape)
      }
    }, [isOpen, isControlled, onClose, ref])

    return (
      <div
        className="relative inline-block"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}
      >
        {children}
        {isOpen && (
          <div
            className={cn(
              "absolute z-50 min-w-[200px] rounded-md bg-white p-4 shadow-lg",
              POSITION_STYLES[position],
              className
            )}
            role="dialog"
          >
            {content}
            {showArrow && (
              <div
                className={cn(
                  "absolute h-0 w-0 border-4 border-transparent",
                  ARROW_STYLES[position]
                )}
              />
            )}
          </div>
        )}
      </div>
    )
  }
)

Popover.displayName = "Popover" 