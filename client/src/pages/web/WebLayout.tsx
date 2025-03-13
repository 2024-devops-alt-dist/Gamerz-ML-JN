import {JSX, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import Navbar from "../../components/navigation/web/Navbar";
import Footer from "../../components/navigation/web/Footer";
import {Modal} from "../../components/Modal.tsx";
import {RegisterForm} from "../../components/form/RegisterForm.tsx";
import {LoginForm} from "../../components/form/LoginForm.tsx";

export default function WebLayout(): JSX.Element {
    const navigate = useNavigate();
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleRegistrationSuccess = () => {
        setIsRegisterModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    const handleLoginSuccess = () => {
        setIsLoginModalOpen(false);
        navigate('/app');
    };

    const switchToRegister = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(true);
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar onOpenLoginModal={openLoginModal} />
                <main className="w-full">
                    <Outlet />
                </main>
                <Footer />
            </div>
            <Modal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
            >
                <RegisterForm onSuccess={handleRegistrationSuccess} />
            </Modal>

            <Modal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            >
                <LoginForm
                    onSuccess={handleLoginSuccess}
                    onRegisterClick={switchToRegister}
                />
            </Modal>

            <Modal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
            >
                <div className="text-center p-6">
                    <div className="text-3xl mb-4 text-green-500">✓</div>
                    <h2 className="text-2xl font-semibold mb-4">Registration Successful!</h2>
                    <p className="text-gray-300 mb-6">
                        Thank you for registering with GamerZ. Your application has been received and is currently under review by our administrators. You'll receive an email notification once your account is approved.
                    </p>
                    <button
                        onClick={() => setIsSuccessModalOpen(false)}
                        className="btn btn-primary"
                    >
                        Got it
                    </button>
                </div>
            </Modal>
        </>
    );
}