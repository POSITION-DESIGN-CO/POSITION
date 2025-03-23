"use client";

import getWindowDimensions from "@/lib/helper";
import { useState } from "react";
interface ClientAnimationProps {
    webmUrl?: string;
    movUrl?: string;
    grid?: boolean;
}

export default function ClientAnimation({
    webmUrl,
    movUrl,
    grid,
}: ClientAnimationProps) {
    if (!webmUrl && !movUrl) return null;
    const { windowWidth } = getWindowDimensions();
    const [isEnded, setIsEnded] = useState(false);
    const [hideContainer, setHideContainer] = useState(false);

    const handleIsEnded = () => {
        setIsEnded(true);
        setTimeout(() => {
            setHideContainer(true);
        }, 1000);
    };

    return (
        <div
            className="fixed bottom-0 left-0 w-screen sm:h-48 h-48 z-50 bg-gradient-to-t from-[#F8F8F5] via-[#F8F8F5]/60 to-transparent transition-all duration-1000 ease-in-out"
            style={{
                opacity: isEnded ? 0 : 1,
                display: hideContainer ? "none" : "block",
            }}
        >
            <video
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
}
