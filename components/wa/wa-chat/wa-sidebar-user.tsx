"use client";

import React from "react";
import { useSheetStoreTest } from "@/stores/use-sheet-store-test";
import { User } from "@prisma/client";
import { Sidebar } from "lucide-react";

import { useSheet } from "@/hooks/use-sheet-store";

type WaSidebarUserProps = {
  userDetails: User;
};

export default function WaSidebarUser({ userDetails }: WaSidebarUserProps) {
  const { openSheet } = useSheetStoreTest();
  return (
    <div>
      <Sidebar
        onClick={() => openSheet("upsertUser", "right", { user: userDetails })}
      />
    </div>
  );
}
