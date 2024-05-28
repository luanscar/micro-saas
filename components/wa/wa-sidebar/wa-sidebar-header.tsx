"use client";

import React from "react";
import Image from "next/image";
import { useSheetStoreTest } from "@/stores/use-sheet-store-test";
import { CompanyQueueWithUsers } from "@/types";
import { ListChecks, User } from "lucide-react";

import { useSheet } from "@/hooks/use-sheet-store";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import WaSheet from "../wa-sheet/wa-sheet";
import WaSheetQueue from "../wa-sheet/wa-sheet-queue";
import WaUsersSheet from "../wa-sheet/wa-sheet-users";

type WaSidebarHeaderProps = {
  company: CompanyQueueWithUsers;
};

export default function WaSidebarHeader({ company }: WaSidebarHeaderProps) {
  const { openSheet } = useSheetStoreTest();

  return (
    <header className="flex-cow flex h-[8vh] items-center justify-between bg-secondary px-4 py-0">
      <Image
        onClick={() => openSheet("editCompany", "left", { company })}
        className="size-12 cursor-pointer rounded-full"
        width={50}
        height={50}
        src="https://avatar.vercel.sh/personal"
        alt="Logo"
      />
      <div className="flex gap-2">
        {/* <Button
          onClick={() => openSheet("userSheet")}
          variant="ghost"
          className="size-15  rounded-full"
        >
          <User2 className="hover:font-bold hover:text-white" />
        </Button> */}
        <WaSheet icon={User} onClick={() => openSheet("userSheet")} />
        <WaSheet
          icon={ListChecks}
          onClick={() => openSheet("queueSheet", "left", { company })}
        />
      </div>
    </header>
  );
}
