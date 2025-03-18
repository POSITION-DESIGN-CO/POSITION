"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export default function TimeToggle() {
    const buttonClasses =
        "rounded-none border-r border-gray-800 px-2 py-2 text-sm transition-all duration-300 hover:text-black";

    const [location, setLocation] = useState("taiwan");

    function getTimeInZone(timezone: string) {
        const now = new Date();
        return now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: timezone,
        });
    }
    return (
        <div className="grid grid-cols-3 border border-gray-800 bg-white justify-self-end md:w-80 w-[calc(100vw-32px)]">
            <button
                className={cn(
                    buttonClasses,
                    location === "nyc" ? "text-black" : "text-gray-300"
                )}
                onClick={() => setLocation("nyc")}
            >
                NYC
            </button>
            <button
                className={cn(
                    buttonClasses,
                    location === "taiwan" ? "text-black" : "text-gray-300"
                )}
                onClick={() => setLocation("taiwan")}
            >
                Taipei
            </button>
            <button
                className={cn(
                    buttonClasses,
                    "text-black border-none flex items-center justify-center w-full"
                )}
            >
                {location === "taiwan"
                    ? getTimeInZone("Asia/Taipei").toLowerCase()
                    : getTimeInZone("America/New_York").toLowerCase()}
            </button>
        </div>
    );
}
