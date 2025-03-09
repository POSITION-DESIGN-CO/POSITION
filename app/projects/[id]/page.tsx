import Image from "next/image";
import Link from "next/link";
import { getProjectById } from "@/lib/contentful";

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
    const project = await getProjectById(params.id);

    if (!project) {
        return (
            <main className="min-h-screen flex justify-center items-center bg-white p-8">
                <h1 className="text-xl">project not found...</h1>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 mt-16">
                    <Link
                        href="/projects"
                        className="mb-4 inline-block text-sm hover:underline"
                    >
                        ← Back to Projects
                    </Link>
                    <h1 className="text-3xl font-bold">{project.title}</h1>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                        <p>{project.category}</p>
                        <p>{project.year}</p>
                        <p>{project.location}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {project.galleryCollection.items.map((image: Image) => (
                        <div key={image.sys.id} className="overflow-hidden">
                            <Image
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
                    ))}
                </div>
            </div>
        </main>
    );
}
