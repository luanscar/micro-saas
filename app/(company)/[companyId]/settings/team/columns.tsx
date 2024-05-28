"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTeam } from "@/actions/team";
import { TeamWithCompanyWithUsers } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";
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
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

export const columns: ColumnDef<TeamWithCompanyWithUsers>[] = [
  {
    accessorKey: "teamName",
    header: "Teams",
    cell: ({ row }) => (
      <div className=" font-medium">{row.getValue("teamName")}</div>
    ),
  },
  {
    accessorKey: "users",
    header: "Membros",
    cell: ({ row }) => {
      const users = row.original?.companies?.users;
      return (
        <div className=" flex items-start">
          {users?.length ? (
            users.map((user) =>
              user.image ? (
                <Avatar key={user.id} className="size-6">
                  <AvatarImage src={user.image as string} />
                </Avatar>
              ) : (
                <Avatar key={user.id} className="size-6">
                  <AvatarFallback>{user.name?.substring(1, -1)}</AvatarFallback>
                </Avatar>
              ),
            )
          ) : (
            <span>No image</span>
          )}
        </div>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;

      return <CellActions rowData={rowData} />;
    },
  },
];

interface CellActionsProps {
  rowData: TeamWithCompanyWithUsers;
}

const CellActions: React.FC<CellActionsProps> = ({ rowData }) => {
  const { data, onOpen } = useModal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = rowData?.companies?.users.find((user) => user.id);
  if (!rowData) return;
  if (!rowData.companies) return;

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => onOpen("editTeam", { team: rowData })}
          >
            <Edit size={15} /> Editar equipe
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {user?.role !== "ADMIN" && (
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="flex gap-2" onClick={() => {}}>
                <Trash size={15} /> Apagar Equipe
              </DropdownMenuItem>
            </AlertDialogTrigger>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This action cannot be undone. This will permanently delete the team
            and related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            className="bg-destructive text-secondary-foreground hover:bg-destructive"
            onClick={async () => {
              setLoading(true);
              await deleteTeam(rowData.id);
              toast({
                title: "Deleted Team",
                description:
                  "The user has been deleted from this agency they no longer have access to the agency",
              });
              setLoading(false);
              router.refresh();
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
