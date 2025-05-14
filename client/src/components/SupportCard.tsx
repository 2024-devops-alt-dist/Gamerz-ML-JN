import { JSX, ReactElement } from "react";

interface SupportCardProps {
    icon: ReactElement;
    title: string;
    description: string;
}

export default function SupportCard({ icon, title, description }: SupportCardProps): JSX.Element {
    return (
        <section className="card flex flex-col bg-white rounded-box grid w-[228px] h-[248px] m-2.5 border border-neutral-300 p-2 place-items-center">
            <div className="text-primary text-4xl mb-3">{icon}</div>
            <h3 className="text-primary text-center font-bold">{title}</h3>
            <hr className="w-full border-t border-neutral-300 my-2" />
            <p className="text-neutral text-center min-h-[75px]">{description}</p>
        </section>
    )
}