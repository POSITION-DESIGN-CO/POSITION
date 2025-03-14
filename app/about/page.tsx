import TimeToggle from "@/components/time-toggle";
import FounderBio from "@/components/founder-bio";
import AwardsPublications from "@/components/awards-publications";
import { getAbout } from "@/lib/contentful";

export default async function AboutPage() {
    const about = await getAbout();

    return (
        <main className="min-h-[calc(100vh-50px)] p-4">
            <div className="fixed md:top-4 right-4 top-[53px] z-40">
                <TimeToggle />
            </div>

            {/* Studio Description */}
            <section className="grid sm:grid-cols-2 grid-cols-1 lg:gap-16 md:gap-8 sm:gap-4 gap-2 md:pt-16 pt-24">
                {/* Team Section */}
                <div className="max-w-5xl">
                    <FounderBio founder={about.founder} />

                    {/* Team Members */}
                    <div className="my-12">
                        <h3 className="text-sm mb-4">Members</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-2">
                            {about.teamMembersCollection.items.map(
                                (member, i) => (
                                    <div key={i} className="pr-4">
                                        <p className="text-sm">{member.name}</p>
                                        <p className="text-sm text-gray-400">
                                            {member.role}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Former Members */}
                    <div className="my-12">
                        <h3 className="text-sm mb-4">Former Members</h3>
                        <p className="text-sm">
                            {about.formerMembers.join(", ")}
                        </p>
                    </div>
                </div>
                <div className="text-sm col-span-1 -order-1 sm:order-1">
                    <p className="text-sm">{about.description}</p>
                    <aside className="sm:block hidden">
                        <AwardsPublications
                            awards={about.awardsCollection.items}
                            publications={about.publicationsCollection.items}
                        />
                    </aside>
                </div>
            </section>
            <aside className="block sm:hidden">
                <AwardsPublications
                    awards={about.awardsCollection.items}
                    publications={about.publicationsCollection.items}
                />
            </aside>
            {/* Contact */}
            <div className="my-16">
                <h2 className="mb-4 text-sm">Contact</h2>
                <div>
                    <p className="text-sm">Email: {about.contact.email}</p>
                    <p className="text-sm">IG: {about.contact.instagram}</p>
                    {about.contact.secondaryIG && (
                        <p className="text-sm">{about.contact.secondaryIG}</p>
                    )}
                </div>
            </div>
        </main>
    );
}

// import TimeToggle from "@/components/time-toggle";
// import FounderBio from "@/components/founder-bio";
// import { getAbout } from "@/lib/contentful";
// import Image from "next/image";
// import { Fragment } from "react";

// export default async function AboutPage() {
//     const about = await getAbout();

//     return (
//         <main className="min-h-[calc(100vh-50px)] p-4">
//             <div className="fixed md:top-4 right-4 top-[53px] z-40">
//                 <TimeToggle />
//             </div>

//             {/* Studio Description */}
//             {/* <section className="grid grid-cols-2"> */}
//             {/* <div className="text-sm lg:col-start-6 col-span-7 pt-12 lg:p-0 w-1/2 max-w-5xl my-24"> */}
//             <div className="text-sm lg:col-start-6 col-span-7 pt-12 lg:p-0 w-1/2 max-w-5xl my-24">
//                 <p className="text-sm">{about.about}</p>
//             </div>
//             {/* </section> */}

//             {/* Studio Image */}
//             {/* <div className="my-16 relative aspect-[16/9] w-full max-w-2xl">
//                 <Image
//                     src={about.studioImage.url}
//                     alt={about.studioImage.title}
//                     fill
//                     className="object-cover"
//                 />
//             </div> */}

//             {/* Team Section */}
//             <div className="my-16 max-w-5xl">
//                 <h2 className="mb-6 text-sm">Team</h2>

//                 {/* Founder - now using the client component */}
//                 <FounderBio founder={about.founder} />

//                 {/* Team Members */}
//                 <div className="my-12 max-w-7xl">
//                     <h3 className="text-sm mb-4">Members</h3>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3">
//                         {about.teamMembers.map((member, i) => (
//                             <div key={i} className="pr-4">
//                                 <p className="text-sm">{member.name}</p>
//                                 <p className="text-sm text-gray-500">
//                                     {member.role}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Former Members */}
//                 <div className="my-12">
//                     <h3 className="text-sm mb-4">Former Members</h3>
//                     <p className="text-sm">{about.formerMembers.join(", ")}</p>
//                 </div>
//             </div>

//             {/* Contact */}
//             <div className="my-16">
//                 <h2 className="mb-4 text-sm">Contact</h2>
//                 <div>
//                     <p className="text-sm">Email: {about.contact.email}</p>
//                     <p className="text-sm">IG: {about.contact.instagram}</p>
//                     {about.contact.secondaryIG && (
//                         <p className="text-sm">{about.contact.secondaryIG}</p>
//                     )}
//                 </div>
//             </div>

//             {/* Awards */}
//             <div className="my-16 max-w-5xl">
//                 <h2 className="mb-4 text-sm">Award</h2>
//                 <div className="grid grid-cols-12 text-sm">
//                     {about.awards.map((award, i) => (
//                         <Fragment key={i}>
//                             <div className="col-span-1">{award.year}</div>
//                             <div className="col-span-7">{award.title}</div>
//                             <div className="col-span-4">{award.result}</div>
//                         </Fragment>
//                     ))}
//                 </div>
//             </div>

//             {/* Publications */}
//             <div className="my-16 max-w-5xl">
//                 <h2 className="mb-4 text-sm">Publication</h2>
//                 <div className="grid grid-cols-12 text-sm">
//                     {about.publications.map((pub, i) => (
//                         <Fragment key={i}>
//                             <div className="col-span-1">{pub.year}</div>
//                             <div className="col-span-7">{pub.title}</div>
//                             <div className="col-span-4">{pub.publisher}</div>
//                         </Fragment>
//                     ))}
//                 </div>
//             </div>
//         </main>
//     );
// }
