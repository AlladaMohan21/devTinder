const express=require("express");
const profileRouter=express.Router();
const{userAuth}=require("../middlewares/auth")
const {validateEditProfileData}=require("../utils/validation")
const bcrypt = require("bcrypt");



profileRouter.get("/profile/view",userAuth,async (req,res)=>{
try{
const userId=req.user; 
res.send(userId);
}catch (err) {
    res.status(400).send("Something went wrong ");
  }
})

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{

     if(!validateEditProfileData(req))   {
        throw new Error("invalid Edit Request");
     }

     const loggedInUser=req.user;

Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
await loggedInUser.save();

res.json({message:`${loggedInUser.firstName},Your profile updated successfully`,
data:loggedInUser})
    }catch(err){
res.status(400).send("ERROR: "+ err.message);
    }
})

profileRouter.patch("/profile/forgotpassword", userAuth, async (req, res) => {
  try {
    const { password } = req.body;
    const loggedInUser = req.user;

    // hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)

    loggedInUser.password = hashedPassword;
    await loggedInUser.save();

    res.send("Password updated successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports=profileRouter