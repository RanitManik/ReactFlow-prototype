"use client";

import { DnDProvider } from "./context/drag-and-drop";

export function Providers({ children }) {
    return <DnDProvider>{children}</DnDProvider>;
}
