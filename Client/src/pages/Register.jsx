import loginBG from "../assets/images/loginBG.png"
import OrangeButton from "../components/UI/orangeButton";
import {Link} from 'react-router-dom'
export default function Register() {
    const inputStyle =  "w-full p-3 rounded-2xl bg-gray-200 border-2 border-gray-200 focus:outline-none  hover:border-orange-500 focus:border-orange-500 placeholder-gray-500 shadow-[inset_2px_3px_6px_rgba(0,0,0,0.4)] focus:shadow-[inset_2px_0px_4px_rgba(0,0,0,0.6)]";
    return (
        <>
            <div
                style={{ backgroundImage: `url(${loginBG})` }}
                className={` w-screen h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center`}>
                <div className="p-6 w-90 sm:w-120  bg-white/40 relative z-10 backdrop-blur-sm border border-white/90 shadow-xl rounded-4xl flex flex-col gap-2">

                    {/* Header */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl text-orange-500 font-bold text-center">Register </h1>
                        <p className=" text-center text-xl">Welcome to Basera!</p>
                    </div>

                    {/* Register form */}
                    <form className="text-lg text-gray-900 flex flex-col gap-2">
                        <label htmlFor="name">
                            Name
                        </label>
                        <input name="name"
                            className= {inputStyle}
                            placeholder="Enter your Name"
                        />
                         <label htmlFor="phone">
                            Phone Number
                        </label>
                        <input name="phone"
                            className= {inputStyle}
                            placeholder="Enter your Phone Number"
                        />
                        <label htmlFor="email">
                            Email
                        </label>
                        <input name="email"
                            className= {inputStyle}
                            placeholder="Enter your email"
                        />
                        <label htmlFor="password">
                            Password
                        </label>
                        <input name="password"
                            className={inputStyle}
                            placeholder="Enter your Password"
                        />
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