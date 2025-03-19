"use client";

import React from "react";
import ClientAnimation from "@/components/ClientAnimation";
import { getPageAnimations } from "@/lib/contentful";

export default async function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { aboutPageAnimation } = await getPageAnimations();

    return (
        <>
            {children}
            <ClientAnimation animationUrl={aboutPageAnimation.url} />
        </>
    );
}
