import { getUniqueCategories } from "@/lib/dummy-data";
import { StoreInitializer } from "@/components/store-initializer";
import { ClientSideProjectsRenderer } from "@/components/client-side-projects-renderer";
import { ViewToggleWithSuspense } from "@/components/view-toggle-with-suspense";
import { getProjects } from "@/lib/contentful";

export default async function ProjectsPage({}: {}) {
    const { items: allProjects } = await getProjects();
    const categories = getUniqueCategories();

    return (
        <main className="sm:min-h-[calc(100vh-50px)] min-h-[calc(100vh-150px)] p-4">
            <StoreInitializer projects={allProjects} categories={categories} />

            <div className="fixed md:top-4 right-4 top-[53px] z-40">
                <ViewToggleWithSuspense />
            </div>
            {/* 
            <div className="my-24">
                <p className="max-w-3xl text-sm">
                    Founded in Brooklyn, New York by Poyao Shih, POSITION is an
                    architectural practice that explores ideas across
                    disciplines and scales, focusing on contemporary
                    architectural challenges through innovative forms and
                    materials.
                </p>
            </div> */}
            <div className="md:my-24 my-32">
                <ClientSideProjectsRenderer />
            </div>
        </main>
    );
}
