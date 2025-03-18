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
                <h2 className="mb-5 text-sm">Awards</h2>
                <div className="grid grid-cols-4 text-sm content-start">
                    {awards.map((award, i) => (
                        <Fragment key={i}>
                            <div className="col-span-1 sm:mt-0">
                                {award.year}
                            </div>
                            <div className="col-span-3">
                                <div className="sm:col-span-3 col-span-1 max-w-xs sm:max-w-full ml-0 sm:ml-4">
                                    {award.title}
                                    <span className="hidden sm:inline">
                                        , {award.result}
                                    </span>
                                </div>
                                <div className="sm:hidden block col-span-1">
                                    {award.result}
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
            {/* Publications */}
            <div className="my-5 max-w-5xl mb-10 sm:mb-0">
                <h2 className="mb-5 text-sm">Publications</h2>
                <div className="grid grid-cols-4 text-sm content-start">
                    {publications.map((pub, i) => (
                        <Fragment key={i}>
                            <div className="col-span-1 sm:mt-0">{pub.year}</div>
                            <div className="col-span-3">
                                <div className="sm:col-span-3 col-span-1 max-w-xs sm:max-w-full ml-0 sm:ml-4">
                                    {pub.title}
                                </div>
                                <div className="sm:hidden block col-span-1">
                                    {pub.publisher}
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    );
}
