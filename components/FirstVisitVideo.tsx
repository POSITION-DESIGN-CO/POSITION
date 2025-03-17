"use client";

import { useEffect, useState } from "react";

export const FirstVisitVideo = () => {
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
            className="fixed inset-0 top-0 left-0 flex items-center justify-center z-[999] w-screen h-screen transition-all duration-700 ease-in-out bg-white"
            style={{ opacity: shouldShow ? 1 : 0 }}
        >
            <video
                autoPlay
                playsInline
                muted
                onEnded={handleClose}
                className="max-w-full w-screen"
            >
                <source src="./position_anim.mp4" type="video/mp4" />
            </video>
        </div>
    );
};
