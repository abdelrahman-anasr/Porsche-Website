const express = require("express");

const app = express();

const port = 5000
app.listen(port , ()=>{
    console.log("Server is running: listening to port " + port);
})

require('dotenv').config()

app.get("/v1/api/customers",(req,res)=>{
    res.status(200).json({Title : "Skye Reyna" , Game: "Valorant"});
})

app.post("/v1/api/customers",(req,res)=>{
    console.log(req.body)
    res.status(201).json({mssg: "Received Successfully!"})
})

app.patch("/v1/api/customers",(req,res)=>{
    console.log(req.params.id)
    console.log(req.body)
})

app.put("/v1/api/customers",(req,res)=>{
    console.log(req.params.id)
    console.log(req.body)
})

app.delete("/v1/api/customers",(req,res)=>{
    console.log(req.params.id)
})