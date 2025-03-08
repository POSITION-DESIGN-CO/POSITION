"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
                <div className="col-span-4">Project</div>
                <div className="col-span-2">Year</div>
                <div className="col-span-3">Category</div>
                <div className="col-span-3 place-self-end">Location</div>
            </div>
            <div className="py-4">
                {projects.map((project) => (
                    <Link
                        key={project.sys.id}
                        href={`/projects/${project.sys.id}`}
                        className="py-1 group grid grid-cols-12 gap-4 relative"
                        onMouseEnter={() => setHoveredId(project.sys.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div className="col-span-4">
                            <span className="hover:underline">
                                {project.title}
                            </span>
                        </div>
                        <div className="col-span-2">{project.year}</div>
                        <div className="col-span-3">{project.category}</div>
                        <div className="col-span-3 place-content-end flex items-center">
                            <span>{project.location}</span>
                            {project.thumbnail &&
                                hoveredId === project.sys.id && (
                                    <div className="absolute top-0 right-0 h-48 w-72 overflow-hidden z-50">
                                        <Image
                                            src={
                                                project.thumbnail.url ||
                                                "/placeholder.svg"
                                            }
                                            alt={project.title}
                                            width={project.thumbnail.width}
                                            height={project.thumbnail.height}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
