import Projects from "@/components/Projects";
import { getPageAnimations } from "@/lib/contentful";

export default async function ProjectsPage() {
    const {
        projectGridAnimationMov,
        projectGridAnimationWebm,
        projectListAnimationMov,
        projectListAnimationWebm,
    } = await getPageAnimations();
    return (
        <main className="sm:min-h-[calc(100vh-50px)] min-h-[calc(100vh-80px)] p-4">
            <Projects
                animations={{
                    gridMov: projectGridAnimationMov?.url,
                    gridWebm: projectGridAnimationWebm?.url,
                    listMov: projectListAnimationMov?.url,
                    listWebm: projectListAnimationWebm?.url,
                }}
            />
        </main>
    );
}
