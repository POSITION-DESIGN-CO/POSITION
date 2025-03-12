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
        <main className="min-h-[calc(100vh-50px)] p-4">
            <div className="grid grid-cols-2 mb-80">
                <div className="max-w-3xl text-sm md:col-start-2 col-span-2 pt-12 md:p-0">
                    <p>{project.title}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <p className="text-gray-500">{project.category}</p>
                        <p className="text-gray-500">{project.year}</p>
                        <p className="text-gray-500">{project.location}</p>
                    </div>
                    <p>{project.description}</p>
                </div>
            </div>

            <div className="fixed top-4 right-4">
                <div className="flex border border-gray-800 bg-white justify-self-end">
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
