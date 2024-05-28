"use client";

import { useSheetStoreTest } from "@/stores/use-sheet-store-test";
import { User } from "@prisma/client";
import { ArrowLeft, User2, User2Icon } from "lucide-react";

import { useSheet } from "@/hooks/use-sheet-store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import WaUserList from "../wa-user/wa-user-list";
import WaSheetActionButton from "./wa-sheet-action-btn";

export default function WaSheetUsers() {
  const { openSheet, sheets, closeSheet } = useSheetStoreTest();

  return (
    <Sheet
      open={sheets.userSheet.isOpen}
      onOpenChange={() => closeSheet("userSheet")}
    >
      <SheetContent side="left" className="w-[448px] bg-background !p-0">
        <SheetHeader className="!m-0 flex h-[16vh] flex-row items-end gap-4 bg-secondary p-4 ">
          <ArrowLeft
            onClick={() => closeSheet("userSheet")}
            className="h-7 cursor-pointer"
          />
          <SheetTitle>Usuários</SheetTitle>
        </SheetHeader>
        <WaSheetActionButton
          icon={User2Icon}
          title="Criar usuário"
          onClick={() => openSheet("upsertUser", "left")}
        />
        <WaUserList />
      </SheetContent>
    </Sheet>
  );
}
