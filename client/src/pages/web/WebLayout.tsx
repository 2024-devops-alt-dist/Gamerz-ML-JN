import { JSX } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navigation/web/Navbar";
import Footer from "../../components/navigation/web/Footer";

export default function WebLayout(): JSX.Element {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="w-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}