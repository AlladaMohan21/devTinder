const express = require("express");
const {connectDb}=require("./config/database")
const User=require("./models/user")

const app = express();



app.post("/signup",async (req,res)=>{
    try{
const user =new User({
    firstname:"amrutha",
    lastName:"roshni",
    emailId:"amrutha21@gmail.com",
    password:"1432",
    gender:"female"
})

await user.save();
res.send("data added successfully");
    }catch(err){
        res.status(400).send("Error Saving data"+err.message)
    }


})

connectDb()
.then(()=>{
console.log("Database Connection Established!");
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
}).catch((err)=>{
    console.error("Database Cannot be connected");
});

