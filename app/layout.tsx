import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { cn } from "@/lib/utils";
import { StoreInitializer } from "@/components/StoreInitializer";
import {
    getPageAnimations,
    getProjects,
    getUniqueCategories,
} from "@/lib/contentful";
import { getAbout } from "@/lib/contentful";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import LayoutWithVideoGate from "@/components/LayoutWithVideoGate";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "POSITION",
    description:
        "A design practice that explores ideas across disciplines and scales",

    twitter: {
        card: "summary_large_image",
        title: "POSITION",
        description:
            "A design practice that explores ideas across disciplines and scales",

        images: [
            {
                url: "/og/openGraph.png",
            },
        ],
    },
    openGraph: {
        title: "POSITION",
        description:
            "A design practice that explores ideas across disciplines and scales",

        images: [
            {
                url: "/og/openGraph.png",
            },
        ],
    },
    icons: {
        icon: [
            {
                url: "/favicon/favicon-96x96.png",
                type: "image/png",
                sizes: "96x96",
            },
        ],
        apple: { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
        other: {
            rel: "mask-icon",
            url: "/favicon/safari-pinned-tab.svg",
            color: "#5bbad5",
        },
    },
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
            <body
                className={cn(
                    inter.className,
                    "bg-[#F8F8F5] text-[#3B3B3B] pt-4 sm:pt-0 font-grotesk"
                )}
            >
                <GoogleAnalytics />
                <LayoutWithVideoGate
                    webmUrl={loadingAnimationWebm?.url}
                    movUrl={loadingAnimationMov?.url}
                    contact={contact}
                >
                    {children}
                </LayoutWithVideoGate>
            </body>
        </html>
    );
}
