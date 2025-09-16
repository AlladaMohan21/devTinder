const express=require("express");

const app=express();
app.use("/hello",(req,res)=>{
    res.send("hello hello helo")

})

app.use("/",(req,res)=>{
    res.send("Hello from the  ")

})
app.use("/test",(req,res)=>{
    res.send("Hello from the server")
})

app.listen(7777,()=>{
  console.log("server is ready to listen")
})