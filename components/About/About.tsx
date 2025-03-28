"use client";
import Image from "next/image";
import TimeToggle from "./TimeToggle";
import FounderBio from "./FounderBio";
import { Fragment, useEffect, useState } from "react";
import AwardsPublications from "./AwardsPublications";
import { About } from "@/lib/contentful-models";
import getWindowDimensions from "@/lib/helper";

export const AboutComponent = ({ about }: { about: About }) => {
    const [selectedBio, setSeletedBio] = useState("");
    const { windowWidth } = getWindowDimensions();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return null;
    }

    return (
        <>
            <div className="fixed md:top-4 right-4 top-[53px] z-40">
                <TimeToggle />
            </div>
            {/* Studio Description */}
            <section className="lg:col-start-3 lg:col-span-8 col-start-1 col-span-10">
                <div className="text-sm pt-2 lg:p-0 mt-24">
                    <p className="lg:text-lg" style={{ lineHeight: 1.3 }}>
                        {about.description}
                    </p>
                </div>
                {/* </section> */}

                {/* Studio Image */}
                <div className="my-12 relative aspect-[16/9] w-full">
                    <Image
                        src={about.studioImage.url}
                        alt={about.studioImage.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Contact */}
                <div className="grid grid-cols-8">
                    <section className="sm:col-span-4 col-span-5">
                        <h2 className="sm:mb-4 mb-2 text-lg">Contact</h2>
                        <div>
                            <p className="text-sm">
                                <a
                                    className="hover:text-gray-400 transition-all duration-300"
                                    href={`mailto:${about.contact.email}`}
                                >
                                    {about.contact.email.replace(/@/g, "[at]")}
                                </a>
                            </p>
                        </div>
                    </section>
                    <section className="sm:col-span-4 col-span-3">
                        <h2 className="sm:mb-4 mb-2 text-lg">Social Media</h2>
                        <div>
                            <p className="text-sm">
                                <a
                                    className="hover:text-gray-400 transition-all duration-300"
                                    target="_blank"
                                    href={`https://www.instagram.com/${about.contact?.instagram
                                        ?.split("@")
                                        .join("")}/`}
                                >
                                    {about.contact?.instagram}
                                </a>
                            </p>
                            {about.contact.secondaryIG && (
                                <p className="text-sm">
                                    <a
                                        className="hover:text-gray-400 transition-all duration-300"
                                        target="_blank"
                                        href={`https://www.instagram.com/${about.contact?.secondaryIG
                                            ?.split("@")
                                            .join("")}/`}
                                    >
                                        {about.contact?.secondaryIG}
                                    </a>
                                </p>
                            )}
                        </div>
                    </section>
                </div>

                {/* Team Section */}
                <div className="my-16 max-w-5xl">
                    <h2 className="sm:mb-6 mb-4 text-lg">Team</h2>

                    {/* Founder - now using the client component */}
                    <FounderBio founder={about.founder} />

                    {/* Team Members */}
                    <div className="my-12 max-w-7xl grid md:grid-cols-1 grid-cols-2">
                        <div>
                            <h3 className="text-base sm:mb-4 mb-2">Members</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-y-3 gap-8">
                                {about.teamMembersCollection.items.map(
                                    (member, i) => (
                                        <div
                                            key={i}
                                            className={`pr-4 ${
                                                selectedBio === member.bio &&
                                                "pb-52 md:pb-0"
                                            }`}
                                        >
                                            <p className="text-sm">
                                                {member.name}
                                            </p>
                                            <p className="text-sm text-gray-500 flex gap-2">
                                                {member.role}
                                                {member.bio && (
                                                    <button
                                                        onClick={() =>
                                                            setSeletedBio(
                                                                selectedBio
                                                                    ? ""
                                                                    : (member.bio as string)
                                                            )
                                                        }
                                                        className="text-gray-400 mt-0 hover:text-[#3B3B3B] transition-all duration-300"
                                                    >
                                                        {selectedBio ===
                                                        member.bio
                                                            ? "Close Bio"
                                                            : "Read Bio"}
                                                    </button>
                                                )}
                                            </p>
                                            {windowWidth < 768 &&
                                                selectedBio === member.bio && (
                                                    <p className="text-sm col-span-2 py-16 absolute w-full sm:max-w-lg max-w-[18rem]">
                                                        {selectedBio}
                                                    </p>
                                                )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="block md:hidden">
                            <h3 className="text-base sm:mb-4 mb-2">
                                Former Members
                            </h3>
                            <div className="text-sm flex flex-col">
                                {/* {about.formerMembers.join(", ")} */}
                                {about.formerMembers.map(
                                    (person: string, index: number) => (
                                        <li key={person} className="list-none">
                                            <span>
                                                {person}
                                                {about.formerMembers &&
                                                    index !==
                                                        about.formerMembers
                                                            .length -
                                                            1 &&
                                                    ","}{" "}
                                            </span>
                                        </li>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    {windowWidth > 768 && selectedBio && (
                        <div className="grid grid-cols-12">
                            <p className="text-sm col-span-8">{selectedBio}</p>
                        </div>
                    )}

                    {/* Former Members */}
                    <div className="my-12 md:block hidden">
                        <h3 className="text-base sm:mb-4 mb-2">
                            Former Members
                        </h3>
                        <p className="text-sm">
                            {about.formerMembers.join(", ")}
                        </p>
                    </div>
                </div>

                {/* Awards */}
                <div className="my-16 max-w-5xl sm:block hidden">
                    <h2 className="sm:mb-4 mb-2 text-lg">Award</h2>
                    <div className="grid grid-cols-12 text-sm">
                        {about.awardsCollection.items.map((award, i) => (
                            <Fragment key={i}>
                                <div className="col-span-1 leading-[1.3]">
                                    {award.year}
                                </div>
                                <div className="col-span-7 leading-[1.3]">
                                    {award.title}
                                </div>
                                <div className="col-span-4 leading-[1.3]">
                                    {award.result}
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>

                {/* Publications */}
                <div className="my-16 max-w-5xl sm:block hidden">
                    <h2 className="sm:mb-4 mb-2 text-lg">Publication</h2>
                    <div className="grid grid-cols-12 text-sm">
                        {about.publicationsCollection.items.map((pub, i) => (
                            <Fragment key={i}>
                                <div className="col-span-1 leading-[1.3]">
                                    {pub.year}
                                </div>
                                <div className="col-span-7 leading-[1.3]">
                                    {pub.title}
                                </div>
                                <div className="col-span-4 leading-[1.3]">
                                    {pub.publisher}
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
                <aside className="block sm:hidden">
                    <AwardsPublications
                        awards={about.awardsCollection.items}
                        publications={about.publicationsCollection.items}
                    />
                </aside>
            </section>
        </>
    );
};
