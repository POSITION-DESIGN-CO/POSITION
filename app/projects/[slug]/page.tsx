import { getPageAnimations, getProjectBySlug } from "@/lib/contentful";
import { headers } from "next/headers";
import { ProjectDetail } from "@/components/Projects/ProjectDetail";
import { Metadata } from "next";
import { Project } from "@/lib/contentful-models";
import NotFound from "@/app/not-found";

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params;
    const foundProject: Project = await getProjectBySlug(slug);

    if (!foundProject) {
        return {
            title: "Project not found",
        };
    }

    const description = foundProject.description;
    const primaryImage = foundProject.thumbnail;

    const maxWidth = 800;
    const maxHeight = 420;

    let width = primaryImage?.width;
    let height = primaryImage?.height;

    if (width && height) {
        if (width > maxWidth) {
            const aspectRatio = height / width;
            width = maxWidth;
            height = Math.round(maxWidth * aspectRatio);
        }
        if (height > maxHeight) {
            const aspectRatio = width / height;
            height = maxHeight;
            width = Math.round(maxHeight * aspectRatio);
        }
    }

    return {
        title: foundProject.title,
        description: description,
        twitter: {
            card: "summary_large_image",
            title: foundProject.title,
            description: description,
            images: [
                {
                    url: primaryImage.url,
                    width: width ?? maxWidth,
                    height: height ?? maxHeight,
                },
            ],
        },
        openGraph: {
            title: foundProject.title,
            description: description,
            images: [
                {
                    url: primaryImage.url,
                    width: width ?? maxWidth,
                    height: height ?? maxHeight,
                },
            ],
        },
    };
}

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
        return <NotFound />;
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
