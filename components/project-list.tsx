"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HoverImage } from "./hover-image";
import Image from "next/image";

type Project = {
    sys: { id: string };
    title: string;
    category: string;
    year: string;
    thumbnail: {
        url: string;
        width: number;
        height: number;
    };
    location: string;
};

interface ProjectListProps {
    projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const projectRef = useRef<HTMLDivElement>(null);

    const handleProjectClick = (e: React.MouseEvent, projectId: string) => {
        if (window.innerWidth < 1023) {
            if (expandedId !== projectId) {
                e.preventDefault();
                setExpandedId(projectId);
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                expandedId &&
                projectRef.current &&
                !projectRef.current.contains(event.target as Node)
            ) {
                setExpandedId(null);
            }
        };
        if (expandedId) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [expandedId]);

    return (
        <div className="w-full" ref={projectRef}>
            <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-2 gap-4 lg:text-sm text-xs">
                <div className="lg:col-span-3 md:col-span-2 col-span-1">
                    Project
                </div>
                <div className="lg:col-span-2 col-span-2 hidden md:block">
                    Location
                </div>
                <div className="lg:col-span-5 md:col-span-1 col-span-1 md:block flex place-content-end">
                    Category
                </div>
                <div className="lg:col-span-2 md:col-span-1 place-self-end hidden md:block">
                    Year
                </div>
            </div>
            <div className="py-4">
                {projects.map((project) => (
                    <>
                        <Link
                            key={project.sys.id}
                            href={`/projects/${project.sys.id}`}
                            className={`transition-opacity duration-100 ${
                                (!expandedId &&
                                    hoveredId &&
                                    hoveredId !== project.sys.id) ||
                                (expandedId && expandedId !== project.sys.id)
                                    ? "opacity-10"
                                    : "opacity-100"
                            } py-[2px] group grid lg:grid-cols-12 md:grid-cols-6 grid-cols-2 gap-4 relative text-sm lg:text-base`}
                            onMouseEnter={() => setHoveredId(project.sys.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={(e) =>
                                handleProjectClick(e, project.sys.id)
                            }
                        >
                            <div className="lg:col-span-3 md:col-span-2 col-span-1">
                                <span>{project.title}</span>
                            </div>
                            <div className="lg:col-span-2 col-span-2 hidden md:block">
                                {project.location}
                            </div>
                            <div className="lg:col-span-5 md:col-span-1 col-span-1 md:block flex place-content-end">
                                {project.category}
                            </div>
                            <div className="lg:col-span-2 md:col-span-1 place-self-end hidden md:block">
                                <span>{project.year}</span>
                            </div>
                            {project.thumbnail &&
                                hoveredId === project.sys.id && (
                                    <HoverImage
                                        image={project.thumbnail}
                                        isVisible={hoveredId === project.sys.id}
                                        alt={project.title}
                                    />
                                )}
                        </Link>
                        {project.thumbnail && expandedId === project.sys.id && (
                            <Link
                                href={`/projects/${project.sys.id}`}
                                onClick={(e) =>
                                    handleProjectClick(e, project.sys.id)
                                }
                                className="flex flex-col mb-2"
                            >
                                <div
                                    className={`${
                                        project.thumbnail.width >=
                                        project.thumbnail.height
                                            ? "sm:w-1/2 w-full"
                                            : "sm:w-1/3 w-1/2"
                                    } lg:hidden mt-1 mb-2 self-center`}
                                >
                                    <Image
                                        width={project.thumbnail.width}
                                        height={project.thumbnail.height}
                                        src={project.thumbnail.url}
                                        alt={project.title}
                                        className="w-full h-auto"
                                    />
                                </div>
                                <aside className="flex justify-between text-xs">
                                    <div className="col-span-1">
                                        {project.location}
                                    </div>
                                    <div className="col-span-1 place-self-end">
                                        <span>{project.year}</span>
                                    </div>
                                </aside>
                            </Link>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
}
