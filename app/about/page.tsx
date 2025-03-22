import { getAbout } from "@/lib/contentful";
import { AboutComponent } from "@/components/About";

export default async function AboutPage() {
    const about = await getAbout();
    if (!about) {
        return;
    }

    return (
        <main className="sm:min-h-[calc(100vh-50px)] min-h-[calc(100vh-80px)] p-4 grid sm:grid-cols-12 grid-cols-1">
            <AboutComponent about={about} />
        </main>
    );
}
