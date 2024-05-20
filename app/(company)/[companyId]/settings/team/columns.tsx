"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TeamWithCompanyWithUsers } from "@/types";
import { Company, Team, User } from "@prisma/client";
import { Avatar } from "@radix-ui/react-avatar";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react";

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
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    // accessorFn: (row) => row.teams[0].teamName,
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
            users.map((user) => (
              <Avatar key={user.id}>
                <AvatarImage
                  className="size-6 rounded-full"
                  src={user.image as string}
                />
              </Avatar>
            ))
          ) : (
            <span>{row.original?.companies?.users[0].name}</span>
          )}
        </div>
      );
    },
  },
  { header: "Filas" },

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
                <Trash size={15} /> Remove User
              </DropdownMenuItem>
            </AlertDialogTrigger>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This action cannot be undone. This will permanently delete the user
            and related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            className="bg-destructive hover:bg-destructive"
            onClick={async () => {
              setLoading(true);
              await deleteUser(rowData.id);
              toast({
                title: "Deleted User",
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
      </AlertDialogContent> */}
    </AlertDialog>
  );
};
