const bcrypt = require('bcrypt')
const { Admin } = require('mongodb')
const mongoose = require('mongoose')

const url = "mongodb+srv://abdelrahman2004:software123@database.99j14ho.mongodb.net/Porsche"

mongoose.connect(url).then((ans) => { 
    console.log("Connecting SuccesFul!") 
  }).catch((err) => { 
    console.log("Error in the Connection") 
  }) 

const Schema = mongoose.Schema


const mongoDb = mongoose.connection

const CustomerSchema = mongoose.Schema({
    customerId:{
        type:Number,
        // required:true
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    DOB:{
        type:Date
    },
    age:{
        type:Number
    }
})

CustomerSchema.statics.login=async function(email,password){
    const customer=await this.findOne({email:email})
    if (customer==null){
        return "incorrect"
    }else{
        const auth=await bcrypt.compare(password,customer.password)
        if (!auth){
            return "undefined"
        }
           return customer
           console.log("Welcome back")
        
    }
 

    }

const Customer = mongoose.model('Customer' , CustomerSchema)
module.exports = Customer