"use client";

import { useEffect, useState } from "react";

export const FirstVisitVideo = ({
    webmUrl,
    movUrl,
}: {
    movUrl?: string;
    webmUrl?: string;
}) => {
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hasVisited = sessionStorage.getItem("visited");
            if (!hasVisited) {
                setShouldShow(true);
            } else {
                setShouldShow(false);
            }
        }
    }, []);

    const handleClose = () => {
        sessionStorage.setItem("visited", "true");
        setShouldShow(false);
    };

    if (!shouldShow) return null;


    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-[999999] w-screen h-screen bg-white transition-opacity duration-700 ${
                shouldShow ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <video
                onEnded={handleClose}
                playsInline
                muted
                autoPlay
                style={{
                    position: "fixed",
                    zIndex: 1000,
                    pointerEvents: "none",
                }}
                className="max-w-[450px] md:max-w-[600px] bg-white -translate-y-10 sm:-translate-y-0"
                controlsList="nodownload nofullscreen noremoteplayback"
            >
                {movUrl && (
                    <source src={movUrl} type='video/mp4; codecs="hvc1"' />
                )}
                {webmUrl && <source src={webmUrl} type="video/webm" />}
            </video>
        </div>
    );
};
