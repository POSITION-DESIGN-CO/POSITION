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
        <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4 mb-12 sm:mt-0 mt-8">
            <div className="relative aspect-square w-full max-w-[300px]">
                <Image
                    src={founder.image.url}
                    alt={founder.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="sm:col-span-2 col-span-1">
                <h3 className="text-sm">{founder.name}</h3>
                <p className="text-sm text-gray-400 mb-5">{founder.role}</p>
                <div className="sm:block hidden">
                    {bioToShow.map((paragraph: string, i: number) => (
                        <p key={i} className="text-sm mb-2.5 max-w-2xl">
                            {paragraph}
                        </p>
                    ))}
                    <button
                        className="text-sm underline mt-2"
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
                    className="text-sm underline mt-2"
                    onClick={() => setShowFullBio(!showFullBio)}
                >
                    {showFullBio ? "Read Less" : "Read More"}
                </button>
            </aside>
        </div>
    );
}
