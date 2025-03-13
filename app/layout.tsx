import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "@/components/navigation-menu";
import { Footer } from "@/components/Footer";
import { getUniqueCategories } from "@/lib/contentful";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "POSITION | Architecture Studio",
    description:
        "An architectural practice that explores ideas across disciplines and scales",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const categories = (await getUniqueCategories()) as string[];

    return (
        <html lang="en">
            {/* <body className={cn(inter.className, "bg-[#F8F8F5]")}> */}
            <body className={cn(inter.className, "bg-white")}>
                {/* <NavigationMenu categories={categories} /> */}
                <NavigationMenu />
                {children}
                <Footer />
            </body>
        </html>
    );
}
