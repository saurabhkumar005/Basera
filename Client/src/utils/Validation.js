
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateName = (name)=>{
    if(!name){return "Name is required";}
    if(name.length<3)return "Name must be atleast 3 characters";
    return null;
};
export const validateEmail = (email)=>{
    if(!email)return "Email is required";
    if(!emailRegex.test(email))return "Invalid email format";
    return null;
};

export const validatePassword = (password)=>{
    if(!password) return "Password is required";
    if(password.length<8)return "Password must be at least 8 chars";
    // Optional: Strict check
    // if (!passwordRegex.test(password)) return "Password must contain uppercase, number, and special char";
    return null;
}

export const validatePhone = (phone)=>{
    if(!phone) return "Phone number is required";
    if(phone.length!==10)return "Phone number must be 10 digits";
    return null;
}