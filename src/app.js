const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validationDatabase}=require("./utils/validation")
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const{userAuth}=require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser())

app.post("/signup", async (req, res) => {
//validate user 
validationDatabase(req);

//encrypt password
const{firstName,lastName,emailId,password}=req.body;
  const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }
const validatePass=await bcrypt.hash(password,10);
console.log(validatePass);
  //   Creating a new instance of the User model
  const user = new User({
    firstName,
    lastName,
    password:validatePass,
    emailId
  });

  try {
    await user.save();
    runValidators=true;
    res.send("User Added successfully!");
  } catch (err) {
if (err.code === 11000) {
      return res.status(400).send("Email already exists");
    }
    res.status(400).send("Error saving user: " + err.message);
  }
});

app.post("/login",async (req,res)=>{
const {emailId,password}=req.body;
try{
const user=await User.findOne({emailId:emailId});
if(!user){
    throw new Error("Invalid Credentials")
}

const isPasswordValid=await user.validatePassword(password);
if(isPasswordValid){
    //create a jwt token
    const token =await user.getJWT();
    //add token to the cookie and send back the response
    res.cookie("token",token,{expires:new Date(Date.now()+ 8* 3600000)});
    res.send("Login Successfull..")
}else{
    throw new error("Invalid Credentials")
}
}catch(err){
    res.status(400).send("invalid Credentials "+ err.message);
}

})

app.get("/profile",userAuth,async (req,res)=>{
try{
const userId=req.user; 
res.send(userId);
}catch (err) {
    res.status(400).send("Something went wrong ");
  }
})
app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
    const user=req.user;
    res.send("connection Request Sent!")
})

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });