import loginBG from "../assets/images/loginBG.png"
import OrangeButton from "../components/UI/orangeButton";
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { RegisterUser } from "../api/AuthApi.js";
import { validateEmail, validateName, validatePassword, validatePhone } from "../utils/Validation.js";
export default function Register() {
    const inputStyle =  "w-full p-3 rounded-2xl bg-gray-200 border-2 border-gray-200 focus:outline-none  hover:border-orange-500 focus:border-orange-500 placeholder-gray-500 shadow-[inset_2px_3px_6px_rgba(0,0,0,0.4)] focus:shadow-[inset_2px_0px_4px_rgba(0,0,0,0.6)]";
    const [formData, setFormData] = useState({name:"", phone:"", email:"", password:""});
    const [globalError, setGlobalError] = useState("");
    const [validationError, setValidationError] = useState({});


    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData((data)=>({...data, [name]:value}));
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setValidationError({});
        setGlobalError("");

        const newErrors = {};

        const nameError = validateName(formData.name);
        if(nameError) newErrors.name = nameError;

        const emailError = validateEmail(formData.email);
        if(emailError) newErrors.email = emailError;

        const passwordError = validatePassword(formData.password);
        if(passwordError) newErrors.password = passwordError;

        const phoneError = validatePhone(formData.phone);
        if(phoneError) newErrors.phone = phoneError;

        if(Object.keys(newErrors).length>0){
            setValidationError(newErrors);
            return;
        }

        try{
            const res = await RegisterUser(formData);
            navigate('/login');
        }catch(err){
            let backendError = err.response?.data?.message;
            setGlobalError(backendError);
        }
    }
    return (
        <>
            <div
                style={{ backgroundImage: `url(${loginBG})` }}
                className={` w-screen h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center`}>
                <div className="p-6 w-100 sm:w-120  bg-white/40 relative z-10 backdrop-blur-md border border-white/90 shadow-xl rounded-4xl flex flex-col gap-2">

                    {/* Header */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl text-orange-500 font-bold text-center">Register </h1>
                        <p className=" text-center text-xl">Welcome to Basera!</p>
                    </div>

                    {/* error from server side */}
                     {globalError && <div className="font-bold text-center text-red-600 ">
                        ‼️{globalError}‼️
                    </div>
                    } 
                    {/* Register form */}
                    <form onSubmit={(e)=>{handleSubmit(e)}} 
                    className="text-lg text-gray-900 flex flex-col gap-2"
                    >
                        <label htmlFor="name">
                            Name
                        </label>
                        <input name="name"
                            className= {inputStyle}
                            placeholder="Enter your Name"
                            onChange={(e)=>handleChange(e)}
                            value={formData.name}
                        />
                        {/* validation error  */}
                        {validationError.name && <span className="text-red-600 ">  {validationError.name}</span>}

                         <label htmlFor="phone">
                            Phone Number
                        </label>
                        <input name="phone"
                            className= {inputStyle}
                            placeholder="Enter your Phone Number"
                            onChange={(e)=>handleChange(e)}
                            value={formData.phone}
                        />
                        {/* validation error  */}
                        {validationError.phone && <span className="text-red-600 ">  {validationError.phone}</span>}

                        <label htmlFor="email">
                            Email
                        </label>
                        <input name="email"
                            className= {inputStyle}
                            placeholder="Enter your email"
                            onChange={(e)=>handleChange(e)}
                            value={formData.email}
                        />
                        {/* validation error  */}
                        {validationError.email && <span className="text-red-600 ">  {validationError.email}</span>}

                        <label htmlFor="password">
                            Password
                        </label>
                        <input name="password"
                            className={inputStyle}
                            placeholder="Enter your Password"
                            onChange={(e)=>handleChange(e)}
                            value={formData.password}
                        />
                        {/* validation error  */}
                        {validationError.password && <span className="text-red-600 ">  {validationError.password}</span>}

                    <OrangeButton placeholder={"Create Your Account"} type={"submit"}/>
                    </form>
                    <div className=" flex justify-center">
                    <Link to="/login" className=" hover:text-sky-700 hover:underline"> Already Registered? LogIn</Link>
                    </div>
                </div>
            </div>
        </>
    )
}