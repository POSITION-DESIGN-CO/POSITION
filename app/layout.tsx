import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "@/components/navigation-menu";
import { Footer } from "@/components/Footer";
import { PageTransitionProvider } from "@/components/page-transition";
import { FirstVisitVideo } from "@/components/FirstVisitVideo";
import { StoreInitializer } from "@/components/store-initializer";
import { getProjects, getUniqueCategories } from "@/lib/contentful";

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
    const categories = await getUniqueCategories();
    const { items: allProjects } = await getProjects();
    return (
        <html lang="en">
            {/* <body className={cn(inter.className, "bg-[#F8F8F5]")}> */}
            <StoreInitializer projects={allProjects} categories={categories} />
            <body className={cn(inter.className, "bg-white")}>
                <FirstVisitVideo />
                <NavigationMenu />
                <PageTransitionProvider>{children}</PageTransitionProvider>
                <Footer />
            </body>
        </html>
    );
}
