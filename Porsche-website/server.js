/* SERVER SETUP */
const express = require("express");

const app = express();

const dotenv = require('dotenv').config()

const jwt = require('jsonwebtoken')

const ejs = require('ejs')

const bcyrpt = require('bcrypt')

app.set('view engine' , 'ejs')

port = dotenv.port || 3001;

app.use(express.json())

const {MongoClient}=require('mongodb')

/* ------------------------------------------------------------------------------------------------------------------------------------ */




/* MONGODB SETUP */

const url = "mongodb+srv://abdelrahman2004:software123@database.99j14ho.mongodb.net/"

const client = new MongoClient(url);

client.connect().then( () => {
    console.log('MongoDB Connected!');
});

const db = client.db('Porsche');

const customers = db.collection('Customers');
const products = db.collection('Products');
const admins = db.collection('Admin');

const ObjectId = require('mongodb').ObjectId;

/* ------------------------------------------------------------------------------------------------------------------------------------ */



/* MIDDLEWARE AND EXPRESS SETUP + ADDITIONAL FUNCTIONS */
app.listen(port , ()=>{
    console.log("Server is running: listening to port " + port);
});

app.use((req , res , next)=>{
    console.log("The middleware received your request");
    next();
});

async function findOne(query , result) {
    const ans = await customers.findOne(query);
    result = ans
}

/* ------------------------------------------------------------------------------------------------------------------------------------ */








/*      CRUD OPERATIONS FOR CUSTOMERS COLLECTION IN MONGODB   */

app.post('/customers/auth' , authenticateToken , async (req,res) => {
    const email = await customers.find({email : req.body.email})
    res.json(email)
})

app.post('/customers', async (req,res) => {
    try {
        const hashedPassword = await bcyrpt.hash(req.body.password , 10)
        const data = {name : req.body.name , email : req.body.email ,  password : hashedPassword}
        customers.insertOne(data).then(result => {
            res.status(201).json(result)
        })

    }
    catch(err) {
        console.log(err.message)
        res.status(500).json({Error: err.message})
    }
})

app.post('/customers/login' ,  async (req,res) => {
    const customer = await customers.findOne({email : req.body.email})
    if(customer == null) {
        return res.status(401).json({Error: "User not Found!"})
    }
    try {
        if( await bcyrpt.compare(req.body.password , customer.password) ) {
            const email = req.body.email
            const accessToken = jwt.sign(email , process.env.ACCESS_TOKEN_SECRET)
            res.json({accessToken: accessToken})
        }
        else {
            res.send("Incorrect")
        }
    }
    catch(err) {
        res.status(500).json({Error: err.message})
    }
})

function authenticateToken(req , res , next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.status(401).json({Error: "Token missing"})
    console.log(process.env.ACCESS_TOKEN_SECRET)
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET) , (err , email) => {
        if(err) return res.sendStatus(403)
        console.log("ok")
        req.email = email
        console.log("Reached end point")
        next()
    }
}

app.get("/api/customers",(req,res)=>{
    var id = req.body._id
    console.log(id)
    if(ObjectId.isValid(id)) {
        customers
        .findOne({_id : new ObjectId(id)})
        .then(doc =>{
            res.status(200).json(doc)
        })

        .catch(err => {
            res.status(500).json({error: "Could not fetch the data"})
        })
    }
    else {
        res.status(500).json({error: "Not a valid ID"})
    }


});

app.post("/api/customers",(req,res)=>{
    
    const data = req.body
    customers
    .insertOne(data)
    .then(result => {
        res.status(201).json(result)
    })
    .catch (err =>{
        console.log(err.message)
        res.status(500).json({err:"could not be inserted"})
    })
    
});

app.put("/api/customers",(req,res)=>{
    const data= req.body
    customers
    .insertOne(data)
    .then(result =>{
      res.status(201).json(result)
      })
    .catch(err =>{
       res.status(500).json({err:"could not be inserted"})})
});


app.patch("/api/customers",async(req,res)=>{
    try {
    var updateObject = req.body;
    var id = req.body.id;
    customers.updateOne({_id  : new ObjectId(id)}, {$set: updateObject} , {upsert : false});
    res.status(200).json("Updated Record Successfully")
    }
    catch(error) {
     res.status(500).json({Error: error.message})
    }
});

app.delete("/api/customers",(req,res)=>{
    id = req.body._id
    if (ObjectId.isValid(id)){
        customers
        .deleteOne({_id: new ObjectId(id)})
        .then(result=>{res.status(204).json("Deleted Record")
        })
        .catch(err=>{
            res.status(500).json({error: "could not delete document"})
        })
    
    }else{
        res.status(500).json({error:"invalid id"})
    }
});
/* ------------------------------------------------------------------------------------------------------------------------------------ */








