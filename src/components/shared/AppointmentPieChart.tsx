import { PieChartData } from "@/types/dashboard.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface AppointmentPieChartProps {
    data: PieChartData[];
    title?: string;
    description?: string;
}

const CHART_COLORS = [
    "oklch(0.646 0.222 41.116)",
    "oklch(0.6 0.118 184.704)",
    "oklch(0.398 0.07 227.392)",
    "oklch(0.828 0.189 84.429)",
    "oklch(0.769 0.188 70.08)",
];

const formatStatusLabel = (status: string) => {
    return status
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

const AppointmentPieChart = ({
    data,
    title = "Appointment Overview",
    description = "Distribution of appointments by current status.",
}: AppointmentPieChartProps) => {
    if (!data || !Array.isArray(data)) {
        return (
            <Card className="col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-slate-900">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-500">
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex h-[320px] items-center justify-center">
                    <p className="text-sm font-medium text-slate-500">
                        Invalid data provided for the chart.
                    </p>
                </CardContent>
            </Card>
        );
    }

    const formattedData = data.map((item) => ({
        name: formatStatusLabel(item.status),
        value: Number(item.count),
    }));

    if (!formattedData.length || formattedData.every((item) => item.value === 0)) {
        return (
            <Card className="col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-slate-900">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-500">
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex h-[320px] items-center justify-center">
                    <p className="text-sm font-medium text-slate-500">
                        No appointment data available to display the chart.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-900">{title}</CardTitle>
                <CardDescription className="text-sm text-slate-500">{description}</CardDescription>
            </CardHeader>

            <CardContent className="pt-2">
                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={formattedData}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={90}
                                paddingAngle={3}
                                stroke="white"
                                strokeWidth={3}
                                dataKey="value"
                            >
                                {formattedData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${entry.name}-${index}`}
                                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                                    backgroundColor: "#ffffff",
                                }}
                            />

                            <Legend
                                verticalAlign="bottom"
                                align="center"
                                iconType="circle"
                                wrapperStyle={{
                                    paddingTop: "16px",
                                    fontSize: "12px",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default AppointmentPieChart;
