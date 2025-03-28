"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MenuIcon from "../MenuIcon/MenuIcon";
import { BackgroundLine } from "../BackgroundLine/BackgroundLine";
import { useProjectsStore } from "@/store";
import { useNavigationMenuRef } from "@/lib/useNavigationMenuRef";
import { Logo } from "./Logo";

// pass the categories from layout.tsx when fetching data from contentful
// export function NavigationMenu({ categories }: { categories: string[] }) {

interface NavigationMenuProps {
    email: string;
    instagram?: string;
    secondaryIG?: string;
    phone?: string;
    location?: string;
}

export function NavigationMenu({ contact }: { contact: NavigationMenuProps }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const { setCategory, categories } = useProjectsStore();
    const [isLoading, setIsLoading] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const projectsContainerRef = useRef<HTMLDivElement>(null);
    const mainMenuRef = useNavigationMenuRef();

    const calcContainerHeight = () => {
        if (projectsContainerRef.current) {
            const height = Array.from(
                projectsContainerRef.current.children
            ).reduce((acc, child) => {
                return acc + (child as HTMLElement).offsetHeight;
            }, 0);
            return height;
        }
        return 0;
    };

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
                setTimeout(() => {
                    setIsProjectsOpen(false);
                }, 500);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hasVisited = localStorage.getItem("visited");
            if (!hasVisited) {
                setIsLoading(false);
                setTimeout(() => setIsLoading(true), 1000);
            } else {
                setIsLoading(true);
            }
        }
    }, []);

    if (!isLoading) return null;

    return (
        <div className="relative z-[999]" ref={mainMenuRef}>
            <div className="fixed top-4 left-4 z-50">
                <button
                    className={`md:w-80 w-[calc(100vw-32px)] flex items-center justify-between border-t border-x bg-white border-[#3B3B3B] px-4 py-2 text-sm`}
                    ref={buttonRef}
                >
                    <span>
                        <Link
                            href={`/`}
                            onClick={() => {
                                setIsOpen(false);
                                setTimeout(() => {
                                    setIsProjectsOpen(false);
                                }, 500);
                            }}
                        >
                            <Logo />
                        </Link>
                    </span>
                    <MenuIcon
                        isOpen={isOpen}
                        handleClick={() => {
                            setIsOpen(!isOpen);
                            setTimeout(() => {
                                setIsProjectsOpen(false);
                            }, 500);
                        }}
                    />
                </button>
            </div>

            <div
                className={`fixed left-4 md:w-80 w-[calc(100vw-32px)] top-[53px] z-40 bg-white overflow-hidden transition-[max-height] duration-1000 ease-in-out border-x border-b border-[#3B3B3B] ${
                    isOpen ? "max-h-[calc(100vh-88px)]" : "max-h-0"
                }`}
                ref={menuRef}
            >
                <div className="flex flex-col p-[14px] pt-24 w-full items-start">
                    <BackgroundLine
                        isMenuOpen={isOpen}
                        isProjectsOpen={isProjectsOpen}
                    />
                    <button
                        onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                        className={`flex items-start text-left pb-0 pt-2 hover:text-gray-400 transition-all duration-300`}
                    >
                        Projects
                    </button>
                    <div
                        className={`overflow-hidden transition-[max-height] duration-700 ease-in-out`}
                        style={{
                            maxHeight: isProjectsOpen
                                ? calcContainerHeight()
                                : 0,
                        }}
                        ref={projectsContainerRef}
                    >
                        {categories.length &&
                            categories?.map((categoryItem, index) => (
                                <div
                                    key={categoryItem}
                                    className={`${
                                        index === categories.length - 1
                                            ? "pb-3"
                                            : index === 0
                                            ? "pt-2"
                                            : "py-0 leading-[1.5]"
                                    }`}
                                >
                                    <Link
                                        href="/projects"
                                        onClick={() => {
                                            setCategory(categoryItem);
                                            setIsOpen(false);
                                            setTimeout(() => {
                                                setIsProjectsOpen(false);
                                            }, 500);
                                        }}
                                        className={`text-l hover:text-gray-400 transition-all duration-300`}
                                    >
                                        {categoryItem}
                                    </Link>
                                </div>
                            ))}
                    </div>

                    <Link
                        href="/about"
                        onClick={() => setIsOpen(false)}
                        className="hover:text-gray-400 transition-all duration-300"
                    >
                        About
                    </Link>
                </div>

                <div className="mt-auto pt-8 pl-[14px] pb-3">
                    <div className="sm:text-sm text-base">
                        {contact?.location ? <p>{contact.location}</p> : null}
                        {contact?.phone ? <p>{contact.phone}</p> : null}
                        <p>
                            <a
                                className="hover:text-gray-400 transition-all duration-300"
                                href={`mailto:${contact.email}`}
                            >
                                {contact.email.replace(/@/g, "[at]")}
                            </a>
                        </p>
                        <p>
                            <a
                                className="hover:text-gray-400 transition-all duration-300"
                                target="_blank"
                                href={`https://www.instagram.com/${contact?.instagram
                                    ?.split("@")
                                    .join("")}/`}
                            >
                                Instagram
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
