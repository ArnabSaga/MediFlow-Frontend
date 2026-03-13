import AdminDashboardContent from "@/components/modules/Dashboard/AdminDashboardContent";
import { getDashboardData } from "@/services/dashboard.services";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

const AdminDashboardPage = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["admin-dashboard-data"],
        queryFn: getDashboardData,
        staleTime: 30 * 1000, //* 30 seconds - data stays fresh if this data is accessed again within 30 seconds, it will use the
        gcTime: 5 * 60 * 1000 //* 5 minutes - data is garbage collected after 5 minutes of inactivity
    });

    // const dashboardData = queryClient.getQueryData([
    //     "admin-dashboard-data",
    // ]) as ApiResponse<IAdminDashboardData>;

    // console.log(dashboardData, "Dashboard Data from Page Component");

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AdminDashboardContent />
        </HydrationBoundary>
    );
};

export default AdminDashboardPage;
