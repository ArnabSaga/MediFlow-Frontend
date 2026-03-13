import DoctorsList from "@/components/modules/Consultation/DoctorsList";
import { getDoctors } from "@/services/doctor.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const ConsultationPage = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["doctors"],
        queryFn: getDoctors,
        staleTime: 1000 * 60 * 60, //* 1 hour - data stays fresh if this data is accessed again within 1 hour, it will use the
        gcTime: 1000 * 60 * 60 * 6, //* 6 hours - data is garbage collected after 6 hours of inactivity
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <DoctorsList />
        </HydrationBoundary>
    );
};

export default ConsultationPage;
