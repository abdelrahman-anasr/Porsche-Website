/* SERVER SETUP */
const express = require("express");
const router=express.Router()

const app = express();

const dotenv = require('dotenv').config()

const jwt = require('jsonwebtoken')

const ejs = require('ejs')

const bcyrpt = require('bcrypt')

app.set('view engine' , 'ejs')

port = dotenv.port || 3001;


const {MongoClient}=require('mongodb')

const cookies=require('cookie-parser');
router.use(cookies)

const Customer = require("./models/CustomerModel");
const Admin = require("./models/AdminModel");
const Products = require("./models/ProductModel");
const requireAuth=require('./middleware/authMiddleware')
const cors=require('cors')
/* ------------------------------------------------------------------------------------------------------------------------------------ */




/* MONGODB SETUP */

const url = "mongodb+srv://abdelrahman2004:software123@database.99j14ho.mongodb.net/"

const client = new MongoClient(url);

client.connect().then( () => {
    console.log('MongoDB Connected!');
});

const db = client.db('Porsche');

const customers = db.collection('customers');
const products = db.collection('products');
const admins = db.collection('admins');
const orders = db.collection('Orders');

const ObjectId = require('mongodb').ObjectId;


/* ------------------------------------------------------------------------------------------------------------------------------------ */



/* MIDDLEWARE AND EXPRESS SETUP + ADDITIONAL FUNCTIONS */
app.use(cors());

app.listen(port , ()=>{
    console.log("Server is running: listening to port " + port);
});

app.use((req , res , next)=>{
    console.log("The middleware received your request");
    next();
});

app.use(cookies())

async function findOne(query , result) {
    const ans = await customers.findOne(query);
    result = ans
}
app.use(express.json())

app.use(express.urlencoded())

app.use(express.static('./public'))

/* RENDERING THE EJS FILES */
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



const createToken = (id)=>{
    return jwt.sign({id},'388cd170b5793',{expiresIn:3*60*1000})
}


/* ------------------------------------------------------------------------------------------------------------------------------------ */
const corsOptions = {
    origin: 'http://localhost:3000',
  };
  
  app.use(cors(corsOptions));
  



/*      CRUD OPERATIONS FOR CUSTOMERS COLLECTION IN MONGODB   */


/* CUSTOMER REGISTRATION  */
app.post('/customers', async (req,res) => {
    try {
        const hashedPassword = await bcyrpt.hash(req.body.password , 10)
        const data = {customerId : req.body.customerId , first_name : req.body.first_name , last_name : req.body.last_name , email : req.body.email ,  password : hashedPassword}
        const customerResult = await Customer.create(data)
        res.redirect("/set-cookie")
        
    }
    catch(err) {
        console.log(err.message)
        res.status(500).json({Error: err.message})
    }
})

/* CUSTOMER LOGIN */
app.post('/customers/login' ,  async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        console.log("entering function")
        const customer = await Customer.login(email, password)
        console.log("customer logged in")
        console.log("Found Customer and gave them a cookie")
        if(customer === "incorrect") {
            res.status(401).send({Error : "Incorrect Email"})
        }
        else if(customer === "undefined") {
            res.status(401).send({Error : "Incorrect Password"})
        }
        else{
            res.redirect('/set-cookie') // Why redirect to set-cookie?, should we just redirect to homepage? ~Yossef
        }
    }
    catch(err){
        console.log(err)
    }
        
})
app.get("/api/customers",async (req,res)=>{
    let customers=[]
    db.collection('Customer')
    .find()
    .sort({customer: 1})
    .forEach(customer => customers.push(customer))
    .then(()=>{
        res.status(200).json(customers)
    })
    .catch((err)=>{
        res.status(500).json({error:"could not fetch the data"})
    })
});


app.get('/set-cookies',async (req,res)=>{
    console.log('set cookie')
    res.cookie('newCustomer',true)
    res.cookie('isEmployee',false,{maxAge:1*60*1000})
    // await res.status(200).json({status: "success"})
    res.status.json({Status : "Success"})
    console.log("EOM")
})

app.get('/get-cookies',(req,res)=>{
    console.log('get cookie')
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

/*app.get("/api/products",async (req,res)=>{
    const id = req.body.productId
    console.log(id)
    const product = await Products.findOne({productId : productId})
    if(product == null) {
        res.status(400).json({Error : "Product not found"})
    }
    else {
        res.status(200).json(product)
    }
});*/
app.get('/api/products',async (req,res)=>{
    Products.find()
    .then(products => res.json(products))
    .catch(err=>res.json(err))
});
app.post("/api/products",/*requireAuth,*/async (req,res)=>{
    console.log("Authenticated")
    const data = req.body
    const result = await Products.create(req.body)
    res.status(200).json({Status : "Product added successfully"})
    
});

app.put("/api/products",requireAuth,(req,res)=>{
    const data= req.body
    products
    .insertOne(data)
    .then(result =>{
      res.status(201).json(result)
      })
    .catch(err =>{
       res.status(500).json({err:"could not be inserted"})})
});


app.patch("/api/products",requireAuth,async(req,res)=>{
    try {
    var updateObject = req.body;
    var id = req.body.productId;
    products.updateOne({productId : id}, {$set: updateObject} , {upsert : false});
    res.status(200).json({Result : "Updated Record Successfully"})
    }
    catch(error) {
     res.status(500).json({Error: error.message})
    }
});

app.delete("/api/products",requireAuth,(req,res)=>{
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
    const token = req.cookies.jwt
    if(token == undefined)
        return null 
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err , user) => {
        if(err) return "Token Error"
        req.user = user
        next()
    })
}

app.get('/set-cookie',(req,res)=>{
    console.log('cookie is set')
    res.cookie('newAdmin',true) // This always gets set, why? ~yossef
    res.cookie('isEmployee',false,{maxAge:1*60*1000})
    // res.status(200).json({status: "success"})
    res.status(201).json({Status : "Success"})
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
        const token=createToken(data.email)
        res.cookie('jwt',token,{maxAge: 2*60*1000})
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
        console.log("entering function")
        const admin = await Admin.login(email, password)
        console.log("Found Admin")
        if(admin === "incorrect") {
            res.status(401).send({Error : "Incorrect Email"})
        }
        else if(admin === "undefined") {
            res.status(401).send({Error : "Incorrect Password"})
        }
        else{
            const token=createToken(email)  
            res.cookie('jwt',token)
            res.status(201).redirect('/set-cookie')
            
        }
    }
    catch(err){
        console.log(err)
    }
    
})


 // Why is there 2 admins posts

app.put("/admins",authenticateToken,(req,res)=>{
    const data= req.body
    admins
    .insertOne(data)
    .then(result =>{
      res.status(201).json(result)
      })
    .catch(err =>{
       res.status(500).json({err:"could not be inserted"})})
});


app.patch("/admins",authenticateToken,async(req,res)=>{
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

app.delete("/admins",authenticateToken,(req,res)=>{
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

app.post("/orders",requireAuth,(req,res)=>{
    
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

app.put("/orders",requireAuth,(req,res)=>{
    const data= req.body
    orders
    .insertOne(data)
    .then(result =>{
      res.status(201).json(result)
      })
    .catch(err =>{
       res.status(500).json({err:"could not be inserted"})})
});


app.patch("/orders",requireAuth,async(req,res)=>{
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

app.delete("/orders",requireAuth,(req,res)=>{
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