import {
    getAbout,
    getHomepageItems,
    getProjects,
    getUniqueCategories,
} from "@/lib/contentful";
import { HomePage } from "@/components/HomePage";
import type { HomepageItem } from "@/lib/contentful-models";
import { StoreInitializer } from "@/components/store-initializer";

export default async function Home() {
    const homepageItems: HomepageItem[] = await getHomepageItems();
    const categories = await getUniqueCategories();
    const { items: allProjects } = await getProjects();
    const about = await getAbout();
    const aboutText = about.description.split(".").slice(0, 2).join(".");

    return (
        <main className="sm:min-h-[calc(100vh-50px)] min-h-[calc(100vh-150px)] p-4">
            <StoreInitializer projects={allProjects} categories={categories} />
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:mb-12 lg:my-0 my-6 gap-16">
                <div className="text-sm lg:col-start-2 pt-8 lg:p-0 w-full max-w-5xl">
                    <p>{aboutText}.</p>
                </div>
            </div>
            <HomePage homepageItems={homepageItems} />
        </main>
    );
}
