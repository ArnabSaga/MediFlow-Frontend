import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { createElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface StatsCardProps {
    title: string;
    value: string | number;
    iconName: string;
    description?: string;
    className?: string;
}

const StatsCard = ({ title, value, iconName, description, className }: StatsCardProps) => {
    const Icon = getIconComponent(iconName);

    return (
        <Card
            className={cn(
                "group cursor-pointer rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md",
                className
            )}
        >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div className="space-y-1">
                    <CardTitle className="text-sm font-medium tracking-tight text-slate-500">
                        {title}
                    </CardTitle>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-primary shadow-sm transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/5">
                    {createElement(Icon, { className: "h-5 w-5" })}
                </div>
            </CardHeader>

            <CardContent className="space-y-2 pt-0">
                <div className="text-3xl font-bold tracking-tight text-slate-900">{value}</div>

                {description && (
                    <p className="text-xs font-medium leading-5 text-slate-500">{description}</p>
                )}
            </CardContent>
        </Card>
    );
};

export default StatsCard;
