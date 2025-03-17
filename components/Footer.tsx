import { getAbout } from "@/lib/contentful";

export async function Footer() {
    const { contact } = await getAbout();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mb-3 ml-4 text-xs z-10 grid lg:grid-cols-12 md:grid-cols-6 grid-cols-2 mr-4 lg:text-right text-left">
            <div className="lg:col-start-7 col-start-1 sm:col-span-2 col-span-1">
                <p>© {currentYear} Position</p>
                <p>All rights reserved</p>
            </div>
            <div className="sm:col-span-2 col-span-1">
                <p>
                    <a
                        target="_blank"
                        href={`https://www.instagram.com/${contact?.instagram
                            ?.split("@")
                            .join("")}/`}
                    >
                        Instagram
                    </a>
                </p>
                <p>
                    <a href={`mailto:${contact.email}`}>
                        {contact.email.replace(/@/g, "[at]")}
                    </a>
                </p>
            </div>
            <div className="sm:col-span-2 col-span-1">
                <p>
                    Design by{" "}
                    <a target="_blank" href="https://hyphen.works/">
                        Hyphen Works
                    </a>
                </p>
                <p>
                    Coding{" "}
                    <a target="_blank" href="https://www.stillestudio.com">
                        Stille Studio
                    </a>
                </p>
            </div>
        </footer>
    );
}
