import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/contentful";
import { cn } from "@/lib/utils";

export default async function Home() {
    const { items: projects } = await getProjects();
    // Take only the first 7 projects for the homepage
    const featuredProjects = projects.slice(0, 7);

    const gridConfigurations = [
        { colSpan: "col-span-12 md:col-span-3 place-content-end" },
        { colSpan: "col-span-12 md:col-span-4 place-content-end" },
        {
            colSpan: "col-span-12 md:col-span-2 place-content-end",
            height: "h-auto",
            isText: true,
        },
        { colSpan: "col-span-12 md:col-span-3 place-content-end" },
        {
            colSpan: "col-span-12 md:col-span-3",
        },
        { colSpan: "col-span-12 md:col-span-3 place-content-end" },
        { colSpan: "col-span-12 md:col-span-6" },
    ];

    return (
        <main className="min-h-screen p-4">
            {/* <div className="mx-auto max-w-7xl"> */}
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                {gridConfigurations.map((config, index) => {
                    if (index === 2 && config.isText) {
                        return (
                            <div key="about-text" className={config.colSpan}>
                                <div className="">
                                    <p className="text-sm">
                                        POSITION is an architectural practice
                                        founded by Poyao Shih in Brooklyn, New
                                        York. The studio explores ideas across
                                        different disciplines and scales,
                                        focusing on responding to contemporary
                                        architectural issues through innovative
                                        forms and materials.
                                    </p>
                                </div>
                            </div>
                        );
                    }

                    if (index >= featuredProjects.length) return null;
                    const project = featuredProjects[index];

                    return (
                        <div key={project.sys.id} className={config.colSpan}>
                            <Link
                                href={`/projects/${project.sys.id}`}
                                className="group block"
                            >
                                <div className="overflow-hidden">
                                    <Image
                                        src={
                                            project.thumbnail.url ||
                                            "/placeholder.svg"
                                        }
                                        alt={project.title}
                                        width={project.thumbnail.width}
                                        height={project.thumbnail.height}
                                        className={cn(
                                            config.height,
                                            "w-full md:max-h-96 lg:max-h-[50rem] object-cover transition-transform duration-300 group-hover:scale-105"
                                        )}
                                    />
                                </div>
                                <div className="mt-2">
                                    <h2 className="text-sm">{project.title}</h2>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
