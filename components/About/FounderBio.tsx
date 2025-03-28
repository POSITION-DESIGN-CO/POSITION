"use client";

import { useState } from "react";
import Image from "next/image";

interface FounderBioProps {
    founder: {
        name: string;
        role: string;
        image: {
            url: string;
            title: string;
        };
        bio: string[];
        readMore?: boolean;
    };
}
const renderText = (text: any) => {
    return text.split("\n");
};

export default function FounderBio({ founder }: FounderBioProps) {
    const [showFullBio, setShowFullBio] = useState(false);
    const bio = renderText(founder.bio);
    const bioToShow = showFullBio ? bio : bio.slice(0, 6);

    return (
        <div className="grid grid-cols-12 sm:gap-0 gap-4 mb-12">
            <div className="flex flex-col gap-3 col-span-6">
                <div className="relative aspect-square w-full max-w-[250px]">
                    <Image
                        src={founder.image.url}
                        alt={founder.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h3 className="text-sm">{founder.name}</h3>
                    <p className="text-sm text-gray-400 mb-5">{founder.role}</p>
                </div>
            </div>
            <div className="col-span-6">
                <div className="sm:block hidden">
                    {bioToShow.map((paragraph: string, i: number) => (
                        <p
                            key={i}
                            className="text-sm mb-2.5 max-w-2xl leading-[1.3]"
                        >
                            {paragraph}
                        </p>
                    ))}
                    <button
                        className="text-sm text-gray-400 mt-0 hover:text-[#3B3B3B] transition-all duration-300"
                        onClick={() => setShowFullBio(!showFullBio)}
                    >
                        {showFullBio ? "Read Less" : "Read More"}
                    </button>
                </div>
            </div>
            <aside className="col-span-12 col-start-1 block sm:hidden">
                {bioToShow.map((paragraph: string, i: number) => {
                    return paragraph ? (
                        <p
                            key={i}
                            className={`text-sm ${
                                i === bioToShow.length - 1 ||
                                (!showFullBio && i === 4)
                                    ? "mb-0"
                                    : "mb-2.5"
                            } max-w-2xl`}
                        >
                            {paragraph}
                        </p>
                    ) : null;
                })}

                <button
                    className="text-sm text-gray-400 hover:text-gray-[#3B3B3B] transition-all duration-300"
                    onClick={() => setShowFullBio(!showFullBio)}
                >
                    {showFullBio ? "Read Less" : "Read More"}
                </button>
            </aside>
        </div>
    );
}
