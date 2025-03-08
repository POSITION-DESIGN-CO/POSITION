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

interface ProjectGridProps {
    projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-1 gap-y-6 gap-x-36 md:grid-cols-2 lg:grid-cols-6">
            {projects.map((project) => (
                <Link
                    key={project.sys.id}
                    href={`/projects/${project.sys.id}`}
                    className={`group block transition-opacity duration-300 ${
                        hoveredId && hoveredId !== project.sys.id
                            ? "opacity-10"
                            : "opacity-100"
                    }`}
                    onMouseEnter={() => setHoveredId(project.sys.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    <div className={`overflow-hidden`}>
                        <Image
                            src={project.thumbnail.url || "/placeholder.svg"}
                            alt={project.title}
                            width={project.thumbnail.width}
                            height={project.thumbnail.height}
                            className="transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="mt-2">
                        <h3 className="text-sm">{project.title}</h3>
                        <p className="text-sm text-gray-600">
                            {project.category}, {project.year}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
