"use client";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mb-3 ml-4 text-sm z-10 grid md:grid-cols-12 grid-cols-6">
            <div className="md:col-start-6 col-start-1 col-span-2">
                <p>© {currentYear} Position</p>
                <p>All rights reserved</p>
            </div>
            <div className="col-span-3">
                <p>Instagram</p>
                <p>info@positiondesign.co </p>
            </div>
            <div className="col-span-2">
                <p>Design by Hyphen Works</p>
                <p>Coding Stille Studio</p>
            </div>
        </footer>
    );
}
