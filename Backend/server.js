require("dotenv").config();
const express=require("express");
const connectDB=require("./connectDB.js");

const app=express();
app.use(express.json()); // Parse JSON

connectDB();//connect database

const authRoutes=require("./Routes/auth.js");
const friendRoutes=require("./Routes/friend.js");

app.use("/app/auth", authRoutes);
app.use("/app/friend", friendRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})
