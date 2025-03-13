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
                    points="15,6 15,6 305,6 305,6"
                    animate={{
                        points: isMenuOpen
                            ? isProjectsOpen
                                ? `15,6 15,${
                                      windowWidth > 767 ? "80" : "80"
                                  } 305,6 305,600`
                                : `15,6 15,${
                                      windowWidth > 767 ? "80" : "80"
                                  } 305,6 305,300`
                            : "15,6 15,6 305,6 305,6",
                    }}
                    transition={{
                        duration: 0.7,
                        ease:
                            isMenuOpen && !isProjectsOpen
                                ? "circOut"
                                : "circInOut",
                        delay: 0.1,
                    }}
                    stroke="black"
                    strokeWidth="0.9"
                    fill="transparent"
                    strokeLinejoin={"miter"}
                />
            </svg>
        </div>
    );
}
