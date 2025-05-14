import { JSX } from "react";
import BannerImage from "../../assets/banner.png";
import DiscoverCard from "../../components/DiscoverCard";

const discoverCards = [
    {
        image: "https://tse4.mm.bing.net/th?id=OIP.DfH6LbKjC_9XoPsEdqyUhAHaE8&w=316&h=316&c=7",
        title: "Gaming Communities",
        description: "Join active servers dedicated to gaming, tournaments and support",
        badges: ["Gaming", "Community"],
        isNew: true,
    },
    {
        image: "https://tse2.mm.bing.net/th?id=OIP.cSPcYqqrQBlnhyZf8t-wBQHaEH&w=263&h=263&c=7",
        title: "E-Learning",
        description: "Explore servers dedicated to learning new skills",
        badges: ["Education", "Language"],
    },
    {
        image: "https://tse2.mm.bing.net/th?id=OIP.iEo8mHAdU6baQVM_KYmL5QHaHa&w=474&h=474&c=7",
        title: "Music & Chill",
        description: "Listen and share your music with other fans",
        badges: ["Music", "Recreation"],
    },
    {
        image: "https://tse4.mm.bing.net/th?id=OIP.l-GKXxGLEeLgjyA4O6viEAHaE8&w=316&h=316&c=7",
        title: "Web Development",
        description: "Collaborates and progresses with other fullstack developers",
        badges: ["Dev", "Code"],
        isNew: true,
    },
];

export default function Discover(): JSX.Element {
    return (
        <div>
            <section
                className="hero relative w-full h-[437px] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${BannerImage})`,
                }}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Find your community on GamerZ</h1>
                        <p className="mb-5">
                            From gaming, to music, to learning, there's a place for you.
                        </p>
                    </div>
                </div>
            </section>
            <section className="grid grid-col-1 justify-items-center bg-white p-10">
                <label className="input bg-neutral/30 w-full max-w-md rounded-lg">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input type="search" className="grow" placeholder="Search" />
                </label>
                <section className="grid grid-cols-3 justify-items-end gap-4 mt-4">
                    <div className="pt-5">
                        <ul className="menu bg-base-200 rounded-box w-56">
                            <li>
                                <a>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    All
                                </a>
                            </li>
                            <li>
                                <a>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Gaming
                                </a>
                            </li>
                            <li>
                                <a>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Entertainment
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-2 grid gap-6 pt-5">
                        {discoverCards.map((card, index) => (
                            <DiscoverCard
                                key={index}
                                image={card.image}
                                title={card.title}
                                description={card.description}
                                badges={card.badges}
                                isNew={card.isNew}
                            />
                        ))}
                    </div>
                </section>
            </section>
        </div>
    );
}