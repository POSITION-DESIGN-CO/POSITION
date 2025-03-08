import { useEffect, useState } from "react";
import "./MenuIcon.css";

interface MenuIconProps {
    handleClick: () => void;
    isOpen: boolean;
}

export default function MenuIcon({ handleClick, isOpen }: MenuIconProps) {
    return (
        <aside
            className={`absolute right-2 py-1 px-1 flex items-center gap-3 mt-1`}
            onClick={handleClick}
        >
            <span className="text-sm">{isOpen && "CLOSE"}</span>
            <section className="menuButton">
                <div
                    className={`menuButton-inner ${isOpen ? "open" : "closed"}`}
                >
                    <div id="line1" className="line"></div>
                    <div id="line2" className="line"></div>
                </div>
            </section>
        </aside>
    );
}
