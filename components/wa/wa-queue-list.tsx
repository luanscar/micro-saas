"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteQueue } from "@/actions/company";
import { useSheetStoreTest } from "@/stores/use-sheet-store-test";
import { useQueueList } from "@/stores/use-user-list";
import { CompanyQueueWithUsers } from "@/types";
import { Trash2, User } from "lucide-react";

import { prisma } from "@/lib/db";
import { useSheet } from "@/hooks/use-sheet-store";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import WaDeleteQueueButton from "./wa-delete-queue-btn";

type WaQueueListProps = {
  company?: CompanyQueueWithUsers;
};

export default function WaQueueList({ company }: WaQueueListProps) {
  const { queueList } = useQueueList();
  const { openSheet, sheets } = useSheetStoreTest();

  return (
    <ScrollArea className="h-screen">
      <div className="">
        {queueList?.length ? (
          queueList.map((queue, i) => (
            <div className="group flex flex-row items-center" key={queue.id}>
              <div
                onClick={() => openSheet("upsertQueue", "left", { queue })}
                className="  mt-1 flex h-[8vh] w-full flex-1 cursor-pointer flex-row items-center justify-start gap-4 rounded-none p-4 hover:bg-secondary"
                key={i}
              >
                <User className="size-12 rounded-full bg-secondary p-2" />
                <span>{queue.queueName}</span>
              </div>
              <div className="absolute right-5  hidden group-hover:flex">
                <WaDeleteQueueButton queueId={queue.id} />
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-[50vh] w-full items-center justify-center text-muted-foreground">
            <span>Crie uma fila</span>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
