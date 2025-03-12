import { JSX } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo_GamerZ_rmBG.png";

interface SidebarProps {
    toggleDrawer: () => void;
}

export default function Sidebar({ toggleDrawer }: SidebarProps): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-between w-25 h-screen bg-base-300 p-2 shadow-lg">
            <button onClick={toggleDrawer} className="btn btn-ghost drawer-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </button>
            <Link to="/" className="btn btn-ghost">
                <img src={Logo} alt="GamerZ Industries Ltd." className="w-15 h-15" />
            </Link>
        </div>
    );
}