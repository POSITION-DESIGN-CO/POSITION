"use client";

import getWindowDimensions from "@/lib/helper";
import { useEffect, useRef, useState } from "react";

interface ClientAnimationProps {
    webmUrl?: string;
    movUrl?: string;
    grid?: boolean;
    hasNoGradient?: boolean;
}

export default function ClientAnimation({
    webmUrl,
    movUrl,
    grid,
    hasNoGradient,
}: ClientAnimationProps) {
    if (!webmUrl && !movUrl) return null;
    const { windowWidth } = getWindowDimensions();
    const [isEnded, setIsEnded] = useState(false);
    const [hideContainer, setHideContainer] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAnimation(true);
            videoRef.current?.play().catch((e) => {
                console.error(e);
            });
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleIsEnded = () => {
        setIsEnded(true);
        setTimeout(() => {
            setHideContainer(true);
        }, 4000);
    };

    return (
        <div
            className={`fixed bottom-0 left-0 ${
                (hasNoGradient && windowWidth < 639) || !hasNoGradient
                    ? "w-screen sm:h-48 h-48 z-50 bg-gradient-to-t from-[#F8F8F5] via-[#F8F8F5]/60 to-transparent transition-opacity duration-1000 ease-in-out"
                    : ""
            } ${showAnimation && !isEnded ? "opacity-100" : "opacity-0"}`}
            style={{
                opacity: showAnimation && !isEnded ? 1 : 0,
                display: hideContainer ? "none" : "block",
            }}
        >
            <video
                ref={videoRef}
                onEnded={handleIsEnded}
                width={windowWidth > 639 ? "100" : "100"}
                height={windowWidth > 639 ? "100" : "100"}
                style={{
                    position: "fixed",
                    bottom: grid ? "20px" : "0px",
                    left: windowWidth > 639 ? "20px" : "auto",
                    right: windowWidth <= 639 ? "20px" : "auto",
                    zIndex: 1000,
                    pointerEvents: "none",
                }}
                playsInline
                muted
                controlsList="nodownload nofullscreen noremoteplayback"
            >
                {movUrl && (
                    <source src={movUrl} type='video/mp4; codecs="hvc1"' />
                )}
                {webmUrl && <source src={webmUrl} type="video/webm" />}
            </video>
        </div>
    );
}
