import { AppSidebar } from "@/components/Layout/AdminLayout/AppSideBar";
import LatestSegment from "@/components/Layout/AdminLayout/LatestSegment";
import UserAvatar from "@/components/Layout/AdminLayout/UserAvatar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Bell, MessageSquareText } from "lucide-react";
type LayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b-2 justify-end">
          <div className="flex items-center gap-x-6 px-4">
            <Bell className="size-6" />
            <MessageSquareText className="size-6" />
            <UserAvatar />
          </div>
        </header>
        <div className="bg-background-secondary flex flex-1 flex-col gap-4 p-6">
          <LatestSegment />
          <div className="min-h-screen flex-1 rounded-xl md:min-h-min">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
