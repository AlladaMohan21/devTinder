const express=require("express");
const authRouter=express.Router();
const {validationDatabase}=require("../utils/validation")
const bcrypt=require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login",async (req,res)=>{
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

});

authRouter.post("/logout",async (req,res)=>{
    try{
    res.cookie("token","",{
        expires:new Date(Date.now()),
    });
    res.status(200).send("Logout successful");
}catch(err){
    res.status(400).send("logout failed");
}
})

module.exports=authRouter;
