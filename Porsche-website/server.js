const express = require("express");

const app = express();

const port = 5000

require('dotenv').config()


app.use(express.json())

console.log(express.json())


const {MongoClient}=require('mongodb')
const url = "mongodb://localhost:27017"
async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
 

    
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 

const client = new MongoClient(url);
 

// Connect to the MongoDB cluster
client.connect();

const db = client.db('Porsche');
const customers = db.collection('Customers');
const ObjectId = require('mongodb').ObjectId;
// Make the appropriate DB calls
listDatabases(client);

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

async function findOne(query , result) {
    const ans = await customers.findOne(query);
    result = ans
}

app.get("/v1/api/customers/",(req,res)=>{
    nameSearch = req.body.name
    console.log(nameSearch)
    if(true) {
        db.collection('Customers')
        .findOne({CF_Name : nameSearch})
        .then(doc =>{
            res.status(200).json(doc)
        })

        .catch(err => {
            res.status(500).json({error: "Could not fetch the data"})
        })
    }/*
    else {
        res.status(500).json({error: "Not a valid ID"})
    }*/


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