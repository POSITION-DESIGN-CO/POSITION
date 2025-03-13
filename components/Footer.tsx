"use client";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mb-3 ml-4 text-xs z-10 grid lg:grid-cols-12 md:grid-cols-6 grid-cols-2 mr-4 lg:text-right text-left">
            <div className="lg:col-start-7 col-start-1 sm:col-span-2 col-span-1">
                <p>© {currentYear} Position</p>
                <p>All rights reserved</p>
            </div>
            <div className="sm:col-span-2 col-span-1">
                <p>Instagram</p>
                <p>info@positiondesign.co </p>
            </div>
            <div className="sm:col-span-2 col-span-1">
                <p>Design by Hyphen Works</p>
                <p>Coding Stille Studio</p>
            </div>
        </footer>
    );
}
