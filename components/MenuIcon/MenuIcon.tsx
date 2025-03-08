import { useEffect, useState } from "react";
import "./MenuIcon.css";

interface MenuIconProps {
    handleClick: () => void;
    isOpen: boolean;
}

export default function MenuIcon({ handleClick, isOpen }: MenuIconProps) {
    return (
        <div
            className={`absolute right-2 py-1 px-1 flex items-center gap-3 mt-1`}
            onClick={handleClick}
        >
            <span className="text-sm">{isOpen && "CLOSE"}</span>
            <div className="menuButton">
                <div
                    className={`menuButton-inner ${isOpen ? "open" : "closed"}`}
                >
                    <div id="line1" className="line"></div>
                    <div id="line2" className="line"></div>
                </div>
            </div>

            {/* <div
                className={`${isOpen ? "is-opened" : "hamburger"} ${
                    isMenuSettled ? "menu-settled" : ""
                } mb-[3px] ml-3`}
            >
                <svg className="hamburger" stroke="#303030">
                    <line
                        x1="0"
                        y1="50%"
                        x2="100%"
                        y2="50%"
                        className="hamburger__bar hamburger__bar--top"
                    />
                    <line
                        x1="0"
                        y1="50%"
                        x2="100%"
                        y2="50%"
                        className="hamburger__bar hamburger__bar--mid"
                    />
                    <line
                        x1="0"
                        y1="50%"
                        x2="100%"
                        y2="50%"
                        className="hamburger__bar hamburger__bar--bot"
                    />
                </svg>
            </div> */}
        </div>
    );
}
