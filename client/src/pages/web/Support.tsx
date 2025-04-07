import { JSX } from "react";
import BannerImage from "../../assets/banner.png";
import SupportCard from "../../components/SupportCard";

export default function Support(): JSX.Element {

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
                        <h1 className="mb-5 text-5xl font-bold">Help Center</h1>
                        <label className="input bg-neutral/30 w-full max-w-md rounded-lg">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                            <input type="search" className="grow" placeholder="Search" />
                        </label>
                    </div>
                </div>
            </section>
            <section className="grid grid-col-1 justify-items-center bg-white p-10">
                <div className="max-w-md">
                    <h2 className="mb-5 text-3xl text-neutral font-bold">Need help? We've got your back.</h2>
                    <p className="mb-5 text-xl text-neutral">
                        From gaming, to music, to learning, there's a place for you.
                    </p>
                </div>
                <section className="flex flex-wrap justify-center gap-4 mt-4">
                    <SupportCard />
                    <SupportCard />
                    <SupportCard />
                    <SupportCard />
                    <SupportCard />
                    <SupportCard />
                    <SupportCard />
                    <SupportCard />
                </section>
                <h2 className="my-5 text-3xl text-neutral font-bold">Other ways to find help.</h2>
                <section className="flex flex-wrap justify-center gap-4 mt-4">
                    <SupportCard />
                    <SupportCard />
                    <SupportCard />
                    <SupportCard />
                </section>
            </section>
        </div>
    )
}