/*      CRUD OPERATIONS FOR PRODUCTS COLLECTION IN MONGODB   */

app.get("/api/products",(req,res)=>{
    var id = req.body._id
    console.log(id)
    if(ObjectId.isValid(id)) {
        products
        .findOne({_id : new ObjectId(id)})
        .then(doc =>{
            res.status(200).json(doc)
        })

        .catch(err => {
            res.status(500).json({error: "Could not fetch the data"})
        })
    }
    else {
        res.status(500).json({error: "Not a valid ID"})
    }


});

app.post("/api/products",(req,res)=>{
    
    const data = req.body
    products
    .insertMany(data)
    .then(result => {
        res.status(201).json(result)
    })
    .catch (err =>{
        console.log(err.message)
        res.status(500).json({err:"could not be inserted"})
    })
    
});

app.put("/api/products",(req,res)=>{
    const data= req.body
    products
    .insertOne(data)
    .then(result =>{
      res.status(201).json(result)
      })
    .catch(err =>{
       res.status(500).json({err:"could not be inserted"})})
});


app.patch("/api/products",async(req,res)=>{
    try {
    var updateObject = req.body;
    var id = req.body.id;
    products.updateOne({_id  : new ObjectId(id)}, {$set: updateObject} , {upsert : false});
    res.status(200).json("Updated Record Successfully")
    }
    catch(error) {
     res.status(500).json({Error: error.message})
    }
});

app.delete("/api/products",(req,res)=>{
    id = req.body._id
    if (ObjectId.isValid(id)){
        products
        .deleteOne({_id: new ObjectId(id)})
        .then(result=>{res.status(204).json("Deleted Record")
        })
        .catch(err=>{
            res.status(500).json({error: "could not delete document"})
        })
    
    }else{
        res.status(500).json({error:"invalid id"})
    }
});
/* ------------------------------------------------------------------------------------------------------------------------------------ */









/*      CRUD OPERATIONS FOR ADMIN COLLECTION IN MONGODB   */


app.post('/admins', async (req,res) => {
    try {
        const hashedPassword = await bcyrpt.hash(req.body.password , 10)
        const data = {name : req.body.name , email : req.body.email ,  password : hashedPassword}
        admins.insertOne(data).then(result => {
            res.status(201).json(result)
        })

    }
    catch(err) {
        console.log(err.message)
        res.status(500).json({Error: err.message})
    }
})


app.post('/admins/login', async (req,res) => {
    const admin = await admins.findOne({name : req.body.name})
    if(admin == null) {
        return res.status(401).json({Error: "User not Found!"})
    }
    try {
        if( await bcyrpt.compare(req.body.password , admin.password) ) {
            res.send("Success")
        }
        else {
            res.send("Incorrect Password")
        }
    }
    catch(err) {
        res.status(500).json({Error: err.message})
    }
})




app.get("/api/admin",(req,res)=>{
    var id = req.body._id
    console.log(id)
    if(ObjectId.isValid(id)) {
        admins
        .findOne({_id : new ObjectId(id)})
        .then(doc =>{
            res.status(200).json(doc)
        })

        .catch(err => {
            res.status(500).json({error: "Could not fetch the data"})
        })
    }
    else {
        res.status(500).json({error: "Not a valid ID"})
    }


});

app.post("/api/admin",(req,res)=>{
    
    const data = req.body
    admins
    .insertMany(data)
    .then(result => {
        res.status(201).json(result)
    })
    .catch (err =>{
        console.log(err.message)
        res.status(500).json({err:"could not be inserted"})
    })
    
});

app.put("/api/admin",(req,res)=>{
    const data= req.body
    admins
    .insertOne(data)
    .then(result =>{
      res.status(201).json(result)
      })
    .catch(err =>{
       res.status(500).json({err:"could not be inserted"})})
});


app.patch("/api/admin",async(req,res)=>{
    try {
    var updateObject = req.body;
    var id = req.body.id;
    admins.updateOne({_id  : new ObjectId(id)}, {$set: updateObject} , {upsert : false});
    res.status(200).json("Updated Record Successfully")
    }
    catch(error) {
     res.status(500).json({Error: error.message})
    }
});

app.delete("/api/admin",(req,res)=>{
    id = req.body._id
    if (ObjectId.isValid(id)){
        admins
        .deleteOne({_id: new ObjectId(id)})
        .then(result=>{res.status(204).json("Deleted Record")
        })
        .catch(err=>{
            res.status(500).json({error: "could not delete document"})
        })
    
    }else{
        res.status(500).json({error:"invalid id"})
    }
});
/* ------------------------------------------------------------------------------------------------------------------------------------ */

