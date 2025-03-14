"use client";

import Link from "next/link";
import { useState } from "react";
import { HoverImage } from "./hover-image";

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

    return (
        <div className="w-full">
            <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-2 gap-4 text-sm">
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
                    <Link
                        key={project.sys.id}
                        href={`/projects/${project.sys.id}`}
                        className={`transition-opacity duration-100 ${
                            hoveredId && hoveredId !== project.sys.id
                                ? "opacity-10"
                                : "opacity-100"
                        } py-[2px] group grid lg:grid-cols-12 md:grid-cols-6 grid-cols-2 gap-4 relative text-sm lg:text-base`}
                        onMouseEnter={() => setHoveredId(project.sys.id)}
                        onMouseLeave={() => setHoveredId(null)}
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
                        {project.thumbnail && hoveredId === project.sys.id && (
                            <HoverImage
                                image={project.thumbnail}
                                isVisible={hoveredId === project.sys.id}
                                alt={project.title}
                            />
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}
