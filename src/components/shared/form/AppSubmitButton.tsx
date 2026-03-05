import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type AppSubmitButtonProps = {
    isPending: boolean;
    children: React.ReactNode;
    pendingLabel?: string;
    className?: string;
    disabled?: boolean;
};

const AppSubmitButton = ({
    isPending,
    children,
    pendingLabel,
    className,
    disabled,
}: AppSubmitButtonProps) => {
    const isDisabled = disabled || isPending;

    return (
        <Button type="submit" disabled={isDisabled} className={cn("w-full", className)}>
            {isPending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    {pendingLabel ? pendingLabel : children}
                </>
            ) : (
                children
            )}
        </Button>
    );
};

export default AppSubmitButton;
