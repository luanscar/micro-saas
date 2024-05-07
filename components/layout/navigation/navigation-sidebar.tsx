import React from "react";
import { UserWithCompanyWithPermissions } from "@/types";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Navigation } from ".";

type NavigationSidebarProps = {
  data: UserWithCompanyWithPermissions;
};

const NavigationSidebar = ({ data }: NavigationSidebarProps) => {
  const companyName = data.company?.name;
  const sidebarOptions = data.company?.sidebarOptions || [];

  return (
    <Navigation.Root>
      <Navigation.Header>
        <Navigation.HeaderTitle>{companyName}</Navigation.HeaderTitle>
      </Navigation.Header>
      <Navigation.NavMain>
        <Navigation.NavHeader>Settings</Navigation.NavHeader>
      </Navigation.NavMain>
      <Navigation.Footer user={data} />
    </Navigation.Root>
  );
};

export default NavigationSidebar;
