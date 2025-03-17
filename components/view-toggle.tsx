import { cn } from "@/lib/utils";
import { RefObject, useEffect, useRef, useState } from "react";
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
        "rounded-none border-r border-gray-800 px-6 py-2 text-sm transition-all duration-300 hover:text-black";

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
                className="flex border border-gray-800 bg-white justify-self-end md:w-80 w-[calc(100vw-32px)]"
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
                        "filter text-black border-none flex items-center justify-between w-full"
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

            <div
                className="flex flex-nowrap border border-gray-800 bg-white -mt-[1px] justify-self-end transition-all duration-500 ease-in-out"
                style={{
                    transform:
                        categories && isFilterActive
                            ? "translateX(0%)"
                            : "translateX(120%)",
                }}
                ref={menuRef}
            >
                <aside
                    className="overflow-scroll md:w-full w-[calc(100vw-34px)] flex flex-nowrap
"
                >
                    {categories?.map((categoryItem: any, index: number) => {
                        return (
                            <>
                                <button
                                    key={categoryItem}
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
                </aside>
            </div>
        </>
    );
}
