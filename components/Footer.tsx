"use client";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bottom-3 left-4 text-sm text-gray-600 z-10">
            <p>© {currentYear} Position</p>
        </footer>
    );
}
