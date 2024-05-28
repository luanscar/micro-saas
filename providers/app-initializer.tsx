"use client";

import React, { useEffect } from "react";
import useUserList, { useQueueList } from "@/stores/use-user-list";
import { getQueueWithUsers, IgetUserList } from "@/types";
import { Queue, User } from "@prisma/client";

import { useMounted } from "@/hooks/use-mounted";

type AppInitializerProps = {
  userList?: IgetUserList;
  queueList?: getQueueWithUsers;
  children: React.ReactNode;
};
export default function AppInitializer({
  userList,
  queueList,
  children,
}: AppInitializerProps) {
  const mounted = useMounted();
  useEffect(() => {
    useUserList.setState({ userList });
    useQueueList.setState({ queueList });
  });

  if (!mounted) return null;

  return children;
}
