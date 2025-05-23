import "./MenuIcon.css";

interface MenuIconProps {
    handleClick: () => void;
    isOpen: boolean;
}

export default function MenuIcon({ handleClick, isOpen }: MenuIconProps) {
    return (
        <aside
            className={`absolute right-0 pr-4 flex items-center gap-3`}
            onClick={handleClick}
        >
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
