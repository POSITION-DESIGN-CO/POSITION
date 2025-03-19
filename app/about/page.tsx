import { getAbout } from "@/lib/contentful";
import { AboutComponent } from "@/components/About";

export default async function AboutPage() {
    const about = await getAbout();

    return (
        <main className="min-h-[calc(100vh-50px)] p-4 grid sm:grid-cols-12 grid-cols-1">
            <AboutComponent about={about} />
        </main>
    );
}
