import jwt from 'jsonwebtoken'

//this middleware will run before all API where we need tonallow only valid logined call/user

//no need of async and await as this middleware do all operation sychronusly
export default  function verifyToken(req, res, next){
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer ")){
        return res.status(401).json({message: "Access Denied, Please Login!"});
    }
    const token = header.split(" ")[1];
    try{
        const dataDecoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = dataDecoded;
        next();
    }catch(err){
        return res.status(403).json({message: "Access Denied! Invalid or expired token "})
    }
}

//always add authmiddleware to user specific/ protect routes 
// that you don;t want to access by anyone , public routes like show all routes , homepage, login are same for 
// all and can be accessed by anyone, but protected routes are user specific routes
// like user listings, or add new listing , these had to be done by specific user, not anyone can access this instead of anyone
