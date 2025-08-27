"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 8C0 3.58172 3.58172 0 8 0H24C28.4183 0 32 3.58172 32 8V24C32 28.4183 28.4183 32 24 32H8C3.58172 32 0 28.4183 0 24V8Z"
            fill="#1A1A1A"
          />
          <path
            d="M16.3941 12.2617C16.7161 12.2617 17.0241 12.3177 17.3041 12.4297L16.7721 14.5577C16.4641 14.4317 16.1701 14.3617 15.8761 14.3617C15.0921 14.3617 14.4481 14.8377 14.4481 15.7057V19.5557H12.2221V12.4437H14.2661L14.3501 13.3537C14.8121 12.6677 15.5401 12.2617 16.3941 12.2617Z"
            fill="#FAFAFA"
          />
          <path
            d="M18.42 19.7377C17.664 19.7377 17.062 19.1357 17.062 18.3797C17.062 17.6377 17.664 17.0217 18.42 17.0217C19.162 17.0217 19.778 17.6377 19.778 18.3797C19.778 19.1357 19.162 19.7377 18.42 19.7377Z"
            fill="#FAFAFA"
          />
        </svg>

        <h2>roomey.</h2>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
