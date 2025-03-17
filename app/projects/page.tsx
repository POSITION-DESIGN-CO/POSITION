import { ClientSideProjectsRenderer } from "@/components/client-side-projects-renderer";
import { ViewToggleWithSuspense } from "@/components/view-toggle-with-suspense";

export default async function ProjectsPage({}: {}) {
    return (
        <main className="sm:min-h-[calc(100vh-50px)] min-h-[calc(100vh-150px)] p-4">
            <div className="fixed md:top-4 right-4 top-[53px] z-40">
                <ViewToggleWithSuspense />
            </div>
            <div className="md:my-24 my-32">
                <ClientSideProjectsRenderer />
            </div>
        </main>
    );
}
