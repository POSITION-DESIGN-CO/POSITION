import {
    getAbout,
    getHomepageItems,
    getPageAnimations,
} from "@/lib/contentful";
import { HomePage } from "@/components/HomePage";
import type { HomepageItem } from "@/lib/contentful-models";
import ClientAnimation from "@/components/ClientAnimation";

export default async function Home() {
    const homepageItems: HomepageItem[] = await getHomepageItems();
    const about = await getAbout();
    const aboutText = about.description.split(".").slice(0, 3).join(".");
    const { homepageAnimation } = await getPageAnimations();

    if (!homepageItems || !about) {
        return;
    }

    return (
        <main className="sm:min-h-[calc(100vh-50px)] min-h-[calc(100vh-150px)] p-4">
            <div className="grid lg:grid-cols-12 grid-cols-1 lg:mb-12 lg:my-0 my-6 gap-2">
                <div className="text-sm lg:col-start-6 col-span-7 pt-10 lg:p-0 w-full max-w-5xl leading-[1.3]">
                    <p>{aboutText}.</p>
                </div>
            </div>
            <HomePage homepageItems={homepageItems} />
            <ClientAnimation animationUrl={homepageAnimation?.url} />
        </main>
    );
}
