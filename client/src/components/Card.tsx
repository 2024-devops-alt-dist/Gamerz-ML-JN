import { JSX } from "react";
import Conversation from "../assets/Conversation.png"

export default function Card(): JSX.Element {
    return (
        <div className="card lg:card-side bg-secondary/70 glass shadow-sm">
            <figure className="p-10">
                <img
                    src={Conversation}
                    alt="Conversation"
                    className="w-75 h-75 bg-contain bg-center" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Make your group conversations more fun</h2>
                <p>Use emojis, stickers, and more to bring your personality to your chats.
                    Set your own avatar and status, and write your own profile to appear in chat however you like.</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Watch</button>
                </div>
            </div>
        </div>
    )
}