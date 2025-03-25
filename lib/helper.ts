"use client";

import { useState, useEffect } from "react";

export default function useWindowDimensions() {
    const [dimensions, setDimensions] = useState({
        windowWidth: 0,
        windowHeight: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
            });
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return dimensions;
}

export async function dynamicBlurDataUrl(url: string) {
    try {
        const base64str = await fetch(url).then(async (res) =>
            Buffer.from(await res.arrayBuffer()).toString("base64")
        );
        const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='0.5' />
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
      href='data:image/avif;base64,${base64str}' />
    </svg>
  `;

        const toBase64 = (str: string) =>
            typeof window === "undefined"
                ? Buffer.from(str).toString("base64")
                : window.btoa(str);

        return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
    } catch (e) {
        console.error(e);
    }
}
