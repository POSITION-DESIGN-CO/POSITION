import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "@/components/Navigation/NavigationMenu";
import { Footer } from "@/components/Navigation/Footer";
import { PageTransitionProvider } from "@/components/PageTransition";
import { FirstVisitVideo } from "@/components/Animations/FirstVisitVideo";
import { StoreInitializer } from "@/components/StoreInitializer";
import {
    getPageAnimations,
    getProjects,
    getUniqueCategories,
} from "@/lib/contentful";
import { NavigationMenuRefProvider } from "@/lib/useNavigationMenuRef";
import { getAbout } from "@/lib/contentful";

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
    const { contact } = await getAbout();
    const { items: allProjects } = await getProjects();
    const { loadingAnimationWebm, loadingAnimationMov } =
        await getPageAnimations();

    return (
        <html lang="en">
            <StoreInitializer projects={allProjects} categories={categories} />
            <FirstVisitVideo
                webmUrl={loadingAnimationWebm?.url}
                movUrl={loadingAnimationMov?.url}
            />
            <body
                className={cn(
                    inter.className,
                    "bg-[#F8F8F5] text-[#3B3B3B] pt-4 sm:pt-0 font-grotesk"
                )}
            >
                <NavigationMenuRefProvider>
                    <NavigationMenu contact={contact} />
                    <PageTransitionProvider>{children}</PageTransitionProvider>
                </NavigationMenuRefProvider>
                <Footer />
            </body>
        </html>
    );
}
