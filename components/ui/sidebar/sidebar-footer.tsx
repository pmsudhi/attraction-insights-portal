import * as React from "react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-context"

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  const { state } = useSidebar()

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-14 items-center gap-2 border-t px-4",
        "data-[state=collapsed]:justify-center",
        className
      )}
      data-state={state}
      {...props}
    >
      {children}
    </div>
  )
})
SidebarFooter.displayName = "SidebarFooter" 