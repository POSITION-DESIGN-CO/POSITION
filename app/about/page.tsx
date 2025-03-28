import { getAbout, getPageAnimations } from "@/lib/contentful";
import { AboutComponent } from "@/components/About/About";
import ClientAnimation from "@/components/Animations/ClientAnimation";

export default async function AboutPage() {
    const about = await getAbout();
    const { aboutPageAnimationMov, aboutPageAnimationWebm } =
        await getPageAnimations();

    if (!about) {
        return;
    }

    return (
        <main className="sm:min-h-[calc(100vh-50px)] min-h-[calc(100vh-80px)] p-4 grid sm:grid-cols-12 grid-cols-12">
            <AboutComponent about={about} />
            <ClientAnimation
                hasNoGradient
                movUrl={aboutPageAnimationMov?.url}
                webmUrl={aboutPageAnimationWebm?.url}
            />
        </main>
    );
}
