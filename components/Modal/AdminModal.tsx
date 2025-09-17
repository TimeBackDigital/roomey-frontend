"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth/auth-client";
import { AdminModalData, RoleList } from "@/lib/constant";
import { AdminFormValues, AdminMOdalFormSchema } from "@/lib/schema/schema";
import { RoleKey, UserListType } from "@/lib/type";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type AdminActionModalProps<
  T extends "promote" | "changePassword" | "ban" | "createUser"
> = {
  action: T;
  defaultUserId?: string;
  currentRole?: string;
  className?: string;
};

export default function AdminActionModal({
  action,
  defaultUserId,
  currentRole,
  className,
}: AdminActionModalProps<"promote" | "changePassword" | "ban" | "createUser">) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(AdminMOdalFormSchema),
    defaultValues:
      action === "createUser"
        ? {
            action: action,
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }
        : { action: action, userId: defaultUserId || "", role: "" },
  });

  const { handleSubmit } = form;

  const promoteRole = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: RoleKey }) =>
      authClient.admin.setRole({ userId, role }),
    onMutate: async (variables) => {
      queryClient.cancelQueries({ queryKey: ["user-list"] });
      const previousData = queryClient.getQueryData<{ data: UserListType[] }>([
        "user-list",
      ]);

      if (previousData) {
        queryClient.setQueryData(["user-list"], {
          ...previousData,
          data: previousData.data.map((user) =>
            user.id === variables.userId
              ? { ...user, user_role: variables.role }
              : user
          ),
        });
      }

      return { previousData };
    },
    onSuccess: () => {
      toast.success("Role updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user-list"] });
      setIsOpen(false);
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["user-list"], context?.previousData);
      toast.error("Failed to update role");
    },
  });

  const changePassword = useMutation({
    mutationFn: ({
      userId,
      newPassword,
    }: {
      userId: string;
      newPassword: string;
    }) => authClient.admin.setUserPassword({ userId, newPassword }),
    onSuccess: () => {
      toast.success("Password reset to default");
      setIsOpen(false);
    },
  });

  const banUser = useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      authClient.admin.banUser({ userId }),
    onSuccess: () => {
      toast.success("User banned successfully");
      setIsOpen(false);
    },
  });

  const createUser = useMutation({
    mutationFn: ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => authClient.admin.createUser({ email, password, name }),
    onSuccess: () => {
      toast.success("User created successfully");
      queryClient.invalidateQueries({ queryKey: ["user-list"] });
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to create user");
    },
  });

  const onSubmit = (values: AdminFormValues) => {
    switch (values.action) {
      case "promote":
        promoteRole.mutate({
          userId: defaultUserId || "",
          role: values.role as "admin" | "seeker" | "lister",
        });
        break;
      case "changePassword":
        changePassword.mutate({
          userId: defaultUserId || "",
          newPassword: values.newPassword as string,
        });
        break;

      case "ban":
        banUser.mutate({ userId: defaultUserId || "" });
        break;
      case "createUser":
        createUser.mutate({
          email: (values.email as string) || "",
          password: (values.password as string) || "",
          name: (values.name as string) || "",
        });
        break;
    }
  };

  const isLoading =
    promoteRole.isPending ||
    changePassword.isPending ||
    banUser.isPending ||
    createUser.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn`flex items-center justify-start w-full text-sm text-left ${className}`}
        >
          {AdminModalData[action].button}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{AdminModalData[action].title}</DialogTitle>
          <DialogDescription>
            {AdminModalData[action].description}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {action === "promote" && (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {RoleList.filter(
                            (role) => role.value !== currentRole
                          ).map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {action === "changePassword" && (
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {action === "createUser" && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Password"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Confirm Password"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button
              type="submit"
              variant={action === "ban" ? "destructive" : "default"}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Processing..." : "Confirm"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
