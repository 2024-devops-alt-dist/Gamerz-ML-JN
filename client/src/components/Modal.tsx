import { ReactNode } from 'react';
import {Link} from "react-router-dom";
import Logo from "../assets/Logo_GamerZ_rmBG.png";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose,  children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}/>
            <div className="relative z-50 w-full max-w-md rounded-lg bg-black p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>
                <Link to="/" className="flex justify-center w-full">
                    <img src={Logo} alt="GamerZ Industries Ltd." className="w-25 h-25" />
                </Link>
                {children}
            </div>
        </div>
    );
};