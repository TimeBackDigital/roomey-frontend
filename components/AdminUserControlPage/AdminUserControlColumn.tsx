import { UserListType } from "@/lib/type";
import { CapitalizeFirstLetter, FormatDateTable } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import AdminActionModal from "../Modal/AdminModal";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const AdminUserControlColumn = () => {
  const columns: ColumnDef<UserListType>[] = [
    {
      header: "Full Name",
      accessorKey: "user_name",
    },

    {
      header: "Email Address",
      accessorKey: "user_email",
    },
    {
      header: "User Type",
      accessorKey: "user_role",
      cell: ({ row }) => {
        return CapitalizeFirstLetter(row.original.user_role);
      },
    },
    {
      header: "Status",
      accessorKey: "user_status",
      cell: ({ row }) => {
        return (
          <Badge
            className={
              row.original.user_is_active
                ? "bg-primary"
                : "bg-transparent border-2 border-primary text-primary"
            }
          >
            {row.original.user_is_active ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      header: "Registration",
      accessorKey: "user_created_at",
      cell: ({ row }) => {
        return FormatDateTable(row.original.user_created_at);
      },
    },
    {
      header: "Last active",
      accessorKey: "user_last_login_at",
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="flex flex-col gap-2">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <AdminActionModal
                  currentRole={user.user_role}
                  action="promote"
                  defaultUserId={user.id}
                />
                <AdminActionModal
                  currentRole={user.user_role}
                  action="changePassword"
                  defaultUserId={user.id}
                />
                <AdminActionModal
                  currentRole={user.user_role}
                  action="ban"
                  defaultUserId={user.id}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
  return { columns };
};

export default AdminUserControlColumn;
