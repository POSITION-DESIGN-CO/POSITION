"use client";

import { useEffect, useRef, useState } from "react";

// Short silent base64 MP4 to test autoplay
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
    webmUrl,
    movUrl,
}: {
    movUrl?: string;
    webmUrl?: string;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldShow, setShouldShow] = useState(false);
    const [autoplayAllowed, setAutoplayAllowed] = useState(true);
    const [autoplayChecked, setAutoplayChecked] = useState(false);
    const [userStarted, setUserStarted] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [videoBase64, setVideoBase64] = useState<string | null>(null);
    

    useEffect(() => {
        if (movUrl) {
            getBase64FromUrl(movUrl).then(setVideoBase64);
        }
    }, [movUrl]);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("visited");
        if (!hasVisited) {
            setShouldShow(true);
        }
    }, []);

    useEffect(() => {
        if (!videoBase64) return;
        const testVideo = document.createElement("video");
        testVideo.src = videoBase64;
        testVideo.muted = true;
        testVideo.playsInline = true;
        testVideo.autoplay = true;

        const checkAutoplay = async () => {
            try {
                await testVideo.play();
                setAutoplayAllowed(true);
                console.log("Autoplay allowed");
            } catch {
                setAutoplayAllowed(false);
                console.log("Autoplay blocked");
            } finally {
                setAutoplayChecked(true);
                console.log("Autoplay check completed");
            }
        };

        checkAutoplay();
    }, [videoBase64]);

useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => {
        console.log("Video started playing");
        setHasPlayed(true);
    };

    video.addEventListener("play", onPlay);

    return () => {
        video.removeEventListener("play", onPlay);
    };
}, [autoplayChecked]);

    const handleClose = () => {
        sessionStorage.setItem("visited", "true");
        setShouldShow(false);
    };

    const startVideo = () => {
        setUserStarted(true);
        videoRef.current?.play();
    };

    if (!shouldShow || !autoplayChecked) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-[9999] w-screen h-screen bg-white transition-opacity duration-700 ${
                shouldShow ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <video
                ref={videoRef}
                onEnded={handleClose}
                muted
                playsInline
                autoPlay={autoplayAllowed}
                style={{
                    position: "fixed",
                    zIndex: 1,
                    pointerEvents: "none",
                }}
                className="max-w-[450px] md:max-w-[600px] bg-white -translate-y-10 sm:-translate-y-0"
                controls={false}
            >
                {movUrl && (
                    <source src={movUrl} type='video/mp4; codecs="hvc1"' />
                )}
                {webmUrl && <source src={webmUrl} type="video/webm" />}
            </video>

            {autoplayChecked &&
                !hasPlayed &&
                !userStarted &&
                !autoplayAllowed && (
                    <button
                        onClick={startVideo}
                        className="absolute px-4 py-2 -translate-y-10 bg-white text-black border border-black font-grotesk text-sm z-[9999]"
                    >
                        Tap to Begin
                    </button>
                )}
        </div>
    );
};
// "use client";

// import { useEffect, useRef, useState } from "react";

// // Short silent base64 MP4 to test autoplay
// async function getBase64FromUrl(videoUrl: string): Promise<string> {
//     const response = await fetch(videoUrl);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             if (typeof reader.result === "string") {
//                 resolve(reader.result);
//             } else {
//                 reject("Failed to convert video to base64.");
//             }
//         };
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//     });
// }


// export const FirstVisitVideo = ({
//     webmUrl,
//     movUrl,
// }: {
//     movUrl?: string;
//     webmUrl?: string;
// }) => {
//     const videoRef = useRef<HTMLVideoElement>(null);
//     const [shouldShow, setShouldShow] = useState(false);
//     const [autoplayAllowed, setAutoplayAllowed] = useState(true);
//     const [autoplayChecked, setAutoplayChecked] = useState(false);
//     const [userStarted, setUserStarted] = useState(false);
//     const [hasPlayed, setHasPlayed] = useState(false);
//     const [videoBase64, setVideoBase64] = useState<string | null>(null);

//     useEffect(() => {
//         const hasVisited = sessionStorage.getItem("visited");
//         if (!hasVisited) {
//             setShouldShow(true);
//         }

//         if (movUrl) {
//             getBase64FromUrl(movUrl).then(setVideoBase64);
//         }
//     }, [movUrl]);


//     useEffect(() => {
//         const hasVisited = sessionStorage.getItem("visited");
//         if (!hasVisited) {
//             setShouldShow(true);
//         }

//         if (!videoBase64) return;
//         const testVideo = document.createElement("video");
//         testVideo.src = videoBase64;
//         testVideo.muted = true;
//         testVideo.playsInline = true;
//         testVideo.autoplay = true;

//         const checkAutoplay = async () => {
//             try {
//                 await testVideo.play();
//                 setAutoplayAllowed(true);
//                 console.log("Autoplay allowed");
//             } catch {
//                 setAutoplayAllowed(false);
//                 console.log("Autoplay blocked");
//             } finally {
//                 setAutoplayChecked(true);
//                 console.log("Autoplay check completed");
//             }
//         };

//         checkAutoplay();
//     }, [videoBase64]);

// useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const onPlay = () => {
//         console.log("Video started playing");
//         setHasPlayed(true);
//     };

//     video.addEventListener("play", onPlay);

//     return () => {
//         video.removeEventListener("play", onPlay);
//     };
// }, [autoplayChecked]);

//     const handleClose = () => {
//         sessionStorage.setItem("visited", "true");
//         setShouldShow(false);
//     };

//     const startVideo = () => {
//         setUserStarted(true);
//         videoRef.current?.play();
//     };

//     if (!shouldShow || !autoplayChecked) return null;

//     return (
//         <div
//             className={`fixed inset-0 flex items-center justify-center z-[9999] w-screen h-screen bg-white transition-opacity duration-700 ${
//                 shouldShow ? "opacity-100" : "opacity-0 pointer-events-none"
//             }`}
//         >
//             <video
//                 ref={videoRef}
//                 onEnded={handleClose}
//                 muted
//                 playsInline
//                 autoPlay={autoplayAllowed}
//                 style={{
//                     position: "fixed",
//                     zIndex: 1,
//                     pointerEvents: "none",
//                 }}
//                 className="max-w-[450px] md:max-w-[600px] bg-white -translate-y-10 sm:-translate-y-0"
//                 controls={false}
//             >
//                 {movUrl && (
//                     <source src={movUrl} type='video/mp4; codecs="hvc1"' />
//                 )}
//                 {webmUrl && <source src={webmUrl} type="video/webm" />}
//             </video>

//             {!hasPlayed && !userStarted && (
//                 <button
//                     onClick={startVideo}
//                     className="absolute px-4 py-2 -translate-y-10 bg-white text-black border border-black font-grotesk text-sm z-[9999]"
//                 >
//                     Tap to Begin
//                 </button>
//             )}
//         </div>
//     );
// };
