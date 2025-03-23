"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import GetWindowDimensions from "@/lib/helper";
import ClientAnimation from "../Animations/ClientAnimation";

type Project = {
    sys: { id: string };
    title: string;
    category: string;
    slug: string;
    year: string;
    thumbnail: {
        url: string;
        width: number;
        height: number;
    };
    location?: string | null;
};

interface ProjectGridProps {
    projects: Project[];
    projectGridAnimationWebm: string;
    projectGridAnimationMov: string;
}

export function ProjectGrid({
    projects,
    projectGridAnimationMov,
    projectGridAnimationWebm,
}: ProjectGridProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const { windowWidth } = GetWindowDimensions();

    return (
        <div className="grid gap-y-6 md:gap-x-24 gap-x-10 grid-cols-auto-fill-100">
            {projects.map((project) => (
                <Link
                    key={project.sys.id}
                    href={`/projects/${project.slug}`}
                    className={`group block transition-opacity duration-1000 ease-in-out ${
                        hoveredId &&
                        hoveredId !== project.sys.id &&
                        windowWidth > 1024
                            ? "opacity-20"
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
                            className="transition-transform duration-300"
                            priority
                        />
                    </div>
                    <div className="mt-2">
                        <h3 className="text-sm">{project.title}</h3>
                        <p
                            className={`text-xs text-gray-500 duration-300 ease-in-out ${
                                hoveredId !== project.sys.id &&
                                windowWidth > 1024 &&
                                "opacity-0"
                            }`}
                        >
                            {project.category}, {project.year}
                        </p>
                    </div>
                </Link>
            ))}

            <ClientAnimation
                grid
                movUrl={projectGridAnimationMov}
                webmUrl={projectGridAnimationWebm}
            />
        </div>
    );
}
