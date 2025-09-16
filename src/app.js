const express=require("express");

const app=express();
app.get("/user",(req,res)=>{
res.send({firstname:"allada",lastname:"Mohan"})
});

app.post("/user",(req,res)=>{
    console.log("Save Data to the Database")
res.send("data saved to the DATABASE");
});
app.delete("/user",(req,res)=>{
    res.send("data Deleted Succesfully!!");
})

//this will handle all the http methods calls to /test
app.use("/test",(req,res)=>{
    res.send("Allada Mohan ")

})

app.listen(7777,()=>{
  console.log("server is ready to listen")
})