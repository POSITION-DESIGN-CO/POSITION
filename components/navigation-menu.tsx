"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getUniqueCategories } from "@/lib/dummy-data";

export function NavigationMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const categories = getUniqueCategories();

    return (
        <div className="relative z-50">
            {/* Main navigation button */}
            <div className="fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium"
                >
                    <span className="mr-2">POSITION</span>
                    <Menu className={cn("h-5 w-5", isOpen && "hidden")} />
                    <X className={cn("h-5 w-5", !isOpen && "hidden")} />
                </button>
            </div>

            {/* Navigation panel */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-white transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-full flex-col p-16">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold">POSITION</h1>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-lg"
                        >
                            CLOSE <X className="ml-2 inline h-5 w-5" />
                        </button>
                    </div>

                    <div className="mt-12 flex flex-col space-y-4">
                        <div className="w-full">
                            <button
                                onClick={() =>
                                    setIsProjectsOpen(!isProjectsOpen)
                                }
                                className="flex w-full items-start justify-start text-left text-xl font-medium"
                            >
                                PROJECTS
                            </button>
                            <div
                                className={cn(
                                    "mt-4 space-y-2 overflow-hidden transition-all duration-300",
                                    isProjectsOpen
                                        ? "max-h-screen opacity-100"
                                        : "max-h-0 opacity-0"
                                )}
                            >
                                {categories.map((category) => (
                                    <div key={category} className="pl-4">
                                        <Link
                                            href={`/projects?category=${category}`}
                                            onClick={() => setIsOpen(false)}
                                            className="text-lg hover:underline"
                                        >
                                            {category}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/about"
                            onClick={() => setIsOpen(false)}
                            className="text-xl font-medium hover:underline"
                        >
                            ABOUT
                        </Link>
                    </div>

                    <div className="mt-auto">
                        <div className="space-y-2 text-sm">
                            <p>New York / Taipei</p>
                            <p>+1(323)600-5582</p>
                            <p>pshih@positiondesign.co</p>
                            <p>Instagram</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
