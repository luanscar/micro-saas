import React from "react";
import { MoreHorizontal, MoreVertical } from "lucide-react";

import { Navbar } from "../layout/navbar";
import WaCompanySheet from "./wa-sheet/wa-company-sheet";
import WaSheetQueue from "./wa-sheet/wa-sheet-queue";
import WaUsersSheet from "./wa-sheet/wa-sheet-users";

export default function WaDesktopNav() {
  return (
    <Navbar.Root className="flex flex-col border-r">
      <Navbar.Header className="flex h-[calc(100vh-92vh)] flex-row items-center bg-primary-foreground px-4">
        <Navbar.Brand>
          <Navbar.BrandLogo
            src="https://avatar.vercel.sh/personal"
            alt="Logo"
          />
        </Navbar.Brand>
        <WaCompanySheet />
        <WaUsersSheet />
        <WaSheetQueue />
      </Navbar.Header>
    </Navbar.Root>
  );
}
