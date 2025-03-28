"use client";

import { motion } from "framer-motion";
import GetWindowDimensions from "@/lib/helper";
interface BackgroundLineProps {
    isProjectsOpen: boolean;
    isMenuOpen: boolean;
}

export function BackgroundLine({
    isMenuOpen,
    isProjectsOpen,
}: BackgroundLineProps) {
    const { windowWidth } = GetWindowDimensions();
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
                <motion.polyline
                    points="17,2 17,2 303,2 303,2"
                    animate={{
                        points: isMenuOpen
                            ? isProjectsOpen
                                ? `17,2 17,${
                                      windowWidth > 767 ? "80" : "80"
                                  } 303,2 303,600`
                                : `17,2 17,${
                                      windowWidth > 767 ? "80" : "80"
                                  } 303,2 303,300`
                            : "17,2 17,2 303,2 303,2",
                    }}
                    transition={{
                        duration: 0.7,
                        delay: isMenuOpen && !isProjectsOpen ? 0.2 : 0,
                    }}
                    stroke="#3B3B3B"
                    strokeWidth="1"
                    fill="transparent"
                    strokeLinejoin={"miter"}
                />
            </svg>
        </div>
    );
}
