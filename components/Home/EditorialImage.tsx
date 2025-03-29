import Image from "next/image";
import Link from "next/link";

interface EditorialImageProps {
    image: {
        url: string;
        width: number;
        height: number;
    };
    title: string | null;
    link: string;
    description?: string | null;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export function EditorialImage({
    image,
    title,
    description,
    link,
    onMouseEnter,
    onMouseLeave,
}: EditorialImageProps) {
    return (
        <>
            <div className="relative aspect-square overflow-hidden">
                <Link href={link || "#"} target="_blank">
                    <Image
                        src={image.url || "/placeholder.svg"}
                        alt={title || "Editorial image"}
                        fill
                        className="w-full h-full object-cover grayscale"
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        priority
                    />
                </Link>
            </div>
            {title && (
                <div className="mt-2">
                    <h2 className="text-sm">{title}</h2>
                    {description && (
                        <p className="text-xs w-full">{description}</p>
                    )}
                </div>
            )}
        </>
    );
}
