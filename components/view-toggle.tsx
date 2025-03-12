"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import FilterIcon from "./FilterIcon/FilterIcon";
import { useProjectsStore } from "@/store";

export function ViewToggle() {
    const { view, category, categories, setView, setCategory } =
        useProjectsStore();
    const [isFilterActive, setIsFilterActive] = useState(false);
    const buttonClasses =
        "rounded-none border-r border-gray-800 px-6 py-2 text-sm transition-all duration-300 hover:text-black";

    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isFilterActive &&
                menuRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsFilterActive(false);
            }
        };
        if (isFilterActive) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isFilterActive]);

    return (
        <>
            <div className="flex border border-gray-800 bg-white justify-self-end">
                <button
                    className={cn(
                        buttonClasses,
                        view === "grid" ? "text-black" : "text-gray-300"
                    )}
                    onClick={() => setView("grid")}
                >
                    Grid
                </button>
                <button
                    className={cn(
                        buttonClasses,
                        view === "list" ? "text-black" : "text-gray-300"
                    )}
                    onClick={() => setView("list")}
                >
                    List
                </button>
                <button
                    className={cn(
                        buttonClasses,
                        "text-black border-none flex items-center justify-between w-24"
                    )}
                    onClick={() => setIsFilterActive(!isFilterActive)}
                    ref={buttonRef}
                >
                    Filter
                    <FilterIcon
                        handleClick={() => setIsFilterActive(!isFilterActive)}
                        isOpen={isFilterActive}
                    />
                </button>
            </div>
            {categories && isFilterActive && (
                <div
                    className="flex border border-gray-800 bg-white -mt-[1px] justify-self-end"
                    ref={menuRef}
                >
                    {categories?.map((categoryItem: any, index: number) => {
                        return (
                            <>
                                <button
                                    className={cn(
                                        "rounded-none border-r border-gray-800 px-6 py-2 text-sm transition-all duration-300",
                                        index === categories.length - 1 &&
                                            "border-none",
                                        categoryItem === category
                                            ? "text-black"
                                            : "text-gray-300 hover:text-black"
                                    )}
                                    onClick={() => setCategory(categoryItem)}
                                >
                                    {categoryItem}
                                </button>
                            </>
                        );
                    })}
                </div>
            )}
        </>
    );
}
