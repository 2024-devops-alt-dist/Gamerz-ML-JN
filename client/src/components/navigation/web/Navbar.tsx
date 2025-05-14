import { JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo_GamerZ_rmBG.png";
import { useAuth } from "../../../context/AuthContext";

interface NavbarProps {
    onOpenLoginModal: () => void;
}

export default function Navbar({ onOpenLoginModal }: NavbarProps): JSX.Element {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link to="/discover">Discover</Link></li>
                        <li><Link to="/support">Support</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">
                    <img src={Logo} alt="GamerZ Industries Ltd." className="w-15 h-15" />
                    GamerZ
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/discover">Discover</Link></li>
                    <li><Link to="/support">Support</Link></li>
                    <li><Link to="/careers">Careers</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <button
                    onClick={user ? () => navigate("/app") : onOpenLoginModal}
                    className="btn btn-primary"
                >
                    Open GamerZ
                </button>
            </div>
        </div>
    );
}