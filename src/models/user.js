 const mongoose=require("mongoose");
 const validator=require("validator");
 const bcrypt=require("bcrypt");
 const jwt = require("jsonwebtoken");


 
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      trim:true
    },
    lastName: {
      type: String,
      trim:true,
      required:true
    },
    emailId: {
        type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email"+value);
        }
    }
    },
    password: {
      type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("Your password is weak.."+value);
        }
    }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value){
        if(!validator.isURL(value)){
            throw new Error("Invalid url"+value);
        }
      }
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
      maxlength: [200, "About section cannot exceed 200 characters"]
    },
    skills: {
      type: [String],
    }
},{
    timestamps: true,
  });
  userSchema.methods.getJWT=async function(){
    const user=this;
    const token =await jwt.sign({_id:user._id},"DEV@Tinder$123",{
        expiresIn:"1d"});
        return token;

  }
   userSchema.methods.validatePassword=async function(passwordInputUser){
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputUser,
        passwordHash);
        return isPasswordValid;
   }


 const User= mongoose.model("user",userSchema);

 module.exports=User;