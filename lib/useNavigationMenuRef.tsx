"use client";

import { createContext, useContext, useRef } from "react";

type NavigationMenuRefContextType = React.RefObject<HTMLDivElement> | null;
export const NavigationMenuRefContext =
    createContext<NavigationMenuRefContextType>(null);

export const useNavigationMenuRef = () => useContext(NavigationMenuRefContext);

export const NavigationMenuRefProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const mainMenuRef = useRef<HTMLDivElement>(null);

    return (
        <NavigationMenuRefContext.Provider value={mainMenuRef}>
            {children}
        </NavigationMenuRefContext.Provider>
    );
};
