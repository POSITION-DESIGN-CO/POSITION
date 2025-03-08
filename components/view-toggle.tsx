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
        <div className="flex border border-gray-800 bg-white">
            <button
                className={cn(
                    "rounded-none border-r border-gray-800 px-6 py-2 text-sm",
                    view === "grid" ? "text-black" : "text-gray-300"
                )}
                onClick={() => setView("grid")}
            >
                Grid
            </button>
            <button
                className={cn(
                    "rounded-none px-6 py-1 text-sm",
                    view === "list" ? "text-black" : "text-gray-300"
                )}
                onClick={() => setView("list")}
            >
                List
            </button>
        </div>
    );
}
