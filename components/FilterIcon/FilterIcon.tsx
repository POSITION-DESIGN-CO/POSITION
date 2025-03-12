import "./FilterIcon.css";

interface FilterIconProps {
    handleClick: () => void;
    isOpen: boolean;
}

export default function FilterIcon({ handleClick, isOpen }: FilterIconProps) {
    return (
        <aside
            className={`absolute right-2 py-1 px-1 flex items-center gap-3 mt-1`}
            onClick={handleClick}
        >
            <section className="filterButton">
                <div
                    className={`filterButton-inner ${
                        isOpen ? "open" : "closed"
                    }`}
                >
                    <div id="line1" className="line"></div>
                    <div id="line2" className="line"></div>
                </div>
            </section>
        </aside>
    );
}
