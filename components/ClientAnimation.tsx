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
            width="200"
            height="200"
            style={{
                position: "fixed",
                bottom: "30px",
                left: "30px",
                zIndex: 1000,
            }}
            autoPlay
            loop
            muted
        />
    ) : (
        <video
            src={animationUrl as string}
            width="200"
            height="200"
            style={{
                position: "fixed",
                bottom: "30px",
                right: "30px",
                zIndex: 1000,
            }}
            autoPlay
            loop
            muted
        />
    );
};

export default ClientAnimation;
