const validator=require("validator");
const validationDatabase=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    }else if(!validator.isEmail(emailId)){
         throw new Error("email id is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("PASSWORD IS NOT STRONG");
    }
}
const validateEditProfileData=(req)=>{
    const allowedEditFields=["firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",

    ];

    const isEditAllowed=Object.keys(req.body).every(field=>
        allowedEditFields.includes(field)
    );
return isEditAllowed;
}

module.exports={
    validationDatabase,
    validateEditProfileData

}