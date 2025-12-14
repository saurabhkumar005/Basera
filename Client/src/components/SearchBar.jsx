import {Search} from 'lucide-react'
export default function searchBar(){
    // USEs Deatils:  
    // used on homepage front image search bar
    return (
        <div className=' h-12 w-[350px] md:w-[400px] border border-orange-400 rounded-full flex items-center bg-white  '>
                    <input type="text" className='w-full h-full outline-none px-5 bg-transparent text-gray-800 ' 
                    placeholder='Search PG, Rooms, Hostels...'/>
                    <button className='p-3 rounded-r-4xl bg-orange-400  ' aria-label='search home'>
                        <Search/>
                    </button>
                </div>
    )
}