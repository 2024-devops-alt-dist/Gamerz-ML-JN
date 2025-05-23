import { JSX } from "react";
import BannerImage from "../../assets/banner.png";
import Card from "../../components/Card";

export default function Home(): JSX.Element {
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
                        <h1 className="mb-5 text-5xl font-bold">IMAGINE A PLACE...</h1>
                        <p className="mb-5">
                            ...where you can belong to a school club, a gaming group, or a worldwide art community.
                            Where just you and a handful of friends can spend time together.
                            A place that makes it easy to talk every day and hang out more often.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </section>
            <section className="grid grid-cols-1 gap-4 p-10 bg-secondary/70 pb-20">
                <h2 className="text-3xl font-bold">Main features</h2>
                <Card />
            </section>
        </div>
    );
}