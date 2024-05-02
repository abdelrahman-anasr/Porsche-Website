const express = require("express");

const app = express();

const port = 5000

require('dotenv').config()


app.use(express.json())

console.log(express.json())


const {MongoClient}=require('mongodb')
const url = "mongodb+srv://abdelrahman2004:software123@database.99j14ho.mongodb.net/"
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
    const data = req.body
    db.collection("Customers")
    .insertMany(data)
    .then(result => {
        res.status(201).json(result)
    })
    .catch (err =>{
        res.status(500).json({err:"could not be inserted"})
    })
});

app.put("/v1/api/customers",(req,res)=>{
    const data= req.body
    db.collection("Customers")
    .insertOne(data)
    .then(result =>{
      res.status(201).json(result)
      })
    .catch(err =>{
       res.status(500).json({err:"could not be inserted"})})
});

app.patch("/v1/api/customers",(req,res)=>{
    const updates=req.body
    id=req.body._id
    if(ObjectId.isValid(id)){
        db.collection('Customers')
        .updateOne({_id: new ObjectId(id) },{$set:updates})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(500).json({error:"could not update"})

        })
     } else { 
        res.status(500).json({error:"not a valid ID"})

    }
});

app.delete("/v1/api/customers",(req,res)=>{
    id = req.body._id
    console.log(req.params.id)
    if (ObjectId.isValid(id)){
        db.collection("Customers")
        .deleteOne({_id: new ObjectId(id)})
        .then(result=>{res.status(204).json(result)
        })
        .catch(err=>{
            res.status(500).json({error: "could not delete document"})
        })
    
    }else{
        res.status(500).json({error:"invalid id"})
    }
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