import { JSX } from "react";

interface ConfirmActionModalProps {
    confirmationModal: {
        userId: string;
        username: string;
        motivation: string;
        action: "validate" | "ban";
    } | null;
    onConfirm: (userId: string, action: "validate" | "ban") => void;
    onClose: () => void;
}

export default function ConfirmActionModal({ confirmationModal, onConfirm, onClose }: ConfirmActionModalProps): JSX.Element {
    return (
        <dialog id="confirmModal" className="modal">
            <div className="modal-box">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
        
            {confirmationModal && (
                <>
                    <h3 className="font-bold text-lg">
                        {confirmationModal.action === "validate"
                        ? `Valider l'utilisateur ${confirmationModal.username}`
                        : `Bannir l'utilisateur ${confirmationModal.username}`}
                        {" "}
                        ?
                    </h3>
                    <p className="py-4 text-center font-semibold">{confirmationModal.motivation}</p>
            
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost">Annuler</button>
                        </form>
                        <button
                        className="btn btn-primary"
                        onClick={() => {
                            onConfirm(
                                confirmationModal.userId,
                                confirmationModal.action
                            );
                            onClose();
                        }}
                        >
                        Confirmer
                        </button>
                    </div>
                </>
            )}
            </div>
        </dialog>
    )
}