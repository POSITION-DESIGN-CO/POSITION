"use client";

import { useEffect } from "react";

interface ErrorBoundaryProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[calc(100vh-50px)] bg-white p-8 flex flex-col items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                    Something went wrong!
                </h2>
                <p className="mb-4">{error.message}</p>
                <button
                    onClick={reset}
                    className="px-4 py-2 bg-[#3B3B3B] text-white rounded hover:bg-[#3B3B3B] transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
