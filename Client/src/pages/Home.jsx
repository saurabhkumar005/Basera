import HeroSection from "../components/HomePage/HeroSection";
import FeaturedListings from "../components/HomePage/FeaturedListing"
export default function Home() {
    return (
       <div className="w-full" >
            <HeroSection/>
            <FeaturedListings/>
       </div>
    );
}