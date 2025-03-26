"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { EditorialImage } from "@/components/Home/EditorialImage";
import { ProjectImage } from "@/components/Home/ProjectImage";
import { cn } from "@/lib/utils";
import { HomepageItem } from "@/lib/contentful-models";
import GetWindowDimensions from "@/lib/helper";

export function HomePage({ homepageItems }: { homepageItems: HomepageItem[] }) {
    const { windowWidth } = GetWindowDimensions();
    const getGridPlacement = (index: number) => {
        const configs = [
            {
                colSpan:
                    "md:col-start-1 md:col-span-5 md:row-span-4 col-span-4",
            },
            { colSpan: "md:col-start-8 md:col-span-5 col-span-5 col-start-2" },
            {
                colSpan:
                    "md:col-start-7 md:row-start-5 md:row-span-4 md:col-span-4 col-span-4 col-start-3",
            },
            {
                colSpan:
                    "md:col-start-2 md:col-span-3 md:row-span-3 md:row-start-8 md:w-3/4 w-full col-start-2 col-span-3",
            },
            {
                colSpan:
                    "md:col-start-8 md:col-span-4 md:row-start-8 md:row-span-8 col-span-4",
            },
            {
                colSpan:
                    "md:col-start-1 md:col-span-5 md:row-start-11 md:row-span-4 col-span-5",
            },
            {
                colSpan:
                    "md:col-start-9 md:col-span-3 md:row-start-[13] md:row-span-4 md:w-2/3 w-full col-span-3 col-start-3",
            },
            {
                colSpan:
                    "md:col-start-3 md:col-span-3 md:row-start-[15] col-span-3",
            },
            {
                colSpan:
                    "md:col-start-8 md:col-span-5 md:row-start-[17] col-span-5 col-start-2",
            },
            {
                colSpan:
                    "md:col-start-1 md:col-span-3 md:row-start-[19] md:w-2/3 w-full col-span-3 col-start-2",
            },
            {
                colSpan:
                    "md:col-start-5 md:col-span-6 md:row-start-[21] md:row-span-2 col-span-4",
            },
            {
                colSpan:
                    "md:col-start-2 md:col-span-4 md:row-start-[25] col-span-3 col-start-3",
            },
            {
                colSpan:
                    "md:col-start-8 md:col-span-3 md:row-start-[27] md:row-span-3 col-span-4",
            },
            {
                colSpan:
                    "md:col-start-1 md:col-span-3 md:row-start-[30] md:row-span-3 md:w-2/3 w-full col-span-3 col-start-4",
            },
            {
                colSpan:
                    "md:col-start-5 md:col-span-6 md:row-start-[31] md:row-span-3 col-span-5",
            },
        ];
        return configs[index];
    };

    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className="grid md:grid-cols-12 md:grid-rows-[repeat(30,minmax(0,100%))] grid-rows-none grid-cols-6 gap-16 md:gap-0 overflow-x-hidden">
            {homepageItems.map((item: HomepageItem, index: number) => {
                const gridPlacement = getGridPlacement(index);

                if (item.type === "editorial") {
                    return (
                        <div
                            key={`editorial-${item.data.sys.id}`}
                            className={cn(
                                gridPlacement.colSpan,
                                `block h-full group transition-opacity duration-1000 ease-in-out ${
                                    hoveredId &&
                                    hoveredId !== item.data.sys.id &&
                                    windowWidth > 1024
                                        ? "opacity-10"
                                        : "opacity-100"
                                }`
                            )}
                        >
                            <EditorialImage
                                image={item.data.image}
                                title={item.data.title}
                                link={item.data.link}
                                description={item.data?.description}
                                onMouseEnter={() =>
                                    setHoveredId(item.data.sys.id)
                                }
                                onMouseLeave={() => setHoveredId(null)}
                            />
                        </div>
                    );
                }

                const isHorizontal =
                    item.data.thumbnail.width >= item.data.thumbnail.height;

                return (
                    <div
                        key={`project-${item.data.sys.id}`}
                        className={cn(gridPlacement.colSpan, "relative")}
                    >
                        <Link
                            href={`/projects/${item.data.slug}`}
                            className={`block h-full group transition-opacity duration-1000 ease-in-out cursor-default ${
                                hoveredId &&
                                hoveredId !== item.data.sys.id &&
                                windowWidth > 1024
                                    ? "opacity-20"
                                    : "opacity-100"
                            }`}
                        >
                            <ProjectImage
                                thumbnail={item.data.thumbnail}
                                title={item.data.title}
                                isHorizontal={isHorizontal}
                                onMouseEnter={() =>
                                    setHoveredId(item.data.sys.id)
                                }
                                onMouseLeave={() => setHoveredId(null)}
                            />
                            <div
                                className={`mt-2 ${
                                    !isHorizontal
                                        ? "absolute -top-3 -right-3 z-50"
                                        : ""
                                }`}
                                style={{
                                    transform: !isHorizontal
                                        ? "translateX(100%)"
                                        : "",
                                }}
                            >
                                <h2
                                    className={`text-sm break-words overflow-hidden whitespace-normal ${
                                        !isHorizontal &&
                                        "max-w-[70px] md:max-w-[65px] lg:max-w-[100px]"
                                    } `}
                                >
                                    {item.data.title}
                                </h2>
                                <p
                                    className={`text-xs text-gray-500 transition-opacity duration-300 ease-in-out max-w-[70px] md:max-w-[65px] lg:max-w-[100px] ${
                                        hoveredId === item.data.sys.id ||
                                        windowWidth < 1024
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }`}
                                >
                                    {item.data.category}, {item.data.year}
                                </p>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
