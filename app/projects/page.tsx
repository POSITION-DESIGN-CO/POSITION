import { getProjects, getProjectsByCategory } from "@/lib/contentful";
import { ProjectGrid } from "@/components/project-grid";
import { ProjectList } from "@/components/project-list";
import { getUniqueCategories } from "@/lib/dummy-data";
import { ViewToggleWithSuspense } from "@/components/view-toggle-with-suspense";

export default async function ProjectsPage({
    searchParams,
}: {
    searchParams: { category?: string; view?: string };
}) {
    const category = searchParams.category || "All";
    const view = searchParams.view || "grid";

    const { items: projects } =
        category === "All"
            ? await getProjects()
            : await getProjectsByCategory(category);

    const categories = getUniqueCategories();

    return (
        <main className="min-h-screen p-4">
            <div className="fixed top-4 right-4">
                <ViewToggleWithSuspense />
            </div>

            <div className="my-24">
                <p className="max-w-3xl text-sm">
                    Founded in Brooklyn, New York by Poyao Shih, POSITION is an
                    architectural practice that explores ideas across
                    disciplines and scales, focusing on contemporary
                    architectural challenges through innovative forms and
                    materials.
                </p>
            </div>

            {view === "grid" ? (
                <ProjectGrid projects={projects} />
            ) : (
                <ProjectList projects={projects} />
            )}
        </main>
    );
}
