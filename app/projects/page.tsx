import { getProjects, getProjectsByCategory } from "@/lib/contentful";
import { ProjectGrid } from "@/components/project-grid";
import { ProjectList } from "@/components/project-list";
import { ViewToggle } from "@/components/view-toggle";
import { getUniqueCategories } from "@/lib/dummy-data";

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
        <main className="min-h-screen bg-white p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 mt-16 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold">POSITION</h1>
                    </div>
                    <ViewToggle />
                </div>

                <div className="mb-12">
                    <p className="max-w-3xl text-lg text-gray-600">
                        Founded in Brooklyn, New York by Poyao Shih, POSITION is
                        an architectural practice that explores ideas across
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
            </div>
        </main>
    );
}
