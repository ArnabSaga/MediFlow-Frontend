import { BarChartData } from "@/types/dashboard.types";
import { format, isValid, parseISO } from "date-fns";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface AppointmentBarChartProps {
    data: BarChartData[];
}

const formatMonthLabel = (month: string | Date) => {
    const parsedDate = typeof month === "string" ? parseISO(month) : month;
    return isValid(parsedDate) ? format(parsedDate, "MMM yyyy") : "Invalid Date";
};

const AppointmentBarChart = ({ data }: AppointmentBarChartProps) => {
    const title = "Appointment Trends";
    const description = "Monthly appointment statistics";

    if (!data || !Array.isArray(data)) {
        return (
            <Card className="col-span-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-slate-900">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-500">
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex h-[350px] items-center justify-center">
                    <p className="text-sm font-medium text-slate-500">
                        Invalid data provided for the chart.
                    </p>
                </CardContent>
            </Card>
        );
    }

    const formattedData = data.map((item) => ({
        month: formatMonthLabel(item.month),
        appointments: Number(item.count),
    }));

    if (!formattedData.length || formattedData.every((item) => item.appointments === 0)) {
        return (
            <Card className="col-span-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-slate-900">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-500">
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex h-[350px] items-center justify-center">
                    <p className="text-sm font-medium text-slate-500">
                        No appointment data available.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="col-span-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-900">{title}</CardTitle>
                <CardDescription className="text-sm text-slate-500">{description}</CardDescription>
            </CardHeader>

            <CardContent className="pt-2">
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={formattedData}
                            margin={{ top: 12, right: 12, left: -8, bottom: 8 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#e2e8f0"
                            />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12, fill: "#64748b" }}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                                tick={{ fontSize: 12, fill: "#64748b" }}
                            />

                            <Tooltip
                                cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                                    backgroundColor: "#ffffff",
                                }}
                            />

                            <Legend
                                verticalAlign="top"
                                align="right"
                                iconType="circle"
                                wrapperStyle={{
                                    paddingBottom: "12px",
                                    fontSize: "12px",
                                }}
                            />

                            <Bar
                                dataKey="appointments"
                                fill="oklch(0.646 0.222 41.116)"
                                radius={[8, 8, 0, 0]}
                                maxBarSize={56}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default AppointmentBarChart;
