"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageDimensions {
    width: number;
    height: number;
    url: string;
}

interface HoverImageProps {
    image: ImageDimensions;
    isVisible: boolean;
    alt: string;
}

export function HoverImage({ image, isVisible, alt }: HoverImageProps) {
    const [containerWidth, setContainerWidth] = useState<number>(0);

    useEffect(() => {
        const updateWidth = () => {
            setContainerWidth(window.innerWidth);
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => {
            window.removeEventListener("resize", updateWidth);
        };
    }, []);

    const getImageStyle = () => {
        const isHorizontal = image.width >= image.height;
        const availableSpace = containerWidth * 0.5;

        if (isHorizontal) {
            const width = Math.min(availableSpace * 0.9, 1800);
            return {
                width: `${width}px`,
                height: "auto",
                maxHeight: "400px",
                objectFit: "contain" as const,
            };
        } else {
            const width = Math.min(availableSpace * 0.6, 600);
            return {
                width: `${width}px`,
                height: "auto",
                maxHeight: "600px",
                objectFit: "contain" as const,
            };
        }
    };

    return (
        <div
            style={{
                opacity: isVisible ? 1 : 0,
                pointerEvents: "none",
            }}
            className="transition-opacity duration-300 fixed top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
            <Image
                src={image.url || "/placeholder.svg"}
                alt={alt}
                width={image.width}
                height={image.height}
                style={getImageStyle()}
                className="object-contain"
                priority
            />
        </div>
    );
}
