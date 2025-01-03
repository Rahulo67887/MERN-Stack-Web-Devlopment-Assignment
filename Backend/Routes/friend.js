const express=require("express");
const User=require("../Models/user");
const authenticate=require("..middleware/authenticate");

const router=express.Router();

router.get("./search", authenticate, async (req, res)=>{
    const query=req.query.query || " ";
    try{
        const users=await User.find({username : {$regex: query, $options: "i"}}); //searching user
        req.json(users);
    }catch (err){
        res.status(500).json({ message: "Server error" });
    }
});

module.exports=router;