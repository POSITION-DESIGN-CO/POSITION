import { useProjectsStore } from "@/store";
import { ProjectGrid } from "./project-grid";
import { ProjectList } from "./project-list";
import { RefObject } from "react";
import { Animations } from "./Projects";

export function ClientSideProjectsRenderer({
    filterRef,
    animations,
}: {
    filterRef: RefObject<HTMLDivElement>;
    animations: Animations;
}) {
    const { view, getFilteredProjects } = useProjectsStore();
    const filteredProjects = getFilteredProjects();

    if (!filteredProjects) {
        return (
            <main className="min-h-[calc(100vh-50px)] flex justify-center items-center p-8">
                <h1 className="text-xl">no project found...</h1>
            </main>
        );
    }

    return view === "grid" ? (
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
    );
}
