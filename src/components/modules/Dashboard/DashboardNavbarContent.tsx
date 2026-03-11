"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/types/dashboard.types";
import { UserInfo } from "@/types/user.type";
import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import { Separator } from '@/components/ui/separator';

interface DashboardNavbarProps {
    userInfo: UserInfo;
    navItems: NavSection[];
    dashboardHome: string;
}

const DashboardNavbarContent = ({ userInfo, navItems, dashboardHome }: DashboardNavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkSmallerScreen = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkSmallerScreen();
        window.addEventListener("resize", checkSmallerScreen);

        return () => window.removeEventListener("resize", checkSmallerScreen);
    }, []);

    return (
        <div className="flex h-20 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-5">
            {/* Mobile menu toggle button and Menu */}
            <Sheet open={isOpen && isMobile} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-xl border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                    >
                        <Menu className="h-5 w-5 text-slate-700 " />
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-64 border-r-0 p-0 shadow-none">
                    <DashboardMobileSidebar
                        userInfo={userInfo}
                        navItems={navItems}
                        dashboardHome={dashboardHome}
                    />
                </SheetContent>
            </Sheet>

            {/* Search Component */}
            <div className="flex flex-1 items-center px-4">
                <div className="relative hidden w-full sm:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="h-10 w-full rounded-xl border-slate-200 bg-white pl-10 pr-4 text-sm shadow-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-cyan-500/20"
                    />
                </div>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Right side action */}
            <div className="flex items-center gap-2">
                {/* Notification */}
                <NotificationDropdown />

                {/* User dropdown */}
                <UserDropdown userInfo={userInfo} />
            </div>
        </div>
    );
};

export default DashboardNavbarContent;
