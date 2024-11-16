"use client";

import * as React from "react";
import { ReactFlowProvider } from "@xyflow/react";

export function Providers({ children }) {
    return <ReactFlowProvider>{children}</ReactFlowProvider>;
}
