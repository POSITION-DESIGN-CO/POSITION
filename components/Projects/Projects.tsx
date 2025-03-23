"use client";

import { ViewToggle } from "@/components/Projects/ViewToggle";
import { useProjectsStore } from "@/store";
import { useRef } from "react";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectList } from "./ProjectList";
export interface Animations {
    gridMov: string;
    gridWebm: string;
    listMov: string;
    listWebm: string;
}

export default function Projects({ animations }: { animations: Animations }) {
    const filterRef = useRef<HTMLDivElement>(null);
    const { view, getFilteredProjects } = useProjectsStore();
    const filteredProjects = getFilteredProjects();

    if (!filteredProjects) {
        return (
            <main className="min-h-[calc(100vh-50px)] flex justify-center items-center p-8">
                <h1 className="text-xl">no project found...</h1>
            </main>
        );
    }

    return (
        <>
            <div className="fixed md:top-4 right-4 top-[53px] z-10">
                <ViewToggle filterRef={filterRef} />
            </div>
            <div className="md:my-24 my-28">
                {view === "grid" ? (
                    <ProjectGrid
                        projects={filteredProjects.sort(
                            (a, b) => Number(b.year) - Number(a.year)
                        )}
                        projectGridAnimationMov={animations.gridMov}
                        projectGridAnimationWebm={animations.gridWebm}
                    />
                ) : (
                    <ProjectList
                        projects={filteredProjects.sort(
                            (a, b) => Number(b.year) - Number(a.year)
                        )}
                        filterRef={filterRef}
                        projectListAnimationMov={animations.listMov}
                        projectListAnimationWebm={animations.listWebm}
                    />
                )}
            </div>
        </>
    );
}
