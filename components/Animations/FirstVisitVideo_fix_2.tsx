"use client";

import { useEffect, useState } from "react";

async function getBase64FromUrl(videoUrl: string): Promise<string> {
    const response = await fetch(videoUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                resolve(reader.result);
            } else {
                reject("Failed to convert video to base64.");
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
export const FirstVisitVideo = ({
    movUrl,
}: {
    movUrl?: string;
    webmUrl?: string;
}) => {
    const [videoBase64, setVideoBase64] = useState<string | null>(null);
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        if (!movUrl) return;
        getBase64FromUrl(movUrl).then(setVideoBase64);
    }, [movUrl]);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("visited");
        if (!hasVisited) {
            setShouldShow(true);
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
            {videoBase64 && (
                <video
                    autoPlay
                    muted
                    playsInline
                    className="max-w-[450px] md:max-w-[600px] bg-white -translate-y-10 sm:-translate-y-0"
                    onEnded={handleClose}
                    src={videoBase64}
                />
            )}
        </div>
    );
};


// "use client";

// import { useEffect, useRef, useState } from "react";

// export const FirstVisitVideo = ({
//     webmUrl,
//     movUrl,
// }: {
//     movUrl?: string;
//     webmUrl?: string;
// }) => {
//     const videoRef = useRef<HTMLVideoElement>(null);
//     const [shouldShow, setShouldShow] = useState(false);
//     const [powerModeOn, setPowerModeOn] = useState(false);


//     useEffect(() => {


//         const hasVisited = sessionStorage.getItem("visited");
//         if (!hasVisited) {
//             setShouldShow(true);
//         }

//         const video = videoRef.current;

//         if (video) {
//             const handleSuspend = () => {
//                 console.log("Low Power Mode likely enabled (suspend event)");
//                 setPowerModeOn(true);
//             };

//             const handlePlay = () => {
//                 console.log("Video played, Low Power Mode likely off");
//                 setPowerModeOn(false);
//             };

//             video.addEventListener("suspend", handleSuspend);
//             video.addEventListener("play", handlePlay);


//             video.play().catch(() => {
//                 console.log("Autoplay blocked");
//                 setPowerModeOn(true);
//             });

//             return () => {
//                 video.removeEventListener("suspend", handleSuspend);
//                 video.removeEventListener("play", handlePlay);
//             };
//         }
//     }, []);

//     const handleClose = () => {
//         sessionStorage.setItem("visited", "true");
//         setShouldShow(false);
//     };



//     return (
//         <div
//             className={`fixed inset-0 flex items-center justify-center z-[999999] w-screen h-screen bg-white transition-opacity duration-700 ${
//                 shouldShow ? "opacity-100" : "opacity-0 pointer-events-none"
//             }`}
//         >
//             <video
//                 ref={videoRef}
//                 onEnded={handleClose}
//                 playsInline
//                 muted
//                 autoPlay
//                 style={{
//                     position: "fixed",
//                     zIndex: 1,
//                     pointerEvents: "none",
//                     visibility:
//                         !powerModeOn ? "visible" : "hidden",
//                 }}
//                 className="max-w-[450px] md:max-w-[600px] bg-white -translate-y-10 sm:-translate-y-0"
//                 controlsList="nodownload nofullscreen noremoteplayback"
//             >
//                 {movUrl && (
//                     <source src={movUrl} type='video/mp4; codecs="hvc1"' />
//                 )}
//                 {webmUrl && <source src={webmUrl} type="video/webm" />}
//             </video>

//             {/* Fallback button if autoplay blocked */}
//             {powerModeOn && (
//                 <button
//                     className="absolute px-4 py-2 -translate-y-10 bg-white text-black border-black border-[1px] font-grotesk text-sm z-[9999]"
//                     onClick={() => {
//                         videoRef.current?.play();
//                         setPowerModeOn(false);
//                     }}
//                 >
//                     Tap to Begin
//                 </button>
//             )}
//         </div>
//     );
// };
