import { ElementType } from "react";
import { useSheetStoreTest } from "@/stores/use-sheet-store-test";

import { cn } from "@/lib/utils";
import { SheetType } from "@/hooks/use-sheet-store";
import { Button } from "@/components/ui/button";

type WaSheetProps = {
  className?: string;
  onClick: () => void;
  icon: ElementType;
};

export default function WaSheet({
  onClick,
  icon: Icon,
  className,
}: WaSheetProps) {
  const { openSheet } = useSheetStoreTest();

  return (
    <Button variant="ghost" className={cn([], className)} onClick={onClick}>
      <Icon />
    </Button>
  );
}
