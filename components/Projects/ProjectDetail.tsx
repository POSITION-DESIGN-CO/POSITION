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

interface OverviewRow {
    label: string;
    value?: string | string[] | null;
}

const NAMES_PER_LINE = 4;

// Comma-separated on desktop with at most four names per line, one name per line on mobile
const NameList = ({ names }: { names: string[] }) => {
    const lines: string[][] = [];
    for (let i = 0; i < names.length; i += NAMES_PER_LINE) {
        lines.push(names.slice(i, i + NAMES_PER_LINE));
    }

    return (
        <ul className="flex flex-col">
            {lines.map((line, lineIndex) => (
                <li
                    key={lineIndex}
                    className="flex flex-col sm:flex-row sm:gap-x-1"
                >
                    {line.map((name, index) => {
                        const isLastName =
                            lineIndex === lines.length - 1 &&
                            index === line.length - 1;
                        return (
                            <span key={`${name}-${index}`}>
                                {name}
                                {!isLastName && ","}
                            </span>
                        );
                    })}
                </li>
            ))}
        </ul>
    );
};

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

    // Optional rows are only shown when they have content
    const overviewRows: OverviewRow[] = [
        { label: "Project", value: project.title },
        { label: "Year", value: project.year },
        { label: "Category", value: project.category },
        { label: "Location", value: project.location },
        { label: "Position", value: project.position },
        { label: "Team", value: project.team },
        // Unpublished credit entries come back from Contentful as null
        ...(project.additionalCreditsCollection?.items ?? [])
            .filter(Boolean)
            .map((credit) => ({ label: credit.label, value: credit.names })),
    ].filter((row) =>
        Array.isArray(row.value) ? row.value.length > 0 : Boolean(row.value)
    );

    return (
        <>
            <div className="grid md:grid-cols-12 grid-cols-12 mt-24 mb-16 max-w-7xl lg:text-lg text-sm">
                <div className="col-span-10 md:col-span-8 pt-2 lg:p-0 leading-[1.3] space-y-[1.3em]">
                    {/* An empty line in Contentful starts a new paragraph, a single line break is kept as is */}
                    {project.description
                        .split(/\n\s*\n/)
                        .map((paragraph, index) => (
                            <p key={index} className="whitespace-pre-line">
                                {paragraph.trim()}
                            </p>
                        ))}
                </div>
            </div>
            <div className="grid md:grid-cols-12 grid-col-1 text-sm mb-16">
                <section className="grid sm:grid-cols-6 grid-cols-3 lg:col-start-3 lg:col-span-8 col-start-2 md:col-start-2 col-span-7 gap-0">
                    <p className="text-gray-400 mb-5">Overview</p>
                </section>
                <dl className="grid sm:grid-cols-6 grid-cols-3 lg:col-start-3 lg:col-span-8 col-start-2 md:col-start-2 col-span-7 gap-0">
                    {/* Label and value share a row, so multi-line values keep labels aligned */}
                    {overviewRows.map((row, index) => (
                        <div key={index} className="contents">
                            <dt className="text-gray-400 col-start-1 pr-2">
                                {row.label}
                            </dt>
                            <dd className="sm:col-span-4 col-span-2">
                                {Array.isArray(row.value) ? (
                                    <NameList names={row.value} />
                                ) : (
                                    row.value
                                )}
                            </dd>
                        </div>
                    ))}
                </dl>
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
