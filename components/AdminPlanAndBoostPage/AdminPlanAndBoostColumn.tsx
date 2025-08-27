import { PlanList } from "@/lib/type";
import { CapitalizeFirstLetter, FormatDateTable } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const AdminPlanAndBoostColumn = () => {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanList | null>(null);

  const columns: ColumnDef<PlanList>[] = [
    {
      header: "Plan Name",
      accessorKey: "plan_name",
    },
    {
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-2">
            <span>Plan Created</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <ArrowUpDown />
            </Button>
          </div>
        );
      },
      accessorKey: "plan_created_at",
      cell: ({ row }) => {
        return FormatDateTable(row.original.plan_created_at);
      },
    },
    {
      header: "Status",
      accessorKey: "plan_is_active",
      cell: ({ row }) => {
        return (
          <Badge
            className={
              row.original.plan_is_active
                ? "bg-primary"
                : "bg-transparent border-2 border-primary text-primary"
            }
          >
            {row.original.plan_is_active ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      header: "Plan Role",
      accessorKey: "plan_role_available",
      cell: ({ row }) => {
        return (
          <span>{CapitalizeFirstLetter(row.original.plan_role_available)}</span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const plan = row.original;
        return (
          <Sheet
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen);
              if (isOpen) {
                setSelectedPlan(plan);
              } else {
                setSelectedPlan(null);
              }
            }}
          >
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                View
              </Button>
            </SheetTrigger>

            <SheetContent className=" p-4 space-y-6">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold">
                  {selectedPlan?.plan_name}
                </SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground">
                  {selectedPlan?.plan_description}
                </SheetDescription>
              </SheetHeader>

              {selectedPlan && (
                <div className="space-y-6">
                  {selectedPlan.plan_photo && (
                    <div className="rounded-lg overflow-hidden border">
                      <Image
                        width={500}
                        height={500}
                        src={selectedPlan.plan_photo}
                        alt={selectedPlan.plan_name}
                        className="w-full object-cover max-h-48"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Plan ID</p>
                      <p className="font-medium break-all">
                        {selectedPlan.plan_id}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Price ID</p>
                      <p className="font-medium break-all">
                        {selectedPlan.plan_price_id}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Created At</p>
                      <p className="font-medium">
                        {FormatDateTable(selectedPlan.plan_created_at)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Updated At</p>
                      <p className="font-medium">
                        {FormatDateTable(selectedPlan.plan_updated_at)}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Role Available</p>
                      <span className="font-medium">
                        {CapitalizeFirstLetter(
                          selectedPlan.plan_role_available
                        )}
                      </span>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <Badge variant="outline">{selectedPlan.plan_type}</Badge>
                    </div>

                    <div className="col-span-2">
                      <p className="text-muted-foreground">Limit</p>
                      <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                        {JSON.stringify(selectedPlan.plan_limit, null, 2)}
                      </pre>
                    </div>

                    <div className="col-span-2">
                      <p className="text-muted-foreground">Status</p>
                      <Badge
                        className={
                          selectedPlan.plan_is_active
                            ? "bg-primary text-white"
                            : "bg-transparent border-2 border-primary text-primary"
                        }
                      >
                        {selectedPlan.plan_is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        );
      },
    },
  ];
  return { columns };
};

export default AdminPlanAndBoostColumn;
