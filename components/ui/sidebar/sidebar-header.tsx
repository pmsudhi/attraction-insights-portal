import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PanelLeft } from "lucide-react"
import { useSidebar } from "./sidebar-context"

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <div
      ref={ref}
      className={cn("flex h-14 items-center gap-2 px-4", className)}
      {...props}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={toggleSidebar}
      >
        <PanelLeft className="h-4 w-4" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      {children}
    </div>
  )
})
SidebarHeader.displayName = "SidebarHeader" 