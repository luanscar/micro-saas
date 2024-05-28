import React from "react";
import Image from "next/image";
import { Sidebar, TicketCheckIcon } from "lucide-react";

import { prisma } from "@/lib/db";
import WaChatMessages from "@/components/wa/wa-chat/wa-chat-messages";
import WaSidebarUser from "@/components/wa/wa-chat/wa-sidebar-user";

type ChatIdPageProps = {
  params: {
    chatId: string;
  };
};

export default async function ChatIdPage({ params }: ChatIdPageProps) {
  const userDetails = await prisma.user.findUnique({
    where: {
      id: params.chatId,
    },
  });

  return (
    <div className="flex h-full flex-col">
      <header className="flex-cow flex h-[8vh] items-center justify-between bg-secondary px-4 py-0">
        <div className="flex flex-row items-center gap-4">
          <Image
            className="size-12 cursor-pointer rounded-full"
            width={50}
            height={50}
            src="https://avatar.vercel.sh/personal"
            alt="Logo"
          />
          {userDetails?.name}
        </div>
        <div className="flex gap-4">
          <TicketCheckIcon />
          <WaSidebarUser userDetails={userDetails!} />
        </div>
      </header>
    </div>
  );
}
