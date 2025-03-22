import Link from "next/link";
import { Fragment, RefObject, useEffect, useRef, useState } from "react";
import { HoverImage } from "./hover-image";
import Image from "next/image";
import { useNavigationMenuRef } from "@/lib/useNavigationMenuRef";
import ClientAnimation from "./ClientAnimation";

type Project = {
    sys: { id: string };
    title: string;
    slug: string;
    category: string;
    year: string;
    thumbnail: {
        url: string;
        width: number;
        height: number;
    };
    location?: string | null;
};

interface ProjectListProps {
    projects: Project[];
    filterRef: RefObject<HTMLDivElement>;
    projectListAnimationMov: string;
    projectListAnimationWebm: string;
}

export function ProjectList({
    projects,
    filterRef,
    projectListAnimationMov,
    projectListAnimationWebm,
}: ProjectListProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const projectRef = useRef<HTMLDivElement>(null);
    const menuRef = useNavigationMenuRef();

    const handleProjectClick = (e: React.MouseEvent, projectId: string) => {
        if (window.innerWidth < 1023) {
            if (expandedId !== projectId) {
                e.preventDefault();
                setExpandedId(projectId);
            } else {
                e.preventDefault();
                setExpandedId(null);
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                expandedId &&
                filterRef.current &&
                projectRef.current &&
                menuRef?.current &&
                !filterRef.current.contains(event.target as Node) &&
                !menuRef.current.contains(event.target as Node) &&
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
                    <Fragment key={project.sys.id}>
                        <Link
                            key={project.sys.id}
                            href={`/projects/${project.slug}`}
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
                            {/* {project.thumbnail &&
                                hoveredId === project.sys.id && ( */}
                            <HoverImage
                                image={project.thumbnail}
                                isVisible={hoveredId === project.sys.id}
                                alt={project.title}
                            />
                            {/* )} */}
                        </Link>
                        {/* {project.thumbnail && expandedId === project.sys.id && ( */}
                        <div
                            onClick={(e) =>
                                handleProjectClick(e, project.sys.id)
                            }
                            className="flex flex-col mb-0 transition-all duration-300 ease-in-out"
                            style={{
                                height:
                                    project.thumbnail &&
                                    expandedId === project.sys.id
                                        ? "auto"
                                        : 0,

                                opacity:
                                    project.thumbnail &&
                                    expandedId === project.sys.id
                                        ? 1
                                        : 0,
                            }}
                        >
                            {project.thumbnail &&
                                expandedId === project.sys.id && (
                                    <>
                                        <aside className="flex justify-between text-xs">
                                            <div className="col-span-1">
                                                {project.location}
                                            </div>
                                            <div className="col-span-1 place-self-end">
                                                <span>{project.year}</span>
                                            </div>
                                        </aside>

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
                                                height={
                                                    project.thumbnail.height
                                                }
                                                src={project.thumbnail.url}
                                                alt={project.title}
                                                className="w-full h-auto mb-3"
                                                priority
                                            />
                                        </div>
                                        <Link
                                            onClick={(e) => e.stopPropagation()}
                                            href={`/projects/${project.slug}`}
                                            className="rounded-none text-center border-[#3B3B3B] mb-3 border bg-white px-[20px] py-[6px] self-center text-sm transition-all duration-300 hover:text-[#3B3B3B]"
                                        >
                                            View
                                        </Link>
                                    </>
                                )}
                        </div>
                        {/* )} */}
                    </Fragment>
                ))}
            </div>
            <ClientAnimation
                movUrl={projectListAnimationMov}
                webmUrl={projectListAnimationWebm}
            />
        </div>
    );
}
