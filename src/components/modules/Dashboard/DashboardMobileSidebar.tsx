"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SheetClose, SheetTitle } from "@/components/ui/sheet";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.types";
import { UserInfo } from "@/types/user.type";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardMobileSidebarProps {
    userInfo: UserInfo;
    navItems: NavSection[];
    dashboardHome: string;
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

const DashboardMobileSidebar = ({
    userInfo,
    navItems,
    dashboardHome,
}: DashboardMobileSidebarProps) => {
    const pathname = usePathname();

    const isItemActive = (href: string) => {
        if (!href) return false;
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const userName = userInfo?.name?.trim() || "User";
    const userEmail = userInfo?.email?.trim() || "No email available";
    const userRole = formatRole(userInfo?.role);

    const userInitial =
        userName
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word.charAt(0).toUpperCase())
            .join("") || "U";

    return (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-[3px] md:hidden">
            <div className="h-full w-[86vw] max-w-[340px] border-r border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.24)]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <div className="flex h-full min-h-0 flex-col shadow-[inset_-1px_0_0_rgba(148,163,184,0.08)]">
                    {/* Brand */}
                    <div className="shrink-0 border-b border-slate-200 px-4 py-4">
                        <div className="flex items-center justify-between gap-3">
                            <Link
                                href={dashboardHome}
                                className="flex min-w-0 items-center gap-3 rounded-xl transition-opacity hover:opacity-90"
                                aria-label="Go to dashboard home"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                                    <Image
                                        src="/icons/MediFlow-logo.png"
                                        alt="MediFlow logo"
                                        width={28}
                                        height={28}
                                        priority
                                        className="h-7 w-7 object-contain"
                                    />
                                </div>

                                <div className="min-w-0">
                                    <h2 className="truncate text-[18px] font-extrabold leading-none tracking-tight text-slate-900">
                                        MediFlow
                                    </h2>
                                    <p className="mt-1 truncate text-[11px] font-medium text-slate-500">
                                        Healthcare Dashboard
                                    </p>
                                </div>
                            </Link>

                            <SheetClose asChild>
                                <button
                                    type="button"
                                    aria-label="Close sidebar"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-100 hover:text-slate-700 active:scale-[0.98]"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </SheetClose>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="min-h-0 flex-1">
                        <ScrollArea className="h-full">
                            <div className="px-3 py-4 pb-8">
                                <nav className="space-y-4" aria-label="Mobile sidebar navigation">
                                    {navItems.map((section, sectionId) => (
                                        <div
                                            key={section.title || `section-${sectionId}`}
                                            className="space-y-1.5"
                                        >
                                            {section.title && (
                                                <div className="px-2">
                                                    <h4 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                                                        {section.title}
                                                    </h4>
                                                </div>
                                            )}

                                            <div className="space-y-1">
                                                {section.items.map((item, itemIndex) => {
                                                    const isActive = isItemActive(item.href);
                                                    const Icon = getIconComponent(item.icon);

                                                    return (
                                                        <Link
                                                            key={
                                                                item.href ||
                                                                `${sectionId}-${itemIndex}`
                                                            }
                                                            href={item.href}
                                                            aria-current={
                                                                isActive ? "page" : undefined
                                                            }
                                                            className={cn(
                                                                "group relative flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-200",
                                                                isActive
                                                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.99]"
                                                            )}
                                                        >
                                                            <span
                                                                className={cn(
                                                                    "absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full transition-all",
                                                                    isActive
                                                                        ? "bg-cyan-400 opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />

                                                            <div
                                                                className={cn(
                                                                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all",
                                                                    isActive
                                                                        ? "border-white/10 bg-white/10 text-white"
                                                                        : "border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300 group-hover:bg-white group-hover:text-slate-800"
                                                                )}
                                                            >
                                                                <Icon className="h-4 w-4" />
                                                            </div>

                                                            <span className="flex-1 truncate text-sm font-semibold">
                                                                {item.title}
                                                            </span>
                                                        </Link>
                                                    );
                                                })}
                                            </div>

                                            {sectionId < navItems.length - 1 && (
                                                <Separator className="my-3 bg-slate-200/70" />
                                            )}
                                        </div>
                                    ))}
                                </nav>
                            </div>
                        </ScrollArea>
                    </div>

                    {/* User Info */}
                    <div className="shrink-0 border-t border-slate-200 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 shadow-sm">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                                    {userInitial}
                                </div>

                                <div className="min-w-0 flex-1 overflow-hidden">
                                    <p className="truncate text-sm font-semibold text-slate-900">
                                        {userName}
                                    </p>
                                    <p className="truncate text-xs text-slate-500">{userEmail}</p>
                                    <p className="mt-1 inline-flex rounded-md bg-cyan-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-700">
                                        {userRole}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMobileSidebar;
