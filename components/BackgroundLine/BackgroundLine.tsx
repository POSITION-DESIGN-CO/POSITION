"use client";

import "./BackgroundLine.css";

interface BackgroundLineProps {
    isProjectsOpen: boolean;
    isMenuOpen: boolean;
}

export function BackgroundLine({
    isMenuOpen,
    isProjectsOpen,
}: BackgroundLineProps) {
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
                    d={`M15 0 L15 ${isMenuOpen ? "90" : "8"} L305 ${
                        isMenuOpen ? "13" : "8"
                    }  L305 ${isMenuOpen ? "600" : "0"}`}
                    stroke="black"
                    strokeWidth="1"
                    fill="none"
                    className="transition-all duration-700 delay-100 ease-in-out will-change-[d] motion-reduce:transition-none"
                />
            </svg>
        </div>
    );
}
