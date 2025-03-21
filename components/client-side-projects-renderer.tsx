import { useProjectsStore } from "@/store";
import { ProjectGrid } from "./project-grid";
import { ProjectList } from "./project-list";
import { RefObject } from "react";

export function ClientSideProjectsRenderer({
    filterRef,
}: {
    filterRef: RefObject<HTMLDivElement>;
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
        <ProjectGrid projects={filteredProjects} />
    ) : (
        <ProjectList projects={filteredProjects} filterRef={filterRef} />
    );
}
