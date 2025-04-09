import React from "react"
import { cn } from "../../lib/utils"

type TableProps = React.HTMLAttributes<HTMLTableElement>

export const Table = ({
  className,
  ...props
}: TableProps): JSX.Element => {
  return (
    <div className="w-full overflow-auto">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>

export const TableHeader = ({
  className,
  ...props
}: TableHeaderProps): JSX.Element => {
  return (
    <thead className={cn("[&_tr]:border-b", className)} {...props} />
  )
}

type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>

export const TableBody = ({
  className,
  ...props
}: TableBodyProps): JSX.Element => {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>

export const TableFooter = ({
  className,
  ...props
}: TableFooterProps): JSX.Element => {
  return (
    <tfoot
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>

export const TableRow = ({
  className,
  ...props
}: TableRowProps): JSX.Element => {
  return (
    <tr
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>

export const TableHead = ({
  className,
  ...props
}: TableHeadProps): JSX.Element => {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>

export const TableCell = ({
  className,
  ...props
}: TableCellProps): JSX.Element => {
  return (
    <td
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  )
}

type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>

export const TableCaption = ({
  className,
  ...props
}: TableCaptionProps): JSX.Element => {
  return (
    <caption
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
} 