import { JSX } from "react";
import Megaphone from "../assets/megaphone.svg";

export default function SupportCard(): JSX.Element {
    return (
        <section className="card flex flex-col bg-white rounded-box grid w-[228px] h-[248px] m-2.5 border border-neutral-300 p-2 place-items-center">
            <img src={Megaphone} alt="Logout" className="w-15 h-15" />
            <h3 className="text-primary font-bold">Content</h3>
            <hr className="w-full border-t border-neutral-300 my-2" />
            <p className="text-neutral">Description</p>
        </section>
    )
}