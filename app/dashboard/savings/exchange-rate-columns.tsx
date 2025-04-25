"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowDown, ArrowUp } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SortableHeader = ({ column, label }: any) => (
  <button
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    className="inline-flex items-center gap-1 font-medium hover:underline"
  >
    {label}
    {column.getIsSorted() === "asc" && <ArrowUp className="w-3 h-3" />}
    {column.getIsSorted() === "desc" && <ArrowDown className="w-3 h-3" />}
  </button>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} label="Bank" />,
    enableSorting: true,
    cell: ({ row }) => {
      const icon = row.original.icon;
      const name = row.original.name;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={icon} className="rounded-full" />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "0m",
    header: ({ column }) => <SortableHeader column={column} label="Flexible" />,
    enableSorting: true,
  },
  {
    accessorKey: "1m",
    header: ({ column }) => <SortableHeader column={column} label="1M" />,
    enableSorting: true,
  },
  {
    accessorKey: "3m",
    header: ({ column }) => <SortableHeader column={column} label="3M" />,
    enableSorting: true,
  },
  {
    accessorKey: "6m",
    header: ({ column }) => <SortableHeader column={column} label="6M" />,
    enableSorting: true,
  },
  {
    accessorKey: "12m",
    header: ({ column }) => <SortableHeader column={column} label="12M" />,
    enableSorting: true,
  },
  {
    accessorKey: "18m",
    header: ({ column }) => <SortableHeader column={column} label="18M" />,
    enableSorting: true,
  },
  {
    accessorKey: "24m",
    header: ({ column }) => <SortableHeader column={column} label="24M" />,
    enableSorting: true,
  },
];
