import {
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

    const aboutText = {
        data: {
            content:
                "POSITION is an architectural practice founded by Poyao Shih in Brooklyn, New York. The studio explores ideas across different disciplines and scales, focusing on responding to contemporary architectural issues through innovative forms and materials.",
        },
    };

    return (
        <main className="sm:min-h-[calc(100vh-50px)] min-h-[calc(100vh-150px)] p-4">
            <StoreInitializer projects={allProjects} categories={categories} />
            <div className="grid lg:grid-cols-12 grid-cols-1 lg:mb-12 lg:my-0 my-6">
                <div className="text-sm lg:col-start-6 col-span-7 pt-12 lg:p-0 w-full max-w-5xl">
                    <p>{aboutText.data.content}</p>
                </div>
            </div>
            <HomePage homepageItems={homepageItems} />
        </main>
    );
}
