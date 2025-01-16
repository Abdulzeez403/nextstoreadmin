import React from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/table/filter";
import { IProduct } from "@/lib/features/product/type";
import { DataTablePagination } from "@/components/table/pagination";
import Modal from "@/components/modals/modal";
import Drawer from "@/components/modals/drawer";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onEdit: (value: IProduct) => void;
  onDelete: (value: IProduct) => void;
  onDismiss: () => void;
  onView: (value: IProduct) => void;
  children: React.ReactNode;
  isOpen: boolean;
  handleDrawerOpen: () => void;
  id?: string;
}

export function TableComponent<TData, TValue>({
  columns,
  data,
  children,
  isOpen,
  onDismiss,
  handleDrawerOpen,
  id,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="border-2 rounded-lg p-4">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-x-2">
          <div className="flex items-center py-4">
            <Input
              placeholder="Search name"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </div>

        <div className="flex items-center">
          <DataTableViewOptions table={table} />
          <Button className="ml-4 hover:bg-red-500" onClick={handleDrawerOpen}>
            Add New
          </Button>
        </div>
      </div>

      <Table className="border-2 rounded-lg">
        <TableHeader className="bg-slate-300">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-white font-bold p-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="border-2 border-slate-300">
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination table={table} />

      <Drawer width="100" isOpen={isOpen} onClose={onDismiss}>
        {children}
      </Drawer>
    </div>
  );
}
