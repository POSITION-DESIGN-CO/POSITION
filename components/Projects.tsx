"use client";

import { ClientSideProjectsRenderer } from "@/components/client-side-projects-renderer";
import { ViewToggle } from "@/components/view-toggle";
import { useRef } from "react";
export interface Animations {
    gridMov: string;
    gridWebm: string;
    listMov: string;
    listWebm: string;
}

export default function Projects({ animations }: { animations: Animations }) {
    const filterRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div className="fixed md:top-4 right-4 top-[53px] z-10">
                <ViewToggle filterRef={filterRef} />
            </div>
            <div className="md:my-24 my-28">
                <ClientSideProjectsRenderer
                    filterRef={filterRef}
                    animations={animations}
                />
            </div>
        </>
    );
}
