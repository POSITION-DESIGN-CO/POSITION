import { dynamicBlurDataUrl } from "@/lib/helper";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProjectImageProps {
    thumbnail: {
        url: string;
        blurDataURL: string;
        width: number;
        height: number;
    };
    isHorizontal: boolean;
    title: string | null;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export function ProjectImage({
    onMouseEnter,
    onMouseLeave,
    thumbnail,
    title,
    isHorizontal,
}: ProjectImageProps) {
    return (
        <>
            <div
                className={cn(
                    isHorizontal ? "aspect-[5/3]" : "aspect-[4/5]",
                    "relative overflow-hidden bg-neutral-300"
                )}
            >
                <Image
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    blurDataURL={thumbnail.blurDataURL || ""}
                    placeholder={thumbnail.blurDataURL ? "blur" : "empty"}
                    src={thumbnail.url || "/placeholder.svg"}
                    alt={title || "Editorial image"}
                    fill
                    className="w-full h-full object-cover transition-transform duration-300 cursor-pointer"
                />
            </div>
        </>
    );
}
