const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validationDatabase}=require("./utils/validation")
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");

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

const isPasswordValid=await bcrypt.compare(password,user.password);
if(isPasswordValid){
    //create a jwt token
    const token =await jwt.sign({_id:user._id},"DEV@Tinder$123");

    //add token to the cookie and send back the response
    res.cookie("token",token);
    res.send("Login Successfull..")
}else{
    throw new error("Invalid Credentials")
}
}catch(err){
    res.status(400).send("invalid Credentials "+ err.message);
}

})

app.get("/profile",async (req,res)=>{
const cookies=req.cookies;

const{token}=cookies;

//validate my token 
if(!token){
    throw new Error("Invalid TOken")
}
try{
const decodedMessage=await jwt.verify(token,"DEV@Tinder$123")
const {_id}=decodedMessage;
console.log("Logged In user is"+_id);
const userId=await User.findById(_id);
if(!userId){
    throw new Error("User Does Not Exists")
}
res.send(userId);
}catch (err) {
    res.status(400).send("Something went wrong ");
  }
})
// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    console.log(userEmail);
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }

    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Detele a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    //const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES=[
        "photoUrl",
        "about",
        "gender",
        "skills"
    ]
    const isUpdateAllowed=Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed){
        throw new Error("Updates not allowed");
    }
    if(data.skills.length>10){
        throw new Error("skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
   
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});

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