"use client";

import { useRef, useEffect } from "react";
import { useProjectsStore } from "@/store";
import type { Project } from "@/lib/contentful-models";
import { dynamicBlurDataUrl } from "@/lib/helper";

interface StoreInitializerProps {
    projects: Project[];
    categories: string[] | null;
}

export function StoreInitializer({
    projects,
    categories,
}: StoreInitializerProps) {
    const initialized = useRef(false);
    const { setProjects, setCategories } = useProjectsStore();

    useEffect(() => {
        if (!initialized.current && categories && projects) {
            setProjects(projects);
            setCategories(categories);
            initialized.current = true;
        }
    }, [projects, categories, setProjects, setCategories]);

    return null;
}
