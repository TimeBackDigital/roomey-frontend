"use client";

import { UserService } from "@/services/user/user.service";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import AdminActionModal from "../Modal/AdminModal";
import ReusableTable from "../ReusableTable/ReusableTable";
import AdminUserControlColumn from "./AdminUserControlColumn";

type Filters = {
  page: number;
  search: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  take: number;
};

const AdminUserControlPage = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    search: "",
    startDate: undefined,
    endDate: undefined,
    take: 10,
  });

  const queryKey = ["user-list", ...Object.values(filters)];

  const { data, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: () => UserService.getUserList(filters),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { columns } = AdminUserControlColumn();

  const table = useReactTable({
    data: data?.data ?? [],
    columns: columns,
    manualFiltering: true,
    manualSorting: true,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: filters.take,
      },
    },
  });

  const handleSearch = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page ?? 1,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-end">
        <AdminActionModal
          action="createUser"
          className="w-fit bg-primary text-white"
        />
      </div>

      <ReusableTable
        table={table}
        columns={columns}
        activePage={filters.page}
        totalCount={data?.total ?? 0}
        isFetchingList={isLoading}
        filters={filters}
        onSearch={handleSearch}
        setActivePage={(activePage) => {
          setFilters((prevFilters) => ({
            ...prevFilters,
            page:
              typeof activePage === "function"
                ? activePage(prevFilters.page)
                : activePage,
          }));
        }}
      />
    </div>
  );
};

export default AdminUserControlPage;
