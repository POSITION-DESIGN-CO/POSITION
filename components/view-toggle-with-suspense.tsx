"use client";

import { Suspense } from "react";
import { ViewToggle } from "./view-toggle";

export function ViewToggleWithSuspense({ filterRef }: { filterRef: any }) {
    return (
        <Suspense fallback={<ViewToggleFallback />}>
            <ViewToggle filterRef={filterRef} />
        </Suspense>
    );
}

function ViewToggleFallback() {
    return (
        <div className="flex border border-gray-300">
            <div className="rounded-none border-r border-gray-300 px-4 py-2 text-sm font-medium h-10 flex items-center">
                Grid
            </div>
            <div className="rounded-none px-4 py-2 text-sm font-medium h-10 flex items-center">
                List
            </div>
        </div>
    );
}
