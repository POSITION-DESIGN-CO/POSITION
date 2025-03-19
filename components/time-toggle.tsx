"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import GetWindowDimensions from "@/lib/helper";
export default function TimeToggle() {
    const buttonClasses =
        "rounded-none border-[#3B3B3B] px-2 py-2 text-sm transition-all duration-300 hover:text-[#3B3B3B]";

    const [location, setLocation] = useState("taiwan");
    const { windowWidth } = GetWindowDimensions();
    function getTimeInZone(timezone: string) {
        const now = new Date();
        return now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: timezone,
        });
    }
    return windowWidth > 767 ? (
        <div className="grid grid-cols-3 border border-[#3B3B3B] bg-white justify-self-end md:w-80 w-[calc(100vw-32px)]">
            <button
                className={cn(
                    buttonClasses,
                    "border-r",
                    location === "nyc" ? "text-[#3B3B3B]" : "text-gray-300"
                )}
                onClick={() => setLocation("nyc")}
            >
                NYC
            </button>
            <button
                className={cn(
                    buttonClasses,
                    "border-r",
                    location === "taiwan" ? "text-[#3B3B3B]" : "text-gray-300"
                )}
                onClick={() => setLocation("taiwan")}
            >
                Taipei
            </button>
            <button
                className={cn(
                    buttonClasses,
                    "text-[#3B3B3B] border-none flex items-center justify-center w-full"
                )}
            >
                {location === "taiwan"
                    ? getTimeInZone("Asia/Taipei").toLowerCase()
                    : getTimeInZone("America/New_York").toLowerCase()}
            </button>
        </div>
    ) : (
        <div className="grid grid-cols-5 border border-[#3B3B3B] bg-white justify-self-end md:w-80 w-[calc(100vw-32px)]">
            <button
                className={cn(
                    buttonClasses,
                    "text-[#3B3B3B] border-r col-span-3 flex items-center justify-center w-full"
                )}
            >
                {location === "taiwan"
                    ? getTimeInZone("Asia/Taipei").toLowerCase()
                    : getTimeInZone("America/New_York").toLowerCase()}
            </button>
            <button
                className={cn(
                    buttonClasses,
                    "border-r",
                    location === "nyc" ? "text-[#3B3B3B]" : "text-gray-300"
                )}
                onClick={() => setLocation("nyc")}
            >
                NYC
            </button>
            <button
                className={cn(
                    buttonClasses,
                    location === "taiwan"
                        ? "text-[#3B3B3B]"
                        : "text-gray-300 border-r-0"
                )}
                onClick={() => setLocation("taiwan")}
            >
                Taipei
            </button>
        </div>
    );
}
