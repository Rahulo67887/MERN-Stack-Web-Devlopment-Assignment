const express=require("express");
const User=require("../Models/user");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const router=express.Router();

router.post("/signup", async(req, res)=>{
    const{name, userName, password}=req.body;
    try{
        const newUser=new User(name, userName, password);
        await newUser.save(); //saving user in database
        res.status(201).json({message : "User registered"});
    } catch(err){
        res.status(400).json({message : "Error registering user"});
    }
});

router.post("/login", async(req, res)=>{
    const{ userName, password}=req.body;
    try{
        const user=await User.findOne({userName}); //finding user
        if(!user) return res.status(400).json({message : "Invalid UserName"}); 

        const isMatch=await bcrypt.compare(user.password, password); //checking if password is correct or not
        if(!isMatch) return res.status(400).json({message : "Invalid Password"});

        const token=jwt.sign({id : user.id}, process.env.SECRET, {expiresIn: "1h"});//saving user in web token
        res.json({token});
    } catch(err){
        return res.status(500).json({message : "Server Error"});
    }
});

module.exports=router;