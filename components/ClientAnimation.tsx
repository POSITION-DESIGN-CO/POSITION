"use client";

import getWindowDimensions from "@/lib/helper";

interface ClientAnimationProps {
    animationUrl: string;
}

const ClientAnimation: React.FC<ClientAnimationProps> = ({ animationUrl }) => {
    if (!animationUrl) return null;
    const { windowWidth } = getWindowDimensions();

    return windowWidth > 639 ? (
        <video
            src={animationUrl as string}
            width="100"
            height="100"
            style={{
                position: "fixed",
                bottom: "30px",
                left: "30px",
                zIndex: 1000,
                pointerEvents: "none",
            }}
            playsInline
            webkit-playsinline
            muted
            autoPlay
            loop
            controlsList="nodownload nofullscreen noremoteplayback"
        />
    ) : (
        <video
            src={animationUrl as string}
            width="100"
            height="100"
            style={{
                position: "fixed",
                bottom: "30px",
                right: "30px",
                zIndex: 1000,
                pointerEvents: "none",
            }}
            playsInline
            webkit-playsinline
            muted
            autoPlay
            loop
            controlsList="nodownload nofullscreen noremoteplayback"
        />
    );
};

export default ClientAnimation;
