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
            <div className="grid grid-cols-12 gap-4 text-sm">
                <div className="col-span-3">Project</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-5">Category</div>
                <div className="col-span-2 place-self-end">Year</div>
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
                        } py-0 group grid grid-cols-12 gap-4 relative`}
                        onMouseEnter={() => setHoveredId(project.sys.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div className="col-span-3">
                            <span className="hover:underline">
                                {project.title}
                            </span>
                        </div>
                        <div className="col-span-2">{project.location}</div>
                        <div className="col-span-5">{project.category}</div>
                        <div className="col-span-2 place-content-end flex items-center">
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
