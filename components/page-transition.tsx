"use client";

import React, { createContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const TransitionContext = createContext({});

export function PageTransitionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <TransitionContext.Provider value={{}}>
            <AnimatePresence mode="sync">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </TransitionContext.Provider>
    );
}
