import TimeToggle from "@/components/time-toggle";
import FounderBio from "@/components/founder-bio";
import { getAbout } from "@/lib/contentful";
import Image from "next/image";
import { Fragment } from "react";
import AwardsPublications from "@/components/awards-publications";

export default async function AboutPage() {
    const about = await getAbout();

    return (
        <main className="min-h-[calc(100vh-50px)] p-4 grid sm:grid-cols-12 grid-cols-1">
            <div className="fixed md:top-4 right-4 top-[53px] z-40">
                <TimeToggle />
            </div>

            {/* Studio Description */}
            <section className="lg:col-start-3 lg:col-span-8 col-start-2 col-span-10">
                <div className="text-sm pt-2 lg:p-0 mt-24">
                    <p className="text-sm">{about.description}</p>
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
                <div className="grid grid-cols-2">
                    <section>
                        <h2 className="mb-4 text-sm lg:text-lg">Contact</h2>
                        <div>
                            <p className="text-sm">{about.contact.email}</p>
                        </div>
                    </section>
                    <section>
                        <h2 className="mb-4 text-sm lg:text-lg">
                            Social Media
                        </h2>
                        <div>
                            <p className="text-sm">{about.contact.instagram}</p>
                            {about.contact.secondaryIG && (
                                <p className="text-sm">
                                    {about.contact.secondaryIG}
                                </p>
                            )}
                        </div>
                    </section>
                </div>

                {/* Team Section */}
                <div className="my-16 max-w-5xl">
                    <h2 className="mb-6 text-sm lg:text-lg">Team</h2>

                    {/* Founder - now using the client component */}
                    <FounderBio founder={about.founder} />

                    {/* Team Members */}
                    <div className="my-12 max-w-7xl">
                        <h3 className="text-sm lg:text-base mb-4">Members</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-8">
                            {about.teamMembersCollection.items.map(
                                (member, i) => (
                                    <div key={i} className="pr-4">
                                        <p className="text-sm">{member.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {member.role}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Former Members */}
                    <div className="my-12">
                        <h3 className="text-sm lg:text-base mb-4">
                            Former Members
                        </h3>
                        <p className="text-sm">
                            {about.formerMembers.join(", ")}
                        </p>
                    </div>
                </div>

                {/* Awards */}
                <div className="my-16 max-w-5xl sm:block hidden">
                    <h2 className="mb-4 text-sm lg:text-lg">Award</h2>
                    <div className="grid grid-cols-12 text-sm">
                        {about.awardsCollection.items.map((award, i) => (
                            <Fragment key={i}>
                                <div className="col-span-1">{award.year}</div>
                                <div className="col-span-7">{award.title}</div>
                                <div className="col-span-4">{award.result}</div>
                            </Fragment>
                        ))}
                    </div>
                </div>

                {/* Publications */}
                <div className="my-16 max-w-5xl sm:block hidden">
                    <h2 className="mb-4 text-sm lg:text-lg">Publication</h2>
                    <div className="grid grid-cols-12 text-sm">
                        {about.publicationsCollection.items.map((pub, i) => (
                            <Fragment key={i}>
                                <div className="col-span-1">{pub.year}</div>
                                <div className="col-span-7">{pub.title}</div>
                                <div className="col-span-4">
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
        </main>
    );
}
