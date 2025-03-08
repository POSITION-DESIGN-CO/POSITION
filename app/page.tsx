import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/contentful";

export default async function Home() {
    const { items: projects } = await getProjects();
    // Take only the first 6 projects for the homepage
    const featuredProjects = projects.slice(0, 7);

    const gridConfigurations = [
        { colSpan: "col-span-12 md:col-span-3", height: "h-[200px]" },
        { colSpan: "col-span-12 md:col-span-6", height: "h-[400px]" },
        { colSpan: "col-span-12 md:col-span-3", height: "h-[200px]" },
        {
            colSpan: "col-span-12 md:col-span-9",
            height: "h-[300px]",
            hasDescription: true,
        },
        { colSpan: "col-span-12 md:col-span-8", height: "h-[300px]" },
        { colSpan: "col-span-12 md:col-span-4", height: "h-[300px]" },
        { colSpan: "col-span-12 md:col-span-4", height: "h-[250px]" },
        {
            colSpan: "col-span-12 md:col-span-8",
            height: "h-auto",
            isText: true,
        }, // About text
    ];

    return (
        <main className="min-h-screen bg-white p-8">
            {/* <div className="mx-auto max-w-7xl"> */}
            <div className="flex flex-wrap gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"> */}
                {featuredProjects.map((project) => (
                    <Link
                        key={project.sys.id}
                        href={`/projects/${project.sys.id}`}
                        className="group block"
                    >
                        <div className="overflow-hidden">
                            <Image
                                src={
                                    project.thumbnail.url || "/placeholder.svg"
                                }
                                alt={project.title}
                                width={project.thumbnail.width}
                                height={project.thumbnail.height}
                                className="transition-transform duration-300 group-hover:scale-105"
                                // className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="mt-2">
                            <h2 className="text-lg font-medium">
                                {project.title}
                            </h2>
                            {/* <p className="text-sm text-gray-600">
                                {project.category}, {project.year}
                            </p> */}
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-12 text-center">
                <Link
                    href="/projects"
                    className="inline-block border border-gray-300 px-6 py-3 text-sm font-medium hover:bg-gray-100"
                >
                    View All Projects
                </Link>
            </div>
        </main>
    );
}
