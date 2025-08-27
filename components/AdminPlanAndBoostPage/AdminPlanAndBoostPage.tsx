"use client";

import PlanService from "@/services/plan/plan.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import ReusableTable from "../ReusableTable/ReusableTable";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import AdminPlanAndBoostColumn from "./AdminPlanAndBoostColumn";

const PlanFormSchema = z.object({
  page: z.number().min(1),
  skip: z.number().min(0),
  orderBy: z.string(),
  sortBy: z.string(),
  type: z.string().optional(),
  role: z.string().optional(),
});

type PlanFormValues = z.infer<typeof PlanFormSchema>;

const AdminPlanAndBoostPage = () => {
  const [filters, setFilters] = useState<PlanFormValues>({
    page: 1,
    orderBy: "plan_created_at",
    sortBy: "desc",
    type: "plan",
    role: undefined,
    skip: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(PlanFormSchema),
    defaultValues: filters,
  });

  const queryKey = ["plan-list", ...Object.values(filters)];

  const { data, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: () => PlanService.getPlanList(filters),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });

  const { columns } = AdminPlanAndBoostColumn();

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
      sorting: sorting,
      pagination: {
        pageIndex: 0,
        pageSize: filters.skip,
      },
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;

      setSorting(newSorting);

      if (newSorting.length > 0) {
        setFilters((prev) => ({
          ...prev,
          sortBy: newSorting[0].desc ? "desc" : "asc",
          orderBy: newSorting[0].id,
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          sortBy: "",
          orderBy: "",
        }));
      }
    },
  });

  const onSubmit = (data: PlanFormValues) => {
    setFilters((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handlePlanChange = (value: string) => {
    form.setValue("type", value);
    setFilters((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const RadioGroupItems = [
    {
      label: "Plan",
      value: "plan",
    },

    {
      label: "Boost",
      value: "boost",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-end">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-2"
                    >
                      {RadioGroupItems.map((item) => (
                        <Label
                          htmlFor={item.value}
                          className="cursor-pointer"
                          key={item.value}
                        >
                          <RadioGroupItem
                            value={item.value}
                            id={item.value}
                            className="sr-only"
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              handlePlanChange(item.value);
                            }}
                            variant={
                              field.value === item.value ? "default" : "outline"
                            }
                            className="w-full rounded-full"
                          >
                            {item.label}
                          </Button>
                        </Label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <ReusableTable
        table={table}
        columns={columns}
        activePage={filters.page}
        totalCount={data?.total ?? 0}
        isFetchingList={isLoading}
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

export default AdminPlanAndBoostPage;
