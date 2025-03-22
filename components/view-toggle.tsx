import { cn } from "@/lib/utils";
import { Fragment, RefObject, useEffect, useRef, useState } from "react";
import FilterIcon from "./FilterIcon/FilterIcon";
import { useProjectsStore } from "@/store";
import GetWindowDimensions from "@/lib/helper";

export function ViewToggle({
    filterRef,
}: {
    filterRef: RefObject<HTMLDivElement>;
}) {
    const { view, category, categories, setView, setCategory } =
        useProjectsStore();
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [hideFilter, setHideFilter] = useState(true);
    const buttonClasses =
        "rounded-none border-r border-[#3B3B3B] px-2 py-2 text-sm transition-all duration-300 hover:text-[#3B3B3B]";

    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { windowWidth } = GetWindowDimensions();

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
                setHideFilter(true);
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
                className="grid grid-cols-3 border border-[#3B3B3B] bg-white justify-self-end md:w-80 w-[calc(100vw-32px)] md:fixed md:top-[16px] md:right-4 z-50"
                ref={filterRef}
            >
                <button
                    className={cn(
                        buttonClasses,
                        view === "grid" ? "text-[#3B3B3B]" : "text-gray-300"
                    )}
                    onClick={() => setView("grid")}
                >
                    Grid
                </button>
                <button
                    className={cn(
                        buttonClasses,
                        view === "list" ? "text-[#3B3B3B]" : "text-gray-300"
                    )}
                    onClick={() => setView("list")}
                >
                    List
                </button>
                <button
                    className={cn(
                        buttonClasses,
                        "filter text-[#3B3B3B] border-none flex gap-3 items-center justify-center"
                    )}
                    onClick={() => {
                        setHideFilter(!hideFilter);
                        setIsFilterActive(!isFilterActive);
                    }}
                    ref={buttonRef}
                >
                    <p>Filter</p>
                    <FilterIcon
                        // handleClick={() => {
                        //     setHideFilter(!hideFilter);
                        //     setIsFilterActive(!isFilterActive);
                        // }}
                        isOpen={isFilterActive}
                    />
                </button>
            </div>

            <div
                className={`-z-10 lg:z-50 absolute md:top-[38px] lg:relative right-0 flex flex-nowrap flex-col lg:flex-row lg:w-full md:w-[calc(324px/3)] w-[calc(calc(100vw-28px)/3)] bg-white border border-[#3B3B3B] -mt-[1px] justify-self-end transition-all duration-300 ease-in-out ${
                    isFilterActive ? "" : ""
                }`}
                ref={menuRef}
                style={{
                    visibility: hideFilter ? "hidden" : "visible",
                    transform:
                        windowWidth > 1024 && categories && !isFilterActive
                            ? "translateX(30%)"
                            : windowWidth < 1024 &&
                              categories &&
                              !isFilterActive
                            ? "translateY(-30%)"
                            : "translateX(0%) translateY(0%)",
                    opacity: categories && isFilterActive ? 1 : 0,
                }}
            >
                {categories?.map((categoryItem: any, index: number) => {
                    return (
                        <Fragment key={categoryItem}>
                            <button
                                className={cn(
                                    `rounded-none lg:border-r lg:border-b-0 border-b w-full border-[#3B3B3B] lg:px-8 py-2 text-sm transition-all duration-300`,
                                    index === categories.length - 1 &&
                                        "border-none",
                                    categoryItem === category
                                        ? "text-[#3B3B3B]"
                                        : "text-gray-300 hover:text-[#3B3B3B]"
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
