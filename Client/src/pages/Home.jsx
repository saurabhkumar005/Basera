import HeroSection from "../components/HomePage/HeroSection";
import FeaturedListings from "../components/HomePage/FeaturedListing"
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="w-full bg-slate-50">
            <HeroSection />
            <section className="max-w-screen-xl mx-auto px-4 py-4">
                <FeaturedListings />
            </section>
            <section className="pb-15 px-4">
                <div className="max-w-screen-xl mx-auto">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 text-white px-8 py-14 text-center shadow-xl">

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Own a Property?</h2>
                            <p className="text-orange-100 text-base md:text-lg mb-8 max-w-xl mx-auto">
                                List your PG, flat, or room on Basera for free and connect with thousands of serious tenants today.
                            </p>
                            <Link
                                to="/listing/add"
                                className="inline-block bg-white text-orange-600 font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-base"
                            >
                                List Your Property — It's Free →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}