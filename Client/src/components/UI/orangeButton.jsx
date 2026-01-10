export default function OrangeButton({placeholder, type}){
    return(
     <button  type={type}
     className="bg-gradient-to-b from-orange-400 to-orange-600 
     hover:bg-gradient-to-b hover:from-orange-400 hover:to-orange-700 
      p-3 mt-4  rounded-4xl    text-xl">
        {placeholder}
        </button>
    )
}
// used in: login, register page