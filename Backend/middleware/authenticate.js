const jwt=require("jsonwebtoken");

const authenticate=(req, res, next)=>{
    const token=req.header("Authorization")?.split(" ")[1];
    if(!token) return res.status(401).json({message : "Unauthorized"});

    try{
        const decoded=jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
        next();
    }catch(err){
        res.status(403).json({message : "Invalid Token"});
    }
};

module.exports=authenticate;