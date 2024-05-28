"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { deleteQueue } from "@/actions/company";
import { Trash2 } from "lucide-react";

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

type WaDeleteQueueButtonProps = {
  queueId: string;
};

export default function WaDeleteQueueButton({
  queueId,
}: WaDeleteQueueButtonProps) {
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"} variant={"ghost"} className="size-10  ">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are your absolutely sure
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This action cannot be undon. This will delete the subaccount and all
            data related to the subaccount.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteQueue(queueId);
              router.refresh();
            }}
            className="text-secondary-foreground hover:bg-destructive "
          >
            Apagar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
