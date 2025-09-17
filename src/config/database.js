const mongoose=require("mongoose");
const connectDb=async()=>{
await mongoose.connect("mongodb+srv://alladamohan:%40Mohan123@namastedev.zdkk2yu.mongodb.net/devTinder"

);

}
module.exports={connectDb}
