const express= require("express");
const requestRouter=express.Router();
const{userAuth}=require("../middlewares/auth")
const ConnectionRequestModel=require("../models/connectionRequest");
const User=require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
    try{
  const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
const  status  = req.params.status;

const allowedstatus=["ignored","interested"];
if(!allowedstatus.includes(status)){
    return res.status(400).json({
        message:"Invalid status type"
    })
}

const toUser =await User.findById(toUserId);
if(!toUser){
    return res.status(400).json({
        message:"User Not Found"
    })
}
const existingConnectionRequest=await ConnectionRequestModel.findOne({
    $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId},
    ]
})
if(existingConnectionRequest){
    return res.status(400).send({
        message:"Connection Request already Exists"
    });
}



    const connectionRequest=new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
    });
    const data=await connectionRequest.save();
    res.json({message:"connection Request Sent!",
        data
    })
    }catch(err){
  console.error("Connection request error:", err);
  res.status(400).send("Connection failed: " + err.message);
}

  
})

module.exports=requestRouter;
