import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
    title: "Reactflow Prototype",
    description: "Code by Ranit Manik",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Providers>
                <body>{children}</body>
            </Providers>
        </html>
    );
}
