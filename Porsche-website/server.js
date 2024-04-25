const express = require("express");

const app = express();

const port = 5000

require('dotenv').config()


app.use(express.json())

console.log(express.json())

const {MongoClient}=require('mongodb')
const url = "mongodb://localhost:27017"

const client = new MongoClient(url);

const porsche = client.db('Porsche');
const products = porsche.collection('Products');

/*async function run() {
    try {
    }
        finally {
            // Ensures that the client will close when you finish/error
            await client.close();
          }
    }
*/
app.listen(port , ()=>{
    console.log("Server is running: listening to port " + port);
});


app.get("/v1/api/customers",(req,res)=>{
    const query = {Name : "Cayenne"};
    const product = products.findOne(req.body);
    res.send(product);
});

app.post("/v1/api/customers",(req,res)=>{
    console.log(req.body)
    res.status(201).json({mssg: "Received Successfully!"})
});

app.patch("/v1/api/customers",(req,res)=>{
    console.log(req.params.id)
    console.log(req.body)
});

app.put("/v1/api/customers",(req,res)=>{
    console.log(req.params.id)
    console.log(req.body)
});

app.delete("/v1/api/customers",(req,res)=>{
    console.log(req.params.id)
});

app.use((req , res , next)=>{
    console.log("The middleware received your request");
    next();
});

/*const {connectToDb, getdbConn}=require('./Porsche')
let db 
connectToDb((err)=>{
    if (!err){
        app.listen(port,()=>{
            console.log('app is listening on port', port)
        })
        db=getDbConn()
    }
    else {
        console.log("Errorrrrr")
    }
})*/