import { cn } from "@/lib/utils";
import { Fragment, RefObject, useEffect, useRef, useState } from "react";
import FilterIcon from "./FilterIcon/FilterIcon";
import { useProjectsStore } from "@/store";

export function ViewToggle({
    filterRef,
}: {
    filterRef: RefObject<HTMLDivElement>;
}) {
    const { view, category, categories, setView, setCategory } =
        useProjectsStore();
    const [isFilterActive, setIsFilterActive] = useState(false);
    const buttonClasses =
        "rounded-none border-r border-gray-800 px-2 py-2 text-sm transition-all duration-300 hover:text-black";

    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isFilterActive &&
                menuRef.current &&
                filterRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !filterRef.current.contains(event.target as Node) &&
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
            <div
                className="grid grid-cols-3 border border-gray-800 bg-white justify-self-end md:w-80 w-[calc(100vw-32px)]"
                ref={filterRef}
            >
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
                        "filter text-black border-none flex gap-3 items-center justify-center"
                    )}
                    onClick={() => setIsFilterActive(!isFilterActive)}
                    ref={buttonRef}
                >
                    <p>Filter</p>
                    <FilterIcon
                        handleClick={() => setIsFilterActive(!isFilterActive)}
                        isOpen={isFilterActive}
                    />
                </button>
            </div>

            <div
                className={`md:z-50 absolute md:relative right-0 flex flex-nowrap flex-col md:flex-row md:w-full w-[calc(calc(100vw-28px)/3)] bg-white border border-gray-800 -mt-[1px] justify-self-end transition-all duration-500 ease-in-out ${
                    isFilterActive ? "" : ""
                }`}
                ref={menuRef}
                style={{
                    transform:
                        categories && isFilterActive
                            ? "translateX(0%)"
                            : "translateX(120%)",
                }}
            >
                {categories?.map((categoryItem: any, index: number) => {
                    return (
                        <Fragment key={categoryItem}>
                            <button
                                className={cn(
                                    `rounded-none md:border-r md:border-b-0 border-b w-full border-gray-800 md:px-8 py-2 text-sm transition-all duration-300`,
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
                        </Fragment>
                    );
                })}
            </div>
        </>
    );
}
