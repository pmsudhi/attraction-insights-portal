import * as React from "react"
import { cn } from "../../lib/utils"

type TooltipPosition = "top" | "right" | "bottom" | "left"

interface TooltipProps {
  children: React.ReactNode
  className?: string
  content: React.ReactNode
  delay?: number
  position?: TooltipPosition
  showArrow?: boolean
}

const POSITION_STYLES: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 -translate-y-2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
  bottom: "top-full left-1/2 -translate-x-1/2 translate-y-2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
}

const ARROW_STYLES: Record<TooltipPosition, string> = {
  top: "bottom-[-4px] left-1/2 -translate-x-1/2 border-t-black",
  right: "left-[-4px] top-1/2 -translate-y-1/2 border-r-black",
  bottom: "top-[-4px] left-1/2 -translate-x-1/2 border-b-black",
  left: "right-[-4px] top-1/2 -translate-y-1/2 border-l-black",
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      className,
      content,
      delay = 200,
      position = "top",
      showArrow = true,
    },
    ref
  ): JSX.Element => {
    const [isVisible, setIsVisible] = React.useState(false)
    const timeoutRef = React.useRef<number>()

    const handleMouseEnter = React.useCallback(() => {
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(true)
      }, delay)
    }, [delay])

    const handleMouseLeave = React.useCallback(() => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
      setIsVisible(false)
    }, [])

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current !== undefined) {
          window.clearTimeout(timeoutRef.current)
        }
      }
    }, [])

    return (
      <div
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        {isVisible && (
          <div
            ref={ref}
            className={cn(
              "absolute z-50 rounded-md bg-black px-2 py-1 text-xs text-white",
              POSITION_STYLES[position],
              className
            )}
            role="tooltip"
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

Tooltip.displayName = "Tooltip" 