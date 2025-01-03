const express=require("express");
const User=require("../Models/user");
const authenticate=require("../middleware/authenticate");

const router=express.Router();

router.get("/search",  async (req, res)=>{
    const query=req.query.query || " ";
    try{
        const users=await User.find({userName : {$regex: query, $options: "i"}}); //searching user
        res.json(users);
    }catch (err){
        res.status(500).json({ message: err.message});
    }
});

module.exports=router;