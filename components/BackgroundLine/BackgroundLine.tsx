"use client";

import { motion } from "framer-motion";

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
                <motion.line
                    x1="15"
                    y1="6"
                    x2="15"
                    initial={{ y2: 6 }}
                    animate={{ y2: isMenuOpen ? 90 : 6 }}
                    transition={{
                        duration: 0.7,
                        ease: "circOut",
                        delay: 0.1,
                    }}
                    stroke="black"
                    strokeWidth="0.9"
                />

                <motion.line
                    x1="15"
                    initial={{ y1: 6 }}
                    animate={{ y1: isMenuOpen ? 90 : 6 }}
                    x2="305"
                    y2="6"
                    transition={{
                        duration: 0.7,
                        ease: "circOut",
                        delay: 0.1,
                    }}
                    stroke="black"
                    strokeWidth="0.9"
                />
                <motion.line
                    x1="305"
                    y1="6"
                    x2="305"
                    initial={{ y2: 6 }}
                    animate={{
                        y2:
                            isMenuOpen && !isProjectsOpen
                                ? 300
                                : isProjectsOpen
                                ? 600
                                : 6,
                    }}
                    transition={{
                        duration: 1,
                        ease:
                            isMenuOpen && !isProjectsOpen
                                ? "circOut"
                                : "circInOut",
                        delay: isMenuOpen && !isProjectsOpen ? 0.2 : 0,
                    }}
                    stroke="black"
                    strokeWidth="0.9"
                />
            </svg>
        </div>
    );
}
