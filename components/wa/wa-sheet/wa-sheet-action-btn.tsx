import React, { ElementType } from "react";
import { UserPlus2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type WaSheetActionButtonProps = {
  onClick: () => void;
  title: string;
  icon: ElementType;
};

export default function WaSheetActionButton({
  onClick,
  title,
  icon: Icon,
}: WaSheetActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="mt-1 flex h-[8vh]  w-full flex-1 items-center justify-start gap-4 rounded-none hover:bg-secondary"
      variant="ghost"
    >
      <Icon className="flex size-12 shrink-0  rounded-full bg-emerald-500 p-2" />
      <Label>{title}</Label>
    </Button>
  );
}
