import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectImageProps {
    thumbnail: {
        url: string;
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
                    "relative overflow-hidden"
                )}
            >
                <Image
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    src={thumbnail.url || "/placeholder.svg"}
                    alt={title || "Editorial image"}
                    fill
                    className="w-full h-full object-cover transition-transform duration-300 cursor-pointer"
                />
            </div>
        </>
    );
}
