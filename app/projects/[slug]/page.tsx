// import Image from "next/image";
import { getPageAnimations, getProjectBySlug } from "@/lib/contentful";
// import Link from "next/link";
import { headers } from "next/headers";
import { ProjectDetail } from "@/components/Projects/ProjectDetail";
// import ClientAnimation from "@/components/Animations/ClientAnimation";
// import { useProjectsStore } from "@/store";

// interface ImageProps {
//     title: string;
//     url: string;
//     blurDataURL?: string;
//     width: number;
//     height: number;
//     sys: { id: string };
// }

export default async function ProjectPage({
    params,
}: {
    params: { slug: string };
}) {
    const project = await getProjectBySlug(params.slug);
    const referer = headers().get("referer") || "/projects";

    const { projectGridAnimationMov, projectGridAnimationWebm } =
        await getPageAnimations();

    if (!project) {
        return (
            <main className="min-h-[calc(100vh-50px)] flex justify-center items-center p-8">
                <h1 className="text-xl">project not found...</h1>
            </main>
        );
    }

    return (
        <main className="sm:min-h-[calc(100vh-50px)] min-h-[calc(100vh-150px)] p-4">
            <ProjectDetail
                referer={referer}
                projectGridAnimationMov={projectGridAnimationMov}
                projectGridAnimationWebm={projectGridAnimationWebm}
                project={project}
            />
        </main>
    );
}
