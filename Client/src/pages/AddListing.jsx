import { useState, useEffect } from 'react'
import { addListing } from '../api/ListingData.js';
import {CloudUpload, UploadCloud, X, IndianRupee,  Phone, MapPin}  from "lucide-react";

export default function AddListing() {
    const amenitiesOptions = [
        "WiFi", "Power Backup",   "Attached Bathroom", "AC","Lift",
        "Parking", "Geyser", "Cleaning Included", "CCTV", "Gym",
        "RO Water",  "Mess/Food"
    ];

    const rulesOptions = [
        "No Smoking", "No Drinking", "No Non-Veg",
        "Girls Only", "Boys Only", "Any (Unisex)",
        "No Pets", "No Late Entry (10 PM)", "Quiet Hours"
    ];
    const [posted, setPosted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    const [formData, setFormData] = useState({
        title: "", listingType: "Room", city: "", address: "",
        price: null, sharingType: "", amenities: [], rules: [],
        contactNumber: ""
    });


    //cleanup of url whenever user leaves the page or reloads
    useEffect(()=>{
        return ()=>(previews.forEach(url=>URL.revokeObjectURL(url)));
    }, [])

    const handleImageChange = (e)=>{
        const files = Array.from(e.target.files);
        if(files.length + images.length >5){
            setError("You can only upload a maximum of 5 images.")
           
            return;
        }
        const newPreviews = files.map((file)=>URL.createObjectURL(file));
        setImages(prev => [...prev, ...files]);
        setPreviews(prev => [...prev, ...newPreviews]);
        setError("");
        e.target.value="";

    }

    const handleRemoveImage = (index)=>{
        setImages(prev=> prev.filter((_,i)=>i!==index));
        setPreviews(prev=>{
            URL.revokeObjectURL(prev[index]); //freeing memory taken by URL of previews in RAM
            return prev.filter((_,i)=>i!==index);
        }
        )
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
            
         if (name === "contactNumber") {
        // Regex /^\d*$/ means "Start to end, only digits allowed"
        if (!/^\d*$/.test(value)) {
            return; 
        }
    }
        if (name === "price") {
            if (value < 0) return;
        }
        setFormData({ ...formData, [name]: value });
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
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (images.length === 0) {
            setError("Please upload at least one image of your property.");
            window.scrollTo(0, 0);
            return; // Stop function here
        }
       
        if(formData.contactNumber.length<10){
               window.scrollTo(0, 0);
               setLoading(false);
            setError("Please enter valid contact number of length 10.");
            return;
        }
        setPosted(false);
        
        const userData = new FormData();
        // appending all values of form data one by one in form of key value pairs

        Object.keys(formData).forEach((key)=>{
            if(Array.isArray(formData[key])){
                formData[key].forEach(val=>userData.append(key, val));
            }else{
                userData.append(key, formData[key]);
            }
        });

        // appending all photos 
        images.forEach(item=>userData.append('listingImages', item));


        try {
            const res = await addListing(userData);
            // console.log("Listing posted Succesfully: " + res.data);
            setPosted(true);
            setImages([]);
            setPreviews([]);
            setFormData({
        title: "", listingType: "Room", city: "", address: "",
        price: "", sharingType: "", amenities: [], rules: [],
        contactNumber: ""
    });
    window.scrollTo(0,0);
        }
        catch (err) {
            // console.log("Error caught in posting new listing: " + err);
            setError(err.response?.data?.message || err.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }
const inputStyle =  "p-3 w-full  rounded-3xl focus:bg-gray-100 border-3 border-orange-200 focus:outline-none  hover:border-orange-400 focus:border-orange-500 placeholder-gray-500 shadow-[inset_3px_2px_6px_rgba(0,0,0,0.4)] focus:shadow-[inset_2px_0px_4px_rgba(0,0,0,0.6)]";
    return (

        <div className="flex justify-center items-center w-[100vw]  ">
            <div className="w-[80vw] max-w-[800px]  bg-orange-100 p-5 my-8 rounded-4xl">
                <div className='text-center w-full text-3xl text-orange-400 mb-2 font-bold'>
                    Add New Property
                </div>

                {error && <div className='text-center text-red-500 text-lg font-bold p-3'>
                    ‼️Error : { error}‼️
                    {  window.scrollTo(0,0)}
                </div>}
                {posted && <div className='text-center text-green-600 text-lg font-bold p-3'>
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
                            className={inputStyle}
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
                                className={inputStyle}
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
                                className={`${inputStyle}    text-center `}>
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
                        <div className={` ${inputStyle} flex `}>
                               <MapPin className='mr-1'/>
                        <input
                            required
                            type="text"
                            name="address"
                            placeholder='eg., 101, BK Apartement, Near Ambani Villa'
                            className={"w-full h-full outline-none "}
                            onChange={handleChange}
                            value={formData.address}
                        />
                        </div>
                    </div>

                    {/* price  and sharing type ad contact number*/}
                    <div className='flex gap-3 w-full flex-col md:flex-row'>
                        <div className="flex  gap-1 text-lg flex-col w-full">
                            <label htmlFor="price" className='font-bold  text-gray-700' >Price </label>
                            <div className={` ${inputStyle} flex `}>
                               <IndianRupee className='mr-1'/>
                            <input
                                type="number"
                                name="price"
                                placeholder='Enter price per month i.e, 5000, 6000, 30000, etc.'
                                className="w-full h-full outline-none  "
                                onChange={handleChange}
                                value={formData.price}
                            />
                            </div>
                        </div>
                        <div className='flex flex-col gap-1  '>
                            <label htmlFor="sharingType"
                                className='font-bold  text-gray-700 '>Sharing Type</label>
                            <select type="text" name="sharingType" value={formData.sharingType}
                                onChange={handleChange} required
                                  className={`${inputStyle} min-w-45   text-center `}>
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
                            <label htmlFor="contactNumber" className='font-bold  text-gray-700' >Contact/Whatsapp Number </label>
                            <div className={` ${inputStyle} flex `}>
                               <Phone className='mr-2'/>
                            <input
                                type="text"
                                name="contactNumber"
                                placeholder='Enter 10 digit Contact/Whatsapp number. eg. 987654321'
                                  className={` w-full h-full outline-none `}
                                onChange={handleChange}
                                value={formData.contactNumber}
                            />
                            </div>
                        </div>
                    </div>

                    {/* Amenities  and facilities*/}

                    <div className='flex gap-1'>
                        <div className="flex  gap-1 text-lg flex-wrap">
                            <label className='font-bold  text-gray-700' >Amenities & Facilities</label>
                            <div className='flex flex-wrap  gap-x-7 gap-y-2 '>
                                {amenitiesOptions.map((opt) => (
                                    <div key={opt} className='flex gap-2'>
                                        <input
                                            type="checkbox"
                                            name={opt}
                                            id={opt}
                                            value={opt}
                                            checked={formData.amenities.includes(opt)}
                                            onChange={(e) => { handleCheckboxChange(e, 'amenities') }}
                                            className='border-2 accent-orange-300 cursor-pointer w-5'
                                            

                                        />
                                        <label htmlFor={opt} className='text-gray-700'>{opt}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* rules */}
                    <div className='flex gap-1'>
                        <div className="flex  gap-1 text-lg flex-wrap">
                            <label className='font-bold  text-gray-700' >Rules</label>
                            <div className='flex flex-wrap  gap-x-7 gap-y-2 '>
                                {rulesOptions.map((opt) => (
                                    <div key={opt} className='flex gap-2 '>
                                        <input
                                            type="checkbox"
                                            name={opt}
                                            id={opt}
                                            value={opt}
                                            checked={formData.rules.includes(opt)}
                                            onChange={(e) => { handleCheckboxChange(e, 'rules') }}
                                            className='border-2 accent-orange-300 cursor-pointer w-5'

                                        />
                                        <label htmlFor={opt} className='text-gray-700'>{opt}</label>
                                    </div>
                                ))}
                            </div>

                            {/* Listing Image add section  */}
                            <div className='mt-3 '>
                                <label className='font-bold text-gray-700  mb-2 block'> Upload Listing Photos (Min 1, Max 5)</label>
                                <div className='flex justify-start gap-3 flex-wrap'>
                                    { images.length<5 && <label className='group ml-2 border rounded-xl  w-32 h-28 flex flex-col justify-center items-center bg-white  hover:border-orange-400 hover:border-3 border-dashed '>
                                        <UploadCloud size={40} className='group-hover:text-orange-400 hover:-translate-y-[0.1em]'/>
                                        <span className='text-sm group-hover:text-orange-400 hover:font-bold'> Click to Upload</span>
                                        <input onChange={handleImageChange} type='file' multiple accept="image/*" className='hidden '/>
                                    </label>
                                    }
                                    {previews.map((prv, index)=>(
                                    <div className='w-32 h-28 flex justify-center items-center relative' key={index}>
                                        <img className='w-full h-full rounded-2xl object-cover ' src={prv} alt="preview"/>
                                        <X className='top-0 absolute right-0 text-white m-1 hover:-translate-y-[0.1rem]' onClick={()=>handleRemoveImage(index)}/>
                                    </div>
                                ))}
                                </div>
                                
                            </div>
                            <div className=' w-full   flex justify-center mt-4 '>
                                <button
                                    className={` ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-b from-orange-200 to-orange-400 hover:bg-gradient-to-b hover:from-orange-300 hover:to-orange-500   hover:shadow-orange-300'} bg-gray-200  hover:shadow-md rounded-3xl p-3 px-6 text-gray-900 text-xl`} >{loading ? 'Submitting...' : 'Post Listing'}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}