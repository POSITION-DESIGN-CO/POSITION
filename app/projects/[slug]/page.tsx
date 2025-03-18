import Image from "next/image";
import { getProjectBySlug } from "@/lib/contentful";
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
    params: { slug: string };
}) {
    // const getGridConfig = (item: any, index: number) => {
    //     const configs = [
    //         {
    //             colSpan: "col-span-12 md:col-span-6 place-content-end",
    //         },
    //         {
    //             colSpan:
    //                 "col-span-12 md:col-span-4 md:col-start-9 place-self-end",
    //         },
    //         {
    //             colSpan: "col-span-12 md:col-start-2 md:col-end-7",
    //         },
    //         {
    //             colSpan:
    //                 "col-span-12 md:col-span-4 md:col-start-7 place-self-end",
    //         },
    //         {
    //             colSpan: "col-span-12 md:col-span-5",
    //         },
    //         {
    //             colSpan:
    //                 "col-span-12 md:col-span-4 md:col-start-8 place-self-end",
    //         },
    //     ];
    //     return configs[index % configs.length];
    // };
    const project = await getProjectBySlug(params.slug);

    if (!project) {
        return (
            <main className="min-h-[calc(100vh-50px)] flex justify-center items-center p-8">
                <h1 className="text-xl">project not found...</h1>
            </main>
        );
    }

    return (
        <main className="sm:min-h-[calc(100vh-50px)] min-h-[calc(100vh-150px)] p-4">
            {/* <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-1 pt-40 gap-6 text-sm max-w-7xl">
                <div className="col-span-1 lg:col-span-3 md:col-span-2">
                    <p>{project.title}</p>
                    <Image
                        priority
                        src={project.thumbnail.url || "/placeholder.svg"}
                        alt={project.title}
                        width={project.thumbnail.width}
                        height={project.thumbnail.height}
                        className="w-1/2 hidden lg:block object-cover"
                    />
                </div>
                <p className="col-span-1 md:col-span-2">
                    <span className="block text-gray-400">Category</span>
                    {project.category}
                </p>
                <p className="col-span-1 md:col-span-2">
                    <span className="block text-gray-400">Location</span>
                    {project.location}
                </p>
                {project.team && (
                    <p className="col-span-1 md:col-span-2">
                        <span className="block text-gray-400">Position</span>
                        {project.position}
                    </p>
                )}
                {project.team && (
                    <div className="col-span-1 md:col-span-2">
                        <span className="block text-gray-400">Team</span>
                        <ul>
                            {project.team?.map((person: string) => (
                                <li key={person}>{person}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <p className="col-span-1 md:col-span-1">
                    <span className="block text-gray-400">Year</span>
                    {project.year}
                </p>
            </div> */}

            <div className="grid md:grid-cols-12 grid-col-1 mt-24 mb-16 text-sm max-w-7xl">
                <p className="col-span-1 md:col-span-6 pt-2 lg:p-0">
                    {project.description}
                </p>
            </div>
            <div className="grid md:grid-cols-12 grid-col-1 text-sm mb-16">
                <section className="grid sm:grid-cols-6 grid-cols-3 sm:col-start-3 sm:col-span-8 gap-0">
                    <p className="text-gray-400 mb-5">Overview</p>
                </section>
                <section className="grid sm:grid-cols-6 grid-cols-3 sm:col-start-3 sm:col-span-8 gap-0">
                    <aside className="self-start">
                        <p className="text-gray-400">Project</p>
                        <p className="text-gray-400">Year</p>
                        <p className="text-gray-400">Category</p>
                        <p className="text-gray-400">Location</p>
                        <p className="text-gray-400">Position</p>
                        <p className="text-gray-400">Team</p>
                    </aside>
                    <aside className="sm:col-span-4 col-span-2 self-end">
                        <p>{project.title}</p>
                        <p>{project.year}</p>
                        <p>{project.category}</p>
                        <p>{project.location}</p>
                        <p>{project.position}</p>
                        <ul className="flex gap-0 flex-col sm:flex-row sm:gap-1">
                            {project.team?.map(
                                (person: string, index: number) => (
                                    <li key={person}>
                                        <span>
                                            {person}
                                            {index !==
                                                project.team.length - 1 &&
                                                ","}{" "}
                                        </span>
                                    </li>
                                )
                            )}
                        </ul>
                    </aside>
                </section>
            </div>
            <div className="fixed md:top-4 right-4 top-[53px]">
                <div className="grid grid-cols-3 md:grid-cols-1 border border-gray-800 bg-white justify-center md:w-[calc(320px/3)] w-[calc(100vw-32px)]">
                    <div className="md:hidden block"></div>
                    <div className="md:hidden block"></div>
                    <Link
                        href="/projects"
                        className="rounded-none text-center border-gray-800 md:border-l-0 border-l px-6 py-2 text-sm transition-all duration-300 hover:text-black"
                    >
                        Back
                    </Link>
                </div>
            </div>

            <div className="gap-2 grid md:grid-cols-12">
                {project.galleryCollection.items.map(
                    (image: Image, index: number) => {
                        // const config = getGridConfig(image, index);
                        return (
                            <div
                                key={image.sys.id}
                                className="md:col-start-3 md:col-span-8 my-3 flex justify-center"
                            >
                                <Image
                                    priority
                                    src={image.url || "/placeholder.svg"}
                                    alt={image.title}
                                    width={image.width}
                                    height={image.height}
                                    className={`h-auto object-cover ${
                                        image.width > image.height
                                            ? "w-full"
                                            : "w-3/4"
                                    }`}
                                />
                            </div>
                        );
                    }
                )}
            </div>
        </main>
    );
}
