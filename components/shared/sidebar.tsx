"use client";

import { useUserStore } from "@/providers/user-store-provider";
import { UserDetails } from "@/types";

import useMediaQuery from "@/hooks/use-media-query";

import DesktopNav from "../layout/desktop-nav";
import { MobileNav } from "../layout/mobile-nav";

type SidebarProps = {
  details: UserDetails;
};

export default function Sidebar({ details }: SidebarProps) {
  const isMobile = useMediaQuery().device === "mobile";

  useUserStore().setState({ data: details });

  if (!details?.company) return null;

  return <>{isMobile ? <MobileNav /> : <DesktopNav />}</>;
}
