"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.types";
import { UserInfo } from "@/types/user.type";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarContentProps {
    userInfo: UserInfo;
    navItems: NavSection[];
    dashboardHome: string;
}

const DashboardSidebarContent = ({
    userInfo,
    navItems,
    dashboardHome,
}: DashboardSidebarContentProps) => {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex h-screen w-[272px] min-h-0 flex-col border-r border-border/60 bg-white">
            {/* Brand */}
            <div className="border-b border-border/60 px-5 py-4 shrink-0">
                <Link
                    href={dashboardHome}
                    className="flex items-center gap-3 rounded-xl transition-all hover:opacity-90"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border bg-slate-50 shadow-sm">
                        <Image
                            src="/icons/MediFlow-logo.png"
                            alt="MediFlow logo"
                            width={28}
                            height={28}
                            className="h-12 w-12 object-contain"
                        />
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-[24px] leading-none font-extrabold tracking-tight text-slate-900">
                            MediFlow
                        </h2>
                        <p className="mt-1 text-xs font-medium text-slate-500">
                            Healthcare Dashboard
                        </p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                    <div className="px-4 py-5">
                        <nav className="space-y-6">
                            {navItems.map((section, sectionId) => (
                                <div key={sectionId} className="space-y-2.5">
                                    {section.title && (
                                        <div className="px-2">
                                            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                                {section.title}
                                            </h4>
                                        </div>
                                    )}

                                    <div className="space-y-1.5">
                                        {section.items.map((item, itemId) => {
                                            const isActive =
                                                pathname === item.href ||
                                                pathname.startsWith(`${item.href}/`);

                                            const Icon = getIconComponent(item.icon);

                                            return (
                                                <Link
                                                    key={itemId}
                                                    href={item.href}
                                                    className={cn(
                                                        "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-200",
                                                        isActive
                                                            ? "bg-slate-900 text-white shadow-[0_10px_30px_rgba(15,23,42,0.15)]"
                                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            "absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full transition-all",
                                                            isActive
                                                                ? "bg-cyan-400 opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />

                                                    <div
                                                        className={cn(
                                                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all",
                                                            isActive
                                                                ? "border-white/10 bg-white/10 text-white"
                                                                : "border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300 group-hover:bg-white group-hover:text-slate-800"
                                                        )}
                                                    >
                                                        <Icon className="h-4 w-4" />
                                                    </div>

                                                    <span className="truncate text-sm font-semibold">
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </nav>
                    </div>
                </ScrollArea>
            </div>

            {/* User profile */}
            <div className="border-t border-border/60 p-4 shrink-0">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                            {userInfo.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-900">
                                {userInfo.name}
                            </p>
                            <p className="truncate text-xs text-slate-500">{userInfo.email}</p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-700">
                                {userInfo.role.replaceAll("_", " ")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default DashboardSidebarContent;
