import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { UserInfo } from "@/types/user.type";
import { Key, LogOut } from "lucide-react";
import Link from "next/link";

interface UserDropdownProps {
    userInfo: UserInfo;
}

const formatRole = (role?: string) => {
    if (!role) return "No Role";

    return role
        .toLowerCase()
        .replaceAll("_", " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
    const userName = userInfo?.name?.trim() || "User";
    const userEmail = userInfo?.email?.trim() || "No email available";
    const userRole = formatRole(userInfo?.role);
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Open user menu"
                    className="h-10 w-10 rounded-full border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus-visible:ring-2 focus-visible:ring-cyan-500/30"
                >
                    <span className="text-sm font-semibold text-slate-800">{userInitial}</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-[calc(100vw-1rem)] max-w-64 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_18px_45px_rgba(15,23,42,0.14)]"
            >
                <DropdownMenuLabel className="p-0">
                    <div className="rounded-xl border border-slate-200 bg-linear-to-b from-slate-50 to-white px-3 py-3">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white shadow-sm">
                                {userInitial}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                    {userName}
                                </p>
                                <p className="truncate text-xs text-slate-500">{userEmail}</p>
                                <p className="mt-1 inline-flex rounded-md border border-cyan-100 bg-cyan-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-700">
                                    {userRole}
                                </p>
                            </div>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="my-1.5 bg-slate-200" />

                <DropdownMenuItem asChild>
                    <Link
                        href="/change-password"
                        className="flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors outline-none focus:bg-slate-100 data-highlighted:bg-slate-100"
                    >
                        <Key className="mr-2 h-4 w-4 text-slate-500" />
                        Change Password
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1.5 bg-slate-200" />

                {/* TODO: Logout functionality will be added later */}
                <DropdownMenuItem asChild>
                    <Link
                        href="/logout"
                        className={cn(
                            "flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors outline-none",
                            "focus:bg-red-50 focus:text-red-700 data-highlighted:bg-red-50 data-highlighted:text-red-700"
                        )}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
