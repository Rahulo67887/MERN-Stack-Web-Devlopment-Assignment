require("dotenv").config();
const express=require("express");
const connectDB=require("./connectDB.js");

const app=express();

connectDB();//connect database

app.use(express.json()); // Parse JSON

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})
