import { redirect } from "next/navigation";
import { useSheetStoreTest } from "@/stores/use-sheet-store-test";
import { useQueueList } from "@/stores/use-user-list";
import { ArrowLeft, List, PlusIcon } from "lucide-react";

import { useSheet } from "@/hooks/use-sheet-store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import WaQueueList from "../wa-queue-list";
import WaSheetActionButton from "./wa-sheet-action-btn";

export default function WaSheetQueue() {
  const { openSheet, sheets, closeSheet } = useSheetStoreTest();

  return (
    <Sheet
      open={sheets.queueSheet.isOpen}
      onOpenChange={() => closeSheet("queueSheet")}
    >
      <SheetContent side="left" className="w-[448px] bg-background !p-0">
        <SheetHeader className="!m-0 flex h-[16vh] flex-row items-end gap-4 bg-secondary p-4 ">
          <ArrowLeft
            onClick={() => closeSheet("queueSheet")}
            className="h-7 cursor-pointer"
          />
          <SheetTitle>Filas</SheetTitle>
        </SheetHeader>
        <WaSheetActionButton
          icon={PlusIcon}
          onClick={() => openSheet("upsertQueue", "left")}
          title="Nova fila"
        />
        <WaQueueList />
      </SheetContent>
    </Sheet>
  );
}
