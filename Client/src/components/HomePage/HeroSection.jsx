import HomeBG from "../../assets/images/homeBackground.png"
import SearchBar from '../SearchBar';
export default function HeroSection(){
    return(
 <div className='w-[100vw] h-[650px] bg-cover bg-center bg-no-repeat relative'
            style={{ backgroundImage: `url(${HomeBG})` }}
        >
            <div className='absolute inset-0 bg-black/30 '></div>
            <div className='flex flex-col  top-30   z-10 relative  items-center w-full h-full p-5 text-white'>
                <h1 className=' md:text-4xl text-3xl  text-[#E98234]'>Find Your Peace, Find Your Basera</h1>
                {/* Tagline idea: Your Home Away From Home */}
                <p className="text-lg md:text-xl mb-8 mt-1">
                    Discover the perfect PG, Flat, or Room across India
                </p>
                <SearchBar/>

            </div>
        </div>

    )
}