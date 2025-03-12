import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Project } from "./lib/contentful-models";

interface ProjectsState {
    category: string;
    view: "grid" | "list";

    projects: Project[];
    categories: string[];

    setCategory: (category: string) => void;
    setView: (view: "grid" | "list") => void;
    setProjects: (projects: Project[]) => void;
    setCategories: (categories: string[]) => void;

    getFilteredProjects: () => Project[];
}

export const useProjectsStore = create<ProjectsState>()(
    persist(
        (set, get) => ({
            category: "All",
            view: "grid",
            projects: [],
            categories: ["All"],
            setCategory: (category) => set({ category }),
            setView: (view) => set({ view }),
            setProjects: (projects) => set({ projects }),
            setCategories: (categories) => set({ categories }),
            getFilteredProjects: () => {
                const { projects, category } = get();
                if (category === "All") {
                    return projects;
                }
                return projects.filter(
                    (project) => project.category === category
                );
            },
        }),
        {
            name: "projects-storage",
            partialize: (state) => ({
                category: state.category,
                view: state.view,
            }),
        }
    )
);
