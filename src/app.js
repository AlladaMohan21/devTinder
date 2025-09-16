const express = require("express");

const app = express();

//app.use("/route", rH, [rH2, rH3], rH4, rh5);

app.get(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2!!");
    // res.send("2nd Response!!");
    next();
  },

  (req, res, next) => {
    console.log("Handling the route user 3!!");
    // res.send("3rd Response!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 4!!");
    // res.send("4th Response!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 5!!");
    res.send("5th Response!!");
  }
);
const { adminAuth, userAuth } = require("./middlewares/auth");
const { error } = require("console");

app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("User logged in successfully!");
});


app.get("/user/data", userAuth, (req, res) => {
    // try{
    throw new error("xyzz");
       res.send("User Data Sent");


    // }catch(err){
        //res.status(500).send("something went wrong");
    }
//}
);

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong2");
    }
})

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});