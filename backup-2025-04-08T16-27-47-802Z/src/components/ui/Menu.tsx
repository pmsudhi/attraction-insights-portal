import * as React from "react"
import { cn } from "../../lib/utils"

interface MenuProps {
  children: React.ReactNode
  className?: string
}

interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  shortcut?: string
}

interface MenuSeparatorProps {
  className?: string
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      children,
      className,
    },
    ref
  ): JSX.Element => {
    return (
      <div
        className={cn(
          "min-w-[180px] overflow-hidden rounded-md border bg-white p-1 shadow-md",
          className
        )}
        ref={ref}
        role="menubar"
        tabIndex={0}
      >
        <div role="menu" aria-label="Menu items">
          {children}
        </div>
      </div>
    )
  }
)

Menu.displayName = "Menu"

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    {
      children,
      className,
      disabled,
      icon,
      onClick,
      shortcut,
      ...props
    },
    ref
  ): JSX.Element => {
    return (
      <button
        className={cn(
          "flex w-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        disabled={disabled}
        onClick={onClick}
        ref={ref}
        role="menuitem"
        tabIndex={-1}
        type="button"
        {...props}
      >
        {icon && (
          <span className="mr-2 h-4 w-4" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="flex-1">{children}</span>
        {shortcut && (
          <span
            className="ml-auto text-xs tracking-widest text-gray-500"
            aria-hidden="true"
          >
            {shortcut}
          </span>
        )}
      </button>
    )
  }
)

MenuItem.displayName = "MenuItem"

export const MenuSeparator = ({
  className,
}: MenuSeparatorProps): JSX.Element => {
  return (
    <div
      className={cn("my-1 h-px bg-gray-200", className)}
      role="separator"
      aria-orientation="horizontal"
    />
  )
}

MenuSeparator.displayName = "MenuSeparator" 