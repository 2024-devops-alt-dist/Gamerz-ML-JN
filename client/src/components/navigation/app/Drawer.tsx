import { JSX } from "react";

interface DrawerProps {
    isOpen: boolean;
}

export default function Drawer({ isOpen }: DrawerProps): JSX.Element {
    return (
        <div className={`drawer ${isOpen ? "drawer-open" : ""} w-0`}>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isOpen} readOnly />
            <div className="drawer-side transition-transform duration-300 ease-out transform translate-x-0">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>
    )
}