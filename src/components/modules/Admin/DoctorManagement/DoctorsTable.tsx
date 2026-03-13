"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getDoctors } from "@/services/doctor.services";
import { ApiResponse } from "@/types/api.types";
import { IDoctor } from "@/types/doctor.types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

const DoctorsTable = () => {
    const doctorColumns = useMemo<ColumnDef<IDoctor>[]>(
        () => [
            {
                accessorKey: "id",
                header: "ID",
                cell: ({ row }) => (
                    <span className="font-medium text-slate-500">#{row.original.id}</span>
                ),
            },
            {
                accessorKey: "name",
                header: "Doctor",
                cell: ({ row }) => {
                    const name = row.original.name || "Unknown Doctor";

                    const initials =
                        name
                            .split(" ")
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((word) => word.charAt(0).toUpperCase())
                            .join("") || "DR";

                    return (
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white shadow-sm">
                                {initials}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                    {name}
                                </p>
                                <p className="text-xs text-slate-500">Doctor Profile</p>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "specialtion",
                header: "Specialization",
                cell: ({ row }) => (
                    <span className="text-sm font-medium text-slate-700">
                        {row.original.specialtion}
                    </span>
                ),
            },
            {
                accessorKey: "experience",
                header: "Experience",
                cell: ({ row }) => (
                    <div className="inline-flex rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                        {row.original.experience} Years
                    </div>
                ),
            },
            {
                accessorKey: "rating",
                header: "Rating",
                // cell: ({ row }) => (
                //     <Badge
                //         variant="secondary"
                //         className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-amber-700 hover:bg-amber-50"
                //     >
                //         <Star className="h-3.5 w-3.5 fill-current" />
                //         <span className="font-semibold">{row.original.rating}</span>
                //     </Badge>
                // ),
            },
        ],
        []
    );

    const {
        data: doctorDataResponse,
        isLoading,
        isError,
    } = useQuery<ApiResponse<IDoctor[]>>({
        queryKey: ["doctors"],
        queryFn: getDoctors,
    });

    const doctors = doctorDataResponse?.data ?? [];

    const table = useReactTable({
        data: doctors,
        columns: doctorColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-slate-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="border-slate-200 hover:bg-slate-50"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="h-12 px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={doctorColumns.length}
                                    className="h-24 text-center text-sm text-slate-500"
                                >
                                    Loading doctors...
                                </TableCell>
                            </TableRow>
                        ) : isError ? (
                            <TableRow>
                                <TableCell
                                    colSpan={doctorColumns.length}
                                    className="h-24 text-center text-sm text-red-500"
                                >
                                    Failed to load doctor data.
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="border-slate-200 transition-colors hover:bg-slate-50/80"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="px-4 py-4 align-middle text-sm text-slate-700"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={doctorColumns.length}
                                    className="h-24 text-center text-sm text-slate-500"
                                >
                                    No doctors found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DoctorsTable;
