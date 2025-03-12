"use client";

import { useRef, useEffect } from "react";
import { useProjectsStore } from "@/store";
import type { Project } from "@/lib/contentful-models";

interface StoreInitializerProps {
    projects: Project[];
    categories: string[];
}

export function StoreInitializer({
    projects,
    categories,
}: StoreInitializerProps) {
    const initialized = useRef(false);
    const { setProjects, setCategories } = useProjectsStore();

    useEffect(() => {
        if (!initialized.current) {
            setProjects(projects);
            setCategories(categories);
            initialized.current = true;
        }
    }, [projects, categories, setProjects, setCategories]);

    return null;
}
