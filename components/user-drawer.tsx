"use client";

import React from "react";
import { useUserStore } from "@/providers/user-store-provider";
import { ChevronRight, PlusCircle } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Drawer, DrawerContent,
  DrawerDescription, DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";

import { Navbar } from "./layout/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { mobileLinks } from "@/lib/constants";
import { ModeToggle } from "./layout/mode-toggle";
import { Separator } from "./ui/separator";
import { useModal } from "@/hooks/use-modal-store";

export function UserDrawer() {
  const [open, setOpen] = React.useState(false);
  console.log(open);
  const data = useUserStore().getState().data;
  if (!data) return;

  const { type, onOpen, isOpen, onClose } = useModal()

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
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex flex-row items-start justify-between ">
            <div className="flex flex-col items-start">
              <DrawerTitle>{data.name}</DrawerTitle>
              <DrawerDescription>{data.email}</DrawerDescription>
            </div>
            <ModeToggle />

          </DrawerHeader>
          <Navbar.Root className="h-full w-full">
            <Navbar.Nav className="flex w-full flex-col">
              {mobileLinks?.map((item) => {
                return (
                  <Navbar.Item key={item.id} className="w-full ">
                    <Navbar.Link
                      onClick={() => setOpen(false)}
                      className="group flex w-full  justify-between rounded-md p-2 px-4 underline-offset-4  hover:underline"
                      href={`/${data.companyId}/${item.href}`}
                    >
                      <Navbar.Label>{item.name}</Navbar.Label>
                      <Navbar.Icon
                        className="h-8 w-8 rounded-full p-2 group-hover:bg-primary-foreground/20"
                        icon={ChevronRight}
                      />
                    </Navbar.Link>
                  </Navbar.Item>
                );
              })}
              <Navbar.Item className="space-y-4 ">
                <Separator />
                <Button onClick={() => onOpen("createUser")} variant="ghost" className="group flex w-full  justify-between rounded-md p-2 px-4 underline-offset-4  hover:underline">
                  <div className="flex flex-row items-center  gap-2"><PlusCircle />
                    <Navbar.Label>Convidar membro</Navbar.Label></div>
                  <Navbar.Icon icon={ChevronRight} className="h-8 w-8 rounded-full p-2 group-hover:bg-primary-foreground/20" />
                </Button>
                <Separator />

              </Navbar.Item>
              <Navbar.Item className="w-full  mb-4">
                <Button
                  variant="link"
                  className="group flex w-full  justify-between rounded-md p-2 px-4 underline-offset-4  hover:underline"
                  onClick={() => signOut()}
                >
                  <Navbar.Label>Sair</Navbar.Label>
                  <Navbar.Icon
                    className="h-8 w-8 rounded-full p-2 group-hover:bg-primary-foreground/20"
                    icon={ChevronRight}
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
