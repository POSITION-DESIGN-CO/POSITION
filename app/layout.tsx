import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "@/components/navigation-menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "POSITION | Architecture Studio",
    description:
        "An architectural practice that explores ideas across disciplines and scales",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "bg-[#fbf7f7]")}>
                <NavigationMenu />
                {children}
            </body>
        </html>
    );
}
