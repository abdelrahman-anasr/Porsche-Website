const brcypt = require('bcrypt')
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
        required:true
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
    if(customer){
        const auth=await brcypt.compare(password,customer.password)
         if (auth){
            return customer
         }
        else {
            return "undefined"
        }
    }
    else {
        return "incorrect email"
    }
}

const Customer = mongoose.model('Customer' , CustomerSchema)
module.exports = Customer