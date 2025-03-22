import "./FilterIcon.css";

interface FilterIconProps {
    isOpen: boolean;
}

export default function FilterIcon({ isOpen }: FilterIconProps) {
    return (
        <aside className={`py-1 px-1 flex items-center mt-1`}>
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
