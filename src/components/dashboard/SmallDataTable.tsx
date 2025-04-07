
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SmallDataTableProps {
  title: string;
  columns: {
    key: string;
    title: string;
    className?: string;
    render?: (value: any, row: any) => React.ReactNode;
  }[];
  data: any[];
  className?: string;
}

const SmallDataTable = ({ title, columns, data, className }: SmallDataTableProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6">
                  No data available
                </TableCell>
              </TableRow>
            )}
            {data.map((row, i) => (
              <TableRow key={i}>
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.className}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SmallDataTable;
