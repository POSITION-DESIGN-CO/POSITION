"use client";

import { useState } from "react";
import { FirstVisitVideo } from "@/components/Animations/FirstVisitVideo_fix_3";
import { NavigationMenu } from "@/components/Navigation/NavigationMenu";
import { PageTransitionProvider } from "@/components/PageTransition";
import { NavigationMenuRefProvider } from "@/lib/useNavigationMenuRef";
import { Footer } from "@/components/Navigation/Footer";

export default function LayoutWithVideoGate({
    children,
    webmUrl,
    movUrl,
    contact,
}: {
    children: React.ReactNode;
    webmUrl?: string;
    movUrl?: string;
    contact: any;
}) {
    const [videoDone, setVideoDone] = useState(false);

    return (
        <>
            {!videoDone && (
                <FirstVisitVideo
                    webmUrl={webmUrl}
                    movUrl={movUrl}
                    onFinish={() => setVideoDone(true)}
                />
            )}

            {videoDone && (
                <NavigationMenuRefProvider>
                    <NavigationMenu contact={contact} />
                    <PageTransitionProvider>{children}</PageTransitionProvider>
                    <Footer contact={contact} />
                </NavigationMenuRefProvider>
            )}
        </>
    );
}
