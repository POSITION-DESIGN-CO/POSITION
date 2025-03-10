import Image from "next/image";
import Link from "next/link";
import { getHomepageItems } from "@/lib/contentful";
import { EditorialImage } from "@/components/editorial-image";
import type {
    HomepageItem,
    extendedHomePageItem,
} from "@/lib/contentful-models";

export default async function Home() {
    const homepageItems: HomepageItem[] = await getHomepageItems();

    const getGridConfig = (item: HomepageItem, index: number) => {
        if (item.type === "editorial") {
            switch (item.data.size) {
                case "small":
                    return {
                        colSpan: "col-span-12 md:col-span-2",
                    };
                case "medium":
                    return {
                        colSpan: "col-span-12 md:col-span-3",
                    };
                case "large":
                    return { colSpan: "col-span-12 md:col-span-4" };
                default:
                    return { colSpan: "col-span-12 md:col-span-4" };
            }
        } else {
            const configs = [
                {
                    colSpan: "col-span-12 md:col-span-3 place-content-end",
                },
                { colSpan: "col-span-12 md:col-span-4 place-content-end" },
                {
                    colSpan: "col-span-12 md:col-span-2 place-content-start",
                    height: "h-auto",
                    isText: true,
                },
                { colSpan: "col-span-12 md:col-span-3 place-content-center" },
                {
                    colSpan: "col-span-12 md:col-span-3",
                },
                { colSpan: "col-span-12 md:col-span-3 place-content-end" },
                { colSpan: "col-span-12 md:col-span-6" },
            ];
            return configs[index % configs.length];
        }
    };

    const aboutTextPosition = 2;
    const itemsWithAboutText: extendedHomePageItem = [
        ...homepageItems.slice(0, aboutTextPosition),
        {
            type: "text",
            data: {
                content:
                    "POSITION is an architectural practice founded by Poyao Shih in Brooklyn, New York. The studio explores ideas across different disciplines and scales, focusing on responding to contemporary architectural issues through innovative forms and materials.",
            },
            order: aboutTextPosition,
        },
        ...homepageItems.slice(aboutTextPosition),
    ];

    return (
        <main className="min-h-screen p-4">
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                {itemsWithAboutText.map((item, index) => {
                    const config = getGridConfig(item as HomepageItem, index);

                    if (item.type === "text") {
                        return (
                            <div
                                key="about-text"
                                className="col-span-12 md:col-span-3"
                            >
                                <div>
                                    <p className="text-sm">
                                        {item.data.content}
                                    </p>
                                </div>
                            </div>
                        );
                    }

                    if (item.type === "editorial") {
                        return (
                            <div
                                key={`editorial-${item.data.sys.id}`}
                                className={config.colSpan}
                            >
                                <EditorialImage
                                    image={item.data.image}
                                    title={item.data.title}
                                    description={item.data.description}
                                    size={item.data.size}
                                />
                            </div>
                        );
                    }

                    return (
                        <div
                            key={item.data.sys.id}
                            className={
                                index === 0
                                    ? "md:col-start-2 col-start-1 md:col-span-3 col-span-12"
                                    : config.colSpan
                            }
                        >
                            <Link
                                href={`/projects/${item.data.sys.id}`}
                                className="group block"
                            >
                                <div className="overflow-hidden">
                                    <Image
                                        priority
                                        src={
                                            item.data.thumbnail.url ||
                                            "/placeholder.svg"
                                        }
                                        alt={item.data.title}
                                        width={item.data.thumbnail.width}
                                        height={item.data.thumbnail.height}
                                        className="w-full md:max-h-96 lg:max-h-[50rem] object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="mt-2">
                                    <h2 className="text-sm">
                                        {item.data.title}
                                    </h2>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
