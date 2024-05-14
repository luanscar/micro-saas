"use client";

import { useUserStore } from "@/providers/user-store-provider";
import { UserDetails } from "@/types";

import useMediaQuery from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";
import LoadingAgencyPage from "@/app/(company)/[companyId]/loading";

import DesktopNav from "../layout/desktop-nav";
import { MobileNav } from "../layout/mobile-nav";

type SidebarProps = {
  details: UserDetails;
};

export default function Sidebar({ details }: SidebarProps) {
  const { isMobile } = useMediaQuery();

  if (!details?.company) return null;
  useUserStore().setState({ data: details });

  if (isMobile) return <MobileNav />;

  return (
    <>
      <DesktopNav />
    </>
  );
}
