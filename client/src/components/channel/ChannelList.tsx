// src/components/ChannelList.tsx
import { useEffect, useState } from "react";
import { useChatStore } from "../../store/chatStore";
import axios from "axios";

export const ChannelList = () => {
    const { channels, setChannels, joinChannel, currentChannel } = useChatStore();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3000/api/channels", {
                    withCredentials: true,
                    // headers: {
                    //     'Content-Type': 'application/json'
                    // }
                });
                setChannels(response.data);
            } catch (error) {
                console.error("Failed to fetch channels:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChannels();
    }, [setChannels]);

    if (loading) return <div>Loading channels...</div>;

    return (
        <div className="channel-list">
            <h2>Channels</h2>
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
        </div>
    );
};