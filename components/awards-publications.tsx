import { Fragment } from "react";

interface AwardsPublicationsProps {
    awards: {
        year: number;
        title: string;
        result: string;
    }[];
    publications: {
        year: number;
        title: string;
        publisher: string;
    }[];
}

export default function AwardsPublications({
    awards,
    publications,
}: AwardsPublicationsProps) {
    return (
        <>
            {/* Awards */}
            <div className="my-5 max-w-5xl mb-10 sm:mb-0">
                <h2 className="sm:mb-5 mb-0 text-sm">Award</h2>
                <div className="grid sm:grid-cols-12 grid-cols-1 text-sm">
                    {awards.map((award, i) => (
                        <Fragment key={i}>
                            <div className="col-span-1 mt-2 sm:mt-0">
                                {award.year}
                            </div>
                            <div className="sm:col-span-11 col-span-1 max-w-xs sm:max-w-full ml-0 sm:ml-4">
                                {award.title}
                                <span className="hidden sm:inline">
                                    , {award.result}
                                </span>
                            </div>
                            <div className="sm:hidden block col-span-1">
                                {award.result}
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>

            {/* Publications */}
            <div className="my-5 max-w-5xl">
                <h2 className="sm:mb-5 mb-0 text-sm">Publication</h2>
                <div className="grid sm:grid-cols-12 grid-cols-1 text-sm">
                    {publications.map((pub, i) => (
                        <Fragment key={i}>
                            <div className="col-span-1 mt-2 sm:mt-0">
                                {pub.year}
                            </div>
                            <div className="sm:col-span-11 col-span-1 max-w-xs sm:max-w-full ml-0 sm:ml-4">
                                {pub.title}
                            </div>
                            <div className="sm:hidden block col-span-1">
                                {pub.publisher}
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    );
}
