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
