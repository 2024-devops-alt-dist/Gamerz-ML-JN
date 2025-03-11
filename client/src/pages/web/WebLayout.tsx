import { JSX } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navigation/Navbar";
import Footer from "../../components/navigation/Footer";

export default function WebLayout(): JSX.Element {
    return (
        <div className="flex flex-col min-h-screen max-h-screen bg-amber-50">
            <Navbar />
            <main className="w-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}