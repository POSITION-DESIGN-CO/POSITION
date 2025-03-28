"use client";

import { ViewToggle } from "@/components/Projects/ViewToggle";
import { useProjectsStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectList } from "./ProjectList";
import { getProjectsByCategory } from "@/lib/contentful";
export interface Animations {
    gridMov: string;
    gridWebm: string;
    listMov: string;
    listWebm: string;
}

export default function Projects({ animations }: { animations: Animations }) {
    const filterRef = useRef<HTMLDivElement>(null);
    const { view, setView, getFilteredProjects, category } = useProjectsStore();
    const filteredProjects = getFilteredProjects();
    const [projects, setProjects] = useState(filteredProjects);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        async function fetchProjects() {
            const res = await getProjectsByCategory(category);
            setProjects(res.items);
        }
        fetchProjects();
    }, [category]);

    useEffect(() => {
        setView("grid");
    }, []);

    if (!filteredProjects) {
        return (
            <main className="min-h-[calc(100vh-50px)] flex justify-center items-center p-8">
                <h1 className="text-xl">no project found...</h1>
            </main>
        );
    }

    if (!isHydrated) {
        return null;
    }

    return (
        <>
            <div className="fixed md:top-4 right-4 top-[53px] z-10">
                <ViewToggle filterRef={filterRef} />
            </div>
            <div className="md:my-24 my-28">
                {view === "grid" ? (
                    <ProjectGrid
                        projects={projects.sort(
                            (a, b) => Number(b.year) - Number(a.year)
                        )}
                        projectGridAnimationMov={animations.gridMov}
                        projectGridAnimationWebm={animations.gridWebm}
                    />
                ) : (
                    <ProjectList
                        projects={projects.sort(
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
