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

    return view === "grid" ? (
        <ProjectGrid projects={filteredProjects} />
    ) : (
        <ProjectList projects={filteredProjects} filterRef={filterRef} />
    );
}
