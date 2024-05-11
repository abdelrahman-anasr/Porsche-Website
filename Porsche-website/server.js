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

app.use(express.static('./public'))

const {MongoClient}=require('mongodb')

const cookies=require('cookie-parser');
const Customer = require("./models/CustomerModel");
const Admin = require("./models/AdminModel");
const Products = require("./models/ProductModel");

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
const admins = db.collection('Admins');
const orders = db.collection('Orders');

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

app.get('/' , (req , res) => {
    res.render('index.ejs')
})

app.get('/views/aboutpage.ejs' , (req , res) => {
    res.render('aboutpage.ejs')
})

app.get('/views/contact.ejs' , (req , res) => {
    res.render('contact.ejs')
})

app.get('/views/login.ejs' , (req , res) => {
    res.render('login.ejs')
})

app.get('/views/register.ejs' , (req , res) => {
    res.render('register.ejs')
})

//app.use(cookies)

//const createToken = (id)=>{
  //  return jwt.sign({id},ACCESS_TOKEN_SECRET,{expiresIn:3*60*1000})
//}


/* ------------------------------------------------------------------------------------------------------------------------------------ */








/*      CRUD OPERATIONS FOR CUSTOMERS COLLECTION IN MONGODB   */

app.post('/customers', async (req,res) => {
    try {
        const hashedPassword = await bcyrpt.hash(req.body.password , 10)
        const data = {customerId : req.body.customerId , first_name : req.body.first_name , last_name : req.body.last_name , email : req.body.email ,  password : hashedPassword}
        const customerResult = await Customer.create(data)
        res.status(200).json(customerResult)
    }
    catch(err) {
        console.log(err.message)
        res.status(500).json({Error: err.message})
    }
})

app.post('/customers/login' ,  async (req,res) => {
        const {email, password} = req.body
        try{
            const user = await Customer.login({email, password})
        }
        catch(err){
            console.log(err)
        }
        
})

function authenticateToken(req , res , next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.status(401)

    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err , email) => {
        if(err) return res.sendStatus(403)
        console.log("ok")
        req.email = email
        next()
    })
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

app.get('/set-cookie',(req,res)=>{
    res.cookie('newCustomer',true)
    res.cookie('isEmployee',false,{maxAge:1*60*1000})
})
app.get('/get-cookies',(req,res)=>{
    const cookies=req.cookies
    res.json(cookies)
})

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


app.patch("/api/customers",authenticateToken,async(req,res)=>{
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

app.delete("/api/customers",authenticateToken,(req,res)=>{
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

app.post("/api/products",authenticateToken,(req,res)=>{
    
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

app.put("/api/products",authenticateToken,(req,res)=>{
    const data= req.body
    products
    .insertOne(data)
    .then(result =>{
      res.status(201).json(result)
      })
    .catch(err =>{
       res.status(500).json({err:"could not be inserted"})})
});


app.patch("/api/products",authenticateToken,async(req,res)=>{
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

app.delete("/api/products",authenticateToken,(req,res)=>{
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



app.post('/admins/auth' , authenticateToken , async (req,res) => {
    try {

    const admin = await admins.findOne({email : req.body.email})
    res.status(200).json(admin)
    }
    catch(err) {
        res.status(500).json({Error: err.message})
    }
})

function authenticateToken(req , res , next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.status(401)

    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err , user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.get('/set-cookie',(req,res)=>{
    console.log('cookie is set')
    res.cookie('newAdmin',true)
    res.cookie('isEmployee',false,{maxAge:1*60*1000})
})
app.get('/get-cookies',(req,res)=>{
    console.log('get cookie')
    const cookies=req.cookies
    res.json(cookies)
})

app.post('/admins', async (req,res) => {
    try {
        const hashedPassword = await bcyrpt.hash(req.body.password , 10)
        const data = {adminId : req.body.adminId , first_name : req.body.first_name , last_name : req.body.last_name , email : req.body.email ,  password : hashedPassword}
        const adminResult = await Admin.create(data)
        res.status(200).json(adminResult)
    }
    catch(err) {
        console.log(err.message)
        res.status(500).json({Error: err.message})
    }
})


app.post('/admins/login' ,  async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        const admin = await Admin.login(email, password)
        console.log("Found Admin")
        if(admin === null){
            res.status(500).json({Error: "Cant find admin!"})
        }
        else{
            res.status(200).json(admin)
        }
    }
    catch(err){
        console.log(err)
    }
    
})




app.get("/admins",(req,res)=>{
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

app.post("/admins",(req,res)=>{
    
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

app.put("/admins",(req,res)=>{
    const data= req.body
    admins
    .insertOne(data)
    .then(result =>{
      res.status(201).json(result)
      })
    .catch(err =>{
       res.status(500).json({err:"could not be inserted"})})
});


app.patch("/admins",async(req,res)=>{
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

app.delete("/admins",(req,res)=>{
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



/*      CRUD OPERATIONS FOR ORDERS COLLECTION IN MONGODB   */

app.get("/orders",async (req,res)=>{
    var id = req.body.order_id
    console.log(id)
    const order = await orders.findOne({order_id : id})
    if(order == null) {
        res.status(400).json({Status : "Order not found"})
    }
    else {
        res.status(200).json(order);
    }


});

app.post("/orders",authenticateToken,(req,res)=>{
    
    const data = req.body
    orders
    .insertMany(data)
    .then(result => {
        res.status(201).json(result)
    })
    .catch (err =>{
        console.log(err.message)
        res.status(500).json({err:"could not be inserted"})
    })
    
});

app.put("/orders",authenticateToken,(req,res)=>{
    const data= req.body
    orders
    .insertOne(data)
    .then(result =>{
      res.status(201).json(result)
      })
    .catch(err =>{
       res.status(500).json({err:"could not be inserted"})})
});


app.patch("/orders",authenticateToken,async(req,res)=>{
    try {
    var updateObject = req.body;
    var id = req.body.order_id;
    orders.updateOne({order_id : id}, {$set: updateObject} , {upsert : false});
    res.status(200).json("Updated Record Successfully")
    }
    catch(error) {
     res.status(500).json({Error: error.message})
    }
});

app.delete("/orders",authenticateToken,(req,res)=>{
    id = req.body.order_id
    orders
        .deleteOne({order_id : id})
        .then(result=>{res.status(204).json("Deleted Record")
        })
        .catch(err=>{
            res.status(500).json({error: "could not delete document"})
        })

});
/* ------------------------------------------------------------------------------------------------------------------------------------ */