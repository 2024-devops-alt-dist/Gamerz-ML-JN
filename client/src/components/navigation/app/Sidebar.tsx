import { JSX } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo_GamerZ_rmBG.png";
import Logout from "../../../assets/logout.png";
import AdminPanelUser from "../../../assets/user.png";
import { useAuth } from "../../../context/AuthContext";

interface SidebarProps {
    toggleDrawer: () => void;
    toggleAdminPanelUser: () => void;
}

export default function Sidebar({ toggleDrawer, toggleAdminPanelUser }: SidebarProps): JSX.Element {
    const { user, logout } = useAuth();

    return (
        <section className="flex flex-col items-center justify-between w-25 h-screen bg-base-300 p-2 shadow-lg">
            <div>
                <button onClick={toggleDrawer} className="btn btn-ghost drawer-button w-full mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </button>
                {user && user.role === "admin" ? (
                    <button onClick={toggleAdminPanelUser} className="btn btn-ghost drawer-button w-full mb-5">
                        <img src={AdminPanelUser} alt="Admin Panel User" className="w-7 h-7" />
                    </button>
                ) : (
                    <></>
                )}
            </div>
            <div>
                <button className="btn btn-ghost w-full mb-5" onClick={logout}>
                    <img src={Logout} alt="Logout" className="w-10 h-10" />
                </button>
                <Link to="/" className="btn btn-ghost mb-5">
                    <img src={Logo} alt="GamerZ Industries Ltd." className="w-15 h-15" />
                </Link>
            </div>
        </section>
    );
}