const jwt=require("jsonwebtoken");
const User=require("../models/user")
const userAuth = async (req, res, next) => {
    const {token}=req.cookies;
    try{
    if(!token){
        throw new Error("Token not Found");
    }
    const decodedObj=await jwt.verify(token,"DEV@Tinder$123")
    const {_id}=decodedObj;
    const user=await User.findById(_id);
    if(!user){
        throw new Error("user Not found");
    
    }
    req.user=user;
    next();
    }catch(err){
        res.status(400).send("ERROR"+err.message);
    }



}

module.exports = {
  userAuth,
};