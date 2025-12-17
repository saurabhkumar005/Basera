import { useState } from 'react'
export default function AddListing() {
    const amenitiesOptions = [
        "WiFi", "AC", "Power Backup", "Attached Bathroom",
        "Cleaning Included", "Parking", "Geyser", "CCTV",
        "RO Water", "Lift", "Gym", "Mess/Food"
    ];

    const rulesOptions = [
        "No Smoking", "No Drinking", "No Non-Veg",
        "Girls Only", "Boys Only", "Any (Unisex)",
        "No Pets", "No Late Entry (10 PM)", "Quiet Hours"
    ];
    const [posted, setPosted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "", listingType: "", city: "", address: "",
        price: "", sharingType: "", amenities: [], rules: [],
        contactNumber: "", owner: ""
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: [value] });
    }

    const handleCheckboxChange = (e, category) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            const currentList = prev[category];
            if (checked) {
                return { ...prev, [category]: [...currentList, value] };
            }
            else {
                return { ...prev, [category]: currentList.filter((val) => val !== value) };
            }
        });
    }
    const handleSubmit = () => {
        
    }

    return (

        <div className="flex justify-center items-center w-[100vw] ">
            <div className="w-[80vw] max-w-[800px]  bg-orange-100 p-5 my-8">
                <div className='text-center w-full text-3xl text-orange-500 mb-2 font-bold'>
                    Add New Property
                </div>

                {error && <div className='text-red-500 text-lg font-bold p-3'>
                    ‼️Error Caught:
                    {error}
                    ‼️
                </div>}
                 {posted && <div className='text-green-600 text-lg font-bold p-3'>
                   ✅ Listing Added Successfully: {formData.title}
                    {error}
                   ✅ 
                </div>}
                <form onSubmit={handleSubmit} className=' flex flex-col  gap-4 text-lg'>
                    <div className="flex  gap-1 text-lg flex-col">
                        <label htmlFor="title" className='font-bold  text-gray-700' >Title </label>
                        <input
                            type="text"
                            name="title"
                            placeholder='eg., 4-BHK Flat Near Marine Drive... '
                            className='border-2 p-2 rounded-xl w-full focus:border-orange-400   focus:outline-none'
                            required
                            onChange={handleChange}
                            value={formData.title}
                        />
                    </div>

                    {/* city and listing type */}
                    <div className='flex gap-3 w-full '>
                        <div className="flex  gap-1 text-lg flex-col w-[50%]">
                            <label htmlFor="city" className='font-bold  text-gray-700' >City </label>
                            <input
                                type="text"
                                name="city"
                                placeholder='eg., Mumbai'
                                className='border-2 p-2 rounded-xl  focus:border-orange-400   focus:outline-none'
                                required
                                onChange={handleChange}
                                value={formData.city}
                            />
                        </div>
                        <div className='flex flex-col gap-1  w-[50%]  '>
                            <label htmlFor="listingType"
                                className='font-bold  text-gray-700 '>Property Type</label>
                            <select type="text" name="listingType" value={formData.listingType}
                                onChange={handleChange}
                                className='border-2 flex  h-12 border-2 rounded-xl text-center focus:outline-none focus:border-orange-400'>
                                <option className=' border rounded-2xl bg-orange-200' value="Room">Room</option>
                                <option className=' border rounded-2xl bg-orange-200' value="PG">PG</option>
                                <option className=' border rounded-2xl bg-orange-200' value="Flat">Flat</option>
                                <option className=' border rounded-2xl bg-orange-200' value="Hostel" >Hostel</option>
                            </select>
                        </div>

                    </div>

                    {/* Address */}
                    <div className="flex  gap-1 text-lg flex-col">
                        <label htmlFor="address" className='font-bold  text-gray-700' >Address </label>
                        <input
                            required
                            type="text"
                            name="address"
                            placeholder='eg., 101, BK Apartement, Near Ambani Villa'
                            className='border-2 p-2 rounded-xl w-full focus:border-orange-400   focus:outline-none'

                            onChange={handleChange}
                            value={formData.address}
                        />
                    </div>

                    {/* price  and sharing type ad contact number*/}
                    <div className='flex gap-3 w-full'>
                        <div className="flex  gap-1 text-lg flex-col w-full">
                            <label htmlFor="price" className='font-bold  text-gray-700' >Price </label>
                            <input
                                type="text"
                                name="price"
                                placeholder='eg., Rs. 25K Per Month'
                                className='border-2 p-2 rounded-xl w-full focus:border-orange-400   focus:outline-none'
                                onChange={handleChange}
                                value={formData.price}
                            />
                        </div>
                        <div className='flex flex-col gap-1   '>
                            <label htmlFor="sharingType"
                                className='font-bold  text-gray-700 '>Sharing Type</label>
                            <select type="text" name="sharingType" value={formData.sharingType}
                                onChange={handleChange} required
                                className='border-2 flex  h-12 border-2 rounded-xl text-center focus:outline-none focus:border-orange-400'>
                                <option className=' border rounded-2xl bg-orange-200' disabled value="" >Select Occupancy</option>
                                <option className=' border rounded-2xl bg-orange-200' value="Single">Single</option>
                                <option className=' border rounded-2xl bg-orange-200' value="Double">Double</option>
                                <option className=' border rounded-2xl bg-orange-200' value="Triple">Triple</option>
                                <option className=' border rounded-2xl bg-orange-200' value="Quadruple" >Quadruple</option>
                                <option className=' border rounded-2xl bg-orange-200' value="Dormatory" >Dormatory(5+)</option>
                            </select>
                        </div>
                        {/* contact number */}
                        <div className="flex  gap-1 text-lg flex-col w-full">
                            <label htmlFor="contactNumber" className='font-bold  text-gray-700' >Contact Number </label>
                            <input
                                type="text"
                                name="contactNumber"
                                placeholder='eg., +91987654321'
                                className='border-2 p-2 rounded-xl w-full focus:border-orange-400   focus:outline-none'
                                onChange={handleChange}
                                value={formData.contactNumber}
                            />
                        </div>
                    </div>

                    {/* Amenities  and facilities*/}

                    <div className='flex gap-1'>
                        <div className="flex  gap-1 text-lg flex-wrap">
                            <label className='font-bold  text-gray-700' >Amenities & Facilities</label>
                            <div className='flex flex-wrap gap-2 '>
                                {amenitiesOptions.map((opt) => (
                                    <div key={opt} className='flex gap-1 '>
                                        <input
                                            type="checkbox"
                                            value={opt}
                                            checked={formData.amenities.includes(opt)}
                                            onChange={(e) => { handleCheckboxChange(e, 'amenities') }}
                                            className='border-2 accent-orange-400 cursor-pointer'

                                        />
                                        <span className='text-gray-700'>{opt}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* rules */}
                    <div className='flex gap-1'>
                        <div className="flex  gap-1 text-lg flex-wrap">
                            <label className='font-bold  text-gray-700' >Rules</label>
                            <div className='flex flex-wrap gap-2'>
                                {rulesOptions.map((opt) => (
                                    <div key={opt} className='flex gap-1 '>
                                        <input
                                            type="checkbox"
                                            value={opt}
                                            checked={formData.rules.includes(opt)}
                                            onChange={(e) => { handleCheckboxChange(e, 'rules') }}
                                            className='border-2 accent-orange-400 cursor-pointer'

                                        />
                                        <span className='text-gray-700'>{opt}</span>
                                    </div>
                                ))}
                            </div>
                            <div className='-mx-4 w-full h-10  flex justify-center mt-4 '>
                                <button
                                    className={` ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-400 hover:bg-orange-500  hover:shadow-orange-700'} bg-gray-700  hover:shadow-lg rounded-xl p-2 px-7 `} >{loading ? 'Submitting...' : 'Post Listing'}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}