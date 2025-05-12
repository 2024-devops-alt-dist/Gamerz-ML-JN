import { JSX, useEffect, useState } from "react";
import { useChatStore } from "../../../store/chatStore";
import { useToast } from "../../../context/ToastContext";
import axios from "axios";
import { FaCircleCheck, FaCircleXmark  } from "react-icons/fa6";
import ConfirmActionModal from "./ConfirmActionModal";
import { useAuth } from "../../../context/AuthContext";

interface DrawerProps {
    isOpen: boolean;
    isAdminPanelUserisOpen: boolean;
}

interface User {
    _id: string;
    username: string;
    email: string;
    motivation: string;
    role: string;
    createdAt: Date;
}

interface UserGroupProps {
    role: string;
    users: User[];
    action: "validate" | "ban";
    icon: JSX.Element;
};

export default function Drawer({ isOpen, isAdminPanelUserisOpen }: DrawerProps): JSX.Element {
    const { channels, setChannels, joinChannel, currentChannel } = useChatStore();
    const { user } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;
    const [ users, setUsers ] = useState<User[]>([]);
    const [confirmationModal, setConfirmationModal] = useState<{
        userId: string;
        username: string;
        motivation: string;
        action: "validate" | "ban";
    } | null>(null);
    const { show } = useToast();

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/channels`, {
                    withCredentials: true,
                });
                setChannels(response.data);
            } catch (error) {
                console.error("Failed to fetch channels:", error);
                show("❌ Failed to fetch channels", "error");
            }
        };

        fetchChannels();
    }, []);

    if (user?.role === "admin") {
        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    const response = await axios.get(`${API_URL}/api/users`, {
                        withCredentials: true,
                    });
                    setUsers(response.data);
                } catch (error) {
                    console.error("Failed to fetch users:", error);
                    show("❌ Failed to fetch users", "error");
                }
            };
    
            fetchUsers();
        }, []);
    }

    const handleValidateUser = async (userId: string) => {
        try {
            // Call to back-end
            await axios.put(
                `${API_URL}/api/users/${userId}/approve`,
                {},
                { withCredentials: true, }
            );

            // Refresh State User
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, role: "gamer"} : user
                )
            );

            // Toast
            const user = users.find((u) => u._id === userId);
            show(`✅ ${user?.username || "User"} validate`, "success");
        } catch (error) {
            console.error("Failed to validate user:", error);
            show("❌ Failed to validate user", "error");
        }
    };

    const handleBanUser = async (userId: string) => {
        try {
            // Call to back-end
            await axios.put(
                `${API_URL}/api/users/${userId}/ban`,
                {},
                { withCredentials: true, }
            );

            // Refresh State User
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, role: "banned"} : user
                )
            );

            // Toast
            const user = users.find((u) => u._id === userId);
            show(`🚫 ${user?.username || "User"} banned`, "success");
        } catch (error) {
            console.error("Failed to ban user:", error);
            show("❌ Failed to ban user", "error");
        }
    };

    const handleConfirm = (userId: string, action: "validate" | "ban") => {
        if (action === "validate") {
            handleValidateUser(userId);
        } else {
            handleBanUser(userId);
        }
    };

    const UserGroup = ({ role, users, action, icon }: UserGroupProps) => (
            <ul>
                {users
                .filter((user) => user.role === role)
                .map((user) => (
                    <div key={user._id} className="flex justify-between items-center">
                    <li className="px-3 py-2 rounded">{user.username}</li>
                    <button
                        onClick={() => {
                            setConfirmationModal({
                            userId: user._id,
                            username: user.username,
                            motivation: user.motivation,
                            action: action,
                            });
                            (document.getElementById("confirmModal") as HTMLDialogElement).showModal();
                        }}
                        className="cursor-pointer"
                    >
                        {icon}
                    </button>
                    </div>
                ))}
            </ul>
    );

    return (
        <div className={`drawer ${isOpen ? "drawer-open w-full max-w-xs" : "w-0"} `}>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isOpen} readOnly />
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {isAdminPanelUserisOpen ? (
                        <li>
                            <h2 className="menu-title">Users</h2>
                            <details open>
                                <summary>Visitor</summary>
                                <UserGroup
                                    role="visitor"
                                    users={users}
                                    action="validate"
                                    icon={<FaCircleCheck size={18} className="mr-1" />}
                                />
                            </details>

                            <details open={false}>
                                <summary>GamerZ</summary>
                                <UserGroup
                                    role="gamer"
                                    users={users}
                                    action="ban"
                                    icon={<FaCircleXmark size={18} className="mr-1" color="red" />}
                                />
                            </details>

                            <details open={false}>
                                <summary>Banned</summary>
                                <UserGroup
                                    role="banned"
                                    users={users}
                                    action="validate"
                                    icon={<FaCircleCheck size={18} className="mr-1" />}
                                />
                            </details>

                        </li>
                    ) : (
                        <li>
                            <h2 className="menu-title">Channels</h2>
                            <ul>
                                {channels.map((channel) => {
                                    const isActive = channel._id === currentChannel;
                                    return (
                                        <li
                                            key={channel._id}
                                            onClick={() => channel._id && joinChannel(channel._id)}
                                            className={`my-1 px-3 py-2 rounded cursor-pointer transition-colors
                                                ${isActive
                                                    ? "bg-primary text-white font-bold shadow-md"
                                                    : "hover:bg-neutral text-white "}`}
                                        >
                                            {channel.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    )}
                </ul>
            </div>
            <ConfirmActionModal
                confirmationModal={confirmationModal}
                onConfirm={handleConfirm}
                onClose={() => {
                    setConfirmationModal(null);
                    (document.getElementById("confirmModal") as HTMLDialogElement).close();
                }}
            />
        </div>
    )
}