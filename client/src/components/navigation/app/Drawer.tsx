import { JSX, useEffect, useState } from "react";
import { useChatStore } from "../../../store/chatStore";
import axios from "axios";
import { FaCircleCheck, FaCircleXmark  } from "react-icons/fa6";

interface DrawerProps {
    isOpen: boolean;
    isAdminPanelUserisOpen: boolean;
}

interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
    createdAt: Date;
}

interface UserGroupProps {
    title: string;
    role: string;
    users: User[];
    onAction: (userId: string) => void;
    icon: JSX.Element;
    detailsOpen?: boolean;
  };

export default function Drawer({ isOpen, isAdminPanelUserisOpen }: DrawerProps): JSX.Element {
    const { channels, setChannels, joinChannel, currentChannel } = useChatStore();
    const API_URL = import.meta.env.VITE_API_URL;
    const [ users, setUsers ] = useState<User[]>([]);

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/channels`, {
                    withCredentials: true,
                });
                setChannels(response.data);
            } catch (error) {
                console.error("Failed to fetch channels:", error);
            }
        };

        fetchChannels();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/users`, {
                    withCredentials: true,
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleValidateUser = async (userId: string) => {
        try {
            await axios.put(
                `${API_URL}/api/users/${userId}/approve`,
                {},
                { withCredentials: true, }
            );
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, role: "gamer"} : user
                )
            );
        } catch (error) {
            console.error("Failed to validate user :", error);
        }
    };

    const handleBanUser = async (userId: string) => {
        try {
            await axios.put(
                `${API_URL}/api/users/${userId}/ban`,
                {},
                { withCredentials: true, }
            );
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, role: "banned"} : user
                )
            );
        } catch (error) {
            console.error("Failed to ban user :", error);
        }
    };

    const UserGroup = ({ title, role, users, onAction, icon, detailsOpen = false }: UserGroupProps) => (
        <details open={detailsOpen}>
            <summary>{title}</summary>
            <ul>
                {users
                .filter((user) => user.role === role)
                .map((user) => (
                    <div key={user._id} className="flex justify-between items-center">
                    <li className="my-1">{user.username}</li>
                    <button onClick={() => onAction(user._id)} title={`${title} action`}>
                        {icon}
                    </button>
                    </div>
                ))}
            </ul>
        </details>
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
                            <UserGroup
                                title="Visitor"
                                role="visitor"
                                users={users}
                                onAction={handleValidateUser}
                                icon={<FaCircleCheck size={18} className="mr-1" />}
                            />
                            <UserGroup
                                title="GamerZ"
                                role="gamer"
                                users={users}
                                onAction={handleBanUser}
                                icon={<FaCircleXmark size={18} className="mr-1" color="red" />}
                            />
                            <UserGroup
                                title="Banned"
                                role="banned"
                                users={users}
                                onAction={handleValidateUser}
                                icon={<FaCircleCheck size={18} className="mr-1" />}
                            />
                        </li>
                    ) : (
                        <li>
                            <h2 className="menu-title">Channels</h2>
                            <ul>
                                {channels.map((channel) => (
                                    <li
                                        key={channel._id}
                                        className={channel._id === currentChannel ? "active" : ""}
                                        onClick={() => channel._id && joinChannel(channel._id)}
                                    >
                                        {channel.name}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}