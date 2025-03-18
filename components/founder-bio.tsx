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
    const bioToShow = showFullBio ? bio : [bio[0]];

    return (
        <div className="grid grid-cols-2 sm:gap-8 gap-4 mb-12 sm:mt-0 mt-8">
            <div className="flex flex-col gap-3">
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
            <div className="col-span-1">
                <div className="sm:block hidden">
                    {bioToShow.map((paragraph: string, i: number) => (
                        <p key={i} className="text-sm mb-2.5 max-w-2xl">
                            {paragraph}
                        </p>
                    ))}
                    <button
                        className="text-sm text-gray-400 mt-2"
                        onClick={() => setShowFullBio(!showFullBio)}
                    >
                        {showFullBio ? "Read Less" : "Read More"}
                    </button>
                </div>
            </div>
            <aside className="col-span-2 block sm:hidden">
                {bioToShow.map((paragraph: string, i: number) => (
                    <p key={i} className="text-sm mb-2.5 max-w-2xl">
                        {paragraph}
                    </p>
                ))}

                <button
                    className="text-sm text-gray-400 mt-2"
                    onClick={() => setShowFullBio(!showFullBio)}
                >
                    {showFullBio ? "Read Less" : "Read More"}
                </button>
            </aside>
        </div>
    );
}
