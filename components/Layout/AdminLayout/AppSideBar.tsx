"use client";

import { NavMain } from "@/components/Layout/AdminLayout/NavMain";
import { TeamSwitcher } from "@/components/Layout/AdminLayout/TeamSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import * as React from "react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/g/dashboard",
      isActive: true,
      items: [
        {
          title: "Main Dashboard",
          url: "/g/dashboard",
        },
      ],
    },
    {
      title: "Admin Tools",
      url: "/g/models",
      isActive: true,
      items: [
        {
          title: "Send Notification",
          url: "#",
        },
        {
          title: "Listing Control",
          url: "#",
        },
        {
          title: "User Control",
          url: "/g/user-control",
        },
        {
          title: "Reports",
          url: "#",
        },
        {
          title: "Plans and Boosts",
          url: "/g/plan-and-boost",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
