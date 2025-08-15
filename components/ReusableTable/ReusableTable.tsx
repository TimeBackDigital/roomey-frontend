import {
  ColumnDef,
  flexRender,
  Table as ReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Props<T> = {
  table: ReactTable<T>;
  columns: ColumnDef<T>[];
  activePage: number;
  totalCount: number;
  isFetchingList: boolean;
  setActivePage: Dispatch<SetStateAction<number>>;
  filters?: {
    search?: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    take?: number;
    page?: number;
  };
  onSearch: (filters: {
    search?: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    take?: number;
    page?: number;
  }) => void;
};

const ReusableTable = <T extends object>({
  table,
  columns,
  activePage,
  totalCount,
  isFetchingList,
  setActivePage,
  filters,
  onSearch,
}: Props<T>) => {
  const pageCount = Math.ceil(totalCount / (filters?.take || 10));

  return (
    <Card>
      <CardHeader>
        {filters && (
          <div className="flex justify-end gap-2 border-b-2 py-2">
            {filters.search && (
              <Input
                variant="filter"
                placeholder="Search..."
                value={filters.search}
                className="w-[250px]"
                onChange={(e) => {
                  onSearch({ ...filters, search: e.target.value });
                }}
              />
            )}

            {filters.startDate && filters.endDate && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!filters.startDate}
                    className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                  >
                    <CalendarIcon />
                    {filters.startDate ? (
                      format(filters.startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="range"
                    selected={
                      filters.startDate
                        ? {
                            from: new Date(filters.startDate),
                            to: filters.endDate
                              ? new Date(filters.endDate)
                              : undefined,
                          }
                        : undefined
                    }
                    onSelect={(range) => {
                      if (range) {
                        onSearch({
                          ...filters,
                          startDate: range.from,
                          endDate: range.to,
                        });
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            )}

            {filters.take && (
              <DropdownMenu>
                <div className="flex items-center gap-x-2 text-md text-primary">
                  Show
                  <DropdownMenuTrigger className="font-semibold flex items-center gap-x-1">
                    {filters.take} <ChevronDownIcon className="size-3" />
                  </DropdownMenuTrigger>
                  Entries
                </div>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => onSearch({ ...filters, take: 10 })}
                  >
                    10
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onSearch({ ...filters, take: 20 })}
                  >
                    20
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onSearch({ ...filters, take: 50 })}
                  >
                    50
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onSearch({ ...filters, take: 100 })}
                  >
                    100
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="relative w-full overflow-x-auto">
          {isFetchingList && (
            <Skeleton className="h-[500px] w-full rounded-md absolute top-0 left-0" />
          )}

          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      className="text-primary font-bold"
                      key={header.id}
                    >
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

            <TableBody>
              {table.getExpandedRowModel().rows.length ? (
                table.getExpandedRowModel().rows.map((row, index) => (
                  <TableRow
                    className={
                      "table-text " +
                      (index % 2 === 0 ? "table-row-header" : "")
                    }
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-primary flex w-full justify-center items-center font-bold text-center py-10"
                  >
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <tfoot>
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div>
                    <span className="text-sm text-primary font-medium">
                      Results {Math.min(activePage * 10, totalCount)} /{" "}
                      {totalCount}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            </tfoot>
          </Table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="flex items-center justify-center gap-x-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            disabled={activePage === 1}
            onClick={() => setActivePage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>

          <div className="flex space-x-2">
            {(() => {
              const maxVisiblePages = 2;
              const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
              let displayedPages = [];

              if (pageCount <= maxVisiblePages) {
                displayedPages = pages;
              } else {
                if (activePage <= 2) {
                  displayedPages = [1, 2, 3, "...", pageCount];
                } else if (activePage >= pageCount - 1) {
                  displayedPages = [
                    1,
                    "...",
                    pageCount - 2,
                    pageCount - 1,
                    pageCount,
                  ];
                } else {
                  displayedPages = [
                    activePage - 1,
                    activePage,
                    activePage + 1,
                    "...",
                    pageCount,
                  ];
                }
              }

              return displayedPages.map((page, index) =>
                typeof page === "number" ? (
                  <Button
                    key={page}
                    onClick={() => setActivePage(page)}
                    size="sm"
                  >
                    {page}
                  </Button>
                ) : (
                  <span key={`ellipsis-${index}`}>{page}</span>
                )
              );
            })()}
          </div>

          <Button
            variant="ghost"
            size="sm"
            disabled={activePage === pageCount}
            onClick={() =>
              setActivePage((prev) => Math.min(prev + 1, pageCount))
            }
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReusableTable;
