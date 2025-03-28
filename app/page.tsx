import {
    getAbout,
    getHomepageItems,
    getPageAnimations,
} from "@/lib/contentful";
import { HomePage } from "@/components/Home/HomePage";
import type { HomepageItem } from "@/lib/contentful-models";
import ClientAnimation from "@/components/Animations/ClientAnimation";

export default async function Home() {
    const homepageItems: HomepageItem[] = await getHomepageItems();
    const about = await getAbout();
    const aboutText = about.description.split(".").slice(0, 3).join(".");
    const { aboutPageAnimationMov, aboutPageAnimationWebm } =
        await getPageAnimations();

    if (!homepageItems || !about) {
        return;
    }

    return (
        <main className="sm:min-h-[calc(100vh-50px)] min-h-[calc(100vh-150px)] p-4">
            <div className="grid md:grid-cols-12 grid-cols-1 md:mb-12 md:my-0 my-6 gap-8">
                <div className="text-sm lg:col-start-6 md:col-start-7 col-start-1 col-span-7 pt-10 md:p-0 w-full leading-[1.3]">
                    <p>{aboutText}.</p>
                </div>
            </div>
            <HomePage homepageItems={homepageItems} />
            <ClientAnimation
                webmUrl={aboutPageAnimationWebm?.url}
                movUrl={aboutPageAnimationMov?.url}
            />
        </main>
    );
}
