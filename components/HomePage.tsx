"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { EditorialImage } from "@/components/editorial-image";
import { ProjectImage } from "@/components/project-image";
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
            // {
            //     colSpan:
            //         "lg:col-start-8 lg:col-span-6 lg:row-start-13 row-span-2",
            // },
            // {
            //     colSpan:
            //         "lg:col-start-4 lg:col-span-3 lg:row-start-15 lg:row-span-2",
            // },
            // { colSpan: "lg:col-start-9 lg:col-span-4 lg:row-start-15" },
            // { colSpan: "lg:col-start-2 lg:col-span-6 lg:row-start-16" },
            // {
            //     colSpan:
            //         "lg:col-start-10 col-span-3 lg:row-start-16 lg:row-span-2",
            // },
        ];
        return configs[index];
    };

    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className="grid md:grid-cols-12 md:grid-rows-[repeat(30,minmax(0,120px))] grid-rows-none grid-cols-6 md:gap-4 gap-16">
            {homepageItems.map((item: HomepageItem, index: number) => {
                const gridPlacement = getGridPlacement(index);

                if (item.type === "editorial") {
                    return (
                        <div
                            key={`editorial-${item.data.sys.id}`}
                            className={cn(
                                gridPlacement.colSpan,
                                // "col-span-1",
                                `block h-full group transition-opacity duration-300 ${
                                    hoveredId && hoveredId !== item.data.sys.id
                                        ? "opacity-10"
                                        : "opacity-100"
                                }`
                            )}
                        >
                            <EditorialImage
                                image={item.data.image}
                                title={item.data.title}
                            />
                        </div>
                    );
                }

                const isHorizontal =
                    item.data.thumbnail.width >= item.data.thumbnail.height;

                return (
                    <div
                        key={`project-${item.data.sys.id}`}
                        className={cn(
                            gridPlacement.colSpan,
                            "relative"
                            // "col-span-1 relative"
                        )}
                    >
                        <Link
                            href={`/projects/${item.data.slug}`}
                            className={`block h-full group transition-opacity duration-500 cursor-default ${
                                hoveredId && hoveredId !== item.data.sys.id
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
                            {/* <div className="mt-2">
                                <h2 className="text-sm">{item.data.title}</h2>
                                <p
                                    className={`text-xs text-gray-500 transition-opacity duration-300 ${
                                        hoveredId === item.data.sys.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }`}
                                >
                                    {item.data.category}, {item.data.year}
                                </p>
                            </div> */}
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
                                        "md:max-w-[90px] max-w-[70px]"
                                    } `}
                                >
                                    {item.data.title}
                                </h2>
                                <p
                                    className={`text-xs text-gray-500 transition-opacity duration-300 md:max-w-[120px] max-w-[70px] ${
                                        hoveredId === item.data.sys.id ||
                                        windowWidth < 910
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

// "use client";

// import Link from "next/link";
// import { useState, useMemo } from "react";
// import { EditorialImage } from "@/components/editorial-image";
// import { ProjectImage } from "@/components/project-image";
// import { cn } from "@/lib/utils";
// import { HomepageItem } from "@/lib/contentful-models";

// export function HomePage({ homepageItems }: { homepageItems: HomepageItem[] }) {
//     const getGridPlacement = (index: number) => {
//         const configs = [
//             { colSpan: "md:col-start-1" },
//             { colSpan: "md:col-start-7 place-content-center" },
//             { colSpan: "md:col-start-6" },
//             { colSpan: "md:col-start-1 place-content-center" },
//             { colSpan: "md:col-start-7" },
//             { colSpan: "md:col-start-3" },
//             { colSpan: "md:col-start-8" },
//             { colSpan: "md:col-start-1" },
//             { colSpan: "md:col-start-5" },
//             { colSpan: "md:col-start-10" },
//         ];
//         return configs[index % configs.length];
//     };

//     const [hoveredId, setHoveredId] = useState<string | null>(null);

//     const layoutConfig = useMemo(() => {
//         return homepageItems.map((_, index) => {
//             const randomEditorialCols = ["col-span-3"];
//             const randomFlat = ["col-span-4", "col-span-5", "col-span-6"];
//             const randomPortrait = ["col-span-3", "col-span-4", "col-span-5"];

//             return {
//                 gridPlacement: getGridPlacement(index),
//                 editorialCol:
//                     randomEditorialCols[Math.floor(Math.random() * 1)],
//                 flatCol: randomFlat[Math.floor(Math.random() * 3)],
//                 portraitCol: randomPortrait[Math.floor(Math.random() * 3)],
//             };
//         });
//     }, [homepageItems]);

//     return (
//         <div className="grid grid-cols-12 gap-10">
//             {homepageItems.map((item: HomepageItem, index: number) => {
//                 const { gridPlacement, editorialCol, flatCol, portraitCol } =
//                     layoutConfig[index];

//                 if (item.type === "editorial") {
//                     return (
//                         <div
//                             key={`editorial-${item.data.sys.id}`}
//                             className={cn(
//                                 gridPlacement.colSpan,
//                                 editorialCol,
//                                 `block h-full group transition-opacity duration-300 ${
//                                     hoveredId && hoveredId !== item.data.sys.id
//                                         ? "opacity-10"
//                                         : "opacity-100"
//                                 }`
//                             )}
//                         >
//                             <EditorialImage
//                                 image={item.data.image}
//                                 title={item.data.title}
//                             />
//                         </div>
//                     );
//                 }

//                 const isHorizontal =
//                     item.data.thumbnail.width >= item.data.thumbnail.height;

//                 return (
//                     <div
//                         key={`project-${item.data.sys.id}`}
//                         className={cn(
//                             gridPlacement.colSpan,
//                             isHorizontal ? flatCol : portraitCol
//                         )}
//                     >
//                         <Link
//                             href={`/projects/${item.data.sys.id}`}
//                             onMouseEnter={() => setHoveredId(item.data.sys.id)}
//                             onMouseLeave={() => setHoveredId(null)}
//                             className={`block h-full group transition-opacity duration-300 ${
//                                 hoveredId && hoveredId !== item.data.sys.id
//                                     ? "opacity-10"
//                                     : "opacity-100"
//                             }`}
//                         >
//                             <ProjectImage
//                                 thumbnail={item.data.thumbnail}
//                                 title={item.data.title}
//                                 isHorizontal={isHorizontal}
//                             />
//                             <p
//                                 className={`text-xs text-gray-500 transition-opacity duration-300 ${
//                                     hoveredId === item.data.sys.id
//                                         ? "opacity-100"
//                                         : "opacity-0"
//                                 }`}
//                             >
//                                 {item.data.category}, {item.data.year}
//                             </p>
//                         </Link>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }
