import { JSX, useState } from "react";
import { Modal } from "./Modal";
import { RegisterForm } from "./form/RegisterForm";
import LoginForm from "./form/LoginForm";

interface AuthModalProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (isOpen: boolean) => void;
};

export default function AuthModal({ isLoginModalOpen, setIsLoginModalOpen }: AuthModalProps): JSX.Element {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleRegistrationSuccess = () => {
        setIsRegisterModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    const handleLoginSuccess = () => {
        setIsLoginModalOpen(false);
    };

    const switchToRegister = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(true);
    };

    return (
        <>
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
    )
}