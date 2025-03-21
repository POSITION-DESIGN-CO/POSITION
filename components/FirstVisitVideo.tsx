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
    const [hideVideo, setHideVideo] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hasVisited = localStorage.getItem("visited");

            if (!hasVisited) {
                setShouldShow(true);
                setHideVideo(true);
            }
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem("visited", "true");
        setShouldShow(false);
        setTimeout(() => setHideVideo(false), 700);
    };

    if (!hideVideo) return null;

    return (
        <div
            className="fixed inset-0 top-0 left-0 flex items-center justify-center z-[999999] w-screen h-screen transition-all duration-700 ease-in-out bg-white"
            style={{ opacity: shouldShow ? 1 : 0 }}
        >
            <video
                onEnded={handleClose}
                style={{
                    position: "fixed",
                    zIndex: 1000,
                    pointerEvents: "none",
                }}
                className="max-w-full md:max-w-xl bg-white"
                playsInline
                muted
                autoPlay
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
