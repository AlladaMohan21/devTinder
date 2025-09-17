const express = require("express");
const {connectDb}=require("./config/database")
const User=require("./models/user")

const app = express();
app.use(express.json());

app.get("/user",async (req,res)=>{
    try{
const userEmail=req.body.emailId;
    const user= await User.find({emailId:userEmail});
    if(user.length===0){
        res.status(400).send("user data not found");
    }else{
    res.send(user);
    }
    }catch(err){
        res.status(400).send("user data not found");
    }
    

})

app.get("/feed",async (req,res)=>{
    try{
 const users=req.body;
    const userdata=await User.find({});
    res.send(userdata);
    }catch(err){
        res.status(400).send("No users left");
    }
   

})

app.get("/id",async (req,res)=>{
    try{
        const userId = req.body.userId;
        const users=await User.findById(userId);
        res.send(users);
    }catch(err){
        res.status(400).send("user data not found");
    }
})

app.delete("/user",async (req,res)=>{
    try{
        const user=req.body.userId;
        const users=await User.findByIdAndDelete(user);
        res.send("deleted Successfully");

    }catch(err){
        res.status(400).send("error")
    }
    
})

app.patch("/user",async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try{
        const users= await User.findByIdAndUpdate(userId,data,{
            returnDocument:"after"
        });
        res.send("Data updated Successfully");

    }catch(err){
        res.status(400).send("Something went wrong");
    }
})

app.post("/signup",async (req,res)=>{
    try{
const user =new User(req.body);

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

