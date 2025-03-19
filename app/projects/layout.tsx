"use client";

import React from "react";
import ClientAnimation from "@/components/ClientAnimation";
import { getPageAnimations } from "@/lib/contentful";

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { projectPageAnimation } = await getPageAnimations();

    return (
        <>
            {children}
            <ClientAnimation animationUrl={projectPageAnimation.url} />
        </>
    );
}
