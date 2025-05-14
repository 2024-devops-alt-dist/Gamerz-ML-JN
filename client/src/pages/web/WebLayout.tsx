import { JSX, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navigation/web/Navbar";
import Footer from "../../components/navigation/web/Footer";
import AuthModal from "../../components/AuthModal.tsx";

export default function WebLayout(): JSX.Element {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar onOpenLoginModal={openLoginModal} />
            <main className="w-full">
                <Outlet />
            </main>
            <Footer />
            <AuthModal isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
        </div>
    );
}