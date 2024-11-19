import React from "react";
import { cn } from "@/lib/utils";

export const BaseNode = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { selected?: boolean }
>(({ className, selected, ...props }, ref) => (
    <div ref={ref} className={cn("p-5", className)} {...props} />
));
BaseNode.displayName = "BaseNode";
