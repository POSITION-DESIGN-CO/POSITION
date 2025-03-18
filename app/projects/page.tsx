"use client";

import { ClientSideProjectsRenderer } from "@/components/client-side-projects-renderer";
import { ViewToggle } from "@/components/view-toggle";
// import { ViewToggleWithSuspense } from "@/components/view-toggle-with-suspense";
import { useRef } from "react";

export default function ProjectsPage() {
    const filterRef = useRef<HTMLDivElement>(null);

    return (
        <main className="sm:min-h-[calc(100vh-50px)] min-h-[calc(100vh-150px)] p-4">
            <div className="fixed md:top-4 right-4 top-[53px] z-10">
                {/* <ViewToggleWithSuspense filterRef={filterRef} /> */}
                <ViewToggle filterRef={filterRef} />
            </div>
            <div className="md:my-24 my-28">
                <ClientSideProjectsRenderer filterRef={filterRef} />
            </div>
        </main>
    );
}
