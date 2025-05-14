import { JSX, useState } from "react";
import BannerImage from "../../assets/banner.png";
import Jimmy from "../../assets/jimmy.jpg";
import Mathieu from "../../assets/mathieu.jpg";

export default function Careers(): JSX.Element {
    const [current, setCurrent] = useState(0);
    const slides = [Jimmy, Mathieu];
  
    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

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
                        <h1 className="mb-5 text-5xl font-bold">WORK AT GamerZ</h1>
                        <p className="mb-5">
                            Our employees aren’t just the most talented folks in the industry (we may be a little biased),
                            they’re also deeply passionate about gaming, fostering meaningful connections, and of course, GamerZ.
                        </p>
                        <button className="btn btn-primary">See All Jobs</button>
                    </div>
                </div>
            </section>
            <section className="flex flex-col justify-center content-center p-10">
                <div className="text-center p-10">
                    <h2 className="mb-5 text-3xl font-bold">BE A PART OF THE FUTURE OF GAMING</h2>
                    <p className="mb-5">
                        We believe GamerZ is uniquely positioned to shape the future of gaming. We aren’t just imagining what it may look like,
                        we’re building GamerZ to be the perfect place to talk while playing games on any platform, no matter what device you play on.
                    </p>
                </div>
                <div className="relative w-full max-w-xl mx-auto overflow-hidden rounded-2xl">
                    <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
                        {slides.map((img, i) => (
                        <img key={i} src={img} className="w-full flex-shrink-0" />
                        ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-between px-5">
                        <button onClick={prev} className="btn btn-circle bg-base-200/70">❮</button>
                        <button onClick={next} className="btn btn-circle bg-base-200/70">❯</button>
                    </div>
                </div>
            </section>
            <section className="text-center p-10">
                <h2 className="mb-5 text-3xl font-bold">DON'T JUST IMAGINE THE FUTURE OF GAMING - BUILD IT WITH US.</h2>
                <p className="mb-8">
                    Explore our careers page and see if any of our open jobs would be a great fit for you.
                </p>
                <div className="join">
                    <input className="join-item btn" type="radio" name="options" aria-label="Creative & Brand" />
                    <input className="join-item btn" type="radio" name="options" aria-label="Customer Experience" />
                    <input className="join-item btn" type="radio" name="options" aria-label="Data Science & Machine Learning" />
                    <input className="join-item btn" type="radio" name="options" aria-label="Developers" />
                </div>
                <ul className="list bg-base-100 rounded-box shadow-md">

                    <li className="list-row">
                        <div className="badge badge-outline badge-primary">Creative & Brand</div>
                        <div>
                            <div>Creative Director, Developers</div>
                            <div className="text-xs uppercase font-semibold opacity-60">Remote (U.S)</div>
                        </div>
                    </li>

                    <li className="list-row">
                        <div className="badge badge-outline badge-primary">Customer Experience</div>
                        <div>
                            <div>Customer Experience Associate, Account Security</div>
                            <div className="text-xs uppercase font-semibold opacity-60">Amsterdam, Netherlands</div>
                        </div>
                    </li>

                    <li className="list-row">
                        <div className="badge badge-outline badge-primary">Data Science & Machine Learning</div>
                        <div>
                            <div>Senior Software Engineer, Machine Learning (Ads)</div>
                            <div className="text-xs uppercase font-semibold opacity-60">San Francisco, CA or Remote (U.S.)</div>
                        </div>
                    </li>

                    <li className="list-row">
                        <div className="badge badge-outline badge-primary">Developers</div>
                        <div>
                            <div>Senior Developer Advocate, Web Games</div>
                            <div className="text-xs uppercase font-semibold opacity-60">San Francisco, CA or Remote (U.S.)</div>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    );
}