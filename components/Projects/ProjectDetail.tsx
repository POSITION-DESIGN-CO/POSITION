"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ClientAnimation from "@/components/Animations/ClientAnimation";
import { Project } from "@/lib/contentful-models";

interface ImageProps {
    title: string;
    url: string;
    blurDataURL?: string;
    width: number;
    height: number;
    sys: { id: string };
}
interface ProjectDetailProps {
    project: Project;
    projectGridAnimationWebm: {
        url: string;
    };
    projectGridAnimationMov: {
        url: string;
    };
    referer: string;
}

export const ProjectDetail = ({
    project,
    projectGridAnimationWebm,
    projectGridAnimationMov,
    referer,
}: ProjectDetailProps) => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return null;
    }

    return (
        <>
            <div className="grid md:grid-cols-12 grid-cols-12 mt-24 mb-16 max-w-7xl lg:text-lg text-sm">
                <p className="col-span-10 md:col-span-8 pt-2 lg:p-0 leading-[1.3]">
                    {project.description}
                </p>
            </div>
            <div className="grid md:grid-cols-12 grid-col-1 text-sm mb-16">
                <section className="grid sm:grid-cols-6 grid-cols-3 lg:col-start-3 lg:col-span-8 col-start-2 md:col-start-2 col-span-7 gap-0">
                    <p className="text-gray-400 mb-5">Overview</p>
                </section>
                <section className="grid sm:grid-cols-6 grid-cols-3 lg:col-start-3 lg:col-span-8 col-start-2 md:col-start-2 col-span-7 gap-0">
                    <aside className="self-start">
                        <p className="text-gray-400">Project</p>
                        <p className="text-gray-400">Year</p>
                        <p className="text-gray-400">Category</p>
                        {project.location && (
                            <p className="text-gray-400">Location</p>
                        )}
                        {project.position && (
                            <p className="text-gray-400">Position</p>
                        )}
                        {project.team?.length && (
                            <p className="text-gray-400">Team</p>
                        )}
                    </aside>
                    <aside className="sm:col-span-4 col-span-2 self-start">
                        <p>{project.title}</p>
                        <p>{project.year}</p>
                        <p>{project.category}</p>
                        {project.location && <p>{project.location}</p>}
                        {project.position && <p>{project.position}</p>}
                        {project.team?.length && (
                            <ul className="flex gap-0 flex-wrap flex-col sm:flex-row sm:gap-x-1">
                                {project.team?.map(
                                    (person: string, index: number) => (
                                        <li key={person}>
                                            <span>
                                                {person}
                                                {project.team &&
                                                    index !==
                                                        project.team.length -
                                                            1 &&
                                                    ","}{" "}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ul>
                        )}
                    </aside>
                </section>
            </div>
            <div className="fixed md:top-4 right-4 top-[53px]">
                <div className="grid grid-cols-3 md:grid-cols-1 border border-[#3B3B3B] bg-white justify-center md:w-[calc(320px/3)] w-[calc(100vw-32px)]">
                    <div className="md:hidden block"></div>
                    <div className="md:hidden block"></div>
                    <Link
                        href={referer}
                        className="rounded-none text-center border-[#3B3B3B] md:border-l-0 border-l px-6 py-2 text-sm transition-all duration-300 hover:text-gray-400"
                    >
                        Back
                    </Link>
                </div>
            </div>
            <div className="gap-2 grid grid-cols-12">
                {project.galleryCollection.items.map(
                    (image: ImageProps, index: number) => {
                        return (
                            <div
                                key={image.sys.id}
                                className="lg:col-start-3 lg:col-span-8 sm:col-start-2 col-start-1 col-span-10 my-3 flex justify-center"
                            >
                                <Image
                                    blurDataURL={image.blurDataURL || ""}
                                    placeholder={
                                        image.blurDataURL ? "blur" : "empty"
                                    }
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
            <ClientAnimation
                hasNoGradient
                grid
                webmUrl={projectGridAnimationWebm?.url}
                movUrl={projectGridAnimationMov?.url}
            />
        </>
    );
};
