"use client";

import { useEffect, useRef, useState } from "react";
import "./BackgroundLine.css";

interface BackgroundLineProps {
    isProjectsOpen: boolean;
    isMenuOpen: boolean;
}

export function BackgroundLine({
    isMenuOpen,
    isProjectsOpen,
}: BackgroundLineProps) {
    const prevMenuOpenRef = useRef(isMenuOpen);
    const prevProjectsOpenRef = useRef(isProjectsOpen);

    const [pathData, setPathData] = useState(`M15 0 L15 8 L305 8 L305 0`);

    useEffect(() => {
        if (
            prevMenuOpenRef.current !== isMenuOpen ||
            prevProjectsOpenRef.current !== isProjectsOpen
        ) {
            prevMenuOpenRef.current = isMenuOpen;
            prevProjectsOpenRef.current = isProjectsOpen;

            if (isMenuOpen) {
                setPathData(`M15 6 L15 6 L305 6 L305 6`);
                const timer = setTimeout(() => {
                    setPathData(`M15 0 L15 90 L305 13 L305 600`);
                }, 50);

                return () => clearTimeout(timer);
            } else {
                setPathData(`M15 6 L15 20 L305 6 L305 6`);
                const timer = setTimeout(() => {
                    setPathData(`M15 6 L15 6 L305 6 L305 6`);
                }, 50);

                return () => clearTimeout(timer);
            }
        }
    }, [isMenuOpen]);

    return (
        <div className="absolute inset-0 pointer-events-none pb-4">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 320 600"
                fill="none"
                preserveAspectRatio="xMinYMin slice"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <path
                    d={pathData}
                    stroke="black"
                    strokeWidth="0.9"
                    fill="none"
                    className="svg-path"
                />
            </svg>
        </div>
    );
}
