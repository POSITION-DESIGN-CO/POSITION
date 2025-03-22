import Image from "next/image";

interface EditorialImageProps {
    image: {
        url: string;
        width: number;
        height: number;
    };
    title: string | null;
    description?: string | null;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export function EditorialImage({
    image,
    title,
    description,
    onMouseEnter,
    onMouseLeave,
}: EditorialImageProps) {
    return (
        <>
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={image.url || "/placeholder.svg"}
                    alt={title || "Editorial image"}
                    fill
                    className="w-full h-full object-cover grayscale"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            </div>
            {title && (
                <div className="mt-2">
                    <h2 className="text-sm">{title}</h2>
                    {description && (
                        <p className="text-xs w-3/4">{description}</p>
                    )}
                </div>
            )}
        </>
    );
}
