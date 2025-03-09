"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getUniqueCategories } from "@/lib/dummy-data";
import MenuIcon from "./MenuIcon/MenuIcon";
import { BackgroundLine } from "./BackgroundLine/BackgroundLine";
import { useSearchParams } from "next/navigation";

// pass the categories from layout.tsx when fetching data from contentful
// export function NavigationMenu({ categories }: { categories: string[] }) {
export function NavigationMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);

    // remove this when fetching data from contentful
    const categories = getUniqueCategories();

    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category");
    const currentView = searchParams.get("view");
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                menuRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative z-50">
            <div className="fixed top-4 left-4 z-50">
                <button
                    className={`w-80 flex items-center justify-between border-t border-x border-gray-800 bg-white px-3 py-1 text-sm`}
                    ref={buttonRef}
                >
                    <span className="text-xl">
                        <Link href={`/`} className={`text-l`}>
                            POSITIO
                            <span
                                style={{
                                    transform: "scale(-1,1)",
                                    display: "inline-block",
                                }}
                            >
                                N
                            </span>
                        </Link>
                    </span>
                    <MenuIcon
                        isOpen={isOpen}
                        handleClick={() => setIsOpen(!isOpen)}
                    />
                </button>
                <div
                    className={`w-full h-[1px] bg-gray-800 transition-transform origin-center ${
                        !isOpen
                            ? "scale-x-100 delay-700 duration-500"
                            : "scale-x-0 duration-100"
                    }`}
                />
            </div>

            <div
                className={`fixed left-4 w-80 top-12 z-40 bg-white overflow-hidden transition-[max-height] duration-1000 ease-in-out border-x border-b border-gray-800 ${
                    isOpen ? "max-h-[calc(100vh-88px)]" : "max-h-0"
                }`}
                ref={menuRef}
            >
                <div className="flex flex-col p-3 pt-24 w-full">
                    <BackgroundLine
                        isMenuOpen={isOpen}
                        isProjectsOpen={isProjectsOpen}
                    />
                    <button
                        onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                        className="flex w-full items-start justify-start text-left text-l"
                    >
                        PROJECTS
                    </button>
                    <div
                        className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${
                            isProjectsOpen ? "max-h-screen" : "max-h-0"
                        }`}
                    >
                        {categories.map((category) => (
                            <div key={category} className="py-0">
                                <Link
                                    href={`/projects?category=${category}${
                                        currentView
                                            ? `&view=${currentView}`
                                            : ""
                                    }
                                    `}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-l ${
                                        currentCategory === category
                                            ? "text-gray-500"
                                            : ""
                                    }`}
                                >
                                    {category}
                                </Link>
                            </div>
                        ))}
                    </div>

                    <Link
                        href="/about"
                        onClick={() => setIsOpen(false)}
                        className="text-l pt-2"
                    >
                        ABOUT
                    </Link>
                </div>

                <div className="mt-auto pt-8 p-3">
                    <div className="text-l">
                        <p>New York / Taipei</p>
                        <p>+1(323)600-5582</p>
                        <p>pshih@positiondesign.co</p>
                        <p>Instagram</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
