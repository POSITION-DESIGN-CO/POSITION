"use client";

import getWindowDimensions from "@/lib/helper";
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

    return (
        <video
            width="100"
            height="100"
            style={{
                position: "fixed",
                bottom: grid ? "30px" : "10px",
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
            {movUrl && <source src={movUrl} type='video/mp4; codecs="hvc1"' />}
            {webmUrl && <source src={webmUrl} type="video/webm" />}
        </video>
    );
}
