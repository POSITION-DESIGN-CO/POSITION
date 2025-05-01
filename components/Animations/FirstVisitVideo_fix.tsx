"use client";

import { useEffect, useRef, useState } from "react";

export const FirstVisitVideo = ({
    webmUrl,
    movUrl,
}: {
    movUrl?: string;
    webmUrl?: string;
}) => {
    const [shouldShow, setShouldShow] = useState(false);
    const [hideVideo, setHideVideo] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [hasTapped, setHasTapped] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hasVisited = sessionStorage.getItem("visited");
            const isTouchDevice =
                "ontouchstart" in window || navigator.maxTouchPoints > 0;

            if (!hasVisited) {
                setShouldShow(true);
                setHideVideo(true);
            }

            setIsMobile(isTouchDevice);
        }
    }, []);

    const handleClose = () => {
        sessionStorage.setItem("visited", "true");
        setShouldShow(false);
        setTimeout(() => setHideVideo(false), 700);
    };

    const handleUserInteraction = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                console.error("Error playing video");
            });
        }
        setHasTapped(true);
    };

    if (!hideVideo) return null;

    const shouldShowTapButton = isMobile && !hasTapped;

    return (
        <div
            className="fixed inset-0 top-0 left-0 flex items-center justify-center z-[999999] w-screen h-screen transition-all duration-700 ease-in-out bg-white font-grotesk"
            style={{ opacity: shouldShow ? 1 : 0 }}
        >
            {shouldShowTapButton && (
                <button
                    className="absolute z-[1001] -translate-y-10 text-sm bg-white text-black border-black border-[1px] px-6 py-3 rounded-lg"
                    onClick={handleUserInteraction}
                >
                    Tap to Begin
                </button>
            )}

            <video
                ref={videoRef}
                onEnded={handleClose}
                style={{
                    position: "fixed",
                    zIndex: 1000,
                    pointerEvents: "none",
                }}
                className="max-w-[450px] md:max-w-[600px] bg-white -translate-y-10 sm:-translate-y-0"
                playsInline
                muted
                autoPlay={!isMobile}
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
