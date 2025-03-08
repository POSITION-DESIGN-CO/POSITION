"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function ViewToggle() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const view = searchParams.get("view") || "grid";
    const category = searchParams.get("category") || "All";

    const setView = (newView: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("view", newView);
        router.push(`/projects?${params.toString()}`);
    };

    return (
        <div className="flex border border-gray-300">
            <button
                className={cn(
                    "rounded-none border-r border-gray-300 px-4 py-2 text-sm font-medium",
                    view === "grid"
                        ? "bg-gray-100"
                        : "bg-white hover:bg-gray-50"
                )}
                onClick={() => setView("grid")}
            >
                Grid
            </button>
            <button
                className={cn(
                    "rounded-none px-4 py-2 text-sm font-medium",
                    view === "list"
                        ? "bg-gray-100"
                        : "bg-white hover:bg-gray-50"
                )}
                onClick={() => setView("list")}
            >
                List
            </button>
        </div>
    );
}
