const mongoose = require('mongoose')
const AdminSchema = mongoose.Schema({
    adminId:{
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

const Admins = mongoose.model('Admins' , AdminSchema)

module.exports = Admins