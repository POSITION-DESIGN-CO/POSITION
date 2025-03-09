import Image from "next/image";

interface EditorialImageProps {
    image: {
        url: string;
        width: number;
        height: number;
    };
    title: string | null;
    description: string | null;
    size: string;
}

export function EditorialImage({
    image,
    title,
    description,
    size,
}: EditorialImageProps) {
    return (
        <div className="group block">
            <div className="overflow-hidden">
                <Image
                    src={image.url || "/placeholder.svg"}
                    alt={title || "Editorial image"}
                    width={image.width}
                    height={image.height}
                    className="w-full md:max-h-96 lg:max-h-[50rem] object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            {title && (
                <div className="mt-2">
                    <h2 className="text-sm">{title}</h2>
                    {description && (
                        <p className="text-xs text-gray-500">{description}</p>
                    )}
                </div>
            )}
        </div>
    );
}
