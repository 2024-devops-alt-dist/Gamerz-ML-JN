import { JSX, useEffect, useState } from "react";
import { useChatStore } from "../../../store/chatStore";
import axios from "axios";

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
    }, [setChannels]);

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
    }, [setUsers]);

    return (
        <div className={`drawer ${isOpen ? "drawer-open w-full max-w-xs" : "w-0"} `}>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isOpen} readOnly />
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {isAdminPanelUserisOpen ? (
                        <li>
                            <h2 className="menu-title">Users</h2>
                            <ul>
                                {users.map((user) => (
                                    <li
                                        key={user._id}
                                    >
                                        {user.username}
                                    </li>
                                ))}                            
                            </ul>
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