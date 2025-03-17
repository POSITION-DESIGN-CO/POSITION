"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MenuIcon from "./MenuIcon/MenuIcon";
import { BackgroundLine } from "./BackgroundLine/BackgroundLine";
import { useProjectsStore } from "@/store";
import React, { createContext, useContext } from "react";
import { useNavigationMenuRef } from "@/lib/useNavigationMenuRef";

// pass the categories from layout.tsx when fetching data from contentful
// export function NavigationMenu({ categories }: { categories: string[] }) {

export function NavigationMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const { setCategory, categories } = useProjectsStore();

    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const mainMenuRef = useNavigationMenuRef();

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
                setIsProjectsOpen(false);
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
        <div className="relative z-50" ref={mainMenuRef}>
            <div className="fixed top-4 left-4 z-50">
                <button
                    className={`md:w-80 w-[calc(100vw-32px)] flex items-center justify-between border-t border-x border-gray-800 bg-white px-3 py-1 text-sm`}
                    ref={buttonRef}
                >
                    <span className="text-xl">
                        <Link
                            href={`/`}
                            className={`text-l`}
                            onClick={() => {
                                setIsOpen(false);
                                setIsProjectsOpen(false);
                            }}
                        >
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
                        handleClick={() => {
                            setIsOpen(!isOpen);
                            setIsProjectsOpen(false);
                        }}
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
                className={`fixed left-4 md:w-80 w-[calc(100vw-32px)] top-12 z-40 bg-white overflow-hidden transition-[max-height] duration-1000 ease-in-out border-x border-b border-gray-800 ${
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
                        {categories.length &&
                            categories?.map((categoryItem) => (
                                <div key={categoryItem} className="py-0">
                                    <Link
                                        href="/projects"
                                        onClick={() => {
                                            setCategory(categoryItem);
                                            setIsOpen(false);
                                            setIsProjectsOpen(false);
                                        }}
                                        className={`text-l hover:text-gray-400`}
                                    >
                                        {categoryItem}
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
