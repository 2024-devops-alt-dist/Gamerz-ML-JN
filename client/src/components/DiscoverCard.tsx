import { JSX } from "react";

type DiscoverCardProps = {
    image: string;
    title: string;
    description: string;
    badges: string[];
    isNew?: boolean;
};

export default function DiscoverCard({ image, title, description, badges, isNew = false }: DiscoverCardProps): JSX.Element {
    return (
        <div className="card card-side bg-base-100 w-full shadow-sm">
            <figure>
                <img src={image} alt={title} className="h-full w-36 object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                    {isNew && <div className="badge badge-secondary">NEW</div>}
                </h2>
                <p>{description}</p>
                <div className="card-actions justify-end flex-wrap gap-2">
                    {badges.map((badge, index) => (
                        <div key={index} className="badge badge-outline">{badge}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
