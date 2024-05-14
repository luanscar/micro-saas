"use client";

import { UsersWithCompanyWithPermissions } from "@/types";
import { Company, Permissions } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";
import { Badge } from "@/components/ui/badge";
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

export type Members = {
  name?: string | undefined;
  email?: string;
  role: string;
  company: Company | null;
  permissions: Permissions[];
};

export const columns: ColumnDef<UsersWithCompanyWithPermissions>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="truncate capitalize ">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge className="capitalize">{row.getValue("role")}</Badge>
    ),
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
      const company = row.original.company;
      const ownedAccounts = row.original.permissions.filter(
        (per) => per.access,
      );
      return (
        <div className="flex flex-col items-start">
          <div className="flex flex-col gap-2">
            {ownedAccounts?.length ? (
              ownedAccounts.map((i) => (
                <Badge
                  key={i.id}
                  className="w-fit whitespace-nowrap bg-slate-600"
                >
                  Access on - {company?.name}
                </Badge>
              ))
            ) : (
              <div className="text-muted-foreground">No Access Yet</div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const member = row.original;
      const { onOpen } = useModal();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="flex gap-2"
              onClick={() => onOpen("upsertUser", { user: member })}
            >
              <Edit size={15} /> Edit User
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(member.email)}
            >
              Copy User E-mail
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
