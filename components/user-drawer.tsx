"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useUserStore } from "@/providers/user-store-provider";
import { UserDetails } from "@/types";
import { User } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Navbar } from "./layout/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserDrawer() {
  const [open, setOpen] = React.useState(false);
  console.log(open);
  const data = useUserStore().getState().data;
  if (!data) return;
  const { sidebarOptions } = data?.company || {};

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className=" cursor-pointer rounded-full p-1 hover:bg-primary-foreground">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://avatar.vercel.sh/personal"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm ">
          <DrawerHeader className="flex flex-col items-start">
            <DrawerTitle>{data.name}</DrawerTitle>
            <DrawerDescription>{data.email}</DrawerDescription>
          </DrawerHeader>
          <Navbar.Root className="h-full w-full">
            <Navbar.Nav className="flex w-full flex-col">
              {sidebarOptions?.map((s) => {
                return (
                  <Navbar.Item key={s.id} className="w-full ">
                    <Navbar.Link
                      onClick={() => setOpen(false)}
                      className="group flex w-full  justify-between rounded-md p-2 px-4 underline-offset-4  hover:underline"
                      href={`${s.link}/`}
                    >
                      <Navbar.Label>{s.name}</Navbar.Label>
                      <Navbar.Icon
                        className="h-8 w-8 rounded-full p-2 group-hover:bg-primary-foreground/20"
                        icon={ArrowRight}
                      />
                    </Navbar.Link>
                  </Navbar.Item>
                );
              })}
              <Navbar.Item className="w-full ">
                <Button
                  variant="link"
                  className="group flex w-full  justify-between rounded-md p-2 px-4 underline-offset-4  hover:underline"
                  onClick={() => signOut()}
                >
                  <Navbar.Label>Sair</Navbar.Label>
                  <Navbar.Icon
                    className="h-8 w-8 rounded-full p-2 group-hover:bg-primary-foreground/20"
                    icon={ArrowRight}
                  />
                </Button>
              </Navbar.Item>
            </Navbar.Nav>
          </Navbar.Root>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
