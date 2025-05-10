"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const FirstVisitVideo = ({
    webmUrl,
    movUrl,
    onFinish,
}: {
    movUrl?: string;
    webmUrl?: string;
    onFinish?: () => void;
}) => {
    const [hasMounted, setHasMounted] = useState(false);
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        setHasMounted(true);

        if (typeof window !== "undefined") {
            const hasVisited = sessionStorage.getItem("visited");
            if (!hasVisited) {
                setShouldShow(true);
            } else {
                onFinish?.();
            }
        }
    }, []);

    const handleClose = () => {
        sessionStorage.setItem("visited", "true");
        setShouldShow(false);
        onFinish?.();
    };

    if (!hasMounted) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-[999999] w-screen h-screen bg-white transition-opacity duration-1000`}
        >
            <Image
                src="/loading.gif"
                alt="Intro animation"
                className="max-w-[450px] md:max-w-[600px] bg-white -translate-y-10 sm:-translate-y-0"
                onLoad={() => {
                    setTimeout(handleClose, 6500);
                }}
                width={1000}
                height={1000}
                style={{
                    zIndex: 1000,
                    pointerEvents: "none",
                }}
            />
        </div>
    );
};
