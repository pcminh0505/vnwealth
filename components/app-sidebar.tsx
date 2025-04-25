"use client";

import {
  IconCurrencyEthereum,
  IconDiamond,
  IconInnerShadowTop,
  IconPigMoney,
  IconSlideshow,
  IconTimeline,
} from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Savings",
      url: "/dashboard/savings",
      icon: IconPigMoney,
    },
    {
      title: "Gold",
      url: "/dashboard/gold",
      icon: IconDiamond,
    },
    {
      title: "Stock",
      url: "/dashboard/stock",
      icon: IconTimeline,
    },
    {
      title: "Crypto",
      url: "/dashboard/crypto",
      icon: IconCurrencyEthereum,
    },
    {
      title: "NFT",
      url: "/dashboard/nft",
      icon: IconSlideshow,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
