import { getUniqueCategories } from "@/lib/dummy-data";
import { StoreInitializer } from "@/components/store-initializer";
import { ClientSideProjectsRenderer } from "@/components/client-side-projects-renderer";
import { ViewToggleWithSuspense } from "@/components/view-toggle-with-suspense";
import { getProjects } from "@/lib/contentful";

export default async function ProjectsPage({}: {}) {
    const { items: allProjects } = await getProjects();
    const categories = getUniqueCategories();

    return (
        <main className="min-h-[calc(100vh-50px)] p-4">
            <StoreInitializer projects={allProjects} categories={categories} />

            <div className="fixed top-4 right-4">
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
            <div className="my-24">
                <ClientSideProjectsRenderer />
            </div>
        </main>
    );
}
