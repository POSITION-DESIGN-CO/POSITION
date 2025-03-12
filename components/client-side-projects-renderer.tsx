"use client";

import { useProjectsStore } from "@/store";
import { ProjectGrid } from "./project-grid";
import { ProjectList } from "./project-list";

export function ClientSideProjectsRenderer() {
    const { view, getFilteredProjects } = useProjectsStore();
    const filteredProjects = getFilteredProjects();

    return view === "grid" ? (
        <ProjectGrid projects={filteredProjects} />
    ) : (
        <ProjectList projects={filteredProjects} />
    );
}
