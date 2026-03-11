import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar";

const RootDashboradLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-dvh overflow-hidden">
            {/* Dashboard sidebar */}
            <DashboardSidebar />

            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Dashboard Navbar */}
                <DashboardNavbar />

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
                    <div>{children}</div>
                </main>
            </div>
        </div>
    );
};

export default RootDashboradLayout;
