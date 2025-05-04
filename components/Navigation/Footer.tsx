import { getAbout } from "@/lib/contentful";
import { ClientFooter } from "./FooterClient";

export async function Footer() {
    const { contact } = await getAbout();
    const currentYear = new Date().getFullYear();
    if (!contact) {
        return;
    }
    return (
        <ClientFooter currentYear={currentYear} contact={contact}/>
        // <footer className="relative mb-3 ml-4 text-xs z-[99999] grid sm:grid-cols-12 grid-cols-1 mr-4 xl:text-right text-left">
        //     <div className="lg:col-start-7 sm:col-start-6 col-span-1 sm:col-span-3 md:col-start-4 md:col-span-3 lg:col-span-2">
        //         <p className="inline sm:block">
        //             © {currentYear} Position
        //             <span className="sm:hidden inline-block pr-1">, </span>
        //         </p>
        //         <p className="inline sm:block">All rights reserved</p>
        //     </div>
        //     <div className="hidden md:block lg:col-span-2 lg:col-start-auto sm:col-span-3">
        //         <p>
        //             <a
        //                 className="hover:text-gray-400 transition-all duration-300"
        //                 target="_blank"
        //                 href={`https://www.instagram.com/${contact?.instagram
        //                     ?.split("@")
        //                     .join("")}/`}
        //             >
        //                 Instagram
        //             </a>
        //         </p>
        //         <p>
        //             <a
        //                 className="hover:text-gray-400 transition-all duration-300"
        //                 href={`mailto:${contact?.email}`}
        //             >
        //                 {contact?.email.replace(/@/g, "[at]")}
        //             </a>
        //         </p>
        //     </div>
        //     <div className="lg:col-span-2 col-span-3">
        //         <p>
        //             Design by{" "}
        //             <a target="_blank" href="https://hyphen.works/">
        //                 Hyphen Works
        //             </a>
        //         </p>
        //         <p>
        //             Coding{" "}
        //             <a target="_blank" href="https://www.stillestudio.com">
        //                 Stille Studio
        //             </a>
        //         </p>
        //     </div>
        // </footer>
    );
}
