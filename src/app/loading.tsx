import { Skeleton } from "@/components/ui/skeleton";

function StatCardSkeleton() {
    return (
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-12 w-12 rounded-xl" />
            </div>
        </div>
    );
}

function AppointmentRowSkeleton() {
    return (
        <div className="flex items-center justify-between rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>

            <div className="hidden items-center gap-3 md:flex">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-9 w-24 rounded-lg" />
            </div>
        </div>
    );
}

function PatientRowSkeleton() {
    return (
        <div className="flex items-center justify-between rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-40" />
                </div>
            </div>

            <div className="space-y-2 text-right">
                <Skeleton className="h-4 w-20 ml-auto" />
                <Skeleton className="h-3 w-16 ml-auto" />
            </div>
        </div>
    );
}

function ActivityRowSkeleton() {
    return (
        <div className="flex items-start gap-3 rounded-2xl border bg-card p-4 shadow-sm">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
            </div>
        </div>
    );
}

function SectionHeaderSkeleton({ action = true }: { action?: boolean }) {
    return (
        <div className="flex items-center justify-between">
            <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-3 w-24" />
            </div>
            {action && <Skeleton className="h-9 w-24 rounded-lg" />}
        </div>
    );
}

export default function GlobalLoading() {
    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto w-full max-w-7xl space-y-8 p-4 md:p-6 lg:p-8">
                {/* Top Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-3">
                        <Skeleton className="h-9 w-64 md:w-80" />
                        <Skeleton className="h-4 w-48 md:w-64" />
                    </div>

                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-24 rounded-xl" />
                        <Skeleton className="h-10 w-32 rounded-xl" />
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {[1, 2, 3, 4].map((item) => (
                        <StatCardSkeleton key={item} />
                    ))}
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                    {/* Left Content */}
                    <div className="space-y-6 xl:col-span-8">
                        {/* Appointments */}
                        <section className="rounded-3xl border bg-background/60 p-5 md:p-6">
                            <SectionHeaderSkeleton />
                            <div className="mt-5 space-y-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <AppointmentRowSkeleton key={item} />
                                ))}
                            </div>
                        </section>

                        {/* Patients */}
                        <section className="rounded-3xl border bg-background/60 p-5 md:p-6">
                            <SectionHeaderSkeleton />
                            <div className="mt-5 space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <PatientRowSkeleton key={item} />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6 xl:col-span-4">
                        {/* Revenue Card */}
                        <section className="rounded-3xl border bg-background/60 p-5 md:p-6">
                            <SectionHeaderSkeleton action={false} />
                            <div className="mt-6 space-y-5">
                                <div className="space-y-2">
                                    <Skeleton className="h-8 w-32" />
                                    <Skeleton className="h-4 w-24" />
                                </div>

                                <Skeleton className="h-56 w-full rounded-2xl" />

                                <div className="grid grid-cols-3 gap-3">
                                    {[1, 2, 3].map((item) => (
                                        <div
                                            key={item}
                                            className="rounded-2xl border bg-card p-3 shadow-sm"
                                        >
                                            <Skeleton className="h-3 w-16" />
                                            <Skeleton className="mt-3 h-5 w-12" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Recent Activity */}
                        <section className="rounded-3xl border bg-background/60 p-5 md:p-6">
                            <SectionHeaderSkeleton action={false} />
                            <div className="mt-5 space-y-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <ActivityRowSkeleton key={item} />
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
