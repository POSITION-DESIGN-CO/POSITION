import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-white p-8 flex flex-col items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">
                    404 - Page Not Found
                </h1>
                <p className="text-lg mb-8">
                    The page you are looking for does not exist.
                </p>
                <Link href="/" className="text-[#3B3B3B] underline">
                    Return to Home
                </Link>
            </div>
        </main>
    );
}
