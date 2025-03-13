import Image from "next/image";
import { getProjectById } from "@/lib/contentful";
import Link from "next/link";

interface Image {
    title: string;
    url: string;
    width: number;
    height: number;
    sys: { id: string };
}

export default async function ProjectPage({
    params,
}: {
    params: { id: string };
}) {
    const getGridConfig = (item: any, index: number) => {
        const configs = [
            {
                colSpan: "col-span-12 md:col-span-6 place-content-end",
            },
            {
                colSpan:
                    "col-span-12 md:col-span-4 md:col-start-9 place-self-end",
            },
            {
                colSpan: "col-span-12 md:col-start-2 md:col-end-7",
            },
            {
                colSpan:
                    "col-span-12 md:col-span-4 md:col-start-7 place-self-end",
            },
            {
                colSpan: "col-span-12 md:col-span-5",
            },
            {
                colSpan:
                    "col-span-12 md:col-span-4 md:col-start-8 place-self-end",
            },
        ];
        return configs[index % configs.length];
    };
    const project = await getProjectById(params.id);

    if (!project) {
        return (
            <main className="min-h-[calc(100vh-50px)] flex justify-center items-center p-8">
                <h1 className="text-xl">project not found...</h1>
            </main>
        );
    }

    return (
        <main className="sm:min-h-[calc(100vh-50px)] min-h-[calc(100vh-150px)] p-4">
            <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-1 pt-40 md:gap-3 gap-0 text-sm max-w-7xl">
                <p className="col-span-1 lg:col-span-3 md:col-span-2">
                    {project.title}
                    <Image
                        priority
                        src={project.thumbnail.url || "/placeholder.svg"}
                        alt={project.title}
                        width={project.thumbnail.width}
                        height={project.thumbnail.height}
                        className="w-1/2 hidden lg:block object-cover"
                    />
                </p>
                <p className="col-span-1 md:col-span-2 text-gray-400">
                    <span className="hidden md:block text-gray-400">
                        Category:
                    </span>
                    {project.category}
                </p>
                <p className="col-span-1 md:col-span-2 text-gray-400">
                    <span className="hidden md:block text-gray-400">
                        Location:
                    </span>
                    {project.location}
                </p>
                <p className="col-span-1 md:col-span-2 text-gray-400">
                    <span className="hidden md:block text-gray-400">
                        Position:
                    </span>
                    {project.location}
                </p>
                <p className="col-span-1 md:col-span-2 text-gray-400">
                    <span className="hidden md:block text-gray-400">Team:</span>
                    {project.location}
                </p>
                <p className="col-span-1 md:col-span-1 text-gray-400">
                    <span className="hidden md:block text-gray-400">Year:</span>
                    {project.year}
                </p>
            </div>
            <div className="grid md:grid-cols-12 grid-col-1 sm:my-40 my-16 text-sm max-w-7xl">
                <p className="text-sm col-span-1 md:col-span-6">
                    {project.description}
                </p>
            </div>
            <div className="fixed md:top-4 right-4 top-[53px]">
                <div className="flex border border-gray-800 bg-white justify-center md:w-80 w-[calc(100vw-32px)]">
                    <Link
                        href="/projects"
                        className="rounded-none border-gray-800 px-6 py-2 text-sm transition-all duration-300 hover:text-black"
                    >
                        Back
                    </Link>
                </div>
            </div>

            <div className="gap-2 grid md:grid-cols-12">
                {project.galleryCollection.items.map((image: Image, index) => {
                    const config = getGridConfig(image, index);
                    return (
                        <div key={image.sys.id} className={config.colSpan}>
                            <Image
                                priority
                                src={image.url || "/placeholder.svg"}
                                alt={image.title}
                                width={image.width}
                                height={image.height}
                                className="h-auto w-full object-cover"
                            />
                            {image.title && (
                                <p className="mt-2 text-sm text-gray-500">
                                    {image.title}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
