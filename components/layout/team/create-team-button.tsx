"use client";

import React from "react";
import { TeamMembersByCompany } from "@/types";
import { User } from "@prisma/client";
import { PlusCircle } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type CreateTeamButtonProps = {
  title: string;
  teams?: TeamMembersByCompany[];
  users?: any[];
};
export default function CreateTeamButton({
  title,
  teams,
  users,
}: CreateTeamButtonProps) {
  const { onOpen } = useModal();

  return (
    <Button onClick={() => onOpen("createTeam")} className="gap-2" size="sm">
      <PlusCircle />
      <Label>{title}</Label>
    </Button>
  );
}
