"use client";

import { useRouter } from "next/navigation";
import { useSheetStore } from "@/stores/use-sheet-store";
import { useSheetStoreTest } from "@/stores/use-sheet-store-test";
import useUserList from "@/stores/use-user-list";
import { ShieldAlertIcon, User, User2 } from "lucide-react";

import { useSheet } from "@/hooks/use-sheet-store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetClose } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function WWaUserList() {
  const { userList } = useUserList();
  const router = useRouter();

  const { closeSheet } = useSheetStoreTest();

  const onUserClick = (companyId: string, userId: string) => {
    router.push(`/${companyId}/chat/${userId}`);
    closeSheet("userSheet");
  };

  return (
    <ScrollArea className="h-screen">
      <div>
        {userList?.length ? (
          userList.map((user, i) => (
            <div
              onClick={() => onUserClick(user.companyId!, user.id)}
              className="mt-1 flex h-[8vh] w-full flex-1 cursor-pointer flex-row items-center justify-start gap-4 rounded-none p-4 hover:bg-secondary"
              key={i}
            >
              {user.image ? (
                <Avatar className="size-12">
                  <AvatarImage src={`${user.image}`} alt={user.name!} />
                </Avatar>
              ) : (
                <User2 className="size-12 rounded-full bg-primary" />
              )}
              <span>{user.name}</span>

              {user.role === "ADMIN" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ShieldAlertIcon fill="red" size={15} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{user.role}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          ))
        ) : (
          <div>a</div>
        )}
      </div>
    </ScrollArea>
  );
}
