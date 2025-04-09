import * as React from "react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-context"

export const SidebarNav = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  const { state } = useSidebar()

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-1 flex-col gap-2 overflow-y-auto p-4",
        "data-[state=collapsed]:items-center",
        className
      )}
      data-state={state}
      {...props}
    >
      {children}
    </div>
  )
})
SidebarNav.displayName = "SidebarNav" 