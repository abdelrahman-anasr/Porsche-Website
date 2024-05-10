const mongoose = require('mongoose')
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

const Customer = mongoose.model('Customers' , CustomerSchema)
module.exports = Customer