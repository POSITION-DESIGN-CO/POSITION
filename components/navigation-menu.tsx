"use client";

import { useState } from "react";
import Link from "next/link";
import { getUniqueCategories } from "@/lib/dummy-data";
import MenuIcon from "./MenuIcon/MenuIcon";

export function NavigationMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const categories = getUniqueCategories();

    return (
        <div className="relative z-50">
            <div className="fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-80 flex items-center justify-between border-t border-x border-gray-800 bg-white px-3 py-1 text-sm`}
                >
                    <span className="text-xl">POSITION</span>
                    <MenuIcon
                        isOpen={isOpen}
                        handleClick={() => setIsOpen(!isOpen)}
                    />
                </button>
                <div
                    className={`w-full h-[1px] bg-gray-800 transition-transform duration-1000 origin-left ${
                        !isOpen ? "scale-x-100" : "scale-x-0"
                    }`}
                />
            </div>

            <div
                className={`fixed left-4 w-80 top-12 z-40 bg-white overflow-hidden transition-[max-height] duration-1000 ease-in-out border-x border-b border-gray-800 ${
                    isOpen ? "max-h-[calc(100vh-88px)]" : "max-h-0"
                }`}
            >
                <div className="flex flex-col p-3">
                    <div className="flex flex-col space-y-4">
                        <div className="w-full">
                            <button
                                onClick={() =>
                                    setIsProjectsOpen(!isProjectsOpen)
                                }
                                className="flex w-full items-start justify-start text-left text-l"
                            >
                                PROJECTS
                            </button>
                            <div
                                className={`mt-2 overflow-hidden transition-[max-height] duration-700 ease-in-out ${
                                    isProjectsOpen ? "max-h-[500px]" : "max-h-0"
                                }`}
                            >
                                {categories.map((category) => (
                                    <div key={category} className="py-0">
                                        <Link
                                            href={`/projects?category=${category}`}
                                            onClick={() => setIsOpen(false)}
                                            className="text-l"
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
                            className="text-l"
                        >
                            ABOUT
                        </Link>
                    </div>

                    <div className="mt-auto pt-8">
                        <div className="text-l">
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